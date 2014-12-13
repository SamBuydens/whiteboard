<?php

require_once '../classes' . DIRECTORY_SEPARATOR . 'DatabasePDO.php';
require_once 'BoardsDAO.php';

class BoardsDAO
{
    public $pdo;
    private $boardsDAO;

    public function __construct()
    {
        $this->pdo = DatabasePDO::getInstance();
    }

    public function selectAll(){
        $sql = "SELECT * 
                FROM wb_whiteboard";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function addNewBoard($title, $creator){
        $sql = "INSERT INTO wb_whiteboard(`title`, `creator`) VALUES (:title, :creator)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(":title",$title);
        $stmt->bindValue(":creator",$creator);
        if($stmt -> execute()){
            return $this -> getBoardById($this->pdo->lastInsertId());
        }
        return false;
    }

    public function getBoardById($id){
        $sql = "SELECT * FROM `wb_whiteboard` WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(':id', $id);
        if ($stmt->execute()) {
            $board = $stmt->fetch(PDO::FETCH_ASSOC);
            if (!empty($board)) {
                return $board;
            }
        }
        return array();
    }


    public function deleteBoardById($id){
    $sql = "DELETE FROM wb_whiteboard WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(":id",$id);
        if($stmt->execute()){
            return $id;
        }
        return false;
    }


}