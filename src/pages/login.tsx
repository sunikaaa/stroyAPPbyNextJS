import { Button, Input, TextField } from "@material-ui/core"
import axios from "axios"
import React, { useState } from "react"
import { useDispatch } from "react-redux"



const Description = () => {
    const dispatch = useDispatch()
    const [emailState,emailDispatch] = useState("")
    const [passwordState,passwordDispatch] = useState("")
    const [nameState,nameDispatch] = useState("")

    const signUp = async () => {
        try {            
            console.log("push button")
            const p = await axios.post("http://localhost:11583/signup",{
                name:nameState,
                email:emailState,
                password:passwordState
            },
            {headers:{
                'Content-Type':'application/json'
            }}
            )
            console.log(p)
        } catch (error) {
            console.log(error.message)
        
        }
    }
    return (<>
            {/* <form className="full-width"> */}
        <div className="flex mt-4 justify-items-start flex-col items-center">
            <OnlyTextField onChangeName={nameDispatch}    value={nameState} label="name" ></OnlyTextField>
            <OnlyTextField onChangeName={emailDispatch}    value={emailState} label="email" ></OnlyTextField>
            <OnlyTextField onChangeName={passwordDispatch}    value={passwordState} label="password" ></OnlyTextField>
            <Button variant="outlined" onClick={signUp} >登録する</Button>
        </div>
            {/* </form> */}
    </>)
}


const OnlyTextField = ({value,onChangeName,label}) =>{
    const multilineCss = "h-12 mb-20 sm:w-full sm:mx-20"
    return (
        <div className={`sm:w-2/5 flex my-2 justify-center m-4 w-full`}>
        <TextField fullWidth type={label}  label={label} value={value}  onChange={(e) => onChangeName(e.target.value)}></TextField>
        </div>
    )
}

export default Description