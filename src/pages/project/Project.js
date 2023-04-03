//styles
import './Project.css'

import { UseDocument } from '../../hooks/UseDocument'
import { useParams } from 'react-router-dom'
import React from 'react'
import ProjectSummary from './ProjectSummary'

export default function Project() {

  const { id } = useParams()
  const {error, document} = UseDocument('projects', id)

  if (error){
    return <div className='error'>{error}</div>
  }
  if(!document){
    return <div className='loading'>Loading...</div>
  }

  return (
    <div className='project-details'>
      <ProjectSummary project={document} />
    </div>
  )
}
