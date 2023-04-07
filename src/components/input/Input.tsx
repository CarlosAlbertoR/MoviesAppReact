import React, { ChangeEvent } from "react";
import "./Input.scss";

interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input = (props: InputProps) => {
  return (
    <input
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange ? (e) => props.onChange?.(e) : undefined}
    />
  );
};

export default Input;
