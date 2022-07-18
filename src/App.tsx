import React  from 'react';
import './App.css';
import { FountainScript } from './fountain/FountainScript';

const fountainFile = `
Title:
    BRICK & STEEL
    FULL RETIRED
Credit: Written by
Author: Stu Maschwitz
Source: Story by KTM
Draft date: 1/20/2012
Contact:
    Next Level Productions
    1588 Mission Dr.
    Solvang, CA 93463

EXT. BRICK'S PATIO - DAY

A gorgeous day.  The sun is shining.  But BRICK BRADDOCK, retired police detective, is sitting quietly, contemplating -- something.

The SCREEN DOOR slides open and DICK STEEL, his former partner and fellow retiree, emerges with two cold beers.

STEEL
Beer's ready!

BRICK
Are they cold?

STEEL
Does a bear crap in the woods?

Steel sits.  They laugh at the dumb joke.

STEEL
(beer raised)
To retirement.

BRICK
To retirement.

They drink long and well from the beers.

And then there's a long beat.  
Longer than is funny.  
Long enough to be depressing.

The men look at each other.

STEEL
Screw retirement.

BRICK ^
Screw retirement.

SMASH CUT TO:`;

function App() {
  return (
    <div className="App">
      <FountainScript fountain={fountainFile}/>
      <header className="App-header">
        <a
          href="https://fountain.iohttps://fountain.io/syntax"
          target="_blank"
          rel="noopener noreferrer"
        >
          Fountain Syntax
        </a>
      </header>
    </div>
  );
}

export default App;
