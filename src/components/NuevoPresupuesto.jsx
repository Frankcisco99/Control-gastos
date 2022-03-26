import {useState} from 'react'
import Mensaje from './Mensaje'
const NuevoPresupuesto = ({presupuesto, setPresupuesto, setisValidPresupuesto}) => {

    const [mensaje, setMensaje] = useState('')

    const handlePresupuesto = (e) =>{
        e.preventDefault()

        if(!Number(presupuesto) || Number(presupuesto)<=0){
            setMensaje('No es un presupuesto valido!')
            return
        }

        setMensaje('')
        setisValidPresupuesto(true)
    }
  return (
    <div className='contenerdor-presupuesto contenedor sombra'>
        <form onSubmit={handlePresupuesto} className='formulario'>
            <div className='campo'>
                <label>Definir Presupuesto</label>
                <input
                    className='nuevo-presupuesto' 
                    type='number'
                    placeholder='Añade tu presupuesto'
                    value={presupuesto}
                    onChange = {(e) => setPresupuesto(Number(e.target.value))}
                />
            </div>
            <input 
                type='submit'
                value='Añadir'
            />

            {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
        </form>
    </div>
  )
}

export default NuevoPresupuesto