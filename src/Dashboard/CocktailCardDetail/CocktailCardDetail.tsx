import React, {useEffect, useState} from 'react';
import './CocktailCardDetail.css';
import CocktailDetailsType from "./CocktailDetailsType";

async function getCocktailDetails(id: string, setJsonDetails: Function) {
    const url = (
        'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?' +
        new URLSearchParams({i: id}).toString()
    );
    const response = await fetch(url);
    const jsonData = await response?.json();
    setJsonDetails(jsonData.drinks);
}

function getIngredientsList(drink: CocktailDetailsType) {
    let arr = [];
    for (const [key, value] of Object.entries(drink)) {
        if (key.startsWith("strIngredient")) {
            if (value !== null) {
                arr.push(value);
            }
        }
    }
    return arr.join(", ");
}

export default function CocktailCardDetail({drinkId}: { drinkId: string }) {
    const [jsonDetails, setJsonDetails] = useState<CocktailDetailsType[]>([]);

    useEffect(() => {
        getCocktailDetails(drinkId, setJsonDetails);
    }, [drinkId]);

    return (
        <>
            {jsonDetails.map((drink: CocktailDetailsType) => (
                <div key={drinkId}>
                    <div className="row" data-testid={"label-alcoholic-" + drinkId}>
                        <label className="drink-label">Alcoholic: </label><span>{drink.strAlcoholic}</span>
                    </div>
                    <div className="row" data-testid={"label-category-" + drinkId}>
                        <label className="drink-label">Category: </label><span>{drink.strCategory}</span>
                    </div>
                    <div className="row" data-testid={"label-glass-" + drinkId}>
                        <label className="drink-label">Glass: </label><span>{drink.strGlass}</span>
                    </div>
                    <div className="row" data-testid={"label-ingredients-" + drinkId}>
                        <label className="drink-label">Ingredients: </label>
                        <span>{getIngredientsList(drink)}</span>
                    </div>
                    <div className="row" data-testid={"label-instructions-" + drinkId}>
                        <label className="drink-label">Instructions: </label><br/><span>{drink.strInstructions}</span>
                    </div>
                </div>
            ))}
        </>
    )
}


