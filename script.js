// Elements from the HTML
const generateBtn = document.getElementById('generateBtn');
const loglineText = document.getElementById('loglineText');

// Variables to store data from JSON
let categories = {};
let conflicts = {};
let stakes = {};

// Fetch the optimized JSON file from the same directory
fetch("logline_data.json")
    .then(response => response.json())
    .then(data => {
        // Store data from each section in respective variables
        categories = data.categories || {};
        conflicts = data.conflicts || {};
        stakes = data.stakes || {};

        // Enable the generate button if any data is successfully loaded
        if (Object.keys(categories).length && Object.keys(conflicts).length && Object.keys(stakes).length) {
            generateBtn.disabled = false;
            loglineText.innerText = "File loaded successfully! Click 'Generate Logline' to create a logline.";
        } else {
            loglineText.innerText = "Error: The JSON file does not have the expected structure.";
        }
    })
    .catch(error => {
        loglineText.innerText = "Error loading the JSON file. Make sure the file is in the correct location.";
        console.error(error);
    });

// Function to generate a random logline
function generateLogline() {
    // Randomly select one of the protagonist categories
    const protagonistTypes = Object.keys(categories);
    const randomType = protagonistTypes[Math.floor(Math.random() * protagonistTypes.length)];

    if (!randomType || !categories[randomType].length || !conflicts[randomType].length || !stakes[randomType].length) return;

    // Select a random character, conflict, and stakes based on the chosen protagonist type
    const character = categories[randomType][Math.floor(Math.random() * categories[randomType].length)];
    const conflict = conflicts[randomType][Math.floor(Math.random() * conflicts[randomType].length)];
    const stake = stakes[randomType][Math.floor(Math.random() * stakes[randomType].length)];

    // Construct the logline
    const logline = `${character} ${conflict} ${stake}.`;
    return logline;
}

// Event listener for button click to generate and display the logline
generateBtn.addEventListener('click', () => {
    const logline = generateLogline();
    loglineText.innerText = logline;
});
