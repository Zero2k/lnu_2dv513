import * as React from 'react';
import { useStyletron } from 'baseui';
import { Block } from 'baseui/block';
import { Heading, HeadingLevel } from 'baseui/heading';
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
      <Block margin="20px auto" maxWidth="550px" display="flex" flexWrap>
        <HeadingLevel>
          <Heading styleLevel={4}>Hantera Profil</Heading>
          <HandleProfileForm
            user={currentUser}
            redirect={() => router.push('/konto/oversikt')}
          />
        </HeadingLevel>
      </Block>
    </>
  );
};

Installningar.layout = Private;

export default Installningar;
