import { useEffect, useState } from 'react'
import { db, collection, doc, onSnapshot } from '../firebase/config'


export  function UseDocument(collections, id) {

    const [document, setDocument] = useState(null)
    const [error, setError] = useState(null)


    // trying to get a real time data for the document
    useEffect(() => {
     collection(db, collections)
     const docIt =   doc(db, `${collections}/${id}`)
       const unsubscribe =  onSnapshot(docIt, (snapshot) => {
          if(snapshot.data()){
            setDocument({...snapshot.data(), id: snapshot.id}) 
          setError(null)
          }
          else{
            setError("No document with that id exists")
          }
           
       }, (err) => {
            console.log(err.message)
            setError("Failed to get document")
       })

       return () => unsubscribe()

    }, [collections, id])

  return { document, error}
  
}
