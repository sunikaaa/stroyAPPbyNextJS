import StatusPage from '../../../../components/old-coc/status'
import SkillPage from '../../../../components/old-coc/skill'
import SkillPoint from '../../../../components/old-coc/skillPoint'
import { CREATE_OLDCOC } from '../../../../reducer/middlewareAction'
import { characterSelectById, updateDate } from '../../../../reducer/old-coc'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { useEffect } from 'react'
import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useRouter } from 'next/router'
import { nameSelect, skillExceptionIds } from '../../../../reducer/skill'
import _ from 'lodash'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next'
import Input from '@material-ui/core/Input'

export default function OldCoCPage({id,url}){
    const router = useRouter()
    const characterSheet = useSelector(characterSelectById(Number(id)))
    const exceptionSkill = useSelector(skillExceptionIds(characterSheet.skillId))
    const [value, setValue] = React.useState(2);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
      setValue(newValue);
    };
  
    const dispatch = useDispatch()
    if(_.isEmpty(characterSheet)){
        router.push("./")
    }

    useEffect(()=>{
        if(!characterSheet){
            router.push("./")
        }
        console.log(characterSheet)
        return () => {
            dispatch(updateDate({id:id}))
        }
    },[])
    return (<>
    <Input />
        <Paper square>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        <Tab label="ステータス" />
        <Tab label="スキル"  />
      </Tabs>
    </Paper>
    <TabPanel index={0} value={value}>
    <StatusPage ids={characterSheet.statusId} exceptionSkill={exceptionSkill} />
    </TabPanel>
    <TabPanel index={1} value={value}>
    <SkillPage ids={characterSheet.skillId}></SkillPage>
    <SkillPoint character={characterSheet}></SkillPoint>
    </TabPanel>
    </>)
}

function TabPanel(props){
    const { children, value,index,...other} = props
    return (
        <div
        role="tabpanel"
        hidden={value !== index}
            id={index + "tab"}
            {...other}
            >
                     {value === index && (
          <Typography>{children}</Typography>
      )}
        </div>
    )
}

export const  getStaticProps:GetStaticProps = async (context) => {  
    const userId:string = context.params.userId as string
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