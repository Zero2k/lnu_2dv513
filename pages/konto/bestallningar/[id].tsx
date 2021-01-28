import * as React from 'react';
import { useRouter } from 'next/router';
import _ from 'lodash';
import { useStyletron } from 'baseui';
import { Block } from 'baseui/block';
import { Grid, Cell } from 'baseui/layout-grid';
import { ListItem, ListItemLabel } from 'baseui/list';
import { Button } from 'baseui/button';
import Private from '../../../layouts/private';
import OrderTable from '../../../components/OrderTable';
import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { useIsAuth } from 'utils/useIsAuth';
import { ORDER_QUERY } from 'graphql/order';
import { getAsInt } from 'utils/getAsInt';

const Order = () => {
  useIsAuth();
  const router = useRouter();
  const { id } = router.query;
  const orderQuery = useQuery(ORDER_QUERY, {
    variables: { orderId: getAsInt(id) },
    skip: Number.isNaN(getAsInt(id)),
  });
  const { data, loading } = orderQuery;
  const [css, theme] = useStyletron();

  if (!data || loading) {
    return (
      <React.Fragment>
        <div>Loading...</div>
      </React.Fragment>
    );
  }

  const orderRows = data.findOrderRowsById;
  console.log(orderRows);

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
            <OrderTable orderRows={orderRows} />
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
                  <Link href="/konto/bestallningar" passHref>
                    <Button $as="a" size="compact" kind="secondary">
                      Hantera
                    </Button>
                  </Link>
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

Order.layout = Private;

export default Order;
