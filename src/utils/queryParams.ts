/**
 * Get the query params from the url
 */
export const queryParams = () => {
  return (function (a: string | string[]) {
    if (a === '') return {};
    let b: any = {};
    for (let i = 0; i < a.length; ++i) {
      let p = a[i].split('=', 2);
      if (p.length === 1) b[p[0]] = '';
      else b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, ' '));
    }
    return b;
  })(window.location.search.substr(1).split('&'));
};
