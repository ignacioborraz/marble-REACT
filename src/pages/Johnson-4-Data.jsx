import { useRef } from 'react'
import React, { useEffect } from 'react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import johnsonActions from '../redux/actions/johnsonActions';
import sinkActions from '../redux/actions/sinkActions';
import Container from '../components/Container'
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

export default function JohnsonData() {
  const navigate = useNavigate()
  const comments = useRef()
  let stock = JSON.parse(localStorage.getItem('stock'))
  let sink = JSON.parse(localStorage.getItem('sink'))
  const jhonson = sink.jhonson
  console.log("🚀 ~ file: Johnson-4-Data.jsx ~ line 23 ~ JohnsonData ~ jhonson", jhonson)
  const dispatch = useDispatch()
  const [codigo, setCodigo] = useState("")
  const [instalation, setInstalation] = useState("")
  const [typeCode, setTypeCode] = useState("")
  const [accesorysAdd, setAccesorysAdd] = useState([])
  const [sinks, setSinks] = useState([{ accesories: [], instalation:"instalacion lateral", jhonson: jhonson, quantity: "" }])
  const [sinksOpen, setSinksOpen] = useState([{ open: false }])
  const [sinksOpenType, setSinksOpenType] = useState([{ open: false }])
  const [typeA, setTypeA] = useState(false)
  const [openJson, setOpenJson] = useState(false)
  const [inputSearch, setInputSearch] = useState("")
  const [listType, setListType] = useState([])

  console.log("🚀 ~ file: Johnson-4-Data.jsx ~ line 35 ~ JohnsonData ~ sinksOpen", sinksOpen)
  console.log("🚀 ~ file: Johnson-4-Data.jsx ~ line 31 ~ JohnsonData ~ sinks", sinks)

  useEffect(() => {
    dispatch(johnsonActions.getOneJohnson(jhonson))
    dispatch(johnsonActions.getAccesory())
    dispatch(johnsonActions.getJohnsonType("A304"))
    dispatch(johnsonActions.getJohnsonType("A430"))
    // eslint-disable-next-line
  }, [])

  const johnsonSelect = useSelector(store => store.johnsonReducer.oneJohnson)
  console.log("🚀 ~ file: Johnson-4-Data.jsx ~ line 50 ~ JohnsonData ~ johnsonSelect", johnsonSelect)
  const accesoriesList = useSelector(store => store.johnsonReducer.accesorys)
  const jsonList = useSelector(store => store.johnsonReducer.johnsonType)
 
  const addAccesory = (id, index, key) => {
    console.log("🚀 ~ file: Johnson-4-Data.jsx ~ line 42 ~ addAccesory ~ id", id)
    console.log("🚀 ~ file: Johnson-4-Data.jsx ~ line 42 ~ addAccesory ~ index", index)
    let fields = sinks[index].accesories
    let lista = []
    if (fields.includes(id)) {
      console.log("ya esta en la lista")
      setSinks(sinks[index].accesories.filter(x => x !== id))
    }
    else {
      fields.push(id);
      setSinks[index]?.accesories([...sinks[index].accesories, ...fields])
      console.log("🚀 ~ file: Johnson-4-Data.jsx ~ line 54 ~ addAccesory ~ fields", fields)
      console.log("🚀 ~ file: Johnson-4-Data.jsx ~ line 51 ~ addAccesory ~ lista", lista)
      console.log("agregado")
    }
    // if (accesorysAdd.includes(id)) {
    //   console.log("ya esta en la lista")
    //   setAccesorysAdd(accesorysAdd.filter(x => x !== id))
    // }
    // else {
    //   setAccesorysAdd([...accesorysAdd, id])
    //   console.log("agregado")
    // }
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
  const openAcc = (position) => {
    const abrir = sinksOpen.map((op, index)=>{
      if (index === position) {
        return{open:true}
      }
    })
    setSinksOpen(abrir)
    console.log(sinksOpen)
  }
  const closeAcc = (position) => {
    const cerrar = sinksOpen.map((op, index)=>{
      if (index === position) {
        return{open:false}
      }
    })
    setSinksOpen(cerrar)
    console.log(sinksOpen)
  }
  const openType = (position) => {
    // const abrir = setSinksOpenType.map((op, index)=>{
    //   if (index === position) {
    //     return{open:true}
    //   }
    // })
    // setSinksOpenType(abrir)
    setTypeA(true)
  }

  async function openJohnson(type){
    console.log("🚀 ~ file: Johnson-4-Data.jsx ~ line 112 ~ openJohnson ~ type", type)
    const forType = jsonList.filter((element)=> element.type === type )
    console.log("🚀 ~ file: Johnson-4-Data.jsx ~ line 119 ~ openJohnson ~ forType", forType)
    setListType(forType)
    setOpenJson(true)
    setTypeA(false)
  }

  const closeJohnson = (position) => {
    setOpenJson(false)
  }
  const datos = (value, index, key) => {
    console.log("🚀 ~ file: Johnson-4-Data.jsx ~ line 129 ~ datos ~ value", value)
    const fields = sinks
    fields[index][key] = value?.target?.value || value;
    setSinks([...sinks])
  }
  
  const addSink = (index) => {
    if (sinks.length < 10) {
      setSinks([...sinks, { accesories: [], instalation: "", jhonson: "", quantity: "" }])
      setSinksOpenType([...sinksOpenType, {open:false}])
      setSinksOpen([...sinksOpen, {open:false}])
      openType()

      console.log("agregado")
    }
  }

  async function creatingSink(event) {
    event.preventDefault()
    let sink = JSON.parse(localStorage.getItem('sink'))

    let stock = {
      comments: comments?.current?.value.trim(),
      done: false
    }
    instalation ? (sink.instalation = instalation) : sink.instalation = "instalacion lateral"
    sink.accesories = accesorysAdd
    if (typeCode === "interno") {
      stock.internal = codigo
      stock.note = null
    }
    else if (typeCode === "pedido") {
      stock.note = codigo
      stock.internal = null
    }
    stock.sink = [{ ...sink }]
    localStorage.setItem('stock', JSON.stringify(stock))
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
                <div className='cajaCheck mb10' >
                  <div className='flex inputGrow mb10-lit'>
                    <label className='input-label'>ID</label>
                    <input className='inputCodigo inputGrow' id={"codigo"} name='codigo' onChange={(e) => setCodigo(e.target.value)} required />
                  </div>
                  <div className='flex inputGrow center'>
                    <label className='ml10 labelCheck' >
                      <input type="radio" id={`interno`} name={`typeCode`} value='interno' required onChange={(e) => setTypeCode(e.target.value)} />Cod Interno
                    </label>
                    <label className='ml10 labelCheck' >
                      <input type="radio" id={`pedido`} name={`typeCode`} value='pedido' required onChange={(e) => setTypeCode(e.target.value)} />Nota de Pedido
                    </label>
                  </div>
                </div>
                {
                  johnsonSelect.instalation?.length > 0 ?
                    (
                      <div className=' checksInstalation mb10' >
                        <div>
                          <label>Inst: </label>
                        </div>
                        {
                          johnsonSelect.instalation?.map((op, index) =>
                            <label key={index} className='ml10 labelCheck flex center center-lit inputGrow' name="checkbox-group" >
                              <input type='checkbox' id={`instalation-${index + 1}`} name="checkbox-group" value={op} onChange={(e) => addInstalacion(e.target.value)} />{op}
                            </label>
                          )
                        }
                      </div>
                    ) : null
                }
                <div className='mb10 flex'>
                  <label htmlFor='comentario' className='input-label'>COMENTARIO: </label>
                  <input className='inputCodigo inputGrow' id='comentario' type='text' ref={comments} />
                </div>

                {
                  sinks.map((element, index) =>
                    <div className='flex mb10-lit' key={index} >
                      <label className='input-label'>{`Pileta${index + 1} cant:`}</label>
                      <input className='inputCodigo ' value={element.quantity} id={"cantidad"} name='cantidad' onChange={(e) => datos(e, index, 'quantity')} required />
                      <button type='button' className='btnAdd botonAddAcc' onClick={(e) => openAcc(index)}>agregar Accesorios</button>

                      <Dialog open={sinksOpen[index]?.open} >
                        <DialogContent>
                          <DialogContentText>{`ACCESORIOS Pileta${index + 1}:`}</DialogContentText>
                          <div className='itemsEditAcc'>
                            {accesoriesList.map((item) => (
                              <button
                                onClick={() => addAccesory(item._id, index, "accesories", item)}
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
                                    {sinks[index].accesories?.includes(item._id) ?
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
                          <Button onClick={() => closeAcc(index)}>Listo</Button>
                          <Button onClick={() => closeAcc(index)}>Cancelar</Button>
                        </DialogActions>
                      </Dialog>

                      <Dialog open={typeA} >
                        <DialogContent>
                          <DialogContentText>{`Agregar pileta${index + 1}:`}</DialogContentText>
                          <h4>Tipo de acero:</h4>
                          <div className='tipoAc'>
                          {/* <MenuItem value={"A304"} onChange={}>{"A304"}</MenuItem>
                          <MenuItem value={"A430"}>{"A430"}</MenuItem> */}
                          <button type='button' className='btnForm' onClick={() => openJohnson("A304")}>A304</button>
                          <button type='button' className='btnForm' onClick={() => openJohnson("A430")}>A430</button>
                          </div>
                        </DialogContent>
                        <DialogActions>
                          {/* <Button onClick={() => setTypeA(false)}>Siguiente</Button> */}
                          <Button onClick={() => setTypeA(false)}>Cancelar</Button>
                        </DialogActions>
                      </Dialog>

                      <Dialog open={openJson} >
                        <DialogContent>
                          <DialogContentText>{`Johnson${index + 1}:`}</DialogContentText>
                          <div className='itemsEditAcc'>
                            {listType.map((item) => (
                              <button
                                onClick={() => datos(item._id, index, 'jhonson')}
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
                                    <h5 className='h5DescAcc codejson'>{item.code}</h5>
                                    {sinks[index].jhonson?.includes(item._id) ?
                                      <CheckCircleIcon className="addIconAcc" />
                                      :
                                      <RadioButtonUncheckedIcon className="deletIconAcc" />}
                                  </div>
                                  <p className='pDescAcc pxyz'>{item.x} x {item.y} x {item.z} </p>
                                </div>
                              </button>
                            ))}
                          </div>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={() => closeJohnson(index)}>Listo</Button>
                          <Button onClick={() => closeJohnson(index)}>Cancelar</Button>
                        </DialogActions>
                      </Dialog>
                    </div>)

                }

              </div>
              <div className='btnesFormJson'>
                <button type='button' className='btnForm ' onClick={addSink}>agregar</button>
                <input type="submit" required value='Finalizar' className='btnForm ' />

              </div>

            </form>

          </div>

        </div>

      </Container>
    </Container >
  )

}
    