import { useRef } from 'react'
import React, { useEffect } from 'react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import johnsonActions from '../redux/actions/johnsonActions';
import sinkActions from '../redux/actions/sinkActions';
import Container from '../components/Container'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

export default function JohnsonData() {

  const navigate = useNavigate()
  const comments = useRef()
  let sink = JSON.parse(localStorage.getItem('sink'))
  const jhonson = sink.jhonson
  console.log("🚀 ~ file: Johnson-4-Data.jsx ~ line 16 ~ JohnsonData ~ johnson", jhonson)
  const dispatch = useDispatch()
  const [codigo, setCodigo] = useState("")
  const [instalation, setInstalation] = useState("")
  console.log("🚀 ~ file: Johnson-4-Data.jsx ~ line 20 ~ JohnsonData ~ instalation", instalation)
  console.log("🚀 ~ file: Johnson-4-Data.jsx ~ line 18 ~ JohnsonData ~ codigo", codigo)
  const [typeCode, setTypeCode] = useState("")
  console.log("🚀 ~ file: Johnson-4-Data.jsx ~ line 19 ~ JohnsonData ~ type", typeCode)
  
  const [openAcc, setOpenAcc] = useState(false)
  const [accesorysAdd, setAccesorysAdd] = useState([])
  console.log("🚀 ~ file: Johnson-4-Data.jsx ~ line 35 ~ JohnsonData ~ accesorysAdd", accesorysAdd)
  useEffect(() => {
    dispatch(johnsonActions.getOneJohnson(jhonson))
    dispatch(johnsonActions.getAccesory())
    // eslint-disable-next-line
  }, [])

  const johnsonSelect = useSelector(store => store.johnsonReducer.oneJohnson)
  const accesoriesList = useSelector(store => store.johnsonReducer.accesorys)
  const addAccesory = (id, elem) => {
    if (accesorysAdd.includes(id)) {
        console.log("ya esta en la lista")
        setAccesorysAdd(accesorysAdd.filter(x => x !== id))
    }
    else {
        setAccesorysAdd([...accesorysAdd, id])
        console.log("agregado")
    }

}
const addInstalacion = (elem) => {
  if (instalation.includes(elem)) {
      console.log("ya esta en la lista")
      setInstalation(instalation.filter(x => x !== elem))
  }
  else {
    setInstalation([...instalation, elem])
      console.log("agregado")
  }

}

  const handleClickAccesorios = () => {
    setOpenAcc(true)
}


  async function creatingSink(event) {
    event.preventDefault()
    let sink = JSON.parse(localStorage.getItem('sink'))
    sink.comments = comments?.current.value.trim()
    sink.done = false
    instalation ? (sink.instalation = instalation): sink.instalation = "instalacion lateral"
    sink.accesories= accesorysAdd
    if (typeCode === "interno") {
      sink.internal = codigo
      sink.note = null
    }
    else if (typeCode === "pedido") {
      sink.note = codigo
      sink.internal = null
    }
    localStorage.setItem('sink', JSON.stringify(sink))
    console.log(sink)
    await dispatch(sinkActions.createSink(sink))
    .then(navigate("/", { replace: true }))
  }

  return (
    <Container grow='1' wrap='wrap' bgColor='rgb(224,224,224)' >
      <Container width='100%' justify='space-evenly' align='center' wrap='wrap'>
        <div className="containerForm formSink">
          <div className='mask2'>
            <form onSubmit={creatingSink} className="form" >
              <h1 className='titleForm'>CARGAR PILETA</h1>
              <div className='containerDatosForm'>

                <div className='cajaCodigo' >
                  <div className='labelInputCodigo'>
                    <label>CODIGO: </label>
                    <input className='inputCodigo inputGrow' id={"codigo"} name='codigo' onChange={(e) => setCodigo(e.target.value)} required />
                  </div>
                  <div className='cheksSink'>
                    <label className='ml10 labelCheck' >
                      <input type="radio" id={`interno`} name={`typeCode`} value='interno' required onChange={(e) => setTypeCode(e.target.value)} />Cod.Interno</label>
                    <label className='ml10 labelCheck' >
                      <input type="radio" id={`pedido`} name={`typeCode`} value='pedido' required onChange={(e) => setTypeCode(e.target.value)} />Nota del Pedido </label>

                  </div>

                </div>
                {
                  johnsonSelect.instalation?.length > 0 ?
                    (
                      <div className=' checksInstalation' >

                        <div>
                          <label>Instalacion:</label>
                        </div>
                        {
                          johnsonSelect.instalation?.map((op, index) =>
                            <label key={index} className='ml10 labelCheck' name="checkbox-group" >
                              <input type='checkbox' id={`instalation-${index + 1}`} name="checkbox-group"  value={op} onChange={(e) => addInstalacion(e.target.value) } />{op}
                            </label>
                          )
                        }

                      </div>

                    ) : null
                }

                <div className='labelInputCodigo '>
                  <label htmlFor='comentario'>COMENTARIO: </label>
                  <input className='inputCodigo inputGrow' id='comentario' type='text' ref={comments} />
                </div>
                <div className='btnAddJ'>
                <button type='button' className='btnAdd botonAddAcc' onClick={handleClickAccesorios}>agregar Accesorios</button>

                </div>
                <Dialog open={openAcc} >
                <DialogContent>
                    <DialogContentText>Accesorios:</DialogContentText>
                    <div className='itemsEditAcc'>
                        {accesoriesList.map((item) => (
                            <button
                                onClick={() => addAccesory(item._id, item)}
                                key={item._id}
                                className='boxItemAcc'
                                style={{
                                    "backgroundImage": `url(${item.photo})`,
                                    "backgroundSize": "cover",
                                    "backgroundPosition": "center",
                                    "objectFit": "cover"
                                }}>


                                <div className='maskAcc'>
                                    <div className='nameIcon'>
                                        <h5 className='h5DescAcc'>{item.code}</h5>
                                        {accesorysAdd?.includes(item._id) ?
                                            <CheckCircleIcon className="addIconAcc" />
                                            :
                                            <RadioButtonUncheckedIcon className="deletIconAcc" />}
                                    </div>
                                    <p className='pDescAcc'>{item.description}</p>
                                </div>
                            </button>
                        ))}
                    </div>

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAcc(false)}>Listo</Button>
                    <Button onClick={() => setOpenAcc(false)}>Cancelar</Button>
                </DialogActions>
            </Dialog>



              </div>
              <input type="submit" required value='ingresar' className='btnForm ' />
            </form>

          </div>

        </div>

      </Container>
    </Container >
  )

}