import { Input, TextField } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import { descriptionSelectById, updateDescription } from "../../reducer/description"
import { characterSelectById, updateCharacter } from "../../reducer/old-coc"


const Description = ({ids,characterId}:{ids:string[],characterId:string}) => {
    const dispatch = useDispatch()
    const characterSheet = useSelector(characterSelectById(characterId))
    const changeName = (e) => {
        dispatch(updateCharacter({id:characterId,changes:{name:e.target.value}}))
    }
    return (<>
        <div className="flex flex-wrap mt-12 justify-center">
            <OnlyTextField onChange={changeName} multiline={false} label="名前" value={characterSheet.name} />
    {ids.map(id=>
        <DescriptionTextField id={id} />
        )}
        </div>
    </>)
}

const DescriptionTextField = ({id}:{id:string}) => {
    const descriptionData = useSelector(descriptionSelectById(id))
    const dispatch = useDispatch()
    const changeData = (e) => {
        dispatch(updateDescription({id:id,changes:{text:e.target.value}}))
    }
    return (<>
    <OnlyTextField multiline={descriptionData.multiline} label={descriptionData.name}  value={descriptionData.text} onChange={changeData} />
    </>)
}

const OnlyTextField = ({label,value,onChange,multiline}) =>{
    const multilineCss = "h-12 mb-20 sm:w-full sm:mx-20"
    return (
        <div className={`sm:w-2/5 flex my-10 justify-center m-4 w-full ${multiline && multilineCss}`}>
        <TextField rows={`${multiline ? 4: 1}`} fullWidth  label={label} value={value} multiline={multiline} onChange={onChange}></TextField>
        </div>
    )
}

export default Description