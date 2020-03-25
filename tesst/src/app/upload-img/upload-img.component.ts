import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as firebase from 'firebase';
import {environment} from '../../environments/environment';
firebase.initializeApp(environment.firebaseConfig);
@Component({
  selector: 'app-upload-img',
  templateUrl: './upload-img.component.html',
  styleUrls: ['./upload-img.component.css']
})
export class UploadImgComponent implements OnInit {
  imgURl: string;
  @Input() file: File;
  @Input() index;
  @Output() outputLinkURL = new EventEmitter<any>();
  @Output() deleteImage = new EventEmitter<any>();
  uploadProgress: number;

  constructor() {
  }

  ngOnInit(): void {
    this.upload();
  }

  upload() {
    const metadata = {
      contentType: 'image',
    };
    const uploadTask = firebase.storage().ref('/img/' + Date.now()).put(this.file, metadata);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        this.uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        alert('that bai');
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          this.imgURl = downloadURL;
          this.outputLinkURL.emit({imgURl: this.imgURl});
        });
      });
  }

  deleteAttachment() {
    // Get a reference to the storage service, which is used to create references in your storage bucket
    const storageRef = firebase.storage().refFromURL(this.imgURl);
    storageRef.delete().then(() => {
      // File deleted successfully
    }).catch((error) => {
      // Uh-oh, an error occurred!
    });
    this.deleteImage.emit({index: this.index, downloadURL: this.imgURl});
  }
}
