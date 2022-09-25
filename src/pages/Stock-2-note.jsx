import { useEffect, useState } from 'react'

import { Link as LinkRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import plateActions from '../redux/actions/plateActions'

export default function StockNotePlates() {

    const dispatch = useDispatch()
    const [inputSearch, setInputSearch] = useState("")
    useEffect(() => {
        dispatch(plateActions.notePlate())
        // eslint-disable-next-line
    }, [])
    useEffect(() => {
        dispatch(plateActions.filterNotePlates(inputSearch))
        // eslint-disable-next-line
    }, [inputSearch])
   
    let notePlate = useSelector(store => store.plateReducer.notePlate)
    console.log("🚀 ~ file: Stock-0.jsx ~ line 21 ~ Stock ~ notePlates", notePlate)

    let filterPlates = useSelector(store => store.plateReducer.filterNotePlates)
    console.log("🚀 ~ file: Stock-0.jsx ~ line 22 ~ Stock ~ filterCard", filterPlates)
   
    function SortArray(x, y) {
        if (x.color.name < y.color.name) { return -1; }
        if (x.name > y.name) { return 1; }
        return 0;
    }
    var filterOrd = filterPlates.sort(SortArray);
    return (
        <div className='containerStock'>
             <div className='containerNameStock vendidas'>
                <div className='mask4'>
                <h1 className='titleStock'>Vendidas</h1>
                </div>
                
                 
            </div>
            <div className='containerInput'>
        
                <input className='input inputStock' type="text" placeholder='Buscar por color, cod. o emp.' onChange={(e) => setInputSearch(e.target.value)} />
            
            </div>
            <div className='containerCardsMarca mt10'>

                {filterOrd?.map(everyPlate => (
                    <div className='linkColors cardStock' /* to={'/nueva/color/tipo/'+everyPlate._id} */ key={everyPlate._id}>
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
                    </div>
                ))}
            </div>
        </div>
    )

}