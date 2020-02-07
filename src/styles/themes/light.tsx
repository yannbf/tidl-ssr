import { IAppTheme } from '.'

const light: Partial<IAppTheme> = {
  bg: {
    primary: '#eff0f524',
    secondary: '#ffffff',
    tertiary: '#ffffff',
    input: 'rgba(65,67,78,0.12)',
  },
  text: {
    primary: '#050505',
    secondary: '#2f3037',
  },
  button: {
    primary: '#46b5d1',
  },
  fade: {
    from: 'rgba(255, 255, 255, 1)',
    to: 'rgba(255, 255, 255, 0)',
  },
}

export default light
