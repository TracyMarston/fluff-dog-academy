import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { BlogDataService } from '../services/blog-data.service';
import { Blog } from '../models/blog';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-delete-blog',
  templateUrl: './delete-blog.component.html',
  styleUrls: ['./delete-blog.component.css'],
  providers: [BlogDataService]
})
export class DeleteBlogComponent implements OnInit {
  selectedBlogPost: Blog;
  convertHTML: string;


  constructor(
    private blogDataService: BlogDataService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

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
    this.blogDataService.getBlog(blogCode)
      .then(blogEntry => {
        this.selectedBlogPost = blogEntry;

        console.log('DETAIL VIEW');
        console.log(blogEntry);

        this.convertHTML = this.selectedBlogPost.bloglongdesc;


      })


  }
  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }
}
