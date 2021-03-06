import Results from './Results';
import {useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTired } from "@fortawesome/free-solid-svg-icons";

const ResultsContainer = (props) => {
  //  Frown Icon
  const frown = (
    <FontAwesomeIcon
      icon={faTired}
      size="6x"
      color="#ffb454"
      aria-hidden="false"
    />
  );

  const resultsRef = useRef();

  //  State to hold results of API call
    const [snackResults, setSnackResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const query = props.match.params.query;
    
    //  On component mount call API using user query
    useEffect(() => {
            const myHeaders = new Headers();
            myHeaders.append("x-app-id", "1b42acf4");
            myHeaders.append("x-app-key", "e317853a8b140e221edc676098de067b");
        
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
                //  Grab important information from the API call
                const snacksArray = snacks.map((snack) => {
                  const nutrientList = snack.full_nutrients;
                  const snackName = snack.food_name;
                  const snackImg = snack.photo.thumb;
                  const sugarContent = nutrientList.filter(
                    (nutrient) => nutrient.attr_id === 269
                  );
                  //  If sugar is undefined set to 0
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
                setIsLoading(false)
                resultsRef.current.scrollIntoView({behavior: 'smooth'});
              })
              .catch((error) => console.log("error", error));
    }, [query])


    return(
        <div className="resultsContainer wrapper" ref={resultsRef}>
          {!isLoading ?
            ( snackResults[0] ? 
              (<ul>
              {snackResults.map((item, index) => {
                  return (
                      <Results
                      item={item}
                      getComparison={props.getComparison}
                      key={index}
                      />
                      );
                  })}
              </ul>)
              : (
                <div className="errorMessage">
                  <h4>Sorry, no results found. Please enter another snack.</h4>
                  {frown}
                </div>
              )
            ) : (
              <p>Loading snacks...</p>
            )
            }
        </div>
    )
}

export default ResultsContainer;