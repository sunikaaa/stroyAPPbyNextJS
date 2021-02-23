import React,{useEffect} from 'react'

import '../styles/globals.css'
import './tailwind.css'
import {ThemeProvider as MaterialUIThemeProvider,StylesProvider} from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../styles/theme'
import Header from '../components/big/header'
import Footer from '../components/big/footer'
import {useStore} from '../reducer/index'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { Provider } from 'react-redux'


const MyApp = ({Component,pageProps}):JSX.Element => {
  useEffect(() =>{
    const jssStyles = document.querySelector('#jss-server-side')
    if(jssStyles && jssStyles.parentNode){
      jssStyles.parentNode.removeChild(jssStyles)
    }
    console.log("this is rendering")
  },[])

  const store = useStore(pageProps.initialReduxState)
  const persistor = persistStore(store, {}, function () {
    persistor.persist()
  })

  return (
    <Provider store={store}>
    <PersistGate  loading={<div>loading</div>} persistor={persistor} >

        <StylesProvider injectFirst>
          <MaterialUIThemeProvider theme={theme}>
            <>
            <CssBaseline />
            <Header />
            <Component {...pageProps}  />
            <Footer />
            </>
          </MaterialUIThemeProvider>
    </StylesProvider>
    </PersistGate>
    </Provider>
  )
}
export default MyApp