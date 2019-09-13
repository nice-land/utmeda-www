const isEdgeFunction = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  return (/Edge/.test(navigator.userAgent));
};

export const isEdge = isEdgeFunction();
