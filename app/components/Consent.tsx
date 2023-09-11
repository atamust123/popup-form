import { Controller, useFormContext } from "react-hook-form";

interface Consent {
  name: string;
}

export const Consent: React.FC<Consent> = (props) => {
  const { name } = props || {};
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="flex  gap-2 mb-6">
          <input type="checkbox" id={name} {...field} className="w-4 h-6" />
          <label htmlFor={name} className="font-normal">
            I agree to the{" "}
            <a
              href="https://app.popupsmart.com/privacy-policy"
              target="_blank"
              className="font-medium"
            >
              Privacy Policy
            </a>
          </label>
        </div>
      )}
    />
  );
};
