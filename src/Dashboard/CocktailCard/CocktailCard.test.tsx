import React from "react";

import {render, screen} from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import CocktailCard from "./CocktailCard";

global.fetch = jest.fn().mockResolvedValue({
    json: () => ({drinks: []})
});

beforeEach(() => {
    return render(<CocktailCard name={"Cuba libre"}
                                imgUrl={""} type={"Cocktail"}
                                drinkId={"123456"}/>);
});

describe("CocktailCard", () => {
    test("should display cocktail card", async () => {
        const cardHeader = screen.getByText("Cuba libre");
        const cardSubheader = screen.getByText("Cocktail");

        expect(cardHeader).toBeInTheDocument();
        expect(cardSubheader).toBeInTheDocument();
    });

    test("should trigger fetch when opening collapse", async () => {
        const expandButton = screen.getByTestId('expand-button-123456');
        expect(expandButton).toHaveAttribute("aria-expanded", "false");

        await userEvent.click(expandButton);

        expect(expandButton).toHaveAttribute("aria-expanded", "true");
        expect(fetch).toHaveBeenCalledTimes(1);
    });


});