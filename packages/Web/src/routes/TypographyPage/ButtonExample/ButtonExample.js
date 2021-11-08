import React from 'react'
import Button from 'components/Button'

import styles from './ButtonExample.module.scss'

const ButtonExample = () => (
  <div>
    <Button primary className={styles.root__button}>Primary button</Button>
    <Button primary disabled className={styles.root__button}>Disabled button</Button>
    <Button secondary className={styles.root__button}>Secondary button</Button>
    <Button tertiary className={styles.root__button}>Tertiary button</Button>
  </div>
)

export default ButtonExample
