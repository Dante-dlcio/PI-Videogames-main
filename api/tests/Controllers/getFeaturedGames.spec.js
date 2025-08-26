const { expect } = require("chai");
const sinon = require("sinon");
const { getFeaturedGames } = require("../../src/controllers/getFeaturedGames");
const { getGames } = require("../../src/controllers/getGames");

describe("getFeaturedGames", () => {
  let req, res, next;

  beforeEach(() => {
    req = {};
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    next = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should return featured games", async () => {
    const mockGames = [
      { metacritic: 85, releaseDate: new Date().toISOString() },
      { metacritic: 90, releaseDate: new Date().toISOString() },
    ];

    sinon.stub(getGames, "default").resolves(mockGames);

    await getFeaturedGames(req, res, next);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith(sinon.match.array)).to.be.true;
    expect(res.json.getCall(0).args[0].length).to.be.above(0);
  });

  it("should handle errors", async () => {
    sinon.stub(getGames, "getGames").throws(new Error("Test error"));

    await getFeaturedGames(req, res, next);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWith({ message: "Internal Server Error" })).to.be
      .true;
  });
});
