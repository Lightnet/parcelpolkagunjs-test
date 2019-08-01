const { Packager } = require('parcel-bundler')

class MyPackager extends Packager {
  async start() {
    // optional. write file header if needed.
    console.log("start");
    //await this.dest.write(header)
  }

  async addAsset(asset) {
    // required. write the asset to the output file.
    console.log("addAsset");
    await this.dest.write(asset.generated.foo)
  }

  async end() {
    console.log("end");
    // optional. write file trailer if needed.
    //await this.dest.end(trailer)
  }
}

module.exports = MyPackager