import { useEffect, useState } from 'react'

import { Link as LinkRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import sinkActions from '../redux/actions/sinkActions'

export default function StockNoteJohnson() {

    const dispatch = useDispatch()
    const [inputSearch, setInputSearch] = useState("")
    const [reload, setReload] = useState(false)
    useEffect(() => {
        dispatch(sinkActions.noteSink())
        // eslint-disable-next-line
    }, [reload])

    useEffect(() => {
        dispatch(sinkActions.filterNoteSink(inputSearch))
        // eslint-disable-next-line
    }, [inputSearch,reload])

    let noteSink = useSelector(store => store.sinkReducer.noteSink)
    console.log("🚀 ~ file: StockJohnson-2-note.jsx ~ line 22 ~ StockNoteJohnson ~ noteSink", noteSink)
    
    let filterNoteSink = useSelector(store => store.sinkReducer.filterNoteSink)
    console.log("🚀 ~ file: StockJohnson-2-note.jsx ~ line 25 ~ StockNoteJohnson ~ filterNoteSink", filterNoteSink)
    

    
    function bau(array) {
        let mayor=0;
        for (let i = 0; i < array.length; i++) {
            if (array[i]>0 && array[i]<10) {
                if (array[i] > mayor){
                    mayor=array[i]
                }
            }
        }
        return console.log(mayor)
        
    }
    const a =[1, 0 , 9, 8, 100]
    bau(a)

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
            {filterNoteSink.length > 0 ?
                <div className='containerCardsMarca mt10'>

                    {filterNoteSink?.map(sink => (
                        <div className='linkColors cardStock' key={sink._id}>
                            <div className='companyCardStock'>
                                <h2 className='nameCards'>Código: {sink.note}</h2>
                                <h3 className='nameCards'>{sink.jhonson?.code}</h3>
                                <img src={sink.jhonson?.photo} alt={sink._id} className='fitStock' id={sink._id} />
                                <h3 className='nameCards'> {sink.jhonson?.x} × {sink.jhonson?.y} × {sink.jhonson?.z}</h3>

                            </div>

                        </div>
                    ))
                    }
                </div>

                : <div className='noResult'>
                    <h1>no hay resultados</h1>
                </div>


            }
        </div>
    )

}