import {store,createOldCoCSheet,updateOldCoCSheet} from "./old-coc"

test("old-coc",()=>{
    store.dispatch({type:createOldCoCSheet.type,payload:{name:"sss"}})
    store.dispatch({type:createOldCoCSheet.type,payload:{name:"sss"}})
        store.dispatch({type:updateOldCoCSheet.type,payload:{id:"2",changes:{name:"adsa"}}})
    console.log(store.getState().characterSheet.entities[2])
})