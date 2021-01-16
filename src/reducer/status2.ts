import _ from 'lodash'
import {damageBonus, status,damageBonusType, statusType} from './old-coc'
import {createSlice,createEntityAdapter, configureStore} from '@reduxjs/toolkit'
import { arrayToObj,diceRoll } from '../plugins/benri'
import { RootStateOrAny } from 'react-redux'


export  type mainStatusName = "STR" | "CON" | "POW" | "SIZ" | "DEX" | "APP" | "INT" | "EDU"
export  type secondStatusName = "HP" | "MP" | "SAN" | "アイデア" | "幸運" | "知識"
export const mainStatusId = ["STR","CON","POW","SIZ","DEX","APP","INT","EDU"]
export const secondStatusId = ["HP","MP","SAN","アイデア","幸運","知識"]

export type StatusType = {
    name:string
    other?:string
    roll?:string
    updown?:string
    dice?:string
    statusId:string
    formula?:string
}

export const getters =  {
    sum(status:StatusType):number{
        return Number(status.roll) + Number(status.updown) + Number(status.other)
    },
    damageBonus(statusBox:StatusTypeBox):damageBonusType{
        const {status} = statusBox
        const {STR,SIZ} = status
        if(STR && SIZ){
            const damage = getters.sum(STR) + getters.sum(SIZ)
            return damageBonus.reduceRight((result,cu)=>{
                return damage > cu.status ? result:cu
            })
        }
        return {status:NaN,damage:"ERROR this status not include 'STR' or 'SIZ'"}
    }
}
export type StatusTypeBox = {
    id:number
    name:string
    other?:string
    roll?:string
    updown?:string
    dice?:string
    statusId:string
    formula?:string
}

const initialFirstStatus = arrayToObj(status.mainStatus.map(v=>{return{...v,roll:0,other:0,updown:0}}),'name')
const initialSecondStatus = arrayToObj(status.secondStatus.map(v=>{return{...v,roll:0,other:0,updown:0}}),'name')

const statusAdapter = createEntityAdapter<StatusTypeBox>({
    selectId: (statusBox) => statusBox.statusId
})

export const statusSlice2 = createSlice({
    name:'status2',
    initialState:statusAdapter.getInitialState(),
    reducers:{
        createOldCoCStatus2(state,{payload}){
            status.mainStatus.forEach((v:StatusTypeBox,i)=>{
                const id = i * 2
                v.statusId = payload.id + 'status' + id
                v.roll = "0"
                v.other = "0"
                v.updown = "0"
                v.id = i
                statusAdapter.addOne(state,v)
            })
            status.secondStatus.forEach((v,i)=>{
                const id =  (i * 2 + 1)
                v.id = i
                v.statusId = payload.id + 'status' + id
                v.roll = "0"
                v.other = "0"
                v.updown = "0"
                statusAdapter.addOne(state,v as StatusTypeBox)
            })
        },
        createStatus:statusAdapter.addOne,
        updateStatus:statusAdapter.updateOne
    }
})
export const {createOldCoCStatus2,createStatus,updateStatus} = statusSlice2.actions
export const store = configureStore({
    reducer:{
        status:statusSlice2.reducer
    }
})