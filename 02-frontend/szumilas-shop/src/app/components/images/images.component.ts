import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Image } from 'src/app/overall/image';
import { ImageService } from 'src/app/services/image.service';
import { UploadFileComponent } from '../upload-file/upload-file.component';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {

  public images: Image[] = [];

  @ViewChild(UploadFileComponent, {static : true}) uploadFileComponent!:UploadFileComponent;

  constructor(private imageService: ImageService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.fetchImages();
  }

  fetchImages() {
    const id = +this.route.snapshot.paramMap.get("id")!;

    this.imageService.getProductImageUrlList(id).subscribe(
      data => {
        this.images = data;
      }
    );
  }

  removeImage(image: Image) {

    const imageIndex = this.images.findIndex(i => i.id === image.id);

    if (imageIndex > 0) {
      this.images.splice(imageIndex, 1);
      this.imageService.removeImage(image.id).subscribe({
        next: response => {
          alert("Plik został usunięty");
        },
        error: err => alert(`Wystąpił błąd: ${err.message}`)
      });
    } else {
      alert("Nie można usunąć zdjęcia!!!");
    }
  }

  uploadFile() {
    this.uploadFileComponent.uploadFile();
  }

}
