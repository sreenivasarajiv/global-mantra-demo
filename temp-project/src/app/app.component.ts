import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  fileToUpload: File = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
  }

  userForm = this.fb.group({
    name: new FormControl(''),
    email: new FormControl('', Validators.email),
  })

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  onSubmit(formValue) {
    const formData: FormData = new FormData();
    formData.append('profilePic', this.fileToUpload, this.fileToUpload.name);
    formData.append('name', formValue.name);
    formData.append('email', formValue.email);
    console.log(formValue);
    console.log(formData);
    this.http.post('http://localhost:3000/api/product/create-user', formData).subscribe(result => {
      console.log(result);
    }, err => {
      console.error(err);
    });
  }
}
