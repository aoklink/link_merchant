<template>
    <div class="address-map">
        <div id="mapContainer" />
        <div id="selectPanel" />
    </div>
</template>

<script>
const AMap = window.AMap;

export default {
    props: {
        keyword: {
            type: String,
            default: ''
        },
        position: {
            type: Array,
            default: null
        }
    },
    data () {
        return {
            map: null,
            placeSearch: null,
            marker: null,
            isFirst: true
        };
    },
    watch: {
        keyword (val, prev) {
            this.onKeywordChange(val, prev);
        },
        position (val) {
            if (val) {
                this.addMarker(val);
                this.placeSearch.clear();
            }
        }
    },
    mounted () {
        this.map = new AMap.Map('mapContainer', {
            resizeEnable: true,
            zoom: 13
        });
        AMap.service(['AMap.PlaceSearch'], () => {
            this.placeSearch = new AMap.PlaceSearch({
                pageSize: 2,
                pageIndex: 1,
                map: this.map,
                panel: 'selectPanel',
                autoFitView: true
            });
            AMap.event.addListener(this.placeSearch, 'selectChanged', this.onSelectChanged);
        });
    },
    methods: {
        onSelectChanged (data) {
            var selected = data.selected.data;
            this.$emit('change', [selected.location.lng, selected.location.lat]);
        },
        onKeywordChange (val, prev) {
            if (val && !this.isFirst) {
                this.placeSearch.search(val);
            }
            this.isFirst = false;
        },
        addMarker (position) {
            const infoWindow = new AMap.InfoWindow({
                autoMove: true,
                offset: new AMap.Pixel(0, -30)
            });
            if (this.marker) {
                this.marker.setMap(null);
            }
            this.marker = new AMap.Marker({
                map: this.map,
                position: position,
                icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png'
            });
            this.map.setCenter(this.marker.getPosition());
            infoWindow.setContent(this.createContent());
            infoWindow.open(this.map, this.marker.getPosition());
        },
        createContent () {
            var s = [];
            s.push('地址：' + this.keyword);
            return s.join('<br>');
        }
    }
};
</script>

<style>
    .address-map{
        position: relative;
    }
    .address-map,#mapContainer{
        border: none;
        width: 25.28rem;
        height: 5.11rem;
    }
    #selectPanel{
        position: absolute;
        right: 0;
        top:0;
    }

</style>
