import * as React from 'react';
import { useStyletron } from 'baseui';
import { useQuery } from '@apollo/client';
import { Block } from 'baseui/block';
import { Card, StyledBody, StyledAction } from 'baseui/card';
import { ListItem, ListItemLabel } from 'baseui/list';
import { Button } from 'baseui/button';
import { PRODUCT_BY_ID_QUERY } from 'graphql/product';
import Breadcrumb from 'components/Breadcrumb';
import { useRouter } from 'next/router';
import { getAsInt } from 'utils/getAsInt';

const Produkt: React.FC = () => {
  const [css, theme] = useStyletron();
  const router = useRouter();
  const { id } = router.query;
  const productData = useQuery(PRODUCT_BY_ID_QUERY, {
    variables: { id: getAsInt(id) },
    skip: Number.isNaN(getAsInt(id)),
  });

  const { data, loading } = productData;

  if (!data || loading) {
    return (
      <React.Fragment>
        <div>Loading...</div>
      </React.Fragment>
    );
  }

  const { product } = data;

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
