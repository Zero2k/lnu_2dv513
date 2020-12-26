import * as React from 'react';
import { useStyletron } from 'baseui';

export const sum = (a: number, b: number) => a + b;

const Products: React.FC = () => {
  const [css, theme] = useStyletron();
  return (
    <>
      <div>Products</div>
    </>
  );
};

export default Products;
