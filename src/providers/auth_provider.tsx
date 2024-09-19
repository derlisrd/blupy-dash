import { createContext,useCallback,useEffect } from "react";
import { APICALLER } from "../services/api";
import userDataHook from "../store/user_data_store";
import { env } from "../config/env";


const AuthContext = createContext({})

interface Props {
    children: React.ReactNode
}

function AuthProvider({children}:Props) {
    const {dataUser,logOutUserData,isAuth} = userDataHook()



    const authcheck = useCallback(async()=>{   
        const local = sessionStorage.getItem(env.APP_KEY_USER)
        if (dataUser.id && local && isAuth) {
              const res = await APICALLER.check(dataUser.token);
              if (!res.success ){
                  console.log(res)
                  logOutUserData(false)
              }
        }    
    },[dataUser,logOutUserData,isAuth])

    useEffect(() => {
        const interval = setInterval(() => {
            authcheck();
          }, 1000*60*30);
        return () => {
            clearInterval(interval);
        }
      }, [authcheck]);


    const values = {}

    return ( <AuthContext.Provider value={values}>{children}</AuthContext.Provider> );
}

export default AuthProvider;