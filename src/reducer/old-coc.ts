import {createSlice,PayloadAction,createEntityAdapter, configureStore,combineReducers, Store} from '@reduxjs/toolkit'
import oldCoCJson from '../assets/old-coc-status.json'
import skill from '../components/old-coc/skill'
import { damageBonusType } from '../plugins/old-coc/oldCoC'
import _, { values } from 'lodash'

export type abilityName = "battle" | "find" | "move" | "talk" | "int"
export  type mainStatusName = "STR" | "CON" | "POW" | "SIZ" | "DEX" | "APP" | "INT" | "EDU"
export  type secondStatusName = "HP" | "MP" | "SAN" | "アイデア" | "幸運" | "知識"
export type abilityType = {
    [key in abilityName]:Skill[]
}

export const {ability,status,damageBonus}:{ability:abilityType,status:statusType,damageBonus:damageBonusType[]} = JSON.parse(JSON.stringify(oldCoCJson))


export type Skill = {
    initial:number
    name:string
    furigana?:string
    job:number
    hobby:number
    other:number
    skillId:string
}

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
}
export type statusType = {
    mainStatus:MainStatusType[]
    secondStatus:SecondStatusType[]
}


export type OldCoC = {
    name:string
    // mainStatus:MainStatusType[]
    // secondStatus:SecondStatusType[]
    statusCell:["昇降値","その他"]
    // skill:abilityType
}

const mainStatusAdapter = createEntityAdapter<MainStatusType>({
    selectId: (firstStatus) => firstStatus.name,
})

const mainStatusSlice = createSlice({
    name: 'mainStatus',
    initialState: mainStatusAdapter.getInitialState(status.mainStatus.map((v,i)=>v)),
    reducers:{
        mainStatusSetAll(state,action){
            mainStatusAdapter.setAll(state,action.payload.mainStatus)
        }
    }
})

const secondStatusAdapter = createEntityAdapter<SecondStatusType>({
    selectId:(secondStatus)=>secondStatus.name
})

const secondStatusSlice = createSlice({
    name:'secondStatus',
    initialState: secondStatusAdapter.getInitialState(status.secondStatus.map(v=>v)),
    reducers:{
        secondStatusSetAll(state,action){
            secondStatusAdapter.setAll(state,action.payload.secondStatus)
        },
    }
})

const skillAdapter = createEntityAdapter<Skill>({
    selectId:(skill) =>skill.skillId
})

const skillSlice = createSlice({
    name:'skill',
    initialState:skillAdapter.getInitialState(skill),
    reducers:{
        skillSetAll(state,action){
            skillAdapter.setAll(state,action.payload.skill)
        }
    }
})


export const oldCoCInitialState: OldCoC = {
    name: "",
    // mainStatus:status.mainStatus,
    // secondStatus:status.secondStatus,
    statusCell:["昇降値","その他"],
    // skill:ability
}

const  slice = createSlice({
    name:"old-coc",
    initialState:oldCoCInitialState,
    reducers: {
        setName:(state,action:PayloadAction<string>)=>({...state,name:action.payload}),
    }
})
const {setName} = slice.actions
const {mainStatusSetAll} = mainStatusSlice.actions
const {secondStatusSetAll} = secondStatusSlice.actions
export const oldCoCSheet = combineReducers({
        name:slice.reducer,
        mainStatus:mainStatusSlice.reducer,
        secondStatus:secondStatusSlice.reducer,
})

type oldCoCSheet = {
    id?:string
    name:string,
    mainStatus:typeof mainStatusSlice
    secondStatus:typeof secondStatusSlice
    skill:typeof skillSlice
}

export const characterSheet = createEntityAdapter<oldCoCSheet>({
    selectId:state=>state.id
})

const oldCoCSlice = createSlice({
    name:'old-coc',
    initialState:characterSheet.getInitialState(),
    reducers:{
        createOldCoCSheet(state,payload){
            const createAdd = {...payload.payload,...status,skill:_.map(ability,v=>v).flat(),id:state.ids.length + 1}
            characterSheet.addOne(state,createAdd)
        },
        updateOldCoCSheet:characterSheet.updateOne
    }
})
export const {createOldCoCSheet,updateOldCoCSheet} = oldCoCSlice.actions


export const store = configureStore({
    reducer:{
        characterSheet:oldCoCSlice.reducer
    }
})