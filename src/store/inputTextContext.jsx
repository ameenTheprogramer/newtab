import { useState, createContext } from "react";

export const inputTextContext = createContext('')

export default function Context({children}){
    const [inputText, SetInputText] = useState('')
  

    return(
        <inputTextContext.Provider value={{ inputText ,SetInputText}}>
             {children}
        </inputTextContext.Provider>
    )
}