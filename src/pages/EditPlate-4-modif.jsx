import { useEffect } from 'react'
import { Link as LinkRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import companyActions from '../redux/actions/companyActions'
import Container from '../components/Container'

export default function EditPlateTypeModif() {
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
                { id: 0, name: "Menor", class: "bgMenor", class1:"menorH" },
                { id: 1, name: "Consumir toda", class: "bgConsumir" , class1:"menorH" },
            ]
        },
    ]
    const opSelect = option.find(t => t.type === type)

    useEffect(() => {
        dispatch(companyActions.getCompanies())
        // eslint-disable-next-line
    }, [])
    const companies = useSelector(store => store.companyReducer.companies)

    return (
        <Container grow='1' wrap='wrap' bgColor='rgb(224,224,224)'>
            <Container width='100%' justify='space-evenly' align='center' wrap='wrap'>
                {
                    opSelect.options.map(op => (
                        <div className={` linkTypes  mr10 mb10  ${op.class1}`} key={op.id}>
                            <div className={`bgType ${op.class} `}>
                                <div className='mask'>
                                    <h1 className='titleCard'>{op.name}</h1>

                                </div>
                            </div>
                        </div>
                    ))
                }







            </Container>
        </Container>
    )

}