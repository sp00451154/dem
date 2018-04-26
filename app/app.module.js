"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/common/http");
// used to create fake backend
var index_1 = require("./_helpers/index");
var app_component_1 = require("./app.component");
var app_routing_1 = require("./app.routing");
var app_header_component_1 = require("./app.header.component");
var app_footer_component_1 = require("./app.footer.component");
var index_2 = require("./_directives/index");
var index_3 = require("./_guards/index");
var index_4 = require("./_helpers/index");
var index_5 = require("./_services/index");
var index_6 = require("./home/index");
var index_7 = require("./login/index");
var index_8 = require("./register/index");
var ng2_img_tools_1 = require("ng2-img-tools");
var ng2_file_input_1 = require("ng2-file-input");
var app_image_component_1 = require("./app.image.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpClientModule,
                app_routing_1.routing,
                ng2_file_input_1.Ng2FileInputModule.forRoot(),
                ng2_img_tools_1.Ng2ImgToolsModule
            ],
            declarations: [
                app_component_1.AppComponent,
                app_image_component_1.AppImageComponent,
                app_header_component_1.HeaderComponent,
                app_footer_component_1.FooterComponent,
                index_2.AlertComponent,
                index_6.HomeComponent,
                index_7.LoginComponent,
                index_8.RegisterComponent
            ],
            providers: [
                index_3.AuthGuard,
                index_5.AlertService,
                index_5.AuthenticationService,
                index_5.UserService,
                {
                    provide: http_1.HTTP_INTERCEPTORS,
                    useClass: index_4.JwtInterceptor,
                    multi: true
                },
                // provider used to create fake backend
                index_1.fakeBackendProvider
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map