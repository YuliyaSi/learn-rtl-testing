import React from "react";
import axios from "axios";
import {render, act} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App2 from "../App2";


// to begin with we are mocking axios library
jest.mock("axios");

// and create object with expected data
const hits = [
    {
        objectId: '1', title: 'Angular'
    },
    {
        objectId: '2', title: 'React'
    },
]


describe("App2", () => {
    it('should fetching news from api', async () => {
        // inside mocked axios rewrite the method get
        axios.get.mockImplementationOnce(() => Promise.resolve({ data: { hits }}));
        const { getByRole, findAllByRole } = render(<App2/>);
        userEvent.click(getByRole('button'));
        const items = await findAllByRole('listitem')
        expect(items).toHaveLength(2);

        // additional
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(axios.get).toHaveBeenCalledWith("http://hn.algolia.com/api/v1/search?query=React");
    });

    it('negative case', async () => {
        // inside mocked axios rewrite the method get
        axios.get.mockImplementationOnce(() => Promise.reject( new Error()));
        const { getByRole, findByText } = render(<App2/>);
        userEvent.click(getByRole('button'));
        const message = await findByText(/Something went wrong/i);
        expect(message).toBeInTheDocument();
    });
    
    // awaiting a promise with act
    it('should fetching', async () => {
        const promise = Promise.resolve({ data: { hits }});
        // inside mocked axios rewrite the method get
        axios.get.mockImplementationOnce(() => promise);
        const { getByRole, getAllByRole } = render(<App2/>);
        userEvent.click(getByRole('button'));
        await act(() => promise)
        expect(getAllByRole('listitem')).toHaveLength(2);
    });
})