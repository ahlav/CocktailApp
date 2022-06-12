import React, {useEffect, useState} from 'react';
import './CocktailCardDetail.css';
import CocktailDetails from "./CocktailDetails";

const getCocktailDetails = async (id: string, setJsonDetails: Function) => {
    const url = (
        'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?' +
        new URLSearchParams({i: id}).toString()
    );
    const response = await fetch(url);
    const jsonData = await response?.json();
    setJsonDetails(jsonData.drinks);
};

function getIngredientsList(drink: CocktailDetails) {
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
    const [jsonDetails, setJsonDetails] = useState([]);

    useEffect(() => {
        getCocktailDetails(drinkId, setJsonDetails);
    }, [drinkId]);

    return (
        <div className="cocktail-detail-list">
            {jsonDetails.map((drink: CocktailDetails) => (
                <div key={drinkId}>
                    <div className="row">
                        <label className="drink-label">Alcoholic: </label>{drink.strAlcoholic}
                    </div>
                    <div className="row">
                        <label className="drink-label">Category: </label>{drink.strCategory}
                    </div>
                    <div className="row">
                        <label className="drink-label">Glass: </label>{drink.strGlass}
                    </div>
                    <div className="row">
                        <label className="drink-label">Ingredients: </label>
                        {getIngredientsList(drink)}
                    </div>
                    <div className="row">
                        <label className="drink-label">Instructions: </label><br/>{drink.strInstructions}
                    </div>
                </div>
            ))}
        </div>
    )
}


