import React from "react";
import { InputProps } from "../../types";

function Input(props: InputProps) {
  const {
    name,
    type,
    placeholder,
    className,
    onChange,
    validationObj,
    register,
    error,
    multiple,
    value,
    readOnly,
  } = props;
  return (
    <>
      <input
        type={type}
        name={name}
        className={className}
        placeholder={placeholder}
        onChange={onChange}
        {...register(name, { ...validationObj, onChange })}
        multiple={multiple}
        value={value}
        readOnly={readOnly ? readOnly : false}
      />
      {error && (
        <p style={{ color: "red", marginBottom: -10 }}>
          {error?.message || ""}
        </p>
      )}
    </>
  );
}

export default Input;
