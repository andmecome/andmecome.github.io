//引入viewChild
import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  //获取dom节点，通过装饰器
  @ViewChild("myBox") myBox:any;

  //在ngAfterViewInit获取操作dom
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.myBox.nativeElement.style.color = "red";
  }

  //msg student 是属性，不是变量，用var就报错了
  public msg:string = "my name is zhangsan!";

  public student:any = "张三";

  public message:any;

  public title:string = "我是一个学生";

  public content:string = "<h3>我是一个标签</h3>";

  public arr:any[] = [1,2,33,55,6,888];

  //public items:Array<any> = ["aslkd", 23434, "alskdfj"];

  //public list:Array<number>;

  public url:string = "https://angular.cn/assets/images/logos/angular/logo-nav@2x.png";

  public flag:boolean = true;

  public orderStatus:number = 1;

  constructor() {
    this.message = "属性赋值";
  }

  ngOnInit(): void {
  }

  run() {
    alert("这是一个自定义方法！");
  }

  keyup(e) {
    // console.log(e.keyCode);
    if(e.keyCode == 13) {
      console.log("huiche")
    } else {
      console.log(e.target.value)
    }
  }

}
