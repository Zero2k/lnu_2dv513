import * as React from 'react';
import { useStyletron } from 'baseui';
import { Grid, Cell } from 'baseui/layout-grid';
import { useQuery } from '@apollo/client';
import Section from 'components/Section';
import { PRODUCTS_QUERY } from 'graphql/product';
import Product from 'components/Product';
import { useRouter } from 'next/router';

const ProductsBySeller: React.FC = () => {
  const [css, theme] = useStyletron();
  const router = useRouter();
  const { id } = router.query;
  const productsData = useQuery(PRODUCTS_QUERY);

  const { data, loading } = productsData;

  if (!data || loading) {
    return (
      <React.Fragment>
        <div>Loading...</div>
      </React.Fragment>
    );
  }

  console.log(id);

  const { products } = data;

  return (
    <>
      <Section>
        <Grid
          gridMargins={0}
          gridColumns={12}
          gridGaps={[3, 6, 12]}
          gridGutters={[3, 6, 12]}
        >
          {products.map((product) => (
            <Cell span={[12, 6, 4]} key={product.id}>
              <Product product={product} />
            </Cell>
          ))}
        </Grid>
      </Section>
    </>
  );
};

export default ProductsBySeller;
