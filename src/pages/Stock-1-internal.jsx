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
import NativeSelect from '@mui/material/NativeSelect';

export default function StockInternalPlates() {

    const dispatch = useDispatch()
    const [inputSearch, setInputSearch] = useState("")
    const [reload, setReload] = useState(false)
    const [open, setOpen] = useState(false);
    const [id, setId] = useState("")
    const [idType, setIdType] = useState("")
    const [lote, setLote] = useState("")
    const [codigo, setCodigo] = useState("")
    const [esp, setEsp] = useState("")
    const [valueSelect, setValueSelect] = useState('');



    useEffect(() => {
        dispatch(plateActions.internalPlate())
        // eslint-disable-next-line
    }, [reload])

    useEffect(() => {
        dispatch(plateActions.filterInternalPlates(inputSearch))
        // eslint-disable-next-line
    }, [inputSearch])

    let internalPlate = useSelector(store => store.plateReducer.internalPlate)
    let filterPlates = useSelector(store => store.plateReducer.filterInternalPlates)


    function SortArray(x, y) {
        if (x.color.name < y.color.name) { return -1; }
        if (x.name > y.name) { return 1; }
        return 0;
    }
    var filterOrd = filterPlates.sort(SortArray);

    async function delet(id) {
        await dispatch(plateActions.deletePlate(id))
        setReload(!reload)
    }

    const handleClickOpen = (id, codigo, esp, idType, lote) => {
        setOpen(true);
        setId(id);
        setCodigo(codigo);
        setEsp(esp);
        setIdType(idType)
        setLote(lote)
        setValueSelect("int")
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setValueSelect(event.target.value);
    };
    async function modify(id, op) {
        let data = {}
        if (op === "ped") {
            data = {
                internal: null,
                note: codigo,
                lot: lote
            }
        }
        else {
            data = {
                internal: codigo,
                lot: lote
            }
        }
        const data2 = {
            thickness: esp
        }
        console.log("🚀 ~ file: Stock-1-internal.jsx ~ line 68 ~ modify ~ data", data)
        const res = await dispatch(plateActions.putPlate(id, data))
        console.log("🚀 ~ file: Stock-1-internal.jsx ~ line 67 ~ modify ~ res", res)
        const res2 = await dispatch(typeActions.putType(idType, data2))
        console.log("🚀 ~ file: Stock-1-internal.jsx ~ line 73 ~ modify ~ res2", res2)
        setReload(!reload)

    }

    return (
        <div className='containerStock'>
            <div className='containerNameStock'>

                <h1 className='titleStock'>Disponibles</h1>

            </div>
            <div className='containerInput'>

                <input className='input inputStock' type="text" placeholder='Buscar por color, cod. o emp.' onChange={(e) => setInputSearch(e.target.value)} />

            </div>
            <div className='containerCardsMarca mt10'>

                {filterOrd?.map(everyPlate => (
                    <div className='linkColors cardStock' /* to={'/nueva/color/tipo/'+everyPlate._id} */ key={everyPlate._id}>
                        <div className='companyCardStock'>

                            <h2 className='nameCards'>{everyPlate.color.name}</h2>
                            <h3 className='nameCards'>{everyPlate.company?.nameCompany}</h3>
                            {
                                everyPlate.internal ? (<h3 className='nameCards'>codInterno:{everyPlate.internal}</h3>)
                                    : <h3 className='nameCards'>codPedido: {everyPlate.note}</h3>
                            }

                            <h3 className='nameCards'>{everyPlate.type.name} {everyPlate.state[0].width} × {everyPlate.state[0].height} x {everyPlate.type.thickness}</h3>
                            <div className='bntEditDelet'>
                                <button className='iconEdit' onClick={() => handleClickOpen(everyPlate._id, everyPlate.internal, everyPlate.type.thickness, everyPlate.type._id, everyPlate.lot)}>Editar</button>
                                <button className='iconDelete' onClick={() => delet(everyPlate._id)}>Eliminar</button>
                                {/* <EditIcon className='iconEdit' />
                                <DeleteIcon className='iconDelet' /> */}
                            </div>
                        </div>


                        <img src={everyPlate.color.photo} alt={everyPlate._id} className='fitStock' id={everyPlate._id} />


                    </div>
                ))}
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <DialogContentText>
                        Editar campos
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        defaultValue={lote}
                        type="text"
                        fullWidth
                        label="Lote"
                        variant="standard"
                        onChange={(event) => setLote(event.target.value)}
                        id="nuevoEsp"
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        defaultValue={esp}
                        type="text"
                        fullWidth
                        label="Espesor"
                        variant="standard"
                        onChange={(event) => setEsp(event.target.value)}
                        id="nuevoEsp"
                    />

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

                        //label="Codigo interno"
                        variant="standard"
                        onChange={(event) => setCodigo(event.target.value)}
                        id="nuevoCod"
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => modify(id, valueSelect)}>Edit</Button>
                    <Button onClick={handleClose}>Finalize</Button>

                </DialogActions>


            </Dialog>
        </div>
    )

}
