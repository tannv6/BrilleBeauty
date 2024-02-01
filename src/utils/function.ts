export function convertDatesToNumbers(arrayOfObjects: any) {
  return arrayOfObjects.map((obj: any) => {
    const result: any = {};

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];

        if (value instanceof Date) {
          result[key] = value.getTime();
        } else {
          result[key] = value;
        }
      }
    }

    return result;
  });
}
