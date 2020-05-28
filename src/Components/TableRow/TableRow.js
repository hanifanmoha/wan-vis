import styles from './TableRow.module.scss'
import React from 'react'
import cx from 'classnames'

const TableRow = ({ className, data = [] }) => {
  return (
    <div className={cx(className, styles.root)}>
      {data.map((value, index) => <div
        key={`${index}--${value}`}
        className={styles.column}>
        {value}
      </div>)}
    </div>
  )
}

export default TableRow