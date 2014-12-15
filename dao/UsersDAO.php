<?php

require_once '../classes' . DIRECTORY_SEPARATOR . 'DatabasePDO.php';
require_once 'UsersDAO.php';

class UsersDAO
{
    public $pdo;
    public function __construct()
    {
        $this->pdo = DatabasePDO::getInstance();
    }

    public function login($email, $password){
        $sql = "SELECT * FROM  wb_user WHERE `wb_email` = :wb_email AND `wb_pass`= :wb_password";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(':wb_email', $email);
        $securepassword = sha1(CONFIG::SALT . $password);
        $stmt->bindValue(':wb_password', $securepassword);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function register($username, $email, $password){
        $sql = "INSERT INTO wb_user(`wb_username`,`wb_email`,`wb_pass`) VALUES (:wb_username, :wb_email,:wb_password)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(':wb_username', $username);
        $stmt->bindValue(':wb_email', $email);
        $securepassword = sha1(CONFIG::SALT . $password);
        $stmt->bindValue(':wb_password', $securepassword);
        if($stmt -> execute()){
            return $this -> getUserById($this->pdo->lastInsertId());
        }
        return false;
    }

    public function getUserById($id){
        $sql = "SELECT * FROM `wb_user` WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(':id', $id);
        if ($stmt->execute()) {
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            if (!empty($user)) {
                return $user;
            }
        }
        return array();
    }

}