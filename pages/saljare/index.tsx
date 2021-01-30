import * as React from 'react';
import { useStyletron } from 'baseui';
import Section from 'components/Section';
import { useQuery } from '@apollo/client';
import { Grid, Cell } from 'baseui/layout-grid';
import Reseller from 'components/Reseller';
import { RESELLERS_QUERY } from 'graphql/user';

const Resellers: React.FC = () => {
  const [css, theme] = useStyletron();
  const resellersData = useQuery(RESELLERS_QUERY);

  const { data, loading } = resellersData;

  if (!data || loading) {
    return (
      <React.Fragment>
        <div>Loading...</div>
      </React.Fragment>
    );
  }

  const { resellers } = data;

  return (
    <>
      <Section>
        <Grid
          gridMargins={0}
          gridColumns={12}
          gridGaps={[3, 6, 12]}
          gridGutters={[3, 6, 12]}
        >
          {resellers.map((reseller) => (
            <Cell span={[12, 6, 4]} key={reseller.id}>
              <Reseller reseller={reseller} />
            </Cell>
          ))}
        </Grid>
      </Section>
    </>
  );
};

export default Resellers;
