import StatusPage from '../../../components/old-coc/status'
import SkillPage from '../../../components/old-coc/skill'
import { store } from '../../../reducer'
import { CREATE_OLDCOC, CREATE_OLDCOC2 } from '../../../reducer/middlewareAction'
import { characterSelectById } from '../../../reducer/old-coc'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

export default function OldCoCPage({id}){
    const characterSheet = useSelector(characterSelectById(0))
    useEffect(()=>{
        console.log("changeit")
    },[characterSheet.statusId])
    return (<>
    <StatusPage ids={characterSheet.statusId} />
    <SkillPage ids={characterSheet.skillId}></SkillPage>
    </>)
}

store.dispatch(CREATE_OLDCOC2)
OldCoCPage.getInitialProps = async () => {
    return {id:[0,1]}
}