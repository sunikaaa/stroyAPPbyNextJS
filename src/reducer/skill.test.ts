import {abilitySet,createOldCoCSkill,store} from './skill'
test('skill',()=>{
    console.log(store.getState().skill)
    store.dispatch(createOldCoCSkill())
    console.log(store.getState().skill)
})