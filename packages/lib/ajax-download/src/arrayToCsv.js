const arrayToCsv = arr =>
  arr.map( col => '"' + col.join('","') + '"').join("\r\n")

export default arrayToCsv;
