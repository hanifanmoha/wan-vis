import styles from './PriceList.module.scss'
import React, { useState, useEffect } from 'react'
import cx from 'classnames'

import PageContainer from '../../Components/PageContainer/PageContainer'
import TableHeaders from '../../Components/TableHeaders/TableHeaders'
import TableRow from '../../Components/TableRow/TableRow'

const PriceList = ({ className }) => {

  let headers = ['Name', 'Size', 'Province', 'City', 'Price']
  let [list, setList] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    let response = await fetch('https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/list')
    let json = await response.json()
    setList(json.filter(({ uuid, ...rest }) => uuid !== null))
  }

  function handleSort(activeSort, sortType) {
    console.log(activeSort, sortType)
  }

  return (
    <PageContainer
      className={cx(className, styles.root)}
      title={'Price List'}>
      <TableHeaders
        headers={headers}
        handleSort={handleSort} />
      {list.map((row, index) => {
        let { uuid, komoditas, area_provinsi,
          area_kota, size, price } = row
        return <TableRow
          key={`${index}--${uuid}`}
          data={[komoditas, size, area_provinsi, area_kota, price]} />
      })}
    </PageContainer>
  );
}

export default PriceList