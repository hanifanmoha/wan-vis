import styles from './PriceDetail.module.scss'
import React, { useEffect, useState } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'

import { fetchArea } from '../../Redux/AreaAction'
import { fetchSize } from '../../Redux/SizeAction'

import PageContainer from '../../Components/PageContainer/PageContainer'
import Input from '../../Components/Input/Input'
import Button from '../../Components/Button/Button'
import { postPrice } from '../../Redux/PriceAction'

const PriceDetail = ({ className, areaStore, fetchArea, sizeStore, fetchSize, dispatch, history, location }) => {

  let [isValidate, setIsValidate] = useState(false)
  let [isLoading, setIsLoading] = useState(false)

  let [optionArea, setOptionArea] = useState([])

  let [comodity, setComodity] = useState('')
  let [province, setProvince] = useState('')
  let [city, setCity] = useState('')
  let [price, setPrice] = useState(0)
  let [size, setSize] = useState(0)
  let [timestamp, setTimestamp] = useState(moment())

  let [comodityError, setComodityError] = useState('')
  let [priceError, setPriceError] = useState(0)

  useEffect(() => {
    handleFetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    let newOptions = areaStore.list.filter(area => area.province && area.city)
    setOptionArea(newOptions)
    setProvince(newOptions[0] ? newOptions[0].province : '')
    setCity(newOptions[0] ? newOptions[0].city : '')
  }, [areaStore.list])

  useEffect(() => {
    setSize(sizeStore.list[0] ? sizeStore.list[0].size : 0)
  }, [sizeStore.list])

  function handleFetch() {
    if (!areaStore.available) {
      fetchArea()
    }
    if (!sizeStore.available) {
      fetchSize()
    }
  }

  function checkError() {
    let error = ''
    if (!comodity) {
      error = 'Comodity must not empty.'
      setComodityError(error)
    } else {
      setComodityError('')
    }
    if (!price) {
      error = 'Price must not 0.'
      setPriceError(error)
    } else {
      setPriceError('')
    }
    return error
  }

  async function handleSubmit() {
    if (isLoading) return

    setIsValidate(true)
    if (checkError()) return

    let data = [{
      uuid: uuidv4(),
      komoditas: comodity,
      area_provinsi: province,
      area_kota: city,
      size: size,
      price: price,
      tgl_parsed: timestamp.format(),
      timestamp: timestamp.unix()
    }]

    try {
      setIsLoading(true)
      let response = await postPrice(data)
      setIsLoading(false)
      if(response.error) {
        alert(response.error)
      } else {
        dispatch({ type: 'PRICE_RESET' })
        history.goBack()
      }
    } catch (error) {
      setIsLoading(false)
      console.error(error)
    }
  }

  const handleChange = (key) => (e) => {
    switch (key) {
      case 'comodity':
        setComodity(e.target.value)
        return
      case 'province':
        setProvince(e.target.value)
        return
      case 'city':
        setCity(e.target.value)
        return
      case 'size':
        setSize(parseInt(e.target.value))
        return
      case 'price':
        if (e.target.value.match(/^[0-9]*$/)) {
          setPrice(parseInt(e.target.value || 0))
        }
        return
      case 'timestamp':
        let date = moment(e.target.value, 'YYYY-MM-DD')
        setTimestamp(date)
        return
      default:
        return
    }
  }

  return (
    <PageContainer
      className={cx(className, styles.root)}
      title={'Add New Price'}>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Comodity <span className={styles.requiremark}>*</span> :</label>
        <div className={styles.field}>
          <Input
            value={comodity}
            error={isValidate ? comodityError : ''}
            onChange={handleChange('comodity')} />
        </div>
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}> Province <span className={styles.requiremark}>*</span> :</label>
        <div className={styles.field}>
          <Input select
            value={province}
            onChange={handleChange('province')}
            options={optionArea
              .map(area => area.province)
              .filter(city => city)
              .filter((province, index, self) => self.indexOf(province) === index)} />
        </div>
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>City <span className={styles.requiremark}>*</span> :</label>
        <div className={styles.field}>
          <Input select
            value={city}
            onChange={handleChange('city')}
            options={optionArea
              .filter(area => area.province === province)
              .map(area => area.city)
              .filter(city => city)
              .filter((city, index, self) => self.indexOf(city) === index)} />
        </div>
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Size <span className={styles.requiremark}>*</span> :</label>
        <div className={styles.field}>
          <Input select
            value={size}
            onChange={handleChange('size')}
            options={sizeStore.list.map(size => size.size)} />
        </div>
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Price (IDR) <span className={styles.requiremark}>*</span> :</label>
        <div className={styles.field}>
          <Input
            value={price}
            error={isValidate ? priceError : ''}
            onChange={handleChange('price')} />
        </div>
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Timestamp <span className={styles.requiremark}>*</span> :</label>
        <div className={styles.field}>
          <Input
            type='date'
            value={timestamp.format('YYYY-MM-DD')}
            onChange={handleChange('timestamp')} />
        </div>
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}></label>
        <div className={styles.field}>
          <Button
            onClick={handleSubmit}
            className={styles.submitButton}>
            {'Submit'}
          </Button>
        </div>
      </div>

    </PageContainer>
  )
}

const mapStateToProps = ({ areaStore, sizeStore }) => {
  return { areaStore, sizeStore }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchArea: params => dispatch(fetchArea(params)),
    fetchSize: params => dispatch(fetchSize(params)),
    postPrice: body => postPrice(body),
    dispatch
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PriceDetail)