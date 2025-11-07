const syntax_error = "It seems that you have a syntax error in your input.";

// ====== Fonctions de rendu HTML ======
const renderers = {
    text: line => `<p>${line}</p>`,
    button: line => `<button>${line}</button>`,
    link: (text, url) => `<a href="${url}">${text}</a>`,
    image: line => `<img src="${line}">`,
    buttonLink: (text, url) => `<button onclick="window.location.href='${url}'">${text}</button>`,
    title: line => `<h1>${line}</h1>`,
    subtitle: line => `<h2>${line}</h2>`,
    bold: line => `<strong>${line}</strong>`,
    italic: line => `<em>${line}</em>`,
    underline: line => `<u>${line}</u>`,
    quote: line => `<blockquote>${line}</blockquote>`,
    list: line => `<ul>${line.split(',').map(i => `<li>${i.trim()}</li>`).join('')}</ul>`,
    numberedList: line => `<ol>${line.split(',').map(i => `<li>${i.trim()}</li>`).join('')}</ol>`,
    cross: line => `<s>${line}</s>`,
    break: () => `<br>`,
    paragraph: line => `<p>${line}</p>`,
    area: line => `<section>${line}</section>`,
    article: line => `<article>${line}</article>`,
    box: line => `<div>${line}</div>`,
    comment: line => `<!-- ${line} -->`
};

// ====== Fonction pour parser une ligne ======
function parseLine(line) {
    line = line.trim();
    if (!line) return '';

    // Bouton avec lien en priorité
    const buttonLinkMatch = line.match(/^\s*button\s*:\s*(.+?),\s*to\s+(.+)$/i);
    if (buttonLinkMatch) return renderers.buttonLink(buttonLinkMatch[1].trim(), buttonLinkMatch[2].trim());

    // Lignes avec "motclé: contenu"
    const simpleMatch = line.match(/^\s*(\w[\w-]*)\s*:\s*(.+)$/i);
    if (simpleMatch) {
        const key = simpleMatch[1].trim().toLowerCase();
        const value = simpleMatch[2].trim();
        if (renderers[key]) return renderers[key](value);
    }

    // Erreur si rien ne correspond
    return `<span style="color:red;">${syntax_error}: ${line}</span>`;
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

// ====== Copier le résultat ======
function copyOutput() {
    const output = document.getElementById('output').textContent;
    navigator.clipboard.writeText(output).then(() => {
        alert("HTML copié dans le presse-papiers !");
    }).catch(err => {
        alert("Erreur lors de la copie : " + err);
    });
}

// ====== Gestion de l'input ======
let timeout;
document.getElementById('input').addEventListener('input', () => {
    clearTimeout(timeout);
    timeout = setTimeout(parseAndShow, 300); // 300ms après la dernière frappe
});
window.onload = parseAndShow; // Parse au chargement initial
