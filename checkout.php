<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["cartData"])) {

    $cartData = json_decode($_POST["cartData"], true);

    $_SESSION["cart"] = $cartData;

    echo json_encode(["status" => "success", "message" => "Cart data saved successfully"]);
}
?>