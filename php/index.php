<?php
    if(isset($_POST["function"])) {
        if ($_POST["function"] == "check") {check();} 
    }

    function check() {
        $answer = "";
        $startTime = time();

        if (isset($_POST["x"]) && isset($_POST["y"]) && isset($_POST["r"])) {
            $x = $_POST["x"];
            $y = $_POST["y"];
            $r = $_POST["r"];
            if (is_numeric($x) && is_numeric($y) && is_numeric($r) && validate($x, $y, $r)) {
                if (checkHit($x, $y, $r)) {
                    $answer = "попадание";
                } else {
                    $answer = "промах";
                }
            } else {
                $answer = "недопустимые параметры запроса";
            }
        } else {
            $answer = "неверный запрос";
        }
        
        $time = time() - $startTime;

        $json = "{\"answer\":\"$answer\",\"time\":\"$time\"}";
        
        echo $json;
    }

    function checkHit($x, $y, $r) {
        return checkRectangle($x, $y, $r) || checkTriangle($x, $y, $r) || checkCircle($x, $y, $r);
    }

    function checkRectangle($x, $y, $r) {
        return ($y >= -$r && $y <= 0 && $x <= 0 && $x * 2 >= -$r);
    }

    function checkTriangle($x, $y, $r) {
        return ($x <= 0 && $y >= 0 && $y * 2 < $x + $r);
    }

    function checkCircle($x, $y, $r) {
        return ($x >= 0 && $y >= 0 && $x ** 2 + $y ** 2 <= $r ** 2 / 4);
    }

    function validate($x, $y, $r) {
        return ($x==-5 || $x==-4 || $x==-3 || $x==-2 || $x==-1 || $x==0 || $x==1 || $x==2 || $x==3) 
        && ($r==1 || $r==3 || $r==2 || $r==4 || $r==5) 
        && $y >= -3 && $y <= 3;
    }


?>