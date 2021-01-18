import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect, ChangeEvent, useCallback } from 'react'
import { Container, Button } from '@material-ui/core'
import {store, storeType} from '../../reducer/index'
import {CREATE_OLDCOC} from '../../reducer/middlewareAction'
import {getters, mainStatusId, statusSelectById,statusSelectByIds,statusSelectors,StatusType,StatusTypeBox,updateStatus} from '../../reducer/status2'
import { useSelector } from 'react-redux';
import _, { values } from 'lodash'
import { Classes } from '@material-ui/styles/mergeClasses/mergeClasses';
import { calcRoll } from '../../plugins/benri';
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



export default function CreateCharSheet({ids}:{ids:string[][]}) {
    const classes = useStyles();
    const [mainStatusIds,secondStatusIds] = ids
    const statusAll = useSelector(statusSelectors.selectEntities)
    const mainStatus = useSelector(statusSelectByIds(ids[0]))
    const secondStatus = useSelector(statusSelectByIds(ids[1]))
    const diceRoll = () =>{
        mainStatus.forEach(v=>{
            store.dispatch(updateStatus({id:v.statusId,changes:{roll:calcRoll(v.dice).toString()}}))
        })
    }
    return <><Container maxWidth="sm" className="mt-10">
        <Button onClick={diceRoll}>ダイスロール！！</Button>
        <div className="mt-10">
            <table className="table-auto mb-10">
                <tbody>

                    <tr>
                        <th>技能名</th>
                        <th>基本値</th>
                        <th>昇降値</th>
                        <th>その他</th>
                        <th>合計</th>
                    </tr>
                    {mainStatusIds.map((id, i)=>(
                        <MainStatusTableTR id={id} key={id} secondStatus={secondStatus} mainStatus={mainStatus} />
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
                {secondStatusIds.map((id, i) =>(<SecondStatusTableTR id={id} key={id} mainIds={mainStatusIds}  />))}
                <tr><th colSpan={2} >ダメージボーナス</th><th colSpan={2}>{getters.damageBonus(statusAll,ids[0]).damage}</th></tr>
                </tbody>
            </table>
        </div>
        <div className="mt-10">

        </div>
    </Container>
    </>

}

const MainStatusTableTR = React.memo(({id,secondStatus,mainStatus}:{id:string,secondStatus:StatusTypeBox[],mainStatus:StatusTypeBox[]})=>{
    const status = useSelector(statusSelectById(id))
    const classes = useStyles()
    const memoizeCallback = useCallback(
        (value,adapterName) => {
            store.dispatch(updateStatus({id,changes:{[adapterName]:value}}))
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
                    return findData ? getters.sum(findData) : v
                }).join('')
                const formulaed = _.isNumber(eval(formulaMap)) ? Math.ceil(eval(formulaMap)) : NaN
                console.log(s,formulaed)
                store.dispatch(updateStatus({id:s.statusId,changes:{roll:formulaed.toString()}}))
            }
        })
 
    },[status])
    return <TR status={status} classes={classes} dispatch={memoizeCallback}></TR>
})
const SecondStatusTableTR =React.memo(({id,mainIds}:{id:string,mainIds:string[]})=>{
    const status = useSelector(statusSelectById(id))
    const classes = useStyles()
    const memoizeCallback = useCallback(
        (value,adapterName) => {
            store.dispatch(updateStatus({id,changes:{[adapterName]:value}}))
        },
        [status]
    )
    return <TR status={status} classes={classes} dispatch={memoizeCallback} isInput={false}></TR>
})
const TR = React.memo( ({status,classes,dispatch,isInput = true}:{status:StatusTypeBox,classes:Classes,dispatch:any,isInput?:boolean})=>{
    return <>
    <tr>
        <th>{status.name}</th>
        <th>{isInput ? <input value={status.roll} type="number" className={classes.table} onChange={(e) => dispatch(e.target.value,'roll')} /> : status.roll}</th>
        <th><input value={status.updown}  type="number" className={classes.table} onChange={(e) => dispatch(e.target.value,'updown')} /></th>
        <th><input value={status.other}  type="number"  className={classes.table} onChange={(e) => dispatch(e.target.value,'other')} /></th>
        <th>{getters.sum(status)}</th>
    </tr>
</>
})