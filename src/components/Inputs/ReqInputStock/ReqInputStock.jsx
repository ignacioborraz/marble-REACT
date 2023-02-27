import React from 'react'

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
                className="ts-data ts-stock"
                type="number"
                name="stock"
                id="stock"
                min="1"
                max={stock+ksinkStock}
                defaultValue={currentStock || stock}
                onChange={(event) => setCurrentStock(event.target.value)}
            />
        ) : (
            <p className='ts-data ts-stock'>{stock}</p>
        )
    )

}