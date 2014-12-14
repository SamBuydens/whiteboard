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

$app->post("/postits/add/?", function() use ($app, $postitsDAO){
	$result = array(
		'id_on_board' => $_POST['id_on_board'],
		'xpos' => $_POST['xpos'],
		'ypos' => $_POST['ypos'],
		'whiteboardId' => $_POST['whiteboardId']
	);
	header('Content-Type: application/json');
	echo json_encode($postitsDAO->addNewPostit($result['whiteboardId'],$result['id_on_board'], $result['xpos'], $result['ypos']));
	exit();
});

$app->post("/postits/change/position/?", function() use ($app, $postitsDAO){
	$result = array(
		'id_on_board' => $_POST['id_on_board'],
		'xpos' => $_POST['xpos'],
		'ypos' => $_POST['ypos'],
		'whiteboard_id' => $_POST['whiteboard_id']
	);
	header('Content-Type: application/json');
	echo json_encode($postitsDAO->updatePosition($result['whiteboard_id'],$result['id_on_board'], $result['xpos'], $result['ypos']));
	exit();
});

$app->post("/postits/change/content/?", function() use ($app, $postitsDAO){
	$result = array(
		'id_on_board' => $_POST['id_on_board'],
		'content' => $_POST['content'],
		'whiteboard_id' => $_POST['whiteboard_id']
	);
	header('Content-Type: application/json');
	echo json_encode($postitsDAO->updateContent($result['whiteboard_id'],$result['id_on_board'], $result['content']));
	exit();
});

//STATICS

$app->post("/statics/add/?", function() use ($app, $postitsDAO){
	$result = array(
		'id_on_board' => $_POST['id_on_board'],
		'xpos' => $_POST['xpos'],
		'ypos' => $_POST['ypos'],
		'whiteboardId' => $_POST['whiteboardId']
	);
	header('Content-Type: application/json');
	echo json_encode($postitsDAO->addNewPostit($result['whiteboardId'],$result['id_on_board'], $result['xpos'], $result['ypos']));
	exit();
});

//BOARDS
$app->get("/boards/?", function() use ($boardsDAO){
	header("Content-Type:application/json");
	echo json_encode($boardsDAO->selectAll());
	exit();
});

$app->get("/boards/delete/:id/?", function($id) use ($boardsDAO){
	header("Content-Type:application/json");
	echo json_encode($boardsDAO->deleteBoardById($id));
	exit();
});

$app->post("/boards/add/:title/:creatorId/?", function($title, $creatorId) use ($boardsDAO){
	header("Content-Type:application/json");
	echo json_encode($boardsDAO->addNewBoard($title, $creatorId));
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