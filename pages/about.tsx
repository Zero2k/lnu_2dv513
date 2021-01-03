import * as React from 'react';
import { useStyletron } from 'baseui';
import Section from 'components/Section';

const About: React.FC = () => {
  const [css, theme] = useStyletron();
  return (
    <>
      <Section>About</Section>
    </>
  );
};

export default About;
