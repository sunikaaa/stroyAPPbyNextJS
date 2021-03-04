import Button from "@material-ui/core/Button"
import { useRouter } from "next/router"
import Link from "next/link"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { nowFormatDate, sheetTypeToJP } from "../../plugins/benri"
import { CREATE_OLDCOC } from "../../reducer/middlewareAction"
import { characterSelectors, characterSheet2, deleteCharacter } from "../../reducer/old-coc"
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButtonMenu from './iconButton'
import MenuItem from "@material-ui/core/MenuItem"
import DeleteIcon from '@material-ui/icons/Delete';

// @AType {
//
//
//
// }

export default function ChooseCharacter(){
    const characters = useSelector(characterSelectors.selectAll)
    const dispatch = useDispatch()

    const createCharacter = () => {
        dispatch(CREATE_OLDCOC)
    }
    return (<>
        <Button onClick={createCharacter}>新しいキャラを作成</Button>
    <div className="flex flex-wrap">
    {characters.map(character=>(
        <ChooseComponent key={character.id} character={character} ></ChooseComponent>
        ))}
    </div>
        </>)
}

const ChooseComponent = ({character}:{character:characterSheet2}) =>{
    const router = useRouter()
    const dispatch = useDispatch()
    const moveSheet = () => {
        const url = `/character/sheet/${character.id}/${character.type}`
        router.push(url)
    } 
    const deleteSheet = (e) => {
        e.preventDefault()
        dispatch(deleteCharacter(character.id))
    }
 
    return (<><Link href={`/character/sheet/${character.id}/${character.type}`} >
        <div className="h-25 w-full sm:h-32 sm:w-64  relative  p-1 m-3 bg-gray-500 text-gray-100 flex-none rounded-lg cursor-pointer flex flex-col justify-round items-center">

        <span className="p-2 text-sm mr-auto">{sheetTypeToJP(character.type)}</span> 
        <span className="p-2 text-xs">{character.name}</span>
        <span className="p-2 text-xs ml-auto mr-4 mt-auto">{nowFormatDate(character.updated)}</span>
        <span className="absolute right-0 bottom-0 text-black hover:bg-gray-400 w-8 h-8 z-50 rounded-full transform scale-75 flex items-center justify-center">
        <IconButtonMenu>
          <MenuItem  disableGutters onClick={(e)=>deleteSheet(e)}>
              <div className="flex text-red-600 tracking-wide hover:bg-red-300 mx-2 pr-10 ">
                <DeleteIcon classes=""/> 削除
              </div>
          </MenuItem>
        </IconButtonMenu>
        </span> 
        </div>
        </Link></>)
}


