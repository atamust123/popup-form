import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface Input {
  name: string;
  label: string;
  disabled?: boolean;
  inputProps?: Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    "name" | "label" | "disabled"
  >;
}

export const Input: React.FC<Input> = (props) => {
  const { disabled, label, name, inputProps } = props || {};
  const { control } = useFormContext();
  return (
    <>
      <label
        aria-labelledby={label}
        className={`label-1 mb-3 ${disabled && "opacity-60"}`}
      >
        {label}
      </label>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => {
          return (
            <div className="flex flex-col mb-6">
              <input
                {...inputProps}
                {...field}
                className={` input-1 mt-3  ${
                  error?.message ? "focus:ring-rose-500 bg-blue" : ""
                } ${inputProps?.className}`}
                disabled={disabled}
              />
              <p className="font-light text-sm text-red-600 mt-1">
                {error?.message}
              </p>
            </div>
          );
        }}
      />
    </>
  );
};
