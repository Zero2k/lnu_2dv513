import * as React from 'react';
import { useStyletron } from 'baseui';
import Section from 'components/Section';

const Products: React.FC = () => {
  const [css, theme] = useStyletron();
  return (
    <>
      <Section>Products</Section>
    </>
  );
};

export default Products;
