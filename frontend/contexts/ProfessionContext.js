import React, { createContext, useReducer } from 'react';
import { ProfessionReducer, sumItems } from './ProfessionReducer';

export const ProfessionContext = createContext();

const initialState = { remoteProfessions:[],professionItems: [], ...sumItems([]) };

const ProfessionContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(ProfessionReducer, initialState)

    const addItem = payload => {
        dispatch({type: 'ADD_ITEM', payload})
    }
    
    const loadRemoteProfessions = payload => {
        dispatch({type: 'LOAD_REMOTE_PROFESSIONS', payload})
    }

    const contextValues = {
        addItem,
        loadRemoteProfessions,
        ...state
    } 

    return ( 
        <ProfessionContext.Provider value={contextValues} >
            { children }
        </ProfessionContext.Provider>
     );
}
 
export default ProfessionContextProvider;