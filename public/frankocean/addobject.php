<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');


    if ($_SERVER['REQUEST_METHOD'] === 'POST') {

        $actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]";
        
        //find objectsList.json
        $json = file_get_contents("$actual_link/objects/objectsList.json");
        
        //decode json into array
        $arr = json_decode($json, true);
        
        $objectkey = strval(count($arr["objectsList"])+1);

        //add new object key
        array_push($arr["objectsList"], $objectkey);
      

        //make new folder
        mkdir("../objects/$objectkey", 0777, true);
        //encode array into json
        $newjson = json_encode($arr, JSON_PRETTY_PRINT);
            
        //write json
        $file_pointer = fopen("../objects/objectsList.json", 'w');
        fwrite($file_pointer, $newjson);
        fclose($file_pointer);
    
        //make objectInfo.json
        $fp = fopen("../objects/$objectkey/objectInfo.json", 'w');
        
        $newobj = new stdClass();
        
        $newobj->name = $_POST["objectname"];
        $newobj->brand = $_POST["objectbrand"];
        $newobj->price = $_POST["objectprice"];
        $newobj->category = $_POST["objectcategory"];
        $newobj->description = $_POST["objectdescription"];
        $newobj->additionalInfo = $_POST["objectadditionalinfo"];
        $newobj->url = $_POST["objecturl"];
        $newobj->urlText = $_POST["objecturltext"];
        $newobj->altText = $_POST["objectalttext"];
    
        //encode array into json
        $objectinfojson = json_encode($newobj, JSON_PRETTY_PRINT);
        
        fwrite($fp, $objectinfojson);
        fclose($fp);
            
        if ($_FILES["objectmainimage"]["name"]) {
            $uploadOk = 1;
            $imageFileType = strtolower(pathinfo($_FILES["objectmainimage"]["name"],PATHINFO_EXTENSION));
            $check = getimagesize($_FILES["objectmainimage"]["tmp_name"]);
        
            if($check !== false) {
                echo "File is an image - " . $check["mime"] . ".";
                $uploadOk = 1;
            } else {
                echo "File is not an image.";
                $uploadOk = 0;
            }
            if($imageFileType != "png") {
                echo "Sorry, only PNG files are allowed.";
                $uploadOk = 0;
            }// Check if $uploadOk is set to 0 by an error
            if ($uploadOk == 0) {
                echo "Sorry, your file was not uploaded.";
              // if everything is ok, try to upload file
            } else {
                if (move_uploaded_file($_FILES["objectmainimage"]["tmp_name"], "../objects/$objectkey/main.png")) {
                    echo "The file ". $target_file . " has been uploaded.";
                } else {
                    echo "Sorry, there was an error uploading your file.";
                }
            }
        }
        if ($_FILES["objectpreviewimage"]["name"]) {
            $uploadOk = 1;
            $imageFileType = strtolower(pathinfo($_FILES["objectpreviewimage"]["name"],PATHINFO_EXTENSION));
            $check = getimagesize($_FILES["objectpreviewimage"]["tmp_name"]);
        
            if($check !== false) {
                echo "File is an image - " . $check["mime"] . ".";
                $uploadOk = 1;
            } else {
                echo "File is not an image.";
                $uploadOk = 0;
            }
            if($imageFileType != "png") {
                echo "Sorry, only PNG files are allowed.";
                $uploadOk = 0;
            }// Check if $uploadOk is set to 0 by an error
            if ($uploadOk == 0) {
                echo "Sorry, your file was not uploaded.";
              // if everything is ok, try to upload file
            } else {
                if (move_uploaded_file($_FILES["objectpreviewimage"]["tmp_name"], "../objects/$objectkey/preview.png")) {
                    echo "The file ". $target_file . " has been uploaded.";
                } else {
                    echo "Sorry, there was an error uploading your file.";
                }
            }
        }
    }
?>