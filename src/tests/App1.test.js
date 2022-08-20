import App1 from "../App1";
import {render, screen} from "@testing-library/react";

describe("App1", () => {
    it('render App1 and image tag', () => {
        render(<App1/>);
        screen.debug();
        expect(screen.getByRole('img')).toBeInTheDocument();
    });

    it('try different search variants', () => {
        render(<App1/>);
        // expect(screen.getByText(/Searches for React/i)).toBeNull() - error
        expect(screen.queryByText(/Searches for React/i)).toBeNull();
        // expect(screen.findByText(/Searches for React/i)).toBeNull(); - best for async values
    });

    it('should find user name', async () => {
       render(<App1/>);

       expect(screen.queryByText(/Logged as/i)).toBeNull();
       screen.debug()
       expect(await screen.findByText(/Logged as/i)).toBeInTheDocument();
       screen.debug()
    });

    it('use assertive functions', () => {
        render(<App1/>);
        expect(screen.queryByRole('img')).not.toHaveClass('image');
        expect(screen.getByRole('textbox')).toBeRequired();
        expect(screen.getByLabelText(/searc/i)).toBeEmptyDOMElement();
        expect(screen.getByLabelText(/search/i)).toHaveAttribute("id")
    });
})