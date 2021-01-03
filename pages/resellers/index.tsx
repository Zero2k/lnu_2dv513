import * as React from 'react';
import { useStyletron } from 'baseui';
import Section from 'components/Section';

const Resellers: React.FC = () => {
  const [css, theme] = useStyletron();
  return (
    <>
      <Section>Resellers</Section>
    </>
  );
};

export default Resellers;
