"use client";

import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface RadioGroup {
  name: string;
  options: { id: string; label: string }[];
  label: string;
  rest: Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    "label" | "name"
  >;
}

export const RadioGroup: React.FC<RadioGroup> = (props) => {
  const { label, name, options, rest } = props || {};
  const { control } = useFormContext();
  return (
    <>
      <label className="label-1">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div className="flex flex-col mb-6">
            <div className="flex gap-6 mt-3">
              {options?.map((opt) => {
                return (
                  <div className="flex flex-row gap-2" key={opt.id}>
                    <input
                      type="radio"
                      value={opt.id}
                      checked={field.value === opt.id}
                      onChange={field.onChange}
                      className="w-4"
                      disabled={rest.disabled}
                      {...rest}
                    />
                    <label
                      htmlFor={opt.id}
                      className={`typo-2 ${rest.disabled && "opacity-10"}`}
                    >
                      {opt.label}
                    </label>
                  </div>
                );
              })}
            </div>
            <p className="font-light text-sm text-red-600 mt-1">
              {error?.message}
            </p>
          </div>
        )}
      />
    </>
  );
};
