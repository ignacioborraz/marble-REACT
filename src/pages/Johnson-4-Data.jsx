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
  let sink = JSON.parse(localStorage.getItem('sink'))
  const jhonson = sink.jhonson
  console.log("🚀 ~ file: Johnson-4-Data.jsx ~ line 23 ~ JohnsonData ~ jhonson", jhonson)
  const dispatch = useDispatch()
  const [codigo, setCodigo] = useState("")
  const [instalation, setInstalation] = useState("")
  const [typeCode, setTypeCode] = useState("")
  const [accesorysAdd, setAccesorysAdd] = useState([])
  const [reload, setReload] = useState(false)
  const [sinks, setSinks] = useState([{ accesories: [], instalation: [], jhonson: jhonson, quantity: "" }])
  const [sinksOpen, setSinksOpen] = useState([{ open: false }])
  const [sinksOpenType, setSinksOpenType] = useState([{ open: false }])
  const [typeA, setTypeA] = useState(false)
  const [openJson, setOpenJson] = useState(false)
  const [instJson, setInsJson] = useState([])
  console.log("🚀 ~ file: Johnson-4-Data.jsx ~ line 38 ~ JohnsonData ~ instJson", instJson)

  console.log("🚀 ~ file: Johnson-4-Data.jsx ~ line 35 ~ JohnsonData ~ sinksOpen", sinksOpen)
  console.log("🚀 ~ file: Johnson-4-Data.jsx ~ line 31 ~ JohnsonData ~ sinks", sinks)

  useEffect(() => {
    dispatch(johnsonActions.getOneJohnson(jhonson))
    dispatch(johnsonActions.getAccesory())
    // eslint-disable-next-line
  }, [reload])

  const johnsonSelect = useSelector(store => store.johnsonReducer.oneJohnson)
  console.log("🚀 ~ file: Johnson-4-Data.jsx ~ line 50 ~ JohnsonData ~ johnsonSelect", johnsonSelect)
  const accesoriesList = useSelector(store => store.johnsonReducer.accesorys)
  const [sinkInsta, setSinkInsta] = useState([{ instalation: [] }])

  const addAccesory = (id, index, key) => {
    let fields = sinks
    if (fields[index].accesories.includes(id)) {
      console.log("ya esta en la lista")
      const filtrado = fields[index].accesories.filter(e => e !== id)
      fields[index][key] = filtrado;
      setSinks([...sinks])
      console.log("👾 ~ file: Johnson-4-Data.jsx ~ line 67 ~ addAccesory ~ filtrado", filtrado)
      console.log("👺 ~ file: Johnson-4-Data.jsx ~ line 67 ~ addAccesory ~ fields", fields)
    }
    else {
      fields[index].accesories.push(id);
      setSinks[index]?.accesories([...sinks[index].accesories, ...fields[index].accesories])
      console.log("🚀 ~ file: Johnson-4-Data.jsx ~ line 54 ~ addAccesory ~ fields", fields)
      console.log("agregado")
    }
    setReload(!reload)
  }
  let lista = []
  const addInstalacion = (elem, index, key) => {
    console.log("🚀 ~ file: Johnson-4-Data.jsx ~ line 89 ~ addInstalacion ~ elem", elem)
    let listInst = sinks
    if (listInst[index].instalation.includes(elem)) {
      console.log("ya esta en la lista")
      const filtrado = listInst[index].instalation.filter(e => e !== elem)
      listInst[index][key] = filtrado;
      setSinks([...sinks])
    }
    else {
      listInst[index].instalation.push(elem)
      console.log("🚀 ~ file: Johnson-4-Data.jsx ~ line 99 ~ addInstalacion ~ listInst", listInst)
      lista?.push(elem);
      setSinks[index]?.instalation([...sinks[index].instalation, ...listInst])
      console.log("🚀 ~ file: Johnson-4-Data.jsx ~ line 51 ~ addAccesory ~ lista", lista)
      console.log(sinks)
      console.log("agregado")
    }
    setReload(!reload)
  }
  const openAcc = (position) => {
    const abrir = sinksOpen.map((op, index) => {
      if (index === position) {
        return { open: true }
      }
    })
    setSinksOpen(abrir)
    console.log(sinksOpen)
  }
  const closeAcc = (position) => {
    const cerrar = sinksOpen.map((op, index) => {
      if (index === position) {
        return { open: false }
      }
    })
    setSinksOpen(cerrar)
    console.log(sinksOpen)
  }
  const openType = (position) => {
    setTypeA(true)
  }

  async function openJohnson(type) {
    console.log("🚀 ~ file: Johnson-4-Data.jsx ~ line 112 ~ openJohnson ~ type", type)
    const res = await dispatch(johnsonActions.getJohnsonType(type))
    setOpenJson(true)
    setTypeA(false)
  }
  const listJSON = useSelector(store => store.johnsonReducer.johnsonType)
  //console.log("🚀 ~ file: Johnson-4-Data.jsx ~ line 128 ~ JohnsonData ~ list", listJSON)


  const closeJohnson = (position) => {
    setOpenJson(false)
  }
  const datos = (value, position, key, item) => {
    console.log("🚀 ~ file: Johnson-4-Data.jsx ~ line 134 ~ datos ~ item", item)
    console.log("🚀 ~ file: Johnson-4-Data.jsx ~ line 129 ~ datos ~ value", value)
    const fields = sinks
    fields[position][key] = value?.target?.value || value;
    setSinks([...sinks])
    setInsJson(item)

    if (item !== undefined) {
      const insta = sinkInsta
      insta[position]["instalation"] = item?.instalation
      setSinkInsta([...sinkInsta])
    }
  }

  const addSink = (index) => {
    const insta = sinkInsta
    insta[0]["instalation"] = johnsonSelect.instalation
    setSinkInsta([...sinkInsta])

    if (sinks.length < 10) {
      setSinks([...sinks, { accesories: [], instalation: [], jhonson: "", quantity: "" }])
      setSinksOpenType([...sinksOpenType, { open: false }])
      setSinksOpen([...sinksOpen, { open: false }])
      setSinkInsta([...sinkInsta, { instalation: [] }])
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
                  <div className='flex inputGrow center '>
                    <label className='ml10 labelCheck' >
                      <input type="radio" id={`interno`} name={`typeCode`} value='interno' required onChange={(e) => setTypeCode(e.target.value)} />Cod Interno
                    </label>
                    <label className='ml10 labelCheck' >
                      <input type="radio" id={`pedido`} name={`typeCode`} value='pedido' required onChange={(e) => setTypeCode(e.target.value)} />Nota de Pedido
                    </label>
                  </div>
                </div>
                
                {
                  sinks.length === 1 ?
                    (
                      johnsonSelect.instalation?.length > 0 ?
                        (
                          <div className=' checksInstalation mb10' >
                            <div>
                              <label>Inst: </label>
                            </div>
                            {
                              johnsonSelect.instalation?.map((op, indice) =>
                                <button
                                  type='button'
                                  onClick={(e) => addInstalacion(op, 0, "instalation")}
                                  key={indice}
                                  className='boxItemIns'>{op} {sinks[0]?.instalation?.includes(op) ?
                                    <CheckCircleIcon className="addIconAcc" />
                                    :
                                    <RadioButtonUncheckedIcon className="deletIconAcc2" />}</button>
                              )
                            }
                          </div>
                        ) : null

                    ) : null

                }
                <div className='mb10 flex'>
                  <label htmlFor='comentario' className='input-label'>COMENTARIO: </label>
                  <input className='inputCodigo inputGrow' id='comentario' type='text' ref={comments} />
                </div>

                {
                  sinks.map((element, index) =>
                    <div className='flex mb10-lit cajaCodJson' key={index} >
                      <div className='flex'>

                        <label className='input-label'>{`Pileta${index + 1} cant:`}</label>
                        <input className='inputCodigo ' value={element.quantity} id={"cantidad"} name='cantidad' onChange={(e) => datos(e, index, 'quantity')} required />
                        <button type='button' className='btnAdd botonAddAcc' onClick={(e) => openAcc(index)}>agregar Accesorios</button>
                      </div>

                      <div>
                        {
                          sinkInsta[index]?.instalation?.length > 0 ?
                            (
                              <div className=' checksInstalation mb10' >
                                <div>
                                  <label>{`Inst${index + 1}:`}</label>
                                </div>
                                {
                                  sinkInsta[index]?.instalation?.map((op, indice) =>
                                    <button
                                      type='button'
                                      onClick={(e) => addInstalacion(op, index, "instalation")}
                                      key={indice}
                                      className='boxItemIns'>{op} {sinks[index]?.instalation?.includes(op) ?
                                        <CheckCircleIcon className="addIconAcc" />
                                        :
                                        <RadioButtonUncheckedIcon className="deletIconAcc2" />}</button>
                                  )
                                }
                              </div>
                            ) : null
                        }
                      </div>
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
                            <button type='button' className='btnForm' onClick={() => openJohnson("A304")}>A304</button>
                            <button type='button' className='btnForm' onClick={() => openJohnson("A430")}>A430</button>
                          </div>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={() => setTypeA(false)}>Cancelar</Button>
                        </DialogActions>
                      </Dialog>

                      <Dialog open={openJson} >
                        <DialogContent>
                          <DialogContentText>{`Johnson${index + 1}:`}</DialogContentText>
                          <div className='itemsEditAcc'>
                            {listJSON.map((item) => (
                              <button
                                onClick={() => datos(item._id, index, 'jhonson', item)}
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
