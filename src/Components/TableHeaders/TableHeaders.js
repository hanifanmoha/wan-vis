import styles from './TableHeaders.module.scss'
import React, { useState } from 'react'
import cx from 'classnames'

import IconSwap from '../../Icons/swap_vert.png'
import IconArrowUp from '../../Icons/arrow_upward.png'
import IconArrowDown from '../../Icons/arrow_downward.png'

const TableHeader = ({
  columnName,
  handleSort,
  sortType }) => {

  let currentIcon = sortType === 0 ? IconSwap :
    sortType === 1 ? IconArrowDown : IconArrowUp

  return (
    <div className={styles.tableHeader} onClick={handleSort}>
      <span className={styles.columnTitle}>{columnName}</span>
      <img className={styles.iconButton} src={currentIcon} alt='Toggle' />
    </div>
  )
}

const TableHeaders = ({ className, headers=[], handleSort }) => {

  let [activeSort, setActiveSort] = useState(-1)
  let [sortType, setSortType] = useState(0)

  const thHandleSort = (newActiveSort) => () => {
    let newSortType = 0
    if (activeSort !== newActiveSort) {
      newSortType = -1
    } else {
      newSortType = -sortType
    }
    setActiveSort(newActiveSort)
    setSortType(newSortType)
    handleSort(newActiveSort, newSortType)
  }

  return (
    <div className={cx(className, styles.root)}>
      {headers.map((columnName, index) => <div
        key={`${index}--${columnName}`}
        className={styles.column}>
        <TableHeader
          columnName={columnName}
          sortType={index === activeSort ? sortType : 0}
          handleSort={thHandleSort(index)}
        />
      </div>)}
    </div>
  )
}

export default TableHeaders