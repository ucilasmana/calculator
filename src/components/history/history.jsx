import React from 'react'
import './history.css'

const history = ({history}) => {

  return (
    <div className='history'>
      <h1>History</h1>
      <div className='lists'>
      {history.map((value, index) => {
        return <h4 key={index}>{value}</h4>
   })}
      </div>
      </div>
  )
}

export default history