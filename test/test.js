const assert = require('assert');
const coordsFromDistances = require('../index.js');

describe('CoordsFromDistances', () => {
  it('Test', () => {
    const inputObject = {
      points: [
        { x: 292, y: 360, links: { 1: 10, 2: 10, 3: 15 } },
        { x: 651, y: 228, links: { 0: 10, 2: 15, 3: 10 } },
        { x: 408, y: 87, links: { 0: 10, 1: 15 } },
        { x: 123, y: 137, links: { 0: 15, 1: 10 } },
      ],
      links: [
        { point1: 0, point2: 1, dist: 10 },
        { point1: 0, point2: 2, dist: 10 },
        { point1: 0, point2: 3, dist: 15 },
        { point1: 1, point2: 2, dist: 15 },
        { point1: 1, point2: 3, dist: 10 },
      ],
    };
    const result = coordsFromDistances(inputObject);
    assert.notEqual(result, undefined);
  });
});
