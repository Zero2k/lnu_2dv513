import * as React from 'react';
import { useRouter } from 'next/router';
import { useStyletron } from 'baseui';
import { Block } from 'baseui/block';
import { ProgressSteps, NumberedStep } from 'baseui/progress-steps';
import { Button, SHAPE, ButtonProps, KIND, SIZE } from 'baseui/button';
import PageWithLayoutType from 'types/pageWithLayout';
import Private from '../../layouts/private';
import HandleProfileForm from 'forms/handleProfile';
import HandleProductsForm from 'forms/handleProducts';

function SpacedButton(props: ButtonProps) {
  return (
    <Button
      {...props}
      shape={SHAPE.pill}
      kind={KIND.secondary}
      size={SIZE.compact}
      overrides={{
        BaseButton: {
          style: ({ $theme }) => ({
            marginLeft: $theme.sizing.scale200,
            marginRight: $theme.sizing.scale200,
            marginTop: $theme.sizing.scale700,
          }),
        },
      }}
    />
  );
}

const Oversikt = ({ currentUser, loadingUser }) => {
  const router = useRouter();
  const [setup, setSetup] = React.useState({ profile: false, products: false });
  const [current, setCurrent] = React.useState(0);
  const [css, theme] = useStyletron();

  React.useEffect(() => {
    console.log(currentUser);
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

  return (
    <>
      <Block
        margin="20px auto"
        height={['80px', '200px', '250px', '560px']}
        maxWidth="550px"
        display="flex"
        flexWrap
      >
        {!setup.profile || !setup.products ? (
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
              <HandleProductsForm setStep={setCurrent} products={[]} />
            </NumberedStep>
            <NumberedStep title="Översikt & Spara">
              <div className={css({ ...theme.typography.ParagraphSmall })}>
                Here too!
              </div>
              <SpacedButton onClick={() => setCurrent(1)}>
                Föregående
              </SpacedButton>
              <SpacedButton>Spara</SpacedButton>
            </NumberedStep>
          </ProgressSteps>
        ) : null}
      </Block>
    </>
  );
};

(Oversikt as PageWithLayoutType).layout = Private;

export default Oversikt;
