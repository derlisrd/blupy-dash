

import {create} from 'zustand'



type states = {
    modals: modalType,
    setModals: (key: string, value: boolean) => void;
}


export const useSolicitudStore = create<states>((set) => ({
    modals: {sms:false,email:false,noti:false,ficha:false,filtros:false,wa:false},
    setModals : (key : string, value : boolean) => set((state) => ({
        modals: {
            ...state.modals,
            [key] : value
        }
    }))
})) 
export type modalType = { 
    sms: boolean
    email: boolean
    noti: boolean
    ficha: boolean
    filtros: boolean
    wa: boolean
}


