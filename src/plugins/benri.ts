import {sum} from 'lodash'
export const arrayToObj = (array:any[],id:string)=>{
   return array.reduce((obj,cu)=>{
     return   {...obj,[cu[id]]:cu}
    },{})
}


export const diceRoll = (kazu:number,roll:number):number[] =>{
  return [...Array(kazu).fill(0)].map(v=>Math.ceil(Math.random() * roll))
}

export const calcRoll = (formulaDiceRoll:string):number=>{
  const splitF = formulaDiceRoll.split(/([ \\+\\*\\/\\-])/g)
  return eval(splitF.map(str=>{
    if(str.includes("d")){
      const [kazu,roll] = str.split("d")
     return sum(diceRoll(Number(kazu),Number(roll)))
    }
    return str
  }).join(''))
}