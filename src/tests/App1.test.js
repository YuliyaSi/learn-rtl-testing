import App1 from "../App1";
import {render, screen} from "@testing-library/react";

describe("App1", () => {
    it('render App1 and image tag', () => {
        render(<App1/>);
        screen.debug();
        expect(screen.getByRole('img')).toBeInTheDocument();
    });
})