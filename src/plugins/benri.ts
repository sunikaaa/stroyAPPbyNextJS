export const arrayToObj = (array:any[],id:string)=>{
   return array.reduce((obj,cu)=>{
     return   {...obj,[cu[id]]:cu}
    },{})
}


export const diceRoll = (kazu:number,roll:number) =>{
  return [...Array(kazu).fill(0)].map(v=>Math.ceil(Math.random() * roll))
}
