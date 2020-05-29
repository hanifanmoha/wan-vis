import styles from './DataTable.module.scss'
import React from 'react'
import cx from 'classnames'

import TableHeaders from '../TableHeaders/TableHeaders'
import TableRow from '../TableRow/TableRow'

import Loading from '../../Images/loading.gif'

const DataTable = ({
  className,

  headers,
  data,

  loading,
  isLoadMore,

  handleSort,
  loadMore,
}) => {

  function modifiedHandleSort(activeSort, sortType) {
    if (activeSort > 0) {
      handleSort(activeSort - 1, sortType)
    }
  }

  return (
    <div className={cx(className, styles.root)}>
      <TableHeaders
        headers={['No.', ...headers]}
        handleSort={modifiedHandleSort} />
      {data.map((row, index) => {
        return <TableRow
          key={index}
          rowData={[index + 1, ...row]} />
      })}
      {isLoadMore && <div className={styles.loadMoreRow} onClick={loadMore}>
        {!loading && <span>Load More</span>}
        {loading && <img className={styles.loadingAnimation} src={Loading} alt='Loading' />}
      </div>}
    </div>
  )
}

export default DataTable