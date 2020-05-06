//index.js
const app = getApp()

const GETUP = 0;
const SLEEP = 1;
const EARLY = -1;
const LATE = 1;

Page({
  data: {
    getupTime: '9:00',
    hasGetup: false,
    getupList: ['9:00', '8:00', '7:00'],
    getupData: {
      hasClocked: false,
      clocktype: GETUP,
      actionType: '起床',
      greeting: '早上好！',
      clockTime: '9:00',
      ordinaryTime: '8:00',
      earlyOrLate: LATE,
      distanceTime: '1小时',
    },
    sleepData: {
      hasClocked: false,
      clocktype: SLEEP,
      actionType: '睡觉',
      greeting: '晚安！做个好梦！',
      clockTime: '23:00',
      ordinaryTime: '8:00',
      earlyOrLate: LATE,
      distanceTime: '1小时',
    },
    currentData: null,
    // currentTime: (new Date()).toString().match(/[\d]{2}:[\d]{2}:[\d]{2}/)[0]
  },
  handleClock(e) {
    const clockType = e.currentTarget.dataset.clocktype;
    this.data.currentData = clockType === GETUP ? this.data.getupData : this.data.sleepData;
    debugger
    this.setData({ 'currentData.hasClocked': true });
    wx.showToast({
      title: this.data.currentData.greeting,  
      icon: 'success', 
      duration: 1500 
    })
    // wx.hideToast() // 隐藏Toast
  },
  handleRevoke() {
    let that = this;
    wx.showModal({
      title: '取消这次打卡吗？',
      content: '取消后，本次打卡记录将被删除，您可以重新打卡。',
      confirmText: '取消打卡',
      cancelText: '先不了',
      success: function(res) {
        if (res.confirm) {
          that.setData({ hasGetup: false });
          // wx.showToast({ // 显示Toast
          //   title: '嗨呀，失败了，再试一次。',  
          //   icon: 'none', 
          //   duration: 1500 
          // })
        } else if (res.cancel) {
          // 啥都不做
        }
      }
    })
    this.setData({ hasGetup: false });
  },
  onPullDownRefresh: function() {
    // 用户触发了下拉刷新操作
    // 拉取新数据重新渲染界面
    // wx.stopPullDownRefresh() // 可以停止当前页面的下拉刷新。
  }
})

