function hideMenu(id) {//скрыть/раскрыть меню
    var menu = document.getElementById(id).style.display;
    document.getElementById(id).style.display = (menu == 'none') ? 'block' : 'none';
    document.getElementById('result').style.display = 'none';
    document.getElementById('result2').style.display = 'none';
}

function hideBlocks(nameFun) {
    if(nameFun == getAdress || nameFun == showLocation){
        document.getElementById('result').style.display = 'block';
        document.getElementById('formAddress').style.display = 'none';
    }
    if (nameFun == showMapGoogle) {
        document.getElementById('result2').style.display = 'block';
        document.getElementById('result').style.display = 'none';
        document.getElementById('formAddress').style.display = 'none';
    }
}

function showGeolocation(nameFun) {
    hideBlocks(nameFun);
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(nameFun); //{
    }
    else {
        document.getElementById('result2').innerHTML = 'Невозможно определить координаты';
    }
}

function addressSearchByCoord() {
        var lat = +document.getElementById('lat').value.replace (/\,/, '.'),//регулярки добавим для возможности
            lng = +document.getElementById('lng').value.replace (/\,/, '.');//вводить и запятые и точки
        console.log(lat, lng);
        var url = 'http://maps.google.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&sensor=false';
        takeTheAddressOfJson(url);
    document.getElementById('lat').value = "";
    document.getElementById('lng').value = "";
}

function takeTheAddressOfJson(url){
    //alert(url);
    document.getElementById('result2').style.display = 'none';
    document.getElementById('result').innerHTML = "";
    var xhttp = new XMLHttpRequest(),
        json;
    xhttp.open('POST', url, true);
    xhttp.send();
    xhttp.onreadystatechange = function(){
        try{
            if(xhttp.readyState == 4) {
                json = eval('('+xhttp.responseText+')');
                console.log(json);
                document.getElementById('result').style.display = 'block';
                document.getElementById('result').innerHTML =
                   '<p><b>Ваше местоположение: <br/>' + results[0].formatted_address;
            }
        }
        catch (e) {
            document.getElementById('result').innerHTML =  '<b>Sorry, the data error...</b>';
        }
    }
}

function getAdress(position) {
    var lat = position.coords.latitude,
        lng = position.coords.longitude;
    var url = 'http://maps.google.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&sensor=false';
    takeTheAddressOfJson(url);
}

function showLocation(position){
    try{
        var lat = position.coords.latitude,
            lng = position.coords.longitude;
        document.getElementById('result').innerHTML = "";
        document.getElementById('result').innerHTML =
            '<p><b>Координаты Вашего местоположения: <br/>' +
            lat + " :: " + lng + '</b></p>';
    }
    catch (e){
        document.getElementById('result').innerHTML =  '<b>Sorry, the data error...</b>';
    }
}

function showMapGoogle(position){
    try{
        var latitude = position.coords.latitude,
            longitude = position.coords.longitude;
        coords = new google.maps.LatLng(latitude, longitude),
            mapOptions = {
                zoom: 17,
                center: coords,
                mapTypeControl: true,
                navigationControlOptions: {
                    style: google.maps.NavigationControlStyle.SMALL
                },
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
        map = new google.maps.Map(
            document.getElementById("result2"), mapOptions
        );
        var marker = new google.maps.Marker({
            position: coords,
            map: map,
            title: "Your current location!"
        });
    }
    catch (e) {
        document.getElementById('result2').innerHTML =  '<b>Sorry, the data error...</b>';
    }
}


