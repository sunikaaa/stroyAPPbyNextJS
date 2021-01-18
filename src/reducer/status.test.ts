import {store,updateDiceRoll,createOldCoCStatus,calcRoll,getters, updateStatus, StatusTypeBox} from './status'
test('skill',()=>{
    store.dispatch(createOldCoCStatus())
    store.dispatch(createOldCoCStatus())
    store.dispatch(updateDiceRoll({id:0}))
    const status = store.getState().status
    const changes:Partial<StatusTypeBox> = {
        status:{
            ...status.entities[0].status,
            'DEX':{
                ...status.entities[0].status['DEX'],
                updown:'10'
            }
        }
    }
    store.dispatch(updateStatus({id:0,changes:changes}))
    const damage = getters.damageBonus(store.getState().status.entities[0])
})