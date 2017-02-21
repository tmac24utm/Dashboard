<?php
    require 'head.php';

    if(!isset($_SESSION['userid'])){
        header("Location: login.php");
        exit;
    }

    unset($_SESSION['userid']);
    session_destroy();

    header("Location: index.php");
    exit;
?>