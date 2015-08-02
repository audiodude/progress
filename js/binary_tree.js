var BinaryTree = {};

BinaryTree.on = function(grid) {
  grid.each_cell(function(cell) {
    var bors = [];
    if (cell.north) {
      bors.push(cell.north)
    }
    if (cell.east) {
      bors.push(cell.east)
    }

    var idx = Math.floor(Math.random() * bors.length);
    var bor = bors[idx];
    if (bor) {
      cell.link(bor)
    }
  });
};
