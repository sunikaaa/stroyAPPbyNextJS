import _ from 'lodash';
import React, {  } from 'react'
import { useSelector } from 'react-redux';
import { characterSheet2 } from '../../reducer/old-coc';
import { sumPoint } from '../../reducer/skill';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { statusGetters, statusSelectByName } from '../../reducer/status';

type displayPointProps = {
    pointName:string
    maxName:string
    skillId:string[]
    statusId:string[]
    pointDisplayName:string
    magnification:number
}

export default function SimpleCard({character}:{character:characterSheet2}) {
    const {skillId,statusId} = character
    const pointProps = {
        skillId:skillId,
        statusId:statusId[0],
    }
    const jobPoint:displayPointProps = {
        ...pointProps,
        pointName:'job',
        maxName:'EDU',
        pointDisplayName:'職業',
        magnification:20
    }
    const hobbyPoint:displayPointProps = {
        ...pointProps,
        pointName:'hobby',
        maxName:'INT',
        pointDisplayName:'趣味',
        magnification:10
    }

  return (
    <Card className="fixed bottom-0 left-0 bg-gray-800 rounded-md" >
      <CardContent className="flex">
          <DisplayPoint {...jobPoint} />
          <DisplayPoint {...hobbyPoint} />
      </CardContent>
    </Card>
  );
}

const DisplayPoint = React.memo(({pointName,maxName,skillId,statusId,pointDisplayName,magnification}:displayPointProps)=>{
    const pointSum = useSelector(sumPoint(pointName,skillId))    // const hobbyPoint:string = useSelector(sumPoint(character.skillId))
    const status = useSelector(statusSelectByName(maxName,statusId))
    const pointMax = statusGetters.sum(status) * magnification
    const Error = (pointMax - pointSum) < 0
    return (          <div className="w-40 h-10 mx-2 bg-red-50 flex justify-between   rounded-md border-gray-500 text-center leading-10  text-xl">
    <span className="text-xs leading-1 pw-1 align-top "  >{pointDisplayName}</span>
    <div>
    <span className={` ${Error ? "text-red-600" : ""}`}  >{pointSum}</span>
    <span className=" p-2"  >/</span>
    <span className=""  >{pointMax}</span>
    </div>
    <div className=""> </div> 
    </div>)
})