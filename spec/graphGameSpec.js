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
        var startingVertex;
        beforeEach(function () {
            startingVertex = 1;
            game.setStart(graph, startingVertex);
        });

        it("current node should be equals to 1", function () {
            expect(graph.currentNode).toBe(1);
        });

        describe("Testing for starting node 1", function () {
            beforeEach(function () {
                game.setStart(graph, 1);
                console.log("winning solutions for node 1:");
                game.play(graph);
                console.log(graph.winning);
            });
            it("should return no possible winning paths", function () {
                expect(graph.winning.length).toBe(0);
            })
        });

        describe("Testing for starting node 2", function () {
            beforeEach(function () {
                game.setStart(graph, 2);
                console.log("winning solutions for node 2:");
                game.play(graph);
                console.log(graph.winning);
            });
            it("should return no possible winning paths", function () {
                expect(graph.winning.length).toBe(0);
            })
        });

        describe("Given we add a new road in game", function () {
            beforeEach(function () {
                graph.nodes[3] = [2];
                graph.nodes[2] = [1, 3];
            });

            describe("Testing for starting node 1", function () {
                beforeEach(function () {
                    game.setStart(graph, 1);
                    console.log("winning solutions for node 1:");
                    game.play(graph);
                    console.log(graph.winning);
                });

                it("should return 1 winning solution", function () {
                    expect(graph.winning.length).toBe(1);
                })
            });
            describe("Testing for starting node 2", function () {
                beforeEach(function () {
                    game.setStart(graph, 2);
                    console.log("winning solutions for node 1:");
                    game.play(graph);
                    console.log(graph.winning);
                });

                it("should return no possible winning paths", function () {
                    expect(graph.winning.length).toBe(0);
                })
            });
        });
    });
});

describe("Given we have a bigger game board with more possibilities", function () {
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
            currentNode: -1,
            winning: []
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