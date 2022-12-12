import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainerListingComponent } from './trainer-listing/trainer-listing.component';
import { AddTrainerComponent } from './add-trainer/add-trainer.component';
import { EditTrainerComponent } from './edit-trainer/edit-trainer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { BlogListingComponent } from './blog-listing/blog-listing.component';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { DeleteBlogComponent } from './delete-blog/delete-blog.component';
import { ClassComponent } from './class/class.component';

const routes: Routes = [
    { path: 'add-trainer', component: AddTrainerComponent },
    { path: 'edit-trainer', component: EditTrainerComponent},
    { path: 'trainers', component: TrainerListingComponent},
    { path: 'blog-detail', component: BlogDetailComponent},
    { path: 'delete-blog', component: DeleteBlogComponent},
    { path: 'blog', component: BlogListingComponent},
    { path: 'add-blog', component: AddBlogComponent},
    { path: 'edit-blog', component: EditBlogComponent},
    { path: 'classes', component: ClassComponent},
    { path: 'login', component: LoginComponent},
    { path: '', component: HomeComponent, pathMatch: 'full' }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }