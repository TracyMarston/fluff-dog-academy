import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { BlogDataService } from '../services/blog-data.service';
@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {
  addBlogForm: FormGroup;
  submitted = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private blogService: BlogDataService) { }


  ngOnInit() {
    this.addBlogForm = this.formBuilder.group({
        _id: [],
        articlecode: ['', Validators.required], 
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

  
    })
  }
  onSubmit() {
    this.submitted = true;
    if(this.addBlogForm.valid){
    this.blogService.addBlog(this.addBlogForm.value)
    .then( data => {
      console.log(data);
      this.router.navigate(['blog']);
    });
  }
}

// get the form short name to access the form fields
get f() { return this.addBlogForm.controls; }
}