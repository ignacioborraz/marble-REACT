import React, {useEffect/* , useState */} from 'react'
//import axios from 'axios'
import {Link as LinkRouter} from 'react-router-dom'

import Container from '../components/Container'
import Text from '../components/Text'

import {useDispatch,useSelector} from 'react-redux'
import jobActions from '../redux/actions/jobActions'

export default function GetJobs() {

    //const [jobs,setJobs] = useState([])

    const dispatch = useDispatch()

    //let apiUrl = 'https://back-rosario.herokuapp.com/'

    useEffect( () => {
        //axios.get(apiUrl+'apiJobs/job')
        //.then(res=> console.log(res))
        //.then(res => setJobs(res.data.response))
        dispatch(jobActions.getJobs())
        // eslint-disable-next-line
    },[])

    //useSelector(store => store.enQueReductor.queEstado)
    const jobs = useSelector(store => store.jobReducer.jobs)

    return (
        <Container grow='1' wrap='wrap' bgColor='rgb(224,224,224)' padding='20px 0'>
            {jobs.map(everyJob => (
                <Container  key={everyJob._id} direction='column' margin='0 10px 20px 10px'>
                    <Text variant='h5' width='280px' padding='10px' bgColor='rgb(105,24,152)' color='rgb(224,224,224)' font='Paytone One'>
                        {everyJob.nameJob}</Text>
                    <img src={everyJob.photoJob} alt={everyJob.nameJob} className="list" />
                    <LinkRouter to={`/detailJob/${everyJob._id}`}>
                        <Text width='280px' padding='10px' bgColor='rgb(2,0,3)'color='rgb(224,224,224)'  hover='rgb(105,24,152)'  font='Paytone One'>
                            +info</Text>
                    </LinkRouter>
                </Container >
            ))}
        </Container >
    )

}