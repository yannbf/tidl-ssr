import { configure } from '@storybook/react'
import { configureDates, registerIcons } from '@ltid/util'
configureDates()
registerIcons()

// automatically import all files ending in *.stories.js
configure(require.context('../stories', true, /\.stories\.tsx$/), module)
