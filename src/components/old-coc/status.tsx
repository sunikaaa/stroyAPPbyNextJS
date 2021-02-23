import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useCallback } from 'react'
import { Container, Button } from '@material-ui/core'
import {statusGetters, statusSelectById,statusSelectByIds,statusSelectByName,statusSelectors,StatusTypeBox,updateStatus} from '../../reducer/status'
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash'
import { Classes } from '@material-ui/styles/mergeClasses/mergeClasses';
import { calcMaxRoll, calcRoll, calcString } from '../../plugins/benri';
import { Skill, updateSkill } from '../../reducer/skill';
import { Dictionary } from '@reduxjs/toolkit';
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



export default function CreateCharSheet({ids,exceptionSkill}:{ids:string[][],exceptionSkill:Skill[]}) {
    const [mainStatusIds,secondStatusIds] = ids
    const statusAll = useSelector(statusSelectors.selectEntities)
    const mainStatus = useSelector(statusSelectByIds(ids[0]))
    const secondStatus = useSelector(statusSelectByIds(ids[1]))
    const dispatch = useDispatch()
    const diceRoll = () =>{
        mainStatus.forEach(v=>{
            dispatch(updateStatus({id:v.statusId,changes:{roll:calcRoll(v.dice).toString()}}))
        })
    }
    return <><Container maxWidth="sm" className="mt-10">
        <Button onClick={diceRoll}>ダイスロール！！</Button>
        <div className="mt-10 flex justify-center">
            <div className="">

            <table className="table-auto mb-10">
                <tbody>

                    <tr>
                        <th>技能名</th>
                        <th>基本値</th>
                        <th>昇降値</th>
                        <th>その他</th>
                        <th>合計</th>
                    </tr>
                    {mainStatusIds.map((id)=>(
                        <MainStatusTableTR id={id} key={id} secondStatus={secondStatus} mainStatus={mainStatus} exceptionSkill={exceptionSkill} />
                        ))}
                </tbody>
            </table>
            <table className="table-auto">
                <tbody>
                    <tr>
                        <th>技能名</th>
                        <th>基本値</th>
                        <th>昇降値</th>
                        <th>その他</th>
                        <th>合計</th>
                    </tr>
                {secondStatusIds.map((id) =>(<SecondStatusTableTR id={id} key={id} mainIds={mainStatusIds}  />))}
                <DamageComponent  ids={ids[0]} />
                </tbody>
            </table>
          </div>
        </div>
        <div className="mt-10">

        </div>
    </Container>
    </>

}

const MainStatusTableTR = React.memo(({id,secondStatus,mainStatus,exceptionSkill}:{id:string,secondStatus:StatusTypeBox[],mainStatus:StatusTypeBox[],exceptionSkill:Skill[]})=>{
    const status = useSelector(statusSelectById(id))
    const classes = useStyles()
    const dispatch = useDispatch()
    const memoizeCallback = useCallback(
        (value,adapterName) => {
            dispatch(updateStatus({id,changes:{[adapterName]:value}}))
        },
        [status]
    )
    useEffect(()=>{
        secondStatus.forEach(s=>{
            // 計算式の名前が含んでる場合のみ回す
            if(s.formula.includes(status.name)){
                const formula = s.formula.split(" ")
                const formulaMap = formula.map(v=>{
                    const findData = _.find(mainStatus,status=>status.name === v)
                    return findData ? statusGetters.sum(findData) : v
                }).join('')
                const formulaed = _.isNumber(calcString(formulaMap)) ? Math.ceil(calcString(formulaMap)) : NaN
                dispatch(updateStatus({id:s.statusId,changes:{roll:formulaed.toString()}}))
            }
        })
        exceptionSkill.forEach(s=>{
            if(s.formula.includes(status.name)){
                const formula = s.formula.split(" ")
                const formulaMap = formula.map(v=>{
                    const findData = _.find(mainStatus,status=>status.name === v)
                    return findData ? statusGetters.sum(findData) : v
                }).join('')
                const formulaed = _.isNumber(calcString(formulaMap)) ? Math.ceil(calcString(formulaMap)) : NaN
                dispatch(updateSkill({id:s.skillId,changes:{initial:formulaed}}))
            }
        })
 
    },[status])
    const MaxRoll = calcMaxRoll(status.dice)  - Number(status.roll) === 0 
    return <TR status={status} classes={classes} dispatch={memoizeCallback}  inputRed={MaxRoll}></TR>
})
const SecondStatusTableTR =React.memo(({id}:{id:string,mainIds:string[]})=>{
    const dispatch = useDispatch()
    const status = useSelector(statusSelectById(id))
    const classes = useStyles()
    const memoizeCallback = useCallback(
        (value,adapterName) => {
           dispatch(updateStatus({id,changes:{[adapterName]:value}}))
        },
        [status]
    )
    return <TR status={status} classes={classes} dispatch={memoizeCallback} isInput={false} ></TR>
})
const TR = React.memo( ({status,classes,dispatch,isInput = true,inputRed}:{status:StatusTypeBox,classes:Classes,dispatch:any,isInput?:boolean,inputRed?:boolean})=>{
    return <>
    <tr>
        <th>{status.name}</th>
        <th>{isInput ? <input value={status.roll} type="number" className={`${classes.table} ${inputRed ? 'text-red-500': ''}`} onChange={(e) => dispatch(e.target.value,'roll')} /> : status.roll}</th>
        <th><input value={status.updown}  type="number" className={classes.table} onChange={(e) => dispatch(e.target.value,'updown')} /></th>
        <th><input value={status.other}  type="number"  className={classes.table} onChange={(e) => dispatch(e.target.value,'other')} /></th>
        <th>{statusGetters.sum(status)}</th>
    </tr>
</>
})
const DamageComponent = React.memo(({ids}:{ids:string[]})=>{
    const STR = useSelector(statusSelectByName("STR",ids))
    const SIZ = useSelector(statusSelectByName("SIZ",ids))
    console.log("changes")
    return <><tr><th colSpan={2} >ダメージボーナス</th><th colSpan={2}>{statusGetters.damageBonus(STR,SIZ).damage}</th></tr></>
})