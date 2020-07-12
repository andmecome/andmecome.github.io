import { Component, OnInit, ViewChild } from '@angular/core';
//引入并配置服务
import { StorageService } from '../../services/storage.service';

/**
 * 
 * 实例化用法，不推荐
 * var storage = new StorageService();
 * console.log(storage);
 */



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  //官方推荐实例化用法
  constructor(public storage:StorageService) { 
    let s = this.storage.cs();
    console.log(s)
    
  }

  @ViewChild("news") news:any;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    console.log(this.news.msg)
  }
}
