import { css } from 'glamor';

export const headingFontFamily = `'Roboto', sans-serif`;
export const fontFamily = `'Roboto', sans-serif`;

const breakpoint = '@media(max-width: 500px)';

export const pageHeading = css({
  fontFamily: headingFontFamily,
  fontWeight: 300,
  fontSize: 40,
  margin: '30px 0 20px',
  color: '#888',
  outline: 'none',

  [breakpoint]: {
    marginTop: 10
  }
});

export const pageSubheading = css({
  color: '#888',
  fontSize: 16,
  fontFamily: headingFontFamily,
  margin: '0 0 50px',
  lineHeight: 1.5
});

export const heading = css({
  fontFamily: headingFontFamily,
  fontWeight: 300,
  fontSize: 26,
  color: '#888',
  margin: '25px 0'
});

export const subheading = css({
  fontWeight: 'normal',
  marginTop: 30
});

export const unimportant = css({
  fontSize: 11,
  color: '#999'
});
