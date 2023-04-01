//styles

import './Signup.css'

import React, { useState } from 'react'
 import { useSignup } from '../../hooks/useSignup'


 
export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [thumbnail, setThumbNail] = useState(null)
  const [thumbnailError, setThumbNailError] = useState(null)
  const {signup, isPending, error} = useSignup()


  const handleSubmit = (e) => {
    e.preventDefault()
    signup(email, password, displayName, thumbnail);
  }

  const handleFileChange = (e) => {
    e.preventDefault()
    setThumbNail(null)
    let selected = e.target.files[0]
    console.log(selected)

    if(!selected){
      setThumbNailError('Please select an image file')
      return
    }
    if(!selected.type.includes('image')){
        setThumbNailError('Selected file must be an image')
        return
    }
    if(selected.size > 100000){
      setThumbNailError('Image file size must be less than 100kb')
      return
    }

    setThumbNailError(null);
    setThumbNail(selected)
    console.log('thumbnail updated')
  }

  return (
    <form className='auth-form' onSubmit={handleSubmit}>
      <h2>Sign Up</h2>  

      <label>
        <span>Email:</span>
        <input
        required
        type='email'
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        />
      </label>    

      <label>
        <span>Password:</span>
        <input
        required
        type='password'
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        />
      </label> 

      <label>
        <span>Display Name:</span>
        <input
        required
        type='text'
        onChange={(e) => setDisplayName(e.target.value)}
        value={displayName}
        />
      </label> 

      <label>
        <span>Profile Thumbnail</span>
        <input
        required
        type='file'
        onChange={handleFileChange}
        />
        {thumbnailError && <div className='error'>{thumbnailError}</div>}
      </label>    

      {!isPending &&<button className='btn'>Sign Up</button>}
      {isPending &&<button className='btn' disabled>Loading</button>}
      {error && <div className='error'>{error}</div>}
    </form>
  )
}
