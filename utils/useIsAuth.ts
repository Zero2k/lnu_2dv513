import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { ME_QUERY } from 'graphql/user';

export const useIsAuth = () => {
  const router = useRouter();
  const userData = useQuery(ME_QUERY);

  React.useEffect(() => {
    if (!userData.loading && !userData.data?.me) {
      router.push('/konto/logga-in');
    }
  }, [userData]);

  const { data, loading } = userData;

  return {
    currentUser: data?.me,
    loading,
  };
};
