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
    }

};

// groupPull = {
//     right: function(){
//         for(var xa = rowLength - 1; xa>= 0; xa--){
//             for(var ya = 0; ya <columnLength; ya++){
//                 GameFunctions.individualPull.right(cellObjects[xa][ya]);
//             }
//         }
//     }
// };

// groupPull = {
//     right: function(){
//         var xa, ya;
//         for(xa = rowLength - 1; xa>=0; xa--){
//             for(ya = 0; ya<columnL)
//         }
//     }
// };


GameFunctions.initializeCellObjects();
GameFunctions.displayCellObjects();

cellObjects[3][2].value = 3;
cellObjects[1][2].value = 4;
cellObjects[2][1].value = 1;
cellObjects[0][3].value = 1;
cellObjects[3][3].value = 5;
cellObjects[2][3].value = 3;
cellObjects[0][0].value = 1;
cellObjects[2][0].value = 7;


GameFunctions.displayCellObjects();
// GameFunctions.individualPull.right(cellObjects[1][2]);
// GameFunctions.displayCellObjects();

document.addEventListener("keydown", function(e){
    var keyCode = e.keyCode || e.which,
        arrow = {
            left: 37, top: 38, right: 39, bottom: 40
        }
    switch (keyCode) {
        case arrow.right:
            GameFunctions.groupPull.right();
            break;

        case arrow.left:
            GameFunctions.groupPull.left();
            break;

        case arrow.bottom:
            GameFunctions.groupPull.bottom();
            break;

        case arrow.top:
            GameFunctions.groupPull.top();
            break;

        default:

            break;

    }

    GameFunctions.displayCellObjects();
});
