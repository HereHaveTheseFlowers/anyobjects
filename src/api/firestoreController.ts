import store from '../utils/Store';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, setDoc  } from 'firebase/firestore/lite';
import type { Firestore, DocumentData } from 'firebase/firestore/lite';
import type { FirebaseApp } from 'firebase/app';
import {  signInWithEmailAndPassword, onAuthStateChanged, signOut  } from 'firebase/auth';
import { getAuth, Auth } from "firebase/auth";
import {  getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD71u_QZkFsr4OXLo7pzll_drU1zED4A6A",
  authDomain: "anyobjects-f24a9.firebaseapp.com",
  projectId: "anyobjects-f24a9",
  storageBucket: "anyobjects-f24a9.appspot.com",
  messagingSenderId: "517309452430",
  appId: "1:517309452430:web:b64660d693011972f6f9df"
};

export type ObjectProps = {
  position: string;
  name: string;
  brand: string;
  price: string;
  category: string;
  description: string;
  additionalinfo: string;
  url: string;
  urltext: string;
  alttext: string;
  mainimage?: any;
  previewimage?: any;
}

export class firestoreController {
  private readonly app: FirebaseApp;
  private readonly db: any;
  private readonly auth: Auth;
  private readonly storage: any;

  constructor() {
    this.app = initializeApp(firebaseConfig);
    this.db = getFirestore(this.app);
    this.auth = getAuth(this.app);
    this.storage =  getStorage();
    
  }
  public async Login(email: string, password: string) {
    try {
      return signInWithEmailAndPassword(this.auth, email, password)
    } catch (e) {
        console.error('Error: ', e);
    }
  }
  public async CheckUser() {
    try {
      onAuthStateChanged(this.auth, (user) => {
        if (user) {
          if(store.getState().auth !== 'admin') {store.set('auth', 'admin')}
        }
      });
    } catch (e) {
        console.error('Error: ', e);
    }
  }
  public async SignOut() {
    try {
      signOut(this.auth).then(() => {
        // Sign-out successful.
            console.log("Signed out successfully")
        }).catch((error) => {
        // An error happened.
        });
    } catch (e) {
        console.error('Error: ', e);
    }
}

  public async updateObjects() {
    const objects = await this.getObjects();
    if (objects) {
      objects.map((object)=> {
        object.mainimage = `https://firebasestorage.googleapis.com/v0/b/anyobjects-f24a9.appspot.com/o/images%2Fmainimage${object.position}?alt=media`
        object.previewimage = `https://firebasestorage.googleapis.com/v0/b/anyobjects-f24a9.appspot.com/o/images%2Fpreviewimage${object.position}?alt=media`
        store.set(`objects.${object.position}`, object)
      })
    }
  }
  private async getObjects() {
    const collectionName = 'objects';
    const blocksCol = collection(this.db, collectionName);
    const blocksSnapshot = await getDocs(blocksCol);
    const blocksArr: DocumentData[] = [];
    blocksSnapshot.docs.map((doc) => {
      const data = doc.data();
      blocksArr.push(data);
    });
    return blocksArr;
  }
  public async writeObject(props: ObjectProps) {
    try {
      const docRef = await setDoc(doc(this.db, "objects", props.position), { ...props });

      const objectRef = doc(this.db, 'objects', props.position);
      setDoc(objectRef, { ...props }, { merge: true });

      this.updateObjects();
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }
  public async writeImage(image: File, name: string) {
    try {
      if(image) {
        const storageRef = ref(this.storage, name);

        uploadBytes(storageRef, image)
      }
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }
  public async deleteObject(position: string) {
    await deleteDoc(doc(this.db, "objects", position));
    this.updateObjects();
  }
}

const controller = new firestoreController();

export default controller;
