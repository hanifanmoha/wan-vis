class Area {

  constructor(json) {
    this.fromJson(json)
  }

  fromJson(json) {
    this.province = json.province || ''
    this.city = json.city || ''
  }

}

export default Area