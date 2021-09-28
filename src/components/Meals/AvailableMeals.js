import { useEffect, useState } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { findRenderedComponentWithType } from "react-dom/test-utils";

//  VERİLER GELMEDEN ÖNCEKİ DENEME MODELİMİZ. FETCH APİSİNİ KULLANDIKTAN SONRA BUNA İHTİYAÇ OLMAYACAK
const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Sushi",
    description: "Finest fish and veggies",
    price: 22.99,
  },
  {
    id: "m2",
    name: "Schnitzel",
    description: "A german specialty!",
    price: 16.5,
  },
  {
    id: "m3",
    name: "Barbecue Burger",
    description: "American, raw, meaty",
    price: 12.99,
  },
  {
    id: "m4",
    name: "Green Bowl",
    description: "Healthy...and green...",
    price: 18.99,
  },
];

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  useEffect(async () => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-http-f3f06-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
      );
      const responseData = await response.json();

      const loadedMeals = [];

      //   JSON'DAN GELEN VERİLER MODELE PUSHLANIYOR
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }

      //    GELEN MODEL ORİJİNAL DEĞİŞKENİMİZE AKTARILIYOR
      setMeals(loadedMeals);
    };

    fetchMeals();
  }, []);

  //    VERİLER DENEME MODELİNDEN ALINARAK EKRANA ÖNCEDEN TASARLANAN COMPONENTLER İLE BASILIYOR
  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
