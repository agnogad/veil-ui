import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from "./index";

export function DescriptionListBasic() {
  return (
    <DescriptionList className="max-w-sm">
      <div className="grid gap-1">
        <DescriptionTerm>License</DescriptionTerm>
        <DescriptionDetails>MIT, forever.</DescriptionDetails>
      </div>
      <div className="grid gap-1">
        <DescriptionTerm>Runtime wrappers</DescriptionTerm>
        <DescriptionDetails>None — components are copied as source.</DescriptionDetails>
      </div>
    </DescriptionList>
  );
}

export function DescriptionListInline() {
  return (
    <DescriptionList layout="inline" className="max-w-md">
      <DescriptionTerm>Components</DescriptionTerm>
      <DescriptionDetails>42 core primitives</DescriptionDetails>
      <DescriptionTerm>Blocks</DescriptionTerm>
      <DescriptionDetails>75 page sections planned</DescriptionDetails>
      <DescriptionTerm>Styling</DescriptionTerm>
      <DescriptionDetails>Tailwind CSS v4 tokens</DescriptionDetails>
    </DescriptionList>
  );
}
