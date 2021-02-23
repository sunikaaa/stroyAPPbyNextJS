import {createSlice,PayloadAction,createEntityAdapter, configureStore,combineReducers, Store} from '@reduxjs/toolkit'
import oldCoCJson from '../assets/old-coc-status.json'
import skill from '../components/old-coc/skill'
import _, { update, values } from 'lodash'
import { RootStateOrAny } from 'react-redux'
import { nowFormatDate } from '../plugins/benri'
import { Skill } from './skill'
import { storeType } from '.'
import {compareAsc} from 'date-fns'

export type abilityName = "battle" | "find" | "move" | "talk" | "int"
export  type mainStatusName = "STR" | "CON" | "POW" | "SIZ" | "DEX" | "APP" | "INT" | "EDU"
export  type secondStatusName = "HP" | "MP" | "SAN" | "アイデア" | "幸運" | "知識"
export type abilityType = {
    [key in abilityName]:Skill[]
}
export type damageBonusType = {
    status:number,
    damage:string
}

export const {ability,status,damageBonus}:{ability:abilityType,status:statusType,damageBonus:damageBonusType[]} = JSON.parse(JSON.stringify(oldCoCJson))



export type MainStatusType = {
    name:string
    other?:string
    roll?:string
    updown?:string
    dice?:string
    statusId:string
}

export type SecondStatusType = {
    name:string
    other?:string
    roll?:string
    updown?:string
    formula:string
    statusId:string
    id:number
}
export type statusType = {
    mainStatus:MainStatusType[]
    secondStatus:SecondStatusType[]
}


export type characterSheet2 = {
    id?:string | number
    name:string,
    descriptionId:string[],
    statusId: string[][],
    skillId: string[],
    type: 'oldcoc',
    updated: number
    created: number
}

export const characterSheetAdapter = createEntityAdapter<characterSheet2>({
    selectId:state=>state.id,
    sortComparer:(a,b) =>  compareAsc(b.updated,a.updated)
})

export const characterSlice = createSlice({
    name:'old-coc',
    initialState:characterSheetAdapter.getInitialState(),
        
    reducers:{

        createCharacter:characterSheetAdapter.addOne,
        updateDate(state,{payload}:{payload:{id:string}}){
            characterSheetAdapter.updateOne(state,{id:payload.id,changes:{updated:Date.now()}})
        },
        deleteCharacter:characterSheetAdapter.removeOne
    }
})
export const {createCharacter,updateDate,deleteCharacter} = characterSlice.actions


export const characterSelectors = characterSheetAdapter.getSelectors(
    (state:RootStateOrAny)=>state.rootReducer.character
)
export const characterSelectById = (id:number) => _.partialRight(characterSelectors.selectById,id)