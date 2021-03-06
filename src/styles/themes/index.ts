import dark from './dark'
import light from './light'

type FontSize = '14px' | '16px' | '18px' | '22px' | '26px' | '32px' | '40px'

export interface IAppGeneralTheme {
  fontSizes: FontSize[]
  fontWeights: {
    body: number
    subheading: number
    link: number
    bold: number
    heading: number
  }
  lineHeights: {
    body: number
    heading: number
    code: number
  }
  backdrop: string
  splashScreen: {
    background: string
    logoWidth: string
    logoMaxWidth: string
  }
}

export interface IAppSpecificTheme {
  name: string
  bg: {
    primary: string
    secondary: string
    tertiary: string
    input: string
  }
  text: {
    primary: string
    secondary: string
    danger: string
    light: string
  }
  button: {
    primary: string
  }
  input: {
    background: string
    color: string
    outline: string
  }
  fade: {
    from: string
    to: string
  }
}

export interface IAppTheme extends IAppSpecificTheme, IAppGeneralTheme {}

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
  backdrop: 'rgba(0, 0, 0, 0.4)',
  splashScreen: {
    background: '#040b3c',
    logoWidth: 'calc(100vw - calc(50vw - 25%) * 2)',
    logoMaxWidth: '200px',
  },
}

export const lightTheme = { ...defaultTheme, ...light }
export const darkTheme = { ...defaultTheme, ...dark }
