import React from "react";
import { InputProps } from "./types";

const Input = ({
  type,
  onChange,
  name,
  placeholder,
  value,
  className,
  error,
}: InputProps) => {
  return (
    <div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder}
        className={`w-[100%] text-black ${className}`}
      />
      {error && error?.length > 0 && (
        <span className="text-red-600">{error}</span>
      )}
    </div>
  );
};

export default Input;
