/**
 * 此文件是Angular根模块，告诉Angular如何组装应用
 */

//BrowserModule,浏览器解析模块
import { BrowserModule } from '@angular/platform-browser';
//Angular核心模块
import { NgModule } from '@angular/core';
//表单
import { FormsModule } from '@angular/forms'

//根组件
import { AppComponent } from './app.component';
import { NewsComponent } from './components/news/news.component';
import { HomeComponent } from './components/home/home.component';
import { from } from 'rxjs';
import { TodolistComponent } from './components/todolist/todolist.component';

//引入并配置服务
import { StorageService } from './services/storage.service';

//@NgModule装饰器，接受一个元数据对象，告诉Angular如何编译和启动应用
@NgModule({
  declarations: [ //配置当前项目运行的组件
    AppComponent, NewsComponent, HomeComponent, TodolistComponent
  ],
  imports: [ //配置当前模块运行依赖的其他模块
    BrowserModule,FormsModule
  ],
  providers: [StorageService], //配置项目所需要的服务
  bootstrap: [AppComponent] //指定应用的主视图（根组件），通过引导根AppModule来启动应用，这里一般写的是根组件
})

//根模块不需要导出任何东西，因为其它组件不需要导入根模块
export class AppModule { } 
