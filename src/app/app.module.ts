import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DndComponent } from './dnd/dnd.component';
import { DndDirective } from './dnd/dnd.directive';
import { DetailsUploadComponent } from './details-upload/details-upload.component';
import { ListUploadComponent } from './list-upload/list-upload.component';
import { FormUploadComponent } from './form-upload/form-upload.component';
import { UploadFileService } from './upload-file.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    DndComponent,
    DndDirective,
    ListUploadComponent,
    FormUploadComponent,
    DetailsUploadComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [UploadFileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
