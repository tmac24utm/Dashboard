<?php
    require 'head.php';

    if(!isset($_SESSION['UserID'])){
        header("Location: login.php");
        exit;
    }

    unset($_SESSION['UserID']);
    session_destroy();

    header("Location: index.php");
    exit;
?>