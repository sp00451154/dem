import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// used to create fake backend
import { fakeBackendProvider } from './_helpers/index';
import { AppComponent }  from './app.component';
import { routing }        from './app.routing';
import { HeaderComponent }  from './app.header.component';
import { FooterComponent }  from './app.footer.component';
import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { JwtInterceptor } from './_helpers/index';
import { AlertService, AuthenticationService, UserService } from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { Ng2ImgToolsModule  } from 'ng2-img-tools'
import { Ng2FileInputModule } from 'ng2-file-input';
import { AppImageComponent } from './app.image.component'

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        routing,
        Ng2FileInputModule.forRoot(), 
        Ng2ImgToolsModule 
    ],
    declarations: [
        AppComponent,
        AppImageComponent,
        HeaderComponent,
        FooterComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        },

        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }