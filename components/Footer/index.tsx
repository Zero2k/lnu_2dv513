import React from 'react';
import { styled } from 'baseui';
import { Block } from 'baseui/block';
import Link from 'next/link';

const StyledFooter = styled<{}, 'footer'>(
  'footer',
  ({ $theme: { typography, sizing, colors, name } }) => ({
    ...typography.font300,
    position: 'sticky',
    bottom: 0,
    color: colors.contentPrimary,
    backgroundColor: name.startsWith('light-theme')
      ? colors.mono200
      : colors.headerNavigationFill,
    width: '100%',
    marginTop: sizing.scale1400,
    paddingTop: sizing.scale1600,
    paddingBottom: sizing.scale1600,
    textAlign: 'center',
  })
);

const StyledLink = styled<{}, 'a'>('a', ({ $theme }) => ({
  textDecoration: 'none',
  color: $theme.colors.contentPrimary,
  display: 'inline-block',
  cursor: 'pointer',
  marginLeft: '32px',
  ':first-child': {
    marginLeft: '0',
  },
  ':focus': {
    outline: `3px solid ${$theme.colors.accent}`,
    outlineOffset: '3px',
  },
  ':hover': {
    color: $theme.colors.colorSecondary,
    textDecoration: 'none',
  },
}));

function Footer() {
  return (
    <StyledFooter>
      <Block paddingBottom="scale1000">
        <StyledLink href="https://github.com/Zero2k/lnu_2dv513" target="_blank">
          GitHub
        </StyledLink>
        <StyledLink
          href="https://github.com/Zero2k/lnu_2dv513/releases"
          target="_blank"
        >
          Changelog
        </StyledLink>
        <Link href="/blog">
          <StyledLink href="/admin">Admin</StyledLink>
        </Link>
      </Block>
    </StyledFooter>
  );
}

export default Footer;
