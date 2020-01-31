import { useEffect, useState } from 'react'

export const useKey = (
  key: string,
  keyDownCb: Function = () => {},
  keyUpCb: Function = () => {}
) => {
  const [pressed, setPressed] = useState(false)
  const match = event => key.toLowerCase() == event.key.toLowerCase()

  const onKeyDown = (event: KeyboardEvent) => {
    if (match(event)) {
      setPressed(true)
      keyDownCb()
    }
  }

  const onKeyUp = (event: KeyboardEvent) => {
    if (match(event)) {
      setPressed(false)
      keyUpCb()
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [key])

  return pressed
}
