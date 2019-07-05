import { Component, OnInit, ViewChild } from '@angular/core';
import { RoomService } from 'src/app/services/room/room.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Room } from 'src/app/models/room';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css']
})
export class EditRoomComponent implements OnInit {

  @ViewChild('f') roomForm: NgForm;

  img_banner: any = "http://ssl.gstatic.com/accounts/ui/avatar_2x.png";
  isChecked
  image_banner: File
  img_list: Array<any> = []
  image_list: File
  addbanner_status: boolean = false
  addimg_status: boolean = false
  id: number
  edit_room: Room
  newimg_list: any = "http://ssl.gstatic.com/accounts/ui/avatar_2x.png";

  constructor(private roomservice: RoomService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.edit_room = {
      id: 0,
      name: "",
      type: "",
      price: "",
      mus_instrument: "",
      detail: "",
      room_status: 1
    }
    let params = this.route.snapshot.paramMap;
    if (params.has('id')) {
      this.id = +params.get('id');
      this.loadRoomById();
    } else {

    }
  }
  previewbanner(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.img_banner = reader.result;
    }
    console.log(this.img_banner);

    this.image_banner = files;
    this.addbanner_status = true;
  }

  previewimg(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.newimg_list = reader.result;
    }
    this.image_list = files;
    this.addimg_status = true;
  }

  deleteImg() {
    this.roomservice.deleletImg(this.id, "N").subscribe((res: any) => {
      console.log(res);
      this.loadRoomById();
    })
  }

  deleteRoom() {
    this.roomservice.deleletRoom(this.id).subscribe((res: any) => {
      console.log(res);
      if (res != 0) {
        alert("Delete Room !!Success");
        this.router.navigate(['/manageroom']);
      } else {
        alert("Delete Room !!Fail");
      }
    })
  }

  onSubmit() {
    console.log(this.roomForm.value);
    this.edit_room.name = this.roomForm.value.name;
    this.edit_room.type = this.roomForm.value.type;
    this.edit_room.price = this.roomForm.value.price;
    this.edit_room.mus_instrument = this.roomForm.value.mus_instrument;
    this.edit_room.detail = this.roomForm.value.detail;
    if (this.id) {
      this.roomservice.updateRoom(this.edit_room).subscribe((res: any) => {
        if (res == 1) {
          if (this.addbanner_status) {
            this.roomservice.updateImgRoom("B", this.id, this.image_banner).subscribe((res2: any) => { alert(res2) })
          }
          if (this.addimg_status) {
            this.roomservice.updateImgRoom("N", this.id, this.image_list).subscribe((res2: any) => { alert(res2) })
          }
          alert("Update Room Success!!");
          this.loadRoomById();
        } else {
          alert("Update Room Fail!!");
        }
      })
    } else {
      this.roomservice.createRoom(this.edit_room).subscribe((res: any) => {
        if (res != 0) {
          this.id = res
          if (this.addbanner_status) {
            this.roomservice.updateImgRoom("B", this.id, this.image_banner).subscribe((res2: any) => { alert(res2) })
          }
          if (this.addimg_status) {
            this.roomservice.updateImgRoom("N", this.id, this.image_list).subscribe((res2: any) => { alert(res2) })
          }
          alert("insert Room Success!!");
          this.loadRoomById();
        } else {
          alert("insert Room Fail!!");
        }
      })
    }

  }

  loadRoomById() {
    this.img_banner = ""
    this.img_list = []
    this.roomservice.getRoomById(this.id).subscribe((res: any) => {
      this.edit_room = res[0]
      this.roomservice.getImgName(this.id, "B").subscribe((resp: any) => {
        this.img_banner = 'http://localhost:8081/room/img/' + resp[0].name_img;
      })
      this.roomservice.getImgName(this.id, "N").subscribe((resp: any) => {
        resp.forEach(nameimg => {
          this.img_list.push('http://localhost:8081/room/img/' + nameimg.name_img);
        });
      })
    })
  }

}
