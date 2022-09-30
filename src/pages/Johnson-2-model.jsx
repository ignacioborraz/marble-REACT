import { useEffect, useState } from 'react'
import { Link as LinkRouter} from 'react-router-dom'
import {useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import colorActions from '../redux/actions/colorActions';
import companyActions from '../redux/actions/companyActions';
import Container from '../components/Container'
import Text from '../components/Text'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import johnsonActions from '../redux/actions/johnsonActions';


export default function JohnsonModel() {

    const { type } = useParams()
    console.log("🚀 ~ file: Johnson-2-model.jsx ~ line 15 ~ JohnsonModel ~ type", type)
    const dispatch = useDispatch()
    const [inputSearch, setInputSearch] = useState("")

        useEffect(() => {
            dispatch(johnsonActions.getJohnsonType(type))
            // eslint-disable-next-line
        }, [])
        useEffect(() => {
            dispatch(johnsonActions.filterJohnsonType(inputSearch,type))
            // eslint-disable-next-line
        }, [inputSearch])
    
        const typeSelect = useSelector(store => store.johnsonReducer.johnsonType)
        console.log("🚀 ~ file: Johnson-1-type.jsx ~ line 18 ~ JohnsonType ~ type", typeSelect)
        const filterType = useSelector(store => store.johnsonReducer.filterJohnsonType)
        console.log("🚀 ~ file: Johnson-2-model.jsx ~ line 34 ~ JohnsonModel ~ filterType", filterType)

        function creatingSink(event) {
            console.log("🚀 ~ file: Johnson-2-model.jsx ~ line 41 ~ creatingSink ~ event", event)

            let sink = { jhonson: event.currentTarget.id }
            localStorage.setItem('sink', JSON.stringify(sink))
            console.log(JSON.parse(localStorage.getItem('sink')))
        }
        
   
    

    return (
        <Container grow='1' wrap='wrap' bgColor='rgb(224,224,224)' sx={{ alignContent: 'flex-start' }}>
            <Container width='100%' wrap='wrap' justify='center' content='start' sx={{ alignContent: 'flex-start' }} >
                <div className='containerNameCompany'>
                    <div className={`hola bg${type}`}>
                        <div className='mask2'>
                            <h1 className='titleCardCompany'>{type}</h1>
                        </div>
                    </div>

                </div>
                <div>
                    <div className='containerInput'>
                        <input onChange={(e) => setInputSearch(e.target.value)} className='input' type="text" placeholder='Buscar por codigo' />
                    </div>
                    
                    {
                        filterType ? (
                        
                            filterType.length > 0 ?
                                <div className='containerCardsMarca'>
                                    {filterType?.map(everyColor => (
                                        <LinkRouter className='linkColors' to={'/johnson/new/type/data'} onClick={creatingSink} key={everyColor._id} id={everyColor._id}>
                                            <h2 className='nameCards'>{everyColor.code}</h2>
                                            <img src={everyColor.photo} alt={everyColor._id} className='fitModel' id={everyColor._id} />
                                            <h2 className='nameCards'>{everyColor.x} x {everyColor.y} x {everyColor.z} </h2>
                                        </LinkRouter>
                                    ))}
                                </div>
    
                                :
                                <div className='noResult'>
                                    <h1>no hay resultados</h1>
                                </div>
    
                        ) : <Skeleton variant="rectangular" width={210} height={118} />
                    }
                   
                </div>

            </Container> 
        </Container>
    )

}