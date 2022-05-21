import { image, json, relationship, text } from "@keystone-6/core/fields"
import md5 from "blueimp-md5"
import fs from 'fs'
import path from 'path'
import omit from 'lodash/omit'
import { deleteDocument, saveDocument } from "../utils/firebase"

export default {
  address: text(),
  email: text(),
  housePhone: text(),
  companyLogo: image(),
  logo: text(),
  mobilePhone: text(),
  officialName: text(),
  website: text(),
  other: json({
    defaultValue: {}
  }),
  company: relationship({
    ref: "Company.metadata",
    many: true,
    db: {
      foreignKey: true
    },
    ui: {
      displayMode: "select",
      labelField: "name"
    }
  })
}

export const metadataHooks = {
  // Convert LOGO to base64
  resolveInput: ({ resolvedData, context }: any) => {
    const { companyLogo } = resolvedData

    if (companyLogo?.id) {
      const imageURL = context.image.getUrl(companyLogo.mode, companyLogo.id, companyLogo.extension)
      const contents = fs.readFileSync(imageURL, { encoding: 'base64' })
      return {
        ...resolvedData,
        // Ensure the first letter of the title is capitalised
        logo: 'data:image/png;base64,' + contents
      }
    }
    // We always return resolvedData from the resolveInput hook
    return resolvedData
  },

  // Save on firestore
  afterOperation: ({ operation, item }: any) => {
    const firebaseID = item.email

    if (operation === "delete") {
      // Check if this firebase have some company assign
      deleteDocument('metadata', firebaseID).then(() => {
        console.log('metadata removed in firebase')
      }).catch(console.error)
      return
    }

    const firebaseData = omit(item, [
      'id',
      'companyLogo_filesize',
      'companyLogo_extension',
      'companyLogo_width',
      'companyLogo_height',
      'companyLogo_mode',
      'companyLogo_id'
    ])

    firebaseData.other = JSON.parse(firebaseData.other)

    saveDocument("metadati", firebaseID, firebaseData).then(() => {
      console.log('saved in firebase')
    }).catch(console.error)
  }
}