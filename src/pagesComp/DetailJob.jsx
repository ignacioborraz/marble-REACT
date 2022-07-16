import React, {useEffect,useState} from 'react'
//import axios from 'axios'
import {useParams,useNavigate} from 'react-router-dom'

import EditIcon from '@mui/icons-material/Edit'
import {Grid} from '@mui/material'

import Container from '../components/Container'
import StyledGrid from '../components/StyledGrid'
import StyledGridImg from '../components/StyledGridImg'
import StyledIcon from '../components/StyledIcon'
import Text from '../components/Text'

import {useDispatch,useSelector} from 'react-redux'
import jobActions from '../redux/actions/jobActions'
import companyActions from '../redux/actions/companyActions'

export default function DetailJob({bgImage}) {

    const {id} = useParams()
    //const [job,setJob] = useState({}) //va a contener los datos del trabajo a editar
    const [reload,setReload] = useState(false) //va a contener el booleano que recargará la renderización
    const [openEdit,setOpenEdit] = useState(false) //va a contener el booleano que abrirá las opciones de edición
    const [property,setProperty] =  useState("") //va a contener la propiedad a editar
    const [newProperty,setNewProperty] = useState("") //va a contener el valor de la nueva propiedad
    //const [companies,setCompanies] = useState([])
    const navigate = useNavigate()

    //let apiUrl = 'https://back-rosario.herokuapp.com/'

    const dispatch = useDispatch()

    useEffect( () => { //se puede usar un unico useEffect para ambos despachos
        dispatch(jobActions.getOneJob(id))
        //axios.get(apiUrl+'apiJobs/job/'+id)
        //.then(res=> console.log(res))
        //.then(res => setJob(res.data.response))
    },[reload]) //cada vez que reload cambie, se van a recargar los datos renderizados

    const job = useSelector(store => store.jobReducer.oneJob)

    useEffect( () => {
        dispatch(companyActions.getCompanies())
        //axios.get(apiUrl+'apiJobs/company')
        //.then(res=> console.log(res))
        //.then(res => setCompanies(res.data.response))
    },[reload])

    const companies = useSelector(store => store.companyReducer.companies)

    function toOpenEdit(event) { //funcion que despliega/oculta las opciones de edicion
        setOpenEdit(!openEdit)
    }

    async function toEdit() { //función que edita el objeto
        if (property && newProperty) {
            let editData = {}
            editData[property] = newProperty
            await dispatch(jobActions.putJob(id,editData))
            //await axios.put(apiUrl+'apiJobs/job/'+id,{...editData})//.then(res=>console.log(res))
            setReload(!reload)
            setOpenEdit(!openEdit)
            setProperty("")
            setNewProperty("")
        }
    }

    async function toDelete() { //función que elimina el objeto
        await dispatch(jobActions.deleteJob(id))
            .then(navigate("/getJobs",{replace:true}))
    }

    let classN = 'backGroundStyle '+bgImage

    return (
        <Grid container sx={{flexGrow: '1', backgroundColor: 'rgb(2,0,3)'}}>
            <StyledGridImg bgColor='rgb(224,224,224)' className={classN} />
            <StyledGrid bgColor='rgb(224,224,224)' direction='column'>
                <Text variant='h5' width='280px' font='Paytone One' color='rgb(224,224,224)' bgColor='rgb(105,24,152)' padding='10px'>
                    {job.nameJob}
                </Text>
                <Text variant='h5' weight='800' width='280px' color='rgb(105,24,152)' bgColor='white' padding='5px 10px'>
                    {job.company?.nameCompany}
                </Text>
                <img src={job.photoJob} alt={job.nameJob} className="list" />
                <Text variant='h6' width='280px' color='rgb(2,0,3)' bgColor='white' padding='5px 10px'>
                    {job.detailJob}
                </Text>
                <Text variant='h6' weight='800' width='280px' color='rgb(2,0,3)' bgColor='white' padding='5px 10px'>
                    USD {job.salaryJob}
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
                                {Object.keys(job).map((key,value) => ((key!=="__v" && key!=="_id") && <option key={value} value={key}>{key}</option>))}
                            </select>
                        </Container>
                        <Container width='270px'>
                            {(property==="company") ?
                                <select defaultValue="" name='company' id='company' placeholder='Company' className='inputForm selectList' onChange={e => setNewProperty(e.target.value)} required>
                                    <option disabled value="">select</option>
                                    {companies.map(everyCompany => <option key={everyCompany._id} value={everyCompany._id}>{everyCompany.nameCompany}</option>)}
                                </select> :
                                <input name={property} id={property} type='text' placeholder={job[property]} className='inputForm selectList' onKeyUp={e => setNewProperty(e.target.value)} />}
                                <StyledIcon to={toEdit}><EditIcon /></StyledIcon>
                        </Container>
                    </Container>}
            </StyledGrid>
        </Grid>

/*
                        
                        <Container width='280px'>
                            {(property==="company") ?
                                <select defaultValue="" name='company' id='company' placeholder='Company' className='inputForm selectList' onChange={e => setNewProperty(e.target.value)} required>
                                    <option disabled value="">select</option>
                                    {companies.map(everyCompany => <option key={everyCompany._id} value={everyCompany._id}>{everyCompany.nameCompany}</option>)}
                                </select> :
                                <input name={property} id={property} type='text' placeholder={job[property]} className='inputForm selectList' onKeyUp={e => setNewProperty(e.target.value)} />}
                            <Container sx={{height: '40px', width: '40px', margin: 0, padding: 0}} onClick={toEdit}>
                                <EditIcon sx={{height: '40px', width: '40px', padding: '5px', backgroundColor: 'rgb(224,224,224)'}}/>
                            </Container>
                        </Container>
*/

    )
}