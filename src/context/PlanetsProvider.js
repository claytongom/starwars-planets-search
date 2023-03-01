import PropTypes from 'prop-types';
import React, { useState, useEffect, useMemo } from 'react';
import PlanetsContext from './PlanetsContext';
import fetchPlanets from '../services/PlanetsApiRequest';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [searchPlanet, setSearchPlanet] = useState(data);
  const [name, setName] = useState('');

  useEffect(
    () => {
      fetchPlanets().then((planets) => setData(planets));
    },
    [],
  );
  useEffect(() => {
    const filter = () => setSearchPlanet(
      data.filter((planet) => planet.name.includes(name)),
    );
    filter();
  }, [data, name]);

  const context = useMemo(() => ({
    searchPlanet,
    data,
    setName,
  }), [data, searchPlanet, setName]);

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
