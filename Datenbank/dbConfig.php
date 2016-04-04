<?php
/**
 * Created by IntelliJ IDEA.
 * User: UFO
 * Date: 04.2016
 */

// Verbindungsaufbau und Auswahl der Datenbank

$db_host = "flurrysworld.dd-dns.de";
$db_name = "db_ufo";
$db_user = "ufo";
$db_pass = "Spaceinvaders";
$db_port = "3306";


$db = mysql_connect($db_host+":"+$db_port,$db_user,$db_pass);
if(!$db){
    exit("Es konnte keine Verbindung hergestellt werden!");
}

mysql_select_db($db_name, $db) or exit("Datenbank existiert nicht!");