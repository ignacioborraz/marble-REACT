import { useEffect, useState } from 'react'
import { Link as LinkRouter, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import colorActions from '../redux/actions/colorActions';
import companyActions from '../redux/actions/companyActions';
import Container from '../components/Container'
import Text from '../components/Text'

export default function SelectColor() {

    const { id } = useParams()
    const dispatch = useDispatch()
    const [inputSearch, setInputSearch] = useState("")

    useEffect(() => {
        dispatch(colorActions.getColors(id))
        // eslint-disable-next-line
    }, [id])

    useEffect(() => {
        dispatch(companyActions.getOneCompany(id))
        //dispatch(colorActions.getColors(id))
        dispatch(colorActions.filterColors(inputSearch))
        //dispatch(colorActions.filterc(inputSearch, id))//filtro back
        
        // eslint-disable-next-line
    }, [inputSearch, id])

    let filterCard = useSelector(store => store.colorReducer.filterColors)
    //console.log("🚀 ~ file: citiesAction.js ~ line 19 ~ input", filterCard)

    // let filter = useSelector(store => store.colorReducer.filt)
    // console.log("🚀 ~ file: New-2-Color.jsx ~ line 31 ~ SelectColor ~ filter", filter)

    const company = useSelector(store => store.companyReducer.oneCompany)
    // console.log("🚀 ~ file: New-2-Color.jsx ~ line 21 ~ SelectColor ~ company", company)
    // const colors = useSelector(store => store.colorReducer.colors)

    // console.log("🚀 ~ file: New-2-Color.jsx ~ line 18 ~ SelectColor ~ colors", colors)

    function creatingPlate(event) {
        let plate = JSON.parse(localStorage.getItem('plate'))
        plate.color = event.target.id
        localStorage.setItem('plate', JSON.stringify(plate))
        console.log(JSON.parse(localStorage.getItem('plate')))
    }

    //const ord = filterCard.sort((a, b) => b.name - a.name)

    function SortArray(x, y){
        if (x.name < y.name) {return -1;}
        if (x.name > y.name) {return 1;}
        return 0;
    }
    var filterOrd = filterCard.sort(SortArray);
    console.log(filterOrd);

    //console.log("🚀 ~ file: New-2-Color.jsx ~ line 47 ~ SelectColor ~ ord", ord)
    
    return (
        <Container grow='1' wrap='wrap' bgColor='rgb(224,224,224)' sx={{ alignContent: 'flex-start' }}>
            <Container width='100%' wrap='wrap' justify='center' content='start' sx={{ alignContent: 'flex-start' }} >
                <div className='containerNameCompany'>
                    <div className={`hola ${company.nameCompany}` }>
                        <div className='mask2'>
                            <h1 className='titleCardCompany'>{company.nameCompany}</h1>
                        </div>
                    </div>

                </div>
                <div>
                    <div className='containerInput'>
                        <input className='input' type="text" placeholder='Buscar por color' onChange={(e) => setInputSearch(e.target.value)} />

                    </div>
                    {
                        filterOrd.length > 0 ?

                            <div className='containerCardsMarca'>


                                {filterOrd?.map(everyColor => (
                                    <LinkRouter className='linkColors' to={'/nueva/color/' + everyColor.company} onClick={creatingPlate} key={everyColor._id} id={everyColor._id}>
                                        {/* <Text variant='h6' font='Paytone One' color='rgb(25,25,25)' padding='5px' id={everyColor._id}>
                                            {everyColor.name}
                                        </Text> */}
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
                </div>

            </Container>
        </Container>
    )

}