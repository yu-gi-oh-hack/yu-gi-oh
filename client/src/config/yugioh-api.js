import axios from 'axios';

const deck = 
axios
.create({
    baseURL: 'https://db.ygoprodeck.com/api/v4'
})

const water_deck = 
axios
.create({
    baseURL: 'https://db.ygoprodeck.com/api/v4/'
})

module.exports = deck
