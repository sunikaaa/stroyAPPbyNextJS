
import _ from 'lodash'
export interface StatusType {
    name:string
    other?:string
    roll?:string
    updown?:string
}
interface FirstStatusType extends StatusType {
    dice?:string
}
export interface SecondTableType extends StatusType {
    formula:string
}


export class Status {
    name:string
    roll?:string = "0"
    updown:string = "0"
    other:string = "0"
    //第一
    //第二
    // roll = statusType.sum()
    constructor(status:FirstStatusType){
        this.name = status.name
        this.roll = status.roll || "0"
        this.updown = status.updown || "0"
        this.other = status.other || "0"
    }

    // get name(){
    //     return this.firstStatusType.name   
    // }
    get rollNum(){
        return Number(this.roll)
    }
    get updownNum(){
        return Number(this.updown)
    }
    get otherNum(){
        return Number(this.other)
    }
    set setRoll(data: string | number){
        this.roll = String(data)
    }
    sum(){
        return this.rollNum + this.updownNum + this.otherNum
    }

}

export class FirstStatus extends Status {
    dice:string

    constructor(data:FirstStatusType){
        super(data)
        this.dice = data.dice
    }

    diceRoll(){
        // const searchD = this.dice.indexOf("d");
        const diceArray = this.dice.split(" ")
        const diceResult = diceArray.map(v=>{
            if(v.includes("d")){
                const dice:number[] = v.split("d").map(v=>Number(v))
                return diceRoll(dice[0],dice[1]).reduce((sum,cu)=>sum + cu).toString()
            }
            return v
        })
        this.roll = eval(diceResult.join(''))
        // const Random = diceRoll(Number(diceArray[searchD-1]),Number(diceArray[searchD + 1]))
        return this
    }

}

export const diceRoll = (kazu:number,roll:number) =>{
    return [...Array(kazu).fill(0)].map(v=>Math.ceil(Math.random() * roll))
}

export class SecondTable extends Status {
    formula:string
    constructor(data:SecondTableType){
        super(data)
        this.formula = data.formula
    }
    calcRoll(statusArr:FirstStatus[]){
        const searchedStatus = this.formula.split(" ")
        const formulaMap  = searchedStatus.map(v =>{
               const findData = statusArr.find(status=>status.name === v)
               if(findData){
                   return findData.sum()
               }{
                   return v
               }
        }).join('')
        console.log(formulaMap)
        const formulaed:number = _.isNumber(eval(formulaMap)) ? eval(formulaMap) : NaN
        this.roll = Math.ceil(formulaed).toString()
        return this
    }


}