import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from './app.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public data: any;
  public showChart: boolean = false;

  constructor(private _appSrc: AppService) { }

  async ngOnInit(): Promise<void> {
    this.getUser1()
  }

  async getUser1(): Promise<void> {
    this._appSrc.getUser1().subscribe((user) => {
      this.data = user.array.sort((a: any, b: any) => {
        if (a.date.seconds > b.date.seconds) return 1;
        if (a.date.seconds < b.date.seconds) return -1;
        return 0;
      })
      this.data.forEach((item: any) => {
        item.date = this.formatDate(item.date.seconds)
      })
      this.showChart = true;
    })
  }

  private formatDate(dateInit: number): string {
    const date = new Date(dateInit)
    const dateString = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() +
      " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()

    return dateString
  }
}
