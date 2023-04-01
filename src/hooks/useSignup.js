import { useState, useEffect } from "react"
import { auth, createUserWithEmailAndPassword, updateProfile,projectStorage, ref, uploadBytes, getDownloadURL, db,collection, doc, setDoc } from "../firebase/config"
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const signup = async (email, password, displayName, thumbnail) => {
        setError(null)
        setIsPending(true)
        
        try {
            //signing up user
           const response =  await createUserWithEmailAndPassword(auth, email, password)
           

           if(!response){ 
            throw new Error('could not complete signup')
           }

           //upload user thumbnail
           const uploadPath = `thumbnails/${response.user.uid}/${thumbnail.name}`
           const img =  ref(projectStorage, uploadPath);
            await uploadBytes(img, thumbnail)
           const imageUrl = await getDownloadURL(img)

           //add display name to user
           const user = response.user
           await updateProfile(user, { displayName, photoURL: imageUrl })

           //create a user document
            collection(db, 'users');
            const docIt =  doc(db, `users/${response.user.uid}`)
            await setDoc(docIt, {online: true, displayName, photoURL: imageUrl})
           

           //dispatch login action
           dispatch({type: 'LOGIN', payload: user})

           //updating state
           if (!isCancelled){
            setIsPending(false)
            setError(null)
           }
           
        }
             catch (err) {
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

    return {error, isPending, signup}
}