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

export default function StockNoteJohnson() {
    const dispatch = useDispatch()
    const [inputSearch, setInputSearch] = useState("")
    const [reload, setReload] = useState(false)
    const [open, setOpen] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [idDelet, setIdDelet] = useState("")

    const [accesories, setAccesories] = useState([])
    const [openAcc, setOpenAcc] = useState(false)
    const [openAlertEdit, setOpenAlertEdit] = useState(false);
    const [id, setId] = useState("")
    const [valueSelect, setValueSelect] = useState('');
    const [accesorysAdd, setAccesorysAdd] = useState([])
    const [instalation, setInstalation] = useState([])
    const [typeInstalation, setTypeInstalation] = useState(["sdf"])

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
    const handleClickOpen = (id, acc, instalation, typeInstalation) => {
        setOpen(true);
        setId(id);
        
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
    const handleChangeInsta = (event) => {
        const {
            target: { value },
        } = event;
        setInstalation(
            typeof value === 'string' ? value.split(',') : value,
        );
    };



    async function delet(id) {
        await dispatch(stockActions.deleteStock(id))
        setOpenAlert(false)
        setReload(!reload)
    }


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
                filterNoteStock.map(stock =>
                (
                    <div key={stock._id} className='boxStockCard'>
                        <div className='boxStockCard-note'><h3>Nota {stock.note}</h3></div>
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
                            <button onClick={() => handleClickOpen(stock._id, stock.accesories)}>Editar</button>
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

                        <Dialog open={open} onClose={handleClose}>
                            <DialogContent>
                                <DialogContentText>
                                    Editar campos
                                </DialogContentText>
                                
                                {/* {
                                    typeInstalation?.length > 0 ?
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
                                                {typeInstalation?.map((name) => (
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
                                </div> */}
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClickOpenAlertEdit}>Editar</Button>
                                <Button onClick={handleClose}>Cancelar</Button>
                            </DialogActions>
                        </Dialog>
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