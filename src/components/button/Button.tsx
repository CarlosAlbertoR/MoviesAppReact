import React, { MouseEventHandler, ReactNode } from "react";
import PropTypes from "prop-types";
import "./Button.scss";

interface ButtonProps {
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}

const Button = (props: ButtonProps) => {
  return (
    <button className={`btn ${props.className}`} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

interface OutlineButtonProps extends ButtonProps {}

export const OutlineButton = (props: OutlineButtonProps) => {
  return (
    <Button
      className={`btn-outline ${props.className}`}
      onClick={props.onClick}
    >
      {props.children}
    </Button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
};

export default Button;
