<!DOCTYPE html>
<html>
<?php require("head.php");?>
<body>
    <?php if(isset($_SESSION['UserID'])){?>
    <header>
        <h1 id="header"><span id="dateTime"></span></h1>
    </header>
    <?php } else { echo "<div class=error>Please login or register to access the features of this dashboard</div>";}?>
    <?php require ("account.php");?>
</body>
</html>