import * as React from 'react';
import { useStyletron } from 'baseui';

const Company: React.FC = () => {
  const [css, theme] = useStyletron();
  return (
    <>
      <div>Company</div>
    </>
  );
};

export default Company;
