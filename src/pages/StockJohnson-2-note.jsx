import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import sinkActions from '../redux/actions/sinkActions'
import stockActions from '../redux/actions/stockActions'
import codeActions from '../redux/actions/codeActions'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import johnsonActions from '../redux/actions/johnsonActions';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import Container from '../components/Container'

export default function StockNoteJohnson() {
  const dispatch = useDispatch()
  const [inputSearch, setInputSearch] = useState("")
  const [reload, setReload] = useState(false)
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openAcc, setOpenAcc] = useState(false)
  const [typeA, setTypeA] = useState(false)
  const [openJson, setOpenJson] = useState(false)
  const [instalationType, setInstalationType] = useState(false)

  const [itemModif, setItemModif] = useState("")//index sink
  const [indexCode, setIndexCode] = useState("")
  const [idDelet, setIdDelet] = useState("")
  const [idDeletStock, setIdDeletStock] = useState("")
  const [cantStockDelet, setCantStockDelet] = useState("")
  const [id, setId] = useState("")//id Code
  const [sinks, setSinks] = useState([])
  const [comment, setComment] = useState("")
  const [accesories, setAccesories] = useState([])
  const [accesorysAdd, setAccesorysAdd] = useState([])
  const [instalation, setInstalation] = useState([])
  const [typeInstalation, setTypeInstalation] = useState([])
  const [clase, setClase] = useState([]);//clase para btn editar
  const [newJohnson, setNewJohnson] = useState("")

  console.log("🚀 ~ file: StockJohnson-2-note.jsx ~ line 32 ~ StockNoteJohnson ~ sinks", sinks)
  console.log("🚀 ~ file: StockJohnson-2-note.jsx ~ line 33 ~ StockNoteJohnson ~ comment", comment)
  useEffect(() => {
    dispatch(codeActions.getCode())
    dispatch(codeActions.noteCode())
    dispatch(johnsonActions.getAccesory())
    // eslint-disable-next-line
  }, [reload])
  useEffect(() => {
    dispatch(codeActions.filterNoteCode(inputSearch)) 
    // eslint-disable-next-line
  }, [reload, inputSearch])

  let code = useSelector(state => state.codeReducer.code)
  console.log("👀 ~ file: StockJohnson-2-note.jsx ~ line 61 ~ StockNoteJohnson ~ code", code)
  let noteCode = useSelector(state => state.codeReducer.noteCode)
  console.log("👀NOTE ~ file: StockJohnson-2-note.jsx ~ line 63 ~ StockNoteJohnson ~ noteCode", noteCode)

  let filterNoteCode = useSelector(store => store.codeReducer.filterNoteCode)
  console.log("🚀 ~ file: StockJohnson-2-note.jsx ~ line 65 ~ StockNoteJohnson ~ filterNoteCode", filterNoteCode)
  const accesoriesList = useSelector(store => store.johnsonReducer.accesorys)

  const handleClickOpenAlert = (idCode, idStock , cantStock) => {
    console.log("🚀 ~ file: StockJohnson-2-note.jsx ~ line 71 ~ handleClickOpenAlert ~ idStock", idStock)
    console.log("🚀 ~ file: StockJohnson-2-note.jsx ~ line 71 ~ handleClickOpenAlert ~ cantStock", cantStock)
    setIdDelet(idCode)
    setIdDeletStock(idStock)
    setCantStockDelet(cantStock)
    setOpenAlert(true)
  }
  const handleCloseDelet = () => {
    setOpenAlert(false)
  };
  const handleClose = () => {
    setOpen(false);
    //setOpenAcc(false)
  };
  const handleChangeInsta = (event) => {
    const {
      target: { value },
    } = event;
    setInstalation(
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  //Activa y setea datos
  const editFields = (item, id, listSinks, comments) => {
    console.log("🚀 ~ file: StockJohnson-2-note.jsx ~ line 142 ~ editFields ~ item", item)
    let list = []
    filterNoteCode.map(elem => list.push({ clase: "" }))
    //console.log("🚀 ~ file: StockJohnson-2-note.jsx ~ line 107 ~ editFields ~ list", list)
    for (let i = 0; i < list.length; i++) {
      if (i === item) {
        list[i].clase = "divEdit"
      }
    }
    setIndexCode(item)
    setClase(list)
    setId(id);
    setSinks(listSinks)
    setComment(comments)
    setReload(!reload)
  };
  //captura y guarda datos en sinks
  const datos = (value, position, key) => {
    console.log("🚀 ~ file: StockJohnson-2-note.jsx ~ line 116 ~ datos ~ position", position)
    console.log("🚀 ~ file: Johnson-4-Data.jsx ~ line 129 ~ datos ~ value", value)
    let fields = sinks
    if (key === "jhonson" || key === "accesories" || key === "instalation") {
      fields[position].sink[key] = value
    }
    else {
      fields[position][key] = value?.target?.value || value;
    }
    
    setSinks([...sinks])
    setOpenJson(false)
    setInstalationType(false)
    setReload(!reload)
  }
  //elimina item Stock o Code
  async function delet(idCode, idStock, cantStock) {
    if (cantStock === 1) {
      await dispatch(codeActions.deleteCode(idCode))
    }
    else{
      await dispatch(stockActions.deleteStock(idStock))
    }
    setOpenAlert(false)
    setReload(!reload)
  }
  //tipo de acero
  const openType = (position, johnson) => {
    setItemModif(position)
    setNewJohnson(johnson)
    setTypeA(true)
  }
  const closeType = () => {
    setTypeA(false)
  }
  //piletas johnson
  async function openJohnson(type) {
    console.log("🚀 ~ file: Johnson-4-Data.jsx ~ line 112 ~ openJohnson ~ type", type)
    await dispatch(johnsonActions.getJohnsonType(type))
    setOpenJson(true)
    setTypeA(false)
    setReload(!reload)
  }
  const listJSON = useSelector(store => store.johnsonReducer.johnsonType)
  // console.log("🚀 ~ file: StockJohnson-2-note.jsx ~ line 152 ~ StockNoteJohnson ~ listJSON", listJSON)
  //Modif. instalacion
  //Instalacion tipos
  const cargaJohnson = () => {
    datos(newJohnson, itemModif, "jhonson")
    setOpenAcc(false)
    setReload(!reload)
  }
  const openInstalationType = (position, listInstalacion) => {
    setItemModif(position)
    setInstalationType(true)
    setInstalation(listInstalacion)
    setTypeInstalation(sinks[position].sink.jhonson.instalation)//carga los tipos disponibles de instalacion que tenga ese sink
    console.log("==============>typeImstalation", typeInstalation)
    console.log("🚀 ~ file: StockJohnson-2-note.jsx ~ line 164 ~ openInstalationType ~ sinks[position].sink.jhonson", sinks[position].sink.jhonson.instalation)
  }
  //agragar Accesorios
  const handleClickAccesorios = (ind, listAcc) => {
    setOpenAcc(true)
    setItemModif(ind)
    setAccesories(listAcc)
    let ac = []
    listAcc.forEach(element => {
      ac.push(element._id)
    });
    console.log(ac)
    setAccesorysAdd(ac)//solo los id de los accesorios
  }
  const addAccesory = (id, elem) => {
    if (accesorysAdd.includes(id)) {
      console.log("ya esta en la lista")
      setAccesorysAdd(accesorysAdd.filter(x => x !== id))
      setAccesories(accesories.filter(x => x._id !== elem._id))
    }
    else {
      setAccesorysAdd([...accesorysAdd, id])
      setAccesories([...accesories, elem])
      console.log("agregado")
    }

  }
  const cargaAccSinks = (listaAcc, position) => {
    datos(listaAcc, position, "accesories")
    setOpenAcc(false)
    setReload(!reload)
  }
  async function modificar() {
    let data = {}
    data = {
      comments: comment
    }
    for (let i = 0; i < sinks.length; i++) {
      if (sinks[i].sink.jhonson.instalation?.length === 0) {
        datos(["instalacion lateral"], i, "instalation")
      }
      datos(sinks[i].sink.jhonson._id, i, "jhonson") //me pasa solo el id de jhonson
      const listaIdAccesories = []
      sinks[i].sink.accesories.map(acc => listaIdAccesories.push(acc._id))
      datos(listaIdAccesories, i, "accesories")
      console.log("🚀 ~ file: StockJohnson-2-note.jsx ~ line 226 ~ sinks.map ~ index", i)
      let dataStock = {
        stock:sinks[i].stock
      }
      const resp = await dispatch(sinkActions.putSink(sinks[i].sink._id, sinks[i].sink))
      await dispatch(stockActions.putStock(sinks[i]._id, dataStock))
      await dispatch(codeActions.putCode(id, data))
      console.log("🚀 ~ file: Johnson-4-Data.jsx ~ line 176 ~ creatingSink ~ resp", resp)
      setClase([])
      setReload(!reload)
    }


  }
  async function entregarStock(idCode) {
    console.log("🚀 ~ file: StockJohnson-2-note.jsx ~ line 208 ~ entregarStock ~ idStock", idCode)
    let data = {
      done: true
    }
    await dispatch(codeActions.putCode(idCode, data))
    setClase([])
    setReload(!reload)
  }

  return (
    <div className='containerStock'>
      <div className='containerNameStock vendidas'>
        <div className='mask4'>
          <h1 className='titleStock'>Vendidas</h1>
        </div>
      </div>
      <div className='containerInput'>
        <input className='input inputStock inputAlignCenter' type="text" placeholder='Buscar por nota' onChange={(e) => setInputSearch(e.target.value)} />
      </div>

      {
        filterNoteCode?.map((code, index) =>
        (
          <div key={code._id} className='boxStockCard'>
            <div className='boxStockCard-note'>
              <h3>Nota</h3>
              <h3>{code.note}</h3>
            </div>
            <div className='boxStockCard-containerSink'>
              {
                code?.stock?.map((stock, indexSink) =>
                (
                  <div key={stock._id} className='boxStockCard-sink'>
                    <img src={stock.sink?.jhonson?.photo} alt={stock._id} className='boxStockCard-photo' id={stock._id} />
                    <div className='boxStockCard-data'>
                      <table className="table-fill">
                        <tbody className="table-hover">
                          <tr>
                            <td className="text-left1">Cantidad</td>
                            <td className="text-left">
                              <div className={clase[index]?.clase} onInput={(event) => datos(event.currentTarget.textContent, indexSink, "stock")} contentEditable suppressContentEditableWarning={true}>
                                {stock.stock}
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-left1">Modelo</td>
                            <td className="text-left">
                              <div className='divBtntdEdit'>
                                <div>{stock.sink?.jhonson?.code}</div>
                                <button className={clase[index]?.clase ? 'btnModificar' : 'displeyNone'} onClick={() => openType(indexSink, stock.sink.jhonson)}>Cambiar</button>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-left1">Accesorios</td>
                            <td className="text-left">
                              <div className='divBtntdEdit'>
                                <div>
                                  {stock.sink?.accesories?.map((i, index) =>
                                    <span key={index}>{i.code + " - "}</span>)}
                                </div>
                                <button className={clase[index]?.clase ? 'btnModificar' : 'displeyNone'} onClick={() => handleClickAccesorios(indexSink, stock.sink.accesories)}>Agregar</button>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-left1">Instalacion</td>
                            <td className="text-left">
                              <div className='divBtntdEdit'>
                                <div>{stock.sink?.instalation?.map((i, index) =>
                                  <span key={index}>{i + " - "}</span>)}</div>
                                <button className={clase[index]?.clase ? 'btnModificar' : 'displeyNone'} onClick={() => openInstalationType(indexSink, stock.sink.instalation)}>Cambiar</button>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-left1">Comentarios</td>
                            <td className="text-left">
                              <div className={clase[index]?.clase} onInput={(event) => setComment(event.currentTarget.textContent)} contentEditable suppressContentEditableWarning={true}>
                                {code.comments}
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div className='cajaBtnDelet'>
                        <button className='btnEliminar' type='button' onClick={() => handleClickOpenAlert(code._id, stock._id, code.stock.length )}>Eliminar</button>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
            <div className='boxStockCard-botones'>
              <button onClick={() => modificar()} className={clase[index]?.clase ? 'btnModificarGuardar' : 'displeyNone'} type='button' >Guardar Cambios</button>
              <button onClick={() => editFields(index, code._id, code.stock, code.comments)} className='btnEditar' type='button' >Editar</button>
              <button onClick={() => entregarStock(code._id)} className='btnEntregar' type='button' >Entregar</button>
              {/* <button className='btnEliminar' type='button' onClick={() => handleClickOpenAlert(code._id)}>Eliminar</button> */}
            </div>
            <Dialog className='dialogDelet' open={openAlert} onClose={handleClose}>
              <DialogContent  >
                <DialogContentText>
                  Esta seguro que desea eliminar?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => delet(idDelet, idDeletStock, cantStockDelet)}>Confirmar</Button>
                <Button onClick={handleCloseDelet}>Cancelar</Button>
              </DialogActions>
            </Dialog>

            <Dialog open={typeA} >
              <DialogContent>
                <DialogContentText>{`Modificar pileta${index + 1}:`}</DialogContentText>
                <h4>Tipo de acero:</h4>
                <Container width='100%' justify='space-evenly' align='center' wrap='wrap'>
                  <button onClick={() => openJohnson("A304")} className="linkTypes  typesDialog">
                    <div className="bgType bgA304" >
                      <div className='mask'>
                        <h1 className='titleCard johnsonTypeh1'>A304</h1>
                      </div>
                    </div>
                  </button>

                  <button onClick={() => openJohnson("A430")} className="linkTypes  typesDialog">
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

            <Dialog open={openJson} >
              <DialogContent>
                <DialogContentText>{`Johnson${index + 1}:`}</DialogContentText>
                <div className='itemsEditAcc'>
                  {listJSON.map((item) => (
                    <button
                      // onClick={() => datos(item, itemModif, 'jhonson')}
                      onClick={() => setNewJohnson(item)}//setea el nuevo jhonson
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
                          <h5 className='h5DescAcc codejson'>{item?.code}</h5>
                          {newJohnson._id?.includes(item._id) ?
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
                <Button onClick={() => cargaJohnson()}>Listo</Button>

                <Button onClick={() => setOpenJson(false)}>Cancelar</Button>
              </DialogActions>
            </Dialog>

            <Dialog open={instalationType} >
              <DialogContent>
                <DialogContentText>{`Modificar Instalación${index + 1}:`}</DialogContentText>
                {
                  typeInstalation.length > 0 ?
                    <div className='instalacionBox'>
                      <InputLabel id="demo-multiple-chip-label">Instalación:</InputLabel>
                      <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip-label"
                        multiple
                        value={instalation}
                        onChange={handleChangeInsta}
                        input={<OutlinedInput id="select-multiple-chip" label="Instalacion" />}
                        renderValue={(selected) => (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                              <Chip key={value} label={value} />
                            ))}
                          </Box>
                        )}
                      >
                        {typeInstalation.map((name) => (
                          <MenuItem
                            key={name}
                            value={name}
                          >
                            {name}
                          </MenuItem>
                        ))}
                        <MenuItem value={"instalacion lateral"}>instalacion lateral</MenuItem>
                      </Select>
                    </div> : <h4>Este modelo solo tiene inst. lateral</h4>
                }
              </DialogContent>
              <DialogActions>
                <Button onClick={() => datos(instalation, itemModif, "instalation")}>Listo</Button>
                <Button onClick={() => setInstalationType(false)}>Cancelar</Button>
              </DialogActions>
            </Dialog>

            <Dialog open={openAcc} >
              <DialogContent>
                <DialogContentText>{`ACCESORIOS Pileta${indexCode + 1} - ${itemModif + 1}:`}</DialogContentText>
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
                <Button onClick={() => cargaAccSinks(accesories, itemModif)}>Listo</Button>
                <Button onClick={() => setOpenAcc(false)}>Cancelar</Button>
              </DialogActions>
            </Dialog>

          </div>
        )
        )
      }

    </div>
  )

}