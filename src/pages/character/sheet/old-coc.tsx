import StatusPage from '../../../components/old-coc/status'
import SkillPage from '../../../components/old-coc/skill'
import { store } from '../../../reducer'
import { CREATE_OLDCOC } from '../../../reducer/middlewareAction'

export default function OldCoCPage({id}){

    return (<>
    <StatusPage id={id} />
    <SkillPage id={id[0]}></SkillPage>
    </>)
}

store.dispatch(CREATE_OLDCOC)
OldCoCPage.getInitialProps = async () => {
    return {id:[0,1]}
}