import * as React from 'react';
import { useStyletron } from 'baseui';

const Products: React.FC = () => {
  const [css, theme] = useStyletron();
  return (
    <>
      <div>Products</div>
    </>
  );
};

export default Products;
