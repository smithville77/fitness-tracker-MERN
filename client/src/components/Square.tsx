import React, { CSSProperties } from 'react';

interface SquareProps {
  children: React.ReactNode;
  style?: CSSProperties; 
}

const Square: React.FC<SquareProps> = ({ children, style }) => {
 

  return (
    <div className="square" style={style}>
      {children}
    </div>
  );
};

export default Square;
