import * as React from 'react';
import { useEffect, useState } from 'react'
import { Link as LinkRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import sinkActions from '../redux/actions/sinkActions';
import Chip from '@mui/material/Chip';
import johnsonActions from '../redux/actions/johnsonActions';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import stockActions from '../redux/actions/stockActions';
import Container from '../components/Container'

export default function StockInternalJohnson() {
  const dispatch = useDispatch()
  const [inputSearch, setInputSearch] = useState("")
  const [reload, setReload] = useState(false)
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openAcc, setOpenAcc] = useState(false)
  const [typeA, setTypeA] = useState(false)
  const [openJson, setOpenJson] = useState(false)
  const [instalationType, setInstalationType] = useState(false)
  const [openAlertASIG, setOpenAlertASIG] = useState(false);

  const [itemModif, setItemModif] = useState("")//index sink
  const [indexStock, setIndexStock] = useState("")
  const [idDelet, setIdDelet] = useState("")
  const [id, setId] = useState("")//id stock
  const [sinks, setSinks] = useState([])
  const [comment, setComment] = useState("")
  const [accesories, setAccesories] = useState([])
  const [accesorysAdd, setAccesorysAdd] = useState([])
  const [instalation, setInstalation] = useState([])
  const [typeInstalation, setTypeInstalation] = useState([])
  const [clase, setClase] = useState([]);//clase para btn editar
  const [newJohnson, setNewJohnson] = useState("")
  const [notaAsignada, setNotaAsignada] = useState("")

  console.log("🚀 ~ file: StockJohnson-2-note.jsx ~ line 32 ~ StockNoteJohnson ~ sinks", sinks)
  useEffect(() => {
    dispatch(stockActions.internalStock())
    dispatch(johnsonActions.getAccesory())
    // eslint-disable-next-line
  }, [reload])
  useEffect(() => {
    dispatch(stockActions.filterInternalStock(inputSearch))
    // eslint-disable-next-line
  }, [inputSearch, reload])

  let internalStock = useSelector(store => store.stockReducer.internalStock)
  let filterInternalStock = useSelector(store => store.stockReducer.filterInternalStock)
  const accesoriesList = useSelector(store => store.johnsonReducer.accesorys)
  console.log("🚀 ~ file: StockJohnson-1-internal.jsx ~ line 56 ~ StockInternalJohnson ~ internalStock", internalStock)
  const handleClickOpenAlert = (id) => {
    setIdDelet(id)
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
    filterInternalStock.map(elem => list.push({ clase: "" }))
    //console.log("🚀 ~ file: StockJohnson-2-note.jsx ~ line 107 ~ editFields ~ list", list)
    for (let i = 0; i < list.length; i++) {
      if (i === item) {
        list[i].clase = "divEdit"
      }
    }
    setIndexStock(item)
    setClase(list)
    setId(id);
    setSinks(listSinks)
    let idSinks = []
    listSinks.map(sink => idSinks.push(sink._id))
    setComment(comments)
    setReload(!reload)
  };
  //captura y guarda datos en sinks
  const datos = (value, position, key) => {
    console.log("🚀 ~ file: StockJohnson-2-note.jsx ~ line 116 ~ datos ~ position", position)
    console.log("🚀 ~ file: Johnson-4-Data.jsx ~ line 129 ~ datos ~ value", value)
    let fields = sinks
    console.log("🚀 ~ file: StockJohnson-2-note.jsx ~ line 118 ~ datos ~ fields", fields)
    fields[position][key] = value?.target?.value || value;
    setSinks([...sinks])
    setOpenJson(false)
    setInstalationType(false)
    setReload(!reload)
  }
  //elimina item Stock
  async function delet(id) {
    await dispatch(stockActions.deleteStock(id))
    setOpenAlert(false)
    setReload(!reload)
  }
  //tipo de acero
  const openType = (position, johnson) => {
    setItemModif(position)
    setNewJohnson(johnson)
    setTypeA(true)
  }
  const closeType = (position) => {
    setTypeA(false)
  }
  //piletas joshnson
  async function openJohnson(type, index) {
    console.log("🚀 ~ file: Johnson-4-Data.jsx ~ line 112 ~ openJohnson ~ type", type)
    const res = await dispatch(johnsonActions.getJohnsonType(type))
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
    setTypeInstalation(sinks[position].jhonson.instalation)
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

    //
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
      if (sinks[i].jhonson.instalation?.length === 0) {
        datos(["instalacion lateral"], i, "instalation")
      }
      datos(sinks[i].jhonson._id, i, "jhonson") //me pasa solo el id de jhonson
      const listaIdAccesories = []
      sinks[i].accesories.map(acc => listaIdAccesories.push(acc._id))
      datos(listaIdAccesories, i, "accesories")
      console.log("🚀 ~ file: StockJohnson-2-note.jsx ~ line 226 ~ sinks.map ~ index", i)

      const resp = await dispatch(sinkActions.putSink(sinks[i]._id, sinks[i]))
      const resp2 = await dispatch(stockActions.putStock(id, data))
      console.log("🚀 ~ file: Johnson-4-Data.jsx ~ line 176 ~ creatingSink ~ resp", resp)
      setClase([])
      setReload(!reload)
    }
  }
  const openAlertAsignar = (id) => {
    setId(id)
    setOpenAlertASIG(true)
  }
  async function asignarNota(idStock, nota) {
    console.log("🚀 ~ file: StockJohnson-2-note.jsx ~ line 208 ~ entregarStock ~ idStock", idStock)
    let data = {}
    data = {
      note: nota,
      internal: null
    }
    const resp = await dispatch(stockActions.putStock(idStock, data))
    console.log("🚀 ~ file: Johnson-4-Data.jsx ~ line 176 ~ creatingSink ~ resp", resp)
    setClase([])
    setReload(!reload)
  }

  return (
    <div className='containerStock'>
      <div className='containerNameStock'>
        <h1 className='titleStock'>Disponibles</h1>
      </div>
      <div className='containerInput'>
        <input className='input inputStock inputSink  inputAlignCenter' type="text" placeholder='Buscar por codigo' onChange={(e) => setInputSearch(e.target.value)} />
      </div>
      {
        filterInternalStock.map((stock, index) =>
        (
          <div key={stock._id} className='boxStockCard'>
            <div className='boxStockCard-note'>
              <h3>Nota</h3>
              <h3 className='h3Nota'>{stock.internal}</h3>
            </div>
            <div className='boxStockCard-containerSink'>
              {
                stock.sink.map((sink, indexSink) =>
                (
                  <div key={sink._id} className='boxStockCard-sink'>
                    <img src={sink.jhonson?.photo} alt={sink._id} className='boxStockCard-photo' id={sink._id} />
                    <div className='boxStockCard-data'>
                      <table className="table-fill">
                        <tbody className="table-hover">
                          <tr>
                            <td className="text-left1">Cantidad</td>
                            <td className="text-left">
                              <div className={clase[index]?.clase} onInput={(event) => datos(event.currentTarget.textContent, indexSink, "quantity")} contentEditable suppressContentEditableWarning={true}>
                                {sink.quantity}
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-left1">Modelo</td>
                            <td className="text-left">
                              <div className='divBtntdEdit'>
                                <div>{sink.jhonson.code}</div>
                                <button className={clase[index]?.clase ? 'btnModificar' : 'displeyNone'} onClick={() => openType(indexSink, sink.jhonson)}>Cambiar</button>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-left1">Accesorios</td>
                            <td className="text-left">
                              <div className='divBtntdEdit'>
                                <div>{sink.accesories?.map((i, index) =>
                                  <span key={index}>{i.code + " - "}</span>)}</div>

                                <button className={clase[index]?.clase ? 'btnModificar' : 'displeyNone'} onClick={() => handleClickAccesorios(indexSink, sink.accesories)}>Agregar</button>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-left1">Instalacion</td>
                            <td className="text-left">
                              <div className='divBtntdEdit'>
                                <div>{sink?.instalation?.map((i, index) =>
                                  <span key={index}>{i + " - "}</span>)}</div>

                                <button className={clase[index]?.clase ? 'btnModificar' : 'displeyNone'} onClick={() => openInstalationType(indexSink, sink.instalation)}>Cambiar</button>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-left1">Comentarios</td>
                            <td className="text-left">
                              <div className={clase[index]?.clase} onInput={(event) => setComment(event.currentTarget.textContent)} contentEditable suppressContentEditableWarning={true}>
                                {stock.comments}
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                ))
              }
            </div>
            <div className='boxStockCard-botones'>
              <button className={clase[index]?.clase ? 'btnModificarGuardar' : 'displeyNone'} onClick={() => modificar()}>Guardar Cambios</button>
              <button className='btnEditar' onClick={() => editFields(index, stock._id, stock.sink, stock.comments, stock.note)}>Editar</button>
              <button className='btnEntregar' type='button' onClick={() => openAlertAsignar(stock._id)}>Asignar</button>
              <button className='btnEliminar' type='button' onClick={() => handleClickOpenAlert(stock._id)}>Eliminar</button>
            </div>
            <Dialog className='dialogDelet' open={openAlert} onClose={handleClose}>
              <DialogContent  >
                <DialogContentText>
                  Esta seguro que desea eliminar?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => delet(idDelet)}>Confirmar</Button>
                <Button onClick={handleCloseDelet}>Cancelar</Button>
              </DialogActions>
            </Dialog>

            <Dialog open={typeA} >
              <DialogContent>
                <DialogContentText>{`Modificar pileta${index + 1}:`}</DialogContentText>
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

            <Dialog open={openJson} >
              <DialogContent>
                <DialogContentText>{`Johnson${index + 1}:`}</DialogContentText>
                <div className='itemsEditAcc'>
                  {listJSON.map((item) => (
                    <button
                      // onClick={() => datos(item, itemModif, 'jhonson')}
                      onClick={() => setNewJohnson(item)}
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
                {/* <Button onClick={() => datos(newJohnson, itemModif, "jhonson")}>Listo</Button> */}
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
                    </div> : null
                }
              </DialogContent>
              <DialogActions>
                <Button onClick={() => datos(instalation, itemModif, "instalation")}>Listo</Button>
                <Button onClick={() => setInstalationType(false)}>Cancelar</Button>
              </DialogActions>
            </Dialog>

            <Dialog open={openAcc} >
              <DialogContent>
                <DialogContentText>{`ACCESORIOS Pileta${indexStock + 1} - ${itemModif + 1}:`}</DialogContentText>
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

            <Dialog className='dialogDelet' open={openAlertASIG}>
              <DialogContent  >
                <DialogContentText>
                  Asignar Nota
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  defaultValue={notaAsignada}
                  type="text"
                  fullWidth
                  variant="standard"
                  label="Nota"
                  onChange={(event) => setNotaAsignada(event.target.value)}
                  id="nuevoCod"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => asignarNota(id, notaAsignada)}>Confirmar</Button>
                <Button onClick={() => setOpenAlertASIG(false)}>Cancelar</Button>
              </DialogActions>
            </Dialog>
          </div>

        )
        )

      }
      {/* {filterInternalSink.length > 0 ?
                <div className='containerCardsMarca mt10'>
                    {filterInternalSink?.map(sink => (

                        <div className='cardStock linkColorsJ' key={sink._id}>
                            <div className='companyCardStock'>
                                <h2 className='nameCards'>{sink.jhonson?.code}</h2>
                                <h3 className='nameCards'>Código: {sink.internal}</h3>
                                <img src={sink.jhonson?.photo} alt={sink._id} className='fitStock' id={sink._id} />
                                <h3 className='nameCards'> {sink.jhonson?.x} × {sink.jhonson?.y} × {sink.jhonson?.z}</h3>
                                <div className='bntEditDelet'>
                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAcJJREFUaEPtmeFtAyEMhZ1N2k3SSZpO0nSSdpNmk3STVk8KEqIY7BPPcNL5V5Q7wftsgw9zkp3baef65QCYHcFeBJ5E5F1ELhOE/ojITUQ+RAS/q9YCgPj7BOHllBD/okG0AD4neb7mM0QCEP+sBQDvIworGKLw7AX4XUF5pqHq7FYEDgAlgmlRfjtTdIkI5LmM9eWBWAKgFOGBWAIARelapNb5EYnenjENIFXRtCXnEPgP9QYQPZsCkHK+TBVAfDnEAy4coCw+JQSeewplKIBWOT2LtkypMAC17D88bs35KQAs8SFrgCmeDsAWTwWIEE8DiBJPA9A+xz0VtleB03PKNloblCE+LAIs8SEATPE0AGv+jniPsgZGCLOOcQBYPcV6zx2BlRpbmxYxOgaWox7L4/m4OL29eTtzu2/uAhgQaK2/Oo9/I6KS2utVzze/LzbMjlYJ7hE8pqaFZ5DeBYd1rBQpK4TaLrdOODoCKd0s591h4tWtyeuF7P1e16F1ftg07agUyifXICAeCxIRGGYMgJRO5f0aroiGimekUO5ZbL9YEzCKeDYAxsf2itTBlkkxVgpRxNYGPQDCXK1MtPsI/AH6HWAxi76YJQAAAABJRU5ErkJggg==" alt='edit' className='iconEdit' onClick={() => handleClickOpen(sink._id, sink.internal, sink.accesories, sink.instalation, sink.jhonson.instalation)} />
                                    <LinkRouter className='iconVerMas' to={'/stock/plates/internal/detail/' + sink._id}>
                                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAp9JREFUaEPtme1NAzEMht1JgEmASYBJgEmASWATYBLQK52rw7FjO/FRndRIVfvjzvFjv86He6Cdj8PO/aczwKkzWJmBSyK6J6ILIsJv/nwtkPjG55uIPpbPNP8sADt9tziccQgwb0T0uoBl3j0+OwPwRESPQ7P+fYlBYC89RgBuiOg9PZP/whBIFsCLOjsBjbPmITMMrgnIDUGwxjMRhbORAUDUtYlHIufVDuriwU8ahfcBy/lUtBSHGESrpRBEJAOabBB1RAhSqRgAQZBYbmzTDZAHoBUsnL+q8FrYsCAQKGRDHR7Ap4gKnL+dWbcdcA2iG7AegCYdOB+VzY9w1gsWPw4IBG49zHroGZUOuHoUk44CwAyOJC8re2bmLQC8DCPrEY0gvzMDoElJDaDllNR+t5AMXc8AWFloFg8LYHbyikVKq4WmBjUAqb/QhlLhsWJDbqCNjDQAqf8R+VTxyGBiBUQWjkMDkNSZpbPKcbYjN9IQgCxgFA7fqjIOVtSRrINmU9MyUDExQCvs7B7ADYSWgd1LqKqIKyQ0VMRyGc2egSqOEmzD3ZMiG1mzdAWXoooMSDU0e5IG4Fb+PwLIIDRLunUWcskDELMZcHdh+GAByMvMyDVyFkCuhuqZzAJI3Yo2OE5rt0H1RNC7pGi3okwnYjQDWiPBXAl7ANYFe+tLvbwP96TuNrZkFmBsq84EAoY9SHb/uqfhyD3XamxVZsJqGLubaAQAUbcg0N8PN2KNYrcaxqENNArQ62HONHet/xdCzneLIxktrg2G4dY6vtftdUjl+lTt9fUBC5GTjdjA5tx9ZKhhHJWQnLknqSzIiAS7l/qMAwziyUKzOeU4GxzNgOYQYFjj3t+sU/9MrievBMhkruzZM0BZKAcN7T4Dv8IIujGpGX+IAAAAAElFTkSuQmCC" className='iconVerMas' alt='info' />
                                    </LinkRouter>
                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAglJREFUaEPtmeFNxDAMhX2bwCTAJMAkwCSwCWwCm4CehEUJcfzc2u2Vu/w66dL0fXZiO+5Bdj4OO9cvZ4CtPeh54EJEHkTkbgOhHyLyJiJPIoLf3TECgPj3DYS3r4T4GwtiBPC8keV7NoMnAPFnjABgfXjhGAa8cBkF+DwG5RMNXWOPPHBSAC8zzgu2RWSLlnng/jvcIdQi5DJDD+Vj4JkSAIiH9TFgTQaijSgsRDpAL7R5EFY4ZCJeOgCsDuvDC9NhQVjiX0Xkmth3JQAsxFLxeE8ZgAdxZWRR1vLqnFKAEUSvEIuKL/eAWql3JtrtPUf8agCWJxRirvhVAawD64VYLxCVnwEIMMveYLKjC8/MYs4Tr6LmeqLUA6M4jyjEJrvRNioDYJJUJGNbECUAjPhRiI1sp3QA65o3CpWWJ/CMdzdIB4Bl0fJAORyJ8y0E2zwoAZhCRJKUQrDiyxNZ9HoIQdFnyjzgZdCs/08PgLnmZVmXWSfsgcihZAQsmWOW6f+6uQuLaaa8JRLNEgv3ntX2eltH/ZrrfR9gRbG9nel6zO3NfX8WQKSmYe4NrnCdkAWg2w2Z1evxsPcGCiITQCFGhZnZ56fUdiZlA4wg9GIDD6SNCgCFaL+v4RNRqnizwksyDzrVOBMYJeKrAbA+wiu2jrbgk2zzs0zVFkoXai14BljN1MaLdu+BL7BifTHoT8MKAAAAAElFTkSuQmCC" alt='delete' className='iconDelete' onClick={() => handleClickOpenAlert(sink._id)} />
                                </div>
                            </div>
                            <Dialog className='dialogDelet' open={openAlert} onClose={handleClose}>
                                <DialogContent  >
                                    <DialogContentText>
                                        Esta seguro que desea eliminar?
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => delet(idDelet)}>Confirmar</Button>
                                    <Button onClick={handleCloseDelet}>Cancelar</Button>
                                </DialogActions>
                            </Dialog>
                            <Dialog open={openAlertEdit} onClose={handleClose}>
                                <DialogContent>
                                    <DialogContentText>
                                        Esta seguro de realizar estos cambios?
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => modify(id, valueSelect)}>Confirmar</Button>
                                    <Button onClick={handleCloseEdit}>Cancelar</Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    ))

                    }
                </div>
                : <div className='noResult'>
                    <h1>no hay resultados</h1>
                </div>
            } */}

      {/* <Dialog open={open} onClose={handleClose}>
				<DialogContent>
					<DialogContentText>
						Editar campos
					</DialogContentText>
					<div className='selectCodigo'>
						<InputLabel id="demo-simple-select-label">Codigo:</InputLabel>
						<Select
							displayEmpty
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={valueSelect}
							onChange={handleChange}
							defaultValue={"int"}
						>
							<MenuItem value={"int"}>Interno</MenuItem>
							<MenuItem value={"ped"}>Pedido</MenuItem>
						</Select>
					</div>
					<TextField
						autoFocus
						margin="dense"
						defaultValue={codigo}
						type="text"
						fullWidth
						variant="standard"
						onChange={(event) => setCodigo(event.target.value)}
						id="nuevoCod"
					/>

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
							</div> : null
					}
					<div className='stackAcc'>
						<InputLabel id="demo-simple-select-label">Accesorios:</InputLabel>
						{
							accesories.length > 0 ?
								<div className='cajaAcc'>
									{accesories.map((op) => (

										<Chip key={op._id} value={op._id} label={op.code} />
									))}
								</div> : <div className='cajaAcc'><h5>No selecciono ningun acc</h5></div>
						}
						<div className='btnAddAcc'>
							<button className='btnAgregar' onClick={handleClickAccesorios}>Agregar</button>
						</div>
					</div>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClickOpenAlertEdit}>Editar</Button>
					<Button onClick={handleClose}>Cancelar</Button>
				</DialogActions>
			</Dialog>
			<Dialog open={openAcc} onClose={handleClose}>
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
			</Dialog> */}
    </div>
  )

}
