import dark from './dark'
import light from './light'

export interface IAppTheme {
  bg: {
    primary: string
    secondary: string
    input: string
  }
  text: {
    primary: string
    secondary: string
  }
}

const defaultTheme = {
  fontSizes: [
    '14px', // 0
    '16px', // 1
    '18px', // 2
    '22px', // 3
    '26px', // 4
    '32px', // 5
    '40px', // 6
  ],
  fontWeights: {
    body: 400,
    subheading: 500,
    link: 600,
    bold: 700,
    heading: 800,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.3,
    code: 1.6,
  },
}

export const lightTheme = { ...defaultTheme, ...light }
export const darkTheme = { ...defaultTheme, ...dark }
