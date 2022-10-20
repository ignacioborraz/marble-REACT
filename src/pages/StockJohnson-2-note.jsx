import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import sinkActions from '../redux/actions/sinkActions'
import stockActions from '../redux/actions/stockActions'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import TextField from '@mui/material/TextField';
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
  const [idDelet, setIdDelet] = useState("")

  const [id, setId] = useState("")
  const [sinks, setSinks] = useState([])
  console.log("🚀 ~ file: StockJohnson-2-note.jsx ~ line 32 ~ StockNoteJohnson ~ sinks", sinks)
  const [comment, setComment] = useState("")
  console.log("🚀 ~ file: StockJohnson-2-note.jsx ~ line 33 ~ StockNoteJohnson ~ comment", comment)

  const [accesories, setAccesories] = useState([])
  const [openAcc, setOpenAcc] = useState(false)
  const [openAlertEdit, setOpenAlertEdit] = useState(false);

  const [valueSelect, setValueSelect] = useState('');
  const [accesorysAdd, setAccesorysAdd] = useState([])
  const [instalation, setInstalation] = useState([])
  console.log("🚀 ~ file: StockJohnson-2-note.jsx ~ line 44 ~ StockNoteJohnson ~ instalation", instalation)
  const [typeInstalation, setTypeInstalation] = useState([])
  console.log("🚀 ~ file: StockJohnson-2-note.jsx ~ line 45 ~ StockNoteJohnson ~ typeInstalation", typeInstalation)
  const [clase, setClase] = useState([]);
  const [typeA, setTypeA] = useState(false)
  const [openJson, setOpenJson] = useState(false)
  const [instalationType, setInstalationType] = useState(false)
  const [itemModif, setItemModif] = useState("")
  const [indexStock, setIndexStock] = useState("")

  useEffect(() => {
    dispatch(sinkActions.noteSink())
    dispatch(stockActions.noteStock())
    // eslint-disable-next-line
  }, [reload])
  useEffect(() => {
    dispatch(stockActions.filterNoteStock(inputSearch))
    // eslint-disable-next-line
  }, [inputSearch])
  // let noteSink = useSelector(store => store.sinkReducer.noteSink)
  // console.log("🚀 ~ file: StockJohnson-2-note.jsx ~ line 22 ~ StockNoteJohnson ~ noteSink", noteSink)
  //let filterNoteSink = useSelector(store => store.sinkReducer.filterNoteSink)
  let noteStock = useSelector(store => store.stockReducer.noteStock)
  let filterNoteStock = useSelector(store => store.stockReducer.filterNoteStock)
  console.log("🚀 ~ file: StockJohnson-2-note.jsx ~ line 24 ~ StockNoteJohnson ~ filterNoteStock", filterNoteStock)
  console.log("🚀 ~ file: StockJohnson-2-note.jsx ~ line 22 ~ StockNoteJohnson ~ noteStock", noteStock)
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
  const handleClickAccesorios = () => {
    setOpenAcc(true)
  }
  const handleClickOpenAlertEdit = () => {
    setOpenAlertEdit(true)
  }
  const handleClickOpen = (id, listSinks, comments) => {
    console.log("🚀 ~ file: StockJohnson-2-note.jsx ~ line 74 ~ handleClickOpen ~ comments", comments)

    console.log("🚀 ~ file: StockJohnson-2-note.jsx ~ line 74 ~ handleClickOpen ~ id", id)
    setOpen(true);
    setId(id);
    setSinks(listSinks)
    setComment(comments)
    setInstalation(instalation)
    setTypeInstalation(typeInstalation)
    // setAccesories(acc)
    // let ac = []
    // acc.forEach(element => {
    //     ac.push(element._id)
    // });
    // console.log(ac)
    // setAccesorysAdd(ac)
  }
  const handleChangeInsta = (event) => {
    const {
      target: { value },
    } = event;
    setInstalation(
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const openType = (position) => {
    setItemModif(position)
    setTypeA(true)
  }
  const closeType = (position) => {
    setTypeA(false)
  }
  const openInstalationType = (position, listInstalacion) => {
    setInstalationType(true)
    setInstalation(listInstalacion)
    setTypeInstalation(sinks[position].jhonson.instalation)
  }
  const datos = (value, position, key) => { //carga datos
    console.log("🚀 ~ file: StockJohnson-2-note.jsx ~ line 116 ~ datos ~ position", position)
    console.log("🚀 ~ file: Johnson-4-Data.jsx ~ line 129 ~ datos ~ value", value)
    let fields = sinks
    console.log("🚀 ~ file: StockJohnson-2-note.jsx ~ line 118 ~ datos ~ fields", fields)
    fields[position][key] = value?.target?.value || value;
    // if (key === "jhonson") {
    //   let l1  = sinks[position][key]
    //   console.log("🚀 ~ file: StockJohnson-2-note.jsx ~ line 121 ~ datos ~ l1", l1)
    //   fields[position].jhonson=value
    // }
    // else{
    //   fields[position][key] = value?.target?.value || value;

    // }

    setSinks([...sinks])
    setReload(!reload)
    // if (item !== undefined) {
    //   const insta = sinkInsta
    //   insta[position]["instalation"] = item?.instalation
    //   insta[position]["type"] = item?.type
    //   insta[position]["code"] = item?.code
    //   setSinkInsta([...sinkInsta])
    // }
  }

  const editFields = (item, id, listSinks, comments) => {
    console.log("🚀 ~ file: StockJohnson-2-note.jsx ~ line 142 ~ editFields ~ item", item)
    let list = []
    filterNoteStock.map(elem => list.push({ clase: "" }))
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
    setComment(comments)
   
  };

  async function delet(id) {
    await dispatch(stockActions.deleteStock(id))
    setOpenAlert(false)
    setReload(!reload)
  }
  async function openJohnson(type, index) {
    console.log("🚀 ~ file: Johnson-4-Data.jsx ~ line 112 ~ openJohnson ~ type", type)
    const res = await dispatch(johnsonActions.getJohnsonType(type))
    setOpenJson(true)
    setTypeA(false)
    setReload(!reload)
  }
  const listJSON = useSelector(store => store.johnsonReducer.johnsonType)
  console.log("🚀 ~ file: StockJohnson-2-note.jsx ~ line 152 ~ StockNoteJohnson ~ listJSON", listJSON)

  // list.forEach(function (numero) {
  //     repetidos[numero] = (repetidos[numero] || 0) + 1;
  // });

  // console.log(repetidos);


  return (
    <div className='containerStock'>
      <div className='containerNameStock vendidas'>
        <div className='mask4'>
          <h1 className='titleStock'>Vendidas</h1>
        </div>
      </div>
      <div className='containerInput'>
        <input className='input inputStock' type="text" placeholder='Buscar por color, cod. o emp.' onChange={(e) => setInputSearch(e.target.value)} />
      </div>
      {
        filterNoteStock.map((stock, index) =>
        (
          <div key={stock._id} className='boxStockCard'>
            <div className='boxStockCard-note'><h3>Nota {stock.note}</h3></div>
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
                              <div>
                                {
                                  sinks.length > 0 && index === indexStock ? sinks[itemModif]?.jhonson?.code : sink.jhonson.code
                                }
                                {/* {sinks[itemModif]?.jhonson?.code}  */}
                                <button className={clase[index]?.clase ? 'btnModificar' : 'displeyNone'} onClick={() => openType(indexSink)}>Cambiar</button>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-left1">Accesorios</td>
                            <td className="text-left">
                              <div>
                                {sink.accesories?.map((i, index) =>
                                  <span key={index}>{i.code + " - "}</span>)}
                                <button className={clase[index]?.clase ? 'btnModificar' : 'displeyNone'}>Agregar</button>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-left1">Instalacion</td>
                            <td className="text-left">
                              <div>
                                {sink.instalation?.map((i, index) =>
                                  <span key={index}>{i + " - "}</span>)}
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
              <button className={clase[index]?.clase ? 'btnModificarGuardar' : 'displeyNone'}>Guardar Cambios</button>
              <button onClick={() => editFields(index, stock._id, stock.sink, stock.comments)}>Editar</button>
              {/* <button onClick={() => handleClickOpen(stock._id, stock.sink, stock.comments)}>Editar</button> */}
              <button>Entregar</button>
              <button type='button' onClick={() => handleClickOpenAlert(stock._id)}>Eliminar</button>
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
                      onClick={() => datos(item, itemModif, 'jhonson')}
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
                          {sinks[itemModif]?.jhonson?._id === item._id ?
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
                <Button onClick={() => setOpenJson(false)}>Listo</Button>
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
                <Button onClick={() => setInstalationType(false)}>Cancelar</Button>
              </DialogActions>
            </Dialog>



            {/* <Dialog open={sinksOpen[index]?.open} >
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
            </Dialog> */}





            {/* <Dialog open={open} onClose={handleClose}>
              <DialogContent>
                <DialogContentText>
                  Editar campos
                </DialogContentText>
                <div className='flex'>
                  <TextField
                    autoFocus
                    margin="dense"
                    defaultValue={comment}
                    type="text"
                    fullWidth
                    label="Comentario"
                    variant="standard"
                    onChange={(event) => setComment(event.target.value)}
                    id="nuevoComment"
                  />
                </div>
                {
                  sinks.map((item, index) =>
                    <div className='boxEditSink'>
                      <TextField
                        autoFocus
                        margin="dense"
                        defaultValue={sinks[index].quantity}
                        type="text"
                        label="Cantidad"
                        fullWidth
                        variant="standard"
                        onChange={(event) => setComment(event.target.value)}
                        id="nuevoComment"
                      />
                      <TextField
                        autoFocus
                        margin="dense"
                        defaultValue={sinks[index].jhonson.code}
                        type="text"
                        label="Modelo"
                        fullWidth
                        variant="standard"
                        onChange={(event) => setComment(event.target.value)}
                        id="nuevoComment"
                      />
                    </div>
                  )
                }

              </DialogContent>
              <DialogActions>
                <Button onClick={handleClickOpenAlertEdit}>Editar</Button>
                <Button onClick={handleClose}>Cancelar</Button>
              </DialogActions>
            </Dialog> */}
          </div>

        )
        )
      }

      {/* {filterNoteSink.length > 0 ?
                <div className='containerCardsMarca mt10'>
                    {filterNoteSink?.map(sink => (
                        <div className='linkColors cardStock' key={sink._id}>
                            <div className='companyCardStock'>
                                <h2 className='nameCards'>Código: {sink.note}</h2>
                                <h3 className='nameCards'>{sink.jhonson?.code}</h3>
                                <img src={sink.jhonson?.photo} alt={sink._id} className='fitStock' id={sink._id} />
                                <h3 className='nameCards'> {sink.jhonson?.x} × {sink.jhonson?.y} × {sink.jhonson?.z}</h3>
                            </div>
                        </div>
                    ))
                    }
                </div>
                : <div className='noResult'>
                    <h1>no hay resultados</h1>
                </div>
            } */}
    </div>
  )

}