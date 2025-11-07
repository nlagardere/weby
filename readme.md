# WEBY - Langage de programmation pour sites web

WEBY est un langage simple pour créer des sites web rapidement.  
Il transforme une syntaxe intuitive en HTML, pour que tu puisses générer tes pages facilement.

---

## 1️⃣ Introduction

WEBY utilise des mots-clés comme `text`, `button`, `title`, etc.  
Chaque instruction est convertie en HTML correspondant, ce qui permet de créer des pages web sans écrire directement du HTML.

---

## 2️⃣ Installation et utilisation

WEBY ne nécessite aucune installation !  
Il suffit de :

1. Aller sur le site WEBY : [nlagardere.github.io/weby](https://nlagardere.github.io/weby)  
2. Saisir votre code WEBY directement dans l’éditeur en ligne.  
3. Voir le HTML généré automatiquement et le prévisualiser.  
4. Copier le HTML si besoin pour l’utiliser sur vos propres pages.

---

## 3️⃣ Syntaxe des instructions

Chaque instruction se écrit sous la forme :

mot-cle: contenu

css
Copier le code

Certaines instructions comme `button` avec lien ont une syntaxe spéciale :  

button: Texte, to URL

markdown
Copier le code

---

### 3.1 Tableau des mots-clés

| Mot-clé          | Syntaxe                          | Description                           | Exemple |
|-----------------|---------------------------------|---------------------------------------|---------|
| `text`          | `text: votre texte`             | Crée un paragraphe `<p>`             | `text: Bonjour !` → `<p>Bonjour !</p>` |
| `button`        | `button: Cliquez ici`           | Crée un bouton `<button>`            | `button: OK` → `<button>OK</button>` |
| `button` avec lien | `button: Texte, to URL`       | Bouton qui redirige vers un lien     | `button: Google, to https://google.com` → `<button onclick="window.location.href='https://google.com'">Google</button>` |
| `link`          | `link: Texte, to URL`           | Crée un lien `<a>`                   | `link: Google, to https://google.com` → `<a href="https://google.com">Google</a>` |
| `title`         | `title: Votre titre`            | `<h1>`                                | `title: Bienvenue` → `<h1>Bienvenue</h1>` |
| `subtitle`      | `subtitle: Sous-titre`          | `<h2>`                                | `subtitle: Chapitre 1` → `<h2>Chapitre 1</h2>` |
| `bold`          | `bold: texte`                   | `<strong>`                            | `bold: Important` → `<strong>Important</strong>` |
| `italic`        | `italic: texte`                 | `<em>`                                | `italic: Italique` → `<em>Italique</em>` |
| `underline`     | `underline: texte`              | `<u>`                                 | `underline: Souligné` → `<u>Souligné</u>` |
| `quote`         | `quote: texte`                  | `<blockquote>`                        | `quote: Citation` → `<blockquote>Citation</blockquote>` |
| `list`          | `list: item1, item2, item3`     | Liste `<ul>`                          | `list: A, B, C` → `<ul><li>A</li><li>B</li><li>C</li></ul>` |
| `numbered-list` | `numbered-list: item1, item2`   | Liste `<ol>`                          | `numbered-list: A, B` → `<ol><li>A</li><li>B</li></ol>` |
| `cross`         | `cross: texte`                  | `<s>`                                 | `cross: Erreur` → `<s>Erreur</s>` |
| `break`         | `break:`                         | `<br>`                                | `break:` → `<br>` |
| `paragraph`     | `paragraph: texte`              | `<p>`                                 | `paragraph: Paragraphe` → `<p>Paragraphe</p>` |
| `area`          | `area: texte`                   | `<section>`                            | `area: Contenu` → `<section>Contenu</section>` |
| `article`       | `article: texte`                | `<article>`                            | `article: Article` → `<article>Article</article>` |
| `box`           | `box: texte`                    | `<div>`                                | `box: Contenu` → `<div>Contenu</div>` |
| `image`         | `image: URL`                    | `<img src="URL">`                     | `image: img.jpg` → `<img src="img.jpg">` |
| `comment`       | `comment: texte`                | `<!-- commentaire -->`                | `comment: test` → `<!-- test -->` |

---

## 4️⃣ Règles importantes

- Une instruction par ligne.  
- Les espaces autour des `:` sont optionnels.  
- Le parseur ignore les lignes vides.  
- Les erreurs de syntaxe sont affichées en rouge avec le texte incriminé.  

---

## 5️⃣ Exemples complets

### Exemple 1 : Page simple

```weby
title: Mon site
subtitle: Bienvenue
text: Ceci est un texte de présentation
button: Cliquez ici, to https://google.com
list: Item 1, Item 2, Item 3
image: image.jpg
Résultat HTML généré :

html
Copier le code
<h1>Mon site</h1>
<h2>Bienvenue</h2>
<p>Ceci est un texte de présentation</p>
<button onclick="window.location.href='https://google.com'">Cliquez ici</button>
<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>
<img src="image.jpg">
Exemple 2 : Texte formaté
weby
Copier le code
title: Mon article
bold: Important
italic: Italique
underline: Souligné
quote: Citation
cross: Erreur
break:
Résultat HTML :

html
Copier le code
<h1>Mon article</h1>
<strong>Important</strong>
<em>Italique</em>
<u>Souligné</u>
<blockquote>Citation</blockquote>
<s>Erreur</s>
<br>
6️⃣ Conseils pour débutants
Commence par tester des petites lignes.

Vérifie que chaque instruction est correcte avant d’enchaîner.

Utilise comment: pour noter des informations dans ton code sans les afficher.

Tu peux combiner plusieurs instructions pour créer des pages complètes rapidement.

7️⃣ Extensions futures possibles
Ajouter des variables pour réutiliser des textes.

Ajouter des sections imbriquées (area contenant plusieurs lignes).

Ajouter des styles CSS personnalisés directement dans WEBY.

WEBY est en développement actif. Cette documentation sera mise à jour au fur et à mesure que de nouvelles fonctionnalités seront ajoutées.
