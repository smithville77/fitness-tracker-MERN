import React, { CSSProperties } from "react";

interface SquareProps {
  children: React.ReactNode;
}

const Square: React.FC<SquareProps> = ({ children }) => {
  return <div className="square">{children}</div>;
};

export default Square;
