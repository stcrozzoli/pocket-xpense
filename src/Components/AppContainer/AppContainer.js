import PieChart from '../PieChart/PieChart';
import './AppContainer.css';
import { useState, useEffect, useRef } from 'react';
import logo from '../../assets/logoMainContainer.png';

const AppContainer = () => {
  const [inputValues, setInputValues] = useState(() => {
    const storedData = localStorage.getItem('gastosPorMes');
    return storedData ? JSON.parse(storedData) : {};
  });
  const [gastosPorMes, setGastosPorMes] = useState(inputValues);
  const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const [valorMes, setValorMes] = useState(0);
  const [mesActual, setMesActual] = useState(meses[0]);
  const inputGastoRef = useRef(null);
  const inputCategoriaRef = useRef(null);

  const agregarGasto = () => {
    const nuevoGasto = inputGastoRef.current.value;
    const nuevaCategoria = inputCategoriaRef.current.value;

    if (!nuevoGasto || !nuevaCategoria) {
      alert('Debes llenar ambos campos');
      return;
    }

    if (nuevoGasto.length > 13 || nuevaCategoria.length > 20) {
      alert('Cumpliste el máximo de caracteres, trata de reducirlo');
      return;
    }

    const gastoConCategoria = `$${nuevoGasto} - ${nuevaCategoria}`;

    setInputValues(prevInputValues => ({
      ...prevInputValues,
      [mesActual]: [...(prevInputValues[mesActual] || []), gastoConCategoria]
    }));
    setGastosPorMes(prevGastosPorMes => ({
      ...prevGastosPorMes,
      [mesActual]: [...(prevGastosPorMes[mesActual] || []), gastoConCategoria]
    }));

    inputGastoRef.current.value = '';
    inputCategoriaRef.current.value = '';
  };

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      const nuevoGasto = event.target.value;
      const nuevaCategoria = inputCategoriaRef.current.value;

      if (!nuevoGasto || !nuevaCategoria) {
        alert('Debes llenar ambos campos');
        return;
      }

      const gastoConCategoria = `$${nuevoGasto} - ${nuevaCategoria}`;

      setInputValues(prevInputValues => ({
        ...prevInputValues,
        [mesActual]: [...(prevInputValues[mesActual] || []), gastoConCategoria]
      }));
      setGastosPorMes(prevGastosPorMes => ({
        ...prevGastosPorMes,
        [mesActual]: [...(prevGastosPorMes[mesActual] || []), gastoConCategoria]
      }));

      event.target.value = '';
      inputCategoriaRef.current.value = '';
    }
  };

  const eliminarGasto = (gasto) => {
    setInputValues(prevInputValues => {
      const updatedInputValues = { ...prevInputValues };
      updatedInputValues[mesActual] = updatedInputValues[mesActual].filter(item => item !== gasto);
      return updatedInputValues;
    });
    setGastosPorMes(prevGastosPorMes => {
      const updatedGastosPorMes = { ...prevGastosPorMes };
      updatedGastosPorMes[mesActual] = updatedGastosPorMes[mesActual].filter(item => item !== gasto);
      return updatedGastosPorMes;
    });
  };

  useEffect(() => {
    localStorage.setItem('gastosPorMes', JSON.stringify(gastosPorMes));
  }, [gastosPorMes]);

  const onClickMesMas = () => {
    setValorMes(prevValor => {
      const nuevoValor = (prevValor + 1) % meses.length;
      setMesActual(meses[nuevoValor]);
      return nuevoValor;
    });
  };

  const onClickMesMenos = () => {
    setValorMes(prevValor => {
      const nuevoValor = (prevValor - 1 + meses.length) % meses.length;
      setMesActual(meses[nuevoValor]);
      return nuevoValor;
    });
  };

  const gastosOrdenados = [...(gastosPorMes[mesActual] || [])].sort((a, b) => b - a);
  const tablaGastosVacia = gastosOrdenados.length === 0;

  return (
    <div className="divPrincipal">
      <div className='divMes'>
        <h2 className='tituloMes'>{mesActual}</h2>
      </div>
      <div className='divGastos'>
        <div className='divInputs'>
          <input className='inputsTwo' id="inputGasto" type="number" onKeyDown={handleKeyDown} placeholder='Introduce tu gasto' ref={inputGastoRef} />
          <input className='inputsTwo' id='inputCategoria' type="text" placeholder='Categoría' ref={inputCategoriaRef} />
          <button className='botonesGastos' onClick={agregarGasto}>Agregar gasto</button>
        </div>
      </div>
      <div className='divGrafico'>
        {tablaGastosVacia ? (
          <img src={logo} alt='Logo' className='logo' />
        ) : (
          <PieChart data={inputValues} mesActual={mesActual} />
        )}
      </div>
      <div className='divContenedorTabla'>
        <p className='pTablaGastos'>Gastos:</p>
        <div className='divTablaGastos'>
          <ul className='ulTablaGastos'>
            {gastosOrdenados.map((gasto, index) => (
              <li className='elementsUl' key={index}>
                {gasto}
                <button className='botonEliminar' onClick={() => eliminarGasto(gasto)}>X</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='divCambiarMes'>
        <button className='mesMasMenos' onClick={onClickMesMenos}>←</button>
        <p className='pCambiarMes'>Cambiar mes</p>
        <button className='mesMasMenos' onClick={onClickMesMas}>→</button>
      </div>
      <p className="mark">by stcrozzoli💫</p>
    </div>
  );
};

export default AppContainer;
