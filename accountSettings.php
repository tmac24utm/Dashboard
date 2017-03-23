<!DOCTYPE html>
<html>
<?php require("head.php");?>
<body>
    <?php if(isset($_SESSION['UserID'])){?>
        <?php require ("navbar.php");?>

        Which clock would you like: <select id="clockSettings">
            <option value="24H">24 Hour</option>
            <option value="12H">12 Hour</option>
        </select>
     
        <br>Username of the twitter account you'd like to see: <input id="twitterSettings" type="text" name="twitterSettings" placeholder="@" onchange="changeTwitterSettings()">

        <script>
            function changeTwitterSettings(){
                var twitterSettings = document.getElementById("twitterSettings");
                localStorage.setItem("twitterSettings", twitterSettings.value);
            }
        </script>

    <?php } else { echo "<div class=error>Please login or register to access the features of this dashboard</div>", require ("account.php");}?>
</body>
</html>