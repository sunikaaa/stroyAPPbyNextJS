import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect, ReactEventHandler, ChangeEvent, Dispatch, SetStateAction } from 'react'
import { OldCoC } from '../../plugins/old-coc/oldCoC'
import { Skill } from '../../plugins/old-coc/skill';

export default function ({ stateProps}: { stateProps: OldCoC}) {
   const [skillsState, setSkills] = useState(stateProps.skill)

   return (<>
      <div className="">
         <table>
            <tbody>
            <SkillTableTR skill={skillsState.battle} /> 
            <SkillTableTR skill={skillsState.find} /> 
            <SkillTableTR skill={skillsState.int} /> 
            <SkillTableTR skill={skillsState.move} /> 
            <SkillTableTR skill={skillsState.talk} /> 
            </tbody>
         </table>
      </div>
   </>)
}

const SkillTableTR = ({ skill }: { skill: Skill[] }) => {
   const [skillState, setSkill] = useState(skill)
   return (<><tr>
      <th><input type="text" /></th>
      <th>初期値</th>
      <th>職業値</th>
      <th>趣味値</th>
      <th>その他</th>
   </tr>
   {skillState.map((skill,i)=>
      <SkillTableCell skill={skill} key={i} ></SkillTableCell>
         )}
      </>
   )
}

const SkillTableCell = ({skill}:{skill:Skill})=>{
   const [skillState,setSkill] = useState({...skill})
   const skillJobUpdate = (e:React.ChangeEvent<HTMLInputElement>) =>{
      // skillState.job = parseInt(e.target.value,10)
      setSkill({...skillState,job:parseInt(e.target.value,10)})
   }
   const skillHobbyUpdate = (e:React.ChangeEvent<HTMLInputElement>) =>{
      // skillState.hobby = parseInt(e.target.value,10)
   }
   const skillOtherUpdate = (e:React.ChangeEvent<HTMLInputElement>) =>{
      // skillState.other = parseInt(e.target.value,10)
   }
   return  <tr>
   <th>{skillState.name}</th>
   <th><input type="number" value={skillState.initial} /></th>
   <th><input type="number" value={skillState.job} onChange={e=>skillJobUpdate(e)} /></th>
   <th><input type="number" value={skillState.hobby} onChange={e=>skillHobbyUpdate(e)} /></th>
   <th><input type="number" value={skillState.other} onChange={e=>skillOtherUpdate(e)} /></th>
</tr>
}