import { useCallback, useEffect, useRef, useState } from 'react'
import { useMeasure, useScroll } from 'react-use'

const useScrollFader = () => {
  const [opacity, setOpacity] = useState(1)

  const scrollRef = useRef(null)
  const scrollableRef = useRef(null)

  const [measureRef, measure] = useMeasure()
  const scrollPosition = useScroll(scrollRef)

  useEffect(() => {
    const scrollElementSize = scrollRef.current.getBoundingClientRect()
    const scrollableElementSize = scrollableRef.current.getBoundingClientRect()

    // the opacity will change from 1 to 0 over the last 15px of the scroll
    const leftToScroll = scrollableElementSize.bottom - scrollElementSize.bottom
    if (leftToScroll > 15) {
      setOpacity(1)
    } else {
      setOpacity(Math.max(leftToScroll / 15, 0))
    }
  }, [scrollPosition, measure, scrollRef, scrollableRef])

  const scrollRefCallback = useCallback(node => {
    scrollRef.current = node
    if (typeof measureRef === 'function') {
      measureRef(node)
    } else {
      measureRef.current = node
    }
  }, [scrollRef, measureRef])

  return [opacity, scrollRefCallback, scrollableRef]
}

export default useScrollFader
