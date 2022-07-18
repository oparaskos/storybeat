import React, { useCallback, useState }  from 'react';
import './App.css';
import { FountainScript } from './fountain/FountainScript';

const DEFAULT_SCRIPT = `
Title: Fountain Script

# Heading 1

## Heading 2

PETER
Who do you work for!?

VICTIM
I work for the government.

VICTIM (CONT'D)
If you let me go I...

PETER ^
(Angrily)
Which government?!

> CENTERED **BOLD** *ITALIC* _underlined_ <

> TRANSITION

Some Action

CUT TO:

= Something else happens

`;

function App() {
  const [script, setScript] = useState(DEFAULT_SCRIPT);
  const openFile = useCallback((changeEvent: React.ChangeEvent<HTMLInputElement>) => {
    const file = changeEvent.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log(e)
        const result = e?.target?.result;
        if (typeof(result) === "string") {
          setScript(result);
        } else if (result instanceof ArrayBuffer) {
          setScript(new TextDecoder().decode(result));
        }
      }
      reader.readAsText(file);
    }
  }, [setScript])
  return (
    <div className="App">
      <input type="file" onChange={openFile}></input>
      <FountainScript fountain={script}/>
      <br />
      <hr />

      <br />
      <a
        href="https://fountain.iohttps://fountain.io/syntax"
        target="_blank"
        rel="noopener noreferrer"
      >
        Fountain Syntax
      </a>
      <br />
      <hr />
    </div>
  );
}

export default App;
