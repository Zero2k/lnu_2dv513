import * as React from 'react';
import { useRouter } from 'next/router';
import { useStyletron } from 'baseui';
import { Block } from 'baseui/block';
import { ProgressSteps, NumberedStep } from 'baseui/progress-steps';
import { Button, SHAPE, ButtonProps, KIND, SIZE } from 'baseui/button';
import PageWithLayoutType from 'types/pageWithLayout';
import Private from '../../layouts/private';

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
            marginTop: $theme.sizing.scale800,
          }),
        },
      }}
    />
  );
}

const Oversikt = ({ currentUser }) => {
  const router = useRouter();
  const [setup, setSetup] = React.useState(false);
  const [current, setCurrent] = React.useState(0);
  const [css, theme] = useStyletron();

  React.useEffect(() => {
    /* setSetup(!!currentUser?.email || !!currentUser?.name); */
  }, [currentUser]);

  return (
    <>
      <Block
        margin="50px auto"
        height={['80px', '200px', '250px', '560px']}
        maxWidth="550px"
        display="flex"
        flexWrap
      >
        {!setup ? (
          <ProgressSteps current={current}>
            <NumberedStep title="Skapa profil">
              <div className={css({ ...theme.typography.ParagraphSmall })}>
                Here is some step content
              </div>
              <SpacedButton onClick={() => setCurrent(1)}>Nästa</SpacedButton>
            </NumberedStep>
            <NumberedStep title="Lägg till produkter">
              <div className={css({ ...theme.typography.ParagraphSmall })}>
                Here is some more content
              </div>
              <SpacedButton onClick={() => setCurrent(0)}>Förra</SpacedButton>
              <SpacedButton onClick={() => setCurrent(2)}>Nästa</SpacedButton>
            </NumberedStep>
            <NumberedStep title="Översikt & Spara">
              <div className={css({ ...theme.typography.ParagraphSmall })}>
                Here too!
              </div>
              <SpacedButton onClick={() => setCurrent(1)}>Förra</SpacedButton>
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
