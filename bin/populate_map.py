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

    var element = document.getElementById('popup');

    var popup = new ol.Overlay({
        element: element,
        positioning: 'bottom-center',
        stopEvent: false,
        offset: [0, -50]
    });
    map.addOverlay(popup);

    // display popup on click
    map.on('click', function(evt) {
        var feature = map.forEachFeatureAtPixel(evt.pixel,
            function(feature) {
                return feature;
            });
        if (feature) {
            var coordinates = feature.getGeometry().getCoordinates();
            popup.setPosition(coordinates);
            $(element).popover({
                'placement': 'top',
                'html': true,
                'content': 'test' // feature.get('name')
            });
            $(element).popover('show');
        } else {
            $(element).popover('destroy');
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
                }})
                """.format(group['group'])
                line5 = """vectorSource.addFeature(iconFeature);
                """

                f.write(line1 + line2 + line3 + line4 + line5)

            f.write(self.js_static_end)

if __name__ == "__main__":
    runner = populateMap()
    runner.read_yaml()
    runner.generate_js()