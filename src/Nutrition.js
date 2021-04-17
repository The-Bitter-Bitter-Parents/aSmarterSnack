const Nutrition = ({snackItem, heading}) => {
    return(
        <div className="nutritionContainer">
            <h3>{heading}</h3>
            <h3>{snackItem.food_name}</h3>
            <p>Serving Size: {snackItem.serving_weight_grams}g</p>
            <h4>Nutritional Information</h4>
            <ul className="nutritionList">
                <li>
                    <p>Calories</p>
                    <p>{snackItem.nf_calories}</p>
                </li>
                <li>
                    <p>Total Fat</p>
                    <p>{snackItem.nf_total_fat}g</p>
                </li>
                <li>
                    <p>Saturated Fat</p>
                    <p>{snackItem.nf_saturated_fat}g</p>
                </li>
                <li>
                    <p>Cholesterol</p>
                    <p>{snackItem.nf_cholesterol}mg</p>
                </li>
                <li>
                    <p>Sodium</p>
                    <p>{snackItem.nf_sodium}mg</p>
                </li>
                <li>
                    <p>Carbohydrates</p>
                    <p>{snackItem.nf_total_carbohydrate}g</p>
                </li>
                <li>
                    <p>Fibre</p>
                    <p>{snackItem.nf_dietary_fibre}g</p>
                </li>
                <li>
                    <p>Sugar</p>
                    <p>{snackItem.nf_sugars}g</p>
                </li>
                <li>
                    <p>Protein</p>
                    <p>{snackItem.nf_protein}g</p>
                </li>
            </ul>
        </div>
    )
}

export default Nutrition;