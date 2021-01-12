import React, { ReactNode } from 'react';
import { useQuery } from '@apollo/client';
import { Grid, Cell, BEHAVIOR } from 'baseui/layout-grid';
import Navbar from '../components/Navbar';
import Footer from 'components/Footer';
import { ME_QUERY } from 'graphql/user';
import { isServer } from 'utils/isServer';
import { withApollo } from 'utils/withApollo';

interface Props {
  children?: ReactNode;
}

const Public = ({ children }: Props) => {
  const userData = useQuery(ME_QUERY, { skip: isServer() });

  const { data } = userData;

  return (
    <React.Fragment>
      <Navbar user={data?.me} />
      <Grid behavior={BEHAVIOR.fixed}>
        <Cell span={12}>{children}</Cell>
      </Grid>
      <Footer />
    </React.Fragment>
  );
};

export default withApollo({ ssr: true })(Public);
