const { Asset } = require('parcel-bundler');


class MyAsset extends Asset {
  constructor(name, pkg, options) {
    super(name, pkg, options);
    this.type = 'js';
    console.log("init my asset!");
  }

  async parse() {
    //let options = {
      //cwd: path.dirname(this.name)
    //};

  }

  async generate() {
    console.log("init generate!");
    //return [
      //{
        //type: 'js',
        //value: code,
        //value: this.options.sourceMaps,
      //}
    //];
  }
  generateErrorMessage(err) {
    console.log("Error assets")
    // The generated stack is not useful, but other code may
    // expect it and try to print it, so make it an empty string.
    err.stack = '';
    return err;
  }
}

module.exports = MyAsset;