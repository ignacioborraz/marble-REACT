import { useEffect, useState } from 'react'
import { Link as LinkRouter } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import colorActions from '../redux/actions/colorActions';
import companyActions from '../redux/actions/companyActions';
import Container from '../components/Container'
import Text from '../components/Text'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import johnsonActions from '../redux/actions/johnsonActions';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddIcon from '@mui/icons-material/Add';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useNavigate } from 'react-router-dom'
export default function JohnsonAccesory() {

    const dispatch = useDispatch()
    const [inputSearch, setInputSearch] = useState("")
    const [accesorysAdd, setAccesorysAdd] = useState("")
    const [reload, setReload] = useState(false)
    const navigate = useNavigate()
    console.log("🚀 ~ file: Johnson-3-accesory.jsx ~ line 20 ~ JohnsonAccesory ~ accesorysAdd", accesorysAdd)

    useEffect(() => {
        dispatch(johnsonActions.getAccesory())
        // eslint-disable-next-line
    }, [reload])
    useEffect(() => {
        dispatch(johnsonActions.filterAccesory(inputSearch))
        // eslint-disable-next-line
    }, [inputSearch])

    const accesorys = useSelector(store => store.johnsonReducer.accesorys)
    console.log("🚀 ~ file: Johnson-2-model.jsx ~ line 34 ~ JohnsonModel ~ accesorys", accesorys)

    const filterAccesory = useSelector(store => store.johnsonReducer.filterAccesory)
    console.log("🚀 ~ file: Johnson-3-accesory.jsx ~ line 35 ~ JohnsonAccesory ~ filterAccesory", filterAccesory)

    

    function SortArray(x, y) {
        if (x.code < y.code) { return -1; }
        if (x.code > y.code) { return 1; }
        return 0;
    }
    var filterOrd = filterAccesory.sort(SortArray);
    console.log(filterOrd);

    const addAccesory = (id) => {
        if (accesorysAdd.includes(id)) {
            console.log("ya esta en la lista")
            setAccesorysAdd(accesorysAdd.filter(x => x !== id))
        }
        else {
            setAccesorysAdd([...accesorysAdd, id])
            console.log("agregado")
        }

    }
    function creatingSink() {
        let sink = JSON.parse(localStorage.getItem('sink'))
        sink.accesories = accesorysAdd
        localStorage.setItem('sink', JSON.stringify(sink))
        console.log(JSON.parse(localStorage.getItem('sink')))
    }
    function ninguno() {
        let sink = JSON.parse(localStorage.getItem('sink'))
        sink.accesories = null
        localStorage.setItem('sink', JSON.stringify(sink))
        console.log(JSON.parse(localStorage.getItem('sink')))
    }


    return (
        <Container grow='1' wrap='wrap' bgColor='rgb(224,224,224)' sx={{ alignContent: 'flex-start' }}>
            <Container width='100%' wrap='wrap' justify='center' content='start' sx={{ alignContent: 'flex-start' }} >
                <div className='containerNameCompany'>
                    <div className={`hola bgAccesorios`}>
                        <div className='mask2 mask4'>
                            <h1 className='titleCardCompany'>Accesorios</h1>
                            <LinkRouter onClick={ninguno} className='btnForm' to={'/johnson/new/type/accesory/data'} >Ninguno</LinkRouter>
                        </div>
                    </div>

                </div>
                <div>
                    <div className='containerInput'>
                        <input onChange={(e) => setInputSearch(e.target.value)} className='input' type="text" placeholder='Buscar por codigo' />
                    </div>
                    <div className='divContinuar'>
                        {
                            accesorysAdd.length > 0 ?
                                (<LinkRouter className='btnContinuar' to={'/johnson/new/type/accesory/data'} onClick={creatingSink}>
                                    <span>Continuar</span>
                                    <svg width="34" height="34" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="37" cy="37" r="35.5" stroke="black" strokeWidth="3"></circle>
                                        <path d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z" fill="black"></path>
                                    </svg>
                                </LinkRouter>) : <div className='divContinuar'></div>
                        }

                    </div>


                    {
                        filterOrd ? (

                            filterOrd.length > 0 ?
                                <div className='containerCardsMarca'>
                                    {filterOrd?.map(everyColor => (
                                        <button className='linkColors btnAcc' to={'/johnson/new/type/accesory/data'} onClick={() => addAccesory(everyColor._id)} key={everyColor._id} id={everyColor._id}>
                                            <h2 className='nameCards'>{everyColor.code}</h2>
                                            {accesorysAdd?.includes(everyColor._id) ?
                                                <div style={{ "color": "green", "fontSize": 30, "backgroundColor": "white" }} className="addIcon"><CheckCircleIcon /></div>
                                                :
                                                <div style={{ "fontSize": 30, "color": "gray" }} className="addIcon"><RadioButtonUncheckedIcon /></div>}
                                            <img src={everyColor.photo} alt={everyColor._id} className='fitAccesory' id={everyColor._id} />
                                            <h2 className='nameCards descriptionh2'>{everyColor.description}</h2>

                                        </button>
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