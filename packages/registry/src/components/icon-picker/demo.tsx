import { IconPicker } from "./index";

export function IconPickerBasic() {
  return <IconPicker className="max-w-xs" />;
}

export function IconPickerSelected() {
  return <IconPicker value="Star" className="max-w-xs" />;
}
