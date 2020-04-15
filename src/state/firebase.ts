import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  appName: process.env.FIREBASE_APP_NAME,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
}

try {
  if (!firebase.apps.length) {
    firebase.initializeApp(config)
  } else {
    console.log('app is already initialized')
  }
} catch (err) {
  console.error('Firestore error:', err)
}

export const auth = firebase.auth()
export const firestore = firebase.firestore()

export const googleProvider = new firebase.auth.GoogleAuthProvider()
googleProvider.setCustomParameters({
  prompt: 'select_account',
})

export const signInWithGoogle = async () => {
  const { user } = await auth.signInWithPopup(googleProvider)
  await createUserProfileDocument(user)
}

export const linkAnonymousAccount = async () => {
  const { user } = await auth.currentUser.linkWithPopup(googleProvider)
  await createUserProfileDocument(user)
}

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe()
      resolve(userAuth)
    }, reject)
  })
}

export const createUserProfileDocument = async (userAuth: any, additionalData: Object = {}) => {
  if (!userAuth) {
    return
  }

  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapshot = await userRef.get()
  if (!snapshot.exists) {
    const { displayName, email, photoURL } = userAuth
    const createdAt = new Date()

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        photoURL,
        ...additionalData,
      })
    } catch (error) {
      throw new Error('Error creating user!' + error.message)
    }
  }

  return userRef
}

export default firebase
