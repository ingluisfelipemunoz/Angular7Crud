import { Component, OnInit } from '@angular/core';
import { BusinessService } from '../business.service';
import Business from '../Bussines';

@Component({
  selector: 'app-gst-get',
  templateUrl: './gst-get.component.html',
  styleUrls: ['./gst-get.component.css']
})
export class GstGetComponent implements OnInit {

  businesses: Business[];

  constructor(private bs: BusinessService) { }

  ngOnInit() {
    this.bs
      .getBusinesses()
      .subscribe((data: Business[]) => {
        this.businesses = data;
      });
  }

    deleteBusiness(id) {
      this.bs.deleteBusiness(id).subscribe(res =>
        console.log('Deleted'));
    }

}
