import React from 'react'
import { ReactComponent as LoaderSvg } from 'images/loader.svg'
import styles from './Loading2.module.scss'

// todo:
//  - This could gradually replace the <Loading/> component. Depends on future designs.
//  - Once the replacement is finished, this component could be renamed to Loading

const Loading2 = () => (
  <LoaderSvg className={styles.root} />
)

export default Loading2
