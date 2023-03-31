import { useEffect, useState } from "react"
import { auth, signInWithEmailAndPassword } from "../firebase/config"
import { useAuthContext } from './useAuthContext'

 export const useLogin = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const {dispatch}  = useAuthContext()

    const login = async (email, password) => {
        setError(null)
        setIsPending(true)

        //signing users in
        try {
           const response =  await signInWithEmailAndPassword(auth, email, password)

            //dispatch log out action
            const user = response.user
            dispatch({ type: 'LOGIN', payload: user })

            //updating state
        if(!isCancelled){
            setIsPending(false)
            setError(null)
            }      
        }
        catch(err){
        if(!isCancelled){
         console.log(err.message)
         setError(err.message)
         setIsPending(false)   
            }
        }
    }
    useEffect( () => {
        return () => setIsCancelled(true)
    }, [])

    return {login, error, isPending  }
}