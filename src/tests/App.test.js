import { render, screen } from '@testing-library/react';
import App from '../App';

describe("App", () => {
    it("renders App component", () => {
        render(<App/>);
        screen.debug();
        expect(screen.getByText("Search:")).toBeInTheDocument()
    });

    it("check all roles", () => {
        render(<App/>);
        expect(screen.getByText(/Search:/i)).toBeInTheDocument()
        expect(screen.getByRole('textbox')).toBeInTheDocument();
        expect(screen.getByLabelText(/search/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Search text...")).toBeInTheDocument();
        expect(screen.getByAltText('search-image')).toBeInTheDocument();
        expect(screen.getByDisplayValue('')).toBeInTheDocument();
    })
});
