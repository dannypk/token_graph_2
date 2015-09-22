/**
 * Created by daniel.pacurici on 21.09.2015.
 */
var game = require('../app/graph_game');

describe("Given we have a small loosing board", function () {
    var graph;
    beforeEach(function () {
        graph = {
            nodes: {
                1: [2],
                2: [1]
            },
            currentNode: -1,
            winning: []
        };
    });

    describe("when player sets the starting vertex", function () {
        var startingNode, currentNode, winningPath, winningPathLength;
        beforeEach(function () {
            startingNode = 1;
            game.setStart(graph, startingNode);
            currentNode = graph.currentNode;
        });

        it("current node should be equals to 1", function () {
            expect(currentNode).toBe(1);
        });

        describe("Testing for starting node 1", function () {
            beforeEach(function () {
                startingNode = 1;

                game.setStart(graph, startingNode);
                game.play(graph);

                winningPathLength = graph.winning.length;
            });

            it("should return no possible winning paths", function () {
                expect(winningPathLength).toBe(0);
            })
        });

        describe("Testing for starting node 2", function () {
            beforeEach(function () {
                startingNode = 2;

                game.setStart(graph, startingNode);
                game.play(graph);

                winningPathLength = graph.winning.length;
            });

            it("should return no possible winning paths", function () {
                expect(winningPathLength).toBe(0);
            })
        });

        describe("Given we add a new road in game", function () {
            beforeEach(function () {
                graph.nodes[3] = [2];
                graph.nodes[2] = [1, 3];
            });

            describe("Testing for starting node 1", function () {
                beforeEach(function () {
                    startingNode = 1;
                    game.setStart(graph, startingNode);
                    game.play(graph);

                    winningPath = graph.winning;
                    winningPathLength = winningPath.length;
                });

                it("should return 1 winning solution", function () {
                    console.log("winning solutions for node 1:" + JSON.stringify(winningPath));
                    expect(winningPathLength).toBe(1);
                });

                it("should return [[1,2,3]] as the winning solution", function () {
                    expect(winningPath).toEqual([[1, 2, 3]]);
                })
            });
            describe("Testing for starting node 2", function () {
                beforeEach(function () {
                    startingNode = 2;
                    game.setStart(graph, startingNode);
                    game.play(graph);
                });

                it("should return no possible winning paths", function () {
                    expect(graph.winning.length).toBe(0);
                })
            });
        });
    });
});

describe("Given we have a bigger game board with more possibilities", function () {
    var graph, winningPath, winningPathLength;

    beforeEach(function () {
        graph = {
            nodes: {
                1: [2],
                2: [1, 3, 4],
                3: [2],
                4: [2, 5, 6],
                5: [4, 7],
                6: [4],
                7: [5]
            },
            currentNode: -1,
            winning: []
        };
    });

    describe("Testing for starting node 1", function () {
        var startingNode;
        beforeEach(function () {
            startingNode = 1;

            game.setStart(graph, startingNode);
            game.play(graph);

            winningPath = graph.winning;
            winningPathLength = winningPath.length;

            console.log("winning solutions for node 1:" + JSON.stringify(winningPath));
        });

        it("should return 2 possible winning paths", function () {
            expect(winningPathLength).toBe(2);
        })
    });

    describe("Testing for starting node 2", function () {
        beforeEach(function () {
            startingNode = 2;

            game.setStart(graph, startingNode);
            game.play(graph);

            winningPath = graph.winning;

            console.log("winning solutions for node 2:" + JSON.stringify(winningPath));
        });

        it("should return a winning path [2,4,6]", function () {
            expect(winningPath).toEqual([[2, 4, 6]]);
        })
    });

    describe("Testing for starting node 3", function () {
        beforeEach(function () {
            startingNode = 3;

            game.setStart(graph, startingNode);
            game.play(graph);

            winningPath = graph.winning;
            winningPathLength = winningPath.length;

            console.log("winning solutions for node 3:" + JSON.stringify(winningPath));

        });

        it("should return 3 possible winning paths", function () {
            expect(winningPathLength).toBe(2);
        })
    })
});