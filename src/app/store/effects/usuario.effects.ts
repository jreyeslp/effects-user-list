import * as usuarioActions from '../actions';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { of } from 'rxjs';

@Injectable()
export class UsuarioEffects {
	constructor(
		private actions$: Actions,
		private usuariosSvc: UsuarioService
	) { }

	cargarUsuario$ = createEffect(
		() => this.actions$.pipe(
			ofType(usuarioActions.cargarUsuario),
			tap(action => console.log('action: ', action)),
			mergeMap(
				(action) => this.usuariosSvc.getUserById(action.id)
					.pipe(
						tap(usuario => console.log(usuario)),
						map(usuario => usuarioActions.cargarUsuarioSuccess({ usuario })),
						catchError(err => of(usuarioActions.cargarUsuarioError({ payload: err })))
					)
			)
		)
	);
}