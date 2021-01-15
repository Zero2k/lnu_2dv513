import * as React from 'react';
import _ from 'lodash';
import { useStyletron } from 'baseui';
import { Block } from 'baseui/block';
import { Heading, HeadingLevel } from 'baseui/heading';
import { Grid, Cell } from 'baseui/layout-grid';
import { ListItem, ListItemLabel } from 'baseui/list';
import { Button } from 'baseui/button';
import { ProgressSteps, NumberedStep } from 'baseui/progress-steps';
import PageWithLayoutType from 'types/pageWithLayout';
import Private from '../../layouts/private';
import HandleProfileForm from 'forms/handleProfile';
import HandleProductsForm from 'forms/handleProducts';
import { useQuery } from '@apollo/client';
import { CATEGORIES_QUERY } from 'graphql/category';
import { isServer } from 'utils/isServer';

const Oversikt = ({ currentUser, loadingUser }) => {
  const [setup, setSetup] = React.useState({ profile: false, products: false });
  const [current, setCurrent] = React.useState(0);
  const [products, setProducts] = React.useState({});
  const categoryData = useQuery(CATEGORIES_QUERY, { skip: isServer() });
  const { data } = categoryData;
  const [css, theme] = useStyletron();

  React.useEffect(() => {
    setSetup({
      profile:
        !!currentUser?.name ||
        !!currentUser?.phone ||
        !!currentUser?.address ||
        !!currentUser?.zip ||
        !!currentUser?.city,
      products: !!currentUser?.products.length,
    });
  }, [currentUser]);

  React.useEffect(() => {
    !setup.profile ? setCurrent(0) : setCurrent(1);
  }, [setup]);

  React.useEffect(() => {
    const products = {};
    const categories: any = _.groupBy(data?.categories, 'name');
    for (const [key, value] of Object.entries(categories)) {
      const categoryWithProducts = { [key]: value[0].products };
      const allProducts = Object.assign(products, categoryWithProducts);
      setProducts(allProducts);
    }
  }, [data]);

  return (
    <>
      {currentUser?.products && (!setup.profile || !setup.products) ? (
        <Block
          margin="20px auto"
          height={['80px', '200px', '250px', '560px']}
          maxWidth="550px"
          display="flex"
          flexWrap
        >
          <ProgressSteps
            overrides={{
              Root: {
                style: {
                  width: '100%',
                },
              },
            }}
            current={current}
          >
            <NumberedStep title="Skapa profil">
              <div className={css({ ...theme.typography.ParagraphSmall })}>
                Innan du kan börja marknadsföra vilka produkter er butik säljer
                samt ta emot förhandsbeställningar så måste du skapa en
                företagsprofil.
              </div>
              <HandleProfileForm setStep={setCurrent} user={currentUser} />
            </NumberedStep>
            <NumberedStep title="Lägg till produkter">
              <div className={css({ ...theme.typography.ParagraphSmall })}>
                Du måste lägga till de produkter som ni säljer för att er butik
                ska bli synlig bland alla återförsäljare.
              </div>
              <HandleProductsForm setStep={setCurrent} products={products} />
            </NumberedStep>
          </ProgressSteps>
        </Block>
      ) : (
        <Block
          margin="20px auto"
          height={['80px', '200px', '250px', '560px']}
          display="block"
          flexWrap
        >
          <Grid>
            <Cell span={[12, 12, 8]}>
              <HeadingLevel>
                <Heading styleLevel={4}>Översikt</Heading>
                <pre>{JSON.stringify(currentUser, null, 2)}</pre>
              </HeadingLevel>
            </Cell>
            <Cell span={[12, 12, 4]}>
              <ul
                className={css({
                  width: '100%',
                  paddingLeft: 0,
                  paddingRight: 0,
                })}
              >
                <ListItem
                  endEnhancer={() => (
                    <Button size="compact" kind="secondary">
                      Hantera
                    </Button>
                  )}
                >
                  <ListItemLabel>Inställningar</ListItemLabel>
                </ListItem>
                <ListItem
                  endEnhancer={() => (
                    <Button size="compact" kind="secondary">
                      Hantera
                    </Button>
                  )}
                >
                  <ListItemLabel>Produkter</ListItemLabel>
                </ListItem>
                <ListItem
                  endEnhancer={() => (
                    <Button size="compact" kind="secondary">
                      Hantera
                    </Button>
                  )}
                >
                  <ListItemLabel>Beställningar</ListItemLabel>
                </ListItem>
              </ul>
            </Cell>
          </Grid>
        </Block>
      )}
    </>
  );
};

(Oversikt as PageWithLayoutType).layout = Private;

export default Oversikt;
