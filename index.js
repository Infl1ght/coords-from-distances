
function checkData(dataObject) {
  if (!dataObject || !dataObject.points || !dataObject.links) {
    throw new Error('Input object must exist and must contain points and links');
  }
  if (dataObject.points.length !== 4) {
    throw new Error('There is must be 4 points');
  }
  if (dataObject.points.links < 5) {
    throw new Error('There is must be 5 links at least');
  }
}

function findCommonLink(pointsLinks) {
  const pointLinksCounter = [0, 0, 0, 0];
  pointsLinks.links.forEach((link) => {
    pointLinksCounter[link.point1] += 1;
    pointLinksCounter[link.point2] += 1;
  });

  const linksPoints = [];
  for (let i = 0; i < pointsLinks.links.length; i += 1) {
    const link = pointsLinks.links[i];
    linksPoints[i] = pointLinksCounter[link.point1] + pointLinksCounter[link.point2];
  }

  const commonLinkNumber = linksPoints.indexOf(Math.max.apply(null, linksPoints));
  const commonLink = pointsLinks.links[commonLinkNumber];

  const otherPoints = [];
  pointsLinks.points.forEach((point) => {
    if (point.index !== commonLink.point1 && point.index !== commonLink.point2) {
      otherPoints.push(point);
    }
  });
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

module.exports = (dataObject) => {
  checkData(dataObject);

  const result = [];
  const { commonLink, otherPoints } = findCommonLink(dataObject);
  result[commonLink.point1] = { x: 0, y: 0 };
  result[commonLink.point2] = { x: commonLink.dist, y: 0 };
  const point1 = dataObject.points[commonLink.point1];
  const point2 = dataObject.points[commonLink.point2];

  result[otherPoints[0].index] = calcPoint(otherPoints[0], point1, point2, commonLink.dist);
  result[otherPoints[1].index] = calcPoint(otherPoints[1], point1, point2, commonLink.dist);
  return result;
};
