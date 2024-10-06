// Elements from the HTML
const generateBtn = document.getElementById('generateBtn');
const loglineText = document.getElementById('loglineText');

// Variables to store data from JSON
let protagonists = [];
let settings = [];
let conflicts = [];
let stakes = [];

// List of JSON files to randomly select from
const jsonFiles = ["male_data.json", "female_data.json", "plural_data.json"];

// Function to load a random JSON file
function loadRandomJSON(callback) {
    // Select a random file from the list
    const randomFile = jsonFiles[Math.floor(Math.random() * jsonFiles.length)];
    console.log(`Loading JSON file: ${randomFile}`);

    fetch(randomFile)
        .then(response => response.json())
        .then(data => {
            // Store data from each section in respective variables
            protagonists = data.protagonists || [];
            settings = data.settings || [];
            conflicts = data.conflicts || [];
            stakes = data.stakes || [];

            // Enable the generate button if all data arrays are populated
            if (protagonists.length && settings.length && conflicts.length && stakes.length) {
                generateBtn.disabled = false;
                loglineText.innerText = "Click the button to generate a random logline for your next story!";

                // Call the callback function if provided (e.g., to generate a logline after loading)
                if (callback) callback();
            } else {
                loglineText.innerText = `Error: The JSON file "${randomFile}" does not have the expected structure or is missing data.`;
            }
        })
        .catch(error => {
            loglineText.innerText = `Error loading the JSON file "${randomFile}". Make sure the file is in the correct location.`;
            console.error(error);
        });
}

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
    // Load a random JSON file and then generate a logline using the loaded data
    loadRandomJSON(() => {
        // Callback function to generate a logline once the JSON is loaded
        const logline = generateLogline();
        loglineText.innerText = logline || "Error: Unable to generate logline. Please try again.";
    });
});

// Initial load to enable the Generate button
loadRandomJSON();
