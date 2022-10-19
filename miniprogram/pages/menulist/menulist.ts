// pages/menulist/menulist.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    query: { id: "1", title: "美食" },
    page: 1,
    pageSize: 20,
    shopList: <any>[],
    total: 0,
    isLoading: false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options: { id: string, title: string }) {
    this.setData({
      query: { id: options.id, title: options.title }
    })
    this.initData();
    console.log(options)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    wx.setNavigationBarTitle({
      title: this.data.query.title
    });
  },
  initData(callback?:any) {

    wx.showLoading({
      title: "卖力加载中"
    })
    this.setData({
      isLoading: true
    })
    wx.request({
      url: "https://www.escook.cn/categories/" + this.data.query.id + "/shops",
      method: "GET",
      data: {
        _page: this.data.page,
        _limit: this.data.pageSize
      },
      success: (res: any) => {
        this.setData({
          shopList: [...this.data.shopList, ...res.data],
          total: res.header['X-Total-Count'] - 0
        }),

       callback && callback()
        console.log(res.header['X-Total-Count'] - 0)
     
        console.log(res)
      },
      complete: () => {
        wx.hideLoading();
        this.setData({
            isLoading: false
          });

      }
    })
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
  onPullDownRefresh() {
    //重置数据
    this.setData({
      page: 1,
      shopList:[],
      total:0
    })
    this.initData(()=>{
      wx.stopPullDownRefresh()//自动关闭自动
    }) 
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    //判断数据是否
    if (this.data.pageSize * this.data.page >= this.data.total) {
      wx.showToast({
        title: "数据加载完毕",
        icon: "none"
      })
      return;
    }
    if (this.data.isLoading) return;
    console.log("222")
    //页码值加一
    this.setData({
      page: this.data.page + 1
    })
    //更新数据
    this.initData();
 
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})