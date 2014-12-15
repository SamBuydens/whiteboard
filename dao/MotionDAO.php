<?php

require_once '../classes' . DIRECTORY_SEPARATOR . 'DatabasePDO.php';
require_once 'MotionDAO.php';

class MotionDAO
{
    public $pdo;

    public function __construct()
    {
        $this->pdo = DatabasePDO::getInstance();
    }

    public function getMotionById($whiteboard_id){
        $sql = "SELECT * 
                FROM wb_motion
                WHERE whiteboard_id = :whiteboard_id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(':whiteboard_id', $whiteboard_id);
        if($stmt->execute()){
            $postit = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if(!empty($postit)){
                return $postit;
            }
        }
        return array();
    }   

    public function deleteMotionById($id){
        $sql = "DELETE
                FROM wb_motion
                WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(":id",$id);
        if($stmt->execute()){
            return $id;
        }
        return false;
    }

    public function addNewMotion($whiteboard_id ,$id_on_board, $posx, $posy){
        $sql = "INSERT INTO wb_motion(whiteboard_id,id_on_board, posx, posy)
                VALUES (:whiteboard_id,:id_on_board, :posx, :posy)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(":whiteboard_id",$whiteboard_id);
        $stmt->bindValue(":id_on_board",$id_on_board);
        $stmt->bindValue(":posx",$posx);
        $stmt->bindValue(":posy",$posy);
        if($stmt -> execute()){
            return 'success';
        }
        return array();
    }

    public function updateContent($whiteboard_id,$id_on_board,$content){
        $sql = 'UPDATE wb_motion SET content=:content WHERE whiteboard_id=:whiteboard_id AND id_on_board=:id_on_board';
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(':whiteboard_id',$whiteboard_id);
        $stmt->bindValue(':id_on_board',$id_on_board);
        $stmt->bindValue(':content',$content);
        if($stmt->execute()){   
            return $content;
        }
        return false;
    }

    public function updatePosition($whiteboard_id,$id_on_board,$posx,$posy){
        $sql = 'UPDATE wb_motion SET posx=:posx, posy=:posy WHERE whiteboard_id=:whiteboard_id AND id_on_board=:id_on_board';
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(':whiteboard_id',$whiteboard_id);
        $stmt->bindValue(':id_on_board',$id_on_board);
        $stmt->bindValue(':posx',$posx);
        $stmt->bindValue(':posy',$posy);
        if($stmt->execute()){   
            return 'updated';
        }
        return false;
    }

}