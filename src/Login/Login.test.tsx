import React from "react";

import {fireEvent, render, screen} from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import Login from "./Login";

global.fetch = jest.fn().mockResolvedValue({
    json: () => ({})
});

function useMockToken(): Function {
    return () => {
        return "123456def"
    };
}

function renderLoginForm() {
    const token = useMockToken();
    return render(<Login setToken={token as any}/>);
}

beforeEach(() => {
    renderLoginForm();
});

describe("Login", () => {
    test("should display a blank login form", async () => {
        const usernameField = screen.getByTestId('login-username').querySelector('input');
        const passwordField = screen.getByTestId('login-password').querySelector('input');

        expect(usernameField).toBeInTheDocument();
        expect(usernameField?.value).toBe('');

        expect(passwordField).toBeInTheDocument();
        expect(passwordField?.value).toBe('');
    });

    test("should allow entering a username", async () => {
        const usernameField = screen.getByTestId('login-username').querySelector('input');
        fireEvent.change(usernameField as Element, {target: {value: 'Franta'}});
        expect(usernameField?.value).toBe('Franta');
    });

    test("should allow entering a password", async () => {
        const passwordField = screen.getByTestId('login-password').querySelector('input');
        fireEvent.change(passwordField as Element, {target: {value: 'secret'}});
        expect(passwordField?.value).toBe('secret');
    });

    test("should submit the form with username and password", async () => {
        const usernameField = screen.getByTestId('login-username').querySelector('input');
        const passwordField = screen.getByTestId('login-password').querySelector('input');

        await userEvent.type(usernameField as Element, 'JavaScript');
        await userEvent.type(passwordField as Element, 'secret');
        await userEvent.click(screen.getByTestId('login-submit'));

        expect(fetch).toHaveBeenCalledTimes(1);
    });

    test("should not submit the form with username and no password", async () => {
        const usernameField = screen.getByTestId('login-username').querySelector('input');
        const submitButton = screen.getByTestId('login-submit');

        await userEvent.type(usernameField as Element, 'Name');
        expect(submitButton).toBeDisabled();
        expect(fetch).toHaveBeenCalledTimes(0);
    });

});