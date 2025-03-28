export const buildQueryArrays = (attributes) => {
  const query = []

  Object.keys(attributes).forEach((key) => {
    if (Array.isArray(attributes[key])) {
      attributes[key].forEach((k, i) => {
        query.push(`${key}[]=${attributes[key][i]}`)
      })
    } else if (typeof attributes[key] === 'object') {
      Object.keys(attributes[key]).forEach((k) => {
        attributes[key][k].forEach((v) => {
          query.push(`${key}[${k}][]=${v}}`)
        })
      })
    } else {
      query.push(`${key}=${attributes[key]}`)
    }
  })

  return query.join('&')
}
