import { useState, useEffect } from 'react'
import Header from './components/Header'
import ListadoGastos from './components/ListadoGastos'
import Filtro from './components/Filtro'
import { generarId } from './helpers'
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import Modal from './components/Modal'
function App() {
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  )
  const [isValidPresupuesto, setisValidPresupuesto] = useState(false)
  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)
  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos')? JSON.parse(localStorage.getItem('gastos')) : []
  )
  const [gastoEditar, setGastoEditar] = useState({})
  const [filtro, setFiltro] = useState('')
  const [gastoFiltrado , setGastoFiltrado] = useState([])
  const handleNuevoGasto = () =>{
    setModal(true)
    setGastoEditar({})
    setTimeout(()=>{
      setAnimarModal(true)
    },500)
  }

  const guardarGasto = gasto => {
    if(gasto.id){
      const gastosActualizados = gastos.map(gastoState=> gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
      setGastoEditar({})
    }
    else{
    gasto.id = generarId()
    gasto.fecha = Date.now()
    setGastos([...gastos,gasto])
    }
    setAnimarModal(false)
      setTimeout(()=>{
        setModal(false)
        },500)
  }
  
  const eliminarGasto = id =>{
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id)
    setGastos(gastosActualizados)
  }

  useEffect(()=>{
    if(Object.keys(gastoEditar).length>0){
        setModal(true)
        setTimeout(()=>{
        setAnimarModal(true)
      },500)
    }
  },[gastoEditar])

  
  useEffect(()=>{
    localStorage.setItem('presupuesto',presupuesto)
  },[presupuesto])

  useEffect(()=>{
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  },[gastos])


  useEffect(()=>{
    if(filtro){
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro)
      setGastoFiltrado(gastosFiltrados)
    }
  },[filtro])
  useEffect(()=>{
      const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0
      if(presupuestoLS > 0){
        setisValidPresupuesto(true)
      }
  },[])

  return (
    <div className={modal? 'fijar':''}>
    <Header       
      presupuesto = {presupuesto}
      setPresupuesto = {setPresupuesto}
      isValidPresupuesto = {isValidPresupuesto}
      setisValidPresupuesto = {setisValidPresupuesto}
      gastos={gastos}
      setGastos={setGastos}
    />
    
    {isValidPresupuesto && (<>
      <main>
        <Filtro  filtro={filtro} setFiltro={setFiltro}/>
        <ListadoGastos gastos={gastos} setGastoEditar={setGastoEditar} eliminarGasto={eliminarGasto} filtro={filtro} gastoFiltrado={gastoFiltrado}/>
      </main>
      <div className='nuevo-gasto'>
        <img 
          src={IconoNuevoGasto}
          alt='Icono Nuevo Gasto'
          onClick={handleNuevoGasto}
        />
      </div>
      </>
      )}
      
      
      {modal && <Modal 
                setModal = {setModal} 
                animarModal={animarModal} 
                setAnimarModal={setAnimarModal} 
                guardarGasto={guardarGasto}
                gastoEditar={gastoEditar}
                setGastoEditar={setGastoEditar}  
                />}

    </div>
  )
}

export default App
