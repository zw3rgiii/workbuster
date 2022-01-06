<html>

<body>

    <?php
    foreach ($_FILES["files"]["error"] as $key => $error) {
        if ($error == UPLOAD_ERR_OK) {
            $tmp_name = $_FILES["pictures"]["tmp_name"][$key];
            // basename() kann Directory Traversal Angriffe verhindern; weitere
            // Gültigkeitsprüfung/Bereinigung des Dateinamens kann angebracht sein
            $name = basename($_FILES["pictures"]["name"][$key]);
            move_uploaded_file($tmp_name, "uploads/$name");
        }
    }
    ?>

</body>

</html>