import { addParameters, configure, addDecorator } from '@storybook/react'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import { withThemesProvider } from 'storybook-addon-styled-component-theme'

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

// automatically import all files ending in *.stories.tsx
configure(require.context('../src/components', true, /\.stories\.tsx$/), module)
