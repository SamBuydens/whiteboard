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
                FROM wb_whiteboard ORDER BY `creation_date` DESC ";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    public function getMyBoards($creator){
        $sql = "SELECT * FROM `wb_whiteboard` WHERE creator =:creator";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(':creator', $creator);
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
        if ($stmt->execute()){
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


    public function addTitle($whiteboard_id, $title){
        $sql = 'UPDATE wb_whiteboard SET title=:title WHERE id=:whiteboard_id';
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(':whiteboard_id',$whiteboard_id);
        $stmt->bindValue(':title',$title);
        if($stmt->execute()){   
            return $title;
        }
        return false;
    }

    public function searchParticipant($participant){
        $sql = "SELECT * FROM wb_user WHERE wb_username LIKE :participant ";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(':participant',"{$participant}%");        
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function addTag($content, $whiteboard_id){
        $sql = "INSERT INTO wb_tag(`content`, `whiteboard_id`) VALUES (:content, :whiteboard_id)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(":content",$content);
        $stmt->bindValue(":whiteboard_id",$whiteboard_id);
        if($stmt -> execute()){
            return $content;
        }
        return false;
    }


    public function searchBoard($param){
        $sql = "SELECT * FROM wb_whiteboard WHERE title LIKE :param ";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(':param',"{$param}%");        
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }



    public function searchMyBoard($param, $creator){
        $sql = "SELECT * FROM wb_whiteboard WHERE title LIKE :param AND creator =:creator";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(':param',"{$param}%");        
         $stmt->bindValue(':creator',$creator);        

        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

}