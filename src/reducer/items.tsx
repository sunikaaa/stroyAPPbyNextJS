import {createSlice,PayloadAction,createEntityAdapter, configureStore,combineReducers, Store} from '@reduxjs/toolkit'
import _ from 'lodash'
import { RootStateOrAny } from 'react-redux'


export type itemType = {
    itemId?:string
    name:string
    havingNumber:number
}

export const itemAdapter = createEntityAdapter<itemType>({
    selectId:state=>state.itemId
})

export const itemSlice = createSlice({
    name:'item',
    initialState:itemAdapter.getInitialState(),
    reducers:{
        createItem:itemAdapter.addOne,
        updateItem:itemAdapter.updateOne,
        deleteItem:itemAdapter.removeOne
    }
})



export const {createItem,updateItem,deleteItem} = itemSlice.actions

export const itemSelectors =  itemAdapter.getSelectors(
    (state:RootStateOrAny)=>state.rootReducer.items
)

export const itemSelectById = (id:string) => _.partialRight(itemSelectors.selectById,id)