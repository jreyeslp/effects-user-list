import { Component, OnInit } from '@angular/core';

import { AppState } from '../../store/app.reducers';
import { Store } from '@ngrx/store';
import { Usuario } from '../../models/usuario.model';
import { cargarUsuarios } from '../../store/actions/usuarios.actions';

@Component({
	selector: 'app-lista',
	templateUrl: './lista.component.html',
	styles: [
	]
})
export class ListaComponent implements OnInit {

	usuarios: Usuario[] = [];
	loading = false;
	error: any;

	constructor(private store: Store<AppState>) { }

	ngOnInit(): void {
		this.store.select('usuarios')
			.subscribe(({ users, loading, error }) => {
				this.usuarios = users;
				this.loading = loading;
				this.error = error;
			});

		this.store.dispatch(cargarUsuarios());
	}

}
