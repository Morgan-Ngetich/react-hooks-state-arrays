import React, { useState } from "react";
import { spicyFoods, getNewRandomSpicyFood } from "../data/Data";

//Adding Elements To Arrays In State
function SpicyFoodList() {
  const [filterBy, setFilterBy] = useState("All")
  const [foods, setFoods] = useState(spicyFoods);  

 

//console.log("Foods:", foods) => foods = spicyFoods
  const handleAddFood = () => {
    const newFood = getNewRandomSpicyFood();
    const newFoodArray = [...foods, newFood]
    setFoods(newFoodArray);
  }

  //Removing elements fro array in State
  const handleLiClick = (id) => {//Function that takes an id as an argument
    //[1, 2, 3].filter((number) => number !== 3);  => [1,2] All numbers except 3.
    //const removedFood = foods.filter((food) => food.id !== id) //All foods except the one we are removing    
    //setFoods(removedFood) //Update the state of the food
    const heatArray = foods.map((food) => {
      if (food.id === id) {
        return {
          ...food,
          heatLevel: food.heatLevel + 1,
        };
      } else {
        return food;
      }
    });
    setFoods(heatArray);
  }

  const handleDelete = (id) => {
    //[1, 2, 3].filter((number) => number !== 3);  => [1,2] All numbers except 3.
    const removedFood = foods.filter((food) => food.id !== id) //All foods except the one we are removing    
    setFoods(removedFood) //Update the state of the food
  } 

  function handleFilterChange(event) {
    setFilterBy(event.target.value);
  }


  const foodsToDisplay = foods.filter((food) => {
    if (filterBy === "All") {
      return true;
    } else {
      return food.cuisine === filterBy;
    }
  });



  const foodList = foodsToDisplay.map((food) => (
    <li key={food.id}>
      {food.name} | Heat: <button onClick={() => handleLiClick(food.id)}>{food.heatLevel} </button>| Cuisine: {food.cuisine}
      <button onClick={() => handleDelete(food.id)}> Delete</button>
    </li>
  ));



  
  

  
  return (
    <div>
       <select name="filter" onChange={handleFilterChange}>
        <option value="All">All</option>
        <option value="American">American</option>
        <option value="Sichuan">Sichuan</option>
        <option value="Thai">Thai</option>
        <option value="Mexican">Mexican</option>
      </select>
      
      <button onClick={handleAddFood}>Add New Food</button>
      <ul>{foodList}</ul>
      <ul></ul>

     
    </div>

    
  );
}

export default SpicyFoodList;
