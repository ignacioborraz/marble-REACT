import { useEffect, useState } from 'react'
import { Link as LinkRouter } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import plateActions from '../redux/actions/plateActions'


export default function StockInternalDetail() {
    const { id } = useParams()
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(plateActions.getOnePlate(id))
        // eslint-disable-next-line
    }, [id])
    let plate = useSelector(store => store.plateReducer.onePlate)

    return (
        <div className='containerStock containerDetail'>
            <div className='containerNameStock bgEtiquetaDetail'>
                <h1 className='titleStock'>Detalle</h1>
            </div>
            <div className='containerCardsMarca mt10'>
                <div className='companyCardStockDetail'>
                    <div className='dataDetail'>
                        <h3 className='nameCards'>Compañia: <span className='h3Name'>{plate.company?.nameCompany}</span></h3>
                        <h3 className='nameCards'>Color: <span className='h3Name'>{plate.color?.name}</span> </h3>
                        <h3 className='nameCards'>Lote: <span className='h3Name'>{plate.lot}</span></h3>
                        <h3 className='nameCards'>Comentarios: <span className='h3Name'>{plate.comments}</span></h3>
                        <h3 className='nameCards'>Codigo Interno: <span className='h3Name'>{plate.internal}</span></h3>
                        <h3 className='nameCards'>Medidas: <span className='h3Name'>{plate.type?.name} {plate.state?.width} × {plate.state?.height} × {plate.type?.thickness}</span></h3>
                    </div>
                    <div className='containerStates'>
                        <div className='state'>
                            <h2>Estado 1</h2>
                        </div>
                        <div className='state'>
                            <h2>Estado 2</h2>
                        </div>
                        <div className='state'>
                            <h2>Estado 3</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bntEditDelet cjaBtnDetail'>
                <button className='iconEdit'>Editar</button>
                <button className='iconDelete'>Eliminar</button>
            </div>
        </div>
    )

}
