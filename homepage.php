<?php 
session_start();
include('connect.php');
?>

<!DOCTYPE html>
<html>
    <head>
        <title>Doc</title>
    </head>
    <body>
        <div style="text-align:center; padding:15%;">
            <p style="font-size:50px; font-weight:bold;">
                Hello 
                <?php
                if(isset($_SESSION['email'])){
                    $email = $_SESSION['email'];
                    $query = mysqli_query($conn, "SELECT * FROM users WHERE email='$email'");

                    while($row = mysqli_fetch_array($query)){
                        echo $row['username'] . ' ' . $row['password'];
                    }
                }
                ?>
                :)
            </p>
        </div>
    </body>
</html>
