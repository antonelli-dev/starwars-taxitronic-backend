const axios = require('axios');

async function fetchData(url, errorMessage) {
    try {
        const { data } = await axios.get(url);
        return data;
    } catch (error) {
        console.error(`${errorMessage} at ${url}:`, error);
       throw error;
    }
}

module.exports = fetchData;
