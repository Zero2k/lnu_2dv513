import React, { ReactNode } from 'react';
import { useQuery } from '@apollo/client';
import { Grid, Cell, BEHAVIOR } from 'baseui/layout-grid';
import Navbar from '../components/Navbar';
import Footer from 'components/Footer';
import { ME_QUERY } from 'graphql/user';

interface Props {
  children?: ReactNode;
}

const Public = ({ children }: Props) => {
  const { data } = useQuery(ME_QUERY);

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

export default Public;
