declare namespace google {
  namespace maps {
    class Map {
      constructor(mapDiv: Element, opts?: MapOptions);
    }

    class Marker {
      constructor(opts?: MarkerOptions);
      setMap(map: Map | null): void;
      setPosition(latLng: LatLng): void;
    }

    class LatLng {
      constructor(lat: number, lng: number);
      lat(): number;
      lng(): number;
    }

    interface MapOptions {
      center: LatLng;
      zoom: number;
      [key: string]: any;
    }

    interface MarkerOptions {
      position: LatLng;
      map: Map;
      title?: string;
      [key: string]: any;
    }

    namespace places {
      class Autocomplete {
        constructor(inputField: HTMLInputElement, opts?: AutocompleteOptions);
        addListener(eventName: string, handler: () => void): void;
        getPlace(): PlaceResult;
      }

      interface AutocompleteOptions {
        componentRestrictions?: {
          country: string | string[];
        };
        types?: string[];
        [key: string]: any;
      }

      interface PlaceResult {
        formatted_address?: string;
        geometry?: {
          location: LatLng;
        };
        [key: string]: any;
      }
    }
  }
}