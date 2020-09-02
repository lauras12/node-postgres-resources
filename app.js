const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('common'));
const appList = require('./playstore-data.js');

app.get('/playstore-apps', (req, res) => {

    const { search = "", genres, sort } = req.query;

    if (sort) {
        if (!['Rating', 'App'].includes(sort)) {
            return res
                .status(400)
                .send('Sort must be one of Rating or App');
        }
    }

    let results = appList.filter(app =>
        app.App.toLowerCase().includes(search.toLowerCase().trim())
    );

    if (sort) {
        appList.sort((a, b) => {
            return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
        });
    }

    if (genres) {
        if (!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genres)) {
            return res
                .status(400)
                .send('Genres must be one of Action, Puzzle, Strategy, Casual, Arcade, Card');
        }
    }

    if (genres) {
        results = results.filter(appList =>
            appList.Genres.toLocaleLowerCase().includes(genres.toLocaleLowerCase())
        );
    }

    res
        .json(results);
});

module.exports = app;

// app.listen(8000, () => {
//     console.log('Server started on PORT 8000');
// });