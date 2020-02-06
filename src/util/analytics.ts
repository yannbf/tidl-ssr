import ReactGA from 'react-ga'

export const initGA = (): void => {
  ReactGA.initialize(process.env.GA_KEY)
}

export const logPageView = (): void => {
  ReactGA.set({ page: window.location.pathname })
  ReactGA.pageview(window.location.pathname)
}

export const logModalView = (modalName: string): void => {
  ReactGA.modalview(modalName)
}

export const logEvent = (category = '', action = '', label: string): void => {
  if (category && action) {
    ReactGA.event({ category, action, label })
  }
}

export const logException = (description = '', fatal = false): void => {
  if (description) {
    ReactGA.exception({ description, fatal })
  }
}
