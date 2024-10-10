class LeafletMap {

    constructor(containerId, center, zoom) {
        this.map = L.map(containerId).setView(center, zoom);
        this.initTileLayer();
    }

    initTileLayer() {
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
    }

    addMarker(lat, lng, message) {
        const marker = L.marker([lat, lng]).addTo(this.map);
        marker.bindPopup(message);
    }

    loadMarkersFromJson(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                data.forEach(marker => {
                    this.addMarker(marker.latitude, marker.longitude, marker.message);
                });
            })
            .catch(error => console.error('Error loading markers:', error));
    }
}

const myMap = new LeafletMap('map', [8.328803,124.979448], 18);


myMap.addMarker(8.326463,124.977644, 'Sumilao Municipal Hall');
myMap.addMarker(8.336246,124.975606, 'Sumilao Public Market');
myMap.addMarker(8.329670,124.977965, 'Pilar High School');
myMap.addMarker(8.331275,124.978953, 'Kisolon Central Elem. School');
myMap.addMarker(8.323438,124.978899, 'Alalum Falls');


myMap.loadMarkersFromJson('applet-2.json');