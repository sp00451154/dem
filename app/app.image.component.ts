import { Component, NgZone } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Ng2ImgToolsService } from 'ng2-img-tools';

@Component({
  selector: 'my-app',
  template: `
    <div class="container">
      <h2>ng2-img-tools / ng2-img-max demo</h2>
      <br /><br />
      <ng2-file-input (onAction)="fileChange($event)" [multiple]="false"></ng2-file-input>
      <br /><br />
      <h6>Click on any image to open it in a new tab (AdBlock may have to be paused)</h6>
      <hr />
      <div class="row">
        <div class="col-4">
          Your selected image: <br />
          <a [href]="selectedImageTrusted" target="_blank" *ngIf="selectedImage">
            <img [src]="selectedImageTrusted" class="img-thumbnail">
          </a>
        </div>
        <div class="col-4">
          Resized (img-tools & img-max): <br />
          <a [href]="resizedImageTrusted" target="_blank" *ngIf="resizedImage && resizedImage!=='processing'">
            <img [src]="resizedImageTrusted" class="img-thumbnail">
          </a>
          <i *ngIf="resizedImage==='processing'" class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
        </div>
        <div class="col-4">
          Compressed (img-tools & img-max): <br />
          <a [href]="compressedImageTrusted" target="_blank" *ngIf="compressedImage && compressedImage!=='processing'">
            <img [src]="compressedImageTrusted" class="img-thumbnail">
          </a>
          <i *ngIf="compressedImage==='processing'" class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
        </div>
      </div>
      <hr />
      <div class="row">
        <div class="col-4">
          Cropped (img-tools): <br />
          <a [href]="croppedImageTrusted" target="_blank" *ngIf="croppedImage && croppedImage!=='processing'">
            <img [src]="croppedImageTrusted" class="img-thumbnail">
          </a>
          <i *ngIf="croppedImage==='processing'" class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
        </div>
        <div class="col-4">
          Resized exact, cropped to fit (img-tools): <br />
          <a [href]="resizedExactCroppedImageTrusted" target="_blank" *ngIf="resizedExactCroppedImage && resizedExactCroppedImage!=='processing'">
            <img [src]="resizedExactCroppedImageTrusted" class="img-thumbnail">
          </a>
          <i *ngIf="resizedExactCroppedImage==='processing'" class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
        </div>
        <div class="col-4">
          Resized exact, filled to fit (img-tools): <br />
          <a [href]="resizedExactFilledImageTrusted" target="_blank" *ngIf="resizedExactFilledImage && resizedExactFilledImage!=='processing'">
            <img [src]="resizedExactFilledImageTrusted" class="img-thumbnail">
          </a>
          <i *ngIf="resizedExactFilledImage==='processing'" class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
        </div>
      </div>
    </div>
  `,
})
export class AppImageComponent {
  resizedImage:string=null;
  compressedImage:string=null;
  selectedImage:string=null;
  croppedImage:string=null;
  resizedExactCroppedImage:string=null;
  resizedExactFilledImage:string=null;
  resizedImageTrusted:SafeUrl=null;
  compressedImageTrusted:SafeUrl=null;
  selectedImageTrusted:SafeUrl=null;
  croppedImageTrusted:any=null;
  resizedExactCroppedImageTrusted:any=null;
  resizedExactFilledImageTrusted:any=null;
  constructor(private ng2ImgToolsService: Ng2ImgToolsService, private sanitizer: DomSanitizer, private zone: NgZone) {
  }
  public fileChange(event: any){
    if(event.currentFiles.length>0){
      this.processFile(event.currentFiles[0]);
    }
  }
  private processFile(file:File){
      if(this.resizedImage !== null){
        window.URL.revokeObjectURL(this.resizedImage);
      }
      if(this.compressedImage !== null){
        window.URL.revokeObjectURL(this.compressedImage);
      }
      if(this.selectedImage !== null){
        window.URL.revokeObjectURL(this.selectedImage);
      }
      if(this.croppedImage !== null){
        window.URL.revokeObjectURL(this.croppedImage);
      }
      if(this.resizedExactCroppedImage !== null){
        window.URL.revokeObjectURL(this.resizedExactCroppedImage);
      }
      if(this.resizedExactFilledImage !== null){
        window.URL.revokeObjectURL(this.resizedExactFilledImage);
      }
      this.resizedImage="processing";
      this.compressedImage="processing";
      this.croppedImage="processing";
      this.resizedExactCroppedImage="processing";
      this.resizedExactFilledImage="processing";
      this.selectedImage=window.URL.createObjectURL(file);
      this.selectedImageTrusted=this.sanitizer.bypassSecurityTrustUrl(this.selectedImage);
      this.compressImage(file);
      this.resizeImage(file);
      this.cropImage(file);
      this.resizeExactCropImage(file);
      this.resizeExactFillImage(file);
  }
  private compressImage(file:File){
    console.info("Starting compression for file:", file);
    this.ng2ImgToolsService.compress([file], 0.3).subscribe( result =>{
        console.log("Compression result:", result);
        //all good
        this.compressedImage=window.URL.createObjectURL(result);
        this.compressedImageTrusted=this.sanitizer.bypassSecurityTrustUrl(this.compressedImage);
       }, error => {
            console.error("Compression error:", error);
       }
    );
  }
  private resizeImage(file:File){
    console.info("Starting resize for file:", file);
    this.ng2ImgToolsService.resize([file], 400, 500).subscribe( result =>{
        console.log("Resize result:", result);
        //all good
        this.resizedImage=window.URL.createObjectURL(result);
        this.resizedImageTrusted=this.sanitizer.bypassSecurityTrustUrl(this.resizedImage);
       }, error => {
            console.error("Resize error:", error);
       }
    );
  }
  private cropImage(file:File){
    console.info("Starting crop for file:", file);
    this.ng2ImgToolsService.crop([file], 400, 500).subscribe( result =>{
        console.log("Crop result:", result);
        //all good
        this.croppedImage=window.URL.createObjectURL(result);
        this.croppedImageTrusted=this.sanitizer.bypassSecurityTrustUrl(this.croppedImage);
       }, error => {
            console.error("Cropping error:", error);
       }
    );
  }
  private resizeExactCropImage(file:File){
    console.info("Starting resize exact crop for file:", file);
    this.ng2ImgToolsService.resizeExactCrop([file], 180, 100).subscribe( result =>{
        console.log("Resize exact crop result:", result);
        //all good
        this.zone.run(()=>{
          this.resizedExactCroppedImage=window.URL.createObjectURL(result);
          this.resizedExactCroppedImageTrusted=this.sanitizer.bypassSecurityTrustUrl(this.resizedExactCroppedImage);
        });
       }, error => {
            console.error("Resize exact crop error:", error);
       }
    );
  }
  private resizeExactFillImage(file:File){
    console.info("Starting resize exact fill for file:", file);
    this.ng2ImgToolsService.resizeExactFill([file], 180, 100).subscribe( result =>{
        console.log("Resize exact fill result:", result);
        //all good
        this.zone.run(()=>{
          this.resizedExactFilledImage=window.URL.createObjectURL(result);
          this.resizedExactFilledImageTrusted=this.sanitizer.bypassSecurityTrustUrl(this.resizedExactFilledImage);
        });
       }, error => {
            console.error("Resize exact fill error:", error);
       }
    );
  }
}