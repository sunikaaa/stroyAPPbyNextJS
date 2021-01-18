import { makeStyles } from '@material-ui/core/styles';
import { Update } from '@reduxjs/toolkit';
import _ from 'lodash';
import React, { useState, useEffect, ReactEventHandler, ChangeEvent, Dispatch, SetStateAction, useCallback } from 'react'
import { useSelector } from 'react-redux';
import { store } from '../../reducer';
// import { Skill, SkillArray, skillSelectById, updateSkill,skillId } from '../../reducer/skill';
import { Skill, skillSelectById, updateSkill } from '../../reducer/skill2';

const useStyles = makeStyles({
   table: {
      width: '60px'
  },
  add: {
      position: 'relative',
      right: '10px',
      top: '10px'
  },
  mg_top: {

  }
})









export default function ({ ids}:{ids:string[]}) {
   // const skillState = useSelector(skillSelectById(id))
   // _.sortBy(skillState.skill,skill=>skill.name)
   return (<>
      <div className="">
         <table className="table-auto mb-10">
            <tbody>
            <SkillTableTR ids={ids} /> 
            </tbody>
         </table>
      </div>
   </>)
}

const SkillTableTR = React.memo(({ ids }: { ids:string[] }) => {

   return (<><tr>
      <th></th>
      <th>初期値</th>
      <th>職業値</th>
      <th>趣味値</th>
      <th>その他</th>
   </tr>
   {_.map(ids,(id,i)=>
      <SkillTableCell id={id} key={id} ></SkillTableCell>
         )}
      </>
   )
})

const SkillTableCell = React.memo(({id}:{id:string})=>{
   const skill = useSelector(skillSelectById(id))
   const classes= useStyles()
   const memoizeCallback = useCallback(
      (value,adapterName) => {
         store.dispatch(updateSkill({id,changes:{[adapterName]:value}}))
      },
      [skill]
   )

   console.log("change rendering")
   return  <>{skill.type === 'battle' ?  <tr>
   <th>{skill.name}</th>
   <th>{skill.initial}</th>
   <th><input type="number" className={classes.table} value={skill.job} onChange={e=>memoizeCallback(e.target.value,'job')} /></th>
   <th><input type="number" className={classes.table} value={skill.hobby} onChange={e=>memoizeCallback(e.target.value,'hobby')} /></th>
   <th><input type="number" className={classes.table} value={skill.other} onChange={e=>memoizeCallback(e.target.value,'other')} /></th>
</tr> : null}</>
})