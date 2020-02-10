import { useCallback, useState, useRef } from 'react'

type LongPressHook = [boolean, () => void, () => void, () => void]

const clearTimer = ref => {
  if (ref.current) {
    clearTimeout(ref.current)
    ref.current = undefined
  }
}

const CLICK_THRESHOLD = 200

export const useLongPress = (
  onLongPress: () => void = () => {},
  onClick: () => void = () => {},
  duration: number = 1000
): LongPressHook => {
  const longPressTimer = useRef(null)
  const delayTimer = useRef(null)
  const [isHolding, setHolding] = useState(false)

  const onTouchStart = useCallback(() => {
    // Define a holding state only if not clicking
    delayTimer.current = setTimeout(() => {
      setHolding(true)
      clearTimer(delayTimer)
    }, CLICK_THRESHOLD)

    longPressTimer.current = setTimeout(() => {
      onLongPress()
      setHolding(false)
    }, duration)
  }, [isHolding])

  const onTouchEnd = useCallback(() => {
    setHolding(false)

    clearTimer(longPressTimer)

    // If user clicks fast (under CLICK_THRESHOLD) triggers onClick
    if (delayTimer.current !== undefined) {
      onClick()
      clearTimer(delayTimer)
    }
  }, [delayTimer, longPressTimer])

  const onTouchMove = useCallback(() => {
    setHolding(false)

    clearTimer(longPressTimer)
    clearTimer(delayTimer)
  }, [delayTimer, longPressTimer])

  return [isHolding, onTouchStart, onTouchEnd, onTouchMove]
}
