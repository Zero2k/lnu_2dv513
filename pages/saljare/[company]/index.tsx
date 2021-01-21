import * as React from 'react';
import { useStyletron } from 'baseui';
import Section from 'components/Section';
import Breadcrumb from 'components/Breadcrumb';
import { Grid, Cell } from 'baseui/layout-grid';
import { ListItem, ListItemLabel } from 'baseui/list';
import { Heading, HeadingLevel } from 'baseui/heading';
import { useQuery } from '@apollo/client';
import { FIND_USER_QUERY } from 'graphql/user';
import Product from 'components/Product';
import Cart from 'components/Cart';
import OrderForm from 'forms/orderForm';

const Company: React.FC = () => {
  const [css, theme] = useStyletron();
  const [display, setDisplay] = React.useState(false);
  const [formPart, setFormPart] = React.useState(1);
  const [cart, setCart] = React.useState([]);

  const { data, loading } = useQuery(FIND_USER_QUERY, {
    variables: { userId: 1 },
  });

  const addToCart = (product) => {
    const tempProduct = {
      id: product.id,
      quantity: 1,
      price: 10,
      name: product.name,
      url: product.name,
    };
    const productExists = cart.some((item) => item.id === product.id);
    if (!productExists) {
      const newProduct = [tempProduct, ...cart];
      setCart(newProduct);
    }
  };

  const removeFromCart = (product) => {
    const newCart = cart.filter((p) => {
      return p.id != product.id;
    });
    setCart(newCart);
  };

  if (loading) {
    return (
      <React.Fragment>
        <div>Loading...</div>
      </React.Fragment>
    );
  }

  const company = data.findUserById;

  return (
    <>
      <Section>
        <Breadcrumb
          rootRoute="/saljare"
          rootLabel="Återförsäljare"
          currentRoute={company.name}
        />
        <Grid
          gridMargins={0}
          gridColumns={12}
          gridGaps={[3, 6, 12]}
          gridGutters={[3, 6, 12]}
        >
          <Cell span={[12, 4]}>
            <HeadingLevel>
              <Heading styleLevel={4}>{company.name}</Heading>
              <Heading styleLevel={6}>Kontakta oss:</Heading>
              <ul
                className={css({
                  paddingLeft: 0,
                  paddingRight: 0,
                })}
              >
                <ListItem
                  endEnhancer={() => (
                    <ListItemLabel>{company.phone}</ListItemLabel>
                  )}
                  sublist
                >
                  <ListItemLabel sublist>Telefon:</ListItemLabel>
                </ListItem>
                <ListItem
                  endEnhancer={() => (
                    <ListItemLabel>
                      {display ? (
                        <a href="mailto:fyrverkeri@koksland.se">
                          {company.email}
                        </a>
                      ) : (
                        <button onClick={() => setDisplay(true)}>
                          Visa e-post
                        </button>
                      )}
                    </ListItemLabel>
                  )}
                  sublist
                >
                  <ListItemLabel sublist>E-post:</ListItemLabel>
                </ListItem>
              </ul>
              <Heading styleLevel={6}>Här finns vi:</Heading>
              <ul
                className={css({
                  paddingLeft: 0,
                  paddingRight: 0,
                })}
              >
                <ListItem
                  endEnhancer={() => (
                    <ListItemLabel>{company.address}</ListItemLabel>
                  )}
                  sublist
                >
                  <ListItemLabel sublist>Address:</ListItemLabel>
                </ListItem>
                <ListItem
                  endEnhancer={() => (
                    <ListItemLabel>{company.city}</ListItemLabel>
                  )}
                  sublist
                >
                  <ListItemLabel sublist>Stad:</ListItemLabel>
                </ListItem>
                <ListItem
                  endEnhancer={() => (
                    <ListItemLabel>{company.zip}</ListItemLabel>
                  )}
                  sublist
                >
                  <ListItemLabel sublist>Postnummer:</ListItemLabel>
                </ListItem>
              </ul>
            </HeadingLevel>
          </Cell>
          <Cell span={[12, 8]}>
            <HeadingLevel>
              <Heading styleLevel={5}>
                Varukorg ({cart.length}) & Beställning{' '}
                {formPart === 2 ? (
                  <small
                    className={css({
                      fontSize: '12px',
                      textDecoration: 'underline',
                      cursor: 'pointer',
                    })}
                    onClick={() => setFormPart(1)}
                  >
                    Ändra varukorg
                  </small>
                ) : null}
              </Heading>
            </HeadingLevel>
            {formPart === 1 ? (
              <Cart
                products={cart}
                removeFromCart={removeFromCart}
                setFormPart={setFormPart}
              />
            ) : formPart === 2 ? (
              <OrderForm resellerId={company.id} cart={cart} />
            ) : null}
          </Cell>
          <Cell span={[12]}>
            <HeadingLevel>
              <Heading styleLevel={5}>Produkter</Heading>
            </HeadingLevel>
            <Grid
              gridMargins={0}
              gridColumns={12}
              gridGaps={[3, 6, 12]}
              gridGutters={[3, 6, 12]}
            >
              {company.products.map((product) => (
                <Cell span={[12, 4]} key={product.id}>
                  <Product
                    product={product}
                    addCart={() => addToCart(product)}
                  />
                </Cell>
              ))}
            </Grid>
          </Cell>
        </Grid>
      </Section>
    </>
  );
};

export default Company;
