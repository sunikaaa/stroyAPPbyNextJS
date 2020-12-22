import {SecondTable,TableDice,SecondTableType,FirstStatusType} from '../tableClass'
import oldCoCJson from '../../assets/old-coc-status.json'
import {TableDiceContainer} from '../tableClassContainer'
import _, { find } from 'lodash'
import {Skill} from './skill'

export type abilityName = "battle" | "find" | "move" | "talk" | "int"
export  type mainStatusName = "STR" | "CON" | "POW" | "SIZ" | "DEX" | "APP" | "INT" | "EDU"
export  type secondStatusName = "HP" | "MP" | "SAN" | "アイデア" | "幸運" | "知識"
export type abilityType = {
    [key in abilityName]:Skill[]
}

export type statusType = {
    mainStatus:FirstStatusType[]
    secondStatus:SecondTableType[]
}

export type damageBonusType = {
    status:number
    damage:string

}

type oldCoCStatus = {
    mainStatus:TableDice[]
    secondStatus:SecondTable[]
}

const {ability,status,damageBonus}:{ability:abilityType,status:statusType,damageBonus:damageBonusType[]} = JSON.parse(JSON.stringify(oldCoCJson))
export const InitialAbility = ability

export class OldCoC {
    name?:string
    status:oldCoCStatus
    statusCell = ["昇降値","その他"]
    skill:abilityType
    constructor({name,state,skill} : any){
        this.name = name || ''
        this.status =_.isUndefined(state) ? this.statusArr(status):state
        this.skill =_.isUndefined(skill) ? this.skillArr(ability):skill
    }

    statusArr(status:statusType):statusType{
       return { mainStatus:status.mainStatus.map((v)=>new TableDice({...v,dice:v.dice})),
        secondStatus:status.secondStatus.map((v)=>new SecondTable({...v,formula:v.formula}))
            }
    }
    skillArr(skill:abilityType):abilityType[]{
        let skillAbility = {}
        for(let theSkill in skill){
            skillAbility[theSkill] = skill[theSkill].map((v)=>new Skill({...v}))
        }
        return skillAbility as abilityType[]
    }
    get skillFilter(){
        return _.map(this.skill,(skillName)=>{
            return skillName.filter(skill=>skill.filter)
        })
    }

    findMainStatus(name:mainStatusName){
        console.log(this.status)
        return this.status.mainStatus.find(v=>v.name === name)
    }
    findSecondStatus(name:secondStatusName){
        return this.status.secondStatus.find(v=>v.name === name)
    }
    get damageBonus(){
        const damage = this.findMainStatus("STR").sum() + this.findMainStatus("SIZ").sum()
    // const initialDamageBonus = damageBonus[0]
        return  damageBonus.reduceRight((result,cu) => {
            return damage > cu.status ? result:cu
        })
    }
    static calcDamageBonus(tableState:TableDice[]){
        const damage = tableState.find(v => v.name === "STR").sum() + tableState.find(v => v.name === "SIZ").sum()
        return damageBonus.reduceRight((result,cu)=>{
            return damage > cu.status ? result:cu
        })
    }
    mainStatusAllDiceRoll(){
        this.status.mainStatus.forEach(v=>v.diceRoll())
        console.log(this.status.mainStatus)
        return this
    }

    updateSecondStatus(){
        this.status.secondStatus.forEach(v=>v.calcRoll(this.status.mainStatus))
    }
    update(){
        return new OldCoC({...this})
    }
 
}