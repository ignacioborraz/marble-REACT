import React from 'react'
import InputCheck from '../../InputCheck/InputCheck2'

export default function ReqPhotoSink({ name,photo,newPhoto,showEdit,onChange,sinks,instalation,checks_j,inst_j,ksink_instalation }) {
    return (
        showEdit ? (
            <>
                <img className='ts-data ts-img' src={newPhoto} alt="jphoto" />
                <select className="ts-data ts-code" defaultValue="" name="type" onChange={onChange}>
                        <option disabled value="">seleccionar pileta</option>
                        {sinks?.map((each,index) => <option key={index} value={each._id}>{each.name} - {each.x}×{each.y}×{each.z}</option>)}
                </select>
                <span ref={checks_j} className='ts-data ts-inst'>
                    {inst_j?.map(each => <InputCheck key={each} each={each} selected={ksink_instalation} />)}
                </span>
            </>
        ) : (
            <>
                <img className='ts-data ts-img' src={photo} alt="jphoto" />
                <p className='ts-data ts-code'>{name}</p>
                <span className='ts-data ts-inst'>{instalation}</span>
            </>
        )
    )
}