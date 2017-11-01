import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { environment } from '../../environments/environment';
import * as firebase from 'firebase';

import { Upload } from './models/upload';

@Injectable()
export class UploadService {

  // private basePath: string = '/uploads';
  private basePath: string = '/recipes';
  uploads: FirebaseListObservable<Upload[]>;

  constructor(
    // private af: AngularFire,
    private db: AngularFireDatabase) { }

  pushUpload(upload: Upload, key) {

    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${key}`).put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>  {
        // upload in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
        upload.progress = (snap.bytesTransferred / snap.totalBytes) * 100
      },
      (error) => {
        // upload failed
        console.log(error)
      },
      () => {
        // upload success
        upload.url = uploadTask.snapshot.downloadURL;
        upload.name = upload.file.name;
        upload.key = key;
        this.saveFileData(upload, key)
      }
    );
  }

  // Writes the file details to the realtime db
  private saveFileData(upload: Upload, key) {
    const refRecipe =  firebase.database().ref('recipes/' + key);
    // this.db.list(`${this.basePath}/${key}`).set(upload);
    refRecipe.child('image').set(upload);
  }

  public deleteFileData(key) {

    // Create a reference to the file to delete
    const storageRef = firebase.storage().ref();
    const desertRef = storageRef.child(`${this.basePath}/${key}`)

    // Delete the file
    desertRef.delete().then(function() {
      // File deleted successfully
    }).catch(function(error) {
      // Uh-oh, an error occurred!
    });
  }
}
