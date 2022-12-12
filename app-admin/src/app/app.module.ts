import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-router.module';



import { TrainerListingComponent } from './trainer-listing/trainer-listing.component';
import { TrainerDataService } from './services/trainer-data.service';
import { AddTrainerComponent } from './add-trainer/add-trainer.component';
import { EditTrainerComponent } from './edit-trainer/edit-trainer.component';
import { BlogListingComponent } from './blog-listing/blog-listing.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { BlogDataService } from './services/blog-data.service';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { DeleteBlogComponent } from './delete-blog/delete-blog.component';
import { PermissionService } from './services/permission.service';
import { ClassComponent } from './class/class.component';

@NgModule({
  declarations: [
    AppComponent,
    TrainerListingComponent,
    AddTrainerComponent,
    EditTrainerComponent,
    BlogListingComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    AddBlogComponent,
    EditBlogComponent,
    BlogDetailComponent,
    DeleteBlogComponent,
    ClassComponent 
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    TrainerDataService,
    BlogDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
