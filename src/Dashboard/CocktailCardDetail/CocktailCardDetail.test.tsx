import React from "react";

import {render, screen} from "@testing-library/react";
import CocktailCardDetail from "./CocktailCardDetail";

const fakeDetalList = {
    "drinks": [
        {
            "idDrink": "11064",
            "strDrink": "Banana Daiquiri",
            "strTags": "Fruity",
            "strCategory": "Ordinary Drink",
            "strAlcoholic": "Alcoholic",
            "strGlass": "Champagne flute",
            "strInstructions": "Pour all ingredients into shaker with ice cubes. Shake well. Strain in chilled cocktail glass.",
            "strDrinkThumb": "https://www.thecocktaildb.com/images/media/drink/k1xatq1504389300.jpg",
            "strIngredient1": "Light rum",
            "strIngredient2": "Triple sec",
            "strIngredient3": "Banana",
            "strIngredient4": "Lime juice",
            "strIngredient5": "Sugar",
            "strIngredient6": "Cherry",
            "strIngredient7": null,
            "strIngredient8": null,
            "strIngredient9": null,
            "strIngredient10": null,
            "strIngredient11": null,
            "strIngredient12": null,
            "strIngredient13": null,
            "strIngredient14": null,
            "strIngredient15": null,
            "strImageSource": null,
        }
    ]
};

beforeEach(() => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve(fakeDetalList),
        }),
    ) as jest.Mock;
});


describe("Cocktail Card Detail", () => {
    test("renders Cocktail card details", async () => {
        render(<CocktailCardDetail drinkId="123456"/>);

        const label01 = await screen.findByTestId('label-alcoholic-123456');
        const label02 = await screen.findByTestId('label-category-123456');
        const label03 = await screen.findByTestId('label-glass-123456');
        const label04 = await screen.findByTestId('label-ingredients-123456');
        const label05 = await screen.findByTestId('label-instructions-123456');

        expect(label01.textContent).toBe("Alcoholic: Alcoholic");
        expect(label02.textContent).toBe("Category: Ordinary Drink");
        expect(label03.textContent).toBe("Glass: Champagne flute");
        expect(label04.textContent).toBe("Ingredients: Light rum, Triple sec, Banana, Lime juice, Sugar, Cherry");
        expect(label05.textContent).toBe("Instructions: Pour all ingredients into shaker with ice cubes. Shake well. Strain in chilled cocktail glass.");
    });

});