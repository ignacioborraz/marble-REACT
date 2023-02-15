import React from 'react'

export default function ReqInputStock({ stock,showEdit }) {
    console.log(showEdit)
    return (
        showEdit ? (
            <input className="ts-data ts-stock" type="number" name="stock" id="stock" min="1" defaultValue={stock} />
        ) : (
            <p className='ts-data ts-stock'>{stock}</p>
        )
    )
}
