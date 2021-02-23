import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import React, { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { skillSelectById, updateSkill,skillGetters } from '../../reducer/skill';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/core/Autocomplete';
// import { Skill, SkillArray, skillSelectById, updateSkill,skillId } from '../../reducer/skill';

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









export default React.memo(({ ids}:{ids:string[]})=> {
   const [filterAutoCompleteState,setFilterAutoComplete] = useState(autoCompleteData[0])
   const [filterInput,setFilterInput] = useState("")
   return (<>
      <div className="flex justify-center ">
         <table className="table-auto mb-10">
            <tbody>
               <tr>
                <th colSpan={5}>
                   <ComboBox state={filterAutoCompleteState} stateInput={filterInput} setInputDispatch={setFilterInput} setDispatch={setFilterAutoComplete} ></ComboBox>
                 </th>
               </tr>
            <SkillTableTR filterState={filterAutoCompleteState} filterInput={filterInput} ids={ids} /> 
            </tbody>
         </table>
      </div>
   </>)
})

const SkillTableTR = React.memo(({ ids,filterState,filterInput }: { ids:string[],filterState:autocompleteDataType,filterInput:string }) => {
   return (<>
   <tr>
      <th></th>
      <th>初期値</th>
      <th>職業値</th>
      <th>趣味値</th>
      <th>その他</th>
      <th>合計</th>
   </tr>
   {_.map(ids,(id)=>
      <SkillTableCell id={id} key={id} filter={filterState} filterInput={filterInput} ></SkillTableCell>
         )}
      </>
   )
})

const SkillTableCell = React.memo(({id,filter,filterInput}:{id:string,filter?:autocompleteDataType,filterInput:string})=>{
   const skill = useSelector(skillSelectById(id))
   const classes= useStyles()
   const dispatch = useDispatch()
   const memoizeCallback = useCallback(
      (value,adapterName) => {
         dispatch(updateSkill({id,changes:{[adapterName]:value}}))
      },
      [skill]
   )
   const filterComponent = () => {
      if(_.isEmpty(filter.type) && !_.isEmpty(filter)){
         return skill.name.includes(filterInput) || skill?.furigana?.includes(filterInput)
      }
      return skill.type === filter.type || _.isEmpty(filter.type)
   }
   return  <>{filterComponent() ?  <tr>
   <th>{skill.name}</th>
   <th>{skill.initial}</th>
   <th><input type="number" className={classes.table} value={skill.job} onChange={e=>memoizeCallback(e.target.value,'job')} /></th>
   <th><input type="number" className={classes.table} value={skill.hobby} onChange={e=>memoizeCallback(e.target.value,'hobby')} /></th>
   <th><input type="number" className={classes.table} value={skill.other} onChange={e=>memoizeCallback(e.target.value,'other')} /></th>
   <th>{skillGetters.sum(skill)}</th>
</tr> : null}</>
})

const ComboBox = React.memo(({state,setDispatch,stateInput,setInputDispatch}:{state:autocompleteDataType,setDispatch:any,stateInput:string,setInputDispatch:any})=> {
   return (
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={autoCompleteData}
        value={state}
        inputValue={stateInput}
        freeSolo
        onInputChange={(event,newInputValue)=>{
           setInputDispatch(newInputValue)
        }}
        onChange={(e,newValue)=>{
           newValue === null ? newValue = autoCompleteData[0]:''
           setDispatch(newValue)
         }}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params}   label="検索" />}
      />
    );
})
type autocompleteDataType = {
   label:string,
   type:string
}
const autoCompleteData:autocompleteDataType[] = [
   {label:'',
type:''},
   {
   label: '戦闘技能',
   type:'battle'
},{
   label: '探索技能',
   type:'find'
},{
   label:'技術技能',
   type:'move'
},{
   label:'話術技能',
   type:'talk'
},{
   label:'知識技能',
   type:'int'
}]