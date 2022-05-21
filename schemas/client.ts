import { list } from "@keystone-6/core"
import { integer, relationship, select, text, timestamp } from "@keystone-6/core/fields"

export default {
  email: text({
    validation: { isRequired: true },
    isIndexed: 'unique',
    isFilterable: true,
  }),
  username: text({
    validation: { isRequired: true },
    isIndexed: 'unique',
    isFilterable: true,
  }),
  creationDate: timestamp({ defaultValue: { kind: "now" } }),
  azienda: relationship({
    ref: "Company.clients",
    ui: {
      displayMode: 'select',
      hideCreate: true,
      labelField: 'name'
    },
  }),
  expireDate: timestamp({ validation: { isRequired: true } }),
  impianti: relationship({
    ref: "Installation.client",
    many: true,
    ui: {
      displayMode: "cards",
      cardFields: ["name"],
      linkToItem: true,
      inlineCreate: { fields: ["name", "annoMessaInServizio", "esposizioneImpianto", "inverter", "marcaPannelli", "potenzaPannelli"] },
      inlineEdit: { fields: ["name", "annoMessaInServizio", "esposizioneImpianto", "inverter", "marcaPannelli", "potenzaPannelli"] }
    }
  }),
  role: select({
    options: [
      { label: 'Admin', value: 'admin' },
      { label: 'Simple', value: 'simple' },
    ],
    defaultValue: 'simple',
    ui: {
      displayMode: 'segmented-control',
    },
  })
}
