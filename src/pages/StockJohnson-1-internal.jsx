import { useEffect, useState } from 'react'
import { Link as LinkRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import plateActions from '../redux/actions/plateActions'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import typeActions from '../redux/actions/typeActions';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import sinkActions from '../redux/actions/sinkActions';


export default function StockInternalJohnson() {

    const dispatch = useDispatch()
    const [inputSearch, setInputSearch] = useState("")
    const [reload, setReload] = useState(false)
    const [open, setOpen] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [openAlertEdit, setOpenAlertEdit] = useState(false);
    const [id, setId] = useState("")
    const [idDelet, setIdDelet] = useState("")
    const [idComp, setIdComp] = useState("")
    const [lote, setLote] = useState("")
    const [codigo, setCodigo] = useState("")
    const [esp, setEsp] = useState({})
    //const [type, setType] = useState("")
    const [valueSelect, setValueSelect] = useState('');

    useEffect(() => {
        dispatch(sinkActions.internalSink())
        // eslint-disable-next-line
    }, [reload])

    useEffect(() => {
        dispatch(sinkActions.filterInternalSink(inputSearch))
        // eslint-disable-next-line
    }, [inputSearch,reload])

    let internalSink = useSelector(store => store.sinkReducer.internalSink)
    console.log("🚀 ~ file: StockJohnson-1-internal.jsx ~ line 52 ~ StockInternalJohnson ~ internalSink", internalSink)
    let filterInternalSink = useSelector(store => store.sinkReducer.filterInternalSink)
    console.log("🚀 ~ file: StockJohnson-1-internal.jsx ~ line 54 ~ StockInternalJohnson ~ filterInternalSink", filterInternalSink)

    const types = useSelector(store => store.typeReducer.types)

    const [type, setType] = useState(
        types.find((a) => a._id === esp._id)
    );
    const typeAct = (id) => {
        setType(types.find((a) => a._id === id));
    };
    function SortArray(x, y) {
        if (x.jhonson?.code < y.jhonson?.code) { return -1; }
        if (x.jhonson?.code > y.jhonson?.code) { return 1; }
        return 0;
    }
    var filterOrd = filterInternalSink.sort(SortArray);

   
    const handleClickOpenAlert = (id) => {
        setIdDelet(id)
        setOpenAlert(true)
    }
    const handleClickOpenAlertEdit = () => {
        setOpenAlertEdit(true)
    }
    const handleClickOpen = (id, codigo) => {
        setOpen(true);
        setId(id);
        setCodigo(codigo);
        setValueSelect("int")
        

    }
    const handleCloseEdit = () => {
        setOpenAlertEdit(false)
    };
    const handleCloseDelet = () => {
        setOpenAlert(false)
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setValueSelect(event.target.value);
    };
    // const handleChangeType = (event) => {
    //     console.log("🚀 ~ file: Stock-1-internal.jsx ~ line 88 ~ handleChangeType ~ event", event.target.value)
    //     setEsp(event.target.value)
    //     typeAct(event.target.value);
    //     console.log(type)
    //     setReload(!reload)
    // };

    async function modify(id, op) {
        let data = {}
        if (op === "ped") {
            data = {
                internal: null,
                note: codigo,
            }
        }
        else {
            data = {
                internal: codigo,
            }
        }

        console.log("🚀 ~ file: Stock-1-internal.jsx ~ line 68 ~ modify ~ data", data)
        const res = await dispatch(sinkActions.putSink(id, data))
        console.log("🚀 ~ file: Stock-1-internal.jsx ~ line 67 ~ modify ~ res", res)

        setReload(!reload)
        setOpenAlertEdit(false)
        setOpen(false);

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

            {filterOrd.length > 0 ?
                <div className='containerCardsMarca mt10'>
                    {filterOrd?.map(sink => (
                        
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
                                    <button className='iconEdit' onClick={() => handleClickOpen(sink._id, sink.internal)}>Editar</button>
                                    <button className='iconDelete' onClick={() => handleClickOpenAlert(sink._id)}>Eliminar</button>

                                </div>
                            </div>
                            <Dialog open={openAlert} onClose={handleClose}>
                                <DialogContent>
                                    <DialogContentText>
                                        Esta seguro que desea eliminar?
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={()=>delet(idDelet)}>Confirmar</Button>
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
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClickOpenAlertEdit}>Editar</Button>
                    <Button onClick={handleClose}>Cancelar</Button>

                </DialogActions>


            </Dialog>
        </div>
    )

}
