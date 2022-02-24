import React, { createContext, useState,useEffect } from 'react';
import { database } from '../misc/firebase';
import { transformToArrWithId } from '../misc/helpers';

const RoomsContext = createContext();

export const RoomsProvider = ({ children }) => {
  const [rooms, setRooms] = useState(null);

  useEffect(()=>{
    const roomListRef = database.ref('rooms');
    roomListRef.on('value',(snap) =>{
        const data = transformToArrWithId(snap.val()); 
        // log snapshot data
        // console.log('snap data', data);
        setRooms(data);
    })

    return () => {
        roomListRef.off();
    }
  },[])
  return (
    <RoomsContext.Provider value={rooms}>{children}</RoomsContext.Provider>
  );
};
