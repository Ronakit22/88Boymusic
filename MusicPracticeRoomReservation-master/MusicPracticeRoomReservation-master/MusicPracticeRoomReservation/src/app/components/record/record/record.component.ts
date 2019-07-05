import { Component, OnInit } from '@angular/core';
import { Reservation_Record } from 'src/app/models/reservation_record';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { LoginService } from 'src/app/services/login/login.service';
import { Router } from '@angular/router';
//primeng Api
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {

  cols: any[];
  reservation_records: Array<Reservation_Record> = []
  brands: SelectItem[];

  constructor(private reservationservice: ReservationService, private loginservice : LoginService,
              private router : Router) { }

  ngOnInit() {
    this.cols = [
      { field: 'date', header: 'วันที่' },
      { field: 'room_name', header: 'ห้องจอง' },
      { field: 'time', header: 'เวลา' },
      { field: 'hours', header: 'จำนวนชั่วโมง' },
      { field: 'totalprice', header: 'ราคารวม' },
      { field: 'user_name', header: 'ผู้จอง' },
      { field: 'reserve_status', header: 'สถานะ' }
    ];

    this.brands = [
      { label: 'สถานะ', value: null },
      { label: 'รอชำระเงิน', value: '0' },
      { label: 'รอตรวจสอบ', value: '1' },
      { label: 'เสร็จสมบูรณ์', value: '2' },
      { label: 'ยกเลิก', value: '3' },
  ];
    if(localStorage.getItem('role') == "a"){
      this.reservationservice.getAllReservation().subscribe((res : any) => {
        this.reservation_records = res;
        console.log(this.reservation_records);
      })
    }else{
      this.reservationservice.getReservationByUserId(+localStorage.getItem("auth")).subscribe((res : any) => {
        if(res == null)  {
          this. logOut()
          return "user got ban"
        }
        this.reservation_records = res;
        console.log(this.reservation_records);
      })
    }
  }

  logOut(){
    this.loginservice.logout();
    alert("User ของท่านถูกระงับการใช้งาน");
    this.router.navigate(['/home']);
  }


}
