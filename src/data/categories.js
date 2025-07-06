// src/data/categories.js
import Fries from '../assets/Fries.png';
import VegBurger from '../assets/VegBurger.png';
import NonVegBurger from '../assets/NonVegBurger.png';
import Combos from '../assets/combos.jpg.png';
import Beverage from '../assets/beverage.png';

const categories = [
  {
    _id: '1',
    name: 'Fries',
    image: Fries,
    price: 99,
    category: 'Snacks'
  },
  {
    _id: '2',
    name: 'Veg Burger',
    image: VegBurger,
    price: 149,
    category: 'Burger'
  },
  {
    _id: '3',
    name: 'Non-Veg Burger',
    image: NonVegBurger,
    price: 169,
    category: 'Burger'
  },
  {
    _id: '4',
    name: 'Combos',
    image: Combos,
    price: 249,
    category: 'Combo'
  },
  {
    _id: '5',
    name: 'Beverages',
    image: Beverage,
    price: 89,
    category: 'Drinks'
  }
];

export default categories;
