import PropTypes from 'prop-types';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
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
  const [filterSelect, setFilterSelect] = useState([]);

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
    setFilterSelect((oldFilter) => {
      if (oldFilter.length) {
        return [...oldFilter, filters];
      }
      return [filters];
    });
  };

  useEffect(() => {
    const filterPlanets = () => {
      filterSelect.forEach(({ column, comparison, value }) => {
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

    filterPlanets();
  }, [data, filterSelect]);

  const removeAllFilters = useCallback(() => {
    setSearchPlanet(data);
    setColumnFilter(options);
    setFilterSelect([]);
  }, [data]);

  const context = useMemo(() => ({
    searchPlanet,
    filterAdd,
    data,
    setName,
    columnFilter,
    setColumnFilter,
    removeAllFilters,
    setSearchPlanet,
    filterSelect,
    setFilterSelect,
    setFilter,
    filter,
  }), [data,
    searchPlanet,
    setName,
    columnFilter,
    setColumnFilter,
    removeAllFilters,
    setSearchPlanet,
    filterSelect,
    setFilter,
    filter,
  ]);

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
//
