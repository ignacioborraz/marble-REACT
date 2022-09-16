import { useEffect, useState } from 'react'

import { Link as LinkRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import plateActions from '../redux/actions/plateActions'

export default function EditPlate() {
    const dispatch = useDispatch()
    const [inputSearch, setInputSearch] = useState("")
    useEffect(() => {
        dispatch(plateActions.internalPlate())
        // eslint-disable-next-line
    }, [])
    useEffect(() => {
        dispatch(plateActions.filterInternalPlates(inputSearch))
        // eslint-disable-next-line
    }, [inputSearch])
    let internalPlate = useSelector(store => store.plateReducer.internalPlate)
    console.log("🚀 ~ file: Stock-0.jsx ~ line 21 ~ Stock ~ internalPlates", internalPlate)

    let filterPlates = useSelector(store => store.plateReducer.filterInternalPlates)
    console.log("🚀 ~ file: Stock-0.jsx ~ line 22 ~ Stock ~ filterCard", filterPlates)

    function SortArray(x, y) {
        if (x.color.name < y.color.name) { return -1; }
        if (x.name > y.name) { return 1; }
        return 0;
    }
    var filterOrd = filterPlates.sort(SortArray);
    return (
        <div className='containerStock'>
            <div className='containerNameStock'>
            
                <h1 className='titleStock'>Disponibles</h1>
            
            </div>
            <div className='containerInput'>

                <input className='input inputStock' type="text" placeholder='Buscar por color, cod. o emp.' onChange={(e) => setInputSearch(e.target.value)} />

            </div>
            <div className='containerCardsMarca mt10'>

                {filterOrd?.map(everyPlate => (
                    //  <LinkRouter className='linkColors' to={'/nueva/color/' + everyColor.company} onClick={creatingPlate} key={everyColor._id} id={everyColor._id}></LinkRouter>
                    <LinkRouter className='linkColors cardStock'  to={'/editPlate/type/color/'+everyPlate._id}  key={everyPlate._id}>
                        <div className='companyCardStock'>
                            <h2 className='nameCards'>{everyPlate.color.name}</h2>
                            <h3 className='nameCards'>{everyPlate.company?.nameCompany}</h3>
                            {
                                everyPlate.internal ? (<h3 className='nameCards'>codInterno:{everyPlate.internal}</h3>)
                                    : <h3 className='nameCards'>codPedido: {everyPlate.note}</h3>
                            }
                            {/* <h3 className='nameCards'>{everyPlate.type.name}</h3> */}
                            <h3 className='nameCards'>{everyPlate.type.name} {everyPlate.state[0].width} × {everyPlate.state[0].height} x {everyPlate.type.thickness}</h3>
                        </div>

                        <img src={everyPlate.color.photo} alt={everyPlate._id} className='fitStock' id={everyPlate._id} />
                    </LinkRouter>
                ))}
            </div>
        </div>
    )
}