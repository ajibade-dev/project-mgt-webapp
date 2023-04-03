//styles
import { Link } from 'react-router-dom'
import './ProjectList.css'

import React from 'react'
import Avatar from './Avatar'

export default function ProjectList({ projects }) {
  return (
    
    <div className='project-list'>
      {projects.length === 0 && <p>No Projects yet!</p>}
      {projects.map(project => (
        <Link to={`/projects/${project.id}`} key={project.id}>
          <h3>{project.name}</h3>
          <p>Due by {project.dueDate.toDate().toDateString()}</p>  
          <div className='assigned-to'>
            <ul>
            {project.assignedUsersList.map(user => (
                <li key={user.photoURL}>
                    <Avatar src={user.photoURL} />
                </li>
            ))}
            </ul>
          </div>
        </Link>
      ))}  
    </div>
  )
}
