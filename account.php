<?php 
    if(isset($_SESSION['UserID'])){
        echo '<ul>
                <li style="float:right"><a href="logout.php">Logout</a></li>
                <li><a href="accountSettings.php">Account Settings</a></li>
              </ul>';
    } else {
        echo "
            <div id='form'>
                <form method='POST' action ='index.php'>
                    <input id='name' type='text' name='name' placeholder='Name' required>
                    <input type='password' name='password' placeholder='Password' required> 
                    <input type='submit'>
            </form>";
    }

    if(isset($_POST) && !empty($_POST)){
        $name = $_POST['name'];
        $password = $_POST['password'];
        $result = $pdo->query("SELECT `UserID` FROM `Users` WHERE `name` = ?", array($name), "rowcount");

        if($result == 1){
            $user = $pdo->query("SELECT `UserID`, `password` FROM `Users` WHERE `name` = ?", array($name), "fetch");
            if($user['password'] == $password){
                $_SESSION['UserID'] = $user['UserID'];
                header("Location: index.php");
                exit;
                } else {
                    echo("<div class=error>Your password was incorrect, try again!</div>");
                } 
        } else {
            $pdo->query("INSERT INTO `Users` (`name`, `password`) VALUES (?, ?)", array($name, $password)); 
            $UserID = $pdo->query("SELECT `UserID` FROM `Users` WHERE `name` = ?", array($name), "fetch");
            $_SESSION['UserID'] = $UserID['UserID'];
            header("Location: index.php");
            exit;
        }
    }
?>