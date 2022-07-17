const ObjectUtil = {
  transpose: (objs, concateKey) => {
    if (!objs || objs.length === 0) return objs;

    const transform = (objects, result, prevKey) => {
      Object.keys(objects).forEach((key) => {
        const currentKey = prevKey ? `${prevKey}.${key}` : key;

        if (
          typeof objects[key] === 'object' &&
          objects[key] !== null &&
          !Array.isArray(objects[key])
        ) {
          return transform(objects[key], result, currentKey);
        }

        result[currentKey] = objects[key];

        return false;
      });

      return result;
    };

    return transform(objs, {}, concateKey);
  },
};

module.exports = ObjectUtil;
