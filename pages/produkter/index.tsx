import * as React from 'react';
import { useStyletron } from 'baseui';
import { Grid, Cell } from 'baseui/layout-grid';
import { useQuery } from '@apollo/client';
import Section from 'components/Section';
import { PRODUCTS_QUERY } from 'graphql/product';
import Product from 'components/Product';

const Products: React.FC = () => {
  const [css, theme] = useStyletron();
  const productsData = useQuery(PRODUCTS_QUERY);

  const { data, loading } = productsData;

  if (loading) {
    return (
      <React.Fragment>
        <div>Loading...</div>
      </React.Fragment>
    );
  }

  return (
    <>
      <Section>
        <Grid
          gridMargins={0}
          gridColumns={12}
          gridGaps={[3, 6, 12]}
          gridGutters={[3, 6, 12]}
        >
          {data.products.map((product) => (
            <Cell span={[12, 6, 4]} key={product.id}>
              <Product product={product} />
            </Cell>
          ))}
        </Grid>
      </Section>
    </>
  );
};

export default Products;
