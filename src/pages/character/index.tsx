import { createStyles, ListItem, Theme,Select, MenuItem } from '@material-ui/core';
import { makeStyles} from '@material-ui/core/styles';
import React, { useState,useEffect } from 'react'
import {Table,TableBody,Container,TableCell,TableContainer,IconButton,TableHead,TableRow,InputAdornment,Paper,Button,Input} from '@material-ui/core'
import { table } from 'console';
import { useRouter } from 'next/router';
import Sheet from '../../components/sheet/sheet'

export default function CreateCharSheet(){
const router = useRouter()
// useEffect(()=>{
//     router.push("./character/sheet/0/oldcoc")
// },[])
return <><Container maxWidth="lg" className="mt-10">
    <Sheet></Sheet>
</Container>


</>

}
