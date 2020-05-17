/**
 * request the score board from the server
 */
function showScoreboard()
{
    let scoreboard = document.getElementById("score_entries");
    if(scoreboard.style.display == "table")
    {
        scoreboard.style.display = "none";
    }
    else
    {
        scoreboard.style.display = "table";
    }
}

/**
 * sends a score to the server
 * 
 * @param {string} name user name 
 * @param {number} score score
 */
function sendScore(name, score)
{
    let xhttp = new XMLHttpRequest();
    xhttp.open("POST","./php/Scores.php");
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.send(`name=${name}&score=${score}`);
}

// separate html from js
window.addEventListener("load",() => document.getElementById("show_scoreboard").addEventListener("click", showScoreboard));