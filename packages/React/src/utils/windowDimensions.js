import { useEffect, useState } from 'react'
import debounce from 'lodash/debounce'

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height,
  }
}

const useCalculateWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions())
    }

    // Debouncing this event to stop components re-rendering on every single pixel change
    const debouncedHandleResize = debounce(handleResize, 15)

    window.addEventListener('resize', debouncedHandleResize)
    return () => window.removeEventListener('resize', debouncedHandleResize)
  }, [])

  const isDesktopViewportDimensions = windowDimensions.width >= 800
  return { windowDimensions, isDesktopViewportDimensions }
}

export { useCalculateWindowDimensions }
