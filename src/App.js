import styles from './App.module.scss'
import React from 'react'
import cx from 'classnames'
import { Provider } from 'react-redux'

import Store from './Redux/Store'

import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'

import PriceList from './Pages/PriceList/PriceList'

const App = ({ className }) => {
  return (
    <Provider store={Store}>
      <div className={cx(className, styles.root)}>
        <Header />
        <section className={styles.container}>
          <PriceList />
        </section>
        <Footer />
      </div>
    </Provider>
  )
}

export default App