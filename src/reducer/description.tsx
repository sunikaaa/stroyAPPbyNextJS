import {createSlice,PayloadAction,createEntityAdapter, configureStore,combineReducers, Store} from '@reduxjs/toolkit'
import _ from 'lodash'
import { RootStateOrAny } from 'react-redux'


export type descriptionType = {
    descriptionId?:string
    name:string
    text:string
    multiline?:boolean
}

export const descriptionAdapter = createEntityAdapter<descriptionType>({
    selectId:state=>state.descriptionId
})

export const descriptionSlice = createSlice({
    name:'description',
    initialState:descriptionAdapter.getInitialState(),
    reducers:{
        createDescription:descriptionAdapter.addOne,
        updateDescription:descriptionAdapter.updateOne,
    }
})



export const {createDescription,updateDescription} = descriptionSlice.actions

export const descriptionSelectors =  descriptionAdapter.getSelectors(
    (state:RootStateOrAny)=>state.rootReducer.description
)

export const descriptionSelectById = (id:string) => _.partialRight(descriptionSelectors.selectById,id)