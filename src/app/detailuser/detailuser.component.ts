import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Account } from '../PostEntityModel';
import { PostService } from './../getData.service';

@Component({
  selector: 'app-detailuser',
  templateUrl: './detailuser.component.html',
  styleUrls: ['./detailuser.component.scss'],
})
export class DetailuserComponent implements OnInit {
  model: Account = new Account();
  paramId: number;
  flag: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private _postService: PostService,
    private router: Router
  ) {
    // Get Route Param
    this.activatedRoute.params.subscribe((params: Params) => {
      const param = params['id'];

      if (param !== 'new') {
        const param1 = JSON.parse(window.atob(param));
        this.paramId = param1.id;
        this.flag = param1.type;
      } else {
        this.flag = 'new';
      }
    });
  }

  ngOnInit(): void {
    this.getDetail();
  }
  getDetail = () => {
    if (this.paramId) {
      this._postService
        .Get('http://202.182.111.45:8081/v1/account/' + this.paramId)
        .subscribe((res) => {
          if (res && res.data) {
            this.model = res.data;
            console.log(this.model);
          }
        });
    }
  };
  saveData = () => {
    console.log(555);

    if (this.flag === 'new') {
      this._postService
        .Post('http://202.182.111.45:8081/v1/accounts', this.model)
        .subscribe((res) => {
          if (res && res.code && res.code == '200') {
            alert('Thêm mới thành công');
            this.router.navigate(['/user']);
          } else {
            alert('Thêm mới không thành công');
          }
        });
    } else {
      this._postService
        .Put(
          'http://202.182.111.45:8081/v1/account/' + this.paramId,
          this.model
        )
        .subscribe((res) => {
          if (res && res.code && res.code == '200') {
            alert('Cập nhật thành công');
            this.router.navigate(['/user']);
          } else {
            alert('Cập nhật không thành công');
          }
        });
    }
  };
}
