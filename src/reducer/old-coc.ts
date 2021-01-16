import {createSlice,PayloadAction,createEntityAdapter, configureStore,combineReducers, Store} from '@reduxjs/toolkit'
import oldCoCJson from '../assets/old-coc-status.json'
import skill from '../components/old-coc/skill'
import _, { values } from 'lodash'

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


export type Skill = {
    initial:number
    name:string
    furigana?:string
    job:number
    hobby:number
    other:number
    type:string
}

export type SkillArray = {
    id:string
    skill: {
        [key:string]:Skill
    }
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

type characterSheet = {
    id?:string
    name:string,
    descriptionId:string[],
    statusId: string[],
    skillId: string[],
    type: 'OLDCOC'
}

export const characterSheet = createEntityAdapter<characterSheet>({
    selectId:state=>state.id
})

export const characterSlice = createSlice({
    name:'old-coc',
    initialState:characterSheet.getInitialState(),
        
    reducers:{
        createOldCoCSheet(state){
            const length = state.ids.length
            const createData:characterSheet= {
                id:length.toString(),
                name:"",
                descriptionId:[],
                statusId:[`${length}s${length * 2}`,`${length}s${length * 2 + 1}`],
                skillId:[`${length}s${length}`],
                type:'OLDCOC'
            }
            characterSheet.addOne(state,createData)
        }
    }
})
export const {createOldCoCSheet} = characterSlice.actions


export const store = configureStore({
    reducer:{
        character:characterSlice.reducer,
    }
})