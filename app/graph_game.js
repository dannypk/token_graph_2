/**
 * Created by daniel.pacurici on 21.09.2015.
 */
module.exports = {
    setStart: setStart,
    play: play
};

function setStart(graph, startingNode) {
    graph.currentNode = startingNode;
}

function getPath(graph, currentNodes, currentVertex) {
    return graph.nodes[currentVertex].filter(function (node) {
        return currentNodes.indexOf(node) < 0;
    });
}

function play(graph, visitedNodes, currentNode) {
    var winning, previousNode, isEnd, paths;

    currentNode = currentNode || graph.currentNode;
    visitedNodes = visitedNodes || [];
    visitedNodes.push(currentNode);

    paths = getPath(graph, visitedNodes, currentNode);

    if (paths.length > 0) {
        for (var path in paths) {
            if (paths.hasOwnProperty(path))
                play(graph, visitedNodes, paths[path]);
        }
    }

    winning = visitedNodes.slice();
    previousNode = visitedNodes.pop();

    isEnd = getPath(graph, winning, previousNode);

    if (!isEnd.length > 0 && winning.length % 2 === 1) {
        graph.winning.push(winning);
    }
}