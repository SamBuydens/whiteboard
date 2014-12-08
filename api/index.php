<?php

define("WWW_ROOT",dirname(dirname(__FILE__)).DIRECTORY_SEPARATOR);

require_once WWW_ROOT. "dao" .DIRECTORY_SEPARATOR. 'BoardsDAO.php';
require_once WWW_ROOT. "dao" .DIRECTORY_SEPARATOR. 'PostitsDAO.php';
require_once WWW_ROOT. "api" .DIRECTORY_SEPARATOR. 'Slim'. DIRECTORY_SEPARATOR .'Slim.php';

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();

$boardsDAO = new BoardsDAO();
$postitsDAO = new PostitsDAO();

$app -> config('debug', true);

//POSTITS
$app -> get("/postits/:id/?", function($whiteboard_id) use ($postitsDAO){
	header("Content-Type:application/json");
	echo json_encode($postitsDAO->getPostitsByBoardId($whiteboard_id));
	exit();
});

$app->run();