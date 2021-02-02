import * as React from 'react';
import { useRouter } from 'next/router';
import _ from 'lodash';
import { useStyletron } from 'baseui';
import { Block } from 'baseui/block';
import { Grid, Cell } from 'baseui/layout-grid';
import { ListItem, ListItemLabel } from 'baseui/list';
import { Heading, HeadingLevel } from 'baseui/heading';
import { Button } from 'baseui/button';
import Private from '../../../layouts/private';
import OrderTable from '../../../components/OrderTable';
import { useQuery, useMutation } from '@apollo/client';
import Link from 'next/link';
import { useIsAuth } from 'utils/useIsAuth';
import { ORDER_QUERY, COMPLETE_ORDER_MUTATION } from 'graphql/order';
import { getAsInt } from 'utils/getAsInt';

const Order = () => {
  useIsAuth();
  const router = useRouter();
  const { id } = router.query;
  const orderQuery = useQuery(ORDER_QUERY, {
    variables: { orderId: getAsInt(id) },
    skip: Number.isNaN(getAsInt(id)),
  });

  console.log(orderQuery);

  const [completeOrder] = useMutation(COMPLETE_ORDER_MUTATION);
  const { data, loading } = orderQuery;
  const [css, theme] = useStyletron();

  if (!data || loading) {
    return (
      <React.Fragment>
        <div>Loading...</div>
      </React.Fragment>
    );
  }

  const handleOrder = async (id: string) => {
    await completeOrder({
      variables: { orderId: getAsInt(id) },
      update: async (cache, { data: { completeOrder } }) => {
        cache.writeQuery({
          query: ORDER_QUERY,
          data: {
            findOrderById: {
              __typename: 'Order',
              completed: completeOrder.completed,
            },
          },
        });
      },
    });
    router.push('/konto/bestallningar');
  };

  const { findOrderRowsById, findOrderById } = data;

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
            <OrderTable
              orderRows={findOrderRowsById}
              order={findOrderById}
              handleOrder={handleOrder}
            />
            <HeadingLevel>
              <Heading styleLevel={4}>Kundöversikt</Heading>
              <pre>{JSON.stringify(findOrderById, null, 2)}</pre>
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
