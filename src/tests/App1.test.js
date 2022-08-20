import App1 from "../App1";
import {render, screen, fireEvent} from "@testing-library/react";

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
});

describe('fire events', () => {

    it('should render inputted text', async () => {
        render(<App1/>);
        await screen.findByText(/Logged as/i);
        expect(screen.queryByText(/searches for react/i)).toBeNull();
        fireEvent.change(screen.getByRole('textbox'), {
            target: {value: 'React'}
        })
        expect(screen.queryByText(/searches for react/i)).toBeInTheDocument();
    });

    it('should change checkbox', () => {
        const handleChange = jest.fn()
        const { container } = render(<input type="checkbox" onChange={handleChange}/>)
        const checkbox = container.firstChild;
        expect(checkbox).not.toBeChecked();
        fireEvent.click(checkbox);
        expect(checkbox).toBeChecked();
        // or
        expect(handleChange).toHaveBeenCalledTimes(1)
    });

    it('should be focused', () => {
        const handleChange = jest.fn()
        const { getByTestId } = render(<input type="text" data-testId="input" onChange={handleChange}/>)
        const input = getByTestId('input');
        expect(input).not.toHaveFocus();
        input.focus();
        expect(input).toHaveFocus();
    });
})