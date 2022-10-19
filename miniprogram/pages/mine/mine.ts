// pages/mine/mine.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [],
    menuList: [],//menu菜单栏
    localCarImage:"",
    colorData: <any>[],
    isLoading: false,
    id: 0,
    imgArr: {}
  },
  putData() {
    wx.setStorage({
      key: "id",
      data: 100,
      success: () => {
        console.log("设置缓存成功")
      }
    });
  },

  getData() {
    wx.getStorage({
      key: "id", success: (res: any) => {
        this.setData({
          id: res.data
        })
        console.log(res)
        console.log("取值成功")
      }
    })
  },
  gotoIndex() {
    // wx.navigateTo({
    //   url:"/pages/index/index?name=zs&&id=1"
    // })
    wx.navigateBack({
      delta: 1
    })
  },
  getInfo() {
    wx.request({
      url: 'https://www.escook.cn/slides',
      method: 'GET',
      success: (res: any) => {
        this.setData({
          swiperList: res.data,
        })
        console.log(res.data)
      }
    })
  },

  getMenuList() {
    wx.request({
      url: 'https://www.escook.cn/categories',
      method: 'GET',
      success: (res: any) => {
        this.setData({
          menuList: res.data,
        })
        console.log(res.data)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载 ,初始化
   */
  onLoad() {
    this.getMenuList();
  },
  chooseImg() {
    wx.chooseImage({
      count: 9,
      success: res => {
        this.setData({
          localCarImage:res.tempFilePaths[0],
          imgArr: res.tempFilePaths
        })
        console.log(res.tempFilePaths[0])
      }
    })
  },
  getColor() {
    this.setData({
      isLoading: true
    })
    wx.showLoading({ title: "数据加载中...." });
    wx.request({
      url: 'https://www.escook.cn/api/color',
      method: 'GET',
      success: (res: any) => {
        //不能直接赋值需要进行新旧数据处理
        this.setData({
          colorData: [...this.data.colorData, ...res.data.data]
        })
      },
      complete: () => {
        wx.hideLoading();
        this.setData({
          isLoading: false
        })
      }
    },
    )
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log("222")
    wx.stopPullDownRefresh()//自动关闭自动
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

    if (this.data.isLoading) return;
    this.getColor()
    console.log("页面上拉触底事件的处理函数")
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})