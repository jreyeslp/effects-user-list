import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsArray } from './store/effects/index';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { UsuariosModule } from './usuarios/usuarios.module';
import { appReducers } from './store/app.reducers';
import { environment } from '../environments/environment.prod';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		SharedModule,
		UsuariosModule,
		HttpClientModule,
		StoreModule.forRoot(appReducers),
		StoreDevtoolsModule.instrument({
			maxAge: 25,
			logOnly: environment.production
		}),
		EffectsModule.forRoot(EffectsArray)
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
