<!DOCTYPE html>
<html>
    <head>
        <title>Tetris</title>
        <meta name="author" content="MrXeth"/>
        <meta charset="utf-8"/>
        <link rel="icon" href="./res/icon.ico">
        <link rel="stylesheet" href="./css/Tetris.css">
        <script type="module" src="./js/module/tetris/Main.js"></script>
        <script type="text/javascript" src="./js/ScoreField.js"></script>
    </head>
    <body>
        <noscript>Please activate Javascript in your browser settings!</noscript>
        
        <h1>Tetris</h1>

        <!-- game -->
        <div id="tetris">
            <canvas id="gamefield"></canvas>
            <!-- score -->
            <div id="info">
                <canvas id="next_block"></canvas>
                <div id="level">level: 0</div>
                <div id="score">score: 0</div>  
                <!-- scoreboard -->
            <div id="scoreboard">
                <button id="show_scoreboard" type="button">show scoreboard</button>
                <table id="score_entries">
                    <tr>
                        <th>name</th>
                        <th>score</th>
                    </tr>
                    <?php
                        include("./php/Database.php");
                        printScores();
                    ?>
                </table>
            </div>
            </div>
        </div>
        
        <!-- score input -->
        <form id="score_input" method="post" action="./php/Database.php">
            <input id="score_form" name="score" type="number" value="0">           
            <label for="name_input">Enter your name to store it into the scoreboard</label><br>
            <input id="name_input" type="text" name="name" placeholder="Your Name" required>
            <button type="submit">submit</button>
        </form>
    </body>
</html>