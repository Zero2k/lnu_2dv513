import * as React from 'react';
import { useStyletron } from 'baseui';

export const sum = (a: number, b: number) => a + b;

const Type: React.FC = () => {
  const [css, theme] = useStyletron();
  return (
    <>
      <div>Product Type</div>
    </>
  );
};

export default Type;
