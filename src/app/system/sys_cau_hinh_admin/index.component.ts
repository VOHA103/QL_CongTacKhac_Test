import { sys_cau_hinh_admin_service } from '../../service/sys_cau_hinh_admin.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { user_model } from '@/app/model/user.model';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { sys_cau_hinh_admin_popupComponent } from './popupAdd.component';
import { sys_cau_hinh_admin } from '@/app/database/sys_cau_hinh_admin.data';
import { sys_cau_hinh_admin_model } from '@/app/model/sys_cau_hinh_admin.model';
import { environment } from '@/environments/environment';
@Component({
  selector: 'sys_cau_hinh_admin_index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class sys_cau_hinh_admin_indexComponent implements OnInit {
  [x: string]: any;
  public isCreate:boolean;
 
  public title:string;
  //Copyright
  public name_footer:string;
  //Powered by
  public title_footer:string;
  public note:string;
  type_: number;
  private REST_API_URL = environment.api;
  public progress: number;
  public message: string;
  @Output() public onUploadFinished=new EventEmitter();
  
  public sys_cau_hinh_admin_:sys_cau_hinh_admin_model;
  public sys_cau_hinh_admin_model:sys_cau_hinh_admin_model;
  public sys_cau_hinh_admins:sys_cau_hinh_admin[]=[];
 public response:{dbPath:''}
  public foods: any = [];
  public listData: any = [];
  public lst_status: any = [];
  public model: user_model;
  public loading = false;
  total = 0;
  page = 1;
  limit = 10;
  filter = { search: '', total: '0', page: '0', limit: '10', status_del: '1' };
  searchKey: string;
  constructor(
    private http: HttpClient,
    private sys_cau_hinh_admin_service: sys_cau_hinh_admin_service,
    public dialog: MatDialog
  ) {}
  openDialogDetail(item): void {
    const dialogRef = this.dialog.open(sys_cau_hinh_admin_popupComponent, {
      width: '850px',
      data: item,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.DataHanlder();
    });
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

  returnToCreate = () => {
    this.isCreate = true;
    this.title='';
     this.name_footer='';
    this.title_footer='';
    //this.type_=0;
    this.note='';
  }
  public createImgPath = (serverPath: string) => { 
    return `https://localhost:44334/sys_cau_hinh_/${serverPath}`; 
  }

 
 

  // public createImgPath(serverPath: string) {
  //   debugger
  //   return this.REST_API_URL + `/${serverPath}`;
  // }
  // public get_profile_user(): void {
  //    this['sys_user_service'].get_profile_user().subscribe(
  //      (res: any) => {
  //        this['id_user'] = res.id;
  //        if (this.sys_cau_hinh_admin_model.db.id == 0) {
  //          this.Save();
  //          this.sys_cau_hinh_admin_model.db.create_by = this.id_user;
  //        } else {
  //          this.sys_cau_hinh_admin_model.db.update_by = this.id_user;
  //        }
  //      },
  //      (err) => {
  //        console.log(err);
  //      }
  //    );
  //  }
 

  DataHanlder(): void {
    this.loading = false;
    this.sys_cau_hinh_admin_service.DataHanlder(this.filter).subscribe((resp) => {
      var model:any;
      model=resp;
      this.listData = model.data;
      this.total=model.total,
      this.loading = true;
    });
  }
  getOrders(): void {
  }
  goToPrevious(): void {
    this.page--;
    this.getOrders();
  }

  goToNext(): void {
    this.page++;
    this.getOrders();
  }

  goToPage(n: number): void {
    this.page = n;
    this.getOrders();
  }
  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  openDialogAdd(): void {
    const dialogRef = this.dialog.open(sys_cau_hinh_admin_popupComponent, {
      width: '850px',
      data: {
        db: {
          id: 0,
        },
        lst_cong_viec: null,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.DataHanlder();
    });
  }
  loadAPI() {
    this.loading = false;
    this.sys_cau_hinh_admin_service.getAll().subscribe((resp) => {
      this.listData=resp;
      this.loading = true;
    });
  }
   delete(id): void {
    this.sys_cau_hinh_admin_service.delete(id).subscribe((result) => {
      Swal.fire({
        icon: 'success',
        title: 'Thành công',
        showConfirmButton: false,
        timer: 2000,
      }).then((result) => {
        this.DataHanlder();
      });
    });
  }
  reven_status(id): void {
    this.sys_cau_hinh_admin_service.reven_status(id).subscribe((result) => {
      Swal.fire({
        icon: 'success',
        title: 'Thành công',
        showConfirmButton: false,
        timer: 2000,
      }).then((result) => {
        this.DataHanlder();
      });
    });
  }
  ngOnInit(): void {

    this.DataHanlder();
    this.lst_status = [
      {
        id: '1',
        name: 'Đang sử dụng',
      },
      {
        id: '2',
        name: 'Ngưng sử dụng',
      },
    ];
  }
}
