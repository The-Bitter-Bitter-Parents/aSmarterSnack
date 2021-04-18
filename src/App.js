import "./App.css";
import Form from "./Form.js";
import Results from "./Results.js";
import { useState } from "react";
import Nutrition from "./Nutrition.js";
import healthyArray from './healthyArray.js';

function App() {

  const [snackResults, setSnackResults] = useState([]);
  const [choiceSnack, setChoiceSnack] = useState({});
  const [healthySnack, setHealthySnack] = useState({});

  const getSnacks = (e, query) => {
    e.preventDefault();
    setChoiceSnack({});
    setHealthySnack({});
    const myHeaders = new Headers();
    myHeaders.append("x-app-id", "df445c8d");
    myHeaders.append("x-app-key", "aafcc21abbff4ba8ef87b9892cb2d5a9");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://trackapi.nutritionix.com/v2/search/instant?query=${query}&detailed=true`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        const snacks = result.common;
        // console.log(snacks);

        const snacksArray = snacks.map((snack) => {
          const nutrientList = snack.full_nutrients;
          const snackName = snack.food_name;
          const snackImg = snack.photo.thumb;
          const sugarContent = nutrientList.filter(
            (nutrient) => nutrient.attr_id === 269
          );
          // console.log(snackName, snackImg, sugarContent);
          if (sugarContent[0] !== undefined) {
            return {
              name: snackName,
              image: snackImg,
              sugar: sugarContent[0].value.toFixed(1),
            };
          } else {
            return {
              name: snackName,
              image: snackImg,
              sugar: 0,
            };
          }
        });
        setSnackResults(snacksArray);
      })
      .catch((error) => console.log("error", error));
  };

  const getDetails = (query, setterFunction) => {
    // console.log(query);
    const myHeaders = new Headers();
    myHeaders.append("x-app-id", "2622ee6b");
    myHeaders.append("x-app-key", "75455fad3c73f5adcd4ef59351c53dcd");
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    const urlencoded = new URLSearchParams();
    urlencoded.append("query", query);
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
};
fetch("https://trackapi.nutritionix.com/v2/natural/nutrients", requestOptions)
  .then(response => response.json())
  .then(result => setterFunction(result.foods[0]))
  .catch(error => console.log('error', error));
  }

  const getComparison = (userChoice, userSugar) => {
    const healthySnack = healthyArray.filter( (item) => {
      return item.sugarContent <= userSugar - 10;
    })
    console.log(healthySnack);
    if (healthySnack[0]) {
      const randomSnack = Math.floor(Math.random() * healthySnack.length);
      getDetails(userChoice, setChoiceSnack);
      getDetails(healthySnack[randomSnack].snackName, setHealthySnack);
    } else {
      getDetails(userChoice, setChoiceSnack);
    }

  }

  return (
    <div>
      <h1>A Bitter Parent</h1>
      <Form getSnacks={getSnacks} />
      {/* <Results /> */}
      {choiceSnack.food_name ?
        ( <>
          <Nutrition snackItem={choiceSnack} heading='Your Choice' />
            {healthySnack.food_name ? 
              <Nutrition snackItem={healthySnack} heading='A Healthier Choice' />
              : <div className='nutritionContainer'>
                  <h4>You made a great choice, go ahead and eat that!</h4> 
                </div>} 
              </>) :
          (<div className="resultsContainer">
            <ul>
              {snackResults.map((item, index) => {
                return <Results item={item} getComparison={getComparison} key={index} />;
              })}
            </ul>
          </div> )
      }
    </div>
  );
}

export default App;
