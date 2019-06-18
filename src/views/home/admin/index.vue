<template>
  <div class="app-container">
    <el-container>
      <!-- 侧边 -->
      <el-aside class="home-info" width="20%">
        <el-card class="home-info-card-one">
          <span>总数统计</span>
          <div class="home-info-total">
            <span>入住房间数：{{hotel.checkIn}}</span>
            <br>
            <span>空闲房间数：{{hotel.free}}</span>
            <br>
            <span>维护房间数：{{hotel.maintained}}</span>
            <br>
            <span>离线房间数：{{hotel.offline}}</span>
          </div>
          <br>
          <br>
          <span>当前楼层统计</span>
          <div class="home-info-curr-floor">
            <span>入住房间数：{{floor.checkIn}}</span>
            <br>
            <span>空闲房间数：{{floor.free}}</span>
            <br>
            <span>维护房间数：{{floor.maintained}}</span>
            <br>
            <span>离线房间数：{{floor.offline}}</span>
          </div>
          <br>
          <br>
          <span>单人间</span>
          <div class="room-single">
            <span>剩余：{{hotel.singleRoom}}</span>
          </div>
          <br>
          <br>
          <span>双人间</span>
          <div class="room-double">
            <span>剩余：{{hotel.doubleRoom}}</span>
          </div>
        </el-card>
        <el-card class="home-info-card-two">
          <div class="room-state-container">
            <el-card id="room-state-check-in" class="state-card" shadow="never"></el-card>
            <span>入住</span>
          </div>
          <div class="room-state-container">
            <el-card id="room-state-free" class="state-card" shadow="never"></el-card>
            <span>空闲</span>
          </div>
          <div class="room-state-container">
            <el-card id="room-state-maintained" class="state-card" shadow="never"></el-card>
            <span>维护</span>
          </div>
          <div class="room-state-container">
            <el-card id="room-state-offline" class="state-card" shadow="never"></el-card>
            <span>离线</span>
          </div>
        </el-card>
      </el-aside>
      <el-container class="home-container">
        <!-- 顶部筛选、搜索 -->
        <el-header class="home-header" height="80px">
          <el-card style="height:100%">
            <div class="home-filter">
              <el-select class="home-filter-state" placeholder="请选择状态" v-model="state">
                <el-option
                  v-for="item in stateOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <!-- <el-select class="home-filter-room-type" placeholder="请选择房型">
                <el-option></el-option>
              </el-select>-->
              <el-select
                class="home-filter-floor"
                filterable
                placeholder="请选择楼层"
                v-model="currFloor"
                @change="setFloor"
              >
                <el-option
                  v-for="floor in floors"
                  :key="floor.id"
                  :label="floor+'L'"
                  :value="floor"
                ></el-option>
              </el-select>
              <el-input
                class="home-search-floor"
                v-model="filterFloor"
                placeholder="请输入楼层"
                oninput="value=value.replace(/[^\d]/g,'')"
                clearable
              >
                <el-button slot="append" icon="el-icon-search" @click="searchFloor()"></el-button>
              </el-input>
            </div>
          </el-card>
        </el-header>
        <!-- 房间 -->
        <el-main class="home-content">
          <el-row v-show="isHaveFloor">
            <div class="content-floor-header">
              <span class="content-floor">{{currFloor}}L</span>
              <span class="content-floor-info">（{{getFloorInfo()}}）</span>
            </div>
            <el-col
              v-for="room in floorInfos.get(this.currFloor)"
              :key="room.id"
              v-show="state ==0||room.state==state"
              class="home-content-item"
            >
              <el-card shadow="always" id="home-content-card" :class="[roomColors[room.state-1]]">
                <div>
                  <span style="font-size:22px">{{room.num}}</span>
                  <span style="font-size:18px;float:right;">单人间</span>
                  <br>
                  <span style="font-size:15px;position:relative;top:20px;float:left">入住中</span>
                  <span
                    style="font-size:14px;position:relative;top:14px;left:30px;float:left;"
                  >温度：25℃</span>
                  <span
                    style="font-size:14px;position:relative;top:14px;left:30px;float:left;"
                  >湿度：60%</span>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <el-table v-show="!isHaveFloor"></el-table>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import ScrollPane from "@/layout/components/ScrollPane";

export default {
  name: "HomeAdmin",
  components: { ScrollPane },
  data() {
    return {
      isHaveFloor: false,
      isRefresh: true,
      currFloor: 1,
      filterFloor: "",
      state: 0,
      floorInfos: new Map(),
      floors: [],
      rooms: [],
      roomColors: [
        "home-content-card-check-in",
        "home-content-card-free",
        "home-content-card-maintained",
        "home-content-card-offline"
      ],
      hotel: {
        checkIn: 0,
        free: 0,
        maintained: 0,
        offline: 0,
        singleRoom: 0,
        doubleRoom: 0
      },
      floor: {
        checkIn: 0,
        free: 0,
        maintained: 0,
        offline: 0
      },
      stateOptions: [
        {
          value: 0,
          label: "所有状态"
        },
        {
          value: 1,
          label: "入住"
        },
        {
          value: 2,
          label: "空闲"
        },
        {
          value: 3,
          label: "维护"
        },
        {
          value: 4,
          label: "离线"
        }
      ]
    };
  },
  computed: {
    //计算所有楼层
    calculateTotal() {
      console.log("calculateTotal");
      for (let i = 0; i < this.floors.length; i++) {
        var key = this.floors[i];
        var rooms = this.floorInfos.get(key);
        for (let j = 0; j < rooms.length; j++) {
          var room = rooms[j];
          if (room.state == 1) {
            this.hotel.checkIn++;
          } else if (room.state == 2) {
            this.hotel.free++;
          } else if (room.state == 3) {
            this.hotel.maintained++;
          } else {
            this.hotel.offline++;
          }
        }
      }
      this.hotel.doubleRoom = Math.floor(this.hotel.free / 3);
      this.hotel.singleRoom = this.hotel.free - this.hotel.doubleRoom;
    },
    //计算当前楼层
    calculateCurrFloor() {
      this.floor.checkIn = 0;
      this.floor.free = 0;
      this.floor.maintained = 0;
      this.floor.offline = 0;
      var rooms = this.floorInfos.get(this.currFloor);
      if (rooms && rooms.length > 0) {
        this.isHaveFloor = true;
        for (let j = 0; j < rooms.length; j++) {
          var room = rooms[j];
          if (room.state == 1) {
            this.floor.checkIn++;
          } else if (room.state == 2) {
            this.floor.free++;
          } else if (room.state == 3) {
            this.floor.maintained++;
          } else {
            this.floor.offline++;
          }
        }
      } else {
        this.isHaveFloor = false;
      }
    }
  },
  methods: {
    setFloor(floor) {
      console.log("floor" + floor);
      this.currFloor = floor;
      this.calculateCurrFloor;
    },
    searchFloor() {
      this.currFloor = Number(this.filterFloor);
      this.calculateCurrFloor;
      this.filterFloor = "";
    },
    getRandom(max, min) {
      return ((Math.random() * (max - min + 1)) | 0) + min;
    },
    getRooms(floor) {
      console.log("getRooms");
      var min = 1;
      var max = 24;
      var state = 1;
      let rooms = new Array();
      for (let i = min; i <= max; i++) {
        var random = this.getRandom(min, max);
        if (random < max * 0.7) {
          state = 1;
        } else if (random < max * 0.8) {
          state = 2;
        } else if (random < max * 0.9) {
          state = 3;
        } else {
          state = 4;
        }
        let obj = {
          num: floor * 100 + i,
          state: state
        };
        rooms.push(obj);
      }
      return rooms;
    },
    getFloors(min, max) {
      console.log("getFloors");
      let floors = new Array();
      for (let i = min; i <= max; i++) {
        floors.push(i);
      }
      return floors;
    },
    getFloorInfo() {
      return (
        this.floor.checkIn +
        "入住 " +
        " / " +
        this.floor.free +
        "空闲" +
        " / " +
        this.floor.maintained +
        "维护" +
        " / " +
        this.floor.offline +
        "离线"
      );
    }
  },
  created() {
    
  },
  mounted: function() {
    console.log("mounted");
    var minFloor = 1;
    var maxFloor = 10;
    this.floors = this.getFloors(minFloor, maxFloor);
    for (let i = minFloor; i <= maxFloor; i++) {
      this.floorInfos.set(i, this.getRooms(i));
    }
    this.calculateTotal;
    if (this.currFloor != 0) {
      this.calculateCurrFloor;
    }
  }
};
</script>

<style lang="scss" scoped>
$checkIn: #7fa0ff;
$free: #ffffff;
$maintained: #f4c663;
$offline: #d2d2d2;

.home-info {
  .home-info-card-one {
    position: relative;
    font-weight: bold;
    font-size: 16px;
    width: 80%;
    height: auto;
    .home-info-total {
      font-size: 14px;
      font-weight: normal;
      margin-top: 10px;
      line-height: 20px;
    }
    .home-info-curr-floor {
      font-size: 14px;
      font-weight: normal;
      margin-top: 10px;
      line-height: 20px;
    }
    .room-single {
      font-size: 14px;
      font-weight: normal;
      margin-top: 10px;
      line-height: 20px;
    }
    .room-double {
      font-size: 14px;
      font-weight: normal;
      margin-top: 10px;
      line-height: 20px;
    }
  }
  .home-info-card-two {
    width: 80%;
    height: 230px;
    margin-top: 20px;
    .room-state-container {
      position: relative;
      height: 50px;
      line-height: 50px;
      font-size: 14px;
      .state-card {
        margin-right: 28px;
        margin-top: 10px;
        float: left;
        width: 30px;
        height: 30px;
      }
      #room-state-check-in {
        background-color: $checkIn;
      }
      #room-state-free {
        border: $checkIn solid 2px;
        background-color: $free;
      }
      #room-state-maintained {
        background-color: $maintained;
      }
      #room-state-offline {
        background-color: $offline;
      }
    }
  }
}

.home-filter {
  position: absolute;
  right: 0px;
  float: right;
  .home-filter-state {
    width: 20%;
  }
  .home-filter-room-type {
    margin-left: 10px;
    width: 20%;
  }
  .home-filter-floor {
    margin-left: 10px;
    width: 20%;
  }
  .home-search-floor {
    margin-left: 10px;
    width: 30%;
  }
}

.home-container {
  width: 80%;
  .home-header {
    max-width: 93%;
  }
  .home-content {
    width: 100%;
    .content-floor-header {
      margin-top: 10px;
      margin-bottom: 28px;
      .content-floor {
        font-size: 26px;
        color: #47526d;
      }
      .content-floor-info {
        font-size: 16px;
        color: #cad2da;
      }
    }

    .home-content-item {
      width: 200px;
      height: 135px;
      #home-content-card {
        width: 185px;
        height: 120px;
      }
      .home-content-card-check-in {
        color: white;
        background-color: $checkIn;
      }
      .home-content-card-free {
        color: $checkIn;
        border: $checkIn solid 2px;
        background-color: $free;
      }
      .home-content-card-maintained {
        color: white;
        background-color: $maintained;
      }
      .home-content-card-offline {
        color: white;
        background-color: $offline;
      }
    }
  }
}
</style>
