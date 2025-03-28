import React, { createContext,useState } from 'react';
const ShopContext = createContext();
const ShopProvider = ({ children }) => {
    const [user,setUser] = useState({
        userName:'',
        token:""
    });
    const [prediction,setPrediction]=useState(null);
    const [title,setTitle]=useState(null);
    return (
        <ShopContext.Provider value={{
            user,
            setUser,
            prediction,
            setPrediction,
            title,
            setTitle
        }}>
            {children}
        </ShopContext.Provider>
    );
};
export { ShopProvider, ShopContext };