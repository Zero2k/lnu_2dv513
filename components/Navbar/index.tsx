import * as React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useStyletron } from 'baseui';
import { AppNavBar, NavItemT } from 'baseui/app-nav-bar';
import { Back, More } from '../../icons';

export default function Navbar() {
  const [css] = useStyletron();
  const { asPath, push } = useRouter();
  const [mainItems] = React.useState<NavItemT[]>([
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
          info: { link: '/products/pyro' },
        },
        {
          label: 'Familjesatser',
          info: { link: '/products/familj' },
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
          info: { link: '/products/innomhus' },
        },
        {
          label: 'Markpjäser / Airbombs',
          info: { link: '/products/markpjaser' },
        },
        {
          label: 'Övrigt',
          info: { link: '/products/ovrigt' },
        },
      ],
    },
  ]);

  const userItems = [
    {
      label: 'Overview',
      info: { link: '/user/overview' },
    },
    {
      label: 'Settings',
      info: { link: '/user/settings' },
    },
    {
      label: 'Logout',
      info: { link: '/logout' },
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
              App
            </a>
          </Link>
        }
        mainItems={mainItems}
        userItems={userItems}
        onUserItemSelect={(item) => console.log('user', item)}
        username="Hello World"
        usernameSubtitle="5.0"
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
