import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  imgUrlList = [];
  files: File[] = [];
  uploadFile(files: FileList) {
    // Đẩy vào Input type file rồi từ đó sinh ra các Child Component image-upload
    if (this.files.length <= 5) {
      for (let i = 0; i < files.length; i++) {
        const file = files.item(i);
        if (file.size <= 10485760) {
          if (this.files.findIndex(data => data.name === file.name) < 0) {
            this.files.push(file);
          }
        } else {
          alert('Ảnh quá lớn');
        }
      }
    } else {
      alert('Đã quá số lượng ảnh cho phép');
    }
  }

  deleteAttachment(event: any) {
     this.files.splice(event.index, 1);
     const index = this.imgUrlList.indexOf(event.downloadURL, 0);
     this.imgUrlList.splice(index, 1);
     alert(this.imgUrlList.length);
  }

  pushUrlToList(image: any) {
    if (image) {
      this.imgUrlList.push(image.downloadURL);
    }
  }
}
