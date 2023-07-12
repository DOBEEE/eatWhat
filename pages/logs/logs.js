//logs.js
const util = require('../../utils/util.js')


var end; 
var ssd;
const db = wx.cloud.database({env: 'cloud1-0g4s9hg9c00d1248'});
Page({
  data: {
    logs: [],
    button:"开始",
    endButton:"停止",
    sty:"什么",
    dateText:'早上',
    dateType: 'breakfast',
    datas:[],
    switchs:false,
    content: ''
  },
  onLoad: function () {
    
    // this.setData({
    //   logs: (wx.getStorageSync('logs') || []).map(log => {
    //     return util.formatTime(new Date(log))
    //   })
    // })
    wx.showShareMenu({
      withShareTicket: true
    })
    this.Date()
  },
  Date:async function(){
    
    // 调用函数时，传入new Date()参数，返回值是日期和时间  
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据  
    const {data} = await db.collection('configs').get();
    const foods = data[0];
    if (0 <= time && time<11 )
    {
      this.setData({
        dateText: "早饭",
        dateType: 'breakfast',
        content: foods['breakfast']
      }); 
    }
    if (11 <= time && time < 17) {
      this.setData({
        dateText: "午饭",
        dateType: 'lunch',
        content: foods['lunch']
      });
    }
    if (17 <= time && time < 21) {
      this.setData({
        dateText: "晚饭",
        dateType: 'dinner',
        content: foods['dinner']
      });
    }
    if (21 <= time && time < 23) {
      this.setData({
        dateText: "夜宵",
        dateType: 'dinner',
        content: foods['dinner']
      });
    } 
  },
  // 自定义的开始按钮
  startBtn: function () {
    var content = this.data.content.split(" ");
    this.setData({
      switchs: true
    })
    this.startn(content);
    //隐藏消失
    this.endDatas();
  },
  startn:function(content)
  {
    var that = this;
    end = setTimeout(function () {
      var s = content[Math.floor(Math.random() * content.length)]
      // console.log(that.data.datas)
      var datas = that.data.datas
      datas.push({
        "name":s,
        "x":Math.floor(Math.random() * 350),
        "y": Math.floor(Math.random() * 600),
        "size": Math.floor(Math.random() * 40),
        "opacity": Math.floor(Math.random()*2)
      })
      that.setData({
        sty: s
      })
      that.startn(content);
    }, 40)

  
  },
  // 自定义的暂停按钮  
  endBtn: function () {
    this.setData({
      switchs: false,
    })
    console.log("暂停按钮");
    clearTimeout(end);
    //20秒后关闭
    setTimeout(function () {
      clearTimeout(ssd);
    }, 2000)
  },
  toMap: function () {
    wx.navigateTo({
      url: '../map/map?dish=' + this.data.sty + '&keyword=' + this.data.sty
    })
  },
  //定时清除数组
  endDatas:function(){
    var that = this
    ssd = setTimeout(function () {
      var datas = that.data.datas
      var cdata = []
      for (var sd = 0; sd < datas.length; sd++) {
        var opacity = datas[sd].opacity - 0.01
        if(opacity<0){
          //console.log(opacity)
        }else{
          cdata.unshift({
            "name": datas[sd].name,
            "x": datas[sd].x,
            "y": datas[sd].y,
            "size": datas[sd].size,
            "opacity": opacity
          })
        } 
      }
      that.setData({
        datas: cdata
      })
      that.endDatas();
    }, 10)
  }
})


