import * as React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useStyletron } from 'baseui';
import { AppNavBar } from 'baseui/app-nav-bar';
import { Back, More } from '../../icons';

export default function Navbar({ user }) {
  const [css] = useStyletron();
  const { asPath, push } = useRouter();
  const mainItems = [
    { label: 'Start', info: { link: '/' } },
    { label: 'Om sidan', info: { link: '/about' } },
    { label: 'Återförsäljare', info: { link: '/resellers' } },
    {
      icon: More,
      label: 'Produkter',
      info: { link: '/products' },
      navExitIcon: Back,
      children: [
        {
          label: 'Pyrosatser',
          info: { link: '/products/pyrosatser' },
        },
        {
          label: 'Familjesatser',
          info: { link: '/products/familjesatser' },
        },
        {
          label: 'Bombtårtor',
          info: { link: '/products/bombtartor' },
        },
        {
          label: 'Fyrverkeritårtor',
          info: { link: '/products/fyrverkeritartor' },
        },
        {
          label: 'Proffsfyrverkerier',
          info: { link: '/products/proffsfyrverkerier' },
        },
        {
          label: 'Inomhus & Tomtebloss',
          info: { link: '/products/innomhus-tomtebloss' },
        },
        {
          label: 'Markpjäser / Airbombs',
          info: { link: '/products/markpjaser-airbombs' },
        },
        {
          label: 'Övrigt',
          info: { link: '/products/ovrigt' },
        },
      ],
    },
  ];

  const userItems = [
    {
      label: 'Översikt',
      info: { link: '/user/overview' },
    },
    {
      label: 'Inställningar',
      info: { link: '/user/settings' },
    },
    {
      label: 'Logga ut',
      info: { link: '/logout' },
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
        username="PyroLead.com"
        userImgUrl=""
        onMainItemSelect={handleMainItemSelect}
        isMainItemActive={isMainItemActive}
        mapItemToNode={(item) => (
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
        )}
      />
    </React.Fragment>
  );
}
