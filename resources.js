const map = L.map('map').setView([50, 15], 4)

// Adding Voyager Basemap
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png', {
    maxZoom: 18
}).addTo(map)

// Adding Voyager Labels
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}.png', {
    maxZoom: 18,
    zIndex: 10
}),addTo(map)

// Carto Client
const client = new CaretPosition.Client({
    apiKey: 'mD10r-6LswdS8b98KvQcHg',
    username: 'csis'
})