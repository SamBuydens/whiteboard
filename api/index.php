<?php

define("WWW_ROOT",dirname(dirname(__FILE__)).DIRECTORY_SEPARATOR);

require_once WWW_ROOT. "dao" .DIRECTORY_SEPARATOR. 'BoardsDAO.php';
require_once WWW_ROOT. "dao" .DIRECTORY_SEPARATOR. 'PostitsDAO.php';
require_once WWW_ROOT. "dao" .DIRECTORY_SEPARATOR. 'UsersDAO.php';
require_once WWW_ROOT. "api" .DIRECTORY_SEPARATOR. 'Slim'. DIRECTORY_SEPARATOR .'Slim.php';

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();

$boardsDAO = new BoardsDAO();
$postitsDAO = new PostitsDAO();
$usersDAO = new UsersDAO();


$app -> config('debug', true);

//POSTITS
$app -> get("/postits/:id/?", function($whiteboard_id) use ($postitsDAO){
	header("Content-Type:application/json");
	echo json_encode($postitsDAO->getPostitsByBoardId($whiteboard_id));
	exit();
});

$app->get("/postits/delete/:id/?", function($id) use ($postitsDAO){
	header("Content-Type:application/json");
	echo json_encode($postitsDAO->deletePostitById($id));
	exit();
});

$app->post("/postits/add/:whiteboard_id/:id_on_board/:xpos/:ypos/?",function($whiteboard_id,$id_on_board,$xpos,$ypos) use ($app,$postitsDAO){
	header("Content-Type:application/json");
	echo json_encode($postitsDAO->addPostit($whiteboard_id,$id_on_board,$xpos,$ypos));
	exit();
});

//OVERVIEW
$app->get("/boards/?", function() use ($boardsDAO){
	header("Content-Type:application/json");
	echo json_encode($boardsDAO->selectAll());
	exit();
});

//USERS
$app->post("/users/login/:email/:password/?", function($email, $password) use ($usersDAO){
	header("Content-Type:application/json");
	echo json_encode($usersDAO->login($email, $password));
	exit();
});

$app->post("/users/register/:username/:email/:password/?", function($username, $email, $password) use ($usersDAO){
	header("Content-Type:application/json");
	echo json_encode($usersDAO->register($username, $email, $password));
	exit();
});



$app->run();