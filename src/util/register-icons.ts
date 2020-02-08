import { library } from '@fortawesome/fontawesome-svg-core'
import { Icons, SystemIcons } from './icons'

export const iconList = Object.keys(Icons)
  .filter(key => key !== 'fas' && key !== 'prefix')
  // necessary in order to use normal icons + brand icons together
  // changes prefix of brand icons from fab to fas, which is used by default
  .map(icon => ({ ...Icons[icon], prefix: 'fas' }))

export const registerIcons = () => {
  library.add(...iconList)
  library.add(SystemIcons)
}
