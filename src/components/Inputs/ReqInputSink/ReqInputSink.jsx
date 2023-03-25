import InputCheck from '../../InputCheck/InputCheck2'
import { useRef } from 'react'
import './reqInputSink.css'

export default function ReqInputSink({
    showEdit,
    instalation,
    name,
    photo,
    ksinkInstalation,
    currentInstalation,
    setCurrentInstalation
}) {

    const checks_instalation = useRef()

    function handleChange() {
        //console.log(checks_instalation)
        let selected_instalation = Object.values(checks_instalation?.current).filter(each=> each.checked).map(each => each.value)
        //console.log(selected_instalation)
        setCurrentInstalation(selected_instalation) 
    }

    return (
        <>
            <img className='input-sink-data is-img w-40' src={photo} alt="jphoto" />
            <p className='input-sink-data fs w-80'>{name}</p>
            <span className='input-sink-data is-inst w-80'>
                {showEdit ? (
                    <form ref={checks_instalation} onChange={handleChange} className='is-span_checks'>
                        {ksinkInstalation?.map(each => <InputCheck key={each} each={each} currentInstalation={currentInstalation}/>)}
                    </form>
                ) : (
                    instalation.map(each => <label key={each} className='is-span_checks fs is-label'>{each}</label>)
                )}
            </span>
        </>
    )

}