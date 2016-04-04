/**
 * Created by UFO on 03.2016.
 */
<?php

// Verbindungsaufbau und Auswahl der Datenbank
$db_host = "localhost";
$db_name = "db_space";
$db_user = "postgres";
$db_pass = "root";
$db_port = "5432";

// Verbindungsdaten
$db = pg_connect("host=localhost dbname=db_space user=postgres password=root")
or die ('Es konnte keine Verbindung hergestellt werden!'.pg_last_error());
if($db){
    echo("Verbindung steht");
}
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
pg_close($db);
?>