mapboxgl.accessToken = 'pk.eyJ1Ijoic2xpZGVhIiwiYSI6ImNrb3EybTA1ejA5Y2Iyc25sazBhanM3aXIifQ.4VkwdxqmiCrZCjJb9RgpYQ';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [12.550343, 55.665957],
    zoom: 8
});


const marker1 = new mapboxgl.Marker({ color: 'black'})
.setLngLat([12.554729, 55.70651])
.addTo(map);

map.addControl(new mapboxgl.FullscreenControl());

