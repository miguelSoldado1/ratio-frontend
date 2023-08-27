import React, { ReactNode } from "react";
import "./Button.css";

type ButtonProps = {
  children: JSX.Element | ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button className="custom-button" onClick={onClick}>
      {children}
    </button>
  );
};
