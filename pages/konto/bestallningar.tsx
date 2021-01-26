import * as React from 'react';
import _ from 'lodash';
import { useStyletron } from 'baseui';
import { Block } from 'baseui/block';
import { Heading, HeadingLevel } from 'baseui/heading';
import { Grid, Cell } from 'baseui/layout-grid';
import { ListItem, ListItemLabel } from 'baseui/list';
import { Button } from 'baseui/button';
import Private from '../../layouts/private';
import OrderTable from '../../components/OrderTable';
import { useQuery } from '@apollo/client';
import { USER_ORDERS_QUERY } from 'graphql/user';
import { isServer } from 'utils/isServer';
import Link from 'next/link';
import { useIsAuth } from 'utils/useIsAuth';

const Orders = () => {
  useIsAuth();
  const orders = useQuery(USER_ORDERS_QUERY, { skip: isServer() });
  const { data, loading } = orders;
  const [css, theme] = useStyletron();

  if (!data || loading) {
    return (
      <React.Fragment>
        <div>Loading...</div>
      </React.Fragment>
    );
  }

  return (
    <>
      <Block
        margin="20px auto"
        height={['80px', '200px', '250px', '560px']}
        display="block"
        flexWrap
      >
        <Grid
          gridMargins={0}
          gridColumns={12}
          gridGaps={[3, 6, 12]}
          gridGutters={[3, 6, 12]}
        >
          <Cell span={[12, 12, 8]}>
            <HeadingLevel>
              <Heading styleLevel={4}>Beställningar</Heading>
              <OrderTable orders={data.resellerOrders} />
            </HeadingLevel>
          </Cell>
          <Cell span={[12, 12, 4]}>
            <ul
              className={css({
                width: '100%',
                paddingLeft: 0,
                paddingRight: 0,
              })}
            >
              <ListItem
                endEnhancer={() => (
                  <Link href="/konto/oversikt" passHref>
                    <Button $as="a" size="compact" kind="secondary">
                      Hantera
                    </Button>
                  </Link>
                )}
              >
                <ListItemLabel>Översikt</ListItemLabel>
              </ListItem>
              <ListItem
                endEnhancer={() => (
                  <Link href="/konto/installningar" passHref>
                    <Button $as="a" size="compact" kind="secondary">
                      Hantera
                    </Button>
                  </Link>
                )}
              >
                <ListItemLabel>Inställningar</ListItemLabel>
              </ListItem>
              <ListItem
                endEnhancer={() => (
                  <Link href="/konto/produkter" passHref>
                    <Button $as="a" size="compact" kind="secondary">
                      Hantera
                    </Button>
                  </Link>
                )}
              >
                <ListItemLabel>Produkter</ListItemLabel>
              </ListItem>
              <ListItem
                endEnhancer={() => (
                  <Button size="compact" kind="secondary" disabled>
                    Hantera
                  </Button>
                )}
              >
                <ListItemLabel>Beställningar</ListItemLabel>
              </ListItem>
            </ul>
          </Cell>
        </Grid>
      </Block>
    </>
  );
};

Orders.layout = Private;

export default Orders;
