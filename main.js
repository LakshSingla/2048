//Obtain the gridPieces from the HTML Documenet

var rows = document.getElementsByClassName("row");

var cells = [
    [], [], [], []
]



for (var y = 0; y<rows.length; y++){
    var columns = rows[y].getElementsByClassName("column");
    for(var x = 0; x<columns.length; x++){
        cells[x][y] = columns[x];
    }
}

var CellObject = function(x, y, value){
    this.x = x;
    this.y = y;
    this.value = value;
}

var GameFunctions = {

    cellObjects: [
        [], [], [], []
    ],

    initializeCellObjects: function(){
        for(var y = 0; y<rows.length; y++){
            for(var x = 0; x<columns.length; x++){
                this.cellObjects[x][y] = new CellObject(x, y, null);
            }
        }
    },

    displayCellObjects: function(){
        for(var y = 0; y<rows.length; y++){
            for(var x = 0; x<columns.length; x++){
                if(this.cellObjects[x][y].value){
                    cells[x][y].textContent = String(this.cellObjects[x][y].value);
                }
                else{
                    cells[x][y].textContent = " ";
                }
            }
        }
    }
}

GameFunctions.initializeCellObjects();
GameFunctions.displayCellObjects();
