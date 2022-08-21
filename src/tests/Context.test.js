import React, {createContext, useContext, useState} from "react";
import {getByText, render} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [isLoggedIn, toggleLoginStatus] = useState(false);

    const toggleLogin = () => {
        toggleLoginStatus(!isLoggedIn)
    };

    return (
        <AuthContext.Provider value={{toggleLogin, isLoggedIn}}>
            <div>
                Message: {children}
            </div>
        </AuthContext.Provider>
    );
};

const ConsumerComponent = () => {
    const {isLoggedIn, toggleLogin} = useContext(AuthContext);

    return (
        <>
            <input type="button" value="Login" onClick={toggleLogin}/>
            {isLoggedIn ? "Welcome" : "Please, log in"}
        </>
    )
};


describe('Context', () => {
    it('should shows default value', () => {
        const {getByText} = render(
            <AuthProvider>
                <ConsumerComponent/>
            </AuthProvider>
        );
        const message = getByText(/^Message:/)
        expect(message).toBeInTheDocument();
        expect(message).toHaveTextContent("Message: Please, log in");
    });

    it('should change message', () => {
        const {getByText, getByRole} = render(
            <AuthProvider>
                <ConsumerComponent/>
            </AuthProvider>
        );
        const message = getByText(/^Message:/);
        const button = getByRole('button')
        expect(message).toHaveTextContent("Message: Please, log in");
        userEvent.click(button);
        expect(message).toHaveTextContent("Message: Welcome");
        userEvent.click(button);
        expect(message).toHaveTextContent("Message: Please, log in");
    });
})
