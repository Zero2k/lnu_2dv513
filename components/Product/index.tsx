import * as React from 'react';
import { useStyletron } from 'baseui';
import { Card, StyledBody, StyledAction } from 'baseui/card';
import { ListItem, ListItemLabel } from 'baseui/list';
import { Button } from 'baseui/button';
import { Plus } from 'baseui/icon';
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
  addCart?: () => void;
}

const Product = ({ product, addCart }: Props) => {
  const [css] = useStyletron();
  return (
    <Card title={product.name}>
      <StyledBody>
        {product.description}
        <ul
          className={css({
            paddingLeft: 0,
            paddingRight: 0,
          })}
        >
          <ListItem
            endEnhancer={() => (
              <ListItemLabel>{product.price} kr</ListItemLabel>
            )}
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
        {addCart && (
          <Button
            onClick={addCart}
            kind="primary"
            size="compact"
            startEnhancer={() => <Plus size={24} />}
            overrides={{
              BaseButton: { style: { width: '100%' } },
            }}
          >
            Lägg till i varukorg
          </Button>
        )}
        <Link href={`/produkt/${product.id}`} passHref>
          <Button
            kind="secondary"
            size="compact"
            $as="a"
            overrides={{
              BaseButton: { style: { width: '100%', marginTop: '10px' } },
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
