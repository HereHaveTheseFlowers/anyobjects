<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');


    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);

        $actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]";
        
        
        //find objectsList.json
        $json = file_get_contents("../objects/objectsList.json");
        
        //decode json into array
        $arr = json_decode($json, true);
        //add image src to array
        foreach ($arr["objectsList"] as $key => $value) {
            if ($key == $data["objectkey"]) {
                array_splice($arr["objectsList"], $key, 1);
            }
        }

        //encode array into json
        $newjson = json_encode($arr, JSON_PRETTY_PRINT);
            
        //write json
        $file_pointer = fopen("../objects/objectsList.json", 'w');
        fwrite($file_pointer, $newjson);
        fclose($file_pointer);
        
    }
?>