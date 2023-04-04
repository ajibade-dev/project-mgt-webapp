import React from 'react'
import { useState } from 'react'
import './Dashboard.css'

const filterList = ["all", "mine", "development", "design", "marketing", "sales"]

export default function ProjectFilter() {
    const [currentFilter, setCurrentFilter] = useState("all")

    const handleClick = (newFilter) => {
        console.log(newFilter)
        setCurrentFilter(newFilter)
    }

  return (
    <div className='project-filter'>
       <nav className='nav'>
        <p>Filter By:</p>
        {filterList.map(filter => (
            <button key={filter}
             onClick={() => handleClick(filter)}
             className={currentFilter === filter ? 'active' : ''}
            >
                {filter}
            </button>
        ))}
       </nav> 
    </div>
  )
}
