var cells = document.getElementsByClassName("cell");


var bottons = [[cells[0], cells[1], cells[2]],
                [cells[3], cells[4], cells[5]],
                [cells[6], cells[7], cells[8]]];

var flags = [[null, null, null],
             [null, null, null],
             [null, null, null]];

var ply = "X";
var Line = "";
var turn = document.getElementsByClassName("col");
var cnt_x = 0;
var cnt_o = 0;

var end = "f";

function play(x, y){
    var mode = document.getElementsByName("mode");
    if (flags[x][y] == null){
        if (ply == "X") {
            ply = "O";
            swap_turn(turn[0], turn[1]);
            flags[x][y] = "X";
            bottons[x][y].classList.add("X");
            bottons[x][y].innerHTML = "X";
        }
        else if (ply == "O") {
            ply = "X";
            swap_turn(turn[0], turn[1]);
            flags[x][y] = "O";
            bottons[x][y].classList.add("O");
            bottons[x][y].innerHTML = "O";
        }

        end = check();
        // show_end(end);

        if (mode[0].checked && end == "f")
        {
            setTimeout(function(){
                robot(ply);
            }, 500)
            
        }

        setTimeout(function(){
            if (mode[0].checked && end == "f")
                swap_turn(turn[0], turn[1]);

            end = check();
            show_end(end);
        }, 501)

        //return true;
    }
}

function robot(turn){
    var temp = true;
    for(var i = 0; i<3; i++){
        for(var j = 0; j<3; j++){
            if(flags[i][j] == null)
                temp = false;
        }
    }
    if(temp && end != "f")
        return;

    var r1 = -1;
    var r2 = -1;
    for(var i = 0; i<3; i++){
        if (flags[i][0] == flags[i][1] && flags[i][0] != null)
        {
            if(flags[i][2] == null)
            {
                r1 = i;
                r2 = 2;
                break;
            }
        }
        if (flags[i][0] == flags[i][2] && flags[i][0] != null)
        {
            if(flags[i][1] == null)
            {
                r1 = i;
                r2 = 1;
                break;
            }
        }
        if (flags[i][1] == flags[i][2] && flags[i][1] != null)
        {
            if(flags[i][0] == null)
            {
                r1 = i;
                r2 = 0;
                break;
            }
        }

        /////////////////////

        if (flags[0][i] == flags[1][i] && flags[0][i] != null)
        {
            if(flags[2][i] == null)
            {
                r1 = 2;
                r2 = i;
                break;
            }
        }
        if (flags[0][i] == flags[2][i] && flags[0][i] != null)
        {
            if(flags[1][i] == null)
            {
                r1 = 1;
                r2 = i;
                break;
            }
        }
        if (flags[1][i] == flags[2][i] && flags[1][i] != null)
        {
            if(flags[0][i] == null)
            {
                r1 = 0;
                r2 = i;
                break;
            }
        }
    }

    if (flags[0][0] == flags[1][1] && flags[0][0] != null)
        if(flags[2][2] == null)
        {
            r1 = 2;
            r2 = 2;
        }

    if (flags[0][0] == flags[2][2] && flags[0][0] != null)
        if(flags[1][1] == null)
        {
            r1 = 1;
            r2 = 1;
        }

    if (flags[1][1] == flags[2][2] && flags[1][1] != null)
        if(flags[0][0] == null)
        {
            r1 = 0;
            r2 = 0;
        }

    if (flags[0][2] == flags[1][1] && flags[0][2] != null)
        if(flags[2][0] == null)
        {
            r1 = 2;
            r2 = 0;
        }

    if (flags[0][2] == flags[2][0] && flags[0][2] != null)
        if(flags[1][1] == null)
        {
            r1 = 1;
            r2 = 1;
        }

    if (flags[1][1] == flags[2][0] && flags[1][1] != null)
        if(flags[0][2] == null)
        {
            r1 = 0;
            r2 = 2;
        }

    ///////////////////

    if (r1 == -1)
        while(true)
        {
            r1 = Math.floor(Math.random() * 3);
            r2 = Math.floor(Math.random() * 3);

            if(flags[r1][r2] == null)
                break;
        }


    flags[r1][r2] = turn;
    bottons[r1][r2].classList.add(turn);
    bottons[r1][r2].innerHTML = turn;
    if(ply == "O")
    {
        ply = "X";
    }
    else
    {
        ply = "O";
        
    }
    
}

function show_end(end){
    var show = document.getElementById("show");

    
    if (end != "f")
    {
        var tble = document.getElementById("table");
        var line = document.getElementById("line");
        var dia1 = document.getElementsByClassName("diameter1");
        var dia2 = document.getElementsByClassName("diameter2");

        for(var i=0; i <= 2; i++)
            for(var j=0; j <= 2; j++)
                bottons[i][j].disabled = true;

        setTimeout(function(){
            for(var i=0; i <= 2; i++)
                for(var j=0; j <= 2; j++)
                {
                    // bottons[i][j].innerHTML = "";
                    bottons[i][j].style.height = "0px";
                    bottons[i][j].style.borderWidth = "0px";
                    tble.style.opacity = "0";
                    // line.style.display = "none";
                    line.style.backgroundColor = "transparent";
                    if(Line != "diameter1" && Line != "diameter1" && Line != "")
                        line.classList.remove(Line);

                    dia1[0].style.height = "0px";
                    dia1[0].style.width = "0px";
                    dia1[0].style.left = "30px";
                    dia1[0].style.top = "40px";

                    dia2[0].style.height = "0px";
                    dia2[0].style.width = "0px";
                    dia2[0].style.right = "30px";
                    dia2[0].style.top = "40px";
                }

        dia1[0].style.display = "none";
        dia2[0].style.display = "none";

        var scores = document.getElementsByClassName("score");
        if (end == "X")
        {
            cnt_x++;
            scores[0].innerHTML = cnt_x;
        }
        else if(end == "O")
        {
            cnt_o++;
            scores[1].innerHTML = cnt_o;
        }

        }, 2000);
        
        
        setTimeout(function(){
            if(end == "d")
            {
                show.style.opacity = "1";
                show.style.fontSize = "xx-large";
                show.innerHTML = "Draw";
            }
            else 
            {
                show.style.opacity = "1";
                show.style.fontSize = "xx-large";
                show.innerHTML = "Winner is " + end;
            }
        }, 4000)

        
    }
}

function check(){
    var show = document.getElementById("show");
    var line = document.getElementById("line");

    var end = "f";

    end = check_row_col(end);  
    end = check_diameter(end); 
    end = check_draw(end);
    
    return end;
}

function check_row_col(end){
    var line = document.getElementById("line");

    for(var i = 0; i<3; i++){
        if (flags[i][0] == flags[i][1] && flags[i][1] == flags[i][2] && flags[i][2] != null)
        {
            end = flags[i][0];
            if(i==0)
            {
                line.classList.add("row1");
                Line = "row1";
            }
            if(i==1)
            {
                line.classList.add("row2");
                Line = "row2";
            }
            if(i==2)
            {
                line.classList.add("row3");
                Line = "row3";
            }
            line.style.width = "200px";
            line.style.height = "3px";
            if(bottons[i][0].innerHTML == "X")
                line.style.backgroundColor = "palevioletred";

            if(bottons[i][0].innerHTML == "O")
                line.style.backgroundColor = "skyblue";
        }       

        if (flags[0][i] == flags[1][i] && flags[1][i] == flags[2][i] && flags[2][i] != null)
        {
            end = flags[0][i];
            if(i==0)
            {
                line.classList.add("col1");
                Line = "col1";
            }
            if(i==1)
            {
                line.classList.add("col2");
                Line = "col2";
            }
            if(i==2)
            {
                line.classList.add("col3");
                Line = "col3";
            }
            line.style.width = "3px";
            line.style.height = "200px";
            if(bottons[0][i].innerHTML == "X")
                line.style.backgroundColor = "palevioletred";

            if(bottons[0][i].innerHTML == "O")
                line.style.backgroundColor = "skyblue";
        }
    }
    return end;
}

function check_diameter(end){
    var line = document.getElementById("line");
    var temp = " ";

    if (flags[0][0] == flags[1][1] && flags[1][1] == flags[2][2] && flags[2][2] != null)
    {
        end = flags[1][1];
        temp = "diameter1"
    }     
    else if (flags[0][2] == flags[1][1] && flags[1][1] == flags[2][0] && flags[2][0] != null)
    {
        end = flags[1][1];
        temp = "diameter2"
    }    
    if (temp != " ")
    {
        var dia1 = document.getElementsByClassName("diameter1");
        var dia2 = document.getElementsByClassName("diameter2");
        
        if(temp == "diameter1")
        {
            Line = "diameter1";
            dia1[0].style.width = "240px";
            dia1[0].style.height = "3px";
            dia1[0].style.left = "0";
            dia1[0].style.top = "117px";
        }
        else
        {
            Line = "diameter2";
            dia2[0].style.width = "240px";
            dia2[0].style.height = "3px";
            dia2[0].style.right = "0px";
            dia2[0].style.top = "117px";
        }

        if(bottons[1][1].innerHTML == "X")
        {
            dia1[0].style.backgroundColor = "palevioletred";
            dia2[0].style.backgroundColor = "palevioletred";
        }

        if(bottons[1][1].innerHTML == "O")
        {
            dia1[0].style.backgroundColor = "skyblue";
            dia2[0].style.backgroundColor = "skyblue";

        }

    }
    return end;
}

function check_draw(end){
    var draw = true;
    for(var i = 0; i<3; i++){
        for(var j = 0; j<3; j++){
            if(flags[i][j] == null)
                draw = false;
        }
    }
    if(draw && end == "f")
        end = "d";
    
    return end;
}

function reset_game(){
    for(var i=0; i <= 2; i++)
        for(var j=0; j <= 2; j++)
            bottons[i][j].disabled = false;

    if(ply != "X")
        swap_turn(turn[0], turn[1]);

    ply = "X";    
    var show = document.getElementById("show");
    show.style.opacity = "0";
    
    for(var i=0; i <= 2; i++)
        for(var j=0; j <= 2; j++)
        {
            bottons[i][j].innerHTML = "";
            flags[i][j] = null;
            bottons[i][j].classList.remove("X");
            bottons[i][j].classList.remove("O");
        }

    var tble = document.getElementById("table");
    var line = document.getElementById("line");
    var dia1 = document.getElementsByClassName("diameter1");
    var dia2 = document.getElementsByClassName("diameter2");

    setTimeout(function(){
        for(var i=0; i <= 2; i++)
        for(var j=0; j <= 2; j++)
        {
            // bottons[i][j].innerHTML = "";
            bottons[i][j].style.height = "80px";
            bottons[i][j].style.borderWidth = "0.1px";
            tble.style.opacity = "1";
            // line.style.display = "block";
            if(Line != "diameter1" && Line != "diameter2" && Line != "")
                line.classList.remove(Line);

            dia1[0].style.display = "block";     
            dia1[0].style.width = "0px";
            dia1[0].style.height = "0px";   
            
            dia2[0].style.display = "block";
            dia2[0].style.width = "0px";
            dia2[0].style.height = "0px"; 

            line.style.backgroundColor = "transparent";
            line.style.width = "0px";
            line.style.height = "0px";
        }
    }, 1000);
    setTimeout(function(){
        show.style.opacity = "0";
    },2000)
}

function swap_turn(x,o){
    if(x.style.borderColor != "transparent")
    {
        x.style.borderColor = "transparent";
        o.style.borderColor = "skyblue";
    }
    else if (o.style.borderColor != "transparent")
    {
        x.style.borderColor = "palevioletred";
        o.style.borderColor = "transparent";
    }
}

m = 1;
function change_mode(){
    var mode = document.getElementsByName("mode");
    if(m == 1 && mode[1].checked)
    {
        m = 2;
        reset_game();
    }
    if(m == 2 && mode[0].checked)
    {
        m = 1;
        reset_game();
    }
}