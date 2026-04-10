import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../App.scss'

function Startpage() {
  const [count, setCount] = useState(0)

  return (
    <><div className='startpage'>

      <h1 className="title">WordGame</h1>

      <input className="username" type="text" placeholder="Skriv in ditt namn..." />

      <div className="gamebuttons">
        <button>SKAPA SPEL</button>
        <button>JOINA SPEL</button>
      </div>

      <div className="gamebuttons">
        <a href="https://google.com" className="my-button-style">
          SKAPA SPEL
        </a>
        <a href="https://google.com" className="my-button-style">
          JOINA SPEL
        </a>
      </div>
    </div>
    </>
  );
}

export default Startpage;
