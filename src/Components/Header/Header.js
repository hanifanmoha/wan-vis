import styles from './Header.module.scss'
import React from 'react'
import cx from 'classnames'

import Logo from '../../Images/one-fish.png'

const Header = ({ className }) => {
  return (
    <header className={cx(className, styles.root)}>
      <img className={styles.mainLogo} src={Logo} alt='One Fish' />
    </header>
  )
}

export default Header