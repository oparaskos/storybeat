import React, { PropsWithChildren }  from 'react';
import slugify from 'slugify';
import { tokenize } from './fountain_parser';
import { FountainToken } from "./types/FountainTokenType";

export function FountainSnippet({script}: {script: string}) {
    var tokens = tokenize(script);
    return <FountainTokens tokens={tokens}/>;
}

function tokensBetween(tokens: Array<FountainToken>, index: number, end_type: string, predicate = (t: FountainToken, i: number) => true): [Array<FountainToken>, number] {
    const endIndex = tokens.findIndex((t, idx) => idx > index && t.type === end_type && predicate(t, idx));
    if (endIndex === -1) {
        let slice = tokens.slice(index + 1, tokens.length);
        return [slice, tokens.length];
    }
    let slice = tokens.slice(index + 1, endIndex);
    return [ slice, endIndex ];
}

function FountainTokens({tokens}: {tokens: Array<FountainToken>}) {
    const html: React.ReactNode[] = [];
    for (let i = 0; i < tokens.length; ++i) {
        const token = tokens[i];
        // const tokenText = textTransformer(token.text);

        switch (token.type) {
            case 'title_page_property': 
                // Gather tokens from the next token until the end of the section (the beginning of the next section at this depth or one above. or the end of the file)
                const [titlePageTokens, titlePageEnd] = tokensBetween(tokens, i - 1, 'end_title_page');
                html.push(<div id="script-title" key={i}>
                    {titlePageTokens.map((it, j) => <TitlePageProperty token={it} key={j}/>)}
                </div>);
                i = titlePageEnd - 1;
                break;
            case 'section': 
                // Gather tokens from the next token until the end of the section (the beginning of the next section at this depth or one above. or the end of the file)
                const tokenDepth = token.depth || 1;
                const [sectionTokens, sectionEnd] = tokensBetween(tokens, i, 'section', (t) => (t.depth as number) <= tokenDepth);
                html.push(<Section key={i} token={token}>
                    <FountainTokens tokens={sectionTokens}/>
                </Section>);
                i = sectionEnd - 1;
                break;
            case 'dual_dialogue_begin': 
                const [dualDialogueTokens, dualDialogueEnd] = tokensBetween(tokens, i, 'dialogue_end');
                html.push(<div key={i} className="dual-dialogue"><FountainTokens tokens={dualDialogueTokens} /></div>);
                i = dualDialogueEnd;
                break;
            case 'dialogue_begin': 
                const [dialogueTokens, dialogueEnd] = tokensBetween(tokens, i, 'dialogue_end');
                html.push(<div key={i} className="dialogue"><FountainTokens tokens={dialogueTokens} /></div>);
                i = dialogueEnd;
                break;
            case 'boneyard_begin':
            case 'boneyard_end':
            case 'dialogue_end': 
            case 'dual_dialogue_end': 
                break;
            default:
                const TokenComponent = tokenToComponent(token);
                html.push(<TokenComponent key={i} token={token} />);
        }
    }

    return <>{html}</>;
};


function tokenToComponent(token: FountainToken) {
    switch (token.type) {
        case 'title_page_property': return TitlePageProperty;
        case 'scene_heading': return SceneHeading;
        case 'transition': return Transition;
        case 'character': return Character;
        case 'parenthetical': return Parenthetical;
        case 'dialogue': return Dialogue;
        case 'synopsis': return Synopsis;
        case 'note': return Note;
        case 'action': return Action;
        case 'centered': return Centered;
        case 'page_break': return PageBreak;
        case 'line_break': return LineBreak;
        default: return FormattedText;
    }
}

function FormattedText({token}: {token: FountainToken}) {
    const text = token.text || '';
    const textTokens = text.split('**')
        .flatMap((v, i) => v.split('*')
            .flatMap((x, j) => x.split('_')
                .map((y, k) => ({text: y, underline: k % 2 === 1}))
                .map(t => ({...t, italic: j % 2 === 1}))
            )
            .map(t => ({...t, bold: i % 2 === 1}))
        )
        .map(t => ({...t, className: `${t.underline ? 'underline' : ''} ${t.italic ? 'italic' : ''} ${t.bold ? 'bold' : ''}`.trim()}))
        .map(t => ({...t, text: `${t.underline ? '_' : ''}${t.italic ? '*' : ''}${t.bold ? '**' : ''}${t.text}${t.bold ? '**' : ''}${t.italic ? '*' : ''}${t.underline ? '_' : ''}`}));
    return <span className='formattedText' data-type={token.type}>
        { textTokens?.map((t, i) =>
            <span className={t.className}>{t.text}</span>) }
    </span>;
}

function Heading({level, className, children}:  PropsWithChildren<{level: number, className: string}>) {
    if (level >= 6) return <h6 className={className}>{children}</h6>;
    if (level >= 5) return <h5 className={className}>{children}</h5>;
    if (level >= 4) return <h4 className={className}>{children}</h4>;
    if (level >= 3) return <h3 className={className}>{children}</h3>;
    if (level >= 2) return <h2 className={className}>{children}</h2>;
    if (level >= 1) return <h1 className={className}>{children}</h1>;
    return <span className={className}>{children}</span>;

}

function TitlePageProperty({token}: {token: FountainToken}) {
    if (token.key === 'title') return <h1 className='title'><FormattedText token={token}/></h1>;
    return <p className={token.key}>{token.key}: <FormattedText token={token}/></p>
}

function SceneHeading({token}: {token: FountainToken}) {
    return <h3 id={token.scene_number}><FormattedText token={token}/></h3>;
}

function Transition({token}: {token: FountainToken}) {
    return <h2 className='transition'><FormattedText token={token}/></h2>;
}

function Character({token}: {token: FountainToken}) {
    return <h4 className='character'><FormattedText token={token}/></h4>;
}

function Parenthetical({token}: {token: FountainToken}) {
    return <p className="parenthetical"><FormattedText token={token}/></p>;
}

function Dialogue({token}: {token: FountainToken}) {
    return <p><FormattedText token={token}/></p>;
}

const Section: React.FC<PropsWithChildren<{token: FountainToken}>> = function({token, children}) {
    const hashes = new Array(token.depth as number).fill('#').join('')
    return <section className="section" data-depth={token.depth} id={slugify(token.text?.toLocaleLowerCase() || '')}>
        <Heading level={token.depth as number} className='section-heading'>{hashes}<FormattedText token={token}/></Heading>
        {children}
    </section>;
}

function Synopsis({token}: {token: FountainToken}) {
    return <p className="synopsis">=<FormattedText token={token}/></p>;
}

function Note({token}: {token: FountainToken}) {
    return <p className="note">{'<!--'} <FormattedText token={token}/> {'-->'}</p>;
}

function Action({token}: {token: FountainToken}) {
    return <p><FormattedText token={token}/></p>;
}

function Centered({token}: {token: FountainToken}) {
    return <p className="centered"><FormattedText token={token}/></p>;
}

function PageBreak({token}: {token: FountainToken}) {
    return <hr />;
}

function LineBreak({token}: {token: FountainToken}) {
    return <br />;
}
