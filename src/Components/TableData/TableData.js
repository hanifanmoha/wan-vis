import styles from './TableData.module.scss'
import React from 'react'
import cx from 'classnames'

const TableData = ({ className, rowData, label }) => {

  let pair = []
  for(let i=0; i<rowData.length; i++) {
    pair.push([label[i], rowData[i]])
  }

  return (
    <div className={cx(className, styles.root)}>
      {pair.map(([label, value]) => <div key={`${label}--${value}`} className={styles.row}>
        <div className={styles.label}>{label}</div>
        <div className={styles.value}>{value}</div>
      </div>)}
    </div>
  )
}

export default TableData