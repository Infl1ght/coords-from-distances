
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

function findCommonLink(points) {
  const pointLinksCounter = [0, 0, 0, 0];
  points.links.forEach((pointLink) => {
    pointLinksCounter[pointLink.point1] += 1;
    pointLinksCounter[pointLink.point2] += 1;
  });

  const linksPoints = [];
  for (let i = 0; i < points.links.length; i += 1) {
    const link = points.links[i];
    linksPoints[i] = pointLinksCounter[link.point1] + pointLinksCounter[link.point2];
  }

  const commonLinkNumber = linksPoints.indexOf(Math.max.apply(null, linksPoints));
  return points.links[commonLinkNumber];
}

function calcAlpha(a, b, c) {
  return Math.acos((b * b + c * c - a * a) / (2 * b * c));
}

module.exports = (dataObject) => {
  checkData(dataObject);

  const result = [];
  const leftPoints = new Set([0, 1, 2, 3]);
  const commonLink = findCommonLink(dataObject);
  result[commonLink.point1] = { x: 0, y: 0 };
  result[commonLink.point2] = { x: commonLink.dist, y: 0 };
  const point1 = dataObject.points[commonLink.point1];
  const point2 = dataObject.points[commonLink.point2];

  leftPoints.delete(commonLink.point1);
  leftPoints.delete(commonLink.point2);

  const vectorA = { x: point2.x - point1.x, y: point2.y - point1.y };

  const thirdPointIndex = leftPoints.values().next().value;
  leftPoints.delete(thirdPointIndex);
  let alpha = calcAlpha(point2.links[thirdPointIndex], point1.links[thirdPointIndex], commonLink.dist);
  const thirdPoint = {
    x: point1.links[thirdPointIndex] * Math.cos(alpha), y: point1.links[thirdPointIndex] * Math.sin(alpha),
  };
  let vectorB = { x: thirdPoint.x - point1.x, y: thirdPoint.y - point1.y }
  let vectorProduct = vectorA.x * vectorB.x + vectorA.y + vectorB.y;
  if (vectorProduct < 0) {
    thirdPoint.y = -thirdPoint.y;
  }
  result[thirdPointIndex] = thirdPoint;

  const fourthPointIndex = leftPoints.values().next().value;
  alpha = calcAlpha(point2.links[fourthPointIndex], point1.links[fourthPointIndex], commonLink.dist);
  const fourthPoint = {
    x: point1.links[fourthPointIndex] * Math.cos(alpha),
    y: point1.links[fourthPointIndex] * Math.sin(alpha),
  };
  vectorB = { x: fourthPoint.x - point1.x, y: fourthPoint.y - point1.y }
  vectorProduct = vectorA.x * vectorB.x + vectorA.y + vectorB.y;
  if (vectorProduct < 0) {
    fourthPoint.y = -fourthPoint.y;
  }

  result[fourthPointIndex] = fourthPoint;
  return result;
};
