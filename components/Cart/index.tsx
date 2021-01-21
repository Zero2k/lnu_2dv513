import * as React from 'react';
import { TableBuilder, TableBuilderColumn } from 'baseui/table-semantic';
import { Button } from 'baseui/button';
import { useStyletron } from 'styletron-react';

interface Props {
  products: any[];
  removeFromCart: (product: any) => void;
  setFormPart: (part: number) => void;
}

function Cart({ products, removeFromCart, setFormPart }: Props) {
  const [css] = useStyletron();
  return (
    <>
      <TableBuilder
        overrides={{
          Root: {
            style: {
              maxHeight: '290px',
            },
          },
        }}
        data={products}
        emptyMessage={<h3>Det finns inga produkter i varukorgen.</h3>}
      >
        <TableBuilderColumn header="Produkt">
          {(row) => row.name}
        </TableBuilderColumn>
        <TableBuilderColumn header="Antal">
          {(row) => `${row.quantity} st`}
        </TableBuilderColumn>
        <TableBuilderColumn header="Pris">
          {(row) => `${row.price} kr`}
        </TableBuilderColumn>
        <TableBuilderColumn header="Totalt">
          {(row) => `${row.price * row.quantity} kr`}
        </TableBuilderColumn>
        <TableBuilderColumn header="Hantera">
          {(row) => (
            <div
              className={css({
                textDecoration: 'underline',
                cursor: 'pointer',
              })}
              onClick={() => removeFromCart(row)}
            >
              Ta Bort
            </div>
          )}
        </TableBuilderColumn>
      </TableBuilder>
      {products.length > 0 && (
        <Button
          onClick={() => setFormPart(2)}
          overrides={{
            BaseButton: { style: { marginTop: '15px' } },
          }}
        >
          Nästa
        </Button>
      )}
    </>
  );
}

export default Cart;
