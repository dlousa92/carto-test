const map = L.map('map').setView([50, 15], 4)

// Adding Voyager Basemap
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png', {
    maxZoom: 18
}).addTo(map)

// Adding Voyager Labels
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}.png', {
    maxZoom: 18,
    zIndex: 10
}).addTo(map)

// Carto Client
const client = new carto.Client({
    apiKey: 'EtLRHbw7jMxZGD1T_XSUQA',
    username: 'pfranz@csis.org'
})

// Defining Layers
const europeanCountriesDataset = new carto.source.Dataset(`
    carto_sampledata
`)

const europeanCountriesStyle = new carto.style.CartoCSS(`
  #layer {
  polygon-fill: #162945;
    polygon-opacity: 0.5;
    ::outline {
      line-width: 1;
      line-color: #FFFFFF;
      line-opacity: 0.5;
    }
  }
`)
const europeanCountries = new carto.layer.Layer(europeanCountriesDataset, europeanCountriesStyle)

const populatedPlacesSource = new carto.source.SQL(`
  SELECT *
    FROM ne_10m_populated_places_simple
    WHERE adm0name IN (SELECT admin FROM ne_adm0_europe)
`)
const populatedPlacesStyle = new carto.style.CartoCSS(`
  #layer {
    marker-width: 8;
    marker-fill: #FF583E;
    marker-fill-opacity: 0.9;
    marker-line-width: 0.5;
    marker-line-color: #FFFFFF;
    marker-line-opacity: 1;
    marker-type: ellipse;
    marker-allow-overlap: false;
  }
`)
const populatedPlaces = new carto.layer.Layer(populatedPlacesSource, populatedPlacesStyle, {
    featureOverColumns: ['name']
})

// Adding layers to the client
client.addLayers([europeanCountries, populatedPlaces])