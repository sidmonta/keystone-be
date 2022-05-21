import { relationship, text, timestamp } from "@keystone-6/core/fields"
import { checkIfExist, getDocById } from "../utils/db"
import { deleteDocument, saveDocument } from "../utils/firebase"

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
      cardFields: ['email', 'companyLogo'],
      linkToItem: true,
      inlineConnect: true,
      inlineCreate: { fields: ['address', 'email', 'housePhone', 'companyLogo', 'mobilePhone', 'officialName', 'website', 'other'] },
      inlineEdit: { fields: ['address', 'email', 'housePhone', 'companyLogo', 'mobilePhone', 'officialName', 'website', 'other'] }
    }
  })
}

export const companyHooks = {
  afterOperation({ operation, item, context }: any) {
    const firebaseID = item.email

    console.log(item)

    // if (item?.metadataId) {
    //   getDocById(context.query, "Metadati", item.metadataId, ["email", "officialName"]).then((result) => {
    //     console.log(result)
    //   })
    // }

    if (operation === "delete") {
      // Check if this firebase have some company assign
      deleteDocument('company', firebaseID).then(() => {
        console.log('company removed in firebase')
      }).catch(console.error)
      return
    }

    // const firebaseData = item

    saveDocument("company", firebaseID, item).then(() => {
      console.log('saved in firebase')
    }).catch(console.error)
  }
}