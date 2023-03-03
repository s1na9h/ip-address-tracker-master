let response
let data
let lat
let lng
let timezone
let L0cation
let isp
var marker
let ip
const regIP = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/
let map = L.map('map', { zoomControl: false });
var markerIcon= L.icon({
    iconUrl: './assets/images/icon-location.svg',
    iconAnchor: [23, 56]
});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// https://geo.ipify.org/api/v2/country,city?apiKey=at_9OuTyAymiL82OB1hN0Vp6Nqb89DKR&ipAddress=8.8.8.8

async function getLocation(i="") {
response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_9OuTyAymiL82OB1hN0Vp6Nqb89DKR&ipAddress=${i}`)
data = await response.json()
lat = data.location.lat
lng = data.location.lng
l0cation = data.location.city
timezone = data.location.timezone
isp = data.isp
ip =data.ip
document.getElementById('ip-address').innerHTML = ip
document.getElementById('location').innerHTML = l0cation
document.getElementById('timezone').innerHTML= `UTC ${timezone}`
document.getElementById('isp').innerHTML= isp
}
getLocation().then(()=>{
    map = map.setView([lat, lng], 6)
    marker = new L.Marker([lat, lng], {icon: markerIcon})
    marker.addTo(map)
})
document.querySelector('form').addEventListener('submit',async (e)=>{
    e.preventDefault()
    ip = document.querySelector('input').value.trim()
    if(regIP.test(ip)){
    map.removeLayer(marker)
    document.querySelector('input').value=''
    await getLocation(ip)
    map.flyTo([lat,lng],6)
    marker = new L.Marker([lat, lng], {icon: markerIcon})
    marker.addTo(map)
    }
    else{
        swal({
            text: "Enter a valid IP",
            icon: "error",
          });
    }
})