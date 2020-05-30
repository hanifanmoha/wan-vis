class Size {

  constructor(json) {
    this.fromJson(json)
  }

  fromJson(json) {
    this.size = parseInt(json.size) || 0
  }

}

export default Size