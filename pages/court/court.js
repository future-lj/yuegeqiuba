var app = getApp()

var Bmob = require('../../utils/bmob.js');

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
    
    imageUrl: "http://img1.3lian.com/2015/w7/85/d/101.jpg",
  

    courtList: []

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



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData()

  },


  loadData: function () {
    var Court = Bmob.Object.extend("court");
    var watch = new Bmob.Query(Court);
    watch.query

    // 查询所有数据
    watch.find({
      success: function (results) {
        console.log("共查询到 " + results.length + " 条记录");
        // 循环处理查询到的数据
        that.setData({
          courtList: results
        })
      },
      error: function (error) {
        console.log("查询失败: " + error.code + " " + error.message);
      }
    });
    var that = this
  },


  loadDataForArea: function (value) {
    var Court = Bmob.Object.extend("court");
    var watch = new Bmob.Query(Court);
    if (value != "全部") {
      watch.equalTo('area', value);
    }

    if (this.data.indexType != 0) {
      watch.equalTo('matchType', this.data.typeArray[this.data.indexType])
    }
    console.log("  value  " + value);

    watch.find({
      success: function (results) {
        console.log("共查询到 " + results.length + " 条记录");
        // 循环处理查询到的数据
        that.setData({
          courtList: results
        })
      },
      error: function (error) {
        console.log("查询失败: " + error.code + " " + error.message);
      }
    });
    var that = this
  },

  loadDataForType: function (value) {
    var Court = Bmob.Object.extend("court");
    var watch = new Bmob.Query(Court);
    if (value != "不限") {
      watch.equalTo('matchType', value);
    }

    if (this.data.indexArea != 0) {
      watch.equalTo('area', this.data.areaArray[this.data.indexArea])
    }
    console.log("  value  " + value);

    watch.find({
      success: function (results) {
        console.log("共查询到 " + results.length + " 条记录");
        // 循环处理查询到的数据
        that.setData({
          courtList: results
        })
      },
      error: function (error) {
        console.log("查询失败: " + error.code + " " + error.message);
      }
    });
    var that = this
  },





/**
 * 暂无详情跳转
 */
  bindToDetail: function (e) {
    wx.navigateTo({
      url: '../courtDetail/courtDetail?name=' + e.currentTarget.dataset.name
      + '&openTime=' + e.currentTarget.dataset.opentime 
      + '&phone=' + e.currentTarget.dataset.phone
      + '&contact=' + e.currentTarget.dataset.contact
      + '&address=' + e.currentTarget.dataset.address
      + '&area=' + e.currentTarget.dataset.area
      + '&type=' + e.currentTarget.dataset.type
      + '&price=' + e.currentTarget.dataset.price,
    })
  },


})

