import styles from './Footer.module.scss'
import React from 'react'
import cx from 'classnames'

import Logo from '../../Images/one-fish.png'

const Footer = ({ className }) => {
  return (
    <footer className={cx(className, styles.root)}>
      <div className={styles.logoContainer} >
        <img className={styles.logo} src={Logo} alt='One Fish' />
      </div>
      <div className={styles.infoContainer}>
        <p>Jalan Cihampelas No. 173</p>
        <p>Cipaganti, Kecamatan Coblong, Kota Bandung</p>
        <p>Jawa Barat 40131</p>
        <p>Indonesia</p>
      </div>
    </footer>
  )
}

export default Footer