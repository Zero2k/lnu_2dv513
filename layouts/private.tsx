import React from 'react';
import { useQuery } from '@apollo/client';
import { Grid, Cell, BEHAVIOR } from 'baseui/layout-grid';
import Navbar from '../components/Navbar';
import { ME_QUERY } from 'graphql/user';
import { isServer } from 'utils/isServer';
import { withApollo } from 'utils/withApollo';
import { useRouter } from 'next/router';

interface Props {
  children?: JSX.Element;
}

const Private = ({ children }: Props) => {
  const router = useRouter();
  const userData = useQuery(ME_QUERY, { skip: isServer() });

  React.useEffect(() => {
    if (!userData.loading && !userData.data?.me) {
      router.push('/konto/logga-in');
    }
  }, [userData]);

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
