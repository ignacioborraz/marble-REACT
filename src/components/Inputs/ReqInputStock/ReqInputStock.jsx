import React from 'react'
import './reqInputStock.css'

export default function ReqInputStock({
    showEdit,
    stock,
    ksinkStock,
    currentStock,
    setCurrentStock,
}) {

    return (
        showEdit ? (
            <input
                className="istock-data fs w-40"
                type="number"
                name="stock"
                id="stock"
                min="1"
                max={stock+ksinkStock}
                defaultValue={currentStock || stock}
                onChange={(event) => setCurrentStock(event.target.value)}
            />
        ) : (
            <p className='istock-data fs w-40'>{stock}</p>
        )
    )

}