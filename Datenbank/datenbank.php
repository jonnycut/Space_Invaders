<?php
// Verbindungsaufbau und Auswahl der Datenbank

$dbconn = pg_connect("host=localhost dbname=db_pacman user=postgres password=root")
or die('Verbindungsaufbau fehlgeschlagen: ' . pg_last_error());

//Nach Beendigung des Spiels füge die Spieldaten als Datensatz hinzu:
if (isset($_POST['user'])) {
    $spiel = "INSERT INTO t_highscore (name, zeit, punkte) VALUES ($1,CAST($2 AS TIME),$3)";
    $result = pg_query_params($dbconn, $spiel, array($_POST ["user"], $_POST ["zeit"], $_POST ["punkte"])) or die('Abfrage fehlgeschlagen: ' . pg_last_error());

} else {

//Ansonsten Gib den Highscore als Array zurück
    $highscore = pg_query("SELECT * FROM t_highscore ORDER BY punkte DESC LIMIT 10") or die('Abfrage fehlgeschlagen: ' . pg_last_error());
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
// Verbindung schließen
pg_close($dbconn);
?>