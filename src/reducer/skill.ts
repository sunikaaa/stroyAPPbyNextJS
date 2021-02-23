import {createSlice,createEntityAdapter, createSelector} from '@reduxjs/toolkit'
import {ability} from './old-coc'
import _, { initial } from 'lodash'
import { storeType } from '.'
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
    formula?:string
}
export const skillAdapter = createEntityAdapter<Skill>({
    selectId:(skill) =>skill.skillId
})
export const skillSet:{[x:string]:Skill} = _.map(ability,(v,i)=>v.map(v=>{
    v.type = i
    return v
})).flat().reduce((sum,v:Skill,i)=>{
    sum[v.name]= v
    sum[v.name].id = i
    return sum
},{})

export const skillGetters = {
    sum(skill:Skill){
        return Number(skill.initial) + Number(skill.job) + Number(skill.hobby) + Number(skill.other)
    }
}

export const skillSlice2 = createSlice({
    name:'skill2',
    initialState:skillAdapter.getInitialState(),
    reducers:{
        createSkill:skillAdapter.addOne,
        updateSkill:skillAdapter.updateOne,
        deleteSkill:skillAdapter.removeOne
    }
})

export const {createSkill,updateSkill,deleteSkill} = skillSlice2.actions
export const skillSelectors = skillAdapter.getSelectors(
    (state:RootStateOrAny)=>state.rootReducer.skill
)
export const skillSelectById = (id:string) => _.partialRight(skillSelectors.selectById,id)
export const skillSelectByIdsBox = createSelector(
    (state:RootStateOrAny) => state,
    (state:RootStateOrAny,ids:string[]) => ids,
    (state:RootStateOrAny,ids:string[])=>{
        return ids.map(id=>skillSelectors.selectById(state,id))
    }
)
export const skillExceptionIdsBox = createSelector(
    (state:RootStateOrAny) => state,
    (state:RootStateOrAny,ids:string[]) => ids,
    (state:RootStateOrAny,ids:string[])=>{
        return skillSelectByIdsBox(state,ids).filter(state=>!_.isEmpty(state.formula) )
    }
)
export const skillExceptionIds = (ids:string[]) =>_.partialRight(skillExceptionIdsBox,ids)
export const skillSelectByIds = (ids:string[]) => _.partialRight(skillSelectByIdsBox,ids)
export const nameSelectBox = createSelector(
    (state:RootStateOrAny) => state,
    (state:RootStateOrAny,ids:string[]) => ids,
    (state:RootStateOrAny,name:string) => name,
    (state:RootStateOrAny,ids:string[],name:string)=>{
        return skillSelectByIdsBox(state,ids).find(status=>status.name === name)
    }
)
export const nameSelect = (ids:string[],name: string) => _.partialRight(nameSelectBox,ids,name)
export const sumPointBox = createSelector(
    (state:RootStateOrAny) =>state,
    (state:RootStateOrAny,ids:string[])=>ids,
    (state:RootStateOrAny,ids:string[],name:string)=>name,
    (state:RootStateOrAny,ids:string[],name:string)=>{
        const selector = skillSelectByIdsBox(state,ids)
        return _.sum(selector.map(skill=>{
            return Number(skill[name])}))
    }
)
export const sumPoint = (name,ids:string[]) => _.partialRight(sumPointBox,ids,name)
// export const jobPoint = (ids:string[]) => _.partialRight(sumPointBox,["job",hobby])