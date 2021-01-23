import StatusPage from '../../../../components/old-coc/status'
import SkillPage from '../../../../components/old-coc/skill'
import SkillPoint from '../../../../components/old-coc/skillPoint'
import { store } from '../../../../reducer'
import { CREATE_OLDCOC } from '../../../../reducer/middlewareAction'
import { characterSelectById, updateDate } from '../../../../reducer/old-coc'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { nameSelect, skillExceptionIds } from '../../../../reducer/skill'
import _ from 'lodash'
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next'

export default function OldCoCPage({id,url}){
    const router = useRouter()
    const characterSheet = useSelector(characterSelectById(Number(id)))
    const exceptionSkill = useSelector(skillExceptionIds(characterSheet.skillId))
    if(_.isEmpty(characterSheet)){
        router.push("./")
    }

    useEffect(()=>{
        console.log(store.getState().character)
        return () => {
            store.dispatch(updateDate({id:id}))
        }
    },[])
    return (<>
    <StatusPage ids={characterSheet.statusId} exceptionSkill={exceptionSkill} />
    <SkillPage ids={characterSheet.skillId}></SkillPage>
    <SkillPoint character={characterSheet}></SkillPoint>
    </>)
}

store.dispatch(CREATE_OLDCOC)

export const  getStaticProps:GetStaticProps = async (context) => {  
    const userId:string = context.params.userId as string
    console.log(_.includes(store.getState().character.ids,userId))
    console.log(store.getState().character.ids)
    if(!_.includes(store.getState().character.ids,userId)){
        return {
            notFound:true
        }
    }
    // if (!data) {
    //   return {
    //     redirect: {
    //       destination: '/',
    //       permanent: false,
    //     },
    //   }
    // }
    return {
        props:{id:userId},
        // fallback: 'blocking',
        // paths:[userId]
  }
}
export const getStaticPaths: GetStaticPaths<{ slug: string }> = async (context) => {
    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
}