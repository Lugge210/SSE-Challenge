import {
  Component,
  ViewChild,
  ElementRef,
  OnDestroy,
  inject,
  signal,
  AfterViewInit,
  effect,
} from '@angular/core';
import { Map, Marker, Popup } from 'maplibre-gl';
import { EmergencyHttpServiceService } from '../../services/emergency-http-service.service';
import { catchError } from 'rxjs';
import { ICase } from '../../models/icase';
import { Case } from '../../models/case';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements OnDestroy, AfterViewInit {
  map: Map | undefined;
  @ViewChild('map') private mapContainer!: ElementRef<HTMLElement>;
  emergencyHtmlService = inject(EmergencyHttpServiceService);
  case = signal<ICase>(new Case());
  
  e = effect(() =>
    this.case().caseId ? this.showCaseLocation() : console.log('not loaded')
  );

  ngAfterViewInit() {
    this.createMap();
    this.getCase();
  }

  getCase() {
    this.emergencyHtmlService
      .getEmergencyFromApi()
      .pipe(
        catchError((err) => {
          console.log(err);
          throw err;
        })
      )
      .subscribe((newCase) => {
        this.case.set(newCase);
      });
  }

  createMap() {
    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: {
        version: 8,
        sources: {
          osm: {
            type: 'raster',
            tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution: '&copy; OpenStreetMap Contributors',
            maxzoom: 19,
          },
        },
        layers: [
          {
            id: 'osm',
            type: 'raster',
            source: 'osm',
          },
        ],
      },
      center: [0, 0],
      zoom: 5,
    });
  }

  showCaseLocation(): void {
    this.map?.flyTo({
      center: [
        this.case().caseLocation.longitude,
        this.case().caseLocation.latitude,
      ],
      zoom: 15,
    });

    this.addMarker(
      this.case().caseLocation.longitude,
      this.case().caseLocation.latitude
    );

    this.addMarker(
      this.case().hospitalLocation.longitude,
      this.case().hospitalLocation.latitude
    );

    this.drawRoute();
  }

  private drawRoute() {
    const route = JSON.parse(this.case().routingInformation.routeAsPolyLine);
    this.map?.addSource('route', { type: 'geojson', data: route });
    this.map?.addLayer({
      id: 'route',
      type: 'line',
      source: 'route',
      layout: { 'line-cap': 'round' },
      paint: {
        'line-color': '#F06317',
        'line-width': 4,
      },
    });
  }

  addMarker(lng: number, lat: number) {
    new Marker()
      .setLngLat([lng, lat])
      .setPopup(new Popup().setHTML(''))
      .addTo(this.map!);
  }

  ngOnDestroy() {
    this.map?.remove();
  }
}
