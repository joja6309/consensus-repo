import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DndComponent } from './dnd/dnd.component';
import { DndDirective } from './dnd/dnd.directive';
import { DetailsUploadComponent } from './details-upload/details-upload.component';
import { ListUploadComponent } from './list-upload/list-upload.component';
import { FormUploadComponent } from './form-upload/form-upload.component';
import { HttpClientModule } from '@angular/common/http';
import { ImageDisplayComponent } from './image-display/image-display.component';
import { DndModule } from 'ng2-dnd';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalContent } from './cons-alg-modal/cons-alg-modal.component';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SliderComponent } from './slider/slider.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UploadFileService } from './upload-file.service';
import { CanvasSelectComponent } from './canvas-select';
import { SelectableDirective } from './selectable.directive'
import { IndexOfPipe } from './shared/pipes/index-of.pipe'
import { EditTextComponent } from './edit-text/edit-text.component'
import { FiltersSelectComponent } from './filters-select/filters-select.component'
import { ImageSelectComponent } from './image-select/image-select.component'
import { LogoSelectComponent } from './logo-select/logo-select.component'
import { SizesSelectComponent } from './sizes-select/sizes-select.component'
import { TextSelectComponent } from './text-select/text-select.component'
import { MoveClampedToParentDirective } from './canvas-select/shared/directives/move-clamped-to-parent.directive'
import { EditableTextComponent } from './canvas-select/shared/overlays/overlay-texts/shared/directives/editable-text'
import { OverlayTextsComponent } from './canvas-select/shared/overlays/overlay-texts'
import { OverlayLogoComponent } from './canvas-select/shared/overlays/overlay-logo/'
import { EditSettingsService } from './edit-settings.service';
import { ImageFilterService } from './image-filter.service';
import { GenerateImageService } from './generate-image.service';
import { ControlPanelComponent } from './control-panel'
import { BackendService } from './backend.service';
import { SquareComponent } from './square/square.component';

import {
  MatCardModule, MatFormFieldModule, MatSliderModule, MatFormFieldControl, MatInputModule
} from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
  declarations: [
  DialogComponent,
    SliderComponent,
    AppComponent,
    HomeComponent,
    DashboardComponent,
    DndComponent,
    DndDirective,
    ListUploadComponent,
    FormUploadComponent,
    DetailsUploadComponent,
    ImageDisplayComponent,
    NgbdModalContent,
    DashboardComponent,
    DetailsUploadComponent, CanvasSelectComponent, SelectableDirective
    , IndexOfPipe, ImageSelectComponent, LogoSelectComponent,
    SizesSelectComponent, TextSelectComponent,
    EditableTextComponent, MoveClampedToParentDirective,
    OverlayLogoComponent, OverlayTextsComponent, ControlPanelComponent, SquareComponent

  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DndModule.forRoot(),
    NgbModule.forRoot(),
    MatFormFieldModule,
    MatInputModule
    ,
    MatSliderModule,
    MatCardModule,
    //MatFormFieldControl,
    BrowserAnimationsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [NgbdModalContent, CanvasSelectComponent,SquareComponent],
  providers: [UploadFileService, EditSettingsService, ImageFilterService, GenerateImageService, BackendService],
  //, EditSettingsService, ImageFilterService, GenerateImageService
  bootstrap: [AppComponent]
})
export class AppModule { }
