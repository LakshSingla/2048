//Obtain the gridPieces from the HTML Documenet

//rows --> Stores the individual row element
//columns--> Store the individual column from each row element

//cells[][] --> Array which stores the individual HTML block element in (x,y) format
//CellObject() --> Constructor function that initialises the object corresponding to each HTML block
//cellObjects() --> Array of CellObject corresponding to each individual HTML block

var rowLength = 4,
    columnLength = 4;

var rows = document.getElementsByClassName("row");

// var columnLength = 4;

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
            var tempVal = cell.value
            for(i = cell.x + 1; i<rowLength; i++){
                if(!cellObjects[i][cell.y].value){
                    continue;
                }
                else{
                    break;
                }
            }
            cellObjects[cell.x][cell.y].value = null;
            cellObjects[i-1][cell.y].value = tempVal;
        },

        left: function(cell){
            var i;
            var tempVal = cell.value;
            for(i = cell.x - 1; i >= 0; i--){
                if(!cellObjects[i][cell.y].value){
                    continue;
                }
                else{
                    break;
                }
            }
            cellObjects[cell.x][cell.y].value = null;
            cellObjects[i+1][cell.y].value = tempVal;
        },

        bottom: function(cell){
            var i;
            var tempVal = cell.value;
            for(i = cell.y + 1; i<rows.length; i++){
                if(!cellObjects[cell.x][i].value){
                    continue;
                }
                else{
                    break;
                }
            }
            cellObjects[cell.x][cell.y].value = null;
            cellObjects[cell.x][i-1].value = tempVal;
        },

        top: function(cell){
            var i;
            var tempVal = cell.value;
            for(i = cell.y - 1; i>=0; i--){
                if(!cellObjects[cell.x][i].value){
                    continue;
                }
                else{
                    break;
                }
            }
            cellObjects[cell.x][cell.y].value = null;
            cellObjects[cell.x][i+1].value = tempVal;
        }
    },

    groupPull : {
        right: function(){
            for(var x = rowLength - 1; x>= 0; x--){
                for(var y = 0; y < columnLength; y++){
                    GameFunctions.individualPull.right(cellObjects[x][y]);
                }
            }
        },

        left: function(){
            for(var x = 0; x < rowLength; x++){
                for(var y = 0; y < columnLength; y++){
                    GameFunctions.individualPull.left(cellObjects[x][y]);
                }
            }
        },

        bottom: function(){
            for(var y = columnLength - 1; y >= 0; y--){
                for(var x = 0; x < rowLength; x++){
                    GameFunctions.individualPull.bottom(cellObjects[x][y]);
                }
            }
        },

        top: function(){
            for(var y = 0; y < columnLength; y++){
                for(var x = 0; x < rowLength; x++){
                    GameFunctions.individualPull.top(cellObjects[x][y]);
                }
            }
        }
    },

    merge:{
        column: function(colMain, colMerge){
            for(var i = 0; i < columnLength; i++){
                if(cellObjects[colMain][i].value!=0&&cellObjects[colMerge][i].value!=0){
                    if(cellObjects[colMain][i].value==cellObjects[colMerge][i].value){
                        cellObjects[colMain][i].value*=2;
                        cellObjects[colMerge][i].value = null;
                    }
                }
            }
        },

        row: function(rowMain, rowMerge){
            for(var i = 0; i < rowLength; i++){
                if(cellObjects[i][rowMain].value!=0&&cellObjects[i][rowMain].value!=0){
                    if(cellObjects[i][rowMain].value==cellObjects[i][rowMerge].value){
                        cellObjects[i][rowMain].value*=2;
                        cellObjects[i][rowMerge].value = null;
                    }
                }
            }
        }
    }
};

GameFunctions.initializeCellObjects();
GameFunctions.displayCellObjects();

cellObjects[3][2].value = 2;
cellObjects[1][2].value = 2;
cellObjects[2][1].value = 4;
cellObjects[0][3].value = 8;
cellObjects[3][3].value = 2;
cellObjects[2][3].value = 2;
cellObjects[0][0].value = 2;
cellObjects[2][0].value = 4;

GameFunctions.displayCellObjects();

document.addEventListener("keydown", function(e){
    var keyCode = e.keyCode || e.which,
        arrow = {
            left: 37, top: 38, right: 39, bottom: 40
        }
    switch (keyCode) {
        case arrow.right:
            GameFunctions.groupPull.right();
            GameFunctions.merge.column(3, 2);
            GameFunctions.groupPull.right();
            GameFunctions.merge.column(2, 1);
            GameFunctions.groupPull.right();
            GameFunctions.merge.column(1, 0);
            GameFunctions.groupPull.right();
            break;

        case arrow.left:
            GameFunctions.groupPull.left();
            GameFunctions.merge.column(0, 1);
            GameFunctions.groupPull.left();
            GameFunctions.merge.column(1, 2);
            GameFunctions.groupPull.left();
            GameFunctions.merge.column(2, 3);
            GameFunctions.groupPull.left();
            break;

        case arrow.bottom:
            GameFunctions.groupPull.bottom();
            GameFunctions.merge.row(3, 2);
            GameFunctions.groupPull.bottom();
            GameFunctions.merge.row(2, 1);
            GameFunctions.groupPull.bottom();
            GameFunctions.merge.row(1, 0);
            GameFunctions.groupPull.bottom();
            break;

        case arrow.top:
            GameFunctions.groupPull.top();
            GameFunctions.merge.row(0, 1);
            GameFunctions.groupPull.top();
            GameFunctions.merge.row(1, 2);
            GameFunctions.groupPull.top();
            GameFunctions.merge.row(2, 3);
            GameFunctions.groupPull.top();
            break;

        default:

            break;

    }

    GameFunctions.displayCellObjects();
});
