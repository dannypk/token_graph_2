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
            var canMove, path, newPath;
            beforeEach(function () {
                graph.visited = [1, 2, 3, 4];
                graph.currentNode = 4;

                canMove = game.canMove(graph);
                path = graph.visited;

                newPath = game.goBack(path.slice());
            });

            it("should not be able to move", function () {
                expect(canMove).toBe(false);
            });

            it("should return the traversed path", function () {
                expect(path).toEqual([1, 2, 3, 4]);
            });

            it("should go back 1 step", function () {
                expect(newPath).toEqual([1, 2, 3]);
            })


        });
    });
});

describe("Given we have a 2nd graph", function () {
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

describe("Testing the algorithm", function () {
    var graph;

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
            visited: [],
            currentNode: -1,
            winning: [],
            startNode: -1
        };
    });

    describe("Testing for starting node 1", function () {
        beforeEach(function () {
            game.setStart(graph, 1);
            console.log("winning solutions for node 1:");
            game.play(graph);
            console.log(graph.winning);
        });
        it("should return 2 possible winning paths", function () {
            expect(graph.winning.length).toBe(2);
        })
    });

    describe("Testing for starting node 2", function () {
        beforeEach(function () {
            game.setStart(graph, 2);
            console.log("winning solutions for node 2:");
            game.play(graph);
            console.log(graph.winning);
        });
        it("should return a winning path [2,4,6]", function () {
            expect(graph.winning).toEqual([[2, 4, 6]]);
        })
    });

    describe("Testing for starting node 3", function () {
        beforeEach(function () {
            game.setStart(graph, 3);
            console.log("winning solutions for node 3:");
            game.play(graph);
            console.log(graph.winning);
        });
        it("should return 3 possible winning paths", function () {
            expect(graph.winning.length).toBe(2);
        })
    })
});
