import { useCallback, useState } from 'react'
import { fromEvent, of } from 'rxjs'
import { delay, takeUntil, mergeMap } from 'rxjs/operators'

export const useLongPress = (callback: Function, debounce = 1000) => {
  const [isPressed, setIsPressed] = useState(false)

  const longPressCallback = useCallback(targetElement => {
    if (targetElement !== null) {
      const mouseUp$ = fromEvent(targetElement, 'mouseup')
      const mouseDown$ = fromEvent(targetElement, 'mousedown')

      const longPress$ = mouseDown$.pipe(
        mergeMap(e => of(e).pipe(delay(debounce), takeUntil(mouseUp$)))
      )

      longPress$.subscribe(event => {
        callback(event)
      })
    } else {
      console.warn('useLongPress: the element passed does not exist.')
    }
  }, [])

  return [longPressCallback, isPressed]
}
