Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    contact:'',
    phone: '',
    typeMatch: '',
    openTime: '',
    address: '',
    price: '',
    area:'',
        
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      name: options.name,
      contact: options.contact,
      phone: options.phone,
      typeMatch: options.type,
      price: options.price,
      address: options.address,
      area: options.area,
      openTime: options.openTime,
   

    })
  },

  bindCall: function (){
    wx.makePhoneCall({
      phoneNumber: this.data.phone,
    })
  }

 
})