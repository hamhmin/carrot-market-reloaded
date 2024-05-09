import { InputHTMLAttributes } from "react";

interface FormInputProps {
  //   type: string;
  //   placeholder: string;
  //   required: boolean;
  errors?: string[];
  name: string;
}
export default function Input({
  //   type,
  //   placeholder,
  //   required,
  errors = [],
  name,
  ...rest
}: FormInputProps & InputHTMLAttributes<HTMLInputElement>) {
  // console.log(rest);
  return (
    <div className="flex flex-col gap-2">
      <input
        name={name}
        className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-2 focus:ring-4 ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400 transition"
        {...rest}
      />
      {errors.map((error, index) => (
        <span className="text-red-500 font-medium" key={index}>
          {error}
        </span>
      ))}
    </div>
  );
}
