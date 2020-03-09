import { addParameters, addDecorator } from '@storybook/react'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import { withThemesProvider } from 'storybook-addon-styled-component-theme'
import { withA11y } from '@storybook/addon-a11y'

import { withRedux } from './decorators'
import { configureDates, registerIcons } from '@tidl/util'
import { darkTheme, lightTheme } from '@tidl/styles'

configureDates()
registerIcons()

addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS,
    defaultViewport: 'iphonex',
  },
})

addDecorator(withRedux)
addDecorator(withThemesProvider([lightTheme, darkTheme]))
addDecorator(withA11y)
