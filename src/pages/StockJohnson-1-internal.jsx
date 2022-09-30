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


export default function StockInternalJohnson() {

    const dispatch = useDispatch()
    const [inputSearch, setInputSearch] = useState("")
    const [reload, setReload] = useState(false)
    const [open, setOpen] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [openAlertEdit, setOpenAlertEdit] = useState(false);
    const [id, setId] = useState("")
    const [idDelet, setIdDelet] = useState("")
    const [openAcc, setOpenAcc] = useState(false)
    const [codigo, setCodigo] = useState("")
    const [accesories, setAccesories] = useState([])
    const [valueSelect, setValueSelect] = useState('');
    const [accesorysAdd, setAccesorysAdd] = useState([])
    const [instalation, setInstalation] = useState([])
    const [typeInstalation, setTypeInstalation] = useState([])
    console.log("👽 ~ file: StockJohnson-1-internal.jsx ~ line 39 ~ StockInternalJohnson ~ instalation", instalation)
    useEffect(() => {
        dispatch(sinkActions.internalSink())
        dispatch(johnsonActions.getAccesory())
        // eslint-disable-next-line
    }, [reload])

    useEffect(() => {
        dispatch(sinkActions.filterInternalSink(inputSearch))
        // eslint-disable-next-line
    }, [inputSearch, reload])

    let internalSink = useSelector(store => store.sinkReducer.internalSink)
    console.log("🚀 ~ file: StockJohnson-1-internal.jsx ~ line 52 ~ StockInternalJohnson ~ internalSink", internalSink)
    let filterInternalSink = useSelector(store => store.sinkReducer.filterInternalSink)
    console.log("🚀 ~ file: StockJohnson-1-internal.jsx ~ line 54 ~ StockInternalJohnson ~ filterInternalSink", filterInternalSink)
    const accesoriesList = useSelector(store => store.johnsonReducer.accesorys)

    const handleClickAccesorios = () => {
        setOpenAcc(true)
    }

    const handleClickOpenAlert = (id) => {
        setIdDelet(id)
        setOpenAlert(true)
    }
    const handleClickOpenAlertEdit = () => {
        setOpenAlertEdit(true)
    }
    const handleClickOpen = (id, codigo, acc, instalation, typeInstalation) => {
        console.log("🚀 ~ file: StockJohnson-1-internal.jsx ~ line 69 ~ handleClickOpen ~ instalation", instalation)
        console.log("🚀 ~ file: StockJohnson-1-internal.jsx ~ line 96 ~ handleClickOpen ~ acc", acc)
        setOpen(true);
        setId(id);
        setCodigo(codigo);
        setValueSelect("int")
        setInstalation(instalation)
        setTypeInstalation(typeInstalation)
        setAccesories(acc)
        let ac = []
        acc.forEach(element => {
            ac.push(element._id)
        });
        console.log(ac)
        setAccesorysAdd(ac)
    }

    const handleCloseEdit = () => {
        setOpenAlertEdit(false)
    };
    const handleCloseDelet = () => {
        setOpenAlert(false)
    };

    const handleClose = () => {
        setOpen(false);
        setOpenAcc(false)
    };
    const handleChange = (event) => {
        setValueSelect(event.target.value);
    };
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
    const handleChangeInsta = (event) => {
        const {
            target: { value },
        } = event;
        setInstalation(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    async function modify(id, op) {
        let data = {}
        if (op === "ped") {
            data = {
                internal: null,
                note: codigo,
                accesories: accesorysAdd,
                instalation:instalation
            }
        }
        else {
            data = {
                internal: codigo,
                note: null,
                accesories: accesorysAdd,
                instalation:instalation
            }
        }

        console.log("🚀 ~ file: Stock-1-internal.jsx ~ line 68 ~ modify ~ data", data)
        const res = await dispatch(sinkActions.putSink(id, data))
        console.log("🚀 ~ file: Stock-1-internal.jsx ~ line 67 ~ modify ~ res", res)

        setOpenAlertEdit(false)
        setOpen(false);
        setReload(!reload)

    }
    async function delet(id) {
        console.log("🚀 ~ file: StockJohnson-1-internal.jsx ~ line 69 ~ delet ~ id", id)
        await dispatch(sinkActions.deleteSink(id))
        setOpenAlert(false)
        setReload(!reload)
    }

    return (
        <div className='containerStock'>
            <div className='containerNameStock'>
                <h1 className='titleStock'>Disponibles</h1>
            </div>
            <div className='containerInput'>
                <input className='input inputStock inputSink' type="text" placeholder='Buscar por codigo' onChange={(e) => setInputSearch(e.target.value)} />
            </div>
            {filterInternalSink.length > 0 ?
                <div className='containerCardsMarca mt10'>
                    {filterInternalSink?.map(sink => (

                        <div className='linkColors cardStock' key={sink._id}>
                            <div className='companyCardStock'>
                                <h2 className='nameCards'>Código: {sink.internal}</h2>
                                <h3 className='nameCards'>{sink.jhonson?.code}</h3>
                                <img src={sink.jhonson?.photo} alt={sink._id} className='fitStock' id={sink._id} />
                                <h3 className='nameCards'> {sink.jhonson?.x} × {sink.jhonson?.y} × {sink.jhonson?.z}</h3>

                                <div className='containerBtnVermas'>
                                    <LinkRouter className='iconVerMas' to={'/stock/plates/internal/detail/' + sink._id}  >
                                        Ver más
                                    </LinkRouter>
                                </div>
                                <div className='bntEditDelet'>
                                    <button className='iconEdit' onClick={() => handleClickOpen(sink._id, sink.internal, sink.accesories, sink.instalation, sink.jhonson.instalation)}>Editar</button>
                                    <button className='iconDelete' onClick={() => handleClickOpenAlert(sink._id)}>Eliminar</button>

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
            }


            <Dialog open={open} onClose={handleClose}>
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

                    {/* <div className='stackAcc'>
                        <InputLabel id="demo-simple-select-label">Instalacion:</InputLabel>
                        {
                            instalation.length > 0 ?
                                <div className='cajaAcc'>
                                    {instalation.map((op, index) => (

                                        <Chip key={index} value={op} label={op} />
                                    ))}

                                </div> : <div className='cajaAcc'><h5>No selecciono ningun acc</h5></div>
                        }



                        <div className='btnAddAcc'>
                            <button onClick={handleClickAccesorios}>Agregar</button>
                        </div>

                    </div> */}
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
                                //MenuProps={MenuProps}
                                >
                                    {typeInstalation.map((name) => (
                                        <MenuItem
                                            key={name}
                                            value={name}
                                        //style={getStyles(name, personName, theme)}
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
                            <button onClick={handleClickAccesorios}>Agregar</button>
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
            </Dialog>
        </div>
    )

}
