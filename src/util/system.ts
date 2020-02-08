export const vibrate = (intensity = 50) => {
  if (window.navigator.vibrate) {
    window.navigator.vibrate(intensity)
  }
}
