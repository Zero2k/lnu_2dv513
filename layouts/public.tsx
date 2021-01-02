import React, { ReactNode } from 'react';
import { Grid, Cell, BEHAVIOR } from 'baseui/layout-grid';
import Navbar from '../components/Navbar';
import Footer from 'components/Footer';

interface Props {
  children?: ReactNode;
}

const Public = ({ children }: Props) => {
  return (
    <React.Fragment>
      <Navbar />
      <Grid behavior={BEHAVIOR.fixed}>
        <Cell span={12}>{children}</Cell>
      </Grid>
      <Footer />
    </React.Fragment>
  );
};

export default Public;
