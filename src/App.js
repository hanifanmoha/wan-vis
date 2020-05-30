import styles from './App.module.scss'
import React from 'react'
import cx from 'classnames'
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Store from './Redux/Store'

import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'

import PriceList from './Pages/PriceList/PriceList'
import PriceDetail from './Pages/PriceDetail/PriceDetail'

const App = ({ className }) => {
  return (
    <Provider store={Store}>
      <div className={cx(className, styles.root)}>
        <Header />
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={PriceList} />
            <Route path="/create" exact component={PriceDetail} />
          </Switch>
        </BrowserRouter>
        <Footer />
      </div>
    </Provider>
  )
}

export default App