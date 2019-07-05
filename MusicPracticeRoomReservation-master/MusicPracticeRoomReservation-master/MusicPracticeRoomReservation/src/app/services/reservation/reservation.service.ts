import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reservation } from 'src/app/models/reservation';
import { map } from 'rxjs/operators';
import { Payment } from 'src/app/models/payment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private url: string = "http://localhost:8081/reservation/"

  constructor(private http: HttpClient) { }
  
  insertReservation(reservation: Reservation) {
    return this.http.post(this.url, reservation).pipe(map(
      (response : any) => { return response },
      error => console.log('oops', error)
    ))
  }

  getReservation(date : string, room_id : number){
    return this.http.post(this.url+"get/"+room_id ,date).pipe(map(
      (response : any) => { return response },
      error => console.log('oops', error)
    ))
  }

  getAllReservation(){
    return this.http.get(this.url).pipe(map(
      (response : any) => { return response },
      error => console.log('oops', error)
    ))
  }

  getReservationByDate(date : string){
    return this.http.post(this.url+"/date/",date).pipe(map(
      (response : any) => { return response },
      error => console.log('oops', error)
    ))
  }

  getReservationByUserId(user_id : number){
    return this.http.get(this.url+"user/"+user_id).pipe(map(
      (response : any) => { return response },
      error => console.log('oops', error)
    ))
  }

  getReservationForUser(date : string, user_id : number){
    return this.http.post(this.url+"foruser/"+user_id ,date).pipe(map(
      (response : any) => { return response },
      error => console.log('oops', error)
    ))
  }

  updateReservation(reservation : Reservation){
    return this.http.put(this.url ,reservation).pipe(map(
      (response : any) => { return response },
      error => console.log('oops', error)
    ))
  }

  getPayment(payment : Payment){
    return this.http.post(this.url + "payment/get/", payment)
  }

  upLoadPayment(img : File , paymnet : Payment){
    const formData = new FormData();
    formData.append('file', img[0]);
    formData.append('date', paymnet.date);
    formData.append('user_id', paymnet.user_id+"");
    formData.append('reserve_id', paymnet.reserve_id+"");
    return this.http.post(this.url+"payment/",formData).pipe(map(
      (response : any) => { return response },
      error => console.log('oops', error)
    ))
  }

  getUserReport(){
    return this.http.get(this.url+"/userreport/").pipe();
  }

}
