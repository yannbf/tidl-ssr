import { useCallback, useState, useRef } from 'react'

type LongPressHook = [() => void, () => void, boolean]

export const useLongPress = (
  callback: () => void = () => {},
  duration: number = 2000
): LongPressHook => {
  const timer = useRef(null)
  const delayTimer = useRef(null)
  const [pressing, setPressing] = useState(false)

  const onTouchStart = useCallback(() => {
    delayTimer.current = setTimeout(() => {
      setPressing(true)
    }, 100)
    timer.current = setTimeout(() => {
      callback()
      setPressing(false)
    }, duration)
  }, [])

  const onTouchEnd = useCallback(() => {
    setPressing(false)
    if (timer.current) {
      clearTimeout(timer.current)
    }
    if (delayTimer.current) {
      clearTimeout(delayTimer.current)
    }
  }, [])

  return [onTouchStart, onTouchEnd, pressing]
}
