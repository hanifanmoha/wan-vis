import styles from './PriceList.module.scss'
import React, { useEffect, useState } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'

import { fetchPrice } from '../../Redux/PriceAction'
import Price from '../../Model/Price'

import PageContainer from '../../Components/PageContainer/PageContainer'
import DataTable from '../../Components/DataTable/DataTable'
import Button from '../../Components/Button/Button'

const PriceList = ({ className, priceStore, fetchPrice, dispatch, history, location }) => {

  let [keyword, setKeyword] = useState(Price.headers.map(() => ''))

  useEffect(() => {
    setKeyword(Price.headers.map(() => ''))
    dispatch({ type: 'PRICE_RESET' })
    handleFetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleSort(activeSort, sortType) {
    dispatch({
      type: 'PRICE_SORT',
      payload: { activeSort, sortType }
    })
  }

  function handleFetch(resetOffset) {
    let search = {}
    if (keyword[0]) search['komoditas'] = keyword[0]
    if (keyword[1]) search['area_provinsi'] = keyword[1]
    if (keyword[2]) search['area_kota'] = keyword[2]
    if (keyword[3]) search['size'] = keyword[3]
    if (keyword[4]) search['price'] = keyword[4]
    fetchPrice({
      limit: Price.rowLimit,
      offset: resetOffset ? 0 : priceStore.offset,
      search: search
    })
  }

  function handleClickCreate() {
    history.push('/create')
  }

  function handleSearch() {
    dispatch({ type: 'PRICE_RESET' })
    handleFetch(true)
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

        keyword={keyword}
        setKeyword={setKeyword}

        handleSearch={handleSearch}
        handleSort={handleSort}
        loadMore={() => handleFetch()}
      />
    </PageContainer>
  );
}

const mapStateToProps = ({ priceStore }) => {
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