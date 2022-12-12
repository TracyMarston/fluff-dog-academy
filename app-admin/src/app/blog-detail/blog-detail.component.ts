import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { BlogDataService } from "../services/blog-data.service";
import { AuthenticationService } from '../services/authentication.service';
import { Blog } from '../models/blog';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {
  selectedBlogPost: Blog;
  convertHTML: string;



  constructor( private router: Router,
    private blogService: BlogDataService,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {

 
      // retrieve stashed blogId
      let blogCode = localStorage.getItem("blogCode");
      if (!blogCode) {
        alert("Something wrong, couldn't find where I stashed blogCode!");
        this.router.navigate(['']);
        return;
      }
      console.log('DetailBlogComponent#onInit found blogCode ' + blogCode);

      console.log('DetailBlogComponent#onInit calling BlogDataService#getBlog(\'' + blogCode + '\')');
      this.blogService.getBlog(blogCode)
        .then(blogEntry => {
          this.selectedBlogPost = blogEntry;
         
          console.log('DETAIL VIEW' );
          console.log(blogEntry);
         
          this.convertHTML = this.selectedBlogPost.bloglongdesc;

        
      })


      

  }
  


  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn(); }
  

  
}
