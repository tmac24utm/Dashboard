<!DOCTYPE html>
<html>

<?php require("head.php");?>

<body>
    <header>
        <h1 id="header">Welcome <span id="header_text">Guest</span></h1>
    </header>
    <?php if(isset($_SESSION['UserID'])){?>
    <div id="map"></div>
    <script>
        function initMap() {
            // Try HTML5 geolocation.
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    var pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };

            var map = new google.maps.Map(document.getElementById('map'), {
                center: pos,
                zoom: 15
            });
            var infoWindow = new google.maps.InfoWindow({ map: map });
                    infoWindow.setPosition(pos);
                    infoWindow.setContent('Location found.');
                    map.setCenter(pos);
                }, function () {
                    handleLocationError(true, infoWindow, map.getCenter());
                });
            } else {
                // Browser doesn't support Geolocation
                handleLocationError(false, infoWindow, map.getCenter());
            }
        }

        function handleLocationError(browserHasGeolocation, infoWindow, pos) {
            infoWindow.setPosition(pos);
            infoWindow.setContent(browserHasGeolocation ?
                'Error: The Geolocation service failed.' :
                'Error: Your browser doesn\'t support geolocation.');
        }
    </script>
    <?php }else { echo "<div class=error>Please login or register to access the features of this website</div>";}?>
    <?php require ("account.php");?>
    <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD20hEhOFvacycdb9UGlDrKb4Tu1lAKdZc&callback=initMap"></script>
</body>
</html>