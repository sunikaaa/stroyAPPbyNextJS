import { Button, Input, TextField } from "@material-ui/core"
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { itemSelectById, updateItem,createItem,deleteItem } from "../../reducer/items"
import { characterSelectById, updateCharacter } from "../../reducer/old-coc"


const Description = ({ids,characterId}:{ids:string[],characterId:string}) => {
    const dispatch = useDispatch()
    const characterSheet = useSelector(characterSelectById(characterId))
    const [itemState,itemDispatch] = useState({name:"",havingNumber:0})
    const changeName = (e) => {
        itemDispatch({...itemState,name:e.target.value})
    }
    const changeNumber = (e) => {
        itemDispatch({...itemState,havingNumber:e.target.value})
    }
    const addItem = () => {
        const id = ids.length.toString() + Date.now()
        dispatch(updateCharacter({id:characterId,changes:{items:[...ids,id]}}))
        dispatch(createItem({...itemState,itemId:id}))
        itemDispatch({name:"",havingNumber:0})
    }
    const deleteItemFunc = (id) => {
        dispatch(updateCharacter({id:characterId,changes:{items:[...ids.filter(oldId=>id !== oldId)]}}))
        dispatch(deleteItem(id))
    }
    return (<>
        <div className="flex mt-4 justify-items-start flex-col items-center">
            <OnlyTextField onChangeName={changeName} onChangeNumber={changeNumber}   value={itemState} ><Button onClick={addItem}>＋</Button></OnlyTextField>
    {ids.map(id=>
        <DescriptionTextField id={id} deleteItemFunc={deleteItemFunc} />
        )}
        </div>
    </>)
}

const DescriptionTextField = ({id,deleteItemFunc}:{id:string,deleteItemFunc:(id)=>void}) => {
    const items = useSelector(itemSelectById(id))
    const dispatch = useDispatch()
    const changeData = (e) => {
        dispatch(updateItem({id:id,changes:{name:e.target.value}}))
    }
    const changeNumber = (e) => {
        dispatch(updateItem({id:id,changes:{havingNumber:e.target.value}}))
    }

    return (<>
    <OnlyTextField  value={items}  onChangeName={changeData} onChangeNumber={changeNumber} ><Button onClick={()=>deleteItemFunc(id)}>削除</Button></OnlyTextField>
    </>)
}

const OnlyTextField = ({value,onChangeName,onChangeNumber,children}) =>{
    const multilineCss = "h-12 mb-20 sm:w-full sm:mx-20"
    return (
        <div className={`sm:w-2/5 flex my-2 justify-center m-4 w-full`}>
        <TextField fullWidth  label="持ち物" value={value.name}  onChange={onChangeName}></TextField><TextField type="number" value={value.havingNumber} label="所持数" onChange={onChangeNumber}></TextField>{children}
        </div>
    )
}

export default Description