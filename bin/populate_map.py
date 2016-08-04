#!/usr/bin/env python3
"""
Read the data file and write the required js to set up the map.

File: populate_map.py

Copyright 2016 Ankur Sinha
Author: Ankur Sinha <sanjay DOT ankur AT gmail DOT com>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
"""

import yaml


class populateMap:

    """Takes the data from the yaml file and generates the required js.

    It'll generate an output js file that index.html will use.
    """

    def __init__(self):
        """Initialise variables."""
        self.input_yaml = "data/groups.yaml"
        self.output_js = "js/cajal.js"

        # Beginning of file
        self.js_static_begin = """

/* The map */
var map;
var vectorLayer

function init() {
    addmarkers()

    map = new ol.Map({
        controls: ol.control.defaults({
            attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
                collapsible: true
            })
        }),
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            }),
            vectorLayer
        ],
        target: document.getElementById('map'),
        view: new ol.View({
            center: [0, 0],
            zoom: 2
        })
    });

    var popup = new ol.Overlay.Popup();
    map.addOverlay(popup);

    // display popup on click
    map.on('singleclick', function(evt) {
        popup.hide();
        popup.setOffset([0, 0]);

        var feature = map.forEachFeatureAtPixel(evt.pixel,
            function(feature, layer) {
                return feature;
            });
        if (feature) {
            var coordinates = feature.getGeometry().getCoordinates();
            var properties = feature.getProperties()
            info = "<h3>" + properties.name + "</h3>"
            popup.setOffset([0, -22]);
            popup.show(coordinates, info);

            var elementname = document.getElementById('labname');
            var elementleader = document.getElementById('lableader');
            var elementlocation = document.getElementById('lablocation');
            var elementwebsite = document.getElementById('labwebsite');
            var elementdescription = document.getElementById('labdescription');

            elementname.innerHTML = properties.name;
            elementleader.innerHTML = "<h4>Group leader: " + properties.leader + "</h4>";
            elementlocation.innerHTML = properties.location;
            elementwebsite.innerHTML = "<a href='" + properties.website + "'>" + properties.website + "</a>";
            elementdescription.innerHTML = properties.description;
        }
    });

    // change mouse cursor when over marker
    map.on('pointermove', function(e) {
        if (e.dragging) {
            $(element).popover('destroy');
            return;
        }
        var pixel = map.getEventPixel(e.originalEvent);
        var hit = map.hasFeatureAtPixel(pixel);
        map.getTarget().style.cursor = hit ? 'pointer' : '';
    });
}

function addmarkers() {
    /* This will read from the files and add markers for each based on location
     * It'll also create an associative array that will populate info on-click
     */
    /* Array of vector features */
    var vectorSource = new ol.source.Vector({
    });

"""
        # end of function
        self.js_static_end = """
    /* The icon style for all icons */
    var iconStyle = new ol.style.Style({
        image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
            anchor: [0.5, 46],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            src: 'http://openlayers.org/en/v3.17.1/examples/data/icon.png'
        }))
    });

    /* Populate the layer with all markers */
    vectorLayer = new ol.layer.Vector({
        source: vectorSource,
        style: iconStyle
    });
}
"""

    def read_yaml(self):
        """Read the yaml data into an object."""
        with open(self.input_yaml, 'r') as f:
            self.yaml_data = yaml.load(f)

        for group in self.yaml_data:
            print(group)

    def generate_js(self):
        """Generate the required js."""
        with open(self.output_js, 'w') as f:
            f.write(self.js_static_begin)
            for group in self.yaml_data:
                line1 = """
                var iconFeature = new ol.Feature({"""
                line2 = """
                geometry: new ol.geom.Point(ol.proj.transform([{}, {}],
                """.format(group['data']['coords']['long'],
                           group['data']['coords']['lat'])
                line3 = """'EPSG:4326','EPSG:3857')),
                """

                line4 = """name: '{}',
                """.format(group['group'])

                line5 = """leader: '{}',
                """.format(group['data']['leader'])

                line6 = """location: '{}',
                """.format(group['data']['location'])

                line7 = """website: '{}',
                """.format(group['data']['website'])

                line8 = """description: '{}',
                """.format(group['data']['description'].rstrip('\n'))

                lastline = """})
                vectorSource.addFeature(iconFeature);
                """

                f.write(line1 + line2 + line3 + line4 + line5 + line6 + line7 +
                        line8 + lastline)

            f.write(self.js_static_end)

if __name__ == "__main__":
    runner = populateMap()
    runner.read_yaml()
    runner.generate_js()
