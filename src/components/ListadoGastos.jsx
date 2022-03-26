import React from 'react'
import Gasto from './Gasto'
const ListadoGastos = ({gastos,setGastoEditar, eliminarGasto, filtro, gastoFiltrado}) => {
  return (
    <div className='listado-gastos contenedor'>
        { filtro ? (
          <>
          <h2>{gastoFiltrado.length ? 'Gastos':'No hay gastos'}</h2>
          {gastoFiltrado.map(gasto =>{
          return  <Gasto 
                key ={gasto.id}
                gasto ={gasto}
                setGastoEditar={setGastoEditar}
                eliminarGasto={eliminarGasto}
            />
        })}
        </>
        ) : (
          <>
          <h2>{gastos.length ? 'Gastos':'No hay gastos'}</h2>
          {gastos.map(gasto =>{
          return  <Gasto 
                key ={gasto.id}
                gasto ={gasto}
                setGastoEditar={setGastoEditar}
                eliminarGasto={eliminarGasto}
            />
        })}
        </>
        )}
    </div>
  )
}

export default ListadoGastos