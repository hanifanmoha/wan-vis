import styles from './Loading.module.scss'
import React from 'react'
import cx from 'classnames'

import LoadingAnimation from '../../Images/loading.gif'

const Loading = ({ className }) => {
  return (
    <img className={cx(className, styles.root)} src={LoadingAnimation} alt='Loading...' />
  )
}

export default Loading