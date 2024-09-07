/*
- tools to perform web scraping : 
    - 1. An HTTP API Client =>  to fetch web pages  => Axios
    - 2. An HTML parser =>  to extract data from the fetched pages =>  Cheerio
*/

const axios = require("axios");
async function scrapeSite(keyword) {
	const url = `https://www.google.com/search?q=${keyword}&tbm=isch`;
	const { data } = await axios.get(url);
	return data
}

const keyword = "sharokhan"; // change with any keyword you want
scrapeSite(keyword).then(result => {
	console.log(result)
	}).catch(err => console.log(err));
