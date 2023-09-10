import { Input as FormInput } from "./Input";

import { FormProvider, UseFormReturn } from "react-hook-form";
import { RadioGroup } from "./RadioGroup";

interface Form {
  children: React.ReactNode;
  formAttributes: UseFormReturn;
  onSubmit: () => any;
  id?: string;
  formProps?: Omit<
    React.DetailedHTMLProps<
      React.FormHTMLAttributes<HTMLFormElement>,
      HTMLFormElement
    >,
    "onSubmit" | "id"
  >;
}

const Form: React.FC<Form> = (props) => {
  const { children, formAttributes, onSubmit, formProps, id } = props || {};
  return (
    <FormProvider {...formAttributes}>
      <form onSubmit={onSubmit} id={id} {...formProps}>
        {children}
      </form>
    </FormProvider>
  );
};

export default Object.assign(Form, {
  Input: FormInput,
  RadioGroup: RadioGroup,
});
