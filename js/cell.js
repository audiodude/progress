var Cell = function(row, col) {
  this.row = row;
  this.col = col;

  this.links = {};
  this.north = null;
  this.south = null;
  this.east = null;
  this.west = null;
}

Cell.prototype.link = function(cell, bidi) {
  if (_.isUndefined(bidi)) {
    bidi = true;
  }
  this.links[cell] = true;

  if (bidi) {
    cell.link(this, false);
  }
}

Cell.prototype.unlink = function(cell, bidi) {
  if (_.isUndefined(bidi)) {
    bidi = true;
  }
  delete this.links[cell];

  if (bidi) {
    cell.unlink(this, false);
  }
}

Cell.prototype.links = function() {
  _.keys(this.links);
}

Cell.prototype.is_linked_to = function(cell) {
  return _.has(this.links, cell);
}

Cell.prototype.toString = function() {
  return 'Cell(' + this.row + ', ' + this.col + ')';
}
