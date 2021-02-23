import {sum} from 'lodash'
import {format,Locale} from 'date-fns'
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
  return calcString(splitF.map(str=>{
    if(str.includes("d")){
      const [kazu,roll] = str.split("d")
     return sum(diceRoll(Number(kazu),Number(roll)))
    }
    return str
  }).join(''))
}
export const calcMaxRoll = (formulaDiceRoll:string):number=>{
  const splitF = formulaDiceRoll.split(/([ \\+\\*\\/\\-])/g)
  return calcString(splitF.map(str=>{
    if(str.includes("d")){
      const [kazu,roll] = str.split("d")
     return Number(kazu) * Number(roll)
    }
    return str
  }).join(''))
}

export const calcString = (str:string) => {
  return Function('return' + " " + str)()
}

export const sheetTypeToJP = (str:string) => {
  switch(str){
    case 'oldcoc':
      return '旧クトゥルフ神話TRPG'
    default :
     return '不明のシート'
  }  
}
export const nowFormatDate = (date:number) => {
  return format(date,'yyyy/MM/dd HH:mm')
}