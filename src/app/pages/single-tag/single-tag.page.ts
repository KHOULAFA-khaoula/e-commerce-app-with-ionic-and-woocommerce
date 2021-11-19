import { WoocommerceService } from './../../services/woocommerce.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-tag',
  templateUrl: './single-tag.page.html',
  styleUrls: ['./single-tag.page.scss'],
})
export class SingleTagPage implements OnInit {

  tagName: string;
  tagId : number;
  productsByTag : any;

  constructor( private route: ActivatedRoute,
              private woocommerceService: WoocommerceService) { }


  
 async ngOnInit() {

    console.log(" it's tag page !!")
  await this.route.queryParams.subscribe(params => {
      this.tagId = params['id']; 
      this.tagName = params['tagName']
      console.log(this.tagId,"   " , this.tagName)
  })

  this.woocommerceService.getSingleTag(this.tagId).then((result) => {
      {
        console.log(this.tagId)
        console.log("the products are : >>" ,JSON.parse(result.body))
        this.productsByTag = JSON.parse(result.body)
        ,(err) => {
            console.log("error : >>" , err)
        }
      }
  })
}
}
