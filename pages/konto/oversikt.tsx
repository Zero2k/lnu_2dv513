import * as React from 'react';
import { useRouter } from 'next/router';
import { useStyletron } from 'baseui';
import { Block } from 'baseui/block';
import { ProgressSteps, NumberedStep } from 'baseui/progress-steps';
import { Button, SHAPE, ButtonProps, KIND, SIZE } from 'baseui/button';
import PageWithLayoutType from 'types/pageWithLayout';
import Private from '../../layouts/private';
import AddProfileForm from 'forms/addProfile';

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

const Oversikt = ({ currentUser }) => {
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

  return (
    <>
      <Block
        margin="20px auto"
        height={['80px', '200px', '250px', '560px']}
        maxWidth="550px"
        display="flex"
        flexWrap
      >
        {!setup.profile ? (
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
            <NumberedStep title="Skapa profil (krävs)">
              <div className={css({ ...theme.typography.ParagraphSmall })}>
                Innan du kan börja marknadsföra vilka produkter er butik säljer
                samt ta emot förhandsbeställningar så måste du skapa en
                företagsprofil.
              </div>
              <AddProfileForm setStep={setCurrent} />
            </NumberedStep>
            <NumberedStep title="Lägg till produkter (frivilligt)">
              <div className={css({ ...theme.typography.ParagraphSmall })}>
                Du måste lägga till de produkter som ni säljer för att er butik
                ska bli synlig bland alla återförsäljare.
              </div>
              <SpacedButton onClick={() => setCurrent(0)}>
                Föregående
              </SpacedButton>
              <SpacedButton onClick={() => setCurrent(2)}>Nästa</SpacedButton>
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
