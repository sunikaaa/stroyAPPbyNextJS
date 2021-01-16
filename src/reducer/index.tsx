import React,{ReactChildren, useReducer} from 'react'
import {configureStore} from '@reduxjs/toolkit'

import {characterSlice} from './old-coc'
import {skillSlice} from './skill'
import {statusSlice} from './status'
import {chainMiddleware} from './middleware'

export const initialState = {

}

export function reducer(state,action) {
    switch(action.type){
        default :
        return state
    }
}

export const store = configureStore({
    reducer:{
        character:characterSlice.reducer,
        skill:skillSlice.reducer,
        status:statusSlice.reducer
    },
    middleware:[chainMiddleware]
})

export const SiteContext = React.createContext(initialState);

export const SiteProvider = ({children})=> {
    const [state,dispatch] = useReducer(reducer,initialState)
    return (<SiteContext.Provider value={{state,dispatch}}>
    {children}
    </SiteContext.Provider>)
}