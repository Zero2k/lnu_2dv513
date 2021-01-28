import * as React from 'react';
import Link from 'next/link';
import { useStyletron } from 'baseui';
import { Pagination } from 'baseui/pagination';
import { TableBuilder, TableBuilderColumn } from 'baseui/table-semantic';
import { CheckIndeterminate, Check } from 'baseui/icon';

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
          emptyMessage={<h3>Du har just nu inga ordrar.</h3>}
        >
          <TableBuilderColumn header="Namn">
            {(row) => row.customerName}
          </TableBuilderColumn>
          <TableBuilderColumn header="Telefon">
            {(row) => row.customerId}
          </TableBuilderColumn>
          <TableBuilderColumn header="E-post">
            {(row) => row.customerEmail}
          </TableBuilderColumn>
          <TableBuilderColumn header="Totalt">
            {(row) => `${row.total} kr`}
          </TableBuilderColumn>
          <TableBuilderColumn header="Färdig">
            {(row) => (row.completed ? <Check /> : <CheckIndeterminate />)}
          </TableBuilderColumn>
          <TableBuilderColumn header="Hantera">
            {(row) => (
              <Link href={`/konto/bestallningar/${row.id}`} passHref>
                <a>Visa</a>
              </Link>
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

export default function OrdersTable({ orders }: Props) {
  console.log(orders);
  return <Orders orders={orders} />;
}
