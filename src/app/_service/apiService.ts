import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../User.model';
@Injectable({
    providedIn: 'root'
})
export class ApiService {
    public user:Observable<User>;
    private userSubject: BehaviorSubject<User>;
    private apiURL:string = 'https://reqres.in/api/login';
    private dataURL:string = 'https://dummyjson.com/products';

    constructor(private http: HttpClient){
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }
    
    login(email:string, password:string){
        return this.http.post<User>(this.apiURL,{email, password})
        .pipe(map(user => {
            localStorage.setItem('user', JSON.stringify(user));
            this.userSubject.next(user);
            return user;
        }))
    }

    getProducts(){
        return this.http.get(this.dataURL)
    }
}
