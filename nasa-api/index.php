<?php

declare(strict_types=1);
use GuzzleHttp\Client;
use FastRoute\RouteCollector;
use ReallySimpleJWT\Token;

require_once('./vendor/autoload.php');



function getCapsules($vars)
{
  $client = new GuzzleHttp\Client();
  $res = $client->request('GET', 'https://api.spacexdata.com/v3/capsules');
  $capsules = $res->getBody();
  http_response_code(200);
  header('Content-Type: application/json');
  echo $capsules;
  return $vars;
}

function getCapsule($vars)
{
  $client = new GuzzleHttp\Client();
  $res = $client->request('GET', 'https://api.spacexdata.com/v3/capsules/'.$vars['id']);
  $capsule = $res->getBody();
  http_response_code(200);
  header('Content-Type: application/json');
  echo $capsule;
  return $vars;
}

function authenticate() {
  $data = file_get_contents('php://input');
  $parsed = json_decode($data, true);
  if($parsed['username'] != 'anon' || $parsed['password'] != '12345') {
    http_response_code(400);
  } else {
    $username = 'anon';
    $secret = 'sec!ReT423*&';
    
    $expiration = time() + 3600;
    $issuer = 'localhost';

    $token = Token::create($username, $secret, $expiration, $issuer);
    http_response_code(200);
    $obj = (object) [
      'token' => $token,
    ];
    echo json_encode($obj);
  }
}

function authorize() {
  $uri = $_SERVER['REQUEST_URI'];
  $secret = 'sec!ReT423*&';
  $authenticated = false;
  $headers = apache_request_headers();
  if(array_key_exists("token", $headers)){
    $authenticated = Token::validate($headers['token'], $secret);
  }
  if($authenticated == false && $uri != '/nasa-api/login') {
    http_response_code(401);
    echo 'Unauthorized request';
    return $authenticated;
  }
  return true;
}

function cors() {
    
  // Allow from any origin
  if (isset($_SERVER['HTTP_ORIGIN'])) {
      // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
      // you want to allow, and if so:
      header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
      header('Access-Control-Allow-Credentials: true');
      header('Access-Control-Max-Age: 86400');    // cache for 1 day
  }
  
  // Access-Control headers are received during OPTIONS requests
  if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
      
      if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
          // may also be using PUT, PATCH, HEAD etc
          header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
      
      if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
          header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
  
      exit(0);
  }
}

cors();

$routes = FastRoute\simpleDispatcher(function(FastRoute\RouteCollector $r) {
  $r->addRoute('POST', '/nasa-api/login', 'authenticate');
  $r->addRoute('GET', '/nasa-api/capsules', 'getCapsules');
  $r->addRoute('GET', '/nasa-api/capsules/{id}', 'getCapsule');
});

$httpMethod = $_SERVER['REQUEST_METHOD'];
$uri = $_SERVER['REQUEST_URI'];

if (false !== $pos = strpos($uri, '?')) {
    $uri = substr($uri, 0, $pos);
}
$uri = rawurldecode($uri);


$routeInfo = $routes->dispatch($httpMethod, $uri);

switch ($routeInfo[0]) {
  case FastRoute\Dispatcher::NOT_FOUND:
    http_response_code(404);
    break;
  case FastRoute\Dispatcher::METHOD_NOT_ALLOWED:
    $allowedMethods = $routeInfo[1];
    http_response_code(405);
    break;
  case FastRoute\Dispatcher::FOUND:
    if(authorize()) {
      $handler = $routeInfo[1];
      $vars = $routeInfo[2];
      $handler($vars);
    }
    break;
}
