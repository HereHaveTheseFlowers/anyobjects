<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');


    if ($_SERVER['REQUEST_METHOD'] === 'POST') {

      $actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]";
      
      //find objectsList.json
      $json = file_get_contents("$actual_link/objects/objectsList.json");
          
      //decode json into array
      $arr = json_decode($json, true);

      $objectkey = strval(count($arr[0])+1);

      //add new object key
      array_push($arr[0], $objectkey);4

      //make new folder
      mkdir("$actual_link/objects/$objectkey", 0777, true);

        /* $target_file = str_replace(" ","_",$_POST["stopname"]) .".png";
        echo $target_file;
        $uploadOk = 1;
        $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
        // Check if image file is a actual image or fake image
        if(isset($_POST["submit"])) {
        $check = getimagesize($_FILES["image"]["tmp_name"]);
        if($check !== false) {
            echo "File is an image - " . $check["mime"] . ".";
            $uploadOk = 1;
        } else {
            echo "File is not an image.";
            $uploadOk = 0;
        }
        }
        if (file_exists($target_file)) {
            echo "Sorry, file already exists.";
            $uploadOk = 0;
          }
          
          // Allow certain file formats
          if($imageFileType != "png") {
            echo "Sorry, only PNG files are allowed.";
            $uploadOk = 0;
          }
          
          // Check if $uploadOk is set to 0 by an error
          if ($uploadOk == 0) {
            echo "Sorry, your file was not uploaded.";
          // if everything is ok, try to upload file
          } else {
            if (move_uploaded_file($_FILES["image"]["tmp_name"], "../data/$target_file")) {
              echo "The file ". $target_file . " has been uploaded.";
              
              
                //find road info
                $json = file_get_contents("$actual_link/data/roadInfo.json");
                
                //decode json into array
                $arr = json_decode($json, true);
                
                $arr[$_POST["stopname"]] = [];
                
                //encode array into json
                $newjson = json_encode($arr, JSON_PRETTY_PRINT);

                
                //write json
                $file_pointer = fopen("../data/roadInfo.json", 'w');
                fwrite($file_pointer, $newjson);
                fclose($file_pointer);
                
             
              
            } else {
              echo "Sorry, there was an error uploading your file.";
            }
          } */
    }
?>