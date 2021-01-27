import * as React from 'react';
import { useStyletron } from 'baseui';
import { TableBuilder, TableBuilderColumn } from 'baseui/table-semantic';
import { Button } from 'baseui/button';

interface Props {
  order: any[];
}

function Order({ order }: Props) {
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
          Order - #
        </div>
        <Button>
          <div
            className={css({
              paddingLeft: theme.sizing.scale1200,
              paddingRight: theme.sizing.scale1200,
            })}
          >
            Markera som: Klar
          </div>
        </Button>
      </div>
      <div className={css({ maxHeight: '500px' })}>
        <TableBuilder
          data={order}
          emptyMessage={<h3>Det finns inga order med ID: #.</h3>}
        >
          <TableBuilderColumn header="ID">
            {(row) => row.customerId}
          </TableBuilderColumn>
          <TableBuilderColumn header="Namn">
            {(row) => row.customerName}
          </TableBuilderColumn>
          <TableBuilderColumn header="Pris">
            {(row) => `${row.customerEmail} kr`}
          </TableBuilderColumn>
          <TableBuilderColumn header="Antal">
            {(row) => `${row.total} st`}
          </TableBuilderColumn>
        </TableBuilder>
      </div>
    </React.Fragment>
  );
}

export default function OrderTable({ order }: Props) {
  return <Order order={order} />;
}
