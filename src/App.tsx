import { AppBar, Box, Drawer, IconButton, Toolbar } from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import CharactersIcon from '@mui/icons-material/SupervisorAccount';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import React, { useCallback, useState } from 'react';
import './App.css';
import { FountainScript } from './fountain/FountainScript';
import { StoryCharacter } from './Story';
import { OutlineNode } from './fountain/types/FountainTokenType';

function OutlineElement({nodes}: {nodes: OutlineNode[]}) {
  return (
    <ul>
      {nodes.map((node, i) => (
        <li key={i}>
          {node.title}
          {node.children && node.children.length > 0 && <OutlineElement nodes={node.children} />}
        </li>
      ))}
    </ul>
  );
}

function App() {
  const [script, setScript] = useState("");
  const [openedDrawer, setOpenedDrawer] = React.useState('none');
  const [characters, setCharacters] = useState<StoryCharacter[]>([]);
  const [outline, setOutline] = useState<OutlineNode[]>([]);

  const openFile = useCallback((changeEvent: React.ChangeEvent<HTMLInputElement>) => {
    const file = changeEvent.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log(e)
        const result = e?.target?.result;
        if (typeof (result) === "string") {
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

      <Drawer
        anchor="left"
        open={openedDrawer === "characters-list"}
        onClose={e => setOpenedDrawer('none')}
      >
        <ul>
        {characters.map(character => <li>{character.name}</li>)}
        </ul>
      </Drawer>

      <Drawer
        anchor="left"
        open={openedDrawer === "script-outline"}
        onClose={e => setOpenedDrawer('none')}
      >
        <OutlineElement nodes={outline} />
      </Drawer>


      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" sx={{ mr: 2 }} onClick={e => setOpenedDrawer('script-outline')}>
            <ListIcon />
          </IconButton>
          <IconButton sx={{ mr: 2 }} onClick={e => setOpenedDrawer('characters-list')}>
            <CharactersIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton sx={{ mr: 2 }}>
            <VisibilityOffIcon />
          </IconButton>
          <label htmlFor="file-upload">
            <input id="file-upload" style={{ display: "none" }} type="file" onChange={openFile} />
            <FileOpenIcon sx={{ mr: 2 }}/>
          </label>
        </Toolbar>
      </AppBar>



      <FountainScript fountain={script} onCharacters={setCharacters} onOutline={setOutline}/>
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
