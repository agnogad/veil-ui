// Upload button — opens a hidden file input and reports the selection.
document.querySelectorAll("[data-upload-button]").forEach((button) => {
  const wrapper = button.closest("div") ?? document;
  const input = wrapper.querySelector("[data-upload-input]");
  const status = wrapper.querySelector("[data-upload-status]");
  if (!(input instanceof HTMLInputElement)) return;

  button.addEventListener("click", () => input.click());

  input.addEventListener("change", () => {
    const files = input.files;
    if (!files || files.length === 0) return;
    const names = Array.from(files, (file) => file.name);
    if (status) status.textContent = `Selected: ${names.join(", ")}`;
    input.value = "";
  });
});
