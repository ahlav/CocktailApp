import React from "react";

import {render, screen} from "@testing-library/react";
import CocktailList from "./CocktailList";

const fakeCocktailList = {
    "drinks": [
        {
            "strDrink": "155 Belmont",
            "strDrinkThumb": "https://www.thecocktaildb.com/images/media/drink/yqvvqs1475667388.jpg",
            "idDrink": "15346"
        },
        {
            "strDrink": "57 Chevy with a White License Plate",
            "strDrinkThumb": "https://www.thecocktaildb.com/images/media/drink/qyyvtu1468878544.jpg",
            "idDrink": "14029"
        },
        {
            "strDrink": "747 Drink",
            "strDrinkThumb": "https://www.thecocktaildb.com/images/media/drink/i9suxb1582474926.jpg",
            "idDrink": "178318"
        },
    ]
};

beforeEach(() => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve(fakeCocktailList),
        }),
    ) as jest.Mock;
});


describe("CocktailList", () => {
    test("renders Cocktail list", async () => {
        render(<CocktailList type="Cocktails"/>);

        const description01 = await screen.findByTestId('cocktail-card-15346');
        const description02 = await screen.findByTestId('cocktail-card-14029');
        const description03 = await screen.findByTestId('cocktail-card-178318');
        expect(description01.textContent).toBe("C155 BelmontCocktails");
        expect(description02.textContent).toBe("C57 Chevy with a White License PlateCocktails");
        expect(description03.textContent).toBe("C747 DrinkCocktails");
    });

});