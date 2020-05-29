import styles from './PriceList.module.scss'
import React, { useEffect } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'

import PageContainer from '../../Components/PageContainer/PageContainer'
import { fetchPrice } from '../../Redux/PriceAction'

import Price from '../../Model/Price'
import DataTable from '../../Components/DataTable/DataTable'

const PriceList = ({ className, priceStore, fetchPrice, dispatch }) => {

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

  return (
    <PageContainer
      className={cx(className, styles.root)}
      title={'Price List'}>
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