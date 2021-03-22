import * as usuariosActions from '../actions/usuarios.actions';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { of } from 'rxjs';

@Injectable()
export class UsuariosEffects {
	constructor(
		private actions$: Actions,
		private usuariosSvc: UsuarioService
	) { }

	cargarUsuarios$ = createEffect(
		() => this.actions$.pipe(
			ofType(usuariosActions.cargarUsuarios),
			mergeMap(
				() => this.usuariosSvc.getUsers()
					.pipe(
						map(usuarios => usuariosActions.cargarUsuariosSuccess({ usuarios })),
						catchError(err => of(usuariosActions.cargarUsuariosError({ payload: err })))
					)
			)
		)
	);
}