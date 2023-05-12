import React, { useCallback, useEffect, useState } from 'react';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import style from './map.module.scss';

function Map() {
  const [currentLocation] = useState({
    lat: 21.0020772,
    lng: 105.8065682,
  });

  interface City {
    center: google.maps.LatLngLiteral;
    population: number;
  }

  const drawCircle = useCallback((e: any, map: any) => {
    const citymap: Record<string, City> = {
      vn: {
        center: { lat: e.latLng.lat(), lng: e.latLng.lng() },
        population: 2714856,
      },
    };

    return new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map,
      center: citymap['vn'].center,
      radius: Math.sqrt(citymap['vn'].population),
    });
  }, []);

  const init = useCallback(async () => {
    let map: any;
    const mapEle = document.getElementById('map') as HTMLAnchorElement;
    map = new google.maps.Map(mapEle, {
      center: currentLocation,
      zoom: 13,
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

    // INIT Maps: Register parent events

    google.maps.event.addListener(map, 'click', function (e: any) {
      // show default marker
      pinned.setPosition(e.latLng);
      pinned.setVisible(true);
      locCustomWindow.open(map, pinned);
      drawCircle(e, map);
      const eLat = { lat: parseFloat(e.latLng.lat()), lng: parseFloat(e.latLng.lng()) };
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: eLat }, function (results, status) {
        if (results && status == google.maps.GeocoderStatus.OK) {
          locCustomWindow.setContent(locCustomContent(e.latLng, results[1].formatted_address));
        } else locCustomWindow.setContent(locCustomContent(e.latLng, 'Not address'));
      });
    });

    google.maps.event.addListener(map, 'domready', function () {
      console.log('chay vay day');
    });

    // ----- END INIT -------------

    new MarkerClusterer({ map });
  }, [currentLocation, drawCircle]);

  useEffect(() => {
    init();
  }, [currentLocation, init]);

  return (
    <>
      <div className={style.map} id='map' />
    </>
  );
}

export default React.memo(Map);
