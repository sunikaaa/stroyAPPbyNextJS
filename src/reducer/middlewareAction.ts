export const CREATE_OLDCOC = {
    name:'CREATE_OLDCOC',
    type:'CREATE_OLDCOC'
}
export const UPDATE_SECONDSTATUS = {
    name:'UPDATE_SECONDSTATUS',
    type:'UPDATE_SECONDSTATUS'
}
export const DELETE_CHARACTER = (id:string = '') => {
        return {  
            type:'DELETE_CHARACTER',
            payload: {id}
  }
}