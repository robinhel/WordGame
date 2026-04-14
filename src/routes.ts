import type Route from './interfaces/Route.ts';
import { createElement } from 'react';


// Component
import startPage from '../src/StartPage.tsx'; 
import createGame from './Create.tsx';




export default [
  startPage,
  createGame
]

 // map the route property of each page component to a Route
  .map(x => (({ element: createElement(x), ...x.route }) as Route))
  // sort by index (and if an item has no index, sort as index 0)
  .sort((a, b) => (a.index || 0) - (b.index || 0));