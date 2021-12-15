import React from 'react'
import { useHistory } from 'react-router-dom'
import AccountMenu from 'components/AccountMenu'
import Brand from './components/Brand'
import { ReactComponent as LeftChevronSvg } from 'images/chevron-left.svg'
import styles from './Brands.module.scss'

const Brands = ({ plans }) => {
  const history = useHistory()
  return (
    <div className={styles.root}>
       <div className={styles.root__header}>
            <AccountMenu />
            <LeftChevronSvg className={styles['root__left-arrow']} onClick={() => history.replace('/membership-cards')} />
      </div>

      <h1 className={styles.root__heading}>Add Loyalty Card</h1>
      <div className={styles.root__description}>Add your current loyalty cards to store your barcode in Bink</div>
      <div className={styles['root__brands-container']}>
        {plans.map((plan, index) => (
            <Brand plan={plan} key={index}/>
        ))}
      </div>
    </div>
  )
}

export default Brands
