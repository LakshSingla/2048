//Obtain the gridPieces from the HTML Documenet

//rows --> Stores the individual row element
//columns--> Store the individual column from each row element

//cells[][] --> Array which stores the individual HTML block element in (x,y) format
//CellObject() --> Constructor function that initialises the object corresponding to each HTML block
//cellObjects() --> Array of CellObject corresponding to each individual HTML block

var rows = document.getElementsByClassName("row");

var cells = [
    [], [], [], []
];

cellObjects = [
    [], [], [], []
];


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

    initializeCellObjects: function(){
        for(var y = 0; y<rows.length; y++){
            for(var x = 0; x<columns.length; x++){
                cellObjects[x][y] = new CellObject(x, y, null);
            }
        }
    },

    displayCellObjects: function(){
        for(var y = 0; y<rows.length; y++){
            for(var x = 0; x<columns.length; x++){
                if(cellObjects[x][y].value){
                    cells[x][y].textContent = String(cellObjects[x][y].value);
                }
                else{
                    cells[x][y].textContent = " ";
                }
            }
        }
    },

    individualPull:{
        right: function(cell){
            var i;
            for(i = cell.x + 1; i<rows.length; i++){
                if(!cellObjects[i][cell.y].value){
                    continue;
                }
                else{
                    break;
                }
            }
            cellObjects[i-1][cell.y].value = cell.value;
            cellObjects[cell.x][cell.y].value = null;
        },

        left: function(cell){
            var i;
            for(i = cell.x - 1; i >= 0; i--){
                if(!cellObjects[i][cell.y].value){
                    continue;
                }
                else{
                    break;
                }
            }
            cellObjects[i+1][cell.y].value = cell.value;
            cellObjects[cell.x][cell.y].value = null;
        },

        bottom: function(cell){
            var i;
            for(i = cell.y + 1; i<rows.length; i++){
                if(!cellObjects[cell.x][i].value){
                    continue;
                }
                else{
                    break;
                }
            }
            cellObjects[cell.x][i-1].value = cell.value;
            cellObjects[cell.x][cell.y].value = null;
        },

        top: function(cell){
            var i;
            for(i = cell.y - 1; i>=0; i--){
                if(!cellObjects[cell.x][i].value){
                    continue;
                }
                else{
                    break;
                }
            }
            cellObjects[cell.x][i+1].value = cell.value;
            cellObjects[cell.x][cell.y].value = null;
        }
    }
};


GameFunctions.initializeCellObjects();
GameFunctions.displayCellObjects();

cellObjects[3][2].value = 3;
cellObjects[1][2].value = 4;
GameFunctions.displayCellObjects();
