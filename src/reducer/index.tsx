import React,{ReactChildren, useReducer} from 'react'
import {configureStore, EntityState} from '@reduxjs/toolkit'

import {characterSheet2, characterSheetAdapter, characterSlice} from './old-coc'
import {Skill, skillSlice2} from './skill2'
import {statusSlice2, StatusType, StatusTypeBox} from './status2'
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
        skill:skillSlice2.reducer,
        status:statusSlice2.reducer
    },
    middleware:[chainMiddleware]
})

export type storeType = {
    character: EntityState<characterSheet2>;
    skill: EntityState<Skill>;
    status: EntityState<StatusTypeBox>;
}

export const SiteContext = React.createContext(initialState);

export const SiteProvider = ({children})=> {
    const [state,dispatch] = useReducer(reducer,initialState)
    return (<SiteContext.Provider value={{state,dispatch}}>
    {children}
    </SiteContext.Provider>)
}