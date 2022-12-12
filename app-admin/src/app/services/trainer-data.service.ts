import { Injectable, Inject } from "@angular/core";
import { Http, Headers } from '@angular/http';

import { Trainer } from "../models/trainer";
import { BROWSER_STORAGE } from "../storage";
import { User } from "../models/user";
import { AuthResponse } from "../models/authresponse";

@Injectable()
export class TrainerDataService {

  constructor( private http: Http,
    @Inject(BROWSER_STORAGE) private storage: Storage) {}
  
  

    private apiBaseUrl = "http://localhost:3000/api/";
    private trainerUrl = `${this.apiBaseUrl}trainers/`;




    public getTrainers(): Promise<Trainer[]> {
      console.log("Inside TrainerDataService#getTrainers");
      return this.http
        .get(`${this.apiBaseUrl}trainers`)
        .toPromise()
        .then((response) => response.json() as Trainer[])
        .catch(this.handleError);
    }

    public getTrainer(trainerCode: string): Promise<Trainer> {
      console.log('Inside TrainerDataService#getTrainer' + trainerCode );
      return this.http
        .get(this.trainerUrl + trainerCode)
        .toPromise()
        .then(response => response.json() as Trainer)
        .catch(this.handleError);
    }

    public addTrainer(formData: Trainer): Promise<Trainer> {
      console.log('Inside TrainerDataService#addTrainer CODE');
      const headers = new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("fluff-token")}`,
      });
      return this.http
        .post(this.trainerUrl, formData, { headers: headers })
        .toPromise()
        .then((response) => response.json() as Trainer[])
        .catch(this.handleError);
    }

    public deleteTrainer(trainerCode: string): Promise<Trainer> {
      console.log('Inside TrainerDataService#deleteTrainer' + trainerCode);
      const headers = new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("fluff-token")}`,
      });
      return this.http
        .delete(this.trainerUrl + 'delete/' + trainerCode,  {headers: headers })
        .toPromise()
        .then((response) => response.json() as Trainer)
        .catch(this.handleError);
    }

    public updateTrainer(formData: Trainer): Promise<Trainer[]> {
      console.log("Inside TrainerDataService#updateTrainer");
      const headers = new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("fluff-token")}`,
      });
      return this.http
        .put(this.trainerUrl + formData.code, formData, { headers: headers })
        .toPromise()
        .then((response) => response.json() as Trainer[])
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
