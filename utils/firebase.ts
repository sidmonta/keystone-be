import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
} from 'firebase/firestore'
import md5 from 'blueimp-md5'

export const firebaseConfiguration = {
  apiKey: process.env.FIREBASE_API_KEY,
  projectId: process.env.FIREBASE_PROJECT_ID,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER,
  appId: process.env.FIREBASE_APPID,
}

const firebase = initializeApp(firebaseConfiguration)

export const db = getFirestore(firebase)
export const getCollection = (coll: string) => collection(db, coll)

export const getDocument = async (collection: string, id: string) => {
  const docRef = doc(db, collection, md5(id))
  try {
    const document = await getDoc(docRef)
    if (!document.exists) {
      throw new Error(`Document ${id} not found in ${collection}`)
    } else {
      return document.data()
    }
  } catch (error) {
    console.error(error)
  }
}

export const saveDocument = async (coll: string, id: string, data: any) => {
  const docRef = doc(db, coll, md5(id))
  await setDoc(docRef, data)
}


export const deleteDocument = async (coll: string, id: string) => {
  const docRef = doc(db, coll, md5(id))

  await deleteDoc(docRef)
}