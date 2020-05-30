import styles from './PriceList.module.scss'
import React, { useEffect } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'

import { fetchPrice } from '../../Redux/PriceAction'
import Price from '../../Model/Price'

import PageContainer from '../../Components/PageContainer/PageContainer'
import DataTable from '../../Components/DataTable/DataTable'
import Button from '../../Components/Button/Button'

const PriceList = ({ className, priceStore, fetchPrice, dispatch, history, location }) => {

  useEffect(() => {
    handleFetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleSort(activeSort, sortType) {
    dispatch({
      type: 'PRICE_SORT',
      payload: { activeSort, sortType }
    })
  }

  function handleFetch() {
    fetchPrice({
      limit: Price.rowLimit,
      offset: priceStore.offset
    })
  }

  function handleClickCreate() {
    history.push('/create')
  }

  return (
    <PageContainer
      className={cx(className, styles.root)}
      title={'Price List'}>
      <Button
        onClick={handleClickCreate}
        className={styles.createButton}>
        Add New Price
      </Button>
      <DataTable
        headers={Price.headers}
        data={priceStore.list.map(price => price.rowData())}

        loading={priceStore.loading}
        isLoadMore={priceStore.isLoadMore}

        handleSort={handleSort}
        loadMore={handleFetch}
      />
    </PageContainer>
  );
}

const mapStateToProps = ({priceStore}) => {
  return { priceStore }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPrice: params => dispatch(fetchPrice(params)),
    dispatch
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PriceList)