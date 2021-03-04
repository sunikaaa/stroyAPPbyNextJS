import {AnyAction, applyMiddleware, combineReducers, configureStore, createStore, EnhancedStore} from '@reduxjs/toolkit'

import {characterSheetAdapter, characterSlice} from './old-coc'
import {skillAdapter, skillSlice2} from './skill'
import {statusAdapter, statusSlice2} from './status'
import {descriptionSlice} from './description'
import {itemSlice} from './items'
import {chainMiddleware} from './middleware'
import {connectRouter} from 'connected-react-router'
import logger from 'redux-logger'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'
import {MakeStore, createWrapper, Context, HYDRATE} from 'next-redux-wrapper';
import { useMemo } from 'react'
export const initialState3= {
    character:characterSheetAdapter.getInitialState(),
    skill:skillAdapter.getInitialState(),
    status:statusAdapter.getInitialState()
}
export type initialState = typeof initialState3
// const createRootReducer = (history) => combineReducers({
//     router: connectRouter(history),
//     character:characterSlice.reducer,
//     skill:skillSlice2.reducer,
//     status:statusSlice2.reducer
// })
const persistConfig = {
  key:'rootReducer',
  storage,

}

const reducer = (state:initialState = initialState3 , action: AnyAction) => {
  switch (action.type) {
      case HYDRATE:
        console.log("HYDRATE", action);
          // Attention! This will overwrite client state! Real apps should use proper reconciliation.
          return {...state, ...action.payload};
      default:
          return state;
  }
};
const rootReducer = combineReducers({        
  character:characterSlice.reducer,
  skill:skillSlice2.reducer,
  status:statusSlice2.reducer,
  description:descriptionSlice.reducer,
  items:itemSlice.reducer
})
const persistedReducer = persistReducer(persistConfig,rootReducer)
let store
export const initStore  = (preloadedState?): EnhancedStore => {
return configureStore({
   reducer:{
    rootReducer:persistedReducer
    },
    middleware:[chainMiddleware,logger],
    devTools: true,
    preloadedState
  })
}
const s = initStore()
export type storeType = typeof s;
// export const makeStore: MakeStore = (initialState) => setupStore(initialState)
export const initializeStore = (preloadedState) => {
    let _store = store ?? initStore(preloadedState)
  
    // After navigating to a page with an initial Redux state, merge that state
    // with the current state in the store, and create a new store
    if (preloadedState && store) {
      _store = initStore({
        ...store.getState(),
        ...preloadedState,
      })
      // Reset the current store
      store = undefined
    }
  
    // For SSG and SSR always create a new store
    if (typeof window === 'undefined') return _store
    // Create the store once in the client
    if (!store) store = _store
  
    return _store
  }

  export function useStore(initialState) {
    const store = useMemo(() => initializeStore(initialState), [initialState])
    return store
  }