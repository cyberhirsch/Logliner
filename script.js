// Elements from the HTML
const generateBtn = document.getElementById('generateBtn');
const loglineText = document.getElementById('loglineText');

// Variables to store data from JSON
let protagonists = [];
let settings = [];
let conflicts = [];
let stakes = [];

// Fetch the JSON file from the same directory
fetch("plural_data.json") // Assuming the file is named "logline_data.json"
    .then(response => response.json())
    .then(data => {
        // Store data from each section in respective variables
        protagonists = data.protagonist || [];
        settings = data.settings || [];
        conflicts = data.conflicts || [];
        stakes = data.stakes || [];

        // Enable the generate button if any data is successfully loaded
        if (protagonists.length && settings.length && conflicts.length && stakes.length) {
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
    // Ensure data is available before generating
    if (!protagonists.length || !settings.length || !conflicts.length || !stakes.length) return;

    // Select a random protagonist, setting, conflict, and stakes
    const protagonist = protagonists[Math.floor(Math.random() * protagonists.length)];
    const setting = settings[Math.floor(Math.random() * settings.length)];
    const conflict = conflicts[Math.floor(Math.random() * conflicts.length)];
    const stake = stakes[Math.floor(Math.random() * stakes.length)];

    // Construct the logline
    return `${protagonist} ${setting} ${conflict} ${stake}.`;
}

// Event listener for button click to generate and display the logline
generateBtn.addEventListener('click', () => {
    const logline = generateLogline();
    loglineText.innerText = logline;
});
