import React, { ReactNode } from 'react';
import { Grid, Cell, BEHAVIOR } from 'baseui/layout-grid';
import Navbar from '../components/Navbar';
import { withApollo } from 'utils/withApollo';
import { useIsAuth } from 'utils/useIsAuth';

interface Props {
  children?: ReactNode;
}

const Public = ({ children }: Props) => {
  const { currentUser } = useIsAuth();

  return (
    <React.Fragment>
      <Navbar user={currentUser} />
      <Grid behavior={BEHAVIOR.fixed}>
        <Cell span={12}>{children}</Cell>
      </Grid>
    </React.Fragment>
  );
};

export default withApollo({ ssr: true })(Public);
