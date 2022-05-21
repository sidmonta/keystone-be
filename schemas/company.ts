import { relationship, text, timestamp } from "@keystone-6/core/fields"

export default {
  email: text({
    validation: { isRequired: true },
    isIndexed: 'unique',
    isFilterable: true,
  }),
  name: text({
    validation: { isRequired: true },
    isIndexed: 'unique',
    isFilterable: true,
  }),
  creationDate: timestamp({ defaultValue: { kind: "now" } }),
  expireDate: timestamp({ validation: { isRequired: true } }),
  clients: relationship({
    ref: 'Client.azienda',
    ui: {
      displayMode: 'cards',
      cardFields: ['username', 'email'],
      linkToItem: true,
      inlineConnect: true
    },
    many: true,
  }),
  metadata: relationship({
    ref: "Metadati.company",
    many: false,
    ui: {
      displayMode: 'cards',
      cardFields: ['email', 'logo'],
      linkToItem: true,
      inlineConnect: true,
      inlineCreate: { fields: ['address', 'email', 'housePhone', 'logo', 'mobilePhone', 'officialName', 'website', 'other'] },
      inlineEdit: { fields: ['address', 'email', 'housePhone', 'logo', 'mobilePhone', 'officialName', 'website', 'other'] }
    }
  })
}