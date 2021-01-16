import * as React from 'react';
import { useStyletron } from 'baseui';
import { Block } from 'baseui/block';
import Private from '../../layouts/private';
import HandleProfileForm from 'forms/handleProfile';
import { useRouter } from 'next/router';
import { useIsAuth } from 'utils/useIsAuth';

const Installningar = () => {
  const { currentUser } = useIsAuth();
  const [css, theme] = useStyletron();
  const router = useRouter();

  return (
    <>
      <Block
        margin="20px auto"
        height={['80px', '200px', '250px', '560px']}
        maxWidth="550px"
        display="flex"
        flexWrap
      >
        <HandleProfileForm
          user={currentUser}
          redirect={() => router.push('/konto/oversikt')}
        />
      </Block>
    </>
  );
};

Installningar.layout = Private;

export default Installningar;
