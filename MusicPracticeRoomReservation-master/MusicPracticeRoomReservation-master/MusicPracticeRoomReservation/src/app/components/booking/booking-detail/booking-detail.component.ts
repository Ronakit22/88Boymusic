import { Component, OnInit, Input, SimpleChanges, TemplateRef, HostListener, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation, NgxGalleryImageSize } from 'ngx-gallery';
import { NgForm } from '@angular/forms';
// models
import { Room } from "../../../models/room";
import { MockTimeSchedule } from "../../../mockdata/mock-timeschedule";
import { Time } from "../../../models/time";

// services
import { RoomService } from 'src/app/services/room/room.service';

// ngx-modal
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { Reservation } from 'src/app/models/reservation';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.css']
})

export class BookingDetailComponent implements OnInit {
  @Input() room: Room;
  @Input() back: boolean;
  @Input() bsValue: Date;
  @Input() banner: string;
  @ViewChild('f') form: NgForm;

  @Output()
  insertComplete = new EventEmitter<string>();

  //ngx-modal
  @ViewChild('lgModal')
  modalRef: BsModalRef;

  // ngx-gellery
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  image: Array<string> = [];

  user_role = localStorage.getItem('role')
  defualtHours = "1 ชม."
  timeschedule: any = MockTimeSchedule;
  datebooked: Array<Time> = [];
  dateselect: string;
  mytime: Date;
  minTime: Date;
  maxTime: Date;

  //check booked
  timeselect: number;
  hoursselect: any;
  bookedDetail: boolean = false;
  totaltime: string;
  totalprice: any;
  bookedtime: Array<any> = [];
  bookedtime_bysystem: Array<any> = [];

  //alert มีคนจองเเล้ว
  foundTime = 0;

  //alert จองเกินเวลา
  timeOverflow = 0;

  //model การจองห้อง
  reservation: Reservation;
  reserve_time: Array<Reservation> = []



  constructor(private rs: RoomService, private modalService: BsModalService,
    private roomservice: RoomService, private router: Router,
    private reservationservice: ReservationService, private loginservice: LoginService) {
  }

  // @HostListener('window:resize', ['$event'])
  // onResize(event) {
  //   console.log(event.target.innerWidth);
  // }

  ngOnInit() {
    this.galleryOptions = [
      {
        width: "100%", height: "500px", imagePercent: 80, thumbnailsPercent: 20,
        imageArrowsAutoHide: true, thumbnailsArrowsAutoHide: true,
        previewCloseOnClick: true, previewCloseOnEsc: true
      },
      { breakpoint: 500, width: "100%", height: "500px", thumbnailsColumns: 3, previewSwipe: true, previewCloseOnClick: true }
    ];
  }

  ngOnChanges(changes: SimpleChanges) {
    this.image = []
    this.datebooked = []
    this.bookedtime_bysystem = []
    this.bookedDetail = false
    if (this.room) {

      this.galleryImages = [
        {
          small: this.banner,
          medium: this.banner,
          big: this.banner
        },
      ];

      this.roomservice.getImgName(this.room.id, "N").subscribe((res: any) => {
        res.forEach(res => {
          this.image.push('http://localhost:8081/room/img/' + res.name_img);
        });
        this.addGellery();
      })
      // เเปลง date เป็น string format เพื่อเอาไปค้นหา
      this.dateselect = this.parseDate(this.bsValue);

      this.reservationservice.getReservation(this.dateselect, this.room.id).subscribe((res: any) => {
        this.reserve_time = res;
        res.forEach(reserve => {
          for (let i = 0; i < Number(reserve.hours.substr(0, 1)); i++) {
            let nowhours = (Number(reserve.time.substr(0, 2)) + i) + ".30";
            let nexthours = (Number(reserve.time.substr(0, 2)) + i + 1) + ".30";
            let hours = nowhours + "-" + nexthours;
            this.bookedtime_bysystem.push(hours)
          }
          console.log(this.bookedtime_bysystem);
          console.log(this.timeschedule);
        })
        //เซ็ตเวลาใหม่ทุกครั้งที่เปลี่ยนวัน !!!warningggggggggggggggggggggggg
        this.onHidden()
      })
    }
  }

  addGellery() {
    this.image.forEach(element => {
      this.galleryImages.push({
        small: element,
        medium: element,
        big: element
      })
    });
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

  onTimeChange(time: any) {
    if(time == null ){
      this.modalRef.hide()
      return "";
    }
    this.timeselect = time.getHours();
    this.bookedVerify();
  }

  onHoursSelect(hours: any) {
    this.hoursselect = hours;
    this.bookedVerify();
  }

  bookedVerify() {
    this.bookedtime = [];
    if (this.timeselect && this.hoursselect) {

      this.totaltime = this.timeselect + ".30-" + (this.timeselect + Number(this.hoursselect)) + ".30";
      this.totalprice = Number(this.room.price.substr(0, 3)) * Number(this.hoursselect);

      for (let index = 0; index < this.hoursselect; index++) {
        let nowhours = (this.timeselect + index) + ".30";
        let nexthours = (this.timeselect + index + 1) + ".30";
        let hours = nowhours + "-" + nexthours;
        this.bookedtime.push(hours);
      }

      if (this.timeselect + Number(this.hoursselect) > 21) {
        this.timeOverflow = 1;
        this.bookedDetail = false;
      } else {
        this.timeOverflow = 0;
        // ถ้าวันที่เลือกมีคนจอง
        if (this.bookedtime_bysystem.length > 0) {
          for (let index = 0; index < this.bookedtime_bysystem.length; index++) {
            // if (this.datebooked[index].roomNO.substr(1) == this.roomselect) {
            for (let i = 0; i < this.bookedtime.length; i++) {
              if (this.bookedtime[i] == this.bookedtime_bysystem[index]) {
                // ตรวจสอบเวลาที่จองว่า ชนกับเวลาที่มีคนจองไว้ไหม ถ้าไม่มี foundtime = 0  ถ้ามีให้ foundtime = 1 เเละให้เเจ้งตืนกับบล็อคปุ่มจอง
                this.foundTime = 1;
                this.bookedDetail = false;
                break;
              } else {
                this.foundTime = 0;
                this.bookedDetail = true;
              }
            }
            if (this.foundTime == 1) {
              break;
            }
            // }
          }
        }
        // วันที่เลือกไม่มีคนจอง
        else {
          this.bookedDetail = true;
        }
      }
    }
  }

  reserveRoom() {
    this.reservation = {
      id: 0,
      date: "",
      room_id: 0,
      time: "",
      hours: "",
      totalprice: "",
      user_id: 0,
      reserve_status: "1"
    };
    this.reservation.date = this.dateselect;
    this.reservation.room_id = this.room.id;
    this.reservation.time = this.totaltime + " น.";
    this.reservation.hours = this.hoursselect + " ชม.";
    this.reservation.totalprice = this.totalprice;
    this.reservation.user_id = +localStorage.getItem('auth');
    this.reservationservice.insertReservation(this.reservation).subscribe((res: any) => {
      // 404404404 is User got ban
      if (res == 404404404) {
        this.logOut()
        return "user got ban";
      }
      if (res != 0) {
        this.modalRef.hide()
        this.insertComplete.emit('complete');
      } else {
        alert("Insert Reservation !!Fail")
        this.modalRef.hide()
      }
    }
    )
  }

  openModal(showmodal) {
    if (localStorage.getItem('auth') == null) {
      alert("กรุณาล็อคอินก่อนทำการจองห้องซ้อม");
      this.router.navigate(['/login']);
    } else {
      return showmodal
    }
  }

  onHidden() {
    //เซ็ตเวลาใหม่ทุกครั้งที่ปิด Modal
    // เซ็ตเวลาให้ล็อคไว้เริ่มต้นที่ 12.30
    this.form.reset();
    let nowdate = new Date();
    this.mytime = new Date(this.bsValue);
    this.maxTime = new Date(this.bsValue);
    this.minTime = new Date(this.bsValue);
    if ((this.bsValue.getDate() == nowdate.getDate()) && (this.bsValue.getMonth() == nowdate.getMonth()) && (this.bsValue.getFullYear() == nowdate.getFullYear())) {
      if (nowdate.getHours() < 12) {
        this.mytime.setHours(12);
        this.mytime.setMinutes(30);
      } else {
        if (nowdate.getMinutes() > 30) {
          this.mytime.setHours(nowdate.getHours() + 1);
        } else {
          this.mytime.setHours(nowdate.getHours());
        }
        this.mytime.setMinutes(30);
      }
    } else {
      this.mytime.setHours(12);
      this.mytime.setMinutes(30);
    }

    // set maxTime & minTime in timepciker
    this.maxTime.setHours(20);
    this.maxTime.setMinutes(31);
    this.minTime.setHours(12)
    this.minTime.setMinutes(29)
    this.bookedDetail = false
    this.foundTime = 0;
    this.timeOverflow = 0;
    console.log(this.minTime);
    
  }

  logOut() {
    //this.modalRef.hide()
    this.loginservice.logout();
    alert("User ของท่านถูกระงับการใช้งาน");
    this.router.navigate(['/home']);
  }

}
