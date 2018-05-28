Page({

  /**
   * 页面的初始数据
   */
  data: {
    team1:'',
    team2:'',
    contact:'',
    phone: '',
    typeWatch: '',
    maxPerson: '',
    address: '',
    date: '',
    ps:'',
    imageUrl:''
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      team1: options.teamOne,
      team2: options.teamTwo,
      contact: options.contact,
      phone: options.phone,
      typeWatch: options.type,
      maxPerson: options.maxPerson,
      address: options.address,
      date: options.date,
      ps: options.ps,
      imageUrl: options.imageUrl

    })
  },

  bindCall: function (){
    wx.makePhoneCall({
      phoneNumber: this.data.phone,
    })
  }

 
})