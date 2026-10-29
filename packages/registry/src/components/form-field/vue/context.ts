import type { ComputedRef, InjectionKey, Ref } from "vue";

export interface FormFieldContext {
  /** Generated (or provided) id for the field control. */
  controlId: ComputedRef<string>;
  descriptionId: ComputedRef<string>;
  errorId: ComputedRef<string>;
  required: ComputedRef<boolean>;
  optional: ComputedRef<boolean>;
  invalid: ComputedRef<boolean>;
  /** Space-separated ids of the description and error, when rendered. */
  describedBy: ComputedRef<string | undefined>;
  hasDescription: Ref<boolean>;
  hasError: Ref<boolean>;
}

export const FORM_FIELD_KEY: InjectionKey<FormFieldContext> =
  Symbol("form-field");
