export default class HttpError extends Error {
  constructor(status, body) {
    super('Http error : ' + status)
    this.status = status;
    this.body = body;
  }
}
