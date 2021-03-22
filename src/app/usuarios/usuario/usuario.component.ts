import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { AppState } from '../../store/app.reducers';
import { Store } from '@ngrx/store';
import { Usuario } from '../../models/usuario.model';
import { cargarUsuario } from '../../store/actions/usuario.actions';

@Component({
	selector: 'app-usuario',
	templateUrl: './usuario.component.html',
	styles: [
	]
})
export class UsuarioComponent implements OnInit {

	usuario: Usuario;
	loading = false;
	error: any;

	constructor(
		private router: ActivatedRoute,
		private store: Store<AppState>) { }

	ngOnInit(): void {
		this.store.select('usuario')
			.subscribe(({ user, loading, error }) => {
				this.usuario = user;
				this.loading = loading;
				this.error = error;
			});

		this.router.params
			.subscribe(({ id }) => {
				this.store.dispatch(cargarUsuario({ id }));
			});
	}

}
