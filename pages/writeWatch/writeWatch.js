var util = require('../../utils/util.js'); 
var dateTimePicker = require('../../utils/dateTimePicker.js');
var Bmob = require('../../utils/bmob.js');
var currentDate= '';
var watchDateisToday = true;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    team1:'',
    team2: '',
    contactName: '',
    phone: '',
    watchType: '',
    maxPerson: '',
    address: '',
    date: '',
    time:'',
    ps: '',
    watchTypeNum:0,
    dateTime:'',
    typeArray: ['直播','重播','现场'],
    objectTypeArray:[
      { 
        id:0,
        name: '直播'
      }, {
        id: 1,
        name: '重播'
      }, {
        id: 2,
        name: '现场'
      },
    ],
    indexArea: 0,
    areaArray: [ '锦江区', '青羊区', '武侯区', '高新区', '金牛区', '成华区', '天府新区', '龙泉驿区', '郫都区', '双流区', '温江区', '新都区'],
    objectAreaArray: [
      {
        id: 0,
        name: "锦江区"
      },
      {
        id: 1,
        name: '青羊区'
      }, {
        id: 2,
        name: '武侯区'
      }, {
        id: 3,
        name: '高新区'
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
        name: '双流区'
      }, {
        id: 9,
        name: '温江区'
      }, {
        id: 10,
        name: '新都区'
      }
    ],

    
    watchTimeStr: '',
    watchDate:'',
    watchTime:'',
    area:'青羊区',
    watchDateisToday:'',
    imageUrl: "http://img1.3lian.com/2015/w7/85/d/101.jpg",
   },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    // 再通过setData更改Page()里面的data，动态更新页面的数据  
    
    var time = util.formatTime(new Date()) ;
    watchTimeStr:time;
    var currentDates = time.split(" ");
    var currentTime = currentDates[1].substring(0, 5);
    currentDate = currentDates[0];
    this.data.date = currentDate;
    this.data.time = currentTime;
    console.log("currentTime  " + currentDate + currentTime);
    this.setData({
      watchDate: currentDate,
      watchTime: currentTime,
    }); 
  },

  bindTeam1Input: function(e){
    console.log('bindTeam1Input  '+e.detail.value )
    this.setData({
      team1 : e.detail.value
    })
  },

  bindTeam2Input: function (e) {
    console.log('bindTeam2Input  ' + e.detail.value)
    this.setData({
      team2: e.detail.value
    })
  },

  bindContactInput: function (e) {
    console.log('bindContactInput  ' + e.detail.value)
    this.setData({
      contactName: e.detail.value
    })
  },

  bindPhoneInput: function (e) {
    console.log('bindPhoneInput  ' + e.detail.value)
    this.setData({
      phone: e.detail.value
    })
  },

  bindPsInput: function (e) {
    console.log('bindPsInput  ' + e.detail.value)
    this.setData({
      ps: e.detail.value
    })
  },

  bindMaxPersonInput: function (e) {
    console.log('bindMaxPersonInput  ' + e.detail.value)
    this.setData({
      maxPerson: e.detail.value
    })
  },
  bindAddressInput: function (e) {
    console.log('bindAddressInput  ' + e.detail.value)
    this.setData({
      address: e.detail.value
    })
  },
 
 bindBtnRelease: function(e){
   console.log('bindBtnRelease  ')
   if (!this.data.address || !this.data.team2 || !this.data.team1 || !this.data.contactName
     || !this.data.phone ) {
   
     wx.showToast({
       title: "信息不能为空",
       icon: 'none'
     })
     return
   }

   if (!this.validatemobile(this.data.phone)) {
     return
   }
   var Watch = Bmob.Object.extend("watch");
   var watch = new Watch();
  
   watch.set("address", this.data.address);
   watch.set("type", this.data.typeArray[this.data.watchTypeNum]);
   watch.set("team2Name", this.data.team2);
   watch.set("team1Name", this.data.team1);
   watch.set("ps", this.data.ps);
   watch.set("phone", this.data.phone);
   watch.set("maxPerson", this.data.maxPerson);
   watch.set("createUserID", "user");
   watch.set("contact", this.data.contactName); 
   watch.set("area", this.data.areaArray[this.data.indexArea]);
   watch.set("typeNum", ""+this.data.watchTypeNum);
   watch.set("date", this.data.date);
   watch.set("time", this.data.time);
   watch.set("imageUrl", this.data.imageUrl); 
   var timestamp2 = Date.parse(new Date(this.data.date + " " + this.data.time));
   timestamp2 = timestamp2 / 1000;
   watch.set("startTime", ""+timestamp2);
   watch.save(null,{
     success: function (result) {
       // 添加成功，返回成功之后的objectId（注意：返回的属性名字是id，不是objectId），你还可以在Bmob的Web管理后台看到对应的数据
       console.log("发布成功, objectId:" + result.id);
       wx.showToast({
         title: "发布成功"
       })
       
       wx.navigateBack({
         
       })

     },
     error: function (result, error) {
       // 添加失败
       console.log('发布失败'+error.code + error.message);
       wx.showToast({
         title: "发布失败",
         icon:'none'

       })

     }
   });




 },
 bindTypePickerChange: function(e){
   console.log('bindTypePickerChange  ' + e.detail.value)
   this.setData({
     watchTypeNum: e.detail.value
   })
 },

  bindTimePickerChange: function (e) {
    console.log('bindTimePickerChange  ' + e.detail.value)
   this.setData({
     watchTime: e.detail.value,
     time: e.detail.value
   })
 },
  bindDatePickerChange: function (e) {
    watchDateisToday= currentDate == this.data.watchDate
    console.log('bindDatePickerChange  ' + e.detail.value + watchDateisToday)
    
    this.setData({
      watchDate: e.detail.value,
      date: e.detail.value
    })
  },

  /**
  * 区域选择器
  */
  bindAreaPickerChange: function (e) {
    console.log('bindAreaPickerChange  ' + e.detail.value)
    
    // this.changeListDataByArea(e);
    this.setData({
      indexArea: e.detail.value,
      //更新数据列表展示相应的数据


    })

  },

  bindChooseImage: function () {
    var timestamp = Date.parse(new Date());
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        if (tempFilePaths.length > 0) {
          var name = timestamp+"watch.jpg";//上传的图片的别名，建议可以用日期命名
          var file = new Bmob.File(name, tempFilePaths);
          file.save().then(function (res) {
            console.log(" url " + res.url());
            that.setData({
              imageUrl: res.url()
            })
          }, function (error) {
            wx.showToast({
              title: '上传图片失败请重试!',
              success: 'none',
            })
          })
        }

      }
    })
    var that = this
  },

  validatemobile: function (mobile) {
    if (mobile.length == 0) {
      wx.showToast({
        title: '请输入手机号！',
        icon: 'none',
        
      })
      return false;
    }
    if (mobile.length != 11) {
      wx.showToast({
        title: '手机号长度有误！',
        icon: 'none',
        
      })
      return false;
    }
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!myreg.test(mobile)) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'none',
        
      })
      return false;
    }
    return true;
  }

 
})