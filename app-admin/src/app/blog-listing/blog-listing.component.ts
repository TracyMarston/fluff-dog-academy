import { Component, OnInit, Input  } from '@angular/core';
import { Router } from '@angular/router';

import { BlogDataService } from '../services/blog-data.service';
import { Blog } from '../models/blog';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-blog-listing',
  templateUrl: './blog-listing.component.html',
  styleUrls: ['./blog-listing.component.css'],
  providers: [BlogDataService]
})
export class BlogListingComponent implements OnInit {

  
  blogs: Blog[];
  message: string;





  constructor(
    private blogDataService: BlogDataService,
    private router: Router,
    private authenticationService: AuthenticationService) { }


  private addBlog(): void {
    this.router.navigate(['add-blog']);
  }
    
  private getBlogs(): void {
    console.log('Inside Inside Blog Listing Component #GetBlogs');
    this.message = 'Searching for blogs';
    this.blogDataService
      .getBlogs()
      .then(foundBlogs => {
        this.message = foundBlogs.length > 0 ? '' : 'No blogs found';
        this.blogs = foundBlogs;
        console.log(foundBlogs);
      });
  }


  ngOnInit() {
    this.getBlogs();
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn(); }
  
    private editBlog(blog: Blog): void {
    localStorage.removeItem("blogCode");
    localStorage.setItem("blogCode", blog.articlecode);
    this.router.navigate(["edit-blog"]);
  }

  private viewBlog(blog: Blog): void {

    localStorage.removeItem("blogCode");
    localStorage.setItem("blogCode", blog.articlecode);
    this.router.navigate(["blog-detail"]);
  }


  private deleteBlog(blog: Blog): void {
    console.log('CLICKED DELETE' + blog.articlecode);
    localStorage.removeItem("blogCode");
    localStorage.setItem("blogCode", blog.articlecode);

    this.blogDataService.deleteBlog(blog.articlecode)
    .then( data => {
      console.log(data);
      this.getBlogs();
      this.router.navigate(['blog']);
    });


  
  }
  
}
