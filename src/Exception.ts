export default class Exception extends Error {
  public readonly code: string;

  constructor(code: string, message?: string) {
    super(message);
    this.code = code;
  }
}
