import { useEffect, useState } from 'react'
import { Link as LinkRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import colorActions from '../redux/actions/colorActions';
import Container from '../components/Container'

export default function SelectColor() {

    const company = useSelector(store => store.new.plate?.company)
    const colors = useSelector(store => store.colorReducer?.colors)
    const dispatch = useDispatch()
    const [inputSearch, setInputSearch] = useState("")

    useEffect(() => {
        dispatch(colorActions.getColors(company,inputSearch))
        dispatch(colorActions.newPlate(null))
        // eslint-disable-next-line
    }, [company,inputSearch])

    function creatingPlate(event) {
        dispatch(colorActions.newPlate(event.currentTarget.id))
    }

    return (
        <Container grow='1' direction='column' bgColor='rgb(224,224,224)'>
                <div className='containerInput'>
                    <input className='input' type="text" placeholder='Buscar por color' onChange={(e) => setInputSearch(e.target.value)} />
                </div>
                <Container width='100%' justify='space-evenly' wrap='wrap'>
                {colors ?
                    <div className='containerCardsMarca'>
                        {colors?.map(everyColor => (
                            <LinkRouter className='linkColors' to={'/nueva/color/tipo'} onClick={creatingPlate} key={everyColor._id} id={everyColor._id}>
                                <h2 className='nameCards'>{everyColor.name}</h2>
                                <img src={everyColor.photo} alt={everyColor._id} className='fitColor' id={everyColor._id} />
                            </LinkRouter>
                        ))}
                    </div>
                    :
                    <div className='noResult'>
                        <h1>no hay resultados</h1>
                    </div>
                }
            </Container>
        </Container>
    )

}