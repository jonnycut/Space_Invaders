
<?php

// Verbindungsaufbau und Auswahl der Datenbank

$db = pg_connect("host=192.168.1.38 port=5432 dbname=hs06-5 user=hs06-5 password=e8VWCuBd")
//dsfkldfjkjsd
or die ('Es konnte keine Verbindung hergestellt werden!'.pg_last_error());



//Nach Beendigung des Spiels füge die Spieldaten als Datensatz hinzu:
if (isset($_POST['spieler'])) {
    $result = pg_query_params($db, 'INSERT INTO t_highscore (name,score) VALUES ($1,$2)', array($_POST ["spieler"], $_POST ["score"]))
    or die('Abfrage fehlgeschlagen: ' . pg_last_error());

} else {

//Ansonsten Gib den Highscore als Array zurück
    $highscore = pg_query("SELECT * FROM t_highscore ORDER BY score DESC LIMIT 20") or die('Abfrage fehlgeschlagen: ' . pg_last_error());
    echo json_encode(pg_fetch_all($highscore));
}

pg_close($db);
?>