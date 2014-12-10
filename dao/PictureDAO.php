<?php

require_once '../classes' . DIRECTORY_SEPARATOR . 'DatabasePDO.php';
require_once 'PostitsDAO.php';


class Picture
{
    public $pdo;

    public function __construct()
    {
        $this->pdo = DatabasePDO::getInstance();
    }

    public function getPostitsByBoardId($whiteboard_id){
        $sql = "SELECT * 
                FROM wb_postit
                WHERE whiteboard_id = :whiteboard_id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(':whiteboard_id', $whiteboard_id);
        if($stmt->execute()){
            $picture = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if(!empty($picture)){
                return $picture;
            }
        }
        return array();
    }

    public function deletePictureById($id){
        $sql = "DELETE
                FROM wb_picture
                WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(":id",$id);
        if($stmt->execute()){
            return $id;
        }
        return false;
    }

}