
function checkData(points) {
  if (!points || points.length !== 4) {
    throw new Error('Input object must exist and must contain 4 points');
  }
}

function findCommonLink(points) {
  const pointLinksCounter = [0, 0, 0, 0];
  points.forEach((point) => {
    Object.entries(point.links).forEach((entry) => {
      pointLinksCounter[entry[0]] += 1;
    });
  });

  const maxLinkedPoints = Math.max.apply(null, pointLinksCounter);
  const commonLink = [];
  const otherPoints = [];
  for (let i = 0; i < points.length; i += 1) {
    const point = points[i];
    if (Object.entries(point.links).length === maxLinkedPoints && commonLink.length < 2) {
      commonLink.push(points[i]);
    } else {
      otherPoints.push(points[i]);
    }
  }
  return { commonLink, otherPoints };
}

function calcAlpha(a, b, c) {
  return Math.acos((b * b + c * c - a * a) / (2 * b * c));
}

function calcPoint(pointToFind, point1, point2, dist) {
  const alpha = calcAlpha(point2.links[pointToFind.index], point1.links[pointToFind.index], dist);
  const resultPoint = {
    x: point1.links[pointToFind.index] * Math.cos(alpha), y: point1.links[pointToFind.index] * Math.sin(alpha),
  };
  const vectorProduct = (pointToFind.x - point1.x) * (point2.y - point1.y)
    - (pointToFind.y - point1.y) * (point2.x - point1.x);
  if (vectorProduct < 0) {
    resultPoint.y = -resultPoint.y;
  }
  return resultPoint;
}

module.exports = (points) => {
  checkData(points);

  const result = [];
  const { commonLink, otherPoints } = findCommonLink(points);
  const dist = commonLink[0].links[commonLink[1].index];
  result[commonLink[0].index] = { x: 0, y: 0 };
  result[commonLink[1].index] = { x: dist, y: 0 };

  result[otherPoints[0].index] = calcPoint(otherPoints[0], commonLink[0], commonLink[1], dist);
  result[otherPoints[1].index] = calcPoint(otherPoints[1], commonLink[0], commonLink[1], dist);
  return result;
};
