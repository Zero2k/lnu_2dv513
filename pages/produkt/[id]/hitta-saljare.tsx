import * as React from 'react';
import { useStyletron } from 'baseui';
import { Grid, Cell } from 'baseui/layout-grid';
import { useQuery } from '@apollo/client';
import Section from 'components/Section';
import Reseller from 'components/Reseller';
import { useRouter } from 'next/router';
import { USERS_WITH_PRODUCT_ID_QUERY } from 'graphql/user';
import { getAsInt } from 'utils/getAsInt';

const ProductsBySeller: React.FC = () => {
  const [css, theme] = useStyletron();
  const router = useRouter();
  const { id } = router.query;
  const resellersData = useQuery(USERS_WITH_PRODUCT_ID_QUERY, {
    variables: { productId: getAsInt(id) },
    skip: Number.isNaN(getAsInt(id)),
  });

  const { data, loading } = resellersData;

  if (!data || loading) {
    return (
      <React.Fragment>
        <div>Loading...</div>
      </React.Fragment>
    );
  }

  const { findUsersByProduct } = data;

  return (
    <>
      <Section>
        <Grid
          gridMargins={0}
          gridColumns={12}
          gridGaps={[3, 6, 12]}
          gridGutters={[3, 6, 12]}
        >
          {findUsersByProduct.map((reseller) => (
            <Cell span={[12, 6, 4]} key={reseller.id}>
              <Reseller reseller={reseller} />
            </Cell>
          ))}
        </Grid>
      </Section>
    </>
  );
};

export default ProductsBySeller;
