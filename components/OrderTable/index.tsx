import * as React from 'react';
import { useStyletron } from 'baseui';
import { TableBuilder, TableBuilderColumn } from 'baseui/table-semantic';
import { Button } from 'baseui/button';

interface Props {
  orderRows: any[];
  order?: { id: string; completed: boolean };
  handleOrder: (id: string) => void;
}

function Order({ orderRows, order, handleOrder }: Props) {
  const [css, theme] = useStyletron();

  return (
    <React.Fragment>
      <div
        className={css({
          display: 'flex',
          justifyContent: 'space-between',
          paddingTop: theme.sizing.scale600,
          paddingBottom: theme.sizing.scale600,
        })}
      >
        <div
          className={css({
            // ...theme.typography.font750
            fontFamily: theme.typography.font750.fontFamily,
            fontWeight: theme.typography.font750.fontWeight,
            fontSize: theme.typography.font750.fontSize,
            lineHeight: theme.typography.font750.lineHeight,
          })}
        >
          Order - #{order.id}
        </div>
        <Button onClick={() => handleOrder(order.id)}>
          <div
            className={css({
              paddingLeft: theme.sizing.scale1200,
              paddingRight: theme.sizing.scale1200,
            })}
          >
            Markera som: {order.completed ? 'Ej Klar' : 'Klar'}
          </div>
        </Button>
      </div>
      <div className={css({ maxHeight: '500px' })}>
        <TableBuilder
          data={orderRows}
          emptyMessage={<h3>Det finns inga order med ID: #.</h3>}
        >
          <TableBuilderColumn header="ID">
            {(row) => row.rowId}
          </TableBuilderColumn>
          <TableBuilderColumn header="Namn">
            {(row) => row.productName}
          </TableBuilderColumn>
          <TableBuilderColumn header="Pris">
            {(row) => `${row.price} kr`}
          </TableBuilderColumn>
          <TableBuilderColumn header="Kostnad">
            {(row) => `${row.cost} kr`}
          </TableBuilderColumn>
        </TableBuilder>
      </div>
    </React.Fragment>
  );
}

export default function OrderTable({ orderRows, order, handleOrder }: Props) {
  return (
    <Order orderRows={orderRows} order={order} handleOrder={handleOrder} />
  );
}
