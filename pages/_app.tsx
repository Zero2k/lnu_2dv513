import React from 'react';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider } from 'baseui';
import { styletron } from '../styletron';
import PageWithLayoutType from '../types/pageWithLayout';
import Public from '../layouts/public';

type AppLayoutProps = {
  Component: PageWithLayoutType;
  pageProps: any;
};

function MyApp({ Component, pageProps }: AppLayoutProps) {
  const Layout = Component.layout || Public;
  return (
    <StyletronProvider value={styletron}>
      <BaseProvider theme={LightTheme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </BaseProvider>
    </StyletronProvider>
  );
}

export default MyApp;
