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
        echo 'objectkey to delete: ' . $data["objectkey"] . ' ';
        foreach ($arr["objectsList"] as $key => $value) {
            echo $key;
            if (intval($key) + 1 == intval($data["objectkey"])) {
                $filename = '../objects/' . $data["objectkey"] . '/main.png';
                if (file_exists($filename)) {
                    unlink($filename);
                }
                $filename = '../objects/' . $data["objectkey"] . '/preview.png';
                if (file_exists($filename)) {
                    unlink($filename);
                }
                $filename = '../objects/' . $data["objectkey"] . '/objectInfo.json';
                if (file_exists($filename)) {
                    unlink($filename);
                }
                if (is_dir('../objects/' . $data["objectkey"])) {
                    rmdir('../objects/' . $data["objectkey"]);
                }
                echo 'deleting... ';
                unset($arr["objectsList"][$key]);
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