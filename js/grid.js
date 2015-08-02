var Grid = function(rows, cols) {
  this.rows = rows;
  this.cols = cols;

  this.grid = [];
  this.prepare_grid();
  this.configure_cells();
};

Grid.prototype.prepare_grid = function() {
  for(var i=0; i<this.rows; i++) {
    var col = [];
    this.grid.push(col);
    for(var j=0; j<this.cols; j++) {
      col.push(new Cell(i, j));
    }
  }
};

Grid.prototype.configure_cells = function() {
  this.each_cell(function(cell) {
    var row = cell.row;
    var col = cell.col;

    cell.north = this.at(row - 1, col)
    cell.south = this.at(row + 1, col)
    cell.west  = this.at(row, col - 1)
    cell.east  = this.at(row, col + 1)
  }, this);
};

Grid.prototype.each_row = function(callback, opt_context) {
  _.each(this.grid, callback, opt_context);
};

Grid.prototype.each_cell = function(callback, opt_context) {
  this.each_row(function(row) {
    _.each(row, callback, opt_context);
  });
}

Grid.prototype.at = function(row, col) {
  if (row < 0 || row > this.rows -1) {
    return null;
  }
  if (col < 0 || col > this.cols -1) {
    return null;
  }
  return this.grid[row][col];
};

Grid.prototype.random_cell = function() {
  var row = Math.floor(Math.random() * this.rows);
  var col = Math.floor(Math.random() * this.grid[row].length)
  return this.at(row, col);
}

Grid.prototype.size = function() {
  return this.rows * this.cols;
}

Grid.prototype.to_s = function() {
  var output = '+' + Array(this.cols + 1).join('---+') + '\n';

  this.each_row(function(row) {
    var top = '|';
    var bottom = '+';
    _.each(row, function(cell) {
      if (!cell) {
        cell = Cell.new(-1, -1)
      }
      var body = '   '; // <-- that's THREE (3) spaces!
      var east_boundary = (cell.is_linked_to(cell.east) ? ' ' : '|');
      top += body + east_boundary;

      var south_boundary = (cell.is_linked_to(cell.south) ? '   ' : '---');
      var corner = '+';
      bottom += south_boundary + corner
    });

    output += top + '\n'
    output += bottom + '\n'
  });

  return output;
};
