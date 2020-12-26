import React, { ReactNode } from 'react';
import { Block } from 'baseui/block';

interface Props {
  children: ReactNode;
}

const Section = ({ children }: Props) => {
  return (
    <React.Fragment>
      <Block
        marginTop={['10px', '20px', '30px', '40px']}
        height={['20px', '40px', '80px', '160px']}
        backgroundColor="primary200"
        display="flex"
        alignContent="center"
        justifyContent="center"
        flexWrap
      >
        {children}
      </Block>
    </React.Fragment>
  );
};

export default Section;
