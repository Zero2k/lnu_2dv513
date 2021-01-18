import * as React from 'react';
import { useStyletron } from 'baseui';
import { Card, StyledBody, StyledAction } from 'baseui/card';
import { ListItem, ListItemLabel } from 'baseui/list';
import { Button } from 'baseui/button';
import Link from 'next/link';

interface Props {
  reseller: {
    id: number;
    name: string;
    address: string;
    zip: number;
    city: string;
    products: [
      {
        id: number;
      }
    ];
  };
}

const Reseller = ({ reseller }: Props) => {
  const [css] = useStyletron();
  return (
    <Card title={reseller.name}>
      <StyledBody>
        <ul
          className={css({
            paddingLeft: 0,
            paddingRight: 0,
          })}
        >
          <ListItem
            endEnhancer={() => (
              <ListItemLabel>{reseller.address}</ListItemLabel>
            )}
            sublist
          >
            <ListItemLabel sublist>Address:</ListItemLabel>
          </ListItem>
          <ListItem
            endEnhancer={() => <ListItemLabel>{reseller.city}</ListItemLabel>}
            sublist
          >
            <ListItemLabel sublist>Stad:</ListItemLabel>
          </ListItem>
          <ListItem
            endEnhancer={() => <ListItemLabel>{reseller.zip}</ListItemLabel>}
            sublist
          >
            <ListItemLabel sublist>Postnummer:</ListItemLabel>
          </ListItem>
        </ul>
      </StyledBody>
      <StyledAction>
        <Link href={`/saljare/${reseller.id}`} passHref>
          <Button
            $as="a"
            overrides={{
              BaseButton: { style: { width: '100%' } },
            }}
          >
            Se våra produkter ({reseller.products.length})
          </Button>
        </Link>
      </StyledAction>
    </Card>
  );
};

export default Reseller;
