import { Store } from 'redux'
import { CREATE_OLDCOC, DELETE_CHARACTER } from './middlewareAction'
import {characterSheet2, createCharacter, status} from './old-coc'
import {createSkill, skillSet} from './skill'
import {createStatus,StatusTypeBox} from './status'
import {createDescription,descriptionType} from './description'
import _ from 'lodash'


const createOldCoC = {
    async [CREATE_OLDCOC.name](store:Store){
        const {mainStatus,secondStatus} = _.cloneDeep(status)
        const skillArray = _.cloneDeep(skillSet)
        const length = `${store.getState().rootReducer.character.ids.length}${Date.now()}`
        const l = store.getState().rootReducer.character.ids.length

        let createData:characterSheet2 = {
            id:length.toString(),
            name: "名無し" + l,
            descriptionId:[],
            statusId:[[],[]],
            skillId:[],
            items:[],
            type:'oldcoc',
            created:Date.now(),
            updated:Date.now()     
        }
        const descriptionName = (name,multiline = false):descriptionType => {
            const id = `${length}${createData.descriptionId.length}`
            createData.descriptionId.push(id)
            return {
                name:name,
                descriptionId:id,
                text:"",
                multiline:multiline
            }
        }
        store.dispatch(createDescription(descriptionName("職業")))
        store.dispatch(createDescription(descriptionName("学校・学位")))
        store.dispatch(createDescription(descriptionName("精神的障害")))
        store.dispatch(createDescription(descriptionName("外見・その他",true)))
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
        _.map(skillArray,(skill)=>{
            skill.skillId = length + 'skill' +skill.id,
            store.dispatch(createSkill(skill))
            createData.skillId.push(skill.skillId)
        })
        store.dispatch(createCharacter(createData))
    },
    [DELETE_CHARACTER().type](store,action){
        
    }
}

export const chainMiddleware = store => next => action => {
    const hook = createOldCoC[action.type]
    hook && hook(store,action)
    return next(action)
}