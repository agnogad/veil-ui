import { TruncatedText } from "./index";

const copy =
  "The CLI resolves dependencies, writes the files and installs what is missing. Your design system grows from there, one component at a time, with no runtime wrapper in the way.";

export function TruncatedTextBasic() {
  return (
    <TruncatedText lines={2} className="max-w-sm text-sm">
      {copy}
    </TruncatedText>
  );
}

export function TruncatedTextSingleLine() {
  return (
    <TruncatedText lines={1} className="max-w-48 text-sm">
      {copy}
    </TruncatedText>
  );
}
