/* eslint-disable no-prototype-builtins */
export type Indexed<T = any> = {
    [key in string]: T;
};


export function queryStringify(data: Record<string, any>): string | never {
    if (typeof data !== "object") {
        throw new Error("Data must be object");
    }
  
    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => {
      const value = data[key];
      const endLine = index < keys.length - 1 ? "&" : "";
  
      if (Array.isArray(value)) {
        const arrayValue = value.reduce<Record<string, any>>(
          (result, arrData, index) => ({
            ...result,
            [`${key}[${index}]`]: arrData
          }),
          {}
        );
  
        return `${result}${queryStringify(arrayValue)}${endLine}`;
      }
  
      if (typeof value === "object") {
        const objValue = Object.keys(value || {}).reduce<Record<string, any>>(
          (result, objKey) => ({
            ...result,
            [`${key}[${objKey}]`]: value[objKey]
          }),
          {}
        );
  
        return `${result}${queryStringify(objValue)}${endLine}`;
      }
  
      return `${result}${key}=${value}${endLine}`;
    }, "");
}


export function merge(lhs: Indexed, rhs: Indexed): Indexed {
    for (const p in rhs) {
        if (!rhs.hasOwnProperty(p)) {
            continue;
        }

        try {
            if(rhs[p].constructor === Object) {
                rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
            } else {
                lhs[p] = rhs[p];
            }
        } catch (e) {
            lhs[p] = rhs[p];
        }
    }
  
    return lhs;
}
  
export function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
    if (typeof object !== 'object' || object === null) {
      return object;
    }
  
    if (typeof path !== 'string') {
      throw new Error('path must be string');
    }
  
    const result = path.split('.').reduceRight<Indexed>((acc, key) => ({
      [key]: acc,
    }), value as any);
  
    return merge(object as Indexed, result);
}

export function vh(percent: number) {
  const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  return (percent * h) / 100;
}

export function vw(percent: number) {
  const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  return (percent * w) / 100;
}

export function debounce(f: any, ms: number) {
  let isCooldown = false;

  return function() {
    if (isCooldown) return false;

    f.apply(this, arguments);

    isCooldown = true;

    setTimeout(() => isCooldown = false, ms);
    return true;
  };
}
