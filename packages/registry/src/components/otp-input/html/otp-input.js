// OTP input — auto-advance, arrow keys, backspace on empty and paste.
document.querySelectorAll("[data-otp-input]").forEach((root) => {
  const digits = [...root.querySelectorAll("input")];
  if (digits.length === 0) return;
  const scope = root.closest("[data-otp-scope]") ?? root.parentElement;
  const output = scope?.querySelector("[data-otp-output]");
  const complete = scope?.querySelector("[data-otp-complete]");

  const focusAt = (index) => {
    const input = digits[Math.min(Math.max(index, 0), digits.length - 1)];
    input?.focus();
    input?.select();
  };

  const sync = () => {
    const code = digits.map((input) => input.value).join("");
    const filled = digits.filter((input) => input.value !== "").length;
    if (output) {
      output.textContent = `Entered ${filled} of ${digits.length} digits`;
    }
    if (complete) {
      complete.hidden = filled !== digits.length;
    }
  };

  const setValue = (input, value) => {
    input.value = value;
    sync();
  };

  digits.forEach((input, index) => {
    input.addEventListener("focus", () => input.select());

    input.addEventListener("input", () => {
      const digit = input.value.replace(/\D/g, "").slice(-1);
      if (!digit) {
        setValue(input, "");
        return;
      }

      setValue(input, digit);
      const nextEmpty = digits.findIndex(
        (item, position) => position > index && item.value === "",
      );
      focusAt(nextEmpty === -1 ? index + 1 : nextEmpty);
    });

    input.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        focusAt(index - 1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        focusAt(index + 1);
      } else if (event.key === "Backspace" && input.value === "") {
        event.preventDefault();
        if (index > 0) {
          setValue(digits[index - 1], "");
          focusAt(index - 1);
        }
      } else if (event.key === "Delete") {
        setValue(input, "");
      } else if (event.key === "Home") {
        event.preventDefault();
        focusAt(0);
      } else if (event.key === "End") {
        event.preventDefault();
        focusAt(digits.length - 1);
      }
    });

    input.addEventListener("paste", (event) => {
      const pasted = (event.clipboardData?.getData("text") ?? "")
        .replace(/\D/g, "")
        .slice(0, digits.length - index);
      if (pasted.length === 0) return;

      event.preventDefault();
      pasted.split("").forEach((digit, offset) => {
        digits[index + offset].value = digit;
      });
      sync();
      focusAt(index + pasted.length);
    });
  });

  sync();
});
