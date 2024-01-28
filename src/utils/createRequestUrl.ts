/**
 * Create api call url as string
 * Bind the query parameters inline
 */
export function createRequestUrl<Params>(props: {
  url: string;
  params?:
    | Params
    | {
        [key: string]: string | number | boolean | null | undefined;
      };
}) {
  let url = props?.url;
  let params: any = props?.params;

  if (props?.params && typeof params === 'object') {
    let questionPushed = false;
    let hasParams = false;

    Object.keys(params).forEach(key => {
      if (params && typeof params[key] !== 'undefined') {
        if (!questionPushed) {
          url += '?';
          questionPushed = true;
        }

        if (hasParams) {
          url += `&`;
        }

        const paramValue = params[key];
        url += `${key}${
          typeof paramValue !== 'undefined' &&
          paramValue !== null &&
          paramValue?.toString() !== ''
            ? '='
            : ''
        }${paramValue ?? ''}`;
        hasParams = true;
      }
    });
  }

  return url;
}
