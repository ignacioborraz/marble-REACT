import { useRef } from 'react'
import React, { useEffect } from 'react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import johnsonActions from '../redux/actions/johnsonActions';
import sinkActions from '../redux/actions/sinkActions';
import Container from '../components/Container'
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import stockActions from '../redux/actions/stockActions';

export default function JohnsonData() {
  const navigate = useNavigate()
  const comments = useRef()
  let sink = JSON.parse(localStorage.getItem('sink'))
  const jhonson = sink.jhonson
  console.log("🚀 ~ file: Johnson-4-Data.jsx ~ line 23 ~ JohnsonData ~ jhonson", jhonson)
  const dispatch = useDispatch()
  const [codigo, setCodigo] = useState("")
  const [typeCode, setTypeCode] = useState("")
  const [reload, setReload] = useState(false)
  const [sinks, setSinks] = useState([{ accesories: [], instalation: [], jhonson: jhonson, quantity: "" }])
  const [sinksOpen, setSinksOpen] = useState([{ open: false }])
  const [typeA, setTypeA] = useState([{ open: false }])
  const [openJson, setOpenJson] = useState([{ open: false }])

  console.log("🚀 ~ file: Johnson-4-Data.jsx ~ line 31 ~ JohnsonData ~ sinks", sinks)

  useEffect(() => {
    dispatch(johnsonActions.getOneJohnson(jhonson))
    dispatch(johnsonActions.getAccesory())
    // eslint-disable-next-line
  }, [reload])

  const johnsonSelect = useSelector(store => store.johnsonReducer.oneJohnson)
  console.log("🚀 ~ file: Johnson-4-Data.jsx ~ line 55 ~ JohnsonData ~ johnsonSelect", johnsonSelect)

  const listaNEW = useSelector(store => store.sinkReducer.sinkCreate)

  console.log("🚀 ~ file: Johnson-4-Data.jsx ~ line 50 ~ JohnsonData ~ listaNEW", listaNEW)
  //console.log("🚀 ~ file: Johnson-4-Data.jsx ~ line 50 ~ JohnsonData ~ johnsonSelect", johnsonSelect)
  const accesoriesList = useSelector(store => store.johnsonReducer.accesorys)
  const [sinkInsta, setSinkInsta] = useState([{ instalation: [], type: "", code: "" }])
  console.log("🚀 ~ file: Johnson-4-Data.jsx ~ line 63 ~ JohnsonData ~ sinkInsta", sinkInsta)

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
    console.log("🚀 ~ file: Johnson-4-Data.jsx ~ line 106 ~ openAcc ~ lista", lista)
    const abrir = sinksOpen.map((op, index) => {
      if (index === position) {
        return { open: true }
      }
    })
      setSinksOpen(abrir)
  }
  const closeAcc = (position) => {
    const cerrar = sinksOpen.map((op, index) => {
      if (index === position) {
        return { open: false }
      }
    })
      setSinksOpen(cerrar)
  }
  const openType = (position) => {
    const abrir = typeA.map((op, index) => {
      if (index === position) {
        return { open: true }
      }
    })
      setTypeA(abrir)
  }
  const closeType = (position) => {
    const cerrar = typeA.map((op, index) => {
      if (index === position) {
        return { open: false }
      }
    })
      setTypeA(cerrar)
  }
  const openSinksJson = (position) => {

    const abrir = openJson.map((op, index) => {
      if (index === position) {
        return { open: true }
      }
    })
      setOpenJson(abrir)
  }
  const closeSinksJson = (position) => {
    const cerrar = openJson.map((op, index) => {
      if (index === position) {
        return { open: false }
      }
    })
      setOpenJson(cerrar)
  }

  async function openJohnson(type, index) {
    console.log("🚀 ~ file: Johnson-4-Data.jsx ~ line 112 ~ openJohnson ~ type", type)
    const res = await dispatch(johnsonActions.getJohnsonType(type))
    openSinksJson(index)
    closeType(index)
    setReload(!reload)
  }
  const listJSON = useSelector(store => store.johnsonReducer.johnsonType)
  //console.log("🚀 ~ file: Johnson-4-Data.jsx ~ line 128 ~ JohnsonData ~ list", listJSON)

  const datos = (value, position, key, item) => { //carga datos
    console.log("🚀 ~ file: Johnson-4-Data.jsx ~ line 134 ~ datos ~ item", item)
    console.log("🚀 ~ file: Johnson-4-Data.jsx ~ line 129 ~ datos ~ value", value)
    const fields = sinks
    fields[position][key] = value?.target?.value || value;
    setSinks([...sinks])


    if (item !== undefined) {
      const insta = sinkInsta
      insta[position]["instalation"] = item?.instalation
      insta[position]["type"] = item?.type
      insta[position]["code"] = item?.code
      setSinkInsta([...sinkInsta])
    }
  }
  const addSink = (index) => {  //agrega mas piletas
    const insta = sinkInsta
    insta[0]["instalation"] = johnsonSelect.instalation
    setSinkInsta([...sinkInsta])

    if (sinks.length < 10) {
      setSinks([...sinks, { accesories: [], instalation: [], jhonson: "", quantity: "" }])
      setSinksOpen([...sinksOpen, { open: false }])
      setTypeA([...typeA, { open: false }])
      setOpenJson([...openJson, { open: false }])
      setSinkInsta([...sinkInsta, { instalation: [], type: "", code: "" }])
      //openType()

      console.log("agregado")
    }
  }
  const deleteInput = (index) => {
    if (index !== 0) {
      console.log("🚀 ~ file: Johnson-4-Data.jsx ~ line 163 ~ deleteInput ~ index", index)
      const fields = sinks
      fields.splice(index, 1)
      setSinks([...fields])
    }

  }
  async function creatingSink(event) {
    event.preventDefault()
    const listaId = []
    let listInst = sinks
    for (let i = 0; i < listInst.length; i++) {
      if (listInst[i].instalation.length === 0) {
        listInst[i].instalation.push("instalacion lateral")
        setSinks[i]?.instalation([...sinks[i].instalation, ...listInst])
      }
      const resp = await dispatch(sinkActions.createSink(sinks[i]))
      console.log("🚀 ~ file: Johnson-4-Data.jsx ~ line 176 ~ creatingSink ~ resp", resp)
      listaId.push(resp._id)
    }
    console.log("🚀 ~ file: Johnson-4-Data.jsx ~ line 174 ~ creatingSink ~ listaId", listaId)
    creatingStock(listaId)




  }
  async function creatingStock(lis) {
    console.log("🚀 ~ file: Johnson-4-Data.jsx ~ line 181 ~ creatingStock ~ l", lis)
    let data = {}
    if (typeCode === "interno") {
      data = {
        sink: lis,
        internal: codigo,
        note: null,
        done: false,
        comments: comments?.current?.value.trim()

      }
    }
    else {
      data = {
        sink: lis,
        internal: null,
        note: codigo,
        done: false,
        comments: comments?.current?.value.trim()
      }
    }
    await dispatch(stockActions.createStock(data))
      .then(navigate("/", { replace: true }))
  }

  return (
    <Container grow='1' wrap='wrap' bgColor='rgb(224,224,224)' >
      <Container width='100%' justify='space-evenly' align='center' wrap='wrap'>
        <div className="containerForm formSink">
          <div className='mask2'>
            <form onSubmit={creatingSink} className="form" >
              <h1 className='titleForm'>CARGAR PILETA</h1>
              <div className='containerDatosForm containerDatosForm-sinks'>
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

                <div className='mb10 flex '>
                  <label htmlFor='comentario' className='input-label'>COMENTARIO: </label>
                  <input className='inputCodigo inputGrow' id='comentario' type='text' ref={comments} />
                </div>

                {
                  sinks.map((element, index) =>
                    <div className='flex mb10-lit cajaCodJson' key={index} >
                      <div className='flex cajaInputAcc'>
                        {
                          index === 0 ?
                            (
                              <div className='boxItemJson '>
                                <div className='boxNewSink box0json'>
                                  <label className='input-label'>{`Pileta${index + 1}`}</label>
                                  <div className='itemsSink'>
                                    <input type='button' value={johnsonSelect.type} className='btnAddJsonform2'  /*onClick={() => setTypeA(true)}*/ />
                                    <input type='button' value={johnsonSelect.code} className='btnAddJsonform2 btnAddjson-code' /*onClick={() =>setOpenJson(true)}*/ />
                                    <input placeholder='Cant' className='inputCodigo inputCod2' value={element.quantity} id={"cantidad"} name='cantidad' onChange={(e) => datos(e, index, 'quantity')} required />
                                    <button type='button' className='btnAdd btnAddjson btnAddjson2' onClick={() => openAcc(index)}>Accesorios</button>

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

                                }

                              </div>
                            ) :
                            <div className='boxNewSink'>
                              <label className='input-label'>{`Pileta${index + 1}`}</label>
                              <div className='itemsSink'>
                                <input type='button' value={sinkInsta[index].type ? (sinkInsta[index].type) : "Acero"} className='btnAddJsonform2' onClick={() => openType(index)} />
                                <input type='button' value={sinkInsta[index].code ? (sinkInsta[index].code) : "Modelo"} className='btnAddJsonform2 btnAddjson-code' onClick={() => openJohnson(sinkInsta[index].type ,index)} />{``}
                                <input placeholder='Cant' className='inputCodigo inputCod2' value={element.quantity} id={"cantidad"} name='cantidad' onChange={(e) => datos(e, index, 'quantity')} required />
                                {/* <button type='button' className='btnAdd btnAddjson' onClick={() => openAcc(index)}>Instalacion</button> */}
                                <button type='button' className='btnAdd btnAddjson btnAddjson2 ' onClick={() => openAcc(index)}>Accesorios</button>
                                {
                                  index > 0 ?
                                    <button className='ml10 btnDelet' type='button' onClick={() => deleteInput(index)} ><DeleteForeverIcon className='iconDelet' /></button>
                                    : null
                                }
                              </div>

                            </div>
                        }

                      </div>
                      <div>
                        {
                          index > 0 && sinkInsta[index]?.instalation?.length > 0 ?
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

                      <Dialog open={typeA[index]?.open} >
                        <DialogContent>
                          <DialogContentText>{`Agregar pileta${index + 1}:`}</DialogContentText>
                          <h4>Tipo de acero:</h4>
                          <Container width='100%' justify='space-evenly' align='center' wrap='wrap'>
                            <button onClick={() => openJohnson("A304", index)} className="linkTypes  typesDialog">
                              <div className="bgType bgA304" >
                                <div className='mask'>
                                  <h1 className='titleCard johnsonTypeh1'>A304</h1>
                                </div>
                              </div>
                            </button>

                            <button onClick={() => openJohnson("A430", index)} className="linkTypes  typesDialog">
                              <div className="bgType bgA430" >
                                <div className='mask'>
                                  <h1 className='titleCard johnsonTypeh1'>A430</h1>
                                </div>
                              </div>
                            </button>
                          </Container>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={() => closeType(index)}>Cancelar</Button>
                        </DialogActions>
                      </Dialog>

                      <Dialog open={openJson[index]?.open} >
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
                          <Button onClick={() => closeSinksJson(index)}>Listo</Button>
                          <Button onClick={() => closeSinksJson(index)}>Cancelar</Button>
                        </DialogActions>
                      </Dialog>
                    </div>)

                }

              </div>
              <div className='btnesFormJson'>
                <button type='button' className='btnForm btnFormJSON' onClick={addSink}>agregar</button>
                <input type="submit" required value='Finalizar' className='btnForm btnFormJSON' />

              </div>

            </form>

          </div>

        </div>

      </Container>
    </Container >
  )

}
