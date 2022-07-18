

export type FountainTokenType = 'title_page_property' | 'scene_heading' | 'centered' | 'transition' | 'dual_dialogue_end' | 'dual_dialogue_begin' | 'dialogue_end' | 'dialogue_begin' | 'action' | 'note' | 'line_break' | 'page_break' | 'emphasis' | 'bold_italic_underline' | 'bold_underline' | 'italic_underline' | 'bold_italic' | 'bold' | 'italic' | 'underline' | 'parenthetical' | 'section' | 'synopsis' | 'note_inline' | 'boneyard' | 'title_page' | 'scene_number' | 'dialogue' | 'character' | 'boneyard_begin' | 'boneyard_end' | 'end_title_page';
export interface FountainToken {
    type: FountainTokenType;
    text?: string;
    scene_number?: any;
    depth?: number;
    dual?: 'left' | 'right';
    key?: string;
}

export interface OutlineNode {
    type: 'section' | 'scene';
    title: string;
    children: OutlineNode[];
}