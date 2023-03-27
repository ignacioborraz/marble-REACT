import React from 'react'
import './listStock.css'

export default function ListStock({
    showEdit,
    stock,
    setStock,
}) {

    return (
        showEdit ? (
            <input
                className="istock-data fs w-40"
                type="number"
                name="stock"
                id="stock"
                min="0"
                defaultValue={stock}
                onChange={(event) => setStock(event.target.value)}
            />
        ) : (
            <p className='istock-data fs w-40'>{stock}</p>
        )
    )

}