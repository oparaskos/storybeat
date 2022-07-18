import { Paper } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { StoryCharacter } from '../Story';
import { FountainSnippet } from './Fountain';
import './FountainScript.css';
import { OutlineNode } from './types/FountainTokenType';

export interface FountainScriptProps {
  fountain: string;
  onCharacters: (characters: StoryCharacter[]) => void;
  onOutline: (outline: OutlineNode[]) => void;
};  

export function FountainScript({ fountain, onCharacters, onOutline }: FountainScriptProps) {
  const [script, setScriptContent] = useState(fountain);
  const [isDirty, setIsDirty] = useState(false);



  const setScript = useCallback((content: string) => {
    setIsDirty(true);
    setScriptContent(content);
  }, [setIsDirty, setScriptContent])
  
  useEffect(() => {
    if (!isDirty) {
      setScriptContent(fountain);
    }
  }, [isDirty, fountain, setScriptContent, setIsDirty, script]);

  const handleKeydown = useCallback((e: KeyboardEvent) => {
    function isCmdKey() {
      const isMacBrowser = /Mac|iPod|iPhone|iPad/.test(navigator.platform);
      return (isMacBrowser && e.metaKey) || (!isMacBrowser && e.ctrlKey);
    }
    if (e.key === "Backspace") {
      setIsDirty(true);
      if (isCmdKey()) {
        let lastWordBoundary = script.lastIndexOf(' ');
        if(lastWordBoundary === -1) lastWordBoundary = 0;
        setScript(script.slice(0, lastWordBoundary));
      } else {
        setScript(script.slice(0, -1));
      }
    }
  }, [script, setScript]);

  const handleKeyup = useCallback((e: KeyboardEvent) => {
    if (e.ctrlKey || e.altKey || e.metaKey 
      || e.key === "Meta"
      || e.key === "Control"
      || e.key === "Alt"
      || e.key === "Shift") return;
    let char = e.shiftKey ? e.key.toLocaleUpperCase() :  e.key.toLocaleLowerCase();
    if(e.key === "Enter") {
      char = "\n";
    }
    setIsDirty(true);
    setScript(script + char);
  }, [script, setScript]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('keyup', handleKeyup);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('keyup', handleKeyup);
    }
  }
  , [handleKeydown, handleKeyup]);

  return (
    <Paper elevation={3}>
      <FountainSnippet script={script} onCharacters={onCharacters} onOutline={onOutline} />
    </Paper>
  );
}
