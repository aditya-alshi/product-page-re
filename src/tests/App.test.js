import { getByTestId, render, screen } from '@testing-library/react';
import App from '../App';

test('abcd',()=>{
    render(<App />);
    const nazw = screen.getByTestId('looktuke');
    expect(getComputedStyle(nazw).margin).toMatch(/static/);
})