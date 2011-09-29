///<reference name="MicrosoftAjax.debug.js"/>
//#region Info
// ------------------------------------------------------------------------------------------------
// Copyright (C) ArtemBG.
// ------------------------------------------------------------------------------------------------
// GoogleMap4.debug.js
// GoogleMap Control v5.0 javascipt library (debug).
//
// Assembly:    Artem.GooleMap
// Version:     5.0.0.0
// Project:     http://googlemap.codeplex.com
// Demo:        http://googlemap.artembg.com
// Author:      Velio Ivanov - velio@artembg.com
//              http://artembg.com
// License:     Microsoft Permissive License (Ms-PL) v1.1
//              http://www.codeplex.com/googlemap/license
// API:         http://code.google.com/apis/maps/
// Outlining:   VisualStudio 2010 JavaScript Outlining
//              http://jsoutlining.codeplex.com/
//#endregion

Type.registerNamespace("Artem.Google");
Type.registerNamespace("Artem.Google.Events");

//#region Map class aa ///////////////////////////////////////////////////////////////////////////////

Artem.Google.Map = function Artem_Google_Map(element) {
    /// <summary>This class represents the client GoogleMap control object.</summary>
    /// <field name="get_polygonEvents" type="Sys.EventHandlerList"></field>

    Artem.Google.Map.initializeBase(this, [element]);

    var self = this;

    var clientMapID = null;
    this.get_clientMapID = function () { return clientMapID; };
    this.set_clientMapID = function (value) { clientMapID = value; }

    var clientStateID = null;
    this.get_clientStateID = function () { return clientStateID; };
    this.set_clientStateID = function (value) { clientStateID = value; };

    var directionsEvents = null;
    this.get_directionsEvents = function (read) {
        if (directionsEvents == null && !read)
            directionsEvents = new Sys.EventHandlerList();
        return directionsEvents;
    };

    var loadDelegate = null;
    this.get_loadDelegate = function (getonly) {
        if (!loadDelegate && !getonly)
            loadDelegate = Function.createDelegate(self, self.load)
        return loadDelegate;
    };

    var map = null;
    this.get_map = function () { return map; };
    this.set_map = function (value) { map = value; };

    var mapEvents = null;
    this.get_mapEvents = function (read) {
        if (mapEvents == null && !read)
            mapEvents = new Sys.EventHandlerList();
        return mapEvents;
    };

    var mapPano = null;
    this.get_mapPano = function () { return mapPano; }
    this.set_mapPano = function (value) { mapPano = value; };

    var markerEvents = null;
    this.get_markerEvents = function (read) {
        if (markerEvents == null && !read)
            markerEvents = new Sys.EventHandlerList();
        return markerEvents;
    };

    var markerManager = null;
    this.get_markerManager = function () { return markerManager; };
    this.set_markerManager = function (value) { markerManager = value; }

    var name = null;
    this.get_name = function () { return name; };
    this.set_name = function (value) { name = value; };

    var partialUpdateDelegate = null;
    this.get_partialUpdateDelegate = function (getonly) {
        if (!partialUpdateDelegate && !getonly)
            partialUpdateDelegate = Function.createDelegate(self, self._onPartialUpdate)
        return partialUpdateDelegate;
    };

    var polygonEvents = null;
    this.get_polygonEvents = function (read) {
        if (polygonEvents == null && !read)
            polygonEvents = new Sys.EventHandlerList();
        return polygonEvents;
    };

    var polylineEvents = null;
    this.get_polylineEvents = function (read) {
        if (polylineEvents == null && !read)
            polylineEvents = new Sys.EventHandlerList();
        return polylineEvents;
    };

    var raiseServerEventDelegate = null;
    this.get_raiseServerEventDelegate = function (getonly) {
        if (!raiseServerEventDelegate && !getonly)
            raiseServerEventDelegate = Function.createDelegate(self, self._raiseServerEvent);
        return raiseServerEventDelegate;
    };

    var submitDelegate = null;
    this.get_submitDelegate = function (getonly) {
        if (!submitDelegate && !getonly)
            submitDelegate = Function.createDelegate(self, self._onSubmit);
        return submitDelegate;
    };

    // TODO check if this is needed
    //        var renderMarkerManagerDelegate = null;
};

Artem.Google.Map.prototype = {

    //#region Fields ------------------------------------------------------------------------------

    Address: null,
    AddressNotFound: false,
    BaseCountryCode: null,
    Bounds: null,
    ClientID: null,
    ClientMapID: null,
    ClientStateID: null,
    DefaultAddress: null,
    DefaultMapView: null,
    EnableContinuousZoom: null,
    EnableDoubleClickZoom: null,
    EnableDragging: null,
    EnableGoogleBar: null,
    EnableInfoWindow: null,
    EnableMarkerManager: null,
    EnableReverseGeocoding: null,
    EnableScrollWheelZoom: null,
    EnterpriseKey: null,
    Height: null,
    IsGeolocation: false,
    IsLoaded: false,
    IsStatic: null,
    IsStreetView: null,
    Key: null,
    Latitude: null,
    Longitude: null,
    MarkerManagerOptions: null,
    ShowMapTypeControl: null,
    ShowScaleControl: null,
    ShowTraffic: null,
    StreetViewMode: null,
    StreetViewPanoID: null,
    Width: null,
    Zoom: null,
    ZoomPanType: null,
    // collections
    Actions: [],
    Directions: [],
    Markers: [],
    Polygons: [],
    Polylines: [],

    //    // BEGIN OBSOLETE
    //    // events
    //    ClientEvents: null,
    //    ServerEvents: null,
    //    MarkerEvents: null,
    //    PolygonEvents: null,
    //    PolylineEvents: null,

    //    // END OBSOLETE

    //#endregion

    //#region Properties --------------------------------------------------------------------------

    get_clientMapID: null,
    set_clientMapID: null,
    get_clientStateID: null,
    set_clientStateID: null,
    get_directionsEvents: null,
    get_geocoder: null,
    get_loadDelegate: null,
    get_map: null,
    set_map: null,
    get_mapEvents: null,
    get_mapPano: null,
    set_mapPano: null,
    get_markerEvents: null,
    get_markerManager: null,
    set_markerManager: null,
    get_name: null,
    set_name: null,
    get_partialUpdateDelegate: null,
    get_polygonEvents: null,
    get_polylineEvents: null,
    get_raiseServerEventDelegate: null,
    get_submitDelegate: null,

    //#endregion

    //#region Events ------------------------------------------------------------------------------

    //#region MapEvents 

    // addmaptype event
    add_addmaptype: function Artem_Google_Map$add_addmaptype(handler) {
        this.get_mapEvents().addHandler("addmaptype", this._validateHandler("map", "addmaptype", handler));
    },
    remove_addmaptype: function Artem_Google_Map$remove_addmaptype(handler) {
        this.get_mapEvents().removeHandler("addmaptype", handler);
    },

    // addoverlay event
    add_addoverlay: function Artem_Google_Map$add_addoverlay(handler) {
        this.get_mapEvents().addHandler("addoverlay", this._validateHandler("map", "addoverlay", handler));
    },
    remove_addoverlay: function Artem_Google_Map$remove_addoverlay(handler) {
        this.get_mapEvents().removeHandler("addoverlay", handler);
    },

    // addressnotfound
    add_addressnotfound: function Artem_Google_Map$add_addressnotfound(handler) {
        this.get_events().addHandler("addressnotfound", this._validateHandler("map", "addressnotfound", handler));
    },
    remove_addressnotfound: function Artem_Google_Map$remove_addressnotfound(handler) {
        this.get_events().removeHandler("addressnotfound", handler);
    },
    _raiseAddressNotFound: function Artem_Google_Map$_raiseAddressNotFound(address) {
        var handler = this.get_events().getHandler('addressnotfound');
        if (handler) handler(address);
    },

    // clearoverlays event
    add_clearoverlays: function Artem_Google_Map$add_clearoverlays(handler) {
        this.get_mapEvents().addHandler("clearoverlays", this._validateHandler("map", "clearoverlays", handler));
    },
    remove_clearoverlays: function Artem_Google_Map$remove_clearoverlays(handler) {
        this.get_mapEvents().removeHandler("clearoverlays", handler);
    },

    // click event
    add_click: function Artem_Google_Map$add_click(handler) {
        this.get_mapEvents().addHandler("click", this._validateHandler("map", "click", handler));
    },
    remove_click: function Artem_Google_Map$remove_click(handler) {
        this.get_mapEvents().removeHandler("click", handler);
    },

    // dblclick event
    add_dblclick: function Artem_Google_Map$add_dblclick(handler) {
        this.get_mapEvents().addHandler("dblclick", this._validateHandler("map", "dblclick", handler));
    },
    remove_dblclick: function Artem_Google_Map$remove_dblclick(handler) {
        this.get_mapEvents().removeHandler("dblclick", handler);
    },

    // drag event
    add_drag: function Artem_Google_Map$add_drag(handler) {
        this.get_mapEvents().addHandler("drag", this._validateHandler("map", "drag", handler));
    },
    remove_drag: function Artem_Google_Map$remove_drag(handler) {
        this.get_mapEvents().removeHandler("drag", handler);
    },

    // dragend event
    add_dragend: function Artem_Google_Map$add_dragend(handler) {
        this.get_mapEvents().addHandler("dragend", this._validateHandler("map", "dragend", handler));
    },
    remove_dragend: function Artem_Google_Map$remove_dragend(handler) {
        this.get_mapEvents().removeHandler("dragend", handler);
    },

    // dragstart event
    add_dragstart: function Artem_Google_Map$add_dragstart(handler) {
        this.get_mapEvents().addHandler("dragstart", this._validateHandler("map", "dragstart", handler));
    },
    remove_dragstart: function Artem_Google_Map$remove_dragstart(handler) {
        this.get_mapEvents().removeHandler("dragstart", handler);
    },

    // geoload event
    add_geoload: function Artem_Google_Map$add_geoload(handler) {
        this.get_events().addHandler("geoload", this._validateHandler("map", "geoload", handler));
    },
    remove_geoload: function Artem_Google_Map$remove_geoload(handler) {
        this.get_events().removeHandler("geoload", handler);
    },
    _raiseGeoLoad: function Artem_Google_Map$_raisegeoload(address) {
        var handler = this.get_events().getHandler('geoload');
        if (handler) handler(address);
    },

    // infowindowbeforeclose event
    add_infowindowbeforeclose: function Artem_Google_Map$add_infowindowbeforeclose(handler) {
        this.get_mapEvents().addHandler("infowindowbeforeclose", this._validateHandler("map", "infowindowbeforeclose", handler));
    },
    remove_infowindowbeforeclose: function Artem_Google_Map$remove_infowindowbeforeclose(handler) {
        this.get_mapEvents().removeHandler("infowindowbeforeclose", handler);
    },

    // infowindowclose event
    add_infowindowclose: function Artem_Google_Map$add_infowindowclose(handler) {
        this.get_mapEvents().addHandler("infowindowclose", this._validateHandler("map", "infowindowclose", handler));
    },
    remove_infowindowclose: function Artem_Google_Map$remove_infowindowclose(handler) {
        this.get_mapEvents().removeHandler("infowindowclose", handler);
    },

    // infowindowopen event
    add_infowindowopen: function Artem_Google_Map$add_infowindowopen(handler) {
        this.get_mapEvents().addHandler("infowindowopen", this._validateHandler("map", "infowindowopen", handler));
    },
    remove_infowindowopen: function Artem_Google_Map$remove_infowindowopen(handler) {
        this.get_mapEvents().removeHandler("infowindowopen", handler);
    },

    // load event
    add_load: function Artem_Google_Map$add_load(handler) {
        this.get_mapEvents().addHandler("load", this._validateHandler("map", "load", handler));
    },
    remove_load: function Artem_Google_Map$remove_load(handler) {
        this.get_mapEvents().removeHandler("load", handler);
    },

    // locationloaded event
    add_locationloaded: function Artem_Google_Map$add_locationloaded(handler) {
        this.get_events().addHandler("locationloaded", this._validateHandler("map", "locationloaded", handler));
    },
    remove_locationloaded: function Artem_Google_Map$remove_locationloaded(handler) {
        this.get_events().removeHandler("locationloaded", handler);
    },
    _raiseLocationLoaded: function Artem_Google_Map$_raiseLocationLoaded(address) {
        var handler = this.get_events().getHandler('locationloaded');
        if (handler) handler(address);
    },

    // maptypechanged event
    add_maptypechanged: function Artem_Google_Map$add_maptypechanged(handler) {
        this.get_mapEvents().addHandler("maptypechanged", this._validateHandler("map", "maptypechanged", handler));
    },
    remove_maptypechanged: function Artem_Google_Map$remove_maptypechanged(handler) {
        this.get_mapEvents().removeHandler("maptypechanged", handler);
    },

    // mousedown event
    add_mousedown: function Artem_Google_Map$add_mousedown(handler) {
        this.get_mapEvents().addHandler("mousedown", this._validateHandler("map", "mousedown", handler));
    },
    remove_mousedown: function Artem_Google_Map$remove_mousedown(handler) {
        this.get_mapEvents().removeHandler("mousedown", handler);
        var y = "}";
    },

    // mousemove event
    add_mousemove: function Artem_Google_Map$add_mousemove(handler) {
        this.get_mapEvents().addHandler("mousemove", this._validateHandler("map", "mousemove", handler));
    },
    remove_mousemove: function Artem_Google_Map$remove_mousemove(handler) {
        this.get_mapEvents().removeHandler("mousemove", handler);
    },

    // mouseout event
    add_mouseout: function Artem_Google_Map$add_mouseout(handler) {
        this.get_mapEvents().addHandler("mouseout", this._validateHandler("map", "mouseout", handler));
    },
    remove_mouseout: function Artem_Google_Map$remove_mouseout(handler) {
        this.get_mapEvents().removeHandler("mouseout", handler);
    },

    // mouseover event
    add_mouseover: function Artem_Google_Map$add_mouseover(handler) {
        this.get_mapEvents().addHandler("mouseover", this._validateHandler("map", "mouseover", handler));
    },
    remove_mouseover: function Artem_Google_Map$remove_mouseover(handler) {
        this.get_mapEvents().removeHandler("mouseover", handler);
    },

    // mouseup event
    add_mouseup: function Artem_Google_Map$add_mouseup(handler) {
        this.get_mapEvents().addHandler("mouseup", this._validateHandler("map", "mouseup", handler));
    },
    remove_mouseup: function Artem_Google_Map$remove_mouseup(handler) {
        this.get_mapEvents().removeHandler("mouseup", handler);
    },

    // move event
    add_move: function Artem_Google_Map$add_move(handler) {
        this.get_mapEvents().addHandler("move", this._validateHandler("map", "move", handler));
    },
    remove_move: function Artem_Google_Map$remove_move(handler) {
        this.get_mapEvents().removeHandler("move", handler);
    },

    // moveend event
    add_moveend: function Artem_Google_Map$add_moveend(handler) {
        this.get_mapEvents().addHandler("moveend", this._validateHandler("map", "moveend", handler));
    },
    remove_moveend: function Artem_Google_Map$remove_moveend(handler) {
        this.get_mapEvents().removeHandler("moveend", handler);
    },

    // movestart event
    add_movestart: function Artem_Google_Map$add_movestart(handler) {
        this.get_mapEvents().addHandler("movestart", this._validateHandler("map", "movestart", handler));
    },
    remove_movestart: function Artem_Google_Map$remove_movestart(handler) {
        this.get_mapEvents().removeHandler("movestart", handler);
    },

    // removemaptype event
    add_removemaptype: function Artem_Google_Map$add_removemaptype(handler) {
        this.get_mapEvents().addHandler("removemaptype", this._validateHandler("map", "removemaptype", handler));
    },
    remove_removemaptype: function Artem_Google_Map$remove_removemaptype(handler) {
        this.get_mapEvents().removeHandler("removemaptype", handler);
    },

    // removeoverlay event
    add_removeoverlay: function Artem_Google_Map$add_removeoverlay(handler) {
        this.get_mapEvents().addHandler("removeoverlay", this._validateHandler("map", "removeoverlay", handler));
    },
    remove_removeoverlay: function Artem_Google_Map$remove_removeoverlay(handler) {
        this.get_mapEvents().removeHandler("removeoverlay", handler);
    },

    // singlerightclick event
    add_singlerightclick: function Artem_Google_Map$add_singlerightclick(handler) {
        this.get_mapEvents().addHandler("singlerightclick", this._validateHandler("map", "singlerightclick", handler));
    },
    remove_singlerightclick: function Artem_Google_Map$remove_singlerightclick(handler) {
        this.get_mapEvents().removeHandler("singlerightclick", handler);
    },

    // zoomend event
    add_zoomend: function Artem_Google_Map$add_zoomend(handler) {
        this.get_mapEvents().addHandler("zoomend", this._validateHandler("map", "zoomend", handler));
    },
    remove_zoomend: function Artem_Google_Map$remove_zoomend(handler) {
        this.get_mapEvents().removeHandler("zoomend", handler);
    },

    //#endregion

    //#region MarkerEvents

    add_marker_click: function (handler) {
        this.get_markerEvents().addHandler("click", this._validateHandler("marker", "click", handler));
    },
    remove_marker_click: function (handler) {
        this.get_markerEvents().removeHandler("click", handler);
    },

    add_marker_dblclick: function (handler) {
        this.get_markerEvents().addHandler("dblclick", this._validateHandler("marker", "dblclick", handler));
    },
    remove_marker_dblclick: function (handler) {
        this.get_markerEvents().removeHandler("dblclick", handler);
    },

    add_marker_drag: function (handler) {
        this.get_markerEvents().addHandler("drag", this._validateHandler("marker", "drag", handler));
    },
    remove_marker_drag: function (handler) {
        this.get_markerEvents().removeHandler("drag", handler);
    },

    add_marker_dragend: function (handler) {
        this.get_markerEvents().addHandler("dragend", this._validateHandler("marker", "dragend", handler));
    },
    remove_marker_dragend: function (handler) {
        this.get_markerEvents().removeHandler("dragend", handler);
    },

    add_marker_dragstart: function (handler) {
        this.get_markerEvents().addHandler("dragstart", this._validateHandler("marker", "dragstart", handler));
    },
    remove_marker_dragstart: function (handler) {
        this.get_markerEvents().removeHandler("dragstart", handler);
    },

    // TODO geoload

    add_marker_infowindowopen: function (handler) {
        this.get_markerEvents().addHandler("infowindowopen", this._validateHandler("marker", "infowindowopen", handler));
    },
    remove_marker_infowindowopen: function (handler) {
        this.get_markerEvents().removeHandler("infowindowopen", handler);
    },

    add_marker_infowindowbeforeclose: function (handler) {
        this.get_markerEvents().addHandler("infowindowbeforeclose", this._validateHandler("marker", "infowindowbeforeclose", handler));
    },
    remove_marker_infowindowbeforeclose: function (handler) {
        this.get_markerEvents().removeHandler("infowindowbeforeclose", handler);
    },

    add_marker_infowindowclose: function (handler) {
        this.get_markerEvents().addHandler("infowindowclose", this._validateHandler("marker", "infowindowclose", handler));
    },
    remove_marker_infowindowclose: function (handler) {
        this.get_markerEvents().removeHandler("infowindowclose", handler);
    },

    add_marker_mousedown: function (handler) {
        this.get_markerEvents().addHandler("mousedown", this._validateHandler("marker", "mousedown", handler));
    },
    remove_marker_mousedown: function (handler) {
        this.get_markerEvents().removeHandler("mousedown", handler);
    },

    add_marker_mouseout: function (handler) {
        this.get_markerEvents().addHandler("mouseout", this._validateHandler("marker", "mouseout", handler));
    },
    remove_marker_mouseout: function (handler) {
        this.get_markerEvents().removeHandler("mouseout", handler);
    },

    add_marker_mouseover: function (handler) {
        this.get_markerEvents().addHandler("mouseover", this._validateHandler("marker", "mouseover", handler));
    },
    remove_marker_mouseover: function (handler) {
        this.get_markerEvents().removeHandler("mouseover", handler);
    },

    add_marker_mouseup: function (handler) {
        this.get_markerEvents().addHandler("mouseup", this._validateHandler("marker", "mouseup", handler));
    },
    remove_marker_mouseup: function (handler) {
        this.get_markerEvents().removeHandler("mouseup", handler);
    },

    add_marker_remove: function (handler) {
        this.get_markerEvents().addHandler("remove", this._validateHandler("marker", "remove", handler));
    },
    remove_marker_remove: function (handler) {
        this.get_markerEvents().removeHandler("remove", handler);
    },

    add_marker_visibilitychanged: function (handler) {
        this.get_markerEvents().addHandler("visibilitychanged", this._validateHandler("marker", "visibilitychanged", handler));
    },
    remove_marker_visibilitychanged: function (handler) {
        this.get_markerEvents().removeHandler("visibilitychanged", handler);
    },

    //#endregion

    //#region DirectionsEvents

    add_directions_addoverlay: function (handler) {
        this.get_directionsEvents().addHandler("addoverlay", this._validateHandler("directions", "addoverlay", handler));
    },
    remove_directions_addoverlay: function (handler) {
        this.get_directionsEvents().removeHandler("addoverlay", handler);
    },

    add_directions_error: function (handler) {
        this.get_directionsEvents().addHandler("error", this._validateHandler("directions", "error", handler));
    },
    remove_directions_error: function (handler) {
        this.get_directionsEvents().removeHandler("error", handler);
    },

    add_directions_load: function (handler) {
        this.get_directionsEvents().addHandler("load", this._validateHandler("directions", "load", handler));
    },
    remove_directions_load: function (handler) {
        this.get_directionsEvents().removeHandler("load", handler);
    },

    //#endregion

    //#region PolygonEvents

    add_polygon_cancelline: function (handler) {
        this.get_polygonEvents().addHandler("cancelline", this._validateHandler("polygon", "cancelline", handler));
    },
    remove_polygon_cancelline: function (handler) {
        this.get_polygonEvents().removeHandler("cancelline", handler);
    },

    add_polygon_click: function (handler) {
        this.get_polygonEvents().addHandler("click", this._validateHandler("polygon", "click", handler));
    },
    remove_polygon_click: function (handler) {
        this.get_polygonEvents().removeHandler("click", handler);
    },

    add_polygon_endline: function (handler) {
        this.get_polygonEvents().addHandler("endline", this._validateHandler("polygon", "endline", handler));
    },
    remove_polygon_endline: function (handler) {
        this.get_polygonEvents().removeHandler("endline", handler);
    },

    add_polygon_lineupdated: function (handler) {
        this.get_polygonEvents().addHandler("lineupdated", this._validateHandler("polygon", "lineupdated", handler));
    },
    remove_polygon_lineupdated: function (handler) {
        this.get_polygonEvents().removeHandler("lineupdated", handler);
    },

    add_polygon_mouseout: function (handler) {
        this.get_polygonEvents().addHandler("mouseout", this._validateHandler("polygon", "mouseout", handler));
    },
    remove_polygon_mouseout: function (handler) {
        this.get_polygonEvents().removeHandler("mouseout", handler);
    },

    add_polygon_mouseover: function (handler) {
        this.get_polygonEvents().addHandler("mouseover", this._validateHandler("polygon", "mouseover", handler));
    },
    remove_polygon_mouseover: function (handler) {
        this.get_polygonEvents().removeHandler("mouseover", handler);
    },

    add_polygon_remove: function (handler) {
        this.get_polygonEvents().addHandler("remove", this._validateHandler("polygon", "remove", handler));
    },
    remove_polygon_remove: function (handler) {
        this.get_polygonEvents().removeHandler("remove", handler);
    },

    add_polygon_visibilitychanged: function (handler) {
        this.get_polygonEvents().addHandler("visibilitychanged", this._validateHandler("polygon", "visibilitychanged", handler));
    },
    remove_polygon_visibilitychanged: function (handler) {
        this.get_polygonEvents().removeHandler("visibilitychanged", handler);
    },

    //#endregion 

    //#region PolylineEvents

    add_polyline_cancelline: function (handler) {
        this.get_polylineEvents().addHandler("cancelline", this._validateHandler("polyline", "cancelline", handler));
    },
    remove_polyline_cancelline: function (handler) {
        this.get_polylineEvents().removeHandler("cancelline", handler);
    },

    add_polyline_click: function (handler) {
        this.get_polylineEvents().addHandler("click", this._validateHandler("polyline", "click", handler));
    },
    remove_polyline_click: function (handler) {
        this.get_polylineEvents().removeHandler("click", handler);
    },

    add_polyline_endline: function (handler) {
        this.get_polylineEvents().addHandler("endline", this._validateHandler("polyline", "endline", handler));
    },
    remove_polyline_endline: function (handler) {
        this.get_polylineEvents().removeHandler("endline", handler);
    },

    add_polyline_lineupdated: function (handler) {
        this.get_polylineEvents().addHandler("lineupdated", this._validateHandler("polyline", "lineupdated", handler));
    },
    remove_polyline_lineupdated: function (handler) {
        this.get_polylineEvents().removeHandler("lineupdated", handler);
    },

    add_polyline_mouseout: function (handler) {
        this.get_polylineEvents().addHandler("mouseout", this._validateHandler("polyline", "mouseout", handler));
    },
    remove_polyline_mouseout: function (handler) {
        this.get_polylineEvents().removeHandler("mouseout", handler);
    },

    add_polyline_mouseover: function (handler) {
        this.get_polylineEvents().addHandler("mouseover", this._validateHandler("polyline", "mouseover", handler));
    },
    remove_polyline_mouseover: function (handler) {
        this.get_polylineEvents().removeHandler("mouseover", handler);
    },

    add_polyline_remove: function (handler) {
        this.get_polylineEvents().addHandler("remove", this._validateHandler("polyline", "remove", handler));
    },
    remove_polyline_remove: function (handler) {
        this.get_polylineEvents().removeHandler("remove", handler);
    },

    add_polyline_visibilitychanged: function (handler) {
        this.get_polylineEvents().addHandler("visibilitychanged", this._validateHandler("polyline", "visibilitychanged", handler));
    },
    remove_polyline_visibilitychanged: function (handler) {
        this.get_polylineEvents().removeHandler("visibilitychanged", handler);
    },

    //#endregion

    //#endregion

    //#region Base --------------------------------------------------------------------------------

    initialize: function Artem_Google_Map$initialize() {
        Artem.Google.Map.callBaseMethod(this, 'initialize');

        eval("window." + this.get_clientMapID() + " = this;");
        this.__loadState();

        // create map
        if (!this.IsStatic && !(this.IsStreetView && this.StreetViewMode == 0)) {
            var options;
            if (this.Width && this.Height)
                options = { size: new GSize(this.Width, this.Height) };
            this.set_map(new GMap2(this.get_element(), options));
        }
        // create geocoder
        var geocoder = new GClientGeocoder();
        if (this.BaseCountryCode)
            geocoder.setBaseCountryCode(this.BaseCountryCode);
        this.get_geocoder = function () { return geocoder; };

        this._attachEvents();
        this.load();
    },

    dispose: function Artem_Google_Map$dispose() {

        this.clearMarkers();
        this.clearDirections();
        this.clearPolygons();
        this.clearPolylines()

        this._detachEvents();

        //#region properties

        delete this.get_clientMapID;
        delete this.get_clientStateID;
        delete this.get_geocoder;
        delete this.get_loadDelegate;
        delete this.get_map;
        delete this.get_mapEvents;
        delete this.get_mapPano;
        delete this.get_markerManager;
        delete this.get_name;
        delete this.get_partialUpdateDelegate;
        delete this.get_polygonEvents;
        delete this.get_polylineEvents;
        delete this.get_raiseServerEventDelegate;
        delete this.get_submitDelegate;

        //#endregion

        //#region fields 
        delete this.Actions;
        delete this.Address;
        delete this.AddressNotFound;
        delete this.BaseCountryCode;
        delete this.Bounds;
        delete this.ClentAddressNotFoundIndex;
        delete this.ClientEvents;
        delete this.ClientID;
        delete this.ClientMapID;
        delete this.ClientStateID;
        delete this.DefaultAddress;
        delete this.DefaultMapView;
        delete this.Directions;
        delete this.EnableContinuousZoom;
        delete this.EnableDoubleClickZoom;
        delete this.EnableDragging;
        delete this.EnableGoogleBar;
        delete this.EnableInfoWindow;
        delete this.EnableMarkerManager;
        delete this.EnableReverseGeocoding;
        delete this.EnableScrollWheelZoom;
        delete this.EnterpriseKey;
        delete this.Height;
        delete this.IsGeolocation;
        delete this.IsLoaded;
        delete this.IsStatic;
        delete this.IsStreetView;
        delete this.Key;
        delete this.Latitude;
        delete this.Longitude;
        delete this.MarkerEvents;
        delete this.MarkerManagerOptions;
        delete this.Markers;
        delete this.PolygonEvents;
        delete this.Polygons;
        delete this.PolylineEvents;
        delete this.Polylines;
        delete this.ServerEvents;
        delete this.ShowMapTypeControl;
        delete this.ShowScaleControl;
        delete this.ShowTraffic;
        delete this.StreetViewMode;
        delete this.StreetViewPanoID;
        delete this.Width;
        delete this.Zoom;
        delete this.ZoomPanType;
        //#endregion

        Artem.Google.Map.callBaseMethod(this, 'dispose');
    },
    //#endregion

    //#region Private Methods ---------------------------------------------------------------------

    __loadState: function Artem_Google_Map$__loadState() {

        var stateField = $get(this.get_clientStateID());
        if (stateField) {
            var stateContent = stateField.value;
            if (stateContent == 'undefined' || stateContent == '') return;
            var state = Sys.Serialization.JavaScriptSerializer.deserialize(stateContent, true);

            this.Address = state.Address;
            this.BaseCountryCode = state.BaseCountryCode;
            this.Bounds = state.Bounds;
            this.DefaultAddress = state.DefaultAddress;
            this.DefaultMapView = state.DefaultMapView;
            this.Directions = state.Directions;
            this.EnableContinuousZoom = state.EnableContinuousZoom;
            this.EnableDoubleClickZoom = state.EnableDoubleClickZoom;
            this.EnableDragging = state.EnableDragging;
            this.EnableGoogleBar = state.EnableGoogleBar;
            this.EnableInfoWindow = state.EnableInfoWindow;
            this.EnableMarkerManager = state.EnableMarkerManager;
            this.EnableReverseGeocoding = state.EnableReverseGeocoding;
            this.EnableScrollWheelZoom = state.EnableScrollWheelZoom;
            this.EnterpriseKey = state.EnterpriseKey;
            this.Height = state.Height;
            this.IsStatic = state.IsStatic;
            this.IsStreetView = state.IsStreetView;
            this.Key = state.Key;
            this.Latitude = state.Latitude;
            this.Longitude = state.Longitude;
            //    this.MarkerManagerOptions = state.MarkerManagerOptions;
            this.Markers = state.Markers;
            this.Polygons = state.Polygons;
            this.Polylines = state.Polylines;
            this.ShowMapTypeControl = state.ShowMapTypeControl;
            this.ShowScaleControl = state.ShowScaleControl;
            this.ShowTraffic = state.ShowTraffic;
            this.StreetViewMode = state.StreetViewMode;
            this.StreetViewPanoID = state.StreetViewPanoID;
            this.Width = state.Width;
            this.Zoom = state.Zoom;
            this.ZoomPanType = state.ZoomPanType;

            //        // events
            //        if (config.MapEvents) {
            //            this.ClientEvents = config.MapEvents.ClientEvents;
            //            this.ServerEvents = config.MapEvents.ServerEvents;
            //        }
            //        this.MarkerEvents = config.MarkerEvents;
            //        this.PolygonEvents = config.PolygonEvents;
            //        this.PolylineEvents = config.PolylineEvents;
        }
    },

    __saveState: function Artem_Google_Map$__saveState() {

        var stateField = $get(this.get_clientStateID());
        if (stateField) {
            var i;
            var center = this.getCenter();

            this.Bounds = new Artem.Google.Bounds(this.getBounds());
            this.Latitude = (center !== null) ? center.lat() : 0;
            this.Longitude = (center !== null) ? center.lng() : 0;
            this.Zoom = this.getZoom() || 0;

            if (this.Markers) {
                for (i = 0; i < this.Markers.length; i++) {
                    this.Markers[i].save();
                }
            }
            if (this.Directions) {
                for (i = 0; i < this.Directions.length; i++) {
                    this.Directions[i].save();
                }
            }
            if (this.Polygons) {
                for (i = 0; i < this.Polygons.length; i++) {
                    this.Polygons[i].save();
                }
            }
            if (this.Polylines) {
                for (i = 0; i < this.Polylines.length; i++) {
                    this.Polylines[i].save();
                }
            }
            stateField.value = Sys.Serialization.JavaScriptSerializer.serialize(this);
        }
    },

    _attachEvents: function Artem_Google_Map$_attachEvents() {

        if (typeof (Sys.WebForms) !== "undefined" && typeof (Sys.WebForms.PageRequestManager) !== "undefined") {
            var requestManager = Sys.WebForms.PageRequestManager.getInstance();
            if (requestManager) {
                Array.add(requestManager._onSubmitStatements, this.get_submitDelegate());
                requestManager.add_endRequest(this.get_partialUpdateDelegate());
            }
        }
        else {
            $addHandler(document.forms[0], "submit", this.get_submitDelegate());
        }

        // map events
        var name, handler;
        var events = this.get_mapEvents();
        var map = this.get_map();
        for (name in events._list) {
            handler = events.getHandler(name);
            GEvent.addListener(map, name, handler);
        }
    },

    _detachEvents: function Artem_Google_Map$_detachEvents() {

        var delegate;
        if (typeof (Sys.WebForms) !== "undefined" && typeof (Sys.WebForms.PageRequestManager) !== "undefined") {
            var requestManager = Sys.WebForms.PageRequestManager.getInstance();
            if (requestManager) {
                delegate = this.get_partialUpdateDelegate(true);
                if (delegate) {
                    requestManager.remove_endRequest(delegate);
                }
                delegate = this.get_submitDelegate(true);
                if (delegate) {
                    Array.remove(requestManager._onSubmitStatements, delegate);
                }
            }
        }
        else {
            delegate = this.get_submitDelegate(true);
            if (delegate) {
                $removeHandler(document.forms[0], "submit", delegate);
            }
        }

        // remove map event handlers
        GEvent.clearInstanceListeners(this.get_map());
    },

    _onPartialUpdate: function Artem_Google_Map$_onPartialUpdate() {
        this.__loadState();
        return true;
    },

    _onSubmit: function Artem_Google_Map$_onSubmit() {
        this.__saveState();
        return true;
    },

    _raiseServerEvent: function Artem_Google_Map$_raiseServerEvent() {

        if (arguments.length > 0) {
            var index = arguments.length - 1;
            var entry = arguments[index];
            var name = entry.name;
            var type = entry.type;
            var data = type + ":" + name;
            var args;

            switch (name) {
                case "addressnotfound":
                case "geoload":
                case "locationloaded":
                    args = new Artem.Google.Events.AddressEventArgs(arguments[0]);
                    break;
                case "click":
                case "dblclick":
                    if (type == "map")
                    // overlay argument passed is not used so far
                        args = new Artem.Google.Events.LocationEventArgs(arguments[1]);
                    else
                        args = new Artem.Google.Events.LocationEventArgs(arguments[0]);
                    break;
                case "dragend":
                case "dragstart":
                    args = new Artem.Google.Events.BoundsEventArgs(this.getBounds());
                    break;
                case "mousemove":
                case "mouseover":
                case "mouseout":
                case "singlerightclick":
                    args = new Artem.Google.Events.LocationEventArgs(arguments[0]);
                    break;
                case "zoomend":
                    args = Artem.Google.Events.ZoomEventArgs(arguments[0], arguments[1]);
                    break;
                case "addmaptype":
                case "addoverlay":
                case "clearoverlays":
                case "drag":
                case "infowindowbeforeclose":
                case "infowindowclose":
                case "infowindowopen":
                case "load":
                case "maptypechanged":
                case "move":
                case "moveend":
                case "movestart":
                case "removemaptype":
                case "removeoverlay":
                    // overlay argument passed is not used so far
                    break;
            }

            if (args)
                data += "$" + Sys.Serialization.JavaScriptSerializer.serialize(args);
            __doPostBack(this.get_name(), data);
        }
    },

    _validateHandler: function Artem_Google_Map$_validateHandler(type, name, handler) {
        return (handler == Artem.Google.serverHandler)
            ? Function.createCallback(this.get_raiseServerEventDelegate(), { name: name, type: type })
            : handler;
    },

    //#endregion

    //#region Public Methods ----------------------------------------------------------------------

    addDirections: function Artem_Google_Map$addDirections(state) {
        if (!this.Directions) this.Directions = new Array();
        this.Directions.push(new Artem.Google.Directions(this, state));
    },

    addMarker: function Artem_Google_Map$addMarker(state) {
        if (!this.Markers) this.Markers = new Array();
        this.Markers.push(new Artem.Google.Marker(this, state));
    },

    addPolygon: function Artem_Google_Map$addPolygon(state) {
        if (!this.Polygons) this.Polygons = new Array();
        this.Polygons.push(new Artem.Google.Polygon(this, state));
    },

    addPolyline: function Artem_Google_Map$addPolyline(state) {
        if (!this.Polylines) this.Polylines = new Array();
        this.Polylines.push(new Artem.Google.Polyline(this, state));
    },

    clearDirections: function Artem_Google_Map$clearDirections(config) {

        if (this.Directions) {
            for (var i = 0; i < this.Directions.length; i++) {
                this.Directions[i].dispose();
            }
            this.Directions = new Array();
        }
    },

    clearMarkers: function Artem_Google_Map$clearMarkers() {

        if (this.Markers) {
            for (var i = 0; i < this.Markers.length; i++) {
                this.Markers[i].dispose();
            }
            this.Markers = new Array();
        }
    },

    clearPolygons: function Artem_Google_Map$clearPolygons(config) {

        if (this.Polygons) {
            for (var i = 0; i < this.Polygons.length; i++) {
                this.Polygons[i].dispose();
            }
            this.Polygons = new Array();
        }
    },

    clearPolylines: function Artem_Google_Map$clearPolylines(config) {

        if (this.Polylines) {
            for (var i = 0; i < this.Polylines.length; i++) {
                this.Polylines[i].dispose();
            }
            this.Polylines = new Array();
        }
    },

    load: function Artem_Google_Map$load(point) {
        if (point) {
            if (!this.IsStatic && !(this.IsStreetView && this.StreetViewMode == 0)) {
                this.Latitude = point.lat();
                this.Longitude = point.lng();
                this.setCenter(point, this.Zoom);
                if (this.IsGeolocation) {
                    this.IsGeolocation = false;
                    this._raiseGeoLoad(this.Address);
                }
                if (this.EnableReverseGeocoding && !this.Address) {
                    var delegate = Function.Delegate.create(this, this.setAddress);
                    this.get_geocoder().getLocations(point, delegate);
                }
                this.preRender();
                this.render();
                this.checkResize();
            }
            else if (this.IsStreetView) {
                this.loadStreetView(point);
            }
            else {
                this.loadStatic();
            }
            this.IsLoaded = true;
        }
        else {
            if ((this.Latitude !== 0) && (this.Longitude !== 0))
                this.load(new GLatLng(this.Latitude, this.Longitude));
            else {
                if (!this.IsGeolocation) {
                    this.IsGeolocation = true;
                    this.get_geocoder().getLatLng(this.Address, this.get_loadDelegate());
                }
                else if (!this.AddressNotFound) {
                    this._raiseAddressNotFound(this.Address);
                    this.AddressNotFound = true;
                    if (this.DefaultAddress) {
                        this.Address = this.DefaultAddress;
                        this.get_geocoder().getLatLng(this.Address, this.get_loadDelegate());
                    }
                }
            }
        }
    },

    loadAddress: function Artem_Google_Map$loadAddress(address) {
        this.Address = address;
        this.IsGeolocation = true;
        this.get_geocoder().getLatLng(this.Address, this.get_loadDelegate());
    },

    loadStatic: function Artem_Google_Map$loadStatic() {
        var el = this.get_element();
        //
        var width = 512;
        if (this.Didth && this.Width < 512) width = this.Width;
        var height = 512;
        if (this.Height && this.Height < 512) height = this.Height;
        //
        var src = "http:\/\/maps.google.com\/staticmap?";
        src += "center=" + this.Latitude + "," + this.Longitude + "&";
        src += "zoom=" + this.Zoom + "&";
        src += "size=" + width + "x" + height + "&";
        if (this.EnterpriseKey)
            src += "enterpriseKey=" + this.EnterpriseKey + "&";
        src += "key=" + this.Key;
        // markers
        if (this.Markers) {
            var i;
            src += "&markers=";
            for (i = 0; i < this.Markers.length; i++)
                src += this.Markers[i].Latitude + "," + this.Markers[i].Longitude + "|";
        }
        // 
        var img = document.createElement("img");
        img.src = src;
        el.appendChild(img);
    },

    loadStreetView: function Artem_Google_Map$loadStreetView(point) {
        var map = new GStreetviewPanorama(this.get_element(), { latlng: point });
        map.checkResize();
        this.set_map(map);
        //        GEvent.addListener(this.GMapPano, "error", function() {
        //            if (errorCode == 603) {
        //                alert("Error: Flash doesn't appear to be supported by your browser");
        //                return;
        //            }
        //        });
    },

    preRender: function Artem_Google_Map$preRender() {
        // behaviour
        (this.EnableContinuousZoom) ? this.enableContinuousZoom() : this.disableContinuousZoom();
        (this.EnableDoubleClickZoom) ? this.enableDoubleClickZoom() : this.disableDoubleClickZoom();
        (this.EnableDragging) ? this.enableDragging() : this.disableDragging();
        (this.EnableGoogleBar) ? this.enableGoogleBar() : this.disableGoogleBar();
        (this.EnableInfoWindow) ? this.enableInfoWindow() : this.disableInfoWindow();
        (this.EnableScrollWheelZoom) ? this.enableScrollWheelZoom() : this.disableScrollWheelZoom();
        // controls
        var map = this.get_map();
        switch (this.ZoomPanType) {
            case 1:
                map.addControl(new GLargeMapControl());
                break;
            case 2:
                map.addControl(new GSmallZoomControl());
                break;
            case 3:
                map.addControl(new GSmallZoomControl3D());
                break;
            case 4:
                map.addControl(new GLargeMapControl3D());
                break;
            default:
                map.addControl(new GSmallMapControl());
                break;
        }
        if (this.ShowMapTypeControl) map.addControl(new GMapTypeControl());
        if (this.ShowScaleControl) map.addControl(new GScaleControl());
        if (this.ShowTraffic) map.addOverlay(new GTrafficOverlay());
        // enable marker manager
        if (this.EnableMarkerManager)
            this.set_markerManager(new MarkerManager(map, this.MarkerManagerOptions));
        // map view
        this.setMapView();
        // street view
        if (this.IsStreetView && this.StreetViewMode == 1) {
            var panoID = this.StreetViewPanoID || (this.ClientID + "_Pano");
            this.set_mapPano(new GStreetviewPanorama(document.getElementById(panoID)));
            map.addOverlay(new GStreetviewOverlay());
            GEvent.addListener(map, "click", Function.Delegate.create(this, this.setStreetView));
            //            function(overlay, latlng) {
            //                pano.setLocationAndPOV(latlng);
            //            });
        }
    },

    removeDirections: function Artem_Google_Map$removeDirections(index) {
        var items = this.Directions.splice(index, 1)
        if (items && items.length) items[0].dispose();
    },

    removeMarker: function Artem_Google_Map$removeMarker() {
        var items = this.Markers.splice(index, 1)
        if (items && items.length) items[0].dispose();
    },

    removePolygon: function Artem_Google_Map$removePolygon() {
        var items = this.Polygons.splice(index, 1)
        if (items && items.length) items[0].dispose();
    },

    removePolyline: function Artem_Google_Map$removePolyline() {
        var items = this.Polylines.splice(index, 1)
        if (items && items.length) items[0].dispose();
    },

    render: function Artem_Google_Map$render() {
        var i, name, handler;
        // markers
        if (this.Markers) {
            for (i = 0; i < this.Markers.length; i++) {
                this.Markers[i] = new Artem.Google.Marker(this, this.Markers[i]);
                // attach events
                for (name in this.get_markerEvents()._list) {
                    handler = this.get_markerEvents().getHandler(name);
                    GEvent.addListener(this.Markers[i].get_marker(), name, handler);
                }
            }
        }
        // directions
        if (this.Directions) {
            for (i = 0; i < this.Directions.length; i++) {
                this.Directions[i] = new Artem.Google.Directions(this, this.Directions[i]);
                // attach events
                for (name in this.get_directionsEvents()._list) {
                    handler = this.get_directionsEvents().getHandler(name);
                    GEvent.addListener(this.Directions[i].get_directions(), name, handler);
                }
            }
        }
        // polygons
        if (this.Polygons) {
            for (i = 0; i < this.Polygons.length; i++) {
                this.Polygons[i] = new Artem.Google.Polygon(this, this.Polygons[i]);
                // attach events
                for (name in this.get_polygonEvents()._list) {
                    handler = this.get_polygonEvents().getHandler(name);
                    GEvent.addListener(this.Polygons[i].get_polygon(), name, handler);
                }
            }
        }
        // polylines
        if (this.Polylines) {
            for (i = 0; i < this.Polylines.length; i++) {
                this.Polylines[i] = new Artem.Google.Polyline(this, this.Polylines[i]);
                // attach events
                for (name in this.get_polylineEvents()._list) {
                    handler = this.get_polylineEvents().getHandler(name);
                    GEvent.addListener(this.Polylines[i].get_polyline(), name, handler);
                }
            }
        }
        //        // fire actions
        //        if (this.Actions) {
        //            for (var i = 0; i < this.Actions.length; i++) {
        //                Function.Delegate.callFromString(this, this.Actions[i]);
        //            }
        //        }
    },

    renderMarkerManager: function Artem_Google_Map$renderMarkerManager() {
        if (this.EnableMarkerManager) {
            var marker;
            for (var i = 0; i < this.Markers.length; i++) {
                marker = this.Markers[i];
                this.get_markerManager().addMarker(marker.GMarker, marker.MinZoom, marker.MaxZoom);
            }
            this.get_markerManager().refresh();
        }
    },

    setAddress: function Artem_Google_Map$setAddress(addresses) {
        if (addresses.Status.code == 200) {
            try {
                this.Address = addresses.Placemark[0].address;
                this._raiseLocationLoaded(this.Address);
            }
            catch (ex) { }
        }
    },

    setMapView: function Artem_Google_Map$setMapView() {
        // set view
        var map = this.get_map();
        if (this.DefaultMapView) {
            switch (this.DefaultMapView) {
                case Artem.Google.MapView.Normal:
                    map.setMapType(G_NORMAL_MAP);
                    break;
                case Artem.Google.MapView.Satellite:
                    map.setMapType(G_SATELLITE_MAP);
                    break;
                case Artem.Google.MapView.Hybrid:
                    map.setMapType(G_HYBRID_MAP);
                    break;
                case Artem.Google.MapView.Physical:
                    map.addMapType(G_PHYSICAL_MAP);
                    map.setMapType(G_PHYSICAL_MAP);
                    break;
                case Artem.Google.MapView.MoonElevation:
                    map.addMapType(G_MOON_ELEVATION_MAP);
                    map.setMapType(G_MOON_ELEVATION_MAP);
                    break;
                case Artem.Google.MapView.MoonVisible:
                    map.addMapType(G_MOON_VISIBLE_MAP);
                    map.setMapType(G_MOON_VISIBLE_MAP);
                    break;
                case Artem.Google.MapView.MarsElevation:
                    map.addMapType(G_MARS_ELEVATION_MAP);
                    map.setMapType(G_MARS_ELEVATION_MAP);
                    break;
                case Artem.Google.MapView.MarsVisible:
                    map.addMapType(G_MARS_VISIBLE_MAP);
                    map.setMapType(G_MARS_VISIBLE_MAP);
                    break;
                case Artem.Google.MapView.MarsInfrared:
                    map.addMapType(G_MARS_INFRARED_MAP);
                    map.setMapType(G_MARS_INFRARED_MAP);
                    break;
                case Artem.Google.MapView.SkyVisible:
                    map.addMapType(G_SKY_VISIBLE_MAP);
                    map.setMapType(G_SKY_VISIBLE_MAP);
                    break;
                case Artem.Google.MapView.Satellite3D:
                    map.addMapType(G_SATELLITE_3D_MAP);
                    map.setMapType(G_SATELLITE_3D_MAP);
                    break;
                case Artem.Google.MapView.MapMakerNormal:
                    map.addMapType(G_MAPMAKER_NORMAL_MAP);
                    map.setMapType(G_MAPMAKER_NORMAL_MAP);
                    break;
                case Artem.Google.MapView.MapMakerHybrid:
                    map.addMapType(G_MAPMAKER_HYBRID_MAP);
                    map.setMapType(G_MAPMAKER_HYBRID_MAP);
                    break;
            }
        }
    },

    setStreetView: function Artem_Google_Map$setStreetView(overlay, latlng) {
        this.get_mapPano().setLocationAndPOV(latlng);
    },
    //#endregion

    //#region Google Maps API Wrapped -------------------------------------------------------------

    addControl: function Artem_Google_Map$addControl(control, position) {
        this.get_map().addControl(control, position);
    },

    addMapType: function Artem_Google_Map$addMapType(type) {
        this.get_map().addMapType(type);
    },

    addOverlay: function Artem_Google_Map$addOverlay(overlay) {
        this.get_map().addOverlay(overlay);
    },

    checkResize: function Artem_Google_Map$checkResize() {
        this.get_map().checkResize();
    },

    clearOverlays: function Artem_Google_Map$clearOverlays() {
        this.get_map().clearOverlays();
    },

    closeInfoWindow: function Artem_Google_Map$closeInfoWindow() {
        this.get_map().closeInfoWindow();
    },

    continuousZoomEnabled: function Artem_Google_Map$continuousZoomEnabled() {
        return this.get_map().continuousZoomEnabled();
    },

    disableContinuousZoom: function Artem_Google_Map$disableContinuousZoom() {
        this.get_map().disableContinuousZoom();
    },

    disableDoubleClickZoom: function Artem_Google_Map$disableDoubleClickZoom() {
        this.get_map().disableDoubleClickZoom();
    },

    disableDragging: function Artem_Google_Map$disableDragging() {
        this.get_map().disableDragging();
    },

    disableGoogleBar: function Artem_Google_Map$disableGoogleBar() {
        this.get_map().disableGoogleBar();
    },

    disableInfoWindow: function Artem_Google_Map$disableInfoWindow() {
        this.get_map().disableInfoWindow();
    },

    disableScrollWheelZoom: function Artem_Google_Map$disableScrollWheelZoom() {
        this.get_map().disableScrollWheelZoom();
    },

    doubleClickZoomEnabled: function Artem_Google_Map$doubleClickZoomEnabled() {
        return this.get_map().doubleClickZoomEnabled();
    },

    draggingEnabled: function Artem_Google_Map$draggingEnabled() {
        return this.get_map().draggingEnabled();
    },

    enableContinuousZoom: function Artem_Google_Map$enableContinuousZoom() {
        this.get_map().enableContinuousZoom();
    },

    enableDoubleClickZoom: function Artem_Google_Map$enableDoubleClickZoom() {
        this.get_map().enableDoubleClickZoom();
    },

    enableDragging: function Artem_Google_Map$enableDragging() {
        this.get_map().enableDragging();
    },

    enableGoogleBar: function Artem_Google_Map$enableGoogleBar() {
        this.get_map().enableGoogleBar();
    },

    enableInfoWindow: function Artem_Google_Map$enableInfoWindow() {
        this.get_map().enableInfoWindow();
    },

    enableScrollWheelZoom: function Artem_Google_Map$enableScrollWheelZoom() {
        this.get_map().enableScrollWheelZoom();
    },

    fromContainerPixelToLatLng: function Artem_Google_Map$fromContainerPixelToLatLng(pixel) {
        return this.get_map().fromContainerPixelToLatLng(pixel);
    },

    fromDivPixelToLatLng: function Artem_Google_Map$fromDivPixelToLatLng(pixel) {
        return this.get_map().fromDivPixelToLatLng(pixel);
    },

    fromLatLngToDivPixel: function Artem_Google_Map$fromLatLngToDivPixel(latlng) {
        return this.get_map().fromLatLngToDivPixel(latlng);
    },

    getBounds: function Artem_Google_Map$getBounds() {
        return this.get_map().getBounds();
    },

    getBoundsZoomLevel: function Artem_Google_Map$getBoundsZoomLevel() {
        return this.get_map().getBoundsZoomLevel();
    },

    getCenter: function Artem_Google_Map$getCenter() {
        return this.get_map().getCenter();
    },

    getContainer: function Artem_Google_Map$getContainer() {
        return this.get_map().getContainer();
    },

    getCurrentMapType: function Artem_Google_Map$getCurrentMapType() {
        return this.get_map().getCurrentMapType();
    },

    getDragObject: function Artem_Google_Map$getDragObject() {
        return this.get_map().getDragObject();
    },

    getInfoWindow: function Artem_Google_Map$getInfoWindow() {
        return this.get_map().getInfoWindow();
    },

    getMapTypes: function Artem_Google_Map$getMapTypes() {
        return this.get_map().getMapTypes();
    },

    getPane: function Artem_Google_Map$getPane(pane) {
        return this.get_map().getPane();
    },

    getSize: function Artem_Google_Map$getSize() {
        return this.get_map().getSize();
    },

    getZoom: function Artem_Google_Map$getZoom() {
        return this.get_map().getZoom();
    },

    infoWindowEnabled: function Artem_Google_Map$infoWindowEnabled() {
        return this.get_map().infoWindowEnabled();
    },

    isLoaded: function Artem_Google_Map$isLoaded() {
        return this.get_map().isLoaded();
    },

    openInfoWindow: function Artem_Google_Map$openInfoWindow(point, node, opts) {
        this.get_map().openInfoWindow(point, node, opts);
    },

    openInfoWindowHtml: function Artem_Google_Map$openInfoWindowHtml(point, html, opts) {
        this.get_map().openInfoWindowHtml(point, html, opts);
    },

    panBy: function Artem_Google_Map$panBy(distance) {
        this.get_map().panBy(distance);
    },

    panDirection: function Artem_Google_Map$panDirection(dx, dy) {
        this.get_map().panDirection(dx, dy);
    },

    panTo: function Artem_Google_Map$panTo(center) {
        this.get_map().panTo(center);
    },

    removeControl: function Artem_Google_Map$removeControl(control) {
        this.get_map().removeControl(control);
    },

    removeMapType: function Artem_Google_Map$removeMapType(type) {
        this.get_map().removeMapType();
    },

    removeOverlay: function Artem_Google_Map$removeOverlay(overlay) {
        this.get_map().removeOverlay(overlay);
    },

    returnToSavedPosition: function Artem_Google_Map$returnToSavedPosition() {
        this.get_map().returnToSavedPosition();
    },

    savePosition: function Artem_Google_Map$savePosition() {
        this.get_map().savePosition();
    },

    scrollWheelZoomEnabled: function Artem_Google_Map$scrollWheelZoomEnabled() {
        return this.get_map().scrollWheelZoomEnabled();
    },

    setCenter: function Artem_Google_Map$setCenter(point, zoom, type) {
        this.get_map().setCenter(point, zoom, type);
    },

    setMapType: function Artem_Google_Map$setMapType(type) {
        this.get_map().setMapType(type);
    },

    setZoom: function Artem_Google_Map$setZoom(level) {
        this.get_map().setZoom(level);
    },

    zoomIn: function Artem_Google_Map$zoomIn() {
        this.get_map().zoomIn();
    },

    zoomOut: function Artem_Google_Map$zoomOut() {
        this.get_map().zoomOut();
    }
    //#endregion
};

Artem.Google.Map.registerClass("Artem.Google.Map", Sys.UI.Control);
//#endregion

//#region Marker class ////////////////////////////////////////////////////////////////////////////

Artem.Google.Marker = function Artem_Google_Marker(map, state) {
    ///<param name="map" type="Artem.Google.Map"></param>
    ///<param name="state" type="Artem.Google.Marker"></param>

    // state
    this.Address = state.Address;
    this.AutoPan = state.AutoPan
    this.Bouncy = state.Bouncy;
    this.Clickable = state.Clickable;
    this.DragCrossMove = state.DragCrossMove;
    this.Draggable = state.Draggable;
    this.IconAnchor = state.IconAnchor;
    this.IconSize = state.IconSize;
    this.IconUrl = state.IconUrl;
    this.InfoWindowAnchor = state.InfoWindowAnchor;
    this.Latitude = state.Latitude;
    this.Longitude = state.Longitude;
    this.MaxZoom = state.MaxZoom;
    this.MinZoom = state.MinZoom;
    this.OpenInfoBehaviour = state.OpenInfoBehaviour;
    this.ShadowSize = state.ShadowSize;
    this.ShadowUrl = state.ShadowUrl;
    this.Text = state.Text;
    this.Title = state.Title;

    this.get_map = function () { return map; };

    // render or resolve address agains geocoding
    if (this.Address)
        this.resolve();
    else
        this.render();
}
Artem.Google.Marker.prototype = {

    //#region Fields ------------------------------------------------------------------------------

    Address: null,
    AutoPan: null,
    Bouncy: null,
    Clickable: null,
    Draggable: null,
    DragCrossMove: null,
    GeoStatus: null,
    IconAnchor: null,
    IconSize: null,
    IconUrl: null,
    InfoWindowAnchor: null,
    Latitude: null,
    Longitude: null,
    MaxZoom: null,
    MinZoom: null,
    OpenInfoBehaviour: null,
    ShadowSize: null,
    ShadowUrl: null,
    Text: null,
    Title: null,

    //#endregion

    //#region Properties --------------------------------------------------------------------------

    get_map: null,
    get_marker: null,

    //#endregion

    //#region Methods -----------------------------------------------------------------------------

    createIcon: function Artem_Google_Marker$createIcon() {

        var icon = null;
        if (this.IconUrl) {
            icon = new GIcon();
            icon.image = this.IconUrl;
            if (this.IconSize)
                icon.iconSize = new GSize(this.IconSize.Width, this.IconSize.Height);
            if (this.IconAnchor)
                icon.iconAnchor = new GPoint(this.IconAnchor.X, this.IconAnchor.Y);
            if (this.InfoWindowAnchor)
                icon.infoWindowAnchor = new GPoint(this.InfoWindowAnchor.X, this.InfoWindowAnchor.Y);
            if (this.ShadowUrl)
                icon.shadow = this.ShadowUrl;
            if (this.ShadowSize)
                icon.shadowSize = new GSize(this.ShadowSize.Width, this.ShadowSize.Height);
        }
        return icon;
    },

    dispose: function Artem_Google_Marker$dispose() {
        GEvent.clearInstanceListeners(this.get_marker());
        this.get_map.removeOverlay(this.get_marker());
    },

    render: function Artem_Google_Marker$render(point) {

        if (!point) point = new GLatLng(this.Latitude, this.Longitude);

        // options
        var options = new Object();
        options.autoPan = this.AutoPan;
        options.bouncy = this.Bouncy;
        options.clickable = this.Clickable;
        options.draggable = this.Draggable;
        options.dragCrossMove = this.DragCrossMove;
        options.title = this.Title;
        options.icon = this.createIcon();
        // create
        var marker = new GMarker(point, options);
        this.get_marker = function () { return marker; };
        this.get_map().addOverlay(marker);
    },

    resolve: function Artem_Google_Marker$resolve() {

        var geocoder = this.get_map().get_geocoder();
        var self = this;
        geocoder.getLatLng(this.Address, function (point) {
            if (point) {
                self.render(point);
                self.GeoStatus = 200;
                self.Latitude = point.lat();
                self.Longitude = point.lng();
            }
            else {
                geocoder.getLocations(self.Address, function (response) {
                    self.GeoStatus = response.Status.code;
                    switch (self.GeoStatus) {
                        case 200: // it is available now
                            self.resolve();
                            break;
                        case 620: // to many geo requests done, so let's wait a bit and send our request again
                            window.setTimeout(function () { self.resolve(); }, 100);
                            break;
                    }
                });
            }
        });
    },

    save: function Artem_Google_Marker$save() {

    },
    //#endregion

    //#region Google Maps API Wrapped -------------------------------------------------------------

    closeInfoWindow: function Artem_Google_Marker$closeInfoWindow() {
        this.get_marker().closeInfoWindow();
    },

    disableDragging: function Artem_Google_Marker$disableDragging() {
        this.get_marker().disableDragging();
    },

    draggable: function Artem_Google_Marker$draggable() {
        return this.get_marker().draggable();
    },

    draggingEnabled: function Artem_Google_Marker$draggingEnabled() {
        return this.get_marker().draggingEnabled();
    },

    enableDragging: function Artem_Google_Marker$enableDragging() {
        this.get_marker().enableDragging();
    },

    getIcon: function Artem_Google_Marker$getIcon() {
        return this.get_marker().getIcon();
    },

    getLatLng: function Artem_Google_Marker$getLatLng() {
        return this.get_marker().getLatLng();
    },

    getPoint: function Artem_Google_Marker$getPoint() {
        return this.get_marker().getPoint();
    },

    getTitle: function Artem_Google_Marker$getTitle() {
        return this.get_marker().getTitle();
    },

    hide: function Artem_Google_Marker$hide() {
        this.get_marker().hide();
    },

    isHidden: function Artem_Google_Marker$isHidden() {
        return this.get_marker().isHidden();
    },

    openDefaultInfoWindow: function Artem_Google_Marker$openDefaultInfoWindow() {
        if (this.OpenWindowContent) {
            var node = document.getElementById(this.OpenWindowContent);
            this.openInfoWindow(node.cloneNode(true));
        }
        else
            this.openInfoWindowHtml(this.Text);
    },

    openInfoWindow: function Artem_Google_Marker$openInfoWindow(domnode) {
        this.get_marker().openInfoWindow(domnode);
    },

    openInfoWindowHtml: function Artem_Google_Marker$openInfoWindowHtml(content) {
        this.get_marker().openInfoWindowHtml(content);
    },

    setImage: function Artem_Google_Marker$setImage(url) {
        this.get_marker().setImage(url);
    },

    setLatLng: function Artem_Google_Marker$setLatLng(point) {
        this.get_marker().setLatLng(point);
    },

    setPoint: function Artem_Google_Marker$setPoint(point) {
        this.get_marker().setPoint(point);
    },

    show: function Artem_Google_Marker$show() {
        this.get_marker().show();
    }
    //#endregion
}
Artem.Google.Marker.registerClass("Artem.Google.Marker");
//#endregion

//#region Directions class ////////////////////////////////////////////////////////////////////////

Artem.Google.Directions = function Artem_Google_Directions(map, config) {
    /// <param name="config" type="Artem.Google.Map"></param>
    /// <param name="config" type="Artem.Google.Directions"></param>

    this.AvoidHighways = config.AvoidHighways;
    this.GetPolyline = config.GetPolyline;
    this.GetSteps = config.GetSteps;
    this.Locale = config.Locale;
    this.Query = config.Query;
    this.PreserveViewport = config.PreserveViewport;
    this.RoutePanelId = config.RoutePanelId;
    this.TravelMode = config.TravelMode;

    var pane = (this.RoutePanelId) ? $get(this.RoutePanelId) : null;
    var directions = new GDirections(map.get_map(), pane);

    this.get_map = function () { return map; };
    this.get_directions = function () { return directions; };
    this.get_pane = function () { return pane; };

    // load
    var options = new Object();
    options.avoidHighways = this.AvoidHighways;
    if (this.GetPolyline) options.getPolyline = this.GetPolyline;
    if (this.GetSteps) options.getSteps = this.GetSteps;
    options.locale = this.Locale;
    options.preserveViewport = this.PreserveViewport;
    options.travelMode = ((this.TravelMode == 0) ? G_TRAVEL_MODE_DRIVING : G_TRAVEL_MODE_WALKING);

    this.load(this.Query, options);
};

Artem.Google.Directions.prototype = {

    //#region Fields ------------------------------------------------------------------------------

    AvoidHighways: null,
    Bounds: null,
    Distance: null,
    Duration: null,
    Geocodes: null,
    GetPolyline: null,
    GetSteps: null,
    Locale: null,
    Query: null,
    PreserveViewport: null,
    RoutePanelId: null,
    TravelMode: null,
    // TODO
    //    Polyline: null,
    //    Markers: null,
    //    Routes: null,
    //    Geocodes: null,

    //#endregion

    //#region Properties --------------------------------------------------------------------------

    get_directions: null,
    get_map: null,
    get_pane: null,

    //#endregion

    //#region Methods -----------------------------------------------------------------------------

    dispose: function Artem_Google_Directions$dispose() {
        GEvent.clearInstanceListeners(this.get_directions());
        this.clear();
    },

    save: function Artem_Google_Directions$save() {
        this.Bounds = new Artem.Google.Bounds(this.getBounds());
        this.Distance = new Artem.Google.Distance(this.getDistance());
        this.Duration = new Artem.Google.Duration(this.getDuration());
    },
    //#endregion

    //#region Google Maps API Wrapped -------------------------------------------------------------

    clear: function Artem_Google_Directions$clear() {
        this.get_directions().clear();
    },

    getBounds: function Artem_Google_Directions$getBounds() {
        return this.get_directions().getBounds();
    },

    getCopyrightsHtml: function Artem_Google_Directions$getCopyrightsHtml() {
        return this.get_directions().getCopyrightsHtml();
    },

    getDistance: function Artem_Google_Directions$getDistance() {
        return this.get_directions().getDistance();
    },

    getDuration: function Artem_Google_Directions$getDuration() {
        return this.get_directions().getDuration();
    },

    getGeocode: function Artem_Google_Directions$getGeocode(i) {
        return this.get_directions().getGeocode(i);
    },

    getMarker: function Artem_Google_Directions$getMarker(i) {
        return this.get_directions().getMarker(i);
    },

    getNumGeocodes: function Artem_Google_Directions$getNumGeocodes() {
        return this.get_directions().getNumGeocodes();
    },

    getNumRoutes: function Artem_Google_Directions$getNumRoutes() {
        return this.get_directions().getNumRoutes();
    },

    getPolyline: function Artem_Google_Directions$getPolyline() {
        return this.get_directions().getPolyline();
    },

    getRoute: function Artem_Google_Directions$getRoute(i) {
        return this.get_directions().getRoute(i);
    },

    getSummaryHtml: function Artem_Google_Directions$getSummaryHtml() {
        return this.get_directions().getSummaryHtml();
    },

    getStatus: function Artem_Google_Directions$getStatus() {
        return this.get_directions().getStatus();
    },

    load: function Artem_Google_Directions$load(query, options) {
        this.get_directions().load(query, options);
    },

    loadFromWaypoints: function Artem_Google_Directions$loadFromWaypoints(waypoints, options) {
        this.get_directions().loadFromWaypoints(waypoints, options);
    }
    //#endregion
};

Artem.Google.Directions.registerClass("Artem.Google.Directions");
//#endregion

//#region Polygon class ///////////////////////////////////////////////////////////////////////////

Artem.Google.Polygon = function Artem_Google_Polygon(map, state) {
    /// <param name="map" type="Artem.Google.Map"></param>
    /// <param name="state" type="Artem.Google.Polygon"></param>

    this.Bounds = state.Bounds;
    this.EditingFromStart = state.EditingFromStart;
    this.EditingMaxVertices = state.EditingMaxVertices;
    this.EnableDrawing = state.EnableDrawing;
    this.EnableEditing = state.EnableEditing;
    this.FillColor = state.FillColor;
    this.FillOpacity = state.FillOpacity;
    this.IsClickable = state.IsClickable;
    this.Points = state.Points;
    this.StrokeColor = state.StrokeColor;
    this.StrokeOpacity = state.StrokeOpacity
    this.StrokeWeight = state.StrokeWeight;

    var options = new Object();
    var points = new Array();

    options.clickable = this.Clickable;
    if (this.Points) {
        var point;
        for (var i = 0; i < this.Points.length; i++) {
            point = this.Points[i];
            points.push(new GLatLng(point.Latitude, point.Longitude));
        }
    }

    var polygon = new GPolygon(points,
        this.StrokeColor.HtmlValue, this.StrokeWeight, this.StrokeOpacity, this.FillColor.HtmlValue, this.FillOpacity, options);
    map.addOverlay(polygon);

    this.get_map = function () { return map; };
    this.get_polygon = function () { return polygon; };

    var editingOptions = new Object();
    if (this.EditingFromStart != null)
        editingOptions.fromStart = this.EditingFromStart;
    if (this.EditingMaxVertices != null)
        editingOptions.maxVertices = state.EditingMaxVertices;
    if (this.EnableDrawing) this.enableDrawing(editingOptions);
    if (this.EnableEditing) this.enableEditing(editingOptions);
}
Artem.Google.Polygon.prototype = {

    //#region Fields ------------------------------------------------------------------------------

    Bounds: null,
    EditingFromStart: null,
    EditingMaxVertices: null,
    EnableDrawing: null,
    EnableEditing: null,
    FillColor: null,
    FillOpacity: null,
    IsClickable: null,
    Points: null,
    StrokeColor: null,
    StrokeOpacity: null,
    StrokeWeight: null,

    //#endregion

    //#region Properties --------------------------------------------------------------------------

    get_map: null,
    get_polygon: null,

    //#endregion

    //#region Methods -----------------------------------------------------------------------------

    dispose: function Artem_Google_Polygon$dispose() {
        GEvent.clearInstanceListeners(this.get_polygon());
        this.get_map().removeOverlay(this.get_polygon());
    },

    save: function Artem_Google_Polygon$save() {
        this.Bounds = this.getBounds();
    },
    //#endregion

    //#region Google Maps API Wrapped -------------------------------------------------------------

    deleteVertex: function Artem_Google_Polygon$deleteVertex(index) {
        this.get_polygon().deleteVertex(index);
    },

    disableEditing: function Artem_Google_Polygon$disableEditing() {
        this.get_polygon().disableEditing();
    },

    enableDrawing: function Artem_Google_Polygon$enableDrawing(opts) {
        this.get_polygon().enableDrawing(opts);
    },

    enableEditing: function Artem_Google_Polygon$enableEditing(opts) {
        this.get_polygon().enableEditing(opts);
    },

    getArea: function Artem_Google_Polygon$getArea() {
        return this.get_polygon().getArea();
    },

    getBounds: function Artem_Google_Polygon$getBounds() {
        return this.get_polygon().getBounds();
    },

    getVertex: function Artem_Google_Polygon$getVertex(index) {
        return this.get_polygon().getVertex(index);
    },

    getVertexCount: function Artem_Google_Polygon$getVertexCount() {
        return this.get_polygon().getVertexCount();
    },

    hide: function Artem_Google_Polygon$hide() {
        this.get_polygon().hide();
    },

    insertVertex: function Artem_Google_Polygon$insertVertex(index, latlng) {
        this.get_polygon().insertVertex(index, latlng);
    },

    isHidden: function Artem_Google_Polygon$isHidden() {
        return this.get_polygon().isHidden();
    },

    show: function Artem_Google_Polygon$show() {
        this.get_polygon().show();
    },

    supportsHide: function Artem_Google_Polygon$supportsHide() {
        return this.get_polygon().supportsHide();
    },

    setFillStyle: function Artem_Google_Polygon$setFillStyle(style) {
        this.get_polygon().setFillStyle(style);
    },

    setStrokeStyle: function Artem_Google_Polygon$setStrokeStyle(style) {
        this.get_polygon().setStrokeStyle(style);
    }
    //#endregion
}
Artem.Google.Polygon.registerClass("Artem.Google.Polygon");
//#endregion

//#region Polyline class //////////////////////////////////////////////////////////////////////////

Artem.Google.Polyline = function Artem_Google_Polyline(map, state) {
    /// <param name="map" type="Artem.Google.Map"></param>
    /// <param name="state" type="Artem.Google.Polyline"></param>

    this.Color = state.Color;
    this.EditingFromStart = state.EditingFromStart;
    this.EditingMaxVertices = state.EditingMaxVertices;
    this.EnableDrawing = state.EnableDrawing;
    this.EnableEditing = state.EnableEditing;
    this.IsClickable = state.IsClickable;
    this.IsGeodesic = state.IsGeodesic;
    this.MouseOutTolerance = state.MouseOutTolerance;
    this.Opacity = state.Opacity;
    this.Points = state.Points;
    this.Weight = state.Weight;

    var options = new Object();
    var points = new Array();

    if (this.IsClickable != null)
        options.clickable = this.IsClickable;
    if (this.IsGeodesic != null)
        options.geodesic = this.IsGeodesic;
    if (this.MouseOutTolerance != null)
        options.mouseOutTolerance = this.MouseOutTolerance;
    if (this.Points) {
        var point;
        for (var i = 0; i < this.Points.length; i++) {
            point = this.Points[i];
            points.push(new GLatLng(point.Latitude, point.Longitude));
        }
    }

    var polyline = new GPolyline(points, this.Color.HtmlValue, this.Weight, this.Opacity, options);
    map.addOverlay(polyline);

    this.get_map = function () { return map; };
    this.get_polyline = function () { return polyline; };

    var editingOptions = new Object();
    if (this.EditingFromStart != null)
        editingOptions.fromStart = this.EditingFromStart;
    if (this.EditingMaxVertices != null)
        editingOptions.maxVertices = state.EditingMaxVertices;
    if (this.EnableDrawing) this.enableDrawing(editingOptions);
    if (this.EnableEditing) this.enableEditing(editingOptions);

}
Artem.Google.Polyline.prototype = {

    //#region Fields ------------------------------------------------------------------------------

    Bounds: null,
    Color: null,
    EditingFromStart: null,
    EditingMaxVertices: null,
    EnableDrawing: null,
    EnableEditing: null,
    IsClickable: null,
    IsGeodesic: null,
    Length: null,
    MouseOutTolerance: null,
    Opacity: null,
    Points: null,
    Weight: null,

    //#endregion

    //#region Properties --------------------------------------------------------------------------

    get_map: null,
    get_polyline: null,

    //#endregion

    //#region Methods -----------------------------------------------------------------------------

    dispose: function Artem_Google_Polyline$dispose() {
        GEvent.clearInstanceListeners(this.get_polyline());
        this.get_map().removeOverlay(this.get_polyline());
    },

    save: function Artem_Google_Polyline$save() {
        this.Bounds = new Artem.Google.Bounds(this.getBounds());
        this.Length = this.getLength();
    },

    //#endregion

    //#region Google Maps API Wrapped -------------------------------------------------------------

    deleteVertex: function Artem_Google_Polyline$deleteVertex(index) {
        this.get_polyline().deleteVertex();
    },

    disableEditing: function Artem_Google_Polyline$disableEditing() {
        this.get_polyline().disableEditing();
    },

    enableDrawing: function Artem_Google_Polyline$enableDrawing(editingOptions) {
        this.get_polyline().enableDrawing(editingOptions);
    },

    enableEditing: function Artem_Google_Polyline$enableEditing(editingOptions) {
        this.get_polyline().enableEditing(editingOptions);
    },

    getBounds: function Artem_Google_Polyline$getBounds() {
        return this.get_polyline().getBounds();
    },

    getLength: function Artem_Google_Polyline$getLength() {
        return this.get_polyline().getLength();
    },

    hide: function Artem_Google_Polyline$hide() {
        this.get_polyline().hide();
    },

    insertVertex: function Artem_Google_Polyline$insertVertex(index, latlng) {
        this.get_polyline().insertVertex(index, latlng);
    },

    isHidden: function Artem_Google_Polyline$isHidden() {
        return this.get_polyline().isHidden();
    },

    setStrokeStyle: function Artem_Google_Polyline$setStrokeStyle(options) {
        this.get_polyline().setStrokeStyle(options);
    },

    show: function Artem_Google_Polyline$show() {
        this.get_polyline().show();
    },

    supportsHide: function Artem_Google_Polyline$supportsHide() {
        return this.get_polyline().supportsHide();
    }
    //#endregion

}
Artem.Google.Polyline.registerClass("Artem.Google.Polyline");
//#endregion


//#region Helper Objects //////////////////////////////////////////////////////////////////////////

//#region Bounds class ////////////////////////////////////////////////////////////////////////////

Artem.Google.Bounds = function Artem_Google_Bounds(gbounds) {
    if (gbounds) {
        this.NorthEast = new Artem.Google.Location(gbounds.getNorthEast());
        this.SouthWest = new Artem.Google.Location(gbounds.getSouthWest());
    }
}
Artem.Google.Bounds.prototype = {
    NorthEast: null,
    SouthWest: null
}
Artem.Google.Bounds.registerClass("Artem.Google.Bounds");
//#endregion

//#region Distance class //////////////////////////////////////////////////////////////////////////

Artem.Google.Distance = function Artem_Google_Distance(gdistance) {
    if (gdistance) {
        this.Html = gdistance.html;
        this.Meters = gdistance.meters;
    }
}
Artem.Google.Distance.prototype = {
    Html: null,
    Meters: null
}
Artem.Google.Distance.registerClass("Artem.Google.Distance");
//#endregion

//#region Duration class //////////////////////////////////////////////////////////////////////////

Artem.Google.Duration = function Artem_Google_Duration(gduration) {
    if (gduration) {
        this.Html = gduration.hml;
        this.Seconds = gduration.seconds;
    }
}
Artem.Google.Duration.prototype = {
    Html: null,
    Seconds: null
}
Artem.Google.Duration.registerClass("Artem.Google.Duration");
//#endregion

//#region Location class //////////////////////////////////////////////////////////////////////////

Artem.Google.Location = function Artem_Google_Location(gpoint) {
    if (gpoint) {
        this.Latitude = gpoint.lat();
        this.Longitude = gpoint.lng();
    }
}
Artem.Google.Location.prototype = {
    Latitude: null,
    Longitude: null
}
Artem.Google.Location.registerClass("Artem.Google.Location");
//#endregion

//#region Point class /////////////////////////////////////////////////////////////////////////////

Artem.Google.Point = function (gpoint) {
    if (gpoint) {
        this.X = gpoint.x;
        this.Y = gpoint.y;
    }
}
Artem.Google.Point.prototype = {
    X: null,
    Y: null
}
Artem.Google.Point.registerClass("Artem.Google.Point");
//#endregion

//#region Size class //////////////////////////////////////////////////////////////////////////////

Artem.Google.Size = function (gsize) {
    if (gsize) {
        this.Height = gsize.height;
        this.Width = gsize.width;
    }
}
Artem.Google.Size.prototype = {
    Height: null,
    Width: null
}
Artem.Google.Size.registerClass("Artem.Google.Size");
//#endregion
//#endregion

//#region Events //////////////////////////////////////////////////////////////////////////////////

// AddressEventArgs
Artem.Google.Events.AddressEventArgs = function Artem_Google_Events_AddressEventArgs(address) {
    Artem.Google.Events.AddressEventArgs.initializeBase(this);
    this.Address = address;
}
Artem.Google.Events.AddressEventArgs.prototype = {
    Address: null
}
Artem.Google.Events.AddressEventArgs.registerClass("Artem.Google.Events.AddressEventArgs", Sys.EventArgs);

// BoundsEventArgs
Artem.Google.Events.BoundsEventArgs = function Artem_Google_Events_BoundsEventArgs(gbouns) {
    Artem.Google.Events.BoundsEventArgs.initializeBase(this);
    this.Bounds = new Artem.Google.Bounds(gbouns);
}
Artem.Google.Events.BoundsEventArgs.prototype = {
    Bounds: null
}
Artem.Google.Events.BoundsEventArgs.registerClass("Artem.Google.Events.BoundsEventArgs", Sys.EventArgs);

// LocationEventArgs
Artem.Google.Events.LocationEventArgs = function Artem_Google_Events_LocationEventArgs(glocation) {
    Artem.Google.Events.LocationEventArgs.initializeBase(this);
    this.Location = new Artem.Google.Location(glocation);
}
Artem.Google.Events.LocationEventArgs.prototype = {
    Location: null
}
Artem.Google.Events.LocationEventArgs.registerClass("Artem.Google.Events.LocationEventArgs", Sys.EventArgs);

// VisibilityEventArgs
Artem.Google.Events.VisibilityEventArgs = function Artem_Google_Events_VisibilityEventArgs(visible) {
    Artem.Google.Events.VisibilityEventArgs.initializeBase(this);
    this.Visible = visible;
}
Artem.Google.Events.VisibilityEventArgs.prototype = {
    Visible: false
}
Artem.Google.Events.VisibilityEventArgs.registerClass("Artem.Google.Events.VisibilityEventArgs", Sys.EventArgs);

// ZoomEventArgs
Artem.Google.Events.ZoomEventArgs = function Artem_Google_Events_ZoomEventArgs(oldlevel, newlevel) {
    Artem.Google.Events.ZoomEventArgs.initializeBase(this);
    this.NewLevel = newlevel;
    this.OldLevel = oldlevel;
}
Artem.Google.Events.ZoomEventArgs.prototype = {
    NewLevel: null,
    OldLevel: null
}
Artem.Google.Events.ZoomEventArgs.registerClass("Artem.Google.Events.ZoomEventArgs", Sys.EventArgs);

//#endregion

//#region Utils ///////////////////////////////////////////////////////////////////////////////////

    //#region _Manager class 

Artem.Google._Manager = function Artem_Google__Manager() {
    if (arguments.length !== 0) throw Error.parameterCount();
    if (Sys.Application) Sys.Application.registerDisposableObject(this);
}

Artem.Google._Manager.prototype = {

    dispose: function Artem_Google__Manager$dispose() {
        GUnload();
    }
}

Artem.Google._Manager.registerClass("Artem.Google._Manager", null, Sys.IDisposable);

var GoogleManager = new Artem.Google._Manager();
//#endregion

Artem.Google.serverHandler = function Artem_Google$serverHandler() { };

//#endregion

/*#> AAAA */

function test(options) {

}

test(function () {
    var i = 0;

    i++;

    return i;
});

function _t1() {

}

function _t2() {

}

/*#<*/
/* BBBB
1 2 2
2
3
*/

/* AA
1
2
3
*/

function __t() {

}