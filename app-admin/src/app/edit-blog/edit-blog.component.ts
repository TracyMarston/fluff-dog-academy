import { Component, OnInit } from '@angular/core';
import { b } from '@angular/core/src/render3';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { BlogDataService } from "../services/blog-data.service";

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {
  
  editBlogForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private blogService: BlogDataService
  ) { }

  ngOnInit() {
     // retrieve stashed blogId
     let blogCode = localStorage.getItem("blogCode");
     if (!blogCode) {
       alert("Something wrong, couldn't find where I stashed blogCode!");
       this.router.navigate(['']);
       return;
     }
     console.log('EditBlogComponent#onInit found blogCode ' + blogCode);
 
     // initialize form
     this.editBlogForm = this.formBuilder.group({
      _id: [],
      articlecode: [blogCode, Validators.required], 
      category: ['', Validators.required],
      authorimage: ['', Validators.required], 
      authorfirstname: ['', Validators.required],
      authorlastname: ['', Validators.required], 
      authorbio: ['', Validators.required], 
      blogtitle: ['', Validators.required], 
      blogdate: ['', Validators.required],
      blogimage: ['', Validators.required],
      blogshortdesc: ['', Validators.required],
      bloglongdesc: ['', Validators.required],
     
    });


    console.log('EditBlogComponent#onInit calling BlogDataService#getBlog(\'' + blogCode + '\')');
    this.blogService.getBlog(blogCode)
      .then(data => {
        console.log('RESPONSE' );
        console.log(data);
       
        
        // Don't use editBlogForm.setValue() as it will throw console error
        this.editBlogForm.patchValue(data);
    })
  }
  onSubmit() {
    this.submitted = true;
   

    //if (this.editBlogForm.valid) {
      this.blogService.updateBlog(this.editBlogForm.value)
        .then(data => {
          console.log(data);
          this.router.navigate(['blog']);
      });
    //}
  }

  f() { return this.editBlogForm.controls; }
}

