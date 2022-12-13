import { user_model } from '../../model/user.model';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
  HttpEventType,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { sys_cau_hinh_admin_service } from '../../service/sys_cau_hinh_admin.service';
import Swal from 'sweetalert2';
import { User } from '@/app/database/user.data';
import { sys_cau_hinh_admin } from '@/app/database/sys_cau_hinh_admin.data';
import { sys_cau_hinh_admin_model } from '@/app/model/sys_cau_hinh_admin.model';
import { sys_user_service } from '../../service/sys_user.service';
import { environment } from '@/environments/environment';
@Component({
  selector: 'sys_cau_hinh_popup',
  templateUrl: './popupAdd.component.html',
  styleUrls: ['./popupAdd.component.scss'],
})
export class sys_cau_hinh_popupComponent implements OnInit {
  public isCreate:boolean;

  public title:string;
  //Copyright
  public name_footer:string;
  //Powered by
  public title_footer:string;
  public note:string;
  type_: number;

  public sys_cau_hinh_admin_:sys_cau_hinh_admin_model;
  public sys_cau_hinh_admins:sys_cau_hinh_admin[]=[];

 public response:{dbPath:''}
 
  // public sys_cau_hinh_admin_model : sys_cau_hinh_admin;

  // public lst_status: any = [];
  // public check_error: any = [];
  public id_user: any;
  private REST_API_URL = environment.api;
  public progress: number;
  public message: string;

  @Output() public onUploadFinished=new EventEmitter();
  constructor(
    private http: HttpClient,
    // private sys_cau_hinh_admin_service: sys_cau_hinh_admin_service,
    // public dialog: MatDialog,
    // private sys_user_service: sys_user_service,
    // public dialogRef: MatDialogRef<sys_cau_hinh_admin_popupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: sys_cau_hinh_admin_model
  ) {
   // this.sys_cau_hinh_admin_model = data;
   // this.get_profile_user();
  }

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    //debugger
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.http
      .post('https://localhost:44334/sys_cau_hinh_/Upload', formData, {
        reportProgress: true,
        observe: 'events',
      })
      .subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.UploadProgress)
          {
            this.progress = Math.round((100 * event.loaded) / event.total);

          }
          else if (event.type === HttpEventType.Response) {
            this.message = 'Upload success.';
            this.onUploadFinished.emit(event.body);
          }
        },
        error: (err: HttpErrorResponse) => console.log(err),
      });
  };


  uploadFinished = (event) => {
    // debugger
     this.response = event;
   }
   
   private getsys_cau_hinh_admins = () => {
    this.http.get('https://localhost:44334/sys_cau_hinh_/GetAll')
    .subscribe({
      next: (res) => this.sys_cau_hinh_admins = res as sys_cau_hinh_admin[],
      error: (err: HttpErrorResponse) => console.log(err)
    });
  }

  onCreate(): void{
    // this.sys_cau_hinh_admin_ = {
      
    //   title: this.title,
    //   name_footer: this.name_footer,
    //   title_footer: this.title_footer,
    //   note: this.note,
    //   type_:this.type_,
    //   image:  this.response.dbPath,


    // }
    this.http.post('https://localhost:44334/sys_cau_hinh_/Create', this.sys_cau_hinh_admin_)
    .subscribe({
      next: _ => {
        this.getsys_cau_hinh_admins();
        this.isCreate = false;
      },
      error: (err: HttpErrorResponse) => console.log(err)
    });
   } 



  //  uploadFinished = (event) => {
  //  // debugger
  //   this.response = event;
  // }

  // public get_profile_user(): void {
  //   this.sys_user_service.get_profile_user().subscribe(
  //     (res: any) => {
  //       this.id_user = res.id;
  //       if (this.sys_cau_hinh_admin_model.db.id == 0) {
  //         this.Save();
  //         this.sys_cau_hinh_admin_model.db.create_by = this.id_user;
  //       } else {
  //         this.sys_cau_hinh_admin_model.db.update_by = this.id_user;
  //       }
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }



 
  // private getsys_cau_hinh_admins = () => {
  //   this.http.get(this.REST_API_URL +'/sys_cau_hinh_/GetAll')
  //   .subscribe({
  //     next: (res) => this.sys_cau_hinh_admins = res as sys_cau_hinh_admin[],
  //     error: (err: HttpErrorResponse) => console.log(err)
  //   });
  // }

  // onCreate(): void{
  //   this.sys_cau_hinh_admin_ = {
      
  //     title: this.title,
  //     name_footer: this.name_footer,
  //     title_footer: this.title_footer,
  //     note: this.note,
  //     type_:this.type_,
  //     image:  this.response.dbPath
  //   }
  //   this.http.post(this.REST_API_URL +'/sys_cau_hinh_/Create', this.sys_cau_hinh_admin_)
  //   .subscribe({
  //     next: _ => {
  //       this.getsys_cau_hinh_admins();
  //       this.isCreate = false;
  //     },
  //     error: (err: HttpErrorResponse) => console.log(err)
  //   });



  // // image:this.response.dbPath
  // //   this.sys_cau_hinh_admin_service
  // //     .add(this.sys_cau_hinh_admin_model)
  // //     .subscribe((result) => {
  // //       var data: any = result;
  // //       this.check_error = data.error;
  // //       if (this.check_error.length === 0) {
  // //         this.Close();
  // //         Swal.fire({
  // //           icon: 'success',
  // //           title: 'Thành công',
  // //           showConfirmButton: false,
  // //           timer: 2000,
  // //         }).then((result) => {});
  // //       }
  // //     });
  // }




//  Close(): void {
//     this.dialogRef.close();
//   }

  ngOnInit(): void {
 // this.isCreate = true;

 
  }
}
