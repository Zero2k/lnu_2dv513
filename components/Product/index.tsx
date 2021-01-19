import * as React from 'react';
import { useStyletron } from 'baseui';
import { Card, StyledBody, StyledAction } from 'baseui/card';
import { ListItem, ListItemLabel } from 'baseui/list';
import { Button } from 'baseui/button';
import Link from 'next/link';

interface Props {
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    category: {
      id: number;
      name: string;
      slug: string;
    };
  };
}

const Product = ({ product }: Props) => {
  const [css] = useStyletron();
  return (
    <Card title={product.name}>
      <StyledBody>
        Proin ut dui sed metus pharetra hend rerit vel non mi. Nulla ornare
        faucibus ex, non facilisis nisl. Proin ut dui sed metus pharetra hend
        rerit vel non mi. Nulla ornare faucibus ex, non facilisis nisl.
        <ul
          className={css({
            paddingLeft: 0,
            paddingRight: 0,
          })}
        >
          <ListItem
            endEnhancer={() => <ListItemLabel>399 kr</ListItemLabel>}
            sublist
          >
            <ListItemLabel sublist>Pris:</ListItemLabel>
          </ListItem>
          <ListItem
            endEnhancer={() => (
              <ListItemLabel>{product.category.name}</ListItemLabel>
            )}
            sublist
          >
            <ListItemLabel sublist>Kategori:</ListItemLabel>
          </ListItem>
        </ul>
      </StyledBody>
      <StyledAction>
        <Link href={`/produkter/${product.id}`} passHref>
          <Button
            $as="a"
            overrides={{
              BaseButton: { style: { width: '100%' } },
            }}
          >
            Läs Mer
          </Button>
        </Link>
      </StyledAction>
    </Card>
  );
};

export default Product;
