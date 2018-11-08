let columns = 50;
let rows = 30;
let endlessCycle;       // zmienna nieskończonych cykli autoplay

const cellsArea = new Array(columns);
for(i=0; i<cellsArea.length; i++) {
    cellsArea[i] = new Array(rows);
    for(j=0; j<cellsArea[i].length; j++) {
        cellsArea[i][j] = {
            alive: false,
            neighbors: 0,
        }
    }
}

// Zliczanie sąsiadów komórki
countNeighbors = (x,y) => {
    cellsArea[x][y].neighbors=0;
    for(k=x-1; k<=x+1; k++) {     
        for(l=y-1; l<=y+1; l++) {  
            if(k==x && l==y) {                  // skrócić, czy nie skrócić - oto jest pytanie...
                continue;
            }
            else if(k<0 || k==cellsArea.length) {
                continue;
            }
            else if(l<0 || l==cellsArea[k].length) {
                continue;
            }
            if(cellsArea[k][l].alive) {             
               cellsArea[x][y].neighbors++;          
            } 
        }
    }
    return cellsArea[x][y].neighbors;
}

// Utrzymywanie komórki przy życiu
function makeAlive() {
    for(i=0; i<cellsArea.length; i++) {
        for(j=0; j<cellsArea[i].length; j++) {
            let a = i+(j*columns);
            if(cellsArea[i][j].neighbors==3) {                  // tu też można połączyć dwa warunki w jeden...
            cellsArea[i][j].alive = true;           
            document.images[a].src = "alive.jpg";
            }
            else if(cellsArea[i][j].neighbors==2 && cellsArea[i][j].alive) {
                cellsArea[i][j].alive = true;
                document.images[a].src = "alive.jpg";
            }
            else {
                cellsArea[i][j].alive = false;
                document.images[a].src = "dead.jpg";
            }
        }
    }
}

// Jeden cykl komórek na planszy
function lifeCycle() {
    for(i=0; i<cellsArea.length; i++) {
            for(j=0; j<cellsArea[i].length; j++) {
                    countNeighbors(i,j);
            }
    }
    makeAlive();    
 }

// Uruchomienie cyklu życia komórek
play = (endlessLoop) => { 
    if(endlessLoop == "once") {
        lifeCycle();
    }
    else if(endlessLoop == "infinite") {
        endlessCycle = 
        setInterval(lifeCycle, 500);
    }
    else if(endlessLoop == "stop") {
        clearInterval(endlessCycle);
    }
}

// Czyszczenie planszy
clearAll = () => {
    for(i=0; i<cellsArea.length; i++) {
        for(j=0; j<cellsArea[i].length; j++) {
            cellsArea[i][j].alive = false;
            cellsArea[i][j].neighbors = 0;
        }
    }
    for(i=0; i<rows*columns; i++) {
        document.images[i].src = "dead.jpg"
    }
}

// Zmiana statusu komórki
changeStatus = (x,y) => {
    cellsArea[x][y].alive = !cellsArea[x][y].alive;
    let a = x+(y*columns);
    cellsArea[x][y].alive ? document.images[a].src = "alive.jpg" : document.images[a].src = "dead.jpg"; 
}