import React from "react";

export interface StoryCharacter {
    name: string;
}

export const CharactersContext = React.createContext({} as StoryCharacter[]);