import { Component, OnInit, Input  } from '@angular/core';
import { Router } from '@angular/router';

import { TrainerDataService } from '../services/trainer-data.service';
import { Trainer } from '../models/trainer';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-trainer-listing',
  templateUrl: './trainer-listing.component.html',
  styleUrls: ['./trainer-listing.component.css'],
  providers: [TrainerDataService]
})
export class TrainerListingComponent implements OnInit {

  
  trainers: Trainer[];
  message: string;





  constructor(
    private trainerDataService: TrainerDataService,
    private router: Router,
    private authenticationService: AuthenticationService) { }


  private addTrainer(): void {
    this.router.navigate(['add-trainer']);
  }
    
  private getTrainers(): void {
    console.log('Inside Inside Trainer Listing Component #GetTrainers');
    this.message = 'Searching for trainers';
    this.trainerDataService
      .getTrainers()
      .then(foundTrainers => {
        this.message = foundTrainers.length > 0 ? '' : 'No trainers found';
        this.trainers = foundTrainers;
        console.log(foundTrainers);
      });
  }


  ngOnInit() {
    this.getTrainers();
    
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn(); }
  



    private editTrainer(trainer: Trainer): void {
    localStorage.removeItem("trainerCode");
    localStorage.setItem("trainerCode", trainer.code);
    this.router.navigate(["edit-trainer"]);
  }
  private deleteTrainer(trainer: Trainer): void {
    console.log('CLICKED DELETE' +trainer.code);
    localStorage.removeItem("trainerCode");
    localStorage.setItem("trainerCode", trainer.code);

    this.trainerDataService.deleteTrainer(trainer.code)
    .then( data => {
      console.log(data);
      this.getTrainers();
      this.router.navigate(['trainers']);
    });
  }

}
