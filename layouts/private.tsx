import React from 'react';
import { useQuery } from '@apollo/client';
import { Grid, Cell, BEHAVIOR } from 'baseui/layout-grid';
import Navbar from '../components/Navbar';
import { ME_QUERY } from 'graphql/user';
import { isServer } from 'utils/isServer';
import { withApollo } from 'utils/withApollo';

interface Props {
  children?: JSX.Element;
}

const Private = ({ children }: Props) => {
  const userData = useQuery(ME_QUERY, { skip: isServer() });

  const { data } = userData;

  return (
    <React.Fragment>
      <Navbar user={data?.me} />
      <Grid behavior={BEHAVIOR.fixed}>
        <Cell span={12}>
          {React.cloneElement(children, { currentUser: data?.me })}
        </Cell>
      </Grid>
    </React.Fragment>
  );
};

export default withApollo({ ssr: false })(Private);
