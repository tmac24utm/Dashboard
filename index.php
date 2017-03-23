<!DOCTYPE html>
<html>
<?php require("head.php");?>
<body>
    <?php if(isset($_SESSION['UserID'])){?>
    <header>
        <h1 id="header"><span id="dateTime"></span></h1>
    </header>
    <?php require ("navbar.php");?>
    <a id="twitter" class="twitter-timeline" href="https://twitter.com/TwitterDev" data-width="30%" data-height="500" data-chrome="nofooter"></a> <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
    <script>
        document.getElementById("twitter").href = "https://twitter.com/" + localStorage.getItem("twitterSettings");
    </script>
    <?php } else { echo "<div class=error>Please login or register to access the features of this dashboard</div>", require ("account.php");}?>
</body>
</html>