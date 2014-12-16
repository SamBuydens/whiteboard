<?php

define("WWW_ROOT",dirname(dirname(__FILE__)).DIRECTORY_SEPARATOR);

require_once WWW_ROOT. "dao" .DIRECTORY_SEPARATOR. 'BoardsDAO.php';
require_once WWW_ROOT. "dao" .DIRECTORY_SEPARATOR. 'PostitsDAO.php';
require_once WWW_ROOT. "dao" .DIRECTORY_SEPARATOR. 'PictureDAO.php';
require_once WWW_ROOT. "dao" .DIRECTORY_SEPARATOR. 'MotionDAO.php';
require_once WWW_ROOT. "dao" .DIRECTORY_SEPARATOR. 'UsersDAO.php';
require_once WWW_ROOT. "api" .DIRECTORY_SEPARATOR. 'Slim'. DIRECTORY_SEPARATOR .'Slim.php';

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();

$boardsDAO = new BoardsDAO();
$postitsDAO = new PostitsDAO();
$motionDAO = new motionDAO();
$pictureDAO = new PictureDAO();
$usersDAO = new UsersDAO();

$app -> config('debug', true);

//POSTITS
$app -> get("/postits/:id/?", function($whiteboard_id) use ($postitsDAO){
	header("Content-Type:application/json");
	echo json_encode($postitsDAO->getPostitsByBoardId($whiteboard_id));
	exit();
});

$app->post("/postits/delete/?", function() use ($app,$postitsDAO){
	header("Content-Type:application/json");
	$result = array(
		'id_on_board' => $_POST['id_on_board'],
		'whiteboard_id' => $_POST['whiteboard_id']
	);
	echo json_encode($postitsDAO->deletePostitById($result['whiteboard_id'],$result['id_on_board']));
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
$app -> get("/statics/:id/?", function($whiteboard_id) use ($pictureDAO){
	header("Content-Type:application/json");
	echo json_encode($pictureDAO->getPicturesByBoardId($whiteboard_id));
	exit();
});

$app->post("/statics/delete/?", function() use ($app,$pictureDAO){
	header("Content-Type:application/json");
	$result = array(
		'id_on_board' => $_POST['id_on_board'],
		'whiteboard_id' => $_POST['whiteboard_id']
	);
	echo json_encode($pictureDAO->deletePictureById($result['whiteboard_id'],$result['id_on_board']));
	exit();
});

$app->post("/statics/add/?", function() use ($app, $pictureDAO){
	$result = array(
		'id_on_board' => $_POST['id_on_board'],
		'xpos' => $_POST['xpos'],
		'ypos' => $_POST['ypos'],
		'whiteboardId' => $_POST['whiteboardId']
	);
	header('Content-Type: application/json');
	echo json_encode($pictureDAO->addNewPicture($result['whiteboardId'],$result['id_on_board'], $result['xpos'], $result['ypos']));
	exit();
});

$app->post("/statics/change/position/?", function() use ($app, $pictureDAO){
	$result = array(
		'id_on_board' => $_POST['id_on_board'],
		'xpos' => $_POST['xpos'],
		'ypos' => $_POST['ypos'],
		'whiteboard_id' => $_POST['whiteboard_id']
	);
	header('Content-Type: application/json');
	echo json_encode($pictureDAO->updatePosition($result['whiteboard_id'],$result['id_on_board'], $result['xpos'], $result['ypos']));
	exit();
});

$app->post("/statics/change/content/?", function() use ($app, $pictureDAO){
	$result = array(
		'id_on_board' => $_POST['id_on_board'],
		'content' => $_POST['content'],
		'whiteboard_id' => $_POST['whiteboard_id']
	);
    $data = $_POST['content'];
    $uri =  substr($data,strpos($data,",")+1);
    file_put_contents(WWW_ROOT.'/statics/'.$_POST['id_on_board'].'_'.$_POST['whiteboard_id'].'.png', base64_decode($uri));
    move_uploaded_file(base64_decode($uri), WWW_ROOT.'/statics/'.$_POST['id_on_board'].'_'.$_POST['whiteboard_id'].'.png');
	header('Content-Type: application/json');
	echo json_encode($pictureDAO->updateContent($result['whiteboard_id'],$result['id_on_board'], $_POST['id_on_board'].'_'.$_POST['whiteboard_id']));
	
	exit();
});

//MOTION
$app -> get("/motion/:id/?", function($whiteboard_id) use ($motionDAO){
	header("Content-Type:application/json");
	echo json_encode($motionDAO->getMotionById($whiteboard_id));
	exit();
});

$app->post("/motion/delete/?", function() use ($app,$motionDAO){
	header("Content-Type:application/json");
	$result = array(
		'id_on_board' => $_POST['id_on_board'],
		'whiteboard_id' => $_POST['whiteboard_id']
	);
	echo json_encode($motionDAO->deleteMotionById($result['whiteboard_id'],$result['id_on_board']));
	exit();
});

$app->post("/motion/add/?", function() use ($app, $motionDAO){
	$result = array(
		'id_on_board' => $_POST['id_on_board'],
		'xpos' => $_POST['xpos'],
		'ypos' => $_POST['ypos'],
		'whiteboardId' => $_POST['whiteboardId']
	);
	header('Content-Type: application/json');
	echo json_encode($motionDAO->addNewMotion($result['whiteboardId'],$result['id_on_board'], $result['xpos'], $result['ypos']));
	exit();
});

$app->post("/motion/change/position/?", function() use ($app, $motionDAO){
	$result = array(
		'id_on_board' => $_POST['id_on_board'],
		'xpos' => $_POST['xpos'],
		'ypos' => $_POST['ypos'],
		'whiteboard_id' => $_POST['whiteboard_id']
	);
	header('Content-Type: application/json');
	echo json_encode($motionDAO->updatePosition($result['whiteboard_id'],$result['id_on_board'], $result['xpos'], $result['ypos']));
	exit();
});

$app->post("/motion/change/content/?", function() use ($app, $motionDAO){
	$result = array(
		'id_on_board' => $_POST['id_on_board'],
		'content' => $_POST['content'],
		'whiteboard_id' => $_POST['whiteboard_id']
	);
    $data = $_POST['content'];
    $uri =  substr($data,strpos($data,",")+1);
    file_put_contents(WWW_ROOT.'/motion/'.$_POST['id_on_board'].'_'.$_POST['whiteboard_id'].'.mp4', base64_decode($uri));
    move_uploaded_file(base64_decode($uri), WWW_ROOT.'/motion/'.$_POST['id_on_board'].'_'.$_POST['whiteboard_id'].'.mp4');
	header('Content-Type: application/json');
	echo json_encode($motionDAO->updateContent($result['whiteboard_id'],$result['id_on_board'], $_POST['id_on_board'].'_'.$_POST['whiteboard_id']));
	
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

$app->get("/boards/:userid/?", function($id) use ($boardsDAO){
	header("Content-Type:application/json");
	echo json_encode($boardsDAO->getMyBoards($id));
	exit();
});

$app->get("/search/:param/?", function($param) use ($boardsDAO){
	header("Content-Type:application/json");
	echo json_encode($boardsDAO->searchBoard($param));
	exit();
});

$app->get("/mySearch/:param/:creator/?", function($param, $creator) use ($boardsDAO){
	header("Content-Type:application/json");
	echo json_encode($boardsDAO->searchMyBoard($param, $creator));
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

//SETTINGS
$app->post("/settings/:boardId/:title/?", function($boardId, $title) use ($boardsDAO){
	header("Content-Type:application/json");
	echo json_encode($boardsDAO->addTitle($boardId, $title));
	exit();
});

$app->get("/getParticipants/:boardId/?", function($boardId) use ($boardsDAO){
	header("Content-Type:application/json");
	echo json_encode($boardsDAO->getParticipants($boardId));
	exit();
});

$app->get("/getParticipantById/:id/?", function($id) use ($boardsDAO){
	header("Content-Type:application/json");
	echo json_encode($boardsDAO->getParticipantById($id));
	exit();
});

$app->get("/deletePartById/:boardId/:id/?", function($boardId, $id) use ($boardsDAO){
	header("Content-Type:application/json");
	echo json_encode($boardsDAO->deletePartById($boardId, $id));
	exit();
});


$app->post("/participant/:participant/?", function($participant) use ($boardsDAO){
	header("Content-Type:application/json");
	echo json_encode($boardsDAO->searchParticipant($participant));
	exit();
});

$app->post("/addParticipant/:boardId/:participant/?", function($boardId, $participant) use ($boardsDAO){
	header("Content-Type:application/json");
	echo json_encode($boardsDAO->addParticipant($boardId, $participant));
	exit();
});

$app->post("/tag/:boardId/:tag/?", function($boardId, $tag) use ($boardsDAO){
	header("Content-Type:application/json");
	echo json_encode($boardsDAO->addTag($boardId, $tag));
	exit();
});


$app->run();