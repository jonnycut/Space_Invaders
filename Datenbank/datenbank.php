/**
 * Created by UFO on 03.2016.
 */
<?php

// Verbindungsaufbau und Auswahl der Datenbank
$db_host = "192.168.40.13";
$db_name = "db_ufo";
$db_user = "ufo";
$db_pass = "Spaceinvaders";
$db_port = "3306";

// Verbindungsdaten
$db = mysql_connect($db_host+":"+$db_port,$db_user,$db_pass);
if(!$db){
    exit("Es konnte keine Verbindung hergestellt werden!");
}

mysql_select_db($db_name, $db) or exit("Datenbank existiert nicht!");



//Nach Beendigung des Spiels füge die Spieldaten als Datensatz hinzu:
if (isset($_POST['spieler'])) {
    $spiel = "INSERT INTO t_highscore (name,score) VALUES ($1,$2)";
    $result = pg_query_params($db, $spiel, array($_POST ["spieler"], $_POST ["score"])) or die('Abfrage fehlgeschlagen: ' . mysql_error());

} else {

//Ansonsten Gib den Highscore als Array zurück
    $highscore = pg_query("SELECT * FROM t_highscore ORDER BY score DESC LIMIT 10") or die('Abfrage fehlgeschlagen: ' . mysql_error());
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