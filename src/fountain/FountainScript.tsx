import React, { useState } from 'react';
import { FountainSnippet } from './Fountain';
import './FountainScript.css';

export function FountainScript({ fountain }: {fountain: string}) {
  const [script, setScript] = useState(fountain);
  return (
    <div className="Script">
      <FountainSnippet script={script} />
      <textarea onKeyUp={e => {setScript(script + e.target.value); e.target.value = '';}}>
      </textarea>
    </div>
  );
}
