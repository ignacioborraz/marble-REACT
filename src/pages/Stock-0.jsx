import { useEffect } from 'react'
import { Link as LinkRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import plateActions from '../redux/actions/plateActions'
import Container from '../components/Container'
import Text from '../components/Text'

export default function Stock() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(plateActions.getPlates())
    }, [])

    const plates = useSelector(store => store.plateReducer.plates)
    console.log("🚀 ~ file: Stock-0.jsx ~ line 17 ~ Stock ~ plates", plates)

    return (
        <Container grow='1' bgColor='rgb(224,224,224)'>
            <div className='containerCardsMarca mt10'>
                {plates?.map(everyPlate => (
                    <div className='linkColors' /* to={'/nueva/color/tipo/'+everyPlate._id} */ key={everyPlate._id}>
                        <div className='companyCardStock'>
                            <h2 className='nameCards'>{everyPlate.color.name}</h2>
                            <h3 className='nameCards'>{everyPlate.company?.nameCompany}</h3>
                            {
                                everyPlate.internal ? (<h3 className='nameCards'>codInterno:{everyPlate.internal}</h3>)
                                    : <h3 className='nameCards'>codPedido: {everyPlate.note}</h3>
                            }
                            
                        </div>
                        {/* <div className='companyCardStock'>
                            
                            {
                                everyPlate.internal ? (<h3 className='nameCards'>codInterno:{everyPlate.internal}</h3>)
                                :<h3 className='nameCards'>codPedido: {everyPlate.note}</h3>
                            }
                            <h3 className='nameCards'>{everyPlate.company?.nameCompany}</h3>
                            
                        </div> */}

                        <img src={everyPlate.color.photo} alt={everyPlate._id} className='fitStock' id={everyPlate._id} />
                    </div>
                ))}
            </div>
        </Container>
    )

}