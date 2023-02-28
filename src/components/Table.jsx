import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const { data } = useContext(PlanetsContext);
  const [searchPlanet, setSearchPlanet] = useState('');

  const filterPlanet = data.filter((planet) => {
    const planetName = planet.name.toLowerCase();
    const search = searchPlanet.toLowerCase();
    return planetName.includes(search);
  });

  return (
    <div>
      <label htmlFor="filter">
        Filtrar por nome:
        <input
          type="text"
          name="filter"
          data-testid="name-filter"
          onChange={ (e) => setSearchPlanet(e.target.value) }
        />
      </label>
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
          {filterPlanet.map((planet) => (
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
