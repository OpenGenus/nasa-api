$(document).ready(function () {

  var setMap = L.map('mapping').setView([0, 0], 2)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19
  }).addTo(setMap)

  var totalColors = []

  var markedColor

  $.ajax({
    type: 'GET',
    url: 'https://eonet.sci.gsfc.nasa.gov/api/v2.1/categories?api_key=e0xaFTehVbUGmZjo2H94BthXsxaR8YYemqp9imxM',
    dataType: 'json'
  }).done(function (fetchedData) {
    fetchedData.categories.forEach(function (data) {
      switch (data.id) {
        case 6:
          totalColors.push({id: data.id, title: data.title, color: '#348899'})
          break
        case 7:
          totalColors.push({id: data.id, title: data.title, color: '#962D3E'})
          break
        case 16:
          totalColors.push({id: data.id, title: data.title, color: '#261722'})
          break
        case 9:
          totalColors.push({id: data.id, title: data.title, color: '#76A68F'})
          break
        case 14:
          totalColors.push({id: data.id, title: data.title, color: '#325943'})
          break
        case 19:
          totalColors.push({id: data.id, title: data.title, color: '#D99C52'})
          break
        case 15:
          totalColors.push({id: data.id, title: data.title, color: '#979C9C'})
          break
        case 10:
          totalColors.push({id: data.id, title: data.title, color: '#E54661'})
          break
        case 17:
          totalColors.push({id: data.id, title: data.title, color: '#553285'})
          break
        case 18:
          totalColors.push({id: data.id, title: data.title, color: '#998A2F'})
          break
        case 12:
          totalColors.push({id: data.id, title: data.title, color: '#35478C'})
          break
        case 13:
          totalColors.push({id: data.id, title: data.title, color: '#002D40'})
          break
        case 8:
          totalColors.push({id: data.id, title: data.title, color: '#FF7F66'})
          break
      }
      console.log(totalColors)
    })
    totalColors.forEach(function (colr) {
      $('#list').append('<li>' + '<div style="background-color:' + colr.color + '; width: 105px; height: 35px;">' + colr.title + '</div>' + '</li>')
    })
  })
  console.log(colr);

  $.ajax({
    type: 'GET',
    url: 'https://eonet.sci.gsfc.nasa.gov/api/v2.1/events?api_key=e0xaFTehVbUGmZjo2H94BthXsxaR8YYemqp9imxM',
    dataType: 'json'
  }).done(function (fetchedData) {
    fetchedData.events.forEach(function (data) {
      totalColors.forEach(function (color) {
        if (data.categories[0].id === color.id) {
          markedColor = color.color
          console.log(markedColor)
        }
      })
      var geo = data.geometries
      if (geo[0].type === 'Point') {
        var setCircle = L.geoJson(geo, {
          pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, {
              radius: 15,
              color: markedColor,
              weight: 1,
              opacity: 1,
              fillOpacity: 0.4,
              fillColor: markedColor
            })
          }
        }).addTo(setMap)
      } else {
        setCircle = L.geoJson(geo, {
          style: {
            'color': markedColor,
            'weight': 2,
            'opacity': 1,
            fillOpacity: 0.4
          }
        }).addTo(setMap)
      }
      var date = new Date(geo[0].date).toDateString()
      setCircle.bindPopup(data.title + '<br>' + date)
      setCircle.addEventListener('click', function (e) {
        e = e || window.event
        $('#title').empty()
        $('#date').empty()
        $('#description').empty()
        $('#source').empty()

        $('#title').append(data.title)
        $('#date').append('CATEGORY: ' + data.categories[0].title + ' | ' + date)
        $('#description').append(data.description)
        $('#source').append('<a href="' + data.sources[0].url + '">[Source]</a>')
      })
    })
  })
})
