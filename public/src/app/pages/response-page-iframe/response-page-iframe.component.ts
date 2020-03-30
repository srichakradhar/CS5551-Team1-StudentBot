import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-response-page-iframe',
  templateUrl: './response-page-iframe.component.html',
  styleUrls: ['./response-page-iframe.component.css']
})
export class ResponsePageIframeComponent implements OnInit {
  // public siteUrl: string = 'https://www.google.com';
  public siteUrl: string = 'https://www.umkc.edu/';

  public lat: Number = 24.799448
  public lng: Number = 120.979021

  public origin: any
  public destination: any
  constructor() { }

  ngOnInit() {
    this.origin = { lat: 24.799448, lng: 120.979021 }
    this.destination = { lat: 24.799524, lng: 120.975017 }
  }

}
