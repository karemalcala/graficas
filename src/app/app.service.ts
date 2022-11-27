import { Injectable } from '@angular/core';
import { Firestore, doc, docData } from '@angular/fire/firestore'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private _firestore: Firestore) { }

  getUser1(db: any = this._firestore): Observable<any> {
    const userRef = doc(db, 'investmentEvolutions/user1')
    return docData(userRef) as Observable<any>
  }
}
