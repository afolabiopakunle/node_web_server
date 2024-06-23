const express = require('express');
const fs = require('fs');
const hbs = require('hbs');

const port = process.env.PORT || 3000;
const app = express();


hbs.registerPartials(__dirname + '/views/partials');
app.set('view-engine', 'hbs');
app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getYear', () => {
    return new Date().getFullYear();
})

hbs.registerHelper('upperCase', (text) => {
    return text.toUpperCase()
})

app.use((req, res, next) => {
    const now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url} \n`;
    fs.appendFile('server_log.txt', `${log}`, () => {});
    res.render('maintenance.hbs')
    // next();
})
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home',
        welcomeMessage: 'This is the home page',
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Us',
    })
})

app.get('/bad-route', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    })
})

app.listen(port, () => console.log('app running on port ' + port));