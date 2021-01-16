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
}
export type SkillArray = {
    id:number
    skill:{
    [x:string]:Skill
    }
}
const skillAdapter = createEntityAdapter<SkillArray>({
    selectId:(skill) =>skill.id
})
export const abilitySet:{[x:string]:Skill} = _.map(ability,(v,i)=>v.map(v=>{
    v.type = i
    return v
})).flat().reduce((sum,v:Skill,i)=>{
    sum[v.name]= v
    sum[v.name].id = i
    return sum
},{})
export const skillId = _.map(abilitySet,i=>i.name)

export const skillSlice = createSlice({
    name:'skill',
    initialState:skillAdapter.getInitialState(),
    reducers:{
        createOldCoCSkill(state){
            const newSkill = _.cloneDeep(abilitySet)
            const addOne:SkillArray = {
                id:state.ids.length,
                skill:newSkill
            }
            skillAdapter.addOne(state,addOne)
        },
        updateSkill:skillAdapter.updateOne
    }
})

export const skillSelectors = skillAdapter.getSelectors(
    (state:RootStateOrAny)=>state.skill
)
export const skillSelectById = (id:number) => _.partialRight(skillSelectors.selectById,id)

export const {createOldCoCSkill,updateSkill} = skillSlice.actions
export const store = configureStore({
    reducer:{
        skill:skillSlice.reducer,
    }
})