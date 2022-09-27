import { useEffect, useState } from 'react'
import { Link as LinkRouter, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import colorActions from '../redux/actions/colorActions';
import companyActions from '../redux/actions/companyActions';
import Container from '../components/Container'


export default function EditPlate() {

    const dispatch = useDispatch()
    const [inputSearch, setInputSearch] = useState("")
    console.log(JSON.parse(localStorage.getItem('editPlate')))
    const plate = JSON.parse(localStorage.getItem('editPlate'))
    const id = plate.company
    console.log("🚀 ~ file: EditPlate-4-modif.jsx ~ line 13 ~ idCompany", id)

    useEffect(() => {
        dispatch(colorActions.getColors(id))
        // eslint-disable-next-line
    }, [id])

    useEffect(() => {
        dispatch(companyActions.getOneCompany(id))
        dispatch(colorActions.filterColors(inputSearch))
        // eslint-disable-next-line
    }, [inputSearch, id])

    let filterCard = useSelector(store => store.colorReducer.filterColors)

    const company = useSelector(store => store.companyReducer.oneCompany)


    function creatingPlate(event) {

        let plate = JSON.parse(localStorage.getItem('editPlate'))
        plate.color = event.target.id
        localStorage.setItem('editPlate', JSON.stringify(plate))
        //console.log(JSON.parse(localStorage.getItem('plate')))
    }

    //const ord = filterCard.sort((a, b) => b.name - a.name)

    function SortArray(x, y){
        if (x.name < y.name) {return -1;}
        if (x.name > y.name) {return 1;}
        return 0;
    }
    var filterOrd = filterCard.sort(SortArray);
    //console.log(filterOrd);

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
                                    <LinkRouter className='linkColors'  to={'/editPlate/type/color/'+ everyColor.company} onClick={creatingPlate} key={everyColor._id} id={everyColor._id}>
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