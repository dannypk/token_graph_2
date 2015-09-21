/**
 * Created by daniel.pacurici on 21.09.2015.
 */
var game = require('../app/graph_game');

describe("Given we have a graph", function () {
    var graph;

    beforeEach(function () {
        graph = {
            nodes: {
                1: [1, 2, 3],
                2: [1, 3, 4],
                3: [1, 2, 4],
                4: [1, 2, 3]
            },
            visited: [],
            currentNode: -1,
            isWinning: true
        };
    });

    describe("when player sets the starting vertex", function () {
        var startingVertex;
        beforeEach(function () {
            startingVertex = 1;
            game.setStart(graph, startingVertex);
        });

        it("current node should be equals to 1", function () {
            expect(graph.currentNode).toBe(1);
        });


        it("node 1 should be in visited array", function () {
            expect(graph.visited.indexOf(1)).toBeGreaterThan(-1);
        });


        describe("when player does a move", function () {
            var canMove, currentNode, nodeIsVisited;
            beforeEach(function () {
                canMove = game.canMove(graph);
                game.move(graph, 3);
                currentNode = graph.currentNode;
                nodeIsVisited = graph.visited.indexOf(3);
            });

            it("should check if it is possible to do the move", function () {
                expect(canMove).toBe(true);
            });

            it("should move to the next node", function () {
                expect(currentNode).toBe(3);
            });

            it("should add the current node to visited nodes", function () {
                expect(nodeIsVisited).toBeGreaterThan(-1);
            })
        });

        describe("when we reach the end of possibilities", function () {
            var canMove, path;
            beforeEach(function () {
                graph.visited = [1, 2, 3, 4];
                graph.currentNode = 4;

                canMove = game.canMove(graph);
                path = graph.visited;
            });

            it("should not be able to move", function () {
                expect(canMove).toBe(false);
            });

            it("should return the traversed path", function () {
                expect(path).toEqual([1, 2, 3, 4]);
            })
        });


    });
});

describe("Given we have a complicated graph", function () {
    var graph;

    beforeEach(function () {
        graph = {
            nodes: {
                1: [2],
                2: [1, 3, 4],
                3: [2],
                4: [2, 5, 6]
            },
            visited: [],
            currentNode: -1,
            isWinning: false
        };
    });

    describe("Given we start with node 2", function () {
        beforeEach(function () {
            startingVertex = 2;
            game.setStart(graph, startingVertex);


            describe("we make first move to node 1", function () {
                var visited, isWinning, canMove;
                beforeEach(function () {
                    game.move(graph, 1);
                    visited = graph.visited;
                    isWinning = graph.isWinning;
                    canMove = game.canMove(graph);
                });

                it("should been visited 2 and 1", function () {
                    expect(visited).toEqual([2, 1]);
                });

                it("should not be winning", function () {
                    expect(isWinning).toBe(false);
                });

                it("should not have any other possibilities to move", function () {
                    expect(canMove).toBe(false);
                })
            });

            describe("node 1 wasn't winning, we take node 4", function () {
                beforeEach(function () {
                    game.move(graph, 4);
                    canMove = game.canMove(graph);
                });

                it("should have possibilities to move on", function () {
                    expect(canMove).toBe(true);
                });

                describe("we take node 5", function () {
                    var path;
                    beforeEach(function () {
                        game.move(graph, 5);
                        canMove = game.canMove(graph);
                        path = graph.visited;
                    });
                    it("should not have possibilities to move on", function () {
                        expect(canMove).toBe(true);
                    });

                    it("should be a winning node", function () {
                        expect(isWinning).toBe(true);
                    });

                    it("should return the current path", function () {
                        expect(path).toEqual([2, 4, 5]);
                    })
                })
            });
        });
    })
});

describe("Given we have a complicated graph", function () {
    var graph;

    beforeEach(function () {
        graph = {
            nodes: {
                1: [2],
                2: [1, 3, 4],
                3: [2],
                4: [2, 5, 6]
            },
            visited: [],
            currentNode: -1,
            isWinning: false
        };
    });

    describe("then we calculate for all node the possible path", function () {
        describe("we start with one", function () {
            var path;
            beforeEach(function () {
                game.setStart(graph, 1);
                path = game.play(graph);
            });

            it("should return path 1,2,3 as a winning path", function () {
                expect(path).toEqual([1, 2, 3]);
            })

        });
    })

});

