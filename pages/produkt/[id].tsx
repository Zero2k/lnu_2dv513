import * as React from 'react';
import { useStyletron } from 'baseui';
import { useQuery } from '@apollo/client';
import { Block } from 'baseui/block';
import { Card, StyledBody, StyledAction } from 'baseui/card';
import { ListItem, ListItemLabel } from 'baseui/list';
import { Button } from 'baseui/button';
import { PRODUCTS_QUERY } from 'graphql/product';
import Breadcrumb from 'components/Breadcrumb';

const Produkt: React.FC = () => {
  const [css, theme] = useStyletron();
  const productsData = useQuery(PRODUCTS_QUERY);

  const { data, loading } = productsData;

  if (loading) {
    return (
      <React.Fragment>
        <div>Loading...</div>
      </React.Fragment>
    );
  }

  return (
    <>
      <Block margin="40px auto" maxWidth="550px" display="flex" flexWrap>
        <Breadcrumb
          rootRoute="/produkter"
          rootLabel="Produkter"
          currentRoute="/produkt/1"
          currentRouteLabel="Test"
        />
        <Card
          headerImage={'https://source.unsplash.com/user/erondu/700x400'}
          title="Test"
        >
          <StyledBody>
            Proin ut dui sed metus pharetra hend rerit vel non mi. Nulla ornare
            faucibus ex, non facilisis nisl. Proin ut dui sed metus pharetra
            hend rerit vel non mi. Nulla ornare faucibus ex, non facilisis nisl.
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
                endEnhancer={() => <ListItemLabel>Test</ListItemLabel>}
                sublist
              >
                <ListItemLabel sublist>Kategori:</ListItemLabel>
              </ListItem>
            </ul>
          </StyledBody>
          <StyledAction>
            <Button
              overrides={{
                BaseButton: { style: { width: '100%' } },
              }}
            >
              Se åteförsäljare
            </Button>
          </StyledAction>
        </Card>
      </Block>
    </>
  );
};

export default Produkt;
