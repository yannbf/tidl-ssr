import { addParameters, configure } from '@storybook/react'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

import { configureDates, registerIcons } from '@tidl/util'

configureDates()
registerIcons()

addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS,
    defaultViewport: 'iphonex',
  },
})

// automatically import all files ending in *.stories.tsx
configure(require.context('../stories', true, /\.stories\.tsx$/), module)
