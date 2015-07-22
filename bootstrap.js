/**
 * Created by rharik on 6/23/15.
 */
var _container = require('DAGon');
module.exports = new _container(x=>
    x.pathToRoot(__dirname)
        .requireDirectoryRecursively('./src')
        .groupAllInDirectory('./src/EventHandlers', 'eventHandlers')
        .for('gesConnection').callInitMethod('openConnection')
        .for('gesRepository')
        .rename('lodash').withThis('_')
        .rename('bluebird').withThis('Promise')
        .complete());