import React from 'react';
import { Breadcrumbs } from 'baseui/breadcrumbs';
import { StyledLink } from 'baseui/link';
import Link from 'next/link';

interface Props {
  rootRoute: string;
  rootLabel: string;
  currentRoute: string;
}

function Breadcrumb({ rootRoute = '/', rootLabel, currentRoute }: Props) {
  return (
    <Breadcrumbs
      overrides={{
        Root: {
          style: {
            paddingBottom: '20px',
          },
        },
      }}
    >
      <Link href={rootRoute} passHref>
        <StyledLink $as="a">{rootLabel}</StyledLink>
      </Link>
      <span>{currentRoute}</span>
    </Breadcrumbs>
  );
}

export default Breadcrumb;
