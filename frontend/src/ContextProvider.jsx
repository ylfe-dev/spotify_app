import { createContext } from 'react';
import {useEffect, useState, useRef, Suspense} from 'react'


export const ThemeContext = createContext(null);
export const AuthContext = createContext(null);

const ContextProvider = ({children})=> {
	const [theme, setTheme] = useState(null);
	const [user, setUser] = useState(null);

	return (
    <ThemeContext.Provider value={{ theme: theme, setTheme: setTheme }}>
      <AuthContext.Provider value={{ user: user, setUser: setUser }}>
        {children}
      </AuthContext.Provider>
    </ThemeContext.Provider>
  );
}
export default ContextProvider;