const json = JSON.isRawJSON({ foo: 'bar' })
const json2 = JSON.parse(json)
const json3 = JSON.rawJSON(json2)
const json4 = JSON.stringify(json3)
