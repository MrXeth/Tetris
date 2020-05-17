<?php 
    //#region database settings

    /** @var string $host*/
    $host = "localhost";

    /** @var string $user*/
    $user = "root";

    /** @var string $password */
    $password = "";
    
    /** @var string $database */
    $database = "tetris";

    //#endregion

    /**
     * connects to the mysql database
     * 
     * @return mysqli|false the connection
     */
    function connect()
    {
        global $host, $user, $password, $database;
        $connection = mysqli_connect($host, $user, $password, $database);
        if($connection)
        {
            return $connection;
        }
        die ("<b>Database connection failed:</b> ".mysqli_error($connection));
    }

    /**
     * prints the scores of the table "scores"
     */
    function printScores()
    {
        $connection = connect();
        $sql = "SELECT name, score FROM score ORDER BY score DESC, name ASC LIMIT 10";
        $result = mysqli_query($connection, $sql);
        $firstRun = true;
        while($row = mysqli_fetch_row($result))
        {
            echo ($firstRun ? "" : str_repeat("\t", 5))."<tr>\n";
            echo str_repeat("\t", 6)."<td>".$row[0]."</td>\n";
            echo str_repeat("\t", 6)."<td>".$row[1]."</td>\n";
            echo str_repeat("\t", 5)."</tr>\n";
            if($firstRun)
            {
                $firstRun = false;
            }
        }
    }   

    /**
     * inserts a new score into the table "scores"
     */
    function insertScore(string $name, int $score)
    {
        $sql = "INSERT INTO score (name, score) VALUES (?, ?)";
        $connection = connect();
        $stmt = mysqli_prepare($connection, $sql);
        $stmt->bind_param("si", $name, $score);
        $stmt->execute();
    }

    if(isset($_POST["name"]) && isset($_POST["score"]))
    {
        insertScore($_POST["name"], $_POST["score"]);
        header("Location: http://localhost/Tetris.php");
    }


?>