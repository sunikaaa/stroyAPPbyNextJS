import next from 'next'
import { Reducer } from 'react'
import { Store } from 'redux'
import { CREATE_OLDCOC, UPDATE_SECONDSTATUS } from './middlewareAction'
import {characterSheet2, createCharacter, createOldCoCSheet,status} from './old-coc'
import {createSkill, skillSet} from './skill'
import {createStatus,StatusTypeBox} from './status'
import {format} from 'date-fns'
import _ from 'lodash'
import { nowFormatDate } from '../plugins/benri'
const createOldCoC = {
    [CREATE_OLDCOC.name](store:Store){
        const {mainStatus,secondStatus} = _.cloneDeep(status)
        const skillArray = _.cloneDeep(skillSet)
        const length = store.getState().character.ids.length
        let createData:characterSheet2 = {
            id:length.toString(),
            name: "名無し" + length,
            descriptionId:[],
            statusId:[[],[]],
            skillId:[],
            type:'oldcoc',
            created:nowFormatDate(),
            updated:nowFormatDate()     
        }
        mainStatus.map((v:StatusTypeBox,i)=>{
            v.statusId = length + 'main' + i
            v.roll = "0"
            v.other = "0"
            v.updown = "0"
            v.id = i
            store.dispatch(createStatus(v))
            createData.statusId[0].push(v.statusId)
        })
        secondStatus.map((v:StatusTypeBox,i)=>{
            v.statusId = length + 'second' + i
            v.roll = "0"
            v.other = "0"
            v.updown = "0"
            v.id = i
            store.dispatch(createStatus(v))
            createData.statusId[1].push(v.statusId)
        })
        _.map(skillArray,(skill,i)=>{
            skill.skillId = length + 'skill' +skill.id,
            store.dispatch(createSkill(skill))
            createData.skillId.push(skill.skillId)
        })
        store.dispatch(createCharacter(createData))
    },
}

export const chainMiddleware = store => next => action => {
    const hook = createOldCoC[action.type]
    hook && hook(store)
    return next(action)
}