import { Injectable, Inject } from "@angular/core";
import { Http, Headers } from '@angular/http';

import { Blog } from "../models/blog";
import { BROWSER_STORAGE } from "../storage";
import { User } from "../models/user";
import { AuthResponse } from "../models/authresponse";

@Injectable()
export class BlogDataService {

  constructor(private http: Http,
    @Inject(BROWSER_STORAGE) private storage: Storage) { }



  private apiBaseUrl = "http://localhost:3000/api/";
  private blogUrl = `${this.apiBaseUrl}blogs/`;




  public getBlogs(): Promise<Blog[]> {
    console.log("Inside BlogDataService#getBlogs");
    return this.http
      .get(`${this.apiBaseUrl}blogs`)
      .toPromise()
      .then((response) => response.json() as Blog[])
      .catch(this.handleError);
  }

  public getBlog(blogCode: string): Promise<Blog> {
    console.log('Inside BlogDataService#getBlog' + blogCode);
    return this.http
      .get(this.blogUrl + blogCode)
      .toPromise()
      .then(response => response.json() as Blog)
      .catch(this.handleError);
  }

  public deleteBlog(blogCode: string): Promise<Blog> {
    console.log('Inside BlogDataService#deleteBlog' + blogCode);
    const headers = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("fluff-token")}`,
    });
    return this.http
      .delete(this.blogUrl + 'delete/' + blogCode,  {headers: headers })
      .toPromise()
      .then((response) => response.json() as Blog)
      .catch(this.handleError);
  }

  public addBlog(formData: Blog): Promise<Blog> {
    console.log('Inside BlogDataService#addBlog CODE');
    const headers = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("fluff-token")}`,
    });
    return this.http
      .post(this.blogUrl, formData, { headers: headers })
      .toPromise()
      .then((response) => response.json() as Blog[])
      .catch(this.handleError);
  }

  public updateBlog(formData: Blog): Promise<Blog[]> {
    console.log("Inside BlogDataService#updateBlog");
    const headers = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("fluff-token")}`,
    });
    return this.http
      .put(this.blogUrl + formData.articlecode, formData, { headers: headers })
      .toPromise()
      .then((response) => response.json() as Blog[])
      .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.error("Something has gone wrong", error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  public login(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall("login", user);
  }

  public register(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall("register", user);
  }

  private makeAuthApiCall(urlPath: string, user: User): Promise<AuthResponse> {
    const url: string = `${this.apiBaseUrl}/${urlPath}`;
    return this.http
      .post(url, user)
      .toPromise()
      .then((response) => response.json() as AuthResponse)
      .catch(this.handleError);
  }
}
