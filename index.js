/*
- tools to perform web scraping : 
    - 1. An HTTP API Client =>  to fetch web pages  => Axios
    - 2. An HTML parser =>  to extract data from the fetched pages =>  Cheerio
*/

const axios = require('axios');
const cheerio = require('cheerio');

// Function to scrape image data from Google Images
async function scrapeSite(keyword) {
  // Build the Google Images search URL
  const url = `https://www.google.com/search?gl=us&q=${keyword}&tbm=isch`;

  try {
    // Fetch the HTML data using Axios
    const { data } = await axios.get(url);

    // Load the HTML data into a Cheerio object for easy manipulation
    const $ = cheerio.load(data);

    // Initialize an empty array to store scraped results
    const results = [];
    // Loop through each image container element
    $('table.RntSmf').each((i, elem) => {
      // Extract the image source URL from the 'img' tag's 'src' attribute
      const imgSrc = $(elem).find('img').attr('src');

      // Extract the text content from the first child 'span' tag
      const text = $(elem).find('span:first-child').text().trim();

      // Push the extracted data as an object into the 'results' array
      results.push({ imgSrc, text });
    });

    // Return the array containing the scraped image data
    return results;
  } catch (error) {
    console.error("Error scraping data:", error);
    return []; // Return empty array on error
  }
}

// Example usage
const keyword = "coffee"; // Change with your desired keyword

scrapeSite(keyword)
  .then(results => {
    console.log("Scraped image data:", results);
  })
  .catch(error => {
    console.error("Error retrieving data:", error);
  });