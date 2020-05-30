import styles from './Button.module.scss'
import React from 'react'
import cx from 'classnames'

const Button = ({
  className,
  children,
  ...restProps
}) => {
  return (
    <button
      className={cx(className, styles.root)}
      {...restProps}>
      {children}
    </button>
  )
}

export default Button