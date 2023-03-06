import PropTypes from 'prop-types';
import React, { useState, useEffect, useMemo } from 'react';
import PlanetsContext from './PlanetsContext';
import fetchPlanets from '../services/PlanetsApiRequest';

const options = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [searchPlanet, setSearchPlanet] = useState(data);
  const [name, setName] = useState('');
  const [filter, setFilter] = useState([]);
  const [columnFilter, setColumnFilter] = useState(options);

  useEffect(
    () => {
      fetchPlanets().then((planets) => setData(planets));
    },
    [],
  );
  useEffect(() => {
    const inputFilter = () => setSearchPlanet(
      data.filter((planet) => planet.name.includes(name)),
    );
    inputFilter();
  }, [data, name]);

  const filterAdd = (filters) => {
    setFilter((oldFilter) => {
      if (oldFilter.length) {
        return [...oldFilter, filters];
      }
      return [filters];
    });
  };

  useEffect(() => {
    const filterPlanets = () => {
      filter.forEach(({ column, comparison, value }) => {
        setSearchPlanet((oldData) => oldData.filter((planet) => {
          switch (comparison) {
          case 'maior que':
            return Number(planet[column]) > Number(value);
          case 'menor que':
            return Number(planet[column]) < Number(value);
          case 'igual a':
            return Number(planet[column]) === Number(value);
          default:
            return true;
          }
        }));
      });
    };

    const filterColumn = columnFilter
      .filter((columnSelected) => filter.find(({ column }) => column !== columnSelected));
    setColumnFilter(filterColumn);
    filterPlanets();
  }, [data, filter]);

  const context = useMemo(() => ({
    searchPlanet,
    filterAdd,
    data,
    setName,
    columnFilter,
  }), [data, searchPlanet, setName, columnFilter]);

  return (
    <PlanetsContext.Provider value={ context }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
