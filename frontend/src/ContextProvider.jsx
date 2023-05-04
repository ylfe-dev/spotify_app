import { useState, useMemo } from 'react'
import { createContext } from 'react';


export const ThemeContext = createContext(null);
export const AuthContext = createContext(null);


export const AuthProvider = ({children})=> {
	const [user, setUser] = useState(null);
  console.log("auth context rerender")
	return (
    <AuthContext.Provider value={{ user: user, setUser: setUser }}>
      {children}
    </AuthContext.Provider>
  );
}



export const ThemeProvider = ({children})=> {
  const [theme, setTheme] = useState(null);
  console.log("theme context rerender")
  return (
    <ThemeContext.Provider value={{ theme: theme, setTheme: setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

