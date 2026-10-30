function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function safeUrl(url: string) {
  const trimmed = url.trim();
  return /^\s*javascript:/i.test(trimmed) ? "#" : trimmed;
}

function renderInline(source: string) {
  let html = escapeHtml(source);

  html = html.replace(/`([^`]+)`/g, '<code class="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em]">$1</code>');
  html = html.replace(
    /!\[([^\]]*)\]\(([^)\s]+)\)/g,
    (_match, alt: string, src: string) =>
      `<img src="${safeUrl(src)}" alt="${alt}" class="my-4 max-w-full rounded-md" />`,
  );
  html = html.replace(
    /\[([^\]]+)\]\(([^)\s]+)\)/g,
    (_match, label: string, href: string) =>
      `<a href="${safeUrl(href)}" class="font-medium underline decoration-muted-foreground/40 underline-offset-4 hover:decoration-current">${label}</a>`,
  );
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/__([^_]+)__/g, "<strong>$1</strong>");
  html = html.replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>");
  html = html.replace(/(^|[^_])_([^_]+)_/g, "$1<em>$2</em>");
  html = html.replace(/~~([^~]+)~~/g, "<del>$1</del>");

  return html;
}

function parseTableRow(line: string) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

export function renderMarkdown(source: string) {
  const lines = source.replace(/\r\n?/g, "\n").split("\n");
  const output: string[] = [];
  let index = 0;

  const headingClass = {
    1: "mt-6 text-2xl font-semibold tracking-tight first:mt-0",
    2: "mt-6 text-xl font-semibold tracking-tight first:mt-0",
    3: "mt-5 text-lg font-semibold first:mt-0",
    4: "mt-4 text-base font-semibold first:mt-0",
    5: "mt-4 text-sm font-semibold first:mt-0",
    6: "mt-4 text-sm font-semibold first:mt-0",
  };

  while (index < lines.length) {
    const line = lines[index]!;

    if (!line.trim()) {
      index += 1;
      continue;
    }

    const fence = line.match(/^```(\w*)/);
    if (fence) {
      const language = fence[1] ?? "";
      const body: string[] = [];
      index += 1;
      while (index < lines.length && !/^```/.test(lines[index]!)) {
        body.push(lines[index]!);
        index += 1;
      }
      index += 1;
      output.push(
        `<pre class="my-4 overflow-x-auto rounded-lg border bg-muted/40 p-4 text-sm"><code class="font-mono"${
          language ? ` data-language="${language}"` : ""
        }>${escapeHtml(body.join("\n"))}</code></pre>`,
      );
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      const level = heading[1]!.length as 1 | 2 | 3 | 4 | 5 | 6;
      output.push(
        `<h${level} class="${headingClass[level]}">${renderInline(heading[2]!)}</h${level}>`,
      );
      index += 1;
      continue;
    }

    if (/^(-{3,}|\*{3,}|_{3,})$/.test(line.trim())) {
      output.push('<hr class="my-6 border-border" />');
      index += 1;
      continue;
    }

    if (line.trimStart().startsWith(">")) {
      const body: string[] = [];
      while (index < lines.length && lines[index]!.trimStart().startsWith(">")) {
        body.push(lines[index]!.replace(/^\s*>\s?/, ""));
        index += 1;
      }
      output.push(
        `<blockquote class="my-4 border-l-2 pl-4 text-sm italic text-muted-foreground">${renderInline(
          body.join(" "),
        )}</blockquote>`,
      );
      continue;
    }

    if (/^\s*[-*+]\s+/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^\s*[-*+]\s+/.test(lines[index]!)) {
        items.push(
          `<li class="leading-relaxed">${renderInline(
            lines[index]!.replace(/^\s*[-*+]\s+/, ""),
          )}</li>`,
        );
        index += 1;
      }
      output.push(`<ul class="my-4 list-disc space-y-1 pl-5">${items.join("")}</ul>`);
      continue;
    }

    if (/^\s*\d+[.)]\s+/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^\s*\d+[.)]\s+/.test(lines[index]!)) {
        items.push(
          `<li class="leading-relaxed">${renderInline(
            lines[index]!.replace(/^\s*\d+[.)]\s+/, ""),
          )}</li>`,
        );
        index += 1;
      }
      output.push(`<ol class="my-4 list-decimal space-y-1 pl-5">${items.join("")}</ol>`);
      continue;
    }

    if (line.includes("|") && /^\s*\|?[\s:-]+\|/.test(lines[index + 1] ?? "")) {
      const header = parseTableRow(line);
      index += 2;
      const rows: string[][] = [];
      while (index < lines.length && lines[index]!.includes("|")) {
        rows.push(parseTableRow(lines[index]!));
        index += 1;
      }
      output.push(
        `<div class="my-4 overflow-x-auto"><table class="w-full border-collapse text-left text-sm"><thead><tr>${header
          .map(
            (cell) =>
              `<th class="border px-3 py-2 font-medium">${renderInline(cell)}</th>`,
          )
          .join("")}</tr></thead><tbody>${rows
          .map(
            (row) =>
              `<tr>${row
                .map(
                  (cell) =>
                    `<td class="border px-3 py-2 align-top">${renderInline(cell)}</td>`,
                )
                .join("")}</tr>`,
          )
          .join("")}</tbody></table></div>`,
      );
      continue;
    }

    const paragraph: string[] = [];
    while (
      index < lines.length &&
      lines[index]!.trim() &&
      !/^(#{1,6})\s+/.test(lines[index]!) &&
      !/^```/.test(lines[index]!) &&
      !/^\s*[-*+]\s+/.test(lines[index]!) &&
      !/^\s*\d+[.)]\s+/.test(lines[index]!) &&
      !lines[index]!.trimStart().startsWith(">") &&
      !/^(-{3,}|\*{3,}|_{3,})$/.test(lines[index]!.trim())
    ) {
      paragraph.push(lines[index]!);
      index += 1;
    }
    output.push(
      `<p class="mt-4 leading-relaxed first:mt-0">${renderInline(
        paragraph.join(" "),
      )}</p>`,
    );
  }

  return output.join("");
}
