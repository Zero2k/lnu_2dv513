import * as React from 'react';
import { useStyletron } from 'baseui';
import Section from 'components/Section';
import Breadcrumb from 'components/Breadcrumb';
import { Grid, Cell } from 'baseui/layout-grid';
import { ListItem, ListItemLabel } from 'baseui/list';
import { Heading, HeadingLevel } from 'baseui/heading';
import { Paragraph3 } from 'baseui/typography';

const Company: React.FC = () => {
  const [css, theme] = useStyletron();
  const [display, setDisplay] = React.useState(false);

  return (
    <>
      <Section>
        <Breadcrumb
          rootRoute="/saljare"
          rootLabel="Återförsäljare"
          currentRoute="Köksland i Veberöd AB"
        />
        <Grid
          gridMargins={0}
          gridColumns={12}
          gridGaps={[3, 6, 12]}
          gridGutters={[3, 6, 12]}
        >
          <Cell span={[12, 4]}>
            <HeadingLevel>
              <Heading styleLevel={4}>Köksland i Veberöd AB</Heading>
              {/* <Paragraph3>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Vestibulum fermentum velit ante, ac fringilla nulla pulvinar in.
                Aenean ut nisi mattis, lobortis purus vel, aliquet ante. In vel
                viverra lectus. Vivamus a diam faucibus, rutrum quam a, varius
                felis. Sed pellentesque sodales libero commodo vestibulum.
                Phasellus convallis gravida tempor. Sed ut bibendum nisl.
              </Paragraph3> */}
              <Heading styleLevel={6}>Kontakta oss:</Heading>
              <ul
                className={css({
                  paddingLeft: 0,
                  paddingRight: 0,
                })}
              >
                <ListItem
                  endEnhancer={() => (
                    <ListItemLabel>046 - 23 86 60</ListItemLabel>
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
                          fyrverkeri@koksland.se
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
                  endEnhancer={() => <ListItemLabel>Test</ListItemLabel>}
                  sublist
                >
                  <ListItemLabel sublist>Address:</ListItemLabel>
                </ListItem>
                <ListItem
                  endEnhancer={() => (
                    <ListItemLabel>Södra Järnvägsgatan 2</ListItemLabel>
                  )}
                  sublist
                >
                  <ListItemLabel sublist>Stad:</ListItemLabel>
                </ListItem>
                <ListItem
                  endEnhancer={() => <ListItemLabel>240 14</ListItemLabel>}
                  sublist
                >
                  <ListItemLabel sublist>Postnummer:</ListItemLabel>
                </ListItem>
              </ul>
            </HeadingLevel>
          </Cell>
          <Cell span={[12, 8]}>
            <HeadingLevel>
              <Heading styleLevel={5}>Produkter</Heading>
            </HeadingLevel>
          </Cell>
        </Grid>
      </Section>
    </>
  );
};

export default Company;
