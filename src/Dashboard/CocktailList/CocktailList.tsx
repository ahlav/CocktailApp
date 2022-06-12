import React, {useState, useEffect} from 'react';
import CocktailCard from "../CocktailCard/CocktailCard";
import './CocktailList.css';

interface Cocktail {
    strDrink: string,
    idDrink: string,
    strDrinkThumb: string
}

const getCocktailsByType = async (type: string, setJsonCocktails: Function) => {
    const url = (
        'https://www.thecocktaildb.com/api/json/v1/1/filter.php?' +
        new URLSearchParams({c: type}).toString()
    );
    const response = await fetch(url);
    const jsonData = await response?.json();
    setJsonCocktails(jsonData.drinks);
};

export default function CocktailList({type}: { type: string }) {
    const [jsonCocktails, setJsonCocktails] = useState([]);

    useEffect(() => {
        getCocktailsByType(type, setJsonCocktails);
    }, [type]);

    return (
        <div className="cocktail-list">
            {jsonCocktails.map((drink: Cocktail) => (
                <CocktailCard key={drink.strDrink} name={drink.strDrink}
                              imgUrl={drink.strDrinkThumb} type={type}
                              drinkId={drink.idDrink}/>
            ))}
        </div>
    )
}


