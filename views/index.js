const axios = require('axios');
require('dotenv').config();
let botsearch= document.querySelector('#button-search');
botsearch.addEventListener('click',async function (e) {
    e.preventDefault();
    let qs= document.getElementById('searchbar').value;
    await axios.get(`localhost:3001/apple`)
    console.log(`localhost:3001/${qs}`)
    return
})