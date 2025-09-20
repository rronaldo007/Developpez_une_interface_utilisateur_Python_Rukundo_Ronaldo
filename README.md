# **JustStreamIt**  
*Développez une interface utilisateur pour une application web Python*

## **Description du projet**
JustStreamIt est une interface web développée en **HTML**, **CSS**, et **JavaScript** permettant de naviguer dans un catalogue de films.  
Elle consomme les données de l'API **OCMovies**, un backend Python fourni par OpenClassrooms.

L'application propose :
- Affichage du **meilleur film** avec sa description et ses détails.
- Une section avec les **films les mieux notés**, avec un bouton **"Voir plus"** (pagination).
- Une section **Mystery** dédiée aux films du genre *Mystery*.
- Une section **catégorie dynamique**, permettant de filtrer les films par genre via un menu déroulant.
- Une **modale interactive** affichant les informations détaillées d'un film.
- Un design **responsive**, adapté aux écrans desktop et mobiles.

---

## **Technologies utilisées**
- **HTML5** – Structure de l'application
- **CSS3** – Design et responsive (mobile-first)
- **JavaScript (ES6 Modules)** – Interaction et consommation API
- **API OCMovies** – Backend Python en local

---

## **Installation et lancement du projet**

### **1. Cloner le projet**
```bash
git clone https://github.com/rukundoronaldo/ocmovies-frontend.git
cd ocmovies-frontend
```

---

### **2. Lancer l'API OCMovies**
Le frontend consomme l'API OCMovies disponible sur GitHub :  
[https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR](https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR)

#### Étapes pour lancer l'API :
```bash
git clone https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR.git
cd OCMovies-API-EN-FR
pip install -r requirements.txt
python manage.py runserver
```

> L'API sera disponible par défaut sur :  
> **http://localhost:8000/api/v1/**

---

### **3. Lancer le frontend**
Ouvre simplement `index.html` dans ton navigateur, ou utilise un serveur local.

#### Avec VS Code (Live Server)
1. Installe l’extension **Live Server**.
2. Clique droit sur `index.html` → **"Open with Live Server"**.

> L'application doit maintenant être accessible sur `http://127.0.0.1:5500` ou similaire.

---

## **Fonctionnalités principales**
- 🎥 **Meilleur film** : affichage du film le mieux noté avec une description et un bouton pour afficher la modale de détails.  
- ⭐ **Films les mieux notés** : liste de films avec un bouton "Voir plus".  
- 🕵️ **Mystery** : section dédiée au genre Mystery.  
- 📂 **Catégorie dynamique** : choix du genre via un menu déroulant, mise à jour automatique des films affichés.  
- 🖼️ **Modale interactive** : détails complets sur un film (réalisateurs, acteurs, score IMDb, box-office, etc.).  
- 📱 **Responsive design** : interface adaptée mobile et desktop.

---

## **Structure du projet**

```
ocmovies-frontend/
│
├── index.html
├── README.md
│
├── css/
│   ├── styles.css
│   ├── responsive.css
│   └── modal.css
│
├── js/
│   ├── main.js
│   ├── api.js
│   ├── state.js
│   ├── utils.js
│   ├── sections.js
│   ├── buttons.js
│   ├── modal.js
│   ├── dynamicCategory.js
│   └── ui.js
│
└── assets/
    └── placeholder.png
```
