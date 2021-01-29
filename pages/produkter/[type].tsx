import * as React from 'react';
import { useStyletron } from 'baseui';
import { Grid, Cell } from 'baseui/layout-grid';
import { useQuery } from '@apollo/client';
import Section from 'components/Section';
import { PRODUCTS_BY_CATEGORY_QUERY } from 'graphql/product';
import Product from 'components/Product';
import { useRouter } from 'next/router';

const Type: React.FC = () => {
  const [css, theme] = useStyletron();
  const router = useRouter();
  const { type } = router.query;
  const { data, loading } = useQuery(PRODUCTS_BY_CATEGORY_QUERY, {
    variables: { category: type },
  });

  if (!data || loading) {
    return (
      <React.Fragment>
        <div>Loading...</div>
      </React.Fragment>
    );
  }

  const { productsByCategory } = data;

  return (
    <>
      <Section>
        <Grid
          gridMargins={0}
          gridColumns={12}
          gridGaps={[3, 6, 12]}
          gridGutters={[3, 6, 12]}
        >
          {productsByCategory.map((product) => (
            <Cell span={[12, 6, 4]}>
              <Product product={product} />
            </Cell>
          ))}
        </Grid>
      </Section>
    </>
  );
};

export default Type;
