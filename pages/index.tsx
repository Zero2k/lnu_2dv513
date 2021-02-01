import * as React from 'react';
import { useStyletron } from 'baseui';
import { Grid, Cell } from 'baseui/layout-grid';
import { Card, StyledBody, StyledAction } from 'baseui/card';
import { Heading, HeadingLevel } from 'baseui/heading';
import { Paragraph3 } from 'baseui/typography';
import { Button } from 'baseui/button';
import Section from '../components/Section';
import Link from 'next/link';

const Index: React.FC = () => {
  const [css, theme] = useStyletron();

  return (
    <>
      <Section>
        <Grid
          gridMargins={0}
          gridColumns={12}
          gridGaps={[3, 6, 12]}
          gridGutters={[3, 6, 12]}
        >
          <Cell span={[12, 7]}>
            <HeadingLevel>
              <Heading>Välkommen till PyroLead.com</Heading>
              <Paragraph3>
                PyroLead är en tjänst som kopplar samman återförsäljare av
                fyreverkerier och kunder. Via tjänsten går det att se vilka
                produkter som återförsäljaren säljer samt aktuella priser på
                produkterna. Som kund har du möjlighet att göra en
                förhandsbeställning och du kan då se när din beställning är klar
                för avhämtning.
              </Paragraph3>
            </HeadingLevel>
          </Cell>
          <Cell span={[12, 6]}>
            <Card title="Produkter">
              <StyledBody>
                Här hittar du alla produkter som finns i vårt sortiment. Du kan
                välja att filtrera baserat på en produktkategori och när du har
                hittat en produkt som du gillar så kan du enkelt hitta alla
                återförsäljare som säljer den valda produkten.
              </StyledBody>
              <StyledAction>
                <Link href={`/produkter`} passHref>
                  <Button
                    $as="a"
                    overrides={{
                      BaseButton: { style: { width: '100%' } },
                    }}
                  >
                    Se alla produkter
                  </Button>
                </Link>
              </StyledAction>
            </Card>
          </Cell>
          <Cell span={[12, 6]}>
            <Card title="Återförsäljare">
              <StyledBody>
                Här hittar du alla återförsäljare som är anslutna till tjänsten.
                Du kan enkelt se deras adress och vilken stad de finns i samt
                hur många produkter de erbjuder. Klicka på knappen för att hitta
                en återförsäljare nära dig.
              </StyledBody>
              <StyledAction>
                <Link href={`/saljare`} passHref>
                  <Button
                    $as="a"
                    overrides={{
                      BaseButton: { style: { width: '100%' } },
                    }}
                  >
                    Se alla återförsäljare
                  </Button>
                </Link>
              </StyledAction>
            </Card>
          </Cell>
        </Grid>
      </Section>
    </>
  );
};

export default Index;
