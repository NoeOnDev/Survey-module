class CodeGenerator {
  constructor() {
    this.codes = new Set();
  }

  generate() {
    let code;
    do {
      code = this._generateUniqueCode();
    } while (this.codes.has(code));
    this.codes.add(code);
    return code;
  }

  _generateUniqueCode() {
    const datePart = Date.now().toString().slice(-3);
    const randomPart = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");
    return datePart + randomPart;
  }
}

export default new CodeGenerator();