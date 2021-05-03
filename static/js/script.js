$(document).ready(function(){
    $('.sidenav').sidenav({edge: "right"});
    $('.collapsible').collapsible();
    $('.tooltipped').tooltip();
    $('select').formSelect();
    $('.datepicker').datepicker({
        format: "dd mmmm, yyyy",
        yearRange: 3,
        showClearBtn: true,
        i18n: {
            done: "Select"
        }
    });

    validateMaterializeSelect();
    function validateMaterializeSelect() {
        let classValid = { "border-bottom": "1px solid #4caf50", "box-shadow": "0 1px 0 0 #4caf50" };
        let classInvalid = { "border-bottom": "1px solid #f44336", "box-shadow": "0 1px 0 0 #f44336" };
        if ($("select.validate").prop("required")) {
            $("select.validate").css({ "display": "block", "height": "0", "padding": "0", "width": "0", "position": "absolute" });
        }
        $(".select-wrapper input.select-dropdown").on("focusin", function () {
            $(this).parent(".select-wrapper").on("change", function () {
                if ($(this).children("ul").children("li.selected:not(.disabled)").on("click", function () { })) {
                    $(this).children("input").css(classValid);
                }
            });
        }).on("click", function () {
            if ($(this).parent(".select-wrapper").children("ul").children("li.selected:not(.disabled)").css("background-color") === "rgba(0, 0, 0, 0.03)") {
                $(this).parent(".select-wrapper").children("input").css(classValid);
            } else {
                $(".select-wrapper input.select-dropdown").on("focusout", function () {
                    if ($(this).parent(".select-wrapper").children("select").prop("required")) {
                        if ($(this).css("border-bottom") != "1px solid rgb(76, 175, 80)") {
                            $(this).parent(".select-wrapper").children("input").css(classInvalid);
                        }
                    }
                });
            }
        });
    }
});

// var x = document.getElementById("demo");
// var mymap
// var popup = L.popup();

// // Initialize and add the map
// function initMap() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(showPosition, showError);
//     } else {
//         x.innerHTML = "Geolocation is not supported by this browser.";
//     }
// }

// function showPosition(position) {
//     var greenIcon = new L.Icon({
//         iconUrl: '../../static/img/marker-icon-green.png',
//         shadowUrl: '../../static/img/marker-shadow.png',
//         iconSize: [25, 41],
//         iconAnchor: [12, 41],
//         popupAnchor: [1, -34],
//         shadowSize: [41, 41]
//     });

//     var redIcon = new L.Icon({
//         iconUrl: '../../static/img/marker-icon-red.png',
//         shadowUrl: '../../static/img/marker-shadow.png',
//         iconSize: [25, 41],
//         iconAnchor: [12, 41],
//         popupAnchor: [1, -34],
//         shadowSize: [41, 41]
//     });

//     // The map, centered at my position
//     myposition = { lat: position.coords.latitude, lng: position.coords.longitude };
//     mymap = L.map('map').setView([position.coords.latitude, position.coords.longitude], 15);
//     // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//     // }).addTo(mymap);

// 	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoiam9uMi12ZXJhLWNydXoiLCJhIjoiY2tvNXlzMHBoMGtlMjJ2bnpjNjBoeWR0aSJ9.knP7IBbLyCl5RKHUJlaOIg', {
// 		maxZoom: 18,
// 		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
// 			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
// 		id: 'mapbox/streets-v11',
// 		tileSize: 512,
// 		zoomOffset: -1
// 	}).addTo(mymap);

//     L.marker([53.39172, -6.27659], { icon: redIcon }).addTo(mymap)
//         .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
//         .openPopup();
        
//     L.marker([position.coords.latitude, position.coords.longitude], { icon: greenIcon }).addTo(mymap)
//         .bindPopup('You are here!')
//         .openPopup();
// }

// function addMarker(latitude, longitude, clinicinfo) {
//     L.marker([latitude, longitude], { icon: redIcon }).addTo(mymap)
//         .bindPopup(clinicinfo)
//         .openPopup();
//     x.innerHTML = "Successful Call";
// }

// function onMapClick(e) {
//     popup
//         .setLatLng(e.latlng)
//         .setContent("You clicked the map at " + e.latlng.toString())
//         .openOn(mymap);
// }

// mymap.on('click', onMapClick);

// function showError(error) {
//   switch(error.code) {
//     case error.PERMISSION_DENIED:
//       x.innerHTML = "User denied the request for Geolocation."
//       break;
//     case error.POSITION_UNAVAILABLE:
//       x.innerHTML = "Location information is unavailable."
//       break;
//     case error.TIMEOUT:
//       x.innerHTML = "The request to get user location timed out."
//       break;
//     case error.UNKNOWN_ERROR:
//       x.innerHTML = "An unknown error occurred."
//       break;
//   }
// }



