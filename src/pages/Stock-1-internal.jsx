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


export default function StockInternalPlates() {

    const dispatch = useDispatch()
    const [inputSearch, setInputSearch] = useState("")
    const [reload, setReload] = useState(false)
    const [open, setOpen] = useState(false);
    const [id, setId] = useState("")
    const [idComp, setIdComp] = useState("")
    const [lote, setLote] = useState("")
    const [codigo, setCodigo] = useState("")
    const [esp, setEsp] = useState({})
    //const [type, setType] = useState("")
    const [valueSelect, setValueSelect] = useState('');



    useEffect(() => {
        dispatch(plateActions.internalPlate())
        // eslint-disable-next-line
    }, [reload])

    useEffect(() => {
        dispatch(plateActions.filterInternalPlates(inputSearch))
        dispatch(typeActions.getTypes(idComp))
        // eslint-disable-next-line
    }, [inputSearch, idComp])

    // let internalPlate = useSelector(store => store.plateReducer.internalPlate)
    let filterPlates = useSelector(store => store.plateReducer.filterInternalPlates)
    const types = useSelector(store => store.typeReducer.types)
    console.log("🚀 ~ file: Stock-1-internal.jsx ~ line 50 ~ StockInternalPlates ~ types", types)

    const [type, setType] = useState(
        types.find((a) => a._id === esp._id)
    );
    console.log("🧉 ~ file: Stock-1-internal.jsx ~ line 55 ~ StockInternalPlates ~ type", type)
    const typeAct = (id) => {
        setType(types.find((a) => a._id === id));
    };
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

    const handleClickOpen = (id, codigo, esp, idComp, lote, type) => {
        
        setOpen(true);
        setId(id);
        setCodigo(codigo);
        //setEsp(esp);
        setIdComp(idComp)
        setLote(lote)
        setValueSelect("int")
        setEsp(type._id);
        setType(type)

    } 
    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setValueSelect(event.target.value);
    };
    const handleChangeType = (event) => {
        console.log("🚀 ~ file: Stock-1-internal.jsx ~ line 88 ~ handleChangeType ~ event", event.target.value)
        setEsp(event.target.value)
        typeAct(event.target.value);
        console.log(type)
        //setReload(!reload)
    };
    
    async function modify(id, op) {
        let data = {}
        if (op === "ped") {
            data = {
                internal: null,
                note: codigo,
                lot: lote,
                type:type
            }
        }
        else {
            data = {
                internal: codigo,
                lot: lote,
                type:type
            }
        }
        
        console.log("🚀 ~ file: Stock-1-internal.jsx ~ line 68 ~ modify ~ data", data)
        const res = await dispatch(plateActions.putPlate(id, data))
        console.log("🚀 ~ file: Stock-1-internal.jsx ~ line 67 ~ modify ~ res", res)

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
                                <button className='iconEdit' onClick={() => handleClickOpen(everyPlate._id, everyPlate.internal, everyPlate.type.thickness, everyPlate.company._id, everyPlate.lot, everyPlate.type)}>Editar</button>
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
                        id="nuevoLote"
                    />
                    <div className='selectCodigo'>
                        <InputLabel id="demo-simple-select-label2">Espesor:</InputLabel>
                        <Select
                        
                            labelId="demo-simple-select-label2"
                            id="demo-simple-select2"
                            value={esp}
                            onChange={handleChangeType}
                            defaultValue={esp}
                        >
                            {types.map((t) => (
                                <MenuItem value={t._id} key={t._id}>
                                    {t.name} {t.width}x{t.height} : {t.thickness}
                                </MenuItem>
                            ))}
                        </Select>
                        
                    </div>


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
