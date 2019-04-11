const assert = require('assert');
const coordsFromDistances = require('../index.js');

describe('CoordsFromDistances', () => {
  it('Test 1', () => {
    const points = [
      {
        index: 0, x: 292, y: 360, links: { 1: 10, 2: 10, 3: 15 },
      },
      {
        index: 1, x: 651, y: 228, links: { 0: 10, 2: 15, 3: 10 },
      },
      {
        index: 2, x: 408, y: 87, links: { 0: 10, 1: 15 },
      },
      {
        index: 3, x: 123, y: 137, links: { 0: 15, 1: 10 },
      },
    ];
    const result = coordsFromDistances(points);
    assert.notEqual(result, undefined);
  });
  it('Test 2', () => {
    const points = [
      {
        index: 0, x: 292, y: 360, links: { 1: 10, 2: 10, 3: 15 },
      },
      {
        index: 1, x: 651, y: 228, links: { 0: 10, 2: 10 },
      },
      {
        index: 2, x: 408, y: 87, links: { 0: 10, 1: 15, 3: 10 },
      },
      {
        index: 3, x: 123, y: 137, links: { 0: 10, 2: 10 },
      },
    ];
    const result = coordsFromDistances(points);
    assert.notEqual(result, undefined);
  });
});
