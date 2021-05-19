import React from 'react'
import cx from 'classnames'
import styles from './NoteExample.module.scss'

const NoteExample = () => (
  <div>
    <h1 className={cx(styles.root__note, styles['root__note--first'])}>This is note text. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi et eveniet laudantium, molestiae nisi similique! Aut distinctio dolores impedit incidunt.</h1>
  </div>
)

export default NoteExample
