"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var ng2_img_tools_1 = require("ng2-img-tools");
var AppImageComponent = /** @class */ (function () {
    function AppImageComponent(ng2ImgToolsService, sanitizer, zone) {
        this.ng2ImgToolsService = ng2ImgToolsService;
        this.sanitizer = sanitizer;
        this.zone = zone;
        this.resizedImage = null;
        this.compressedImage = null;
        this.selectedImage = null;
        this.croppedImage = null;
        this.resizedExactCroppedImage = null;
        this.resizedExactFilledImage = null;
        this.resizedImageTrusted = null;
        this.compressedImageTrusted = null;
        this.selectedImageTrusted = null;
        this.croppedImageTrusted = null;
        this.resizedExactCroppedImageTrusted = null;
        this.resizedExactFilledImageTrusted = null;
    }
    AppImageComponent.prototype.fileChange = function (event) {
        if (event.currentFiles.length > 0) {
            this.processFile(event.currentFiles[0]);
        }
    };
    AppImageComponent.prototype.processFile = function (file) {
        if (this.resizedImage !== null) {
            window.URL.revokeObjectURL(this.resizedImage);
        }
        if (this.compressedImage !== null) {
            window.URL.revokeObjectURL(this.compressedImage);
        }
        if (this.selectedImage !== null) {
            window.URL.revokeObjectURL(this.selectedImage);
        }
        if (this.croppedImage !== null) {
            window.URL.revokeObjectURL(this.croppedImage);
        }
        if (this.resizedExactCroppedImage !== null) {
            window.URL.revokeObjectURL(this.resizedExactCroppedImage);
        }
        if (this.resizedExactFilledImage !== null) {
            window.URL.revokeObjectURL(this.resizedExactFilledImage);
        }
        this.resizedImage = "processing";
        this.compressedImage = "processing";
        this.croppedImage = "processing";
        this.resizedExactCroppedImage = "processing";
        this.resizedExactFilledImage = "processing";
        this.selectedImage = window.URL.createObjectURL(file);
        this.selectedImageTrusted = this.sanitizer.bypassSecurityTrustUrl(this.selectedImage);
        this.compressImage(file);
        this.resizeImage(file);
        this.cropImage(file);
        this.resizeExactCropImage(file);
        this.resizeExactFillImage(file);
    };
    AppImageComponent.prototype.compressImage = function (file) {
        var _this = this;
        console.info("Starting compression for file:", file);
        this.ng2ImgToolsService.compress([file], 0.3).subscribe(function (result) {
            console.log("Compression result:", result);
            //all good
            _this.compressedImage = window.URL.createObjectURL(result);
            _this.compressedImageTrusted = _this.sanitizer.bypassSecurityTrustUrl(_this.compressedImage);
        }, function (error) {
            console.error("Compression error:", error);
        });
    };
    AppImageComponent.prototype.resizeImage = function (file) {
        var _this = this;
        console.info("Starting resize for file:", file);
        this.ng2ImgToolsService.resize([file], 400, 500).subscribe(function (result) {
            console.log("Resize result:", result);
            //all good
            _this.resizedImage = window.URL.createObjectURL(result);
            _this.resizedImageTrusted = _this.sanitizer.bypassSecurityTrustUrl(_this.resizedImage);
        }, function (error) {
            console.error("Resize error:", error);
        });
    };
    AppImageComponent.prototype.cropImage = function (file) {
        var _this = this;
        console.info("Starting crop for file:", file);
        this.ng2ImgToolsService.crop([file], 400, 500).subscribe(function (result) {
            console.log("Crop result:", result);
            //all good
            _this.croppedImage = window.URL.createObjectURL(result);
            _this.croppedImageTrusted = _this.sanitizer.bypassSecurityTrustUrl(_this.croppedImage);
        }, function (error) {
            console.error("Cropping error:", error);
        });
    };
    AppImageComponent.prototype.resizeExactCropImage = function (file) {
        var _this = this;
        console.info("Starting resize exact crop for file:", file);
        this.ng2ImgToolsService.resizeExactCrop([file], 180, 100).subscribe(function (result) {
            console.log("Resize exact crop result:", result);
            //all good
            _this.zone.run(function () {
                _this.resizedExactCroppedImage = window.URL.createObjectURL(result);
                _this.resizedExactCroppedImageTrusted = _this.sanitizer.bypassSecurityTrustUrl(_this.resizedExactCroppedImage);
            });
        }, function (error) {
            console.error("Resize exact crop error:", error);
        });
    };
    AppImageComponent.prototype.resizeExactFillImage = function (file) {
        var _this = this;
        console.info("Starting resize exact fill for file:", file);
        this.ng2ImgToolsService.resizeExactFill([file], 180, 100).subscribe(function (result) {
            console.log("Resize exact fill result:", result);
            //all good
            _this.zone.run(function () {
                _this.resizedExactFilledImage = window.URL.createObjectURL(result);
                _this.resizedExactFilledImageTrusted = _this.sanitizer.bypassSecurityTrustUrl(_this.resizedExactFilledImage);
            });
        }, function (error) {
            console.error("Resize exact fill error:", error);
        });
    };
    AppImageComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n    <div class=\"container\">\n      <h2>ng2-img-tools / ng2-img-max demo</h2>\n      <br /><br />\n      <ng2-file-input (onAction)=\"fileChange($event)\" [multiple]=\"false\"></ng2-file-input>\n      <br /><br />\n      <h6>Click on any image to open it in a new tab (AdBlock may have to be paused)</h6>\n      <hr />\n      <div class=\"row\">\n        <div class=\"col-4\">\n          Your selected image: <br />\n          <a [href]=\"selectedImageTrusted\" target=\"_blank\" *ngIf=\"selectedImage\">\n            <img [src]=\"selectedImageTrusted\" class=\"img-thumbnail\">\n          </a>\n        </div>\n        <div class=\"col-4\">\n          Resized (img-tools & img-max): <br />\n          <a [href]=\"resizedImageTrusted\" target=\"_blank\" *ngIf=\"resizedImage && resizedImage!=='processing'\">\n            <img [src]=\"resizedImageTrusted\" class=\"img-thumbnail\">\n          </a>\n          <i *ngIf=\"resizedImage==='processing'\" class=\"fa fa-spinner fa-spin fa-3x fa-fw\"></i>\n        </div>\n        <div class=\"col-4\">\n          Compressed (img-tools & img-max): <br />\n          <a [href]=\"compressedImageTrusted\" target=\"_blank\" *ngIf=\"compressedImage && compressedImage!=='processing'\">\n            <img [src]=\"compressedImageTrusted\" class=\"img-thumbnail\">\n          </a>\n          <i *ngIf=\"compressedImage==='processing'\" class=\"fa fa-spinner fa-spin fa-3x fa-fw\"></i>\n        </div>\n      </div>\n      <hr />\n      <div class=\"row\">\n        <div class=\"col-4\">\n          Cropped (img-tools): <br />\n          <a [href]=\"croppedImageTrusted\" target=\"_blank\" *ngIf=\"croppedImage && croppedImage!=='processing'\">\n            <img [src]=\"croppedImageTrusted\" class=\"img-thumbnail\">\n          </a>\n          <i *ngIf=\"croppedImage==='processing'\" class=\"fa fa-spinner fa-spin fa-3x fa-fw\"></i>\n        </div>\n        <div class=\"col-4\">\n          Resized exact, cropped to fit (img-tools): <br />\n          <a [href]=\"resizedExactCroppedImageTrusted\" target=\"_blank\" *ngIf=\"resizedExactCroppedImage && resizedExactCroppedImage!=='processing'\">\n            <img [src]=\"resizedExactCroppedImageTrusted\" class=\"img-thumbnail\">\n          </a>\n          <i *ngIf=\"resizedExactCroppedImage==='processing'\" class=\"fa fa-spinner fa-spin fa-3x fa-fw\"></i>\n        </div>\n        <div class=\"col-4\">\n          Resized exact, filled to fit (img-tools): <br />\n          <a [href]=\"resizedExactFilledImageTrusted\" target=\"_blank\" *ngIf=\"resizedExactFilledImage && resizedExactFilledImage!=='processing'\">\n            <img [src]=\"resizedExactFilledImageTrusted\" class=\"img-thumbnail\">\n          </a>\n          <i *ngIf=\"resizedExactFilledImage==='processing'\" class=\"fa fa-spinner fa-spin fa-3x fa-fw\"></i>\n        </div>\n      </div>\n    </div>\n  ",
        }),
        __metadata("design:paramtypes", [ng2_img_tools_1.Ng2ImgToolsService, platform_browser_1.DomSanitizer, core_1.NgZone])
    ], AppImageComponent);
    return AppImageComponent;
}());
exports.AppImageComponent = AppImageComponent;
//# sourceMappingURL=app.image.component.js.map