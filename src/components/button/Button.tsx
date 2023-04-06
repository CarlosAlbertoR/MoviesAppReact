import React, { MouseEventHandler, ReactNode } from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

interface ButtonProps {
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}

const Button = ({ className = '', onClick, children }: ButtonProps) => {
  return (
    <button
      className={`btn ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

interface OutlineButtonProps extends ButtonProps { }

export const OutlineButton = ({ className = '', onClick, children }: OutlineButtonProps) => {
  return (
    <Button
      className={`btn-outline ${className}`}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
};

export default Button;
