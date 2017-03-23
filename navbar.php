<?php 

    $url = $_SERVER["REQUEST_URI"];
    $pos = strrpos($url, "accountSettings.php");

    if(isset($_SESSION['UserID'])){
        if($pos != false){
            echo '<ul>
                    <li style="float:right"><a href="logout.php">Logout</a></li>
                    <li><a href="index.php">Home</a></li>
                </ul>';  
        } else {
            echo '<ul>
                    <li style="float:right"><a href="logout.php">Logout</a></li>
                    <li style="float:left"><a href="accountSettings.php">Account Settings</a></li>
                </ul>';
        }
    }
?>