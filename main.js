//Obtain the gridPieces from the HTML Documenet

//rows --> Stores the individual row element
//columns--> Store the individual column from each row element

//cells[][] --> Array which stores the individual HTML block element in (x,y) format
//CellObject() --> Constructor function that initialises the object corresponding to each HTML block
//cellObjects() --> Array of CellObject corresponding to each individual HTML block

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
    },

    individualPull:{
        right: function(cell){
        }
    }
}

GameFunctions.initializeCellObjects();
GameFunctions.displayCellObjects();
