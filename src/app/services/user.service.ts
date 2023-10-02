import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { env as environment } from '../env/env.dev';
import { User } from '../_models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.BASE_URL}/users`);
    }
}