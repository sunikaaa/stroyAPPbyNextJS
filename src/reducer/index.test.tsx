import { Provider, RootStateOrAny, useSelector } from 'react-redux'
import {store} from './index'
import {CREATE_OLDCOC} from './middlewareAction'
import {skillSelectors,skillSelectById} from './skill'
import {statusSelectById} from './status'
import React from "react";
import renderer from 'react-test-renderer';
import _ from 'lodash'

const  Test = ()=>{
    const skill = useSelector(skillSelectById(1))
    const status = useSelector(statusSelectById(1))
    _.sortBy(skill,(data)=>data)
    return (<div>{JSON.stringify(status)}</div>)
}


test("store",()=>{
    console.log(store.getState())
    store.dispatch(CREATE_OLDCOC)
    store.dispatch(CREATE_OLDCOC)
    const component = renderer.create(<Provider store={store}><Test></Test></Provider>)
    const tree =component.toJSON()
})