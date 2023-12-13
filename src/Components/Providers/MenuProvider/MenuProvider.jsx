import React, { createContext, useState } from "react";

export const MenuContext = createContext(false);

const MenuProvider = ({ children }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const toggleMenu = () => setMenuVisible(!menuVisible);
  return <MenuContext.Provider value={{ menuVisible, toggleMenu }}>{children}</MenuContext.Provider>;
};

export default MenuProvider;
