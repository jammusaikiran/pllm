import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';

// URL of the web page to scrape
const url = 'https://www.myneta.info/LokSabha2024/index.php?action=show_candidates&constituency_id=7';

// Send a GET request to the URL
fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Failed to retrieve the page. Status code: ${response.status}`);
    }
    return response.text();
  })
  .then(html => {
    // Parse the HTML content of the page using JSDOM
    const { document } = (new JSDOM(html)).window;
    
    // Find the specific <div> you want to extract (assuming it has a class 'w3-container')
    const divContent = document.querySelector('div.w3-container');
    
    // Check if the <div> was found
    if (divContent) {
      // Print the extracted HTML content of the <div>
      console.log(divContent.outerHTML);
    } else {
      console.log("The <div> with the specified class was not found.");
    }
  })
  .catch(error => {
    console.error(error);
  });
