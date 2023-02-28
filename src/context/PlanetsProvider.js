import PropTypes from 'prop-types';
import React, { useState, useEffect, useMemo } from 'react';
import PlanetsContext from './PlanetsContext';
import fetchPlanets from '../services/PlanetsApiRequest';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);

  useEffect(
    () => {
      fetchPlanets().then((planets) => setData(planets));
    },
    [],
  );

  const context = useMemo(() => ({
    data,
    setData,
  }), [data, setData]);

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
