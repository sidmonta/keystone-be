import { integer, relationship, select, text } from "@keystone-6/core/fields"

export default {
  client: relationship({
    ref: "Client.impianti", many: false
  }),
  annoMessaInServizio: integer(),
  esposizioneImpianto: select({
    options: [
      { label: 'Nord-Est', value: 'nord-est' },
      { label: 'Sud-Est', value: 'sud-est' },
      { label: 'Nord-Ovest', value: 'nord-ovest' },
      { label: 'Sud-Ovest', value: 'sud-ovest' },
      { label: 'Nord', value: 'nord' },
      { label: 'Sud', value: 'sud' },
      { label: 'Ovest', value: 'ovest' },
      { label: 'Est', value: 'est' },
    ],
  }),
  inverter: text(),
  marcaPannelli: text(),
  name: text({ validation: { isRequired: true }, isIndexed: "unique" }),
  potenzaPannelli: integer(),
}