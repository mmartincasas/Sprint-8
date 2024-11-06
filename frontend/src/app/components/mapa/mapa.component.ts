import { Component, inject, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { MapLocationService } from '../../services/map-location.service';
import { ApiResponse, MapLocation } from '../../interfaces/mapLocation';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.scss'
})
export class MapaComponent implements OnInit{

  locationService = inject(MapLocationService)
  categories: string[] = []
  selectedCategory: string = '';

  private map:any
  private markers: L.Marker[] = [];
  urlMapLeaflet: string ='https://tile.openstreetmap.org/{z}/{x}/{y}.png'



  ngOnInit(): void {
    this.iconConfiguration()
    this.initMap()
    this.loadLocations()
    this.initCategories()
  }

  private iconConfiguration(){
    L.Marker.prototype.options.icon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
      shadowSize: [41, 41],
      shadowAnchor: [12, 41]
    });
  }

  private initMap() {
    this.map = L.map('map').setView([41.3851, 2.1734], 13);

    L.tileLayer(this.urlMapLeaflet, {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);
  }

  private loadLocations(): void {
    this.locationService.getAll().subscribe((response: ApiResponse) => {
        if (!response.error) { 
            response.body.forEach(mapLocation => {
                this.addMarker(mapLocation);
            });
        } else {
            console.error('Error API response:', response.status);
        }
    });
  }

  private initCategories(): void {
    this.locationService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  private addMarker(location: MapLocation): void {
      const marker = L.marker([location.latitude, location.longitude])
        .addTo(this.map)
        .bindPopup(`<b>${location.name}</b><br>${location.category}`);
      this.markers.push(marker);
  }

   filterMarkers(): void {
    this.markers.forEach(marker => {
      this.map.removeLayer(marker);
    });

    this.markers = [];

    this.locationService.getAll().subscribe((response: ApiResponse) => {
      if (!response.error) {
        response.body
          .filter(location => !this.selectedCategory || location.category === this.selectedCategory)
          .forEach(location => this.addMarker(location));
      }
    });
  }
  

}
