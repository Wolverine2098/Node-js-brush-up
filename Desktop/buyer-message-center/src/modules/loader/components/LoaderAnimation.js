import '../css/orbitals.css';
import React from 'react';
export default function Spinner({ color = '#7f58af', style }) {
  const circles = [...Array(12)].map((_, index) => {
    return (
      <div key={index}>
        <div className='div-after' style={{ background: color }}></div>
      </div>
    )
  })

  return (
    <div className='lds-spinner' style={{ ...style }}>
      {circles}
    </div>
  )
}
