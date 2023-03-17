import React from "react";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import Table from "../components/Table";
import { wait } from "@testing-library/user-event/dist/utils";
import PlanetsProvider from "../context/PlanetsProvider";
import userEvent from "@testing-library/user-event";
import { mockData } from "./mockData";
import { act } from "react-dom/test-utils";
import App from "../App";

describe("testando o Table", () => {
    beforeEach(() => {
        global.fetch = jest.fn(async () => ({
            json: async () => mockData,
        }));
    });

    afterEach(cleanup);

    test("testando se renderiza os filtros", async () => {
        render(<PlanetsProvider><App /></PlanetsProvider>);
        await waitFor(() => expect(screen.getByRole('cell', { name: /hoth/i })).toBeInTheDocument());
        wait(3000);
        
        const filterName = screen.getByRole('textbox');
        const filterColumn = screen.getByRole('combobox', { name: /filtrar por coluna:/i });
        const filterComparison = screen.getByRole('combobox', { name: /comparação:/i });
        const filterValue = screen.getByRole('spinbutton', { name: /valor:/i });

        expect(filterName).toBeInTheDocument();
        expect(filterColumn).toBeInTheDocument();
        expect(filterComparison).toBeInTheDocument();
        expect(filterValue).toBeInTheDocument();
    })

    test("testando se realiza todos os filtros", async () => {
        render(<PlanetsProvider><App /></PlanetsProvider>);
        await waitFor(() => expect(screen.getByRole('cell', { name: /hoth/i })).toBeInTheDocument());
        wait(3000);
     
        const filterColumn = screen.getByRole('combobox', { name: /filtrar por coluna:/i });
        const filterComparison = screen.getByRole('combobox', { name: /comparação:/i });
        const filterValue = screen.getByRole('spinbutton', { name: /valor:/i });
        const filterButton = screen.getByRole('button', { name: /filtrar/i });

        const planetHoot = screen.getByRole('cell', { name: /hoth/i });

        userEvent.selectOptions(filterColumn, 'population');
        userEvent.selectOptions(filterComparison, 'maior que');
        userEvent.type(filterValue, '0');
        userEvent.click(filterButton);

        userEvent.selectOptions(filterColumn, 'orbital_period');
        userEvent.selectOptions(filterComparison, 'menor que');
        userEvent.type(filterValue, '410');
        userEvent.click(filterButton);

        userEvent.selectOptions(filterColumn, 'diameter');
        userEvent.selectOptions(filterComparison, 'igual a');
        userEvent.type(filterValue, '4900');
        userEvent.click(filterButton);

        expect(planetHoot).not.toBeInTheDocument();

        const deleteFilterSelect = screen.getAllByRole('button', { name: /x/i })[2];

        userEvent.click(deleteFilterSelect);
        expect(screen.getByRole('cell', { name: /tatooine/i })).toBeInTheDocument();

        const removeAllFilters = screen.getByRole('button', { name: /remove todas filtragens/i });

        userEvent.click(removeAllFilters);

        expect(screen.getByRole('cell', { name: /hoth/i })).toBeInTheDocument();

    });

    test("testando se realiza uma busca por nome", async () => {
        render(<PlanetsProvider><App /></PlanetsProvider>);
        await waitFor(() => expect(screen.getByRole('cell', { name: /hoth/i })).toBeInTheDocument());
        wait(3000);

        const inputName = screen.getByRole('textbox')

        userEvent.type(inputName, 'Yavin');

        expect(screen.getByRole('cell', { name: /yavin iv/i })).toBeInTheDocument();

    });
});
