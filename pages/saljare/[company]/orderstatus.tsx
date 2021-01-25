import * as React from 'react';
import { useStyletron } from 'baseui';

import Section from 'components/Section';
import Breadcrumb from 'components/Breadcrumb';
import { Grid, Cell } from 'baseui/layout-grid';
import { ListItem, ListItemLabel } from 'baseui/list';
import { Heading, HeadingLevel } from 'baseui/heading';
import { useQuery } from '@apollo/client';
import { FIND_USER_QUERY } from 'graphql/user';

export const sum = (a: number, b: number) => a + b;

const OrderStatus: React.FC = () => {
  const [css, theme] = useStyletron();
  const [display, setDisplay] = React.useState(false);
  const { data, loading } = useQuery(FIND_USER_QUERY, {
    variables: { userId: 1 },
  });

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
          currentRoute={`/saljare/${company.id}`}
          currentRouteLabel={company.name}
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
              <Heading styleLevel={5}>Orderstatus</Heading>
            </HeadingLevel>
          </Cell>
        </Grid>
      </Section>
    </>
  );
};

export default OrderStatus;
