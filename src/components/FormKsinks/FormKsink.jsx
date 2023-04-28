import React from 'react'

export default function FormKsink({ setType,quantity,selectJhonson,jhonsons }) {
  return (
    <form className='jhonson-jhonson'>
        <select className="jhonson-size" defaultValue="" name="type" onChange={event=> setType(event.target.value)}>
            <option disabled value="">seleccionar acero</option>
            <option value="A304">A304</option>
            <option value="A430">A430</option>
        </select>
        <div className='jhonson-size'>
            <input className="jhonson-span jhonson-size-1" type="number" ref={quantity} name="stock" id="stock" min="1" defaultValue='1' />
            <select className="jhonson-size-2" defaultValue="" name="code" onChange={selectJhonson}>
                <option disabled value="">seleccionar pileta</option>
                {jhonsons?.map((each,index) => <option key={index} value={each._id}>{each.name} - {each.x}×{each.y}×{each.z}</option>)}
            </select>
        </div>
    </form>
  )
}
