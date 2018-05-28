var app = getApp()
var listCache = {};
var Bmob = require('../../utils/bmob.js');
var util = require('../../utils/util.js'); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},

    areaArray: ['全部', '锦江区', '青羊区', '武侯区', '高新区', '金牛区', '成华区', '天府新区', '龙泉驿区', '郫都区', '双流区', '温江区', '新都区'],
    objectAreaArray: [
      {
        id: 0,
        name: '全部'
      }, {
        id: 1,
        name: '锦江区'
      }, {
        id: 2,
        name: '青羊区'
      }, {
        id: 3,
        name: '武侯区'
      },
      {
        id: 4,
        name: '金牛区'
      }, {
        id: 5,
        name: '成华区'
      }, {
        id: 6,
        name: '天府新区'
      }, {
        id: 7,
        name: '龙泉驿区'
      },
      {
        id: 8,
        name: '郫都区'
      }, {
        id: 9,
        name: '双流区'
      }, {
        id: 10,
        name: '温江区'
      }, {
        id: 11,
        name: '新都区'
      }
    ],

    typeArray: ['不限', '3人制', '5人制', '7人制', '11人制'],
    objectTypeArray: [
      {
        id: 0,
        name: '不限'
      }, {
        id: 1,
        name: '3人制'
      }, {
        id: 2,
        name: '5人制'
      }, , {
        id: 2,
        name: '7人制'
      }, , {
        id: 2,
        name: '11人制'
      }
    ],

    userInfo: {},
    indexArea: 0,
    indexType: 0,
    hasUserInfo: false,
    imageUrl: "http://img1.3lian.com/2015/w7/85/d/101.jpg"
    

  },


  /**
   * 区域选择器
   */
  bindAreaPickerChange: function (e) {
    console.log('bindAreaPickerChange  ' + e.detail.value)
    this.loadDataForArea(this.data.areaArray[e.detail.value])
    // this.changeListDataByArea(e);
    this.setData({
      indexArea: e.detail.value,
      //更新数据列表展示相应的数据


    })

  },

  /**
   * 类型选择
   */
  bindTypePickerChange: function (e) {
    console.log('bindTypePickerChange  ' + e.detail.value),
      this.loadDataForType(this.data.typeArray[e.detail.value])
    this.setData({
      indexType: e.detail.value
      //更新数据列表展示相应的数据

    })
  },

  changeListDataByArea: function (e) {
    console.log(" changeListDataByArea  " + e.detail.value)
    if (e.detail.value == 1) {
      listCache = this.watchList,
        this.setData({
          watchList: []
        })
    }

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData()

  },


  loadData: function (e, value) {
    var Match = Bmob.Object.extend("match");
    var watch = new Bmob.Query(Match);
    var currentTime = Date.parse(new Date()) / 1000 + "";

    watch.greaterThan("startTime", currentTime);
    watch.query

    // 查询所有数据
    watch.find({
      success: function (results) {
        console.log("共查询到 " + results.length + " 条记录");
        // 循环处理查询到的数据
        that.setData({
          watchList: results
        })
      },
      error: function (error) {
        console.log("查询失败: " + error.code + " " + error.message);
      }
    });
    var that = this
  },


  loadDataForArea: function (value) {
    var Match = Bmob.Object.extend("match");
    var watch = new Bmob.Query(Match);
    if (value != "全部") {
      watch.equalTo('area', value);
    }

    if (this.data.indexType != 0) {
      watch.equalTo('type', this.data.typeArray[this.data.indexType])
    }
    console.log("  value  " + value);
    var currentTime = Date.parse(new Date()) / 1000 + "";

    watch.greaterThan("startTime", currentTime);
    watch.find({
      success: function (results) {
        console.log("共查询到 " + results.length + " 条记录");
        // 循环处理查询到的数据
        that.setData({
          watchList: results
        })
      },
      error: function (error) {
        console.log("查询失败: " + error.code + " " + error.message);
      }
    });
    var that = this
  },

  loadDataForType: function (value) {
    var Match = Bmob.Object.extend("match");
    var watch = new Bmob.Query(Match);
    if (value != "不限") {
      watch.equalTo('type', value);
    }

    if (this.data.indexArea != 0) {
      watch.equalTo('area', this.data.areaArray[this.data.indexArea])
    }
    console.log("  value  " + value);
    var currentTime = Date.parse(new Date()) / 1000 + "";

    watch.greaterThan("startTime", currentTime);
    watch.find({
      success: function (results) {
        console.log("共查询到 " + results.length + " 条记录");
        // 循环处理查询到的数据
        that.setData({
          watchList: results
        })
      },
      error: function (error) {
        console.log("查询失败: " + error.code + " " + error.message);
      }
    });
    var that = this
  },





  bindToDetail: function (e) {
    var date = e.currentTarget.dataset.date + " "+e.currentTarget.dataset.time
    var currentTime = util.formatTime(new Date());
    var matchStates = currentTime >= date ? '已过期' : '约战中'
    console.log("type  " + e.currentTarget.dataset.teamname)
    wx.navigateTo({
      url: '../matchDetail/matchDetail?teamname=' + e.currentTarget.dataset.teamname
      + '&cost=' + e.currentTarget.dataset.cost
      + '&date=' + e.currentTarget.dataset.date + ' ' + e.currentTarget.dataset.time
      + '&phone=' + e.currentTarget.dataset.phone
      + '&contact=' + e.currentTarget.dataset.contact
      + '&address=' + e.currentTarget.dataset.address
      + '&colors=' + e.currentTarget.dataset.colors
      + '&matchtype=' + e.currentTarget.dataset.matchtype
      + '&imageUrl=' + e.currentTarget.dataset.imageurl
      + '&states=' + matchStates,
    })
  },
  bindToWrite: function (e) {
    wx.navigateTo({
      url: '../writeMatch/writeMatch',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  lower: function (e) {
    console.log(e)
  },





})

