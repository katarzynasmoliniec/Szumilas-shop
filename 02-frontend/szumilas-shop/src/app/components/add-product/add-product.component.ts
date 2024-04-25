import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductDTO } from 'src/app/overall/product-dto';
import { ImageService } from 'src/app/services/image.service';
import { ProductService } from 'src/app/services/product.service';
import { FormValidation } from 'src/app/validation/form-validation';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productCategory: string[] = [];

  addProductGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private productService: ProductService,
    private imageService: ImageService) { }

  ngOnInit(): void {

    this.getProductCategory();

    this.addProductGroup = this.formBuilder.group({
      name: new FormControl("",
        [Validators.required,
        Validators.minLength(2),
        FormValidation.notOnlyWhiteSpace]),
      category: new FormControl("", Validators.required),
      price: new FormControl('', Validators.required),
      description: new FormControl("",
        [Validators.required,
        Validators.minLength(2),
        FormValidation.notOnlyWhiteSpace]),
      images: new FormControl(null, Validators.required)
    });
  }

  get name() { return this.addProductGroup.get("name"); }
  get category() { return this.addProductGroup.get("category"); }
  get price() { return this.addProductGroup.get("price"); }
  get description() { return this.addProductGroup.get("description"); }
  get images() { return this.addProductGroup.get("images"); }

  onSubmit() {
    if (this.addProductGroup.invalid) {
      this.addProductGroup.markAllAsTouched();
      return;
    }

    const product: ProductDTO = new ProductDTO();

    product.name = this.addProductGroup.controls['name'].value;
    product.category = this.addProductGroup.controls['category'].value;
    product.description = this.addProductGroup.controls['description'].value;
    product.unitPrice = this.addProductGroup.controls['price'].value;
    const files = this.addProductGroup.controls['images'].value;
    product.imageUrl = "assets/" + files[0].name;

    this.productService.pushProduct(product, files).subscribe({
      next: response => {
        alert("Plik załadowany");
        window.location.reload();
      },
      error: err => alert(`Wystąpił błąd: ${err.message}`)
    });
  }

  getProductCategory() {
    this.productService.getProductCategories().subscribe(
      data => {
        this.productCategory = data.map(cat=>cat.categoryName);}
    );
  }

  markImagesTouched() {
    this.images?.markAsTouched();
  }

  uploadImages() {

    var files = this.addProductGroup.controls['images'].value;

    this.imageService.pushFile(files, "9").subscribe({
      next: response => {
        alert("Plik załadowany");
        window.location.reload();
      },
      error: err => alert(`Wystąpił błąd: ${err.message}`)
    });
  }

}
