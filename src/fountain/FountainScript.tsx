import React from 'react';
import { FountainSnippet } from './Fountain';
import './FountainScript.css';

export function FountainScript({ fountain: fountainFile }: {fountain: string}) {
  return (
    <div className="Script">
      <FountainSnippet script={fountainFile} />
    </div>
  );
}
