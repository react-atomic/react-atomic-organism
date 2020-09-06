
const fixX = (newWH, origWH, force = false) => {
  let tmpH = newWH.w / (origWH.w / origWH.h);
  if (tmpH <= newWH.h || force) {
    tmpH = Math.floor(tmpH);
    const y = Math.floor((newWH.h - tmpH) / 2);
    newWH.h = tmpH;
    return {
      x: 0,
      y
    };
  } else {
    return fixY(newWH, origWH);
  }
}

const fixY = (newWH, origWH, force = false) => {
  let tmpW = newWH.h * (origWH.w / origWH.h);
  if (tmpW <= newWH.w || force) {
    tmpW = Math.floor(tmpW);
    const x = Math.floor((newWH.w - tmpW) / 2);
    newWH.w = tmpW;
    return {
      x,
      y: 0
    };
  } else {
    return fixX(newWH, origWH);
  }
}

const getNextLoc = (toWH, origWH, maxWH) => {
  const nextLoc = {
    x: (toWH.w - origWH.w) / 2,
    y: (toWH.h - origWH.h) / 2,
  };
  if (nextLoc.x < 0) {
    if (maxWH.w > toWH.w) {
      nextLoc.x = -((maxWH.w - toWH.w) / 2);
    } else {
      nextLoc.x = 0;
    }
  }
  if (nextLoc.y < 0) {
    if (maxWH.h > toWH.h) {
      nextLoc.y = -((maxWH.h - toWH.h) / 2);
    } else {
      nextLoc.y = 0; 
    }
  }
  return nextLoc;
}

const ratio = (w, h, newW, newH) => {
  const newWH = {
    w: newW,
    h: newH
  };
  const maxWH = {
    w: newW,
    h: newH
  };
  const toWH = {
    w: newW,
    h: newH
  };
  const origWH = {
    w,
    h
  };
  let newWHLoc;
  if (w > h) {
    newWHLoc = fixX(newWH, origWH);
    fixX(maxWH, origWH, true);
  } else {
    newWHLoc = fixY(newWH, origWH);
    fixY(maxWH, origWH, true);
  }
  const maxWHLoc = getNextLoc(toWH, maxWH, maxWH);
  const origWHLoc = getNextLoc(toWH, origWH, maxWH);
  return {
    newWHLoc,
    maxWHLoc,
    origWHLoc,
    newWH,
    maxWH,
    origWH
  };
}

export default ratio;
