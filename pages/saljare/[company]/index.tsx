import * as React from 'react';
import { useStyletron } from 'baseui';
import Section from 'components/Section';
import Breadcrumb from 'components/Breadcrumb';

const Company: React.FC = () => {
  const [css, theme] = useStyletron();
  return (
    <>
      <Section>
        <Breadcrumb
          rootRoute="/saljare"
          rootLabel="Återförsäljare"
          currentRoute="Köksland i Veberöd AB"
        />
        <div>Company</div>
      </Section>
    </>
  );
};

export default Company;
