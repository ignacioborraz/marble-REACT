import { useEffect,useState,useRef } from 'react'
import { useParams,Link as LinkRouter } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'

import './johnson-3-accesory.css'

import Button from '../../components/Button/Button'
import AccesoryCheck from '../../components/AccesoryCheck/AccesoryCheck'
import j_accesoryActions from '../../store/jhonson-2-acc/actions'
const { read_accesories } = j_accesoryActions

export default function JAccesory() {

    const { token } = useSelector(store => store.auth)
    const { accesories,codes } = useSelector(store => store.accesories)
    const [reload, setReload] = useState(false)
    const code_acc = useRef()
    const dispatch = useDispatch() 
    //console.log(codes)
    
    useEffect(() => {
        let code = code_acc.current?.value || ""
        dispatch(read_accesories({ code,token }))       
        // eslint-disable-next-line
    }, [reload,codes])

    let next = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAABMCAYAAADHl1ErAAAAAXNSR0IArs4c6QAAA15JREFUeF7t3M2rT0Ecx/H3/RNY2CkbCzb+ApFudtZEeYiU5BZCiVhQnooieSx3o5QkNixsJBsLysJCKQsl5fn5WZ+aqV+6/M75nTlzvjNnZj2dO+f1+3bO98z3O3eMMmoJjNWaXSZTwGoGQQErYDUFak4vEdYR2ExgPTAXOAvcqLmOZKaHiLDZwB1gxsBdXwHWAm+Skai40BBgN4HFU/y958Ca3KItBNjvIT/OaWAL8Knij2h6WgwwATwBlgH3TGtUWFwsMC3lJ3AQ2At8r7A2k1NignmAh8BS4JFJkSGL6gJMS/oK7ASOAsOegaZcuwLzCLeB5cAzUyr/WUzXYFraO2ACmEwBzQKYd7ru8raXluEsgcnpBbDKcrJrDcwH1zlgM/DBWrRZBZPTU/dCuGsJzTKYnH4Bh4HdVpJd62CDye4KQElvpyMVMCF9c5F2xEVeJ3ApgXkgPdOU7OoZF32kCCak9+4tej62WKpgg8nuOpe/RbFLHUxI+jLQzq6+FFofOYB5pAvApraT3ZzAfLK7EtAuSCsjNzCf7GqfTfttSkWCjhzBPJB2dLWzGzTZzRlMcKod7AEOuZpC42jLHcwDqVqlqpWqV41GX8CE9NHVR880EesTmHdS34c2KbVZWXv0EUxIr4DVoyS7fQUTmgrLC10jTeVI6zOYkNR1NL+yFgTpcU2qEPsXzmtgegGrLqBPqAXVp/c7whRdi4AHBWy4wMi7tn176DeuC/QJTB/hjStPfQBTbVOVpl0hapu5gwWvnucM1kp/Ro5grXYA5QbWeo9ZLmDRuhhzAIvaJ5sy2BdXGToWsxM7VbD7LgmN3uufGpg2/Q640yQ/hn8yhp+REpiJ80qpgJ0Ctlo4EWcdzNyZS8tgJk/1WgTTseeNwMXwj+zmV7QGdssVWc0e1rIC9hnYARxvHgPtXsECmJJQtSU9bvdWw1y9SzAlnvuBfUAnSegohF2BKZoUVYqupEZsMFXJTwDbAX08JzdigunNpzYjvQmTHbHAlFNtcMeVk8XSwkOAqddq2j8U3gI6qXE5aaWBxYcAuwYsmQJEnX46oaHvwWxGCLBZwFVgnlPR/9jZBpzMRilwhPnLjQNzgEuj9o+mABwiwlK4z2BrLGA1KQtYAaspUHN6ibCaYH8A1XjKTT6w2zUAAAAASUVORK5CYII="

    return (
        <div className='acc-container' >
            <h2>ACCESORIOS</h2>
            <input ref={code_acc} onChange={()=>setReload(!reload)} className='acc-input' type="text" placeholder='Buscar por codigo' />
            <LinkRouter to={`/jhonson-form`} className='acc-button'><Button icon={next} /></LinkRouter>
        {(accesories && accesories.length > 0) ?
            <div className='acc-box'>
                {accesories?.map(type => <AccesoryCheck key={type._id} data={type} />)}
            </div>
            : <h2 className='acc-h'>no hay resultados</h2>
        }
    </div>
    )

}