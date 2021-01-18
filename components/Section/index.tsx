import React, { ReactNode } from 'react';
import { Block } from 'baseui/block';

interface Props {
  children: ReactNode;
}

const Section = ({ children }: Props) => {
  return (
    <React.Fragment>
      <Block margin="40px auto">{children}</Block>
    </React.Fragment>
  );
};

export default Section;
