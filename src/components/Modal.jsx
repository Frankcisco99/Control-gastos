import React, {useState, useEffect} from 'react'
import Mensaje from './Mensaje'
import CerrarBtn from "../img/cerrar.svg"
    const Modal = ({setModal,animarModal,setAnimarModal,guardarGasto,gastoEditar, setGastoEditar}) => {
        const handleClick = ()=>{
            setAnimarModal(false)
            setGastoEditar({})
            setTimeout(()=>{
                setModal(false)
            },500)
        }

    const [nombre,setNombre] = useState('')
    const [cantidad,setCantidad] = useState('')
    const [categoria, setCategoria] = useState('')
    const [mensaje,setMensaje] = useState('')
    const [id,setId] = useState('')
    const [fecha, setFecha] = useState('')
//***********************Inicio Función************************** */
const handleSubmit = e=>{
    e.preventDefault()

    if([nombre,cantidad,categoria].includes('')){
        setMensaje("Todos los campos son necesarios")

        setTimeout(()=>setMensaje(''),3000)
        return
    }

    guardarGasto({
        nombre,
        cantidad,
        categoria,
        id,
        fecha
    })
}
//***********************Fin Función************************** */

    useEffect(()=>{
        if(Object.keys(gastoEditar).length >0){
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setId(gastoEditar.id)
            setFecha(gastoEditar.fecha)
        }
    },[])

  return (
    <div className='modal'>
        <div className='cerrar-modal'>
        <img 
            src={CerrarBtn}
            alt="cerrar modal"
            onClick={handleClick}
        />
        </div>
        <form className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}
        onSubmit={handleSubmit}
        >
            <legend>{gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>
            {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
            <div className='campo'>
                <label htmlFor='nombre'>Nombre del Gasto</label>
                <input
                    id='nombre'
                    type="text"
                    placeholder='Añade el nombre del gasto'
                    value={nombre}
                    onChange={(e)=> setNombre(e.target.value)}
                />
            </div>
            <div className='campo'>
                <label htmlFor='cantidad'>Cantidad</label>
                <input
                    id='cantidad'
                    type="number"
                    placeholder='Añade la cantidad'
                    value={cantidad}
                    onChange={(e)=> setCantidad(Number(e.target.value))}
                />
            </div>
            <div className='campo'>
                <label htmlFor='categoria'>Categoria</label>
                <select 
                id='categoria'
                value={categoria}
                onChange={(e)=> setCategoria(e.target.value)}
                >
                        <option value="">--Seleccione--</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos Varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                </select>
            </div>

            <input 
                type='submit'
                value={gastoEditar.nombre ? 'Guardar Cambios' : 'Añadir Gasto'}
            />
        </form>
    </div>
  )
}

export default Modal