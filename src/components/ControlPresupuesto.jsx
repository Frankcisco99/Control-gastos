import {useState,useEffect} from 'react'
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
const ControlPresupuesto = ({presupuesto,gastos, setPresupuesto, setGastos, setisValidPresupuesto}) => {
    const [porcentaje, setPorcentaje] = useState(0)
    const [gastado, setGastado] = useState(0)
    const [disponible, setDisponible] = useState(0)

    const formatoDinero = (cantidad)=>{
        return cantidad.toLocaleString('en-US',{
            style: 'currency',
            currency: 'USD'
        })
    }

    const handleReset = ()=>{
        const pregunta = confirm("Deseas resetear la app?")
        if(pregunta){
            setGastos([])
            setPresupuesto(0)
            setisValidPresupuesto(false)
        }
    }
    useEffect(()=>{
        const totalGastado = gastos.reduce((total,gasto)=> gasto.cantidad + total,0)
        const totalDisponible = presupuesto - totalGastado
        const totalPorcentaje = ((100 * totalGastado)/presupuesto).toFixed(2)
        setGastado(totalGastado)
        setDisponible(totalDisponible)
        setPorcentaje(totalPorcentaje)
        console.log(totalPorcentaje);
    },[gastos])
  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
            <CircularProgressbar
                value={porcentaje}
                text={`${porcentaje}% Gastado`}
                styles={buildStyles({
                    pathColor: porcentaje > 100 ? 'red' : '#3B82F6',
                    textColor: porcentaje > 100 ? 'red' : '#3B82F6'
                })}
            />
        </div>

        <div className='contenido-presupuesto'>
            <button
                className='reset-app'
                type='button'
                onClick={handleReset}
            >
                Resetear App
            </button>
            <p><span>Presupuesto:</span> {formatoDinero(presupuesto)}</p>
            <p className={disponible < 0 ? 'negativo' : ''}><span>Disponible:</span> {formatoDinero(disponible)}</p>
            <p><span>Gastado:</span> {formatoDinero(gastado)}</p>
        </div>
    </div>
  )
}

export default ControlPresupuesto