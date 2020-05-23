import { MessageService } from "./../../services/message.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import {} from "googlemaps";
import { MapsAPILoader } from "@agm/core";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"],
})
export class MapComponent implements OnInit {
  public lat;
  public showDirection = false;
  public lng;
  @ViewChild("map") map: HTMLDivElement;
  public origin: any;
  public destination: any;
  public distance: any;
  public addresses: any[] = [];
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private msgService: MessageService
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.msgService.watchStorage().subscribe(() => {
      const maps = JSON.parse(localStorage.getItem("maps"));
      this.findAdress(maps.origin, maps.destination);
    });
  }

  findAdress(a1, a2) {
    this.mapsAPILoader.load().then(() => {
      const service = new google.maps.places.AutocompleteService();
      service.getPlacePredictions({ input: a1 }, this.displaySuggestions);
      service.getPlacePredictions({ input: a2 }, this.displaySuggestions);
      const div = document.getElementsByClassName("map-container");
    });
  }

  displaySuggestions = (predictions, status) => {
    if (status != google.maps.places.PlacesServiceStatus.OK) {
      alert(status);
      return;
    }
    this.addresses.push(predictions[0].description);
    this.origin = this.addresses[0];
    this.destination = this.addresses[1];
    console.log(this.origin, this.destination);
  };
}
