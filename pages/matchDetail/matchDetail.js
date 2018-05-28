Page({

  /**
   * 页面的初始数据
   */
  data: {
    teamName:'',
    cost:'',
    contact:'',
    phone: '',
    typeMatch: '',
    colors: '',
    address: '',
    date: '',
    states:'',
    imageUrl: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      teamName: options.teamname,
      cost: options.cost,
      contact: options.contact,
      phone: options.phone,
      typeMatch: options.matchtype,
      colors: options.colors,
      address: options.address,
      date: options.date,
      states: options.states,
      imageUrl: options.imageUrl

    })
  },

  bindCall: function (){
    wx.makePhoneCall({
      phoneNumber: this.data.phone,
    })
  }

 
})