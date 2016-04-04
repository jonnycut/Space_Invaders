/**
 * Created by UFO on 03.2016.
 */
<?php
// Verbindungsaufbau und Auswahl der Datenbank

$db_host = "flurrysworld.dd-dns.de";
$db_name = "db_ufo";
$db_user = "ufo";
$db_pass = "Spaceinvaders";
$db_port = "3306";



$db = mysqli_connect($db_host,$db_user,$db_pass);
if(!$db){
    exit("Es konnte keine Verbindung hergestellt werden ".mysqli_connect_error().);
}

mysql_select_db($db_name, $db);


//Nach Beendigung des Spiels fï¿½ge die Spieldaten als Datensatz hinzu:
if (isset($_POST['spieler'])) {
    $spiel = "INSERT INTO t_highscore (name,score) VALUES ($1,$2)";
    $result = pg_query_params($dbconn, $spiel, array($_POST ["spieler"], $_POST ["score"])) or die('Abfrage fehlgeschlagen: ' . pg_last_error());

} else {

//Ansonsten Gib den Highscore als Array zurï¿½ck
    $highscore = pg_query("SELECT * FROM t_highscore ORDER BY score DESC LIMIT 10") or die('Abfrage fehlgeschlagen: ' . pg_last_error());
    echo json_encode(pg_fetch_all($highscore));

//Highscore resetten
//    if (isset($_POST['user'])) {
//        $reset = "DROP TABLE t_highscore";
//        $neu = "CREATE TABLE t_highscore(name VARCHAR(30),zeit TIME,punkte DECIMAL)";
//        pg_query($reset) or die('Abfrage fehlgeschlagen: ' . pg_last_error());
//        pg_query($neu) or die('Abfrage fehlgeschlagen: ' . pg_last_error());
//    }
    // Speicher freigeben
    pg_free_result($highscore);
}
// Verbindung schlieï¿½en
pg_close($dbconn);
?>