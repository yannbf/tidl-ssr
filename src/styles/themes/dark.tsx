import { IAppTheme } from '.'

const dark: Partial<IAppTheme> = {
  bg: {
    primary: '#121212',
    secondary: '#1e1e1e',
    tertiary: '#333333',
    input: 'rgba(191,193,201,0.12)',
  },
  text: {
    primary: '#fbfbfc',
    secondary: 'rgba(255,255,255,0.8)',
  },
  button: {
    primary: '#f30a49',
  },
  fade: {
    from: '#333333',
    to: 'rgba(51, 51, 51, 0)',
  },
}
export default dark
