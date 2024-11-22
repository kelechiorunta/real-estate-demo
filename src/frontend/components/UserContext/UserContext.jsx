import React, { createContext, useEffect, useState } from 'react'

export const dataContext = createContext(null);

export default function UserContext({children}) {
    const [user, setUser] = useState(null);
    useEffect(() => {
        if (!localStorage.getItem('UserData') || !user) {
            setUser(JSON.parse(localStorage.getItem('UserData')));
        }
        
    },[user, localStorage.getItem('UserData')])
  return (
    <dataContext.Provider value={user}>
        {children}
    </dataContext.Provider>
  )
}

