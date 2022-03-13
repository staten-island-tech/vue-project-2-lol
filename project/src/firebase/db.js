import firebase from 'firebase/app'
import 'firebase/firestore'

export const db = firebase
  .initializeApp({ projectId: 'MY PROJECT ID' })
  .firestore()


const { TimeStamp, GeoPoint } = firebase.firestore
export { TimeStamp, GeoPoint }

db.settings({ timestampsInSnapshots: true })