import _ from 'lodash'
import {damageBonus, status,damageBonusType} from './old-coc'
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
    status:{
        [key:string]:StatusType
    }
}
const initialFirstStatus = arrayToObj(status.mainStatus.map(v=>{return{...v,roll:0,other:0,updown:0}}),'name')
const initialSecondStatus = arrayToObj(status.secondStatus.map(v=>{return{...v,roll:0,other:0,updown:0}}),'name')

const statusAdapter = createEntityAdapter<StatusTypeBox>({
    selectId: (statusBox) => statusBox.id
})
export const statusSlice = createSlice({
    name: 'status',
    initialState:statusAdapter.getInitialState(),
    reducers:{
        createOldCoCStatus(state){
            const newMainStatus = _.cloneDeep(initialFirstStatus)
            const addMain:StatusTypeBox = {
                id:state.ids.length,
                status:newMainStatus
            }
            const newSecondStatus = _.cloneDeep(initialSecondStatus)
            const addSecond:StatusTypeBox = {
                id:state.ids.length + 1,
                status:newSecondStatus
            }
            statusAdapter.addMany(state,[addMain,addSecond])
        },
        updateStatus:statusAdapter.updateOne,
        updateDiceRoll(state,{payload}:{payload:{id:number}}){
            const {id} = payload
            let status = _.cloneDeep(state.entities[id].status)
            mainStatusId.forEach((statusName)=>{
                let diceArray = status[statusName].dice.split(" ")
                let diceResult = diceArray.map(v=>{
                    if(v.includes("d")){
                        const dice:number[] = v.split("d").map(v=>Number(v))
                        return diceRoll(dice[0],dice[1]).reduce((sum,cu)=>sum + cu).toString()
                    }
                    return v
                })
                status[statusName].roll = eval(diceResult.join(''))
            })
            const changes:StatusTypeBox = {
                id:id,
                status:status
            }
            statusAdapter.updateOne(state,{id:id,changes:changes})
        },
        calcRoll(state,{payload}:{payload:{id:number[]}}){
            const [dependId,changeId] = payload.id
            const mainStatus = state.entities[dependId].status
            const secondStatus = _.cloneDeep(state.entities[changeId].status)
            secondStatusId.forEach(statusName=>{
                const formula = secondStatus[statusName].formula.split(" ")
                const formulaMap = formula.map(v=>{
                    const findData = _.find(mainStatus,status=>status.name === v)
                    return findData ? getters.sum(findData) : v
                }).join('')
                const formulaed = _.isNumber(eval(formulaMap)) ? eval(formulaMap) : NaN
                secondStatus[statusName].roll = Math.ceil(formulaed).toString()
            })
            const changes:StatusTypeBox = {
                id:changeId,
                status:secondStatus
            }
            statusAdapter.updateOne(state,{id:changeId,changes:changes})
        }
    }
})


export const statusSelectors = statusAdapter.getSelectors(
    (state:RootStateOrAny)=>state.status
)
export const statusSelectById = (id:number) => _.partialRight(statusSelectors.selectById,id)


export const {createOldCoCStatus,updateDiceRoll,calcRoll,updateStatus} = statusSlice.actions
export const store = configureStore({
    reducer:{
        status:statusSlice.reducer,
    }
})