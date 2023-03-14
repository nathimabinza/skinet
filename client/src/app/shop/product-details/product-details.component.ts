import { Product } from 'src/app/shared/models/products';
import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product?: Product;

  constructor(private shopService: ShopService,
    private activeRoute: ActivatedRoute,
    private bcService: BreadcrumbService) {
      this.bcService.set('@productDetails', ' ');
    }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    if (id) this.shopService.getProduct(+id).subscribe({
      next: product => {
        this.product = product,
        this.bcService.set('@productDetails', product.name)
        },
      error: error => console.log(error)
    })
  }

}
