import { useReducer, useEffect, useState } from "react";
import { db, collection, timestamp, deleteDoc, addDoc, doc, updateDoc} from "../firebase/config";   


let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
}

const firestoreReducer = (state, action) => {
    switch (action.type){
        case 'IS_PENDING':
            return{ isPending: true, document: null, success: false, error:null} 
        case 'ADDED_DOCUMENT':
            return { isPending:false, document: action.payload, success: true, error: null }
        case "DELETED_DOCUMENT":
            return {isPending: false, document: null, success: true, error: null }   
        case "UPDATED_DOCUMENT":
          return { isPending: false, document: action.payload, success: true, error: null}     
        case 'ERROR':
            return{isPending:false, document: null, success: false, error: action.payload}
          
        default:
            return state
    }
}

export const useFirestore = (collections) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState)  

  const [isCancelled, setIsCancelled] = useState(false)

  //colection ref
    const ref = collection(db, collections)
  
  //only dispatch if not cancelled

    const dispatchIfNotCancelled = (action) => {
        if(!isCancelled) {
         dispatch(action)
        }
    }
    

  //add new document
    const addDocument = async  (doc) => {
        dispatch({ type: 'IS_PENDING' })

        try{
          const createdAt = timestamp.now()
          // const createdAt = timestamp.now()
          const addedDocument = await addDoc(ref, {...doc, createdAt})
          dispatchIfNotCancelled({type: 'ADDED_DOCUMENT', payload: addedDocument })
        }
        catch (err) {
          dispatchIfNotCancelled({type: 'ERROR', payload: err.message})  
        }
    } 

  //delete document
  const deleteDocument = async (id) => {
    dispatch({ type: 'IS_PENDING' })

    try {
        await deleteDoc(doc(ref, id))
      dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT'})
    }
    catch(err){
      dispatchIfNotCancelled({ type: 'ERROR', payload: "could not delete"})
    }
  }

  //update a document
    const updateDocument  = async (id, updates) => {
      dispatch({type: 'IS_PENDING'})

      try{
        collection(db, collections)
         const updatingDocument = doc(db, `${collections}/${id}` )
         const updatedDocument = await updateDoc(updatingDocument, updates)
         dispatchIfNotCancelled({ type: 'UPADTED_DOCUMENT', payload: updatedDocument })
         return updatedDocument
      }
      catch (err) {
        dispatchIfNotCancelled({ type: 'ERROR', payload: err.message})
        return null
      }
    }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { addDocument, deleteDocument, updateDocument, response }
}