import {OldCoC} from '../../../plugins/old-coc/oldCoC'
import {useState,useEffect} from 'react'
import StatusPage from '../../../components/old-coc/status'
import SkillPage from '../../../components/old-coc/skill'
const oldCoC = new OldCoC({})

export default function OldCoCPage({}){
    const [characterState,characterSet] =useState(oldCoC)
    

    return (<>
    <StatusPage stateProps={characterState} />
    <SkillPage stateProps={characterState}></SkillPage>
    </>)
}