import * as React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useStyletron } from 'baseui';
import { AppNavBar } from 'baseui/app-nav-bar';
import { Back, More } from '../../icons';
import { useMutation, useApolloClient } from '@apollo/client';
import { LOGOUT } from 'graphql/user';

export default function Navbar({ user }) {
  const [logout] = useMutation(LOGOUT);
  const apolloClient = useApolloClient();
  const router = useRouter();
  const [css] = useStyletron();
  const { asPath, push } = useRouter();
  const mainItems = [
    { label: 'Start', info: { link: '/' } },
    { label: 'Återförsäljare', info: { link: '/saljare' } },
    {
      icon: More,
      label: 'Produkter',
      info: { link: '/produkter' },
      navExitIcon: Back,
      children: [
        {
          label: 'Pyrosatser',
          info: { link: '/produkter/pyrosatser' },
        },
        {
          label: 'Familjesatser',
          info: { link: '/produkter/familjesatser' },
        },
        {
          label: 'Bombtårtor',
          info: { link: '/produkter/bombtartor' },
        },
        {
          label: 'Fyrverkeritårtor',
          info: { link: '/produkter/fyrverkeritartor' },
        },
        {
          label: 'Proffsfyrverkerier',
          info: { link: '/produkter/proffsfyrverkerier' },
        },
        {
          label: 'Inomhus & Tomtebloss',
          info: { link: '/produkter/innomhus-tomtebloss' },
        },
        {
          label: 'Markpjäser / Airbombs',
          info: { link: '/produkter/markpjaser-airbombs' },
        },
        {
          label: 'Övrigt',
          info: { link: '/produkter/ovrigt' },
        },
      ],
    },
  ];

  const userItems = [
    {
      label: 'Översikt',
      info: { link: '/konto/oversikt' },
    },
    {
      label: 'Inställningar',
      info: { link: '/konto/installningar' },
    },
    {
      label: 'Logga ut',
      info: { link: '', onClick: () => handleLogout() },
    },
  ];

  const authItems = [
    {
      label: 'Logga In',
      info: { link: '/konto/logga-in' },
    },
    {
      label: 'Skapa Konto',
      info: { link: '/konto/skapa-konto' },
    },
  ];

  const handleMainItemSelect = React.useCallback((item) => {
    push(item.info?.link);
  }, []);

  const isMainItemActive = React.useCallback(
    (item) => {
      return item.info?.link === asPath;
    },
    [asPath]
  );

  const handleLogout = async () => {
    try {
      await logout();
      await apolloClient.clearStore();
      router.push('/');
    } catch (e) {
      console.error(e);
    }
  };

  React.useEffect(() => {
    isMainItemActive(asPath);
  }, []);

  return (
    <React.Fragment>
      <AppNavBar
        title={
          <Link href="/" passHref>
            <a
              className={css({
                textDecoration: 'none',
                color: '#000000',
              })}
            >
              PyroLead.com
            </a>
          </Link>
        }
        mainItems={mainItems}
        userItems={!user ? authItems : userItems}
        username={!user ? 'PyroLead.com' : user.email}
        userImgUrl=""
        onMainItemSelect={handleMainItemSelect}
        isMainItemActive={isMainItemActive}
        mapItemToNode={(item) => {
          return !item.info?.onClick ? (
            <Link href={item.info?.link} passHref>
              <a
                className={css({
                  textDecoration: 'none',
                  color: '#000000',
                })}
              >
                {item.label}
              </a>
            </Link>
          ) : (
            <span onClick={item.info.onClick}>
              <a
                className={css({
                  textDecoration: 'none',
                  color: '#000000',
                })}
              >
                {item.label}
              </a>
            </span>
          );
        }}
      />
    </React.Fragment>
  );
}
