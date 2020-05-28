import styles from './PageContainer.module.scss'
import React from 'react'
import cx from 'classnames'

const PageContainer = ({ className, title, children }) => {
  return (
    <div className={cx(className, styles.root)}>
      <div className={styles.pageTitleContainer}>
        <h1 className={styles.pageTitle}>
          {title}
        </h1>
      </div>
      {children}
    </div>
  )
}

export default PageContainer