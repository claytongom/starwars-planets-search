import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Header from '../components/Header';

describe('testando o Header', () => {
    test('testando se o titulo "Star Wars" está na tela', () => {
        render(<Header />);
        const headerTitle = screen.getByRole('heading', {  name: /🪐star wars🪐/i})
        expect(headerTitle).toBeInTheDocument();
    })
});
