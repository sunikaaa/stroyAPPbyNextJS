import Button from "@material-ui/core/Button"
import { useRouter } from "next/router"
import Link from "next/link"
import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { sheetTypeToJP } from "../../plugins/benri"
import { store } from "../../reducer"
import { CREATE_OLDCOC } from "../../reducer/middlewareAction"
import { characterSelectors, characterSheet2 } from "../../reducer/old-coc"


export default function ChooseCharacter(){
    const characters = useSelector(characterSelectors.selectAll)
    console.log(characters)
    useEffect(()=>{
        store.dispatch(CREATE_OLDCOC)
    },[])
    const createCharacter = () => {
        store.dispatch(CREATE_OLDCOC)
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
    const moveSheet = () => {
        const url = `/character/sheet/${character.id}/${character.type}`
        router.push(url)
    }
    const deleteSheet = () => {

    }
    return (<><Link href={`/character/sheet/${character.id}/${character.type}`} >
        <div className="h-25 w-full sm:h-32 sm:w-64  relative  p-1 m-3 bg-gray-500 text-gray-100 flex-none rounded-lg cursor-pointer flex flex-col justify-round items-center">

        <span className="p-2 text-sm mr-auto">{character.name}</span> 
        <span className="p-2 text-xs">{sheetTypeToJP(character.type)}</span>
        <span className="p-2 text-xs ml-auto mr-4 mt-auto">{character.updated}</span>
        <span className="absolute right-1 bottom-0 text-red-600 w-6 h-6 rounded-full bg-gray-300 z-50" onClick={deleteSheet}>
            <span className="absolute left-1/2 top-1/2 transform -translate-y-2/4 -translate-x-2/4 text-lg align-middle" >×</span>
        </span> 
        </div>
        </Link></>)
}


