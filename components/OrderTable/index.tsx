import * as React from 'react';
import { useStyletron } from 'baseui';
import { Pagination } from 'baseui/pagination';
import { TableBuilder, TableBuilderColumn } from 'baseui/table-semantic';

interface Props {
  orders: any[];
}

function Orders({ orders }: Props) {
  const [css, theme] = useStyletron();
  const [page, setPage] = React.useState(1);
  const [limit] = React.useState(12);

  const handlePageChange = (nextPage: number) => {
    if (nextPage < 1) {
      return;
    }
    if (nextPage > Math.ceil(orders.length / limit)) {
      return;
    }
    setPage(nextPage);
  };

  const window = () => {
    const min = (page - 1) * limit;
    return orders.slice(min, min + limit);
  };

  return (
    <React.Fragment>
      <div className={css({ maxHeight: '500px' })}>
        <TableBuilder
          data={window()}
          emptyMessage={<h3>Det finns inga produkter i varukorgen.</h3>}
        >
          <TableBuilderColumn header="ID">
            {(row) => row.customerId}
          </TableBuilderColumn>
          <TableBuilderColumn header="Namn">
            {(row) => row.customerName}
          </TableBuilderColumn>
          <TableBuilderColumn header="E-post">
            {(row) => row.customerEmail}
          </TableBuilderColumn>
          <TableBuilderColumn header="Totalt">
            {(row) => `${row.total} kr`}
          </TableBuilderColumn>
          <TableBuilderColumn header="Hantera">
            {(row) => (
              <div
                className={css({
                  textDecoration: 'underline',
                  cursor: 'pointer',
                })}
              >
                Visa
              </div>
            )}
          </TableBuilderColumn>
        </TableBuilder>
      </div>
      <div
        className={css({
          paddingTop: theme.sizing.scale600,
          paddingBottom: theme.sizing.scale600,
          display: 'flex',
          justifyContent: 'space-between',
        })}
      >
        <Pagination
          currentPage={page}
          numPages={Math.ceil(orders.length / limit)}
          onPageChange={({ nextPage }) => handlePageChange(nextPage)}
        />
      </div>
    </React.Fragment>
  );
}

export default function OrderTable({ orders }: Props) {
  console.log(orders);
  return <Orders orders={orders} />;
}
