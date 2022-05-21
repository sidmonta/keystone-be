import { image, json, relationship, text } from "@keystone-6/core/fields"

export default {
  address: text(),
  email: text(),
  housePhone: text(),
  logo: image(),
  mobilePhone: text(),
  officialName: text(),
  website: text(),
  other: json(),
  company: relationship({
    ref: "Company.metadata",
    many: true,
    ui: {
      displayMode: "select",
      labelField: "name"
    }
  })
}