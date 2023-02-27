import InputCheck from '../../InputCheck/InputCheck2'
import { useRef } from 'react';

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
            <img className='ts-data ts-img' src={photo} alt="jphoto" />
            <p className='ts-data ts-code'>{name}</p>
            <span className='ts-data ts-inst'>
                {showEdit ? (
                    <form ref={checks_instalation} onChange={handleChange} className='span_checks'>
                        {ksinkInstalation?.map(each => <InputCheck key={each} each={each} currentInstalation={currentInstalation}/>)}
                    </form>
                ) : (
                    instalation.map(each => <label key={each} className='onlyLabel'>{each}</label>)
                )}
            </span>
        </>
    )

}