import React,{ReactChildren, useReducer} from 'react'

export const initialState = {

}

export function reducer(state,action) {
    switch(action.type){
        default :
        return state
    }
}
export const SiteContext = React.createContext(initialState);

export const SiteProvider = ({children})=> {
    const [state,dispatch] = useReducer(reducer,initialState)
    return (<SiteContext.Provider value={{state,dispatch}}>
    {children}
    </SiteContext.Provider>)
}