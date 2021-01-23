import {createSlice,PayloadAction,createEntityAdapter, configureStore,combineReducers, Store} from '@reduxjs/toolkit'
import oldCoCJson from '../assets/old-coc-status.json'
import skill from '../components/old-coc/skill'
import _, { update, values } from 'lodash'
import { RootStateOrAny } from 'react-redux'
import { storeType } from '.'
import { nowFormatDate } from '../plugins/benri'

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
    updated: string,
    created: string
}

export const characterSheetAdapter = createEntityAdapter<characterSheet2>({
    selectId:state=>state.id
})

export const characterSlice = createSlice({
    name:'old-coc',
    initialState:characterSheetAdapter.getInitialState(),
        
    reducers:{
        createOldCoCSheet(state){
            const length = state.ids.length
            const createData:characterSheet= {
                id:length.toString(),
                name:"",
                descriptionId:[],
                statusId:[`${length}s${length * 2}`,`${length}s${length * 2 + 1}`],
                skillId:[`${length}s${length}`],
                type:'oldcoc'
            }
            // characterSheet.addOne(state,createData)
        },
        createCharacter:characterSheetAdapter.addOne,
        updateDate(state,{payload}:{payload:{id:string}}){
            characterSheetAdapter.updateOne(state,{id:payload.id,changes:{updated:nowFormatDate()}})
        }
    }
})
export const {createOldCoCSheet,createCharacter,updateDate} = characterSlice.actions


export const store = configureStore({
    reducer:{
        character:characterSlice.reducer,
    }
})

export const characterSelectors = characterSheetAdapter.getSelectors(
    (state:storeType)=>state.character
)
export const characterSelectById = (id:number) => _.partialRight(characterSelectors.selectById,id)