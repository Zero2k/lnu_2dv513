import * as React from 'react';
import { useStyletron } from 'baseui';
import Section from '../components/Section';

const Index: React.FC = () => {
  const [css, theme] = useStyletron();

  return (
    <>
      <Section>Index</Section>
      <Section>Index</Section>
    </>
  );
};

export default Index;
