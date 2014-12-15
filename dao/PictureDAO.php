<?php

require_once '../classes' . DIRECTORY_SEPARATOR . 'DatabasePDO.php';
require_once 'PictureDAO.php';

class PictureDAO
{
    public $pdo;

    public function __construct()
    {
        $this->pdo = DatabasePDO::getInstance();
    }

    public function getPicturesByBoardId($whiteboard_id){
        $sql = "SELECT * 
                FROM wb_static
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
    
    public function deletePictureById($whiteboard_id ,$id_on_board){
        $sql = "DELETE
                FROM wb_static
                WHERE whiteboard_id=:whiteboard_id AND id_on_board=:id_on_board";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(":whiteboard_id",$whiteboard_id);
        $stmt->bindValue(":id_on_board",$id_on_board);
        if($stmt->execute()){
            return $id_on_board;
        }
        return false;
    }

    public function addNewPicture($whiteboard_id ,$id_on_board, $posx, $posy){
        $sql = "INSERT INTO wb_static(whiteboard_id,id_on_board, posx, posy)
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

    public function updatePosition($whiteboard_id,$id_on_board,$posx,$posy){
        $sql = 'UPDATE wb_static SET posx=:posx, posy=:posy WHERE whiteboard_id=:whiteboard_id AND id_on_board=:id_on_board';
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

    public function updateContent($whiteboard_id,$id_on_board,$content){
        $sql = 'UPDATE wb_static SET content=:content WHERE whiteboard_id=:whiteboard_id AND id_on_board=:id_on_board';
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(':whiteboard_id',$whiteboard_id);
        $stmt->bindValue(':id_on_board',$id_on_board);
        $stmt->bindValue(':content',$content);
        if($stmt->execute()){   
            return $content;
        }
        return false;
    }

}