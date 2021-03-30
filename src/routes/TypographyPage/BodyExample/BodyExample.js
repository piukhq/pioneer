import React from 'react'
import styles from './BodyExample.module.scss'

const BodyExample = () => (
  <div>
    <p className={styles.root__body}>
      These are 3 text bodies.
    </p>
    <p className={styles.root__body}>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi eius eum ex ipsa ipsam possimus? Dolorem ducimus laborum odio. Consectetur consequuntur culpa deleniti eos eum eveniet fuga in ipsum itaque laborum magnam, molestias optio placeat quaerat quas qui repellat saepe temporibus totam vel. Debitis dignissimos laudantium modi pariatur praesentium sed.
    </p>
    <p className={styles.root__body}>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi et eveniet laudantium, molestiae nisi similique! Aut distinctio dolores impedit incidunt.
    </p>
  </div>
)

export default BodyExample
