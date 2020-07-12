import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';


@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent implements OnInit {

  public keyword:string;
  public todolist:any[] = [];

  constructor(public storage:StorageService) { 

  }

  ngOnInit(): void {
    var todolist:any = this.storage.get('todolist')
    if(todolist) {
      this.todolist = todolist;
    }
  }

  doAdd(e) {

    if(!this.keyword) {
      alert("不能为空！")
      return false;
      
    }

    if(e.keyCode == 13){
      if(!this.todolistHasKeyword(this.todolist,this.keyword)){
        this.todolist.push({
          title: this.keyword,
          status: 0
        })
        this.storage.set("todolist",this.todolist)
        this.keyword = '';
      } else {
        alert("数据已经存在！")
        this.keyword = '';
      }
    }
  }

  deleteData(key) {
    this.todolist.splice(key,1);
    this.storage.set("todolist",this.todolist)
  }

  todolistHasKeyword(todulist:any,keyword:any) {

    //异步会存在问题
    // todulist.forEach(value => {
    //   if(todulist.title==keyword) {
    //     return true;
    //   }
    // })

    for(var i=0;i<todulist.length;i++) {
      if(todulist[i].title==keyword) {
        return true;
      }
    }
    return false;

  }

  checkboxChange() {
    this.storage.set("todolist",this.todolist)

  }
}
