import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const { searchPlanet,
    data,
    setName,
    filterAdd,
    columnFilter
  } = useContext(PlanetsContext);

  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);
  console.log(searchPlanet, data);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleClick = () => {
    const dataFilters = {
      column,
      comparison,
      value,
    };
    filterAdd(dataFilters);
  };

  return (
    <div>
      <label htmlFor="filter">
        Filtrar por nome:
        <input
          type="text"
          name="filter"
          data-testid="name-filter"
          onChange={ (e) => handleChange(e) }
        />
      </label>
      <label htmlFor="column-filter">
        Filtrar por coluna:
        <select
          name="column-filter"
          data-testid="column-filter"
          value={ column }
          onChange={ (e) => setColumn(e.target.value) }
        >
          { columnFilter.map((columnItem) => (
            <option key={ columnItem } value={ columnItem }>{columnItem}</option>
          ))}
        </select>
      </label>
      <label htmlFor="comparison-filter">
        Comparação:
        <select
          name="comparison-filter"
          data-testid="comparison-filter"
          value={ comparison }
          onChange={ (e) => setComparison(e.target.value) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="value-filter">
        Valor:
        <input
          type="number"
          name="value-filter"
          data-testid="value-filter"
          value={ value }
          onChange={ (e) => setValue(e.target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Filtrar
      </button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {searchPlanet?.map((planet) => (
            <tr key={ planet.name }>
              <td>{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
              <td>{planet.films}</td>
              <td>{planet.created}</td>
              <td>{planet.edited}</td>
              <td>{planet.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
