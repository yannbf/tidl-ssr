import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faCheckSquare,
  faCoffee,
  faTshirt,
  faUtensils,
  faTrash,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'

export const registerIcons = () => {
  const icons = [faCheckSquare, faCoffee, faTshirt, faUtensils, faTrash, faTimes]

  library.add(...icons)
}
