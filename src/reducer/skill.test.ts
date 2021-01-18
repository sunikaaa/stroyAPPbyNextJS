import {abilitySet,createOldCoCSkill,store} from './skill'
test('skill',()=>{
    store.dispatch(createOldCoCSkill())
})