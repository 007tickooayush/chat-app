import React,{memo} from 'react'
import { useCurrentRoom } from '../../../context/current-room.context';

const Top = () => {
  const name = useCurrentRoom(v => v.name)

  return (
    <div>{name}</div>
  )
}
// using memo to only render name
export default memo(Top);