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
    useEffect(() => {
        dispatch(sinkActions.internalSink())
        dispatch(stockActions.internalStock())
        dispatch(johnsonActions.getAccesory())
        // eslint-disable-next-line
    }, [reload])

    useEffect(() => {
        dispatch(stockActions.filterInternalStock(inputSearch))
        // eslint-disable-next-line
    }, [inputSearch, reload])

    let filterInternalStock = useSelector(store => store.stockReducer.filterInternalStock)
    const accesoriesList = useSelector(store => store.johnsonReducer.accesorys)
    let internalStock = useSelector(store => store.stockReducer.internalStock)
    console.log("🚀 ~ file: StockJohnson-1-internal.jsx ~ line 56 ~ StockInternalJohnson ~ internalStock", internalStock)
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
        setAccesorysAdd(ac)//solo los id de los accesorios
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
                instalation: instalation
            }
        }
        else {
            data = {
                internal: codigo,
                note: null,
                accesories: accesorysAdd,
                instalation: instalation
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
            {
                filterInternalStock.map(stock =>
                    (
                        <div key={stock._id} className='boxStockCard'>
                            <div className='boxStockCard-note'><h3>Nota {stock.internal}</h3></div>
                            <div className='boxStockCard-containerSink'>
                                {
                                    stock.sink.map(sink =>
                                    (
                                        <div className='boxStockCard-sink'>
                                            <img src={sink.jhonson?.photo} alt={sink._id} className='boxStockCard-photo' id={sink._id} />
                                            <div className='boxStockCard-data'>
    
                                                <table class="table-fill">
    
                                                    <tbody class="table-hover">
                                                        <tr>
                                                            <td class="text-left1">Cantidad</td>
                                                            <td class="text-left">{sink.quantity}</td>
                                                        </tr>
                                                        <tr>
                                                            <td class="text-left1">Modelo</td>
                                                            <td class="text-left">{sink.jhonson.code}</td>
                                                        </tr>
                                                        <tr>
                                                            <td class="text-left1">Accesorios</td>
                                                            <td class="text-left">{sink.accesories?.map(i =>
                                                                <span>{i.code + " - "}</span>)}</td>
                                                        </tr>
                                                        <tr>
                                                            <td class="text-left1">Instalacion</td>
                                                            <td class="text-left">{sink.instalation?.map(i =>
                                                                <span>{i + " - "}</span>)}</td>
                                                        </tr>
                                                        <tr>
                                                            <td class="text-left1">Comentarios</td>
                                                            <td class="text-left">{stock.comments}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
    
                                    ))
                                }
                            </div>
                            <div className='boxStockCard-botones'>
                                <button>Editar</button>
                                <button>Asignar</button>
                                <button>Eliminar</button>
                            </div>
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
            </Dialog>
        </div>
    )

}
