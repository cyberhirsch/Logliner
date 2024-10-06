// Elements from the HTML
const generateBtn = document.getElementById('generateBtn');
const loglineText = document.getElementById('loglineText');

// Variables to store data from different sheets
let maleProtagonistData = [];
let femaleProtagonistData = [];
let pluralProtagonistData = [];

// Load the Excel file from the local directory using fetch
fetch("Parts.xlsx")
    .then(response => response.arrayBuffer())
    .then(data => {
        // Read the Excel file using XLSX
        const workbook = XLSX.read(data, { type: 'array' });

        // Read sheets based on their names
        if (workbook.Sheets['MaleProtagonist']) {
            maleProtagonistData = parseSheet(workbook.Sheets['MaleProtagonist']);
        }
        if (workbook.Sheets['FemaleProtagonist']) {
            femaleProtagonistData = parseSheet(workbook.Sheets['FemaleProtagonist']);
        }
        if (workbook.Sheets['PluralProtagonist']) {
            pluralProtagonistData = parseSheet(workbook.Sheets['PluralProtagonist']);
        }

        // Enable the generate button if any data is successfully loaded
        if (maleProtagonistData.length || femaleProtagonistData.length || pluralProtagonistData.length) {
            generateBtn.disabled = false;
            loglineText.innerText = "File loaded successfully! Click 'Generate Logline' to create a logline.";
        } else {
            loglineText.innerText = "Error: The Excel file does not have the expected structure.";
        }
    })
    .catch(error => {
        loglineText.innerText = "Error loading the Excel file. Make sure the file is in the correct location.";
        console.error(error);
    });

// Function to parse each sheet and extract relevant columns
function parseSheet(sheet) {
    // Convert sheet to JSON format
    const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    // Extract data and return an array of objects for each logline component
    return rows.slice(1).map(row => ({
        character: row[0],
        setting: row[1],
        conflict: row[2],
        stakes: row[3]
    })).filter(row => row.character && row.setting && row.conflict && row.stakes);
}

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
