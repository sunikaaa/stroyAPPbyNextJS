import { createStyles, ListItem, Theme, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect, ReactEventHandler, ChangeEvent, SetStateAction, Dispatch } from 'react'
import { Table, TableBody, Container, TableCell, TableContainer, IconButton, TableHead, TableRow, InputAdornment, Paper, Button, Input } from '@material-ui/core'
import statusJSON from '../../assets/old-coc-status.json'
import { TableDice, SecondTable, FirstStatusType, SecondTableType } from '../../plugins/tableClass';
import { mainStatusName, OldCoC } from '../../plugins/old-coc/oldCoC'
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


export default function CreateCharSheet({ stateProps }: { stateProps: OldCoC}) {
    const classes = useStyles();
    const [mainStatusState, mainStatusSet] = useState(stateProps.status.mainStatus)
    const [secondStatusState, secondStatusSet] = useState(stateProps.status.secondStatus)
    const diceRoll = () => {
        mainStatusState.forEach(v => v.diceRoll())
        mainStatusSet([...mainStatusState])
    }
    const changeFn = (state: any, set: any) => {
        return (changeStr: string) => {
            return function (event: React.ChangeEvent<HTMLInputElement>, status: TableDice | SecondTable) {
                state.find(v => v.name === status.name)[changeStr] = event.target.value
                set([...state])
                console.log(state, status.name, event.target.value)
            }
        }
    }
    const changeMain = changeFn(mainStatusState, mainStatusSet)
    const changeRoll = changeMain("roll")
    const changeChangeNum = changeMain("updown")
    const changeOther = changeMain("other")

    const secondTableFn = changeFn(secondStatusState, secondStatusSet)
    const changeSecondChangeNum = secondTableFn("updown")
    const changeSecondOther = secondTableFn("other")

    useEffect(() => {
        stateProps.updateSecondStatus()
        secondStatusSet([...secondStatusState])
    }, [mainStatusState])
    return <><Container maxWidth="sm" className="mt-10">
        <Button onClick={diceRoll}>ダイスロール！！</Button>
        <div className="mt-10">
            <table className="table-auto mb-10">
                <tbody>

                    <tr>
                        <th>技能名</th>
                        <th>基本値</th>
                        {stateProps.statusCell.map((v, i) => (<th key={i + "cell"}>{v}</th>))}
                        <th>合計</th>
                    </tr>
                    {mainStatusState.map((colum, i) => (<tr key={i + "tr"}><th>{colum.name}</th>
                        <th><input type="number" className={classes.table} value={colum.rollNum} onChange={(e) => changeRoll(e, colum)} /></th>
                        <th><input type="number" className={classes.table} value={colum.updownNum} onChange={(e) => changeChangeNum(e, colum)} /></th>
                        <th><input type="number" className={classes.table} value={colum.otherNum} onChange={(e) => changeOther(e, colum)} /></th>
                        <th>{colum.sum()}</th>
                    </tr>))}
                </tbody>
            </table>
            <table className="table-auto">
                <tbody>
                    <tr>
                        <th>技能名</th>
                        <th>基本値</th>
                        {stateProps.statusCell.map((v, i) => <th key={i}>{v}</th>)}
                        <th>合計</th>
                    </tr>
                {secondStatusState.map((colum, i) => (<tr key={i + "second"}><th>{colum.name}</th>
                    <th>{colum.rollNum}</th>
                    <th><input type="number" className={classes.table} value={colum.updownNum} onChange={(e) => changeSecondChangeNum(e, colum)} /></th>
                    <th><input type="number" className={classes.table} value={colum.otherNum} onChange={(e) => changeSecondOther(e, colum)} /></th>
                    <th>{colum.sum()}</th>
                </tr>))}
                <tr><th colSpan={2} >ダメージボーナス</th><th colSpan={2}>{OldCoC.calcDamageBonus(mainStatusState).damage}</th></tr>
                <tr><th colSpan={2} >ダメージボーナス</th><th colSpan={2}>{stateProps.damageBonus.damage}</th></tr>
                </tbody>
            </table>
        </div>
        <div className="mt-10">

        </div>
    </Container>
    </>

}
