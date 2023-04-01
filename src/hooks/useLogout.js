import { useEffect, useState } from "react"
import { auth, signOut, db, collection, doc, updateDoc } from "../firebase/config"
import { useAuthContext } from './useAuthContext'

 export const useLogout = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const {dispatch, user}  = useAuthContext()

    const logout = async () => {
        setError(null)
        setIsPending(true)

        //signing users out
        try {
            //updating the online status.

            const { uid } = user
            collection(db, "users")
             const docIt = doc(db, "users", uid);
            await updateDoc(docIt, {online: false})

            await signOut(auth)

            //dispatch log out action
            dispatch({ type: 'LOGOUT' })

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

    return {logout, error, isPending  }
}