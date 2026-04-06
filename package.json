import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// Node 24 : On sert les fichiers statiques (HTML, CSS, JS du jeu)
// import.meta.dirname remplace les anciennes bidouilles complexes
app.use(express.static(import.meta.dirname));

app.listen(PORT, () => {
    console.log(`
    ⚽ GABY CLUB ULTIMATE ⚽
    -----------------------
    🚀 Serveur lancé sur : http://localhost:${PORT}
    🛠️ Version Node : ${process.version}
    `);
});