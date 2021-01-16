import {createSlice,createEntityAdapter, configureStore} from '@reduxjs/toolkit'
import {ability} from './old-coc'
import _ from 'lodash'
import { RootStateOrAny } from 'react-redux'
export type abilityName = "battle" | "find" | "move" | "talk" | "int"

export type Skill = {
    initial:number
    id:number
    name:string
    furigana?:string
    job:number
    hobby:number
    other:number
    type:string
    skillId:string
}
const skillAdapter = createEntityAdapter<Skill>({
    selectId:(skill) =>skill.skillId
})
export const abilitySet:{[x:string]:Skill} = _.map(ability,(v,i)=>v.map(v=>{
    v.type = i
    return v
})).flat().reduce((sum,v:Skill,i)=>{
    sum[v.name]= v
    sum[v.name].id = i
    return sum
},{})

export const skillSlice2 = createSlice({
    name:'skill2',
    initialState:skillAdapter.getInitialState(),
    reducers:{
        createSkill:skillAdapter.addOne,
    }
})

export const {createSkill} = skillSlice2.actions