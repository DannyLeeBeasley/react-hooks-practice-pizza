import React, { useState, useEffect } from "react";
import Header from "./Header";
import PizzaForm from "./PizzaForm";
import PizzaList from "./PizzaList";

function App() {

  useEffect(() => {
    fetch('http://localhost:3001/pizzas')
      .then(res => res.json())
      .then(pizzaArray => setPizzas(pizzaArray));
  }, [])

  const [pizzas, setPizzas] = useState([]);
  const [selectedPizza, setSelectedPizza] = useState({});


  function selectPizza(pizzaObj) {
    setSelectedPizza(pizzaObj);
  }

  function handlePizzaChange(pizzaObj) {
    fetch(`http//localhost:3001/pizzas/${pizzaObj.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pizzaObj)
    }).then(res => res.json())
      .then(pizzaObj => {
        const updatedPizzaList = [...pizzas].map((pizza) => {
          if (pizza.id === pizzaObj.id) {
            return pizzaObj
          } else {
            return pizza
          }
        })
        setPizzas(updatedPizzaList);
      })
  }

  return (
    <>
      <Header />
      <PizzaForm
        selectedPizza={selectedPizza}
        handlePizzaChange={handlePizzaChange}
      />
      <PizzaList
        pizzas={pizzas}
        selectPizza={selectPizza}
      />
    </>
  );
}

export default App;
