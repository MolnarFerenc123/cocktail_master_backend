const express = require('express');
const cors = require('cors');
const sequelize = require('./src/data/datasources/db');
const cocktailRoutes = require('./src/presentation/routes/CocktailRoutes');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/cocktails', cocktailRoutes);

app.get('/', (req, res) => {
    res.send('A Koktél Backend Működik! 🍸');
});

const PORT = process.env.PORT || 5000;

sequelize.authenticate()
    .then(() => {
        console.log('✅ Sikeres kapcsolat a MySQL adatbázissal!');
        app.listen(PORT, () => {
            console.log(`🚀 Szerver fut: http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('❌ Nem sikerült csatlakozni az adatbázishoz:', err);
    });