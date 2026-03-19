const syntax_error = "It seems that you have a syntax error in your input.";

// ====== Parser contenu + styles ======
// Syntaxe : title: Mon texte /color: blue; font-size: 24px
function parseStyle(line) {
    const slashIndex = line.indexOf('/');

    if (slashIndex === -1) {
        return { content: line.trim(), styleString: '' };
    }

    const content = line.slice(0, slashIndex).trim();
    const rawStyle = line.slice(slashIndex + 1).trim();

    // On accepte directement du CSS valide : "color: blue; font-size: 24px"
    // On normalise juste : on s'assure que chaque déclaration finit par ";"
    const styleString = rawStyle
        .split(';')
        .map(decl => decl.trim())
        .filter(decl => decl.length > 0)
        .map(decl => decl.endsWith(';') ? decl : decl + ';')
        .join(' ');

    return { content, styleString };
}

// ====== Fonctions de rendu HTML ======
const renderers = {
    text: line => {
        const { content, styleString } = parseStyle(line);
        return `<p style="${styleString}">${content}</p>`;
    },

    button: line => {
        const { content, styleString } = parseStyle(line);
        return `<button style="${styleString}">${content}</button>`;
    },

    link: line => {
        const parts = line.split(', to ');
        if (parts.length !== 2) return error(line);

        const { content, styleString } = parseStyle(parts[0]);
        const url = parts[1].trim();

        return `<a href="${url}" style="${styleString}">${content}</a>`;
    },

    image: line => {
        const { content, styleString } = parseStyle(line);
        return `<img src="${content}" style="${styleString}">`;
    },

    buttonLink: (text, url) => {
        const { content, styleString } = parseStyle(text);
        return `<button style="${styleString}" onclick="window.location.href='${url}'">${content}</button>`;
    },

    title: line => {
        const { content, styleString } = parseStyle(line);
        return `<h1 style="${styleString}">${content}</h1>`;
    },

    subtitle: line => {
        const { content, styleString } = parseStyle(line);
        return `<h2 style="${styleString}">${content}</h2>`;
    },

    bold: line => {
        const { content, styleString } = parseStyle(line);
        return `<strong style="${styleString}">${content}</strong>`;
    },

    italic: line => {
        const { content, styleString } = parseStyle(line);
        return `<em style="${styleString}">${content}</em>`;
    },

    underline: line => {
        const { content, styleString } = parseStyle(line);
        return `<u style="${styleString}">${content}</u>`;
    },

    quote: line => {
        const { content, styleString } = parseStyle(line);
        return `<blockquote style="${styleString}">${content}</blockquote>`;
    },

    list: line => {
        const { content, styleString } = parseStyle(line);
        return `<ul style="${styleString}">${content.split(',').map(i => `<li>${i.trim()}</li>`).join('')}</ul>`;
    },

    numberedList: line => {
        const { content, styleString } = parseStyle(line);
        return `<ol style="${styleString}">${content.split(',').map(i => `<li>${i.trim()}</li>`).join('')}</ol>`;
    },

    cross: line => {
        const { content, styleString } = parseStyle(line);
        return `<s style="${styleString}">${content}</s>`;
    },

    break: () => `<br>`,

    paragraph: line => {
        const { content, styleString } = parseStyle(line);
        return `<p style="${styleString}">${content}</p>`;
    },

    area: line => {
        const { content, styleString } = parseStyle(line);
        return `<section style="${styleString}">${content}</section>`;
    },

    article: line => {
        const { content, styleString } = parseStyle(line);
        return `<article style="${styleString}">${content}</article>`;
    },

    box: line => {
        const { content, styleString } = parseStyle(line);
        return `<div style="${styleString}">${content}</div>`;
    },

    comment: line => `<!-- ${line} -->`
};

// ====== Erreur ======
function error(line) {
    return `<span style="color:red;">${syntax_error}: ${line}</span>`;
}

// ====== Parser une ligne ======
function parseLine(line) {
    line = line.trim();
    if (!line) return '';

    // Bouton avec lien en priorité
    const buttonLinkMatch = line.match(/^\s*button\s*:\s*(.+?),\s*to\s+(.+)$/i);
    if (buttonLinkMatch) {
        return renderers.buttonLink(buttonLinkMatch[1].trim(), buttonLinkMatch[2].trim());
    }

    // Mot-clé: contenu
    const simpleMatch = line.match(/^\s*(\w[\w-]*)\s*:\s*(.+)$/i);
    if (simpleMatch) {
        const key = simpleMatch[1].trim().toLowerCase();
        const value = simpleMatch[2].trim();

        if (renderers[key]) return renderers[key](value);
    }

    return error(line);
}

// ====== Fonction principale ======
function parseAndShow() {
    const input = document.getElementById('input').value;
    const lines = input.split('\n');

    let htmlOutput = '';
    let previewHTML = '';

    for (let line of lines) {
        const result = parseLine(line);
        htmlOutput += result + '\n';
        previewHTML += result;
    }

    document.getElementById('output').textContent = htmlOutput;
    document.getElementById('preview').innerHTML = previewHTML;
}

// ====== Copier ======
function copyOutput() {
    const output = document.getElementById('output').textContent;

    navigator.clipboard.writeText(output).then(() => {
        alert("HTML copié dans le presse-papiers !");
    }).catch(err => {
        alert("Erreur : " + err);
    });
}

// ====== Input live ======
let timeout;
document.getElementById('input').addEventListener('input', () => {
    clearTimeout(timeout);
    timeout = setTimeout(parseAndShow, 300);
});

window.onload = parseAndShow;
