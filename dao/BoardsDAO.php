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
        //$this->boardsDAO = new BoardsDAO();
    }

    public function selectAll(){
        $sql = "SELECT * 
                FROM wb_whiteboard";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

}