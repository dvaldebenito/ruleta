import React from 'react';
import Ruleta from './components/ruleta';
import './App.css';

const App = () => {
  //const items = ["Dany", "Carlangas", "Seba", "Alvarito", "Dámaris", "Jo", "Hervoy", "Diego"];
  const items = [
    {
      name: "Álvaro",
      image: "img/alvarito2.webp"
    },
    {
      name: "Dámaris",
      image: "img/damaris.webp"
    },
    {
      name: "Carlitos",
      image: "img/carlitos.webp"
    },
    {
      name: "Jo",
      image: "img/jo.webp"
    },
    {
      name: "Daniel",
      image: "img/daniel.webp"
    },
    {
      name: "Seba",
      image: "img/seba.webp"
    },
    {
      name: "Hervoy",
      image: "img/hervoy.webp"
    }
  ]

  return (
    <div className="App">
      <header className="App-header">
        <Ruleta items={items} />
      </header>
    </div>
  );
}

export default App;
