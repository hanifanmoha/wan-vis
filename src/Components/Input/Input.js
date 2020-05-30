import styles from './Input.module.scss'
import React from 'react'
import cx from 'classnames'

const Input = ({
  className,
  select,
  error,
  options = [],
  ...restProps }) => {

  if (select) {
    return <select
      {...restProps}
      className={cx({
        className: true,
        [styles.root]: true,
        [styles.hasError]: error
      })}>
      {options.map((option, index) => <option
        key={`${index}--${option}`}
        value={option}
        className={styles.selectOption}>
        {option}
      </option>)}
    </select>
  } else {
    return <input
      className={cx({
        className: true,
        [styles.root]: true,
        [styles.hasError]: error
      })}
      {...restProps} />
  }
}

export default Input