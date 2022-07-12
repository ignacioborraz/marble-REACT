import React, {useEffect,useState} from 'react'
import {useParams,useNavigate} from 'react-router-dom'

import EditIcon from '@mui/icons-material/Edit'
import {Grid} from '@mui/material'

import Container from '../components/Container'
import StyledGrid from '../components/StyledGrid'
import StyledGridImg from '../components/StyledGridImg'
import StyledIcon from '../components/StyledIcon'
import Text from '../components/Text'

import {useDispatch,useSelector} from 'react-redux'
import companyActions from '../redux/actions/companyActions'

export default function DetailCompany({bgImage}) {

    const {id} = useParams()
    const [reload,setReload] = useState(false) //va a contener el booleano que recargará la renderización
    const [openEdit,setOpenEdit] = useState(false) //va a contener el booleano que abrirá las opciones de edición
    const [property,setProperty] =  useState("") //va a contener la propiedad a editar
    const [newProperty,setNewProperty] = useState("") //va a contener el valor de la nueva propiedad
    const navigate = useNavigate()

    const dispatch = useDispatch() //este metodo sirve para despachar acciones al store

    useEffect( () => {
        dispatch(companyActions.getOneCompany(id))
    },[reload])

    const company = useSelector(store => store.companyReducer.oneCompany) //defino una variable con los datos del store

    function toOpenEdit(event) { //funcion que despliega/oculta las opciones de edicion
        setOpenEdit(!openEdit)
    }

    async function toEdit() { //función que edita el objeto
        if (property && newProperty) {
            let editData = {}
            editData[property] = newProperty
            //console.log(editData)
            await dispatch(companyActions.putCompany(id,{...editData}))
            setReload(!reload)
            setOpenEdit(!openEdit)
            setProperty("")
            setNewProperty("")
        }
    }

    async function toDelete() { //función que elimina el objeto
        /* await dispatch(companyActions.deleteCompany(id))
            .then(navigate("/getCompanies",{replace:true})) */
            navigate("/getCompanies",{replace:true})
    }

    let classN = 'backGroundStyle '+bgImage

    return (
        <Grid container sx={{flexGrow: '1', backgroundColor: 'rgb(2,0,3)'}}>
            <StyledGridImg bgColor='rgb(224,224,224)' className={classN} />
            <StyledGrid bgColor='rgb(224,224,224)' direction='column'>
                <Text variant='h5' width='280px' font='Paytone One' color='rgb(224,224,224)' bgColor='rgb(105,24,152)' padding='10px'>
                    {company.nameCompany}
                </Text>
                <img src={company.logoCompany} alt={company.nameCompany} className="list" />
                <Text variant='h6' width='280px' color='rgb(2,0,3)' bgColor='white' padding='5px 10px'>
                    {company.detailCompany}
                </Text>
                <Container width='280px'>
                    <Text variant='h6' width='50%' font='Paytone One' color='rgb(224,224,224)' bgColor='rgba(2,0,3,0.5)' hover='rgb(105,24,152)' padding='5px' to={toOpenEdit}>
                        edit
                    </Text>
                    <Text variant='h6' width='50%' font='Paytone One' color='rgb(224,224,224)' bgColor='rgb(2,0,3)' hover='rgb(105,24,152)' padding='5px' to={toDelete}>
                        delete
                    </Text>
                </Container>
                {openEdit &&
                    <Container direction='column' width='280px' bgColor='white' padding='5px'>
                        <Container width='270px'>
                            <select defaultValue="" name="selectedData" onChange={event=> setProperty(event.target.value)} className="selectList" >
                                <option disabled value="">select</option>
                                {Object.keys(company).map((key,value) => ((key!=="__v" && key!=="_id") && <option key={value} value={key}>{key}</option>))}
                            </select>
                        </Container>
                        <Container width='270px'>
                            <input name={property} id={property} type='text' placeholder={company[property]} className='inputForm selectList' onKeyUp={e => setNewProperty(e.target.value)} />
                            <StyledIcon to={toEdit}><EditIcon /></StyledIcon>
                        </Container>
                    </Container>}
            </StyledGrid>
        </Grid>
    )

}