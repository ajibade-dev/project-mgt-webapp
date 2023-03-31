import { useState, useEffect, useRef } from "react"
import { db, collection, onSnapshot, query, where, orderBy } from "../firebase/config"

export const useCollection = (collections, _query, _orderBy) => {
    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);

    //if we dont use a ref, an infinite loop happens
    //_query is an array and is different on every function call
    const queryt = useRef(_query).current
    const orderByt = useRef(_orderBy).current

    useEffect(() => {
        let ref = collection(db, collections)
        if(queryt){
            ref = query( ref, where(...queryt))
        }
        if(orderByt){
            ref = query( ref, orderBy(...orderByt))
        }

        const unsub = onSnapshot(ref, (snapshot) => {
            let results = [];
            snapshot.docs.forEach(doc => {
                results.push({...doc.data(), id: doc.id})
            })
            //update state
            setDocuments(results)
            setError(null)
        }, (error) => {
            console.log(error)
            setError('could not fetch the data')
        })
        //unsubscribing the document
        return  () => unsub()

    }, [collections, queryt, orderByt]);
    return { documents, error }
};