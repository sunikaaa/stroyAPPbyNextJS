import React,{useEffect,useContext, useReducer} from 'react'

import '../styles/globals.css'
import './tailwind.css'
import {ThemeProvider as StyledComponentsThemeProvider} from 'styled-components'
import {ThemeProvider as MaterialUIThemeProvider,StylesProvider} from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../styles/theme'
import Header from '../components/big/header'
import {SiteProvider, store} from '../reducer/index'
import { Provider } from 'react-redux'

const MyApp = ({Component,pageProps}):JSX.Element => {
  useEffect(() =>{
    const jssStyles = document.querySelector('#jss-server-side')
    if(jssStyles && jssStyles.parentNode){
      jssStyles.parentNode.removeChild(jssStyles)
    }
    console.log("this is rendering")
  },[])


  return (
    <Provider store={store}>
    <StylesProvider injectFirst>
      <MaterialUIThemeProvider theme={theme}>
        <SiteProvider>
        <CssBaseline />
        <Header />
          <Component {...pageProps} />
        </SiteProvider>
      </MaterialUIThemeProvider>
    </StylesProvider>
    </Provider>
  )
}
export default MyApp
