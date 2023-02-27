import React, { useState } from 'react'

import './inputCheck.css'

export default function InputCheck2({ each,currentInstalation }) {

    const [check, setCheck] = useState(currentInstalation?.includes(each))

    return (
        <>
            <input
                className='inputCheck-input2'
                type="checkbox"
                name='inst'
                id={each}
                defaultChecked={check}
                value={each}
                onChange={(event) => setCheck(event.target.checked)} />
            <label
                className={`inputCheck-label2 il-${check}`}
                htmlFor={each}>
                {each}
            </label>
        </>
    )

}