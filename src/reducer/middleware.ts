import next from 'next'
import { Reducer } from 'react'
import { Store } from 'redux'
import { CREATE_OLDCOC, CREATE_OLDCOC2 } from './middlewareAction'
import {createOldCoCSheet} from './old-coc'
import {createOldCoCSkill} from './skill'
import {createOldCoCStatus} from './status'
const createOldCoC = {
    [CREATE_OLDCOC.name](store:Store){
        store.dispatch(createOldCoCSheet())
        store.dispatch(createOldCoCSkill())
        store.dispatch(createOldCoCStatus())
    },
    [CREATE_OLDCOC2.name](store:Store){
        store.dispatch
    }
}

export const chainMiddleware = store => next => action => {
    const hook = createOldCoC[action.type]
    hook && hook(store)
    return next(action)
}