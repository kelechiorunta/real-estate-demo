import React, { createContext, useEffect, useState } from 'react'

export const dataContext = createContext(null);

export default function UserContext({children}) {
    const [user, setUser] = useState(null);
    useEffect(() => {
        if (!user) {
            setUser(JSON.parse(localStorage.getItem('UserData')));
        }
        
    },[user, localStorage.getItem('UserData')])
    const Userdata = {user, setUser}
  return (
    <dataContext.Provider value={Userdata}>
        {children}
    </dataContext.Provider>
  )
}

