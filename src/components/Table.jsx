import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const { searchPlanet,
    setName,
    filterAdd,
    columnFilter,
    setColumnFilter,
    removeAllFilters,
    data,
    setSearchPlanet,
    setFilterSelect,
    filterSelect,
  } = useContext(PlanetsContext);

  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);
  // const [filterSelect, setFilterSelect] = useState([]);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleFilterSelect = () => {
    setFilterSelect([...filterSelect, {
      column,
      comparison,
      value,
    }]);
  };

  const handleClick = () => {
    const dataFilters = {
      column,
      comparison,
      value,
    };
    const filteredColumn = columnFilter
      .filter((elem) => elem !== dataFilters.column);
    setColumnFilter(filteredColumn);
    setColumn(filteredColumn[0]);
    filterAdd(dataFilters);
    setComparison('maior que');
    setValue(0);
    handleFilterSelect();
  };

  const handleRemoveFilterSelect = (index, filterColumn) => {
    const newFilterSelect = [...filterSelect];
    newFilterSelect.splice(index, 1);
    setFilterSelect(newFilterSelect);
    setSearchPlanet(data);
    setColumnFilter((prevState) => [...prevState, filterColumn]);
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
          id="column-filter"
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
          id="comparison-filter"
          name="comparison"
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
          id="value-filter"
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
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ removeAllFilters }
      >
        Remove todas filtragens
      </button>
      <div>
        {filterSelect.map((f, index) => (
          <div data-testid="filter" key={ index }>
            <p>{f.column}</p>
            <p>{f.comparison}</p>
            <p>{f.value}</p>
            <button
              type="button"
              data-testid="button-remove-filterSelect"
              onClick={ () => handleRemoveFilterSelect(index, f.column) }
            >
              X
            </button>
          </div>
        ))}
      </div>
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
