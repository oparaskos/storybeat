import React  from 'react';
import './App.css';
import { FountainScript } from './fountain/FountainScript';

const fountainFile = `
Title:	**THE LAST BIRTHDAY CARD**
Credit:	Written by
Author:	Stu Maschwitz
Draft date:	7/8/1998
Contact:
	PO Box 10031
	San Rafael CA 94912
	Registered WGAw No. 701428

# ACT I

= Meet the players and set up the world. Two hit men with very different lives.

## Meet Scott

= And his friend Baxter.

### Scott's SF Apartment

Scott exasperatedly throws down the card on the table and picks up the phone, hitting speed dial #1...

CUT TO:

### Baxter's Music Studio

## Meet Nak

blah

# Nak's Home

MALE VOICE
Is this Scott?  Listen I saw your work at Nak's, and...

> FADE OUT.

>THE END<`;

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
