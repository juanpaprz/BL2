import { Component, OnInit } from '@angular/core';
import { BarrelControllerService } from '../../Services/Controllers/barrel-controller.service';
import { BarrelCode } from '../../Entities/BarrelCode';
import { FormControl, FormGroup, Validators } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-api-barrel',
  templateUrl: './api-barrel.component.html',
  styleUrls: ['./api-barrel.component.css'],
})
export class ApiBarrelComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  barrelCodes: BarrelCode[] = [];

  codeHeaders: string[] = [];
  codeValues: string[][] = [];

  constructor(private barrelService: BarrelControllerService) {}

  ngOnInit() {
    this.form = new FormGroup({
      barrel: new FormControl('', Validators.required),
      barrelId: new FormControl(''),
    });

    //$('#collapseBarrel').hide();

    this.getBarrelCodes();
  }

  getBarrelCodes() {
    this.barrelService.getAllBarrelCodes().subscribe({
      next: (response) => {
        if (response)
          this.barrelCodes = Object.values(response).sort((a, b) =>
            a.name > b.name ? 1 : -1
          );

        if (!this.barrelCodes.length) return;

        this.codeHeaders = ['id', 'name', 'code'];

        this.barrelCodes.forEach((bc) => {
          this.codeValues.push([bc.name, bc.code]);
        });
      },
    });
  }

  changeTableVisibility() {
    $('#collapseBarrel').slideToggle('slow');
  }
}
