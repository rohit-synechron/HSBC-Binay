<?php
//putenv('PATH='. getenv('PATH') .':/home/WEBFACTIONUSERNAME/webapps/testapp/');
exec('git pull 2>&1', $output);
var_dump($output);
