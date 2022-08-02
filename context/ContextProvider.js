import Cookies from 'js-cookie';
import { createContext, useContext, useState } from 'react';

const StateContext = createContext();
export const ContextProvider = ({ children }) => {
  const [openList, setopenList] = useState(false);
  const [openSearch, setopenSearch] = useState(false);
  const [searchName, setsearchName] = useState('');
  const [searchValueText, setsearchValueText] = useState('');
  const [catagroyList, setcatagroyList] = useState('');
  // const [cartItems, setcartItems] = useState();
  return (
    <StateContext.Provider
      value={{
        openList,
        setopenList,
        searchName,
        setsearchName,
        openSearch,
        setopenSearch,
        searchValueText,
        setsearchValueText,
        catagroyList,
        setcatagroyList,
        // cartItems,
        // setcartItems,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
export const useStateContext = () => useContext(StateContext);
