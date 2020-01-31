import '@testing-library/jest-dom/extend-expect'

import './matchers'
import { configureDates, registerIcons } from '../src/util'

configureDates()
registerIcons()
