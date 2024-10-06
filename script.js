// Define logline elements
const characters = [
    "A reclusive detective", 
    "A fearless astronaut", 
    "An ambitious journalist", 
    "A cynical private eye", 
    "A grieving mother",
    "A former soldier"
];

const settings = [
    "in a dystopian future", 
    "on a distant planet", 
    "in a small coastal town", 
    "in the depths of the Amazon rainforest", 
    "during a war-torn era", 
    "in a city where everyone can read minds"
];

const conflicts = [
    "must uncover the truth behind a series of murders", 
    "struggles to prevent a deadly outbreak", 
    "is determined to expose a powerful criminal organization", 
    "must track down a missing child who holds a dangerous secret", 
    "fights to protect an ancient artifact from falling into the wrong hands", 
    "unravels a conspiracy that threatens to rewrite history"
];

const stakes = [
    "before it's too late", 
    "to save their loved ones", 
    "while risking their own sanity", 
    "while battling their own inner demons", 
    "or risk losing everything they hold dear", 
    "to prevent the collapse of society"
];

// Function to generate a random logline
function generateLogline() {
    const character = characters[Math.floor(Math.random() * characters.length)];
    const setting = settings[Math.floor(Math.random() * settings.length)];
    const conflict = conflicts[Math.floor(Math.random() * conflicts.length)];
    const stake = stakes[Math.floor(Math.random() * stakes.length)];

    return `${character} ${setting} ${conflict} ${stake}.`;
}

// Event listener for button click
document.getElementById('generateBtn').addEventListener('click', () => {
    const logline = generateLogline();
    document.getElementById('loglineText').innerText = logline;
});
