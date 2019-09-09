<template>
    <div class="content">
        <div class="table">
            <div class="crumbs">
                <div class="oo">
                    电量管理
                </div>
                <div class="celllist">
                    设备列表
                </div>
            </div>
            <div class="container">
                <el-table ref="multipleTable"
                          :data="tableData" border
                          class="table"
                          :row-class-name="tableRowClassName"
                          @selection-change="handleSelectionChange"
                >
                    <el-table-column prop="serial_no" label="编号"
                                     style="color: red !important"
                    />
                    <el-table-column prop="device_id" label="设备ID"
                                     style="color: red !important"
                    />
                    <el-table-column prop="device" label="所属器械"
                                     style="color: red !important"
                    />
                    <el-table-column prop="batteryStr" label="电量"
                                     style="color: red !important"
                    />
                    <el-table-column prop="time" label="更新时间">
                        <!--<template slot-scope="scope">
                            <div type="text">
                                {{tableData[scope.$index].time}}
                            </div>
                        </template>-->
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
import global from '../components/Global';
// this.$axios.defaults.headers.post['Content-Type'] = 'application/json'
export default {
    name: 'Battery',
    data () {
        return {
            localhost: 'http://bg.linkfeeling.cn',
            localhost: 'http://test.linkfeeling.cn',
            tableData: []
        };
    },
    created () {
        var that = this;
        let datt = {
            gym_name: global.gym_name || localStorage.getItem('gym_name')
        };
        this.$axios.post(this.localhost + '/api/platform/coulometry/list', JSON.stringify(datt), {headers: {'Content-Type': 'application/json;charset=UTF-8'}})
            .then((res) => {
                if (res.data.code == 200) {
                    var aDiv = [];
                    for (var i = 0; i < res.data.data.length; i++) {
                        var m = res.data.data[i];
                        m.device = decodeURIComponent(m.device.replace(/\+/g, '%20'));
                        m.batteryStr = '-';
                        if (m.battery = parseInt(m.battery)) {
                            switch (m.battery) {
                            case -1: m.batteryStr = '已离线'; break;
                            case -2: m.batteryStr = '在线'; break;
                            default: m.batteryStr = m.battery + '%'; break;
                            }
                        }
                        aDiv.push(m); 
                    }
                    aDiv.sort(function (a, b) { return a.battery - b.battery; });
                    that.tableData = aDiv;
                } else {
                    that.$message.success('设备列表请求失败');
                }
            })
            .catch((res) => {
                console.log(res);
            });
    },
    methods: {
        tableRowClassName: function (row) {
            if (this.tableData[row.rowIndex].battery < 30) {
                return 'battery-low';
            }
            return '';
        },
        getDd: function (no) { // todo: 优化为工具类方法
            var date = no;
            var seperator1 = '-';
            var seperator2 = ':';
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            var hours = date.getHours();
            var mins = date.getMinutes();
            var secs = date.getSeconds();
            if (month >= 1 && month <= 9) {
                month = '0' + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = '0' + strDate;
            }
            if (hours >= 1 && hours <= 9) {
                hours = '0' + hours;
            }
            if (mins >= 0 && mins <= 9) {
                mins = '0' + mins;
            }
            if (secs >= 0 && secs <= 9) {
                secs = '0' + secs;
            }
            var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
                        ' ' + hours + seperator2 + mins +
                        seperator2 + secs;
            return currentdate;
        }
    }
};

</script>

<style>
    .battery-low{
        background: #F9FAFC;
        color: red;
    }
</style>
