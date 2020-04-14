import HttpError from './HttpError';

async function request(uri, init) {
  let result;
  try {
    result = await fetch(uri, init);
  } catch {
    throw new HttpError(0, null);
  }

  const hasContent = result.status !== 204;
  const body = await (hasContent ? result.json() : null);

  if (result.ok) {
    return (hasContent && body) || undefined;
  } else {
    throw new HttpError(result.status, body);
  }
}

export default class HttpClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  get(uri) {
    return request(`${this.baseUrl}${uri}`);
  }
}
