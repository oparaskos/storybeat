import React, { useEffect, useState } from 'react';
import { FountainSnippet } from './Fountain';
import './FountainScript.css';

export function FountainScript({ fountain }: {fountain: string}) {
  const [script, setScriptContent] = useState(fountain);
  const [isDirty, setIsDirty] = useState(false);
  const setScript = (content: string) => {setIsDirty(true); setScriptContent(content);}
  
  useEffect(() => {
    if (!isDirty) {
      setScriptContent(fountain);
    }
  }, [isDirty, fountain]);

  return (
    <div className="Script">
      <FountainSnippet script={script} />
      <textarea onKeyUp={e => {setScript(script + e.target.value); e.target.value = '';}}>
      </textarea>
    </div>
  );
}
