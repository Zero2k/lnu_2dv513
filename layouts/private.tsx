import React from 'react';
import { Grid, Cell, BEHAVIOR } from 'baseui/layout-grid';
import Navbar from '../components/Navbar';
import { withApollo } from 'utils/withApollo';
import { useIsAuth } from 'utils/useIsAuth';

interface Props {
  children?: JSX.Element;
}

const Private = ({ children }: Props) => {
  const { currentUser, loading } = useIsAuth();

  if (!currentUser && loading) {
    return (
      <React.Fragment>
        <div>Loading...</div>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Navbar user={currentUser} />
      <Grid behavior={BEHAVIOR.fixed}>
        <Cell span={12}>{children}</Cell>
      </Grid>
    </React.Fragment>
  );
};

export default withApollo({ ssr: false })(Private);
