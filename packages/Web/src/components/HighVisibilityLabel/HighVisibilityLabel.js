import React, { useState, createRef, useEffect } from 'react'
import cx from 'classnames'
import { useCalculateWindowDimensions } from 'utils/windowDimensions'

import styles from './HighVisibilityLabel.module.scss'

const HighVisibilityLabel = ({ value, title, applyTopMargin }) => {
  const valueArr = Array.from(value)
  const refs = Array(valueArr.length).fill().map(() => createRef())
  const { windowDimensions } = useCalculateWindowDimensions()
  const [newLineIndexes, setNewLineIndexes] = useState([])

  useEffect(() => {
    const indexes = [0]
    refs.forEach((ref, index) => {
      const prevRef = refs[index - 1]

      // This will detect when the array has wrapped to a new line, by comparing the offestTop value of the current ref against the previous ref
      if (ref?.current && prevRef?.current && (ref?.current?.offsetTop !== prevRef?.current?.offsetTop)) {
        indexes.push(index)
      }
    })

    // Set new array of new line indexes if a change is detected
    if (JSON.stringify(newLineIndexes) !== JSON.stringify(indexes)) {
      setNewLineIndexes(indexes)
    }
  }, [valueArr, windowDimensions, refs, newLineIndexes])

  // Determines what values in the array should have an opacity applied to the background colour
  const opacityArray = valueArr.reduce((acc, _, index) => {
    if (index === 0) {
      acc.push(false)
    } else if (newLineIndexes.includes(index)) {
      // If the index is the first value of a new line, it's opacity should be the opposite of the value above it i.e. the previous index in the newLineIndexes array
      const newLineIndex = newLineIndexes.findIndex(i => i === index)
      acc.push(!acc[newLineIndex - 1])
    } else {
      // The opacity should be the opposite of the previous value
      acc.push(!acc[index - 1])
    }
    return acc
  }, [])

  return (
    <div className={styles.root} style={{ marginTop: applyTopMargin ? 30 : 0 }}>
      <div className={styles.root__title}>{title}</div>
      <div className={styles.root__container}>
        {valueArr.map((value, index) => (
          <div key={index} ref={refs[index]} className={cx(
            styles.root__box,
            opacityArray[index] && styles['root__box--opacity-applied'],
          )}>
            <div className={styles.root__character}>{value}</div>
            <div className={styles.root__index}>{index + 1}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HighVisibilityLabel
