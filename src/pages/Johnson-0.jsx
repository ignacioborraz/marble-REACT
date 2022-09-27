import { useEffect } from 'react'
import { Link as LinkRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import companyActions from '../redux/actions/companyActions'
import Container from '../components/Container'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import TaskIcon from '@mui/icons-material/Task';

export default function JohnsonMenu() {
    const dispatch = useDispatch()

    console.log(JSON.parse(localStorage.getItem('editPlate')))
    const plate = JSON.parse(localStorage.getItem('editPlate'))
    const type = plate.type
    console.log("🚀 ~ file: EditPlate-4-modif.jsx ~ line 13 ~ plate", type)
    const option = [
        {
            type: "placaEntera",
            options: [
                { id: 0, name: "Otra escuadra", class: "bgOtra" },
                { id: 1, name: "Mayor", class: "bgMayor" },
                { id: 2, name: "Menor", class: "bgMenor" },
                { id: 3, name: "Consumir toda", class: "bgConsumir" }
            ]
        },
        {
            type: "escuadra",
            options: [
                { id: 0, name: "Otra escuadra", class: "bgOtra" },
                { id: 1, name: "Mayor", class: "bgMayor" },
                { id: 2, name: "Menor", class: "bgMenor" },
                { id: 3, name: "Consumir toda", class: "bgConsumir" }
            ]
        },
        {
            type: "mayor50",
            options: [
                { id: 0, name: "Otra escuadra", class: "bgOtra" },
                { id: 1, name: "Mayor", class: "bgMayor" },
                { id: 2, name: "Menor", class: "bgMenor" },
                { id: 3, name: "Consumir toda", class: "bgConsumir" }
            ]
        },
        {
            type: "menor50",
            options: [
                { id: 0, name: "Menor", class: "bgMenor", class1: "menorH" },
                { id: 1, name: "Consumir toda", class: "bgConsumir", class1: "menorH" },
            ]
        },
    ]

    const opSelect = option.find(t => t.type === type)
    console.log("🚀 ~ file: EditPlate-4-modif.jsx ~ line 55 ~ opSelect", opSelect)


    useEffect(() => {
        dispatch(companyActions.getCompanies())
        // eslint-disable-next-line
    }, [])

    const companies = useSelector(store => store.companyReducer.companies)
    console.log("🚀 ~ file: New-1-Company.jsx ~ line 16 ~ SelectCompany ~ companies", companies)

    // function creatingPlate(event) {
    //     let plate = JSON.parse(localStorage.getItem('editPlate'))
    //     plate.type = event.currentTarget.id
    //     localStorage.setItem('editPlate', JSON.stringify(plate))
    // }

    return (
        <Container grow='1' wrap='wrap' bgColor='rgb(224,224,224)'>
            <Container width='100%' justify='space-evenly' align='center' wrap='wrap'>
                <div className="linkTypes  mr10 mb10 menorH"
                        /* to={'/editPlate/plate'} onClick={creatingPlate} id="placaEntera"*/>
                    <div className="bgType bgCargar" >
                        <div className='mask'>
                            <h1 className='titleCard'>Cargar</h1>
                        </div>
                    </div>

                </div>

                <div className="linkTypes  mr10 mb10 menorH">
                    <div className="bgType bgConsumir" >
                        <div className='mask'>
                            <h1 className='titleCard'>Stock</h1>
                        </div>
                    </div>
                </div>


            </Container>
        </Container >
    )

}