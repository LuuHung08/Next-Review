import React, { useEffect, useState } from 'react';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import style from './map.module.scss';

interface City {
  center: google.maps.LatLngLiteral;
  population: number;
}

function Map() {
  const [currentLocation] = useState({
    lat: 21.0020772,
    lng: 105.8065682,
  });

  useEffect(() => {
    const init = async () => {
      let map: any;
      const mapEle = document.getElementById('map') as HTMLAnchorElement;
      map = new google.maps.Map(mapEle, {
        center: currentLocation,
        zoom: 8,
        zoomControl: true,
        scaleControl: true,
        mapTypeControl: false,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }],
          },
        ],
      });

      /*
        === INIT Maps: Pinned marker
       */
      const pinned = new google.maps.Marker({
        position: currentLocation,
        map: map,
        visible: false,
      });
      // INIT Maps: dialog for default marker
      const locCustomWindow = new google.maps.InfoWindow({
        content: '',
        disableAutoPan: true,
      });

      // INIT Maps: content of dialog default marker
      const locCustomContent = (pinEvt: any, name: string) => {
        return `
          <div style='padding: 12px; max-width: 200px;'>
            <p style="color:#081F32; font-size:16px; padding-bottom: 8px; font-weight:600"> Khu vực ${name}</p>
            <p style="color:#464646FF; padding-bottom: 4px">Latitude: ${pinEvt.lat?.()}</p>
            <p style="color:#464646FF; padding-bottom: 4px">Longitude: ${pinEvt.lng?.()}</p>
          `;
      };

      let circle: google.maps.Circle;

      google.maps.event.addListener(map, 'click', function (e: any) {
        // show default marker
        pinned.setPosition(e.latLng);
        pinned.setVisible(true);
        locCustomWindow.open(map, pinned);

        if (circle && circle.setMap) circle.setMap(null);

        const areaMap: Record<string, City> = {
          vn: {
            center: { lat: e.latLng.lat(), lng: e.latLng.lng() },
            population: 50000,
          },
        };

        const eLat = { lat: parseFloat(e.latLng.lat()), lng: parseFloat(e.latLng.lng()) };
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location: eLat }, function (results, status) {
          if (results && status == google.maps.GeocoderStatus.OK) {
            locCustomWindow.setContent(locCustomContent(e.latLng, results[1].formatted_address));
          } else {
            locCustomWindow.setContent(locCustomContent(e.latLng, 'Not address'));

            circle = new window.google.maps.Circle({
              strokeColor: '#21a5ff',
              strokeOpacity: 0.5,
              strokeWeight: 2,
              fillColor: '#21a5ff',
              fillOpacity: 0.5,
              map: map,
              center: areaMap['vn'].center,
              radius: areaMap['vn'].population,
            });
          }
        });
      });

      // ----- END INIT -------------
      new MarkerClusterer({ map });
    };

    init();
  }, [currentLocation]);

  return <div className={style.map} id='map' />;
}

export default Map;
