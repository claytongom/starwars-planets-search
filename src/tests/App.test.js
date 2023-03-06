import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import PlanetsProvider from './PlanetsProvider';
import PlanetsContext from './PlanetsContext';

jest.mock('../services/PlanetsApiRequest', () => ({
  __esModule: true,
  default: jest.fn(() => Promise.resolve([{ name: 'Tatooine' }, { name: 'Alderaan' }])),
}));

describe('PlanetsProvider', () => {
  it('renders children correctly', () => {
    render(
      <PlanetsProvider>
        <div>Test children</div>
      </PlanetsProvider>,
    );

    expect(screen.getByText('Test children')).toBeInTheDocument();
  });

  it('fetches planets correctly', async () => {
    render(
      <PlanetsProvider>
        <PlanetsContext.Consumer>
          {({ data }) => <div>{data.length}</div>}
        </PlanetsContext.Consumer>
      </PlanetsProvider>,
    );

    await waitFor(() => expect(screen.getByText('2')).toBeInTheDocument());
  });

  it('applies filters correctly', async () => {
    render(
      <PlanetsProvider>
        <PlanetsContext.Consumer>
          {({ filterAdd, searchPlanet }) => (
            <>
              <button onClick={() => filterAdd({ column: 'diameter', comparison: 'maior que', value: 10000 })}>Filter</button>
              {searchPlanet.map((planet) => <div key={planet.name}>{planet.name}</div>)}
            </>
          )}
        </PlanetsContext.Consumer>
      </PlanetsProvider>,
    );

    expect(screen.getByText('Tatooine')).toBeInTheDocument();
    expect(screen.getByText('Alderaan')).toBeInTheDocument();

    userEvent.click(screen.getByText('Filter'));

    await waitFor(() => {
      expect(screen.getByText('Alderaan')).not.toBeInTheDocument();
      expect(screen.queryByText('Tatooine')).toBeInTheDocument();
    });
  });

  it('adds filters correctly', async () => {
    render(
      <PlanetsProvider>
        <PlanetsContext.Consumer>
          {({ filterAdd }) => (
            <>
              <button onClick={() => filterAdd({ column: 'population', comparison: 'maior que', value: 1000000 })}>Filter</button>
            </>
          )}
        </PlanetsContext.Consumer>
      </PlanetsProvider>,
    );

    userEvent.click(screen.getByText('Filter'));

    await waitFor(() => {
      expect(screen.queryByText('Tatooine')).not.toBeInTheDocument();
      expect(screen.queryByText('Alderaan')).not.toBeInTheDocument();
    });
  });

  it('calls setName correctly', async () => {
    const setNameMock = jest.fn();
    render(
      <PlanetsProvider>
        <PlanetsContext.Consumer>
          {({ setName }) => (
            <>
              <button onClick={() => setName('Tatooine')}>Set Name</button>
            </>
          )}
        </PlanetsContext.Consumer>
      </PlanetsProvider>,
    );
