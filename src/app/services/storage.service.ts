import { Injectable } from '@angular/core';
import { LocalUser } from '../model/dto/local_user';
import { STORAGE_KEYS } from '../model/dto/storage_keys.config';
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  //obtem um usuario armazenado no LocalStorage
  getLocalUser(): LocalUser {

    let usr = localStorage.getItem(STORAGE_KEYS.localUser);
    if (usr == null) {
      return null as any;
    } else {
      return JSON.parse(usr);
    }
  }

  //seta um usuario e armazena no localStorage
  setLocalUser(obj: LocalUser) {

    if (obj == null) {
      localStorage.removeItem(STORAGE_KEYS.localUser);
    } else {
      localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
    }

  }
}
