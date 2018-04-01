const QueryFile = require('pg-promise').QueryFile;

module.exports = function(file) {
    return new QueryFile(file, {minify: true});
};
