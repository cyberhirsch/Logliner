// Elements from the HTML
const generateBtn = document.getElementById('generateBtn');
const loglineText = document.getElementById('loglineText');

// Variables to store data from JSON
let maleProtagonistData = [];
let femaleProtagonistData = [];
let pluralProtagonistData = [];

// Fetch the JSON file from the same directory
fetch("logline_data.json")
    .then(response => response.json())
    .then(data => {
        // Store data from each category in respective variables
        maleProtagonistData = data.maleProtagonist || [];
        femaleProtagonistData = data.femaleProtagonist || [];
        pluralProtagonistData = data.pluralProtagonist || [];

        // Enable the generate button if any data is successfully loaded
        if (maleProtagonistData.length || femaleProtagonistData.length || pluralProtagonistData.length) {
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

// Function to select a random logline based on gender/plurality
function generateLogline() {
    // Randomly select from one of the three datasets based on a random choice
    let protagonistType = Math.random();
    let selectedData = [];

    if (protagonistType < 0.33 && maleProtagonistData.length) {
        selectedData = maleProtagonistData;
    } else if (protagonistType < 0.66 && femaleProtagonistData.length) {
        selectedData = femaleProtagonistData;
    } else if (pluralProtagonistData.length) {
        selectedData = pluralProtagonistData;
    } else {
        selectedData = maleProtagonistData.length ? maleProtagonistData : femaleProtagonistData.length ? femaleProtagonistData : pluralProtagonistData;
    }

    if (!selectedData.length) return;

    // Select a random logline from the chosen dataset
    const index = Math.floor(Math.random() * selectedData.length);
    const logline = selectedData[index];

    return `${logline.character} ${logline.setting} ${logline.conflict} ${logline.stakes}.`;
}

// Event listener for button click to generate and display the logline
generateBtn.addEventListener('click', () => {
    const logline = generateLogline();
    loglineText.innerText = logline;
});
