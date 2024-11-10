const ENDPOINT = "http://127.0.0.1:5000"

// List of heroes used for mapping
const heroes = [
    "Anti-Mage", "Axe", "Bane", "Bloodseeker", "Crystal Maiden",
    "Drow Ranger", "Earthshaker", "Juggernaut", "Mirana", "Morphling",
    "Shadow Fiend", "Phantom Lancer", "Puck", "Pudge", "Razor",
    "Sand King", "Storm Spirit", "Sven", "Tiny", "Windranger",
    "Zeus", "Kunkka", "Lina", "Lion", "Shadow Shaman", "Slardar",
    "Tidehunter", "Witch Doctor", "Lich", "Riki", "Enigma",
    "Tinker", "Sniper", "Necrophos", "Warlock", "Beastmaster",
    "Queen of Pain", "Venomancer", "Faceless Void", "Skeleton King",
    "Death Prophet", "Phantom Assassin", "Pugna", "Templar Assassin",
    "Viper", "Luna", "Dragon Knight", "Dazzle", "Clockwerk",
    "Leshrac", "Nature's Prophet", "Lifestealer", "Dark Seer",
    "Clinkz", "Omniknight", "Enchantress", "Huskar", "Night Stalker",
    "Broodmother", "Bounty Hunter", "Weaver", "Jakiro", "Batrider",
    "Chen", "Spectre", "Ancient Apparition", "Doom", "Ursa",
    "Spirit Breaker", "Gyrocopter", "Alchemist", "Invoker", "Silencer",
    "Outworld Devourer", "Lycanthrope", "Brewmaster", "Shadow Demon",
    "Lone Druid", "Chaos Knight", "Meepo", "Treant Protector",
    "Ogre Magi", "Undying", "Rubick", "Disruptor", "Nyx Assassin",
    "Naga Siren", "Keeper of the Light", "Wisp", "Visage", "Slark",
    "Medusa", "Troll Warlord", "Centaur Warrunner", "Magnus",
    "Timbersaw", "Bristleback", "Tusk", "Skywrath Mage", "Abaddon",
    "Elder Titan", "Legion Commander", "Techies", "Ember Spirit",
    "Earth Spirit", "Terrorblade", "Phoenix", "Oracle", "Winter Wyvern",
    "Arc Warden"
];
// Select the html <select> elements and set their value to a hero
$(document).ready(function() {
    selectors = $('.hero-selector').each(function (index, element) {
        heroes.forEach( hero => {
            $(element).append(`<option value="${hero}">${hero}</option>`);
        })
        
    });
    app();
});


function app() {
    // onSubmit functionality
    $('#team-form').submit(function(e) {
        e.preventDefault();
        // Extract value from each <select>
        const team1_heroes = [
            $('select[name="hero1"]').val(),
            $('select[name="hero2"]').val(),
            $('select[name="hero3"]').val(),
            $('select[name="hero4"]').val(),
            $('select[name="hero5"]').val()
        ];
        
        const team2_heroes = [
            $('select[name="hero6"]').val(),
            $('select[name="hero7"]').val(),
            $('select[name="hero8"]').val(),
            $('select[name="hero9"]').val(),
            $('select[name="hero10"]').val()
        ];

        // Create & send POST request
        if (checkUnique(team1_heroes, team2_heroes)) {
            $.ajax({
                url: `${ENDPOINT}/predict`,  // Ensure the URL matches the Flask server
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    team1_heroes: team1_heroes,
                    team2_heroes: team2_heroes
                }),
                success: function(response) {
                    console.log("Prediction result:", response);
                    $(".result-container h3").text(`Predicted winner: ${response.result}`);
                    $(".result-container").show();
                },
                error: function(error) {
                    console.log("Error:", error);
                }
            });
        } else {
            displayError()
        
        }



        
    });
}

function displayError() {
    alert("Ensure only unique heroes")
}

function checkUnique(team1, team2) {
    const joinedArray = [...team1, ...team2];

    const allUnique = new Set(joinedArray).size === joinedArray.length;

    return allUnique
}