import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { Reservation_Room } from 'src/app/models/reservation_room';
import { Reservation_Record } from 'src/app/models/reservation_record';
import { Payment } from 'src/app/models/payment';
import { Reservation } from 'src/app/models/reservation';
import { LoginService } from 'src/app/services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  items: MenuItem[];
  activeIndex: number = 0;
  nowDate = new Date();
  role: string;
  reservations: Array<Reservation_Record> = [];
  image: File;
  addimage_status: boolean = false;
  payment: Payment
  payment_img: Array<string> = []


  constructor(private reservationservice: ReservationService, private loginservice : LoginService,
              private router : Router) { }

  ngOnInit() {
    this.items = [
      { label: 'รอชำระเงิน' },
      { label: 'รอตรวจสอบ' },
      { label: 'เสร็จสมบูรณ์' }
    ];
    this.loadReservation();
    this.role = localStorage.getItem('role');
  }

  parseDate(value: Date): string {
    let dd = value.getDate() + "";
    let mm = (value.getMonth() + 1) + "";
    let yyyy = value.getFullYear();
    if (value.getDate() < 10) {
      dd = '0' + dd;
    }
    if (value.getMonth() + 1 < 10) {
      mm = '0' + mm;
    }
    return dd + "/" + mm + "/" + yyyy;
  }

  onUploadPayment(reserve: Reservation) {
    this.payment = {
      id: 0,
      date: this.parseDate(this.nowDate),
      user_id: +localStorage.getItem('auth'),
      reserve_id: reserve.id,
      payment_img: ""
    }
    this.reservationservice.upLoadPayment(this.image, this.payment).subscribe((res: any) => {
      if (res != 0) {
        reserve.reserve_status = "1";
        this.reservationservice.updateReservation(reserve).subscribe((resp: any) => {
          console.log(resp);
          this.loadReservation()
        })
      }
    })
  }

  preview(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    this.image = files;
    this.addimage_status = true;
  }

  confirmPayment(reserve: Reservation) {
    reserve.reserve_status = "2";
    this.reservationservice.updateReservation(reserve).subscribe((res: any) => {
      console.log(res);
      this.loadReservation()
    })
  }

  
  loadReservation() {
    this.reservations = [];
    this.payment_img = [];
    if (localStorage.getItem('role') == 'm') {
      this.reservationservice.getReservationForUser(this.parseDate(this.nowDate), +localStorage.getItem('auth')).subscribe((res: any) => {
        
        if(res == null){ 
          this. logOut()
          return "User got ban"
        }
        res.forEach(resp => {
          this.reservations.push(resp)
          this.setPayment(resp);
            this.reservationservice.getPayment(this.payment).subscribe((res_payment: any) => {
              if (res_payment.length != 0) {
                this.payment_img.push('http://localhost:8081/reservation/payment/' + res_payment[0].payment_img)
                console.log("add img");
              } else {
                this.payment_img.push("")
                console.log("add null");
              }
            })
        });
      });
    } else {
      this.reservationservice.getReservationByDate(this.parseDate(this.nowDate)).subscribe((res: any) => {
        res.forEach(resp => {
          this.reservations.push(resp)
          // if (resp.reserve_status != 0) {
          //   this.payment = {
          //     id: 0,
          //     date: this.parseDate(this.nowDate),
          //     user_id: resp.user_id,
          //     reserve_id: resp.id,
          //     payment_img: ""
          //   }
          //   this.reservationservice.getPayment(this.payment).subscribe((res_payment: any) => {
          //     //console.log(res_payment[0].payment_img);
          //     console.log("res_payment for User",res_payment);
          //     this.payment_img.push('http://localhost:8081/reservation/payment/' + res_payment[0].payment_img)
          //     console.log(this.payment_img);
          //   })
          // }
          this.setPayment(resp);
          this.reservationservice.getPayment(this.payment).subscribe((res_payment: any) => {
            // set img_payment ให้เเต่ละ reservation ถ้า reservation ไหนยังไม่ได้อัพหลักฐานให้ push ค่าว่างไว้
            // ที่ต้องเอามาตรวจสอบตรงนี้เพราะ Angular ทำงานเเบบ asynchronous ทำให้ต้องมาเช็คใน subscribe T-T
            if (res_payment.length != 0) {
              this.payment_img.push('http://localhost:8081/reservation/payment/' + res_payment[0].payment_img)
              console.log("add img");
            } else {
              this.payment_img.push("")
              console.log("add null");
            }
          });
        });
      });
    }
    console.log(this.reservations);
    
  }

  setPayment(resp : any){
    this.payment = {
      id: 0,
      date: this.parseDate(this.nowDate),
      user_id: resp.user_id,
      reserve_id: resp.id,
      payment_img: ""
    }
  }

  logOut(){
    this.loginservice.logout();
    alert("User ของท่านถูกระงับการใช้งาน");
    this.router.navigate(['/home']);
  }
}
