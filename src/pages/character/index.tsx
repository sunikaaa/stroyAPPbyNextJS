import { createStyles, ListItem, Theme,Select, MenuItem } from '@material-ui/core';
import { makeStyles} from '@material-ui/core/styles';
import React, { useState,useEffect } from 'react'
import {Table,TableBody,Container,TableCell,TableContainer,IconButton,TableHead,TableRow,InputAdornment,Paper,Button,Input} from '@material-ui/core'
import { table } from 'console';
const useStyles = makeStyles({
    table: {
        width:'60px'
    },
    add: {
        position: 'relative',
        right: '10px',
        top: '10px'
    },
    mg_top:{
        
    }
})

const initialTable = {
    colum:[""],
    cell:[""]

}

export default function CreateCharSheet(){
    const classes = useStyles();
    const [state, setState] = useState(["","",""])
    const [columNumber,setColumNumber] = useState(3)
    const [columValue,setColumValue] = useState(["","",""])
    useEffect(()=>{
        console.log("rendering")
    },[])
    const [tableDataState,setTableData] = useState(initialTable)

    const [cellNumber, setCellNumber] = useState(3);
    const changeColum = (event: React.ChangeEvent<{value:number}>) =>{
        const columNum:number = event.target.value
        const colum = tableDataState.colum
        console.log(event.target.value)
        setColumNumber(columNum)
        const competitionNumber =columNum - colum.length
        if(competitionNumber < 0){
            setTableData({...tableDataState,colum:colum.filter((v,i)=>i < columValue.length)})
        }else if(competitionNumber > 0){
            setTableData({...tableDataState,colum:[...colum,...Array(competitionNumber)]})

        }
    }

    const changeDataColum = (data:React.ChangeEvent<{value:string}>,index:number) => {
        setColumValue(columValue.map((v,i)=>i === index ? data.target.value:v))
        const colum = tableDataState.colum
        setTableData({...tableDataState,colum: colum.map((v,i)=>i === index ? data.target.value:v)})
    }

    const handleChange = (event: React.ChangeEvent<{ value: number }>) => {

        const cellNum:number = event.target.value
        const cell = tableDataState.cell
      setCellNumber(event.target.value)
      const competitionNumber = cellNum -cell.length
      if(competitionNumber < 0){
          setTableData({...tableDataState,cell:cell.filter((_v,i)=>i < cellNum)})
      }else if(competitionNumber > 0){
          setTableData({...tableDataState,cell:[...cell,...Array(competitionNumber)]})
      }
    //   setState([...Array(event.target.value)])
    };

    const changeDataCell = (data, index)=> {
        setTableData({...tableDataState,cell:tableDataState.cell.map((v,i)=>i === index ? data.target.value:v)})
    }
return <><Container maxWidth="sm" className="mt-10">
    <Select className="mg-left" onChange={handleChange} value={tableDataState.cell.length}>
{[...Array(5)].fill(0).map((v,i)=>(<MenuItem value={i+1} key={i+1}>{i+1}</MenuItem>))}
    </Select>
    列
    <div className="flex">{tableDataState.cell.map((v,i)=>(<div className="flex-1 m-1" key={i} ><Input value={v}  onChange={(v)=>changeDataCell(v,i)} /></div>))}</div>
<div className="mt-10">
<Select  onChange={changeColum} value={tableDataState.colum.length} >{[...Array(20)].fill(0).map((v,i) =>(<MenuItem value={i} key={i}>{i}</MenuItem>))}</Select>行
<div className="flex">{tableDataState.colum.map((v,i)=>(<div className="flex-1 m-1" key={i} ><Input value={v} onChange={(v)=>changeDataColum(v,i)} /></div>))}</div>
</div>
<div className="mt-10"><table className="table-auto">
    <thead>
    <tr>
        <th>技能名</th>
        {tableDataState.cell.map((v,i)=>(<th>{v}</th>))}
        <th>合計</th>
    </tr>
    </thead>
{tableDataState.colum.map((v,i)=>(<tr key={i}><th>{v}</th>{tableDataState.cell.map((v,i)=><th><input type="number" className={classes.table} /></th>)}</tr>))}
    </table></div>
</Container>


</>

}
