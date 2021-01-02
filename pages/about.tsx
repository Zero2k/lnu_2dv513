import * as React from 'react';
import { useStyletron } from 'baseui';

const About: React.FC = () => {
  const [css, theme] = useStyletron();
  return (
    <>
      <div>About</div>
    </>
  );
};

export default About;
