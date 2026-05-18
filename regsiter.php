<?php

include 'connect.php';

if(isset($_POST['signUp'])){
    $firstName = $_POST['username'];
    $lastName = $_POST['password'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $password = md5($_POST['password']);

    $checkEmail = "SELECT * FROM users WHERE email='$email'";
    $result = $conn->query($checkEmail);
    if($result->num_rows > 0){ 
        echo "Email Address Already Exists!";
    } else {

        $insertQuery = "INSERT INTO users(username, password, phone, email)
                        VALUES ('$firstName', '$password', '$phone', '$email')";

        if($conn->query($insertQuery) === TRUE){
            header("Location: index.php");
            exit();
        } else {
            echo "Error: " . $conn->error; 
        }
    }
}

if(isset($_POST['signIn'])){
    $email = $_POST['email'];
    $password = md5($_POST['password']);

    $sql = "SELECT * FROM users WHERE email='$email' AND password='$password'";
    $result = $conn->query($sql);
    if($result->num_rows > 0){
        session_start();
        $row = $result->fetch_assoc();
        $_SESSION['email'] = $row['email'];
        header("Location: homepage.php");
        exit();
    } else {
        echo "Not Found, Incorrect Email or Password";
    }
}

?>
