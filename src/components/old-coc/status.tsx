import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect, ChangeEvent } from 'react'
import { Container, Button } from '@material-ui/core'
import {store} from '../../reducer/index'
import {CREATE_OLDCOC} from '../../reducer/middlewareAction'
import {calcRoll, getters, statusSelectById,StatusType,StatusTypeBox,updateDiceRoll,updateStatus} from '../../reducer/status'
import { useSelector } from 'react-redux';
import _ from 'lodash'
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



export default function CreateCharSheet({id}) {
    const classes = useStyles();
    const mainStatusState = useSelector(statusSelectById(id[0]))
    const secondStatusState = useSelector(statusSelectById(id[1]))
    // const [mainStatusState, mainStatusSet] = useState(stateProps.status.mainStatus)
    // const [secondStatusState, secondStatusSet] = useState(stateProps.status.secondStatus)
    const diceRoll = () => {
        store.dispatch(updateDiceRoll({id:id[0]}))
    }
    const changeFn = (state: StatusTypeBox) => {
        return (changeStr: string) => {
            return function (event: React.ChangeEvent<HTMLInputElement>, status: StatusType) {
                const changeStatus = _.cloneDeep(status)
                changeStatus[changeStr] = event.target.value
                const data:StatusTypeBox = {
                    id:state.id,
                    status:{
                        ...state.status,
                        [status.name] : changeStatus
                    }
                }
                store.dispatch(updateStatus({ id:state.id, changes:{...data} }))
            }
        }}
    const changeMain = changeFn(mainStatusState)
    const changeRoll = changeMain("roll")
    const changeChangeNum = changeMain("updown")
    const changeOther = changeMain("other")

    const secondTableFn = changeFn(secondStatusState)
    const changeSecondChangeNum = secondTableFn("updown")
    const changeSecondOther = secondTableFn("other")

    useEffect(() => {
        store.dispatch(calcRoll({id:id}))
    }, [mainStatusState])

    useEffect(()=>{
        store.dispatch(CREATE_OLDCOC)
    },[])
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
                    {_.map(mainStatusState.status,(colum, i) => (<tr key={i + "tr"}><th>{colum.name}</th>
                        <th><input type="number" className={classes.table} value={colum.roll} onChange={(e) => changeRoll(e, colum)} /></th>
                        <th><input type="number" className={classes.table} value={colum.updown} onChange={(e) => changeChangeNum(e, colum)} /></th>
                        <th><input type="number" className={classes.table} value={colum.other} onChange={(e) => changeOther(e, colum)} /></th>
                        <th>{getters.sum(colum)}</th>
                    </tr>))}
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
                {_.map(secondStatusState.status,(colum, i) => (<tr key={i + "second"}><th>{colum.name}</th>
                    <th>{colum.roll}</th>
                    <th><input type="number" className={classes.table} value={colum.updown} onChange={(e) => changeSecondChangeNum(e, colum)} /></th>
                    <th><input type="number" className={classes.table} value={colum.other} onChange={(e) => changeSecondOther(e, colum)} /></th>
                    <th>{getters.sum(colum)}</th>
                </tr>))}
                <tr><th colSpan={2} >ダメージボーナス</th><th colSpan={2}>{getters.damageBonus(mainStatusState).damage}</th></tr>
                </tbody>
            </table>
        </div>
        <div className="mt-10">

        </div>
    </Container>
    </>

}
