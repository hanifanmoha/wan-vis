class Price {

  static rowLimit = 40
  static headers = ['Name', 'Province', 'City', 'Size', 'Price']

  constructor(json) {
    this.fromJson(json)
  }

  fromJson(json) {
    this.uuid = json.uuid || ''
    this.comodity = json.komoditas || ''
    this.province = json.area_provinsi || ''
    this.city = json.area_kota || ''
    this.size = parseInt(json.size) || 0
    this.price = parseInt(json.price) || 0
    this.timestamp = parseInt(json.timestamp) || 0
  }

  rowData() {
    return [
      this.comodity,
      this.province,
      this.city,
      this.size,
      this.price
    ]
  }

}

export default Price