/*
 * @Author: XiaoMing 
 * @Date: 2018-06-01 17:17:09 
 * @Last Modified by: Xiao.Ming
 * @Last Modified time: 2018-06-13 17:24:27
 */
!function (global) {
  "use strict";
  // 全局变量进度时间

  var progressNumber = 0;
  var progressStyle = '.progress-load{\
    width: 100%; height: 100%; background: #2a2a2a; position: fixed; left: 0; top: 0; color: #fff;\
  }\
  .progress-load .s-l-span{\
    width: 50%; padding: 1px; box-sizing: border-box; overflow: hidden; transition: background .5s; font-size: 12px; line-height: 12px; height: 13px; box-shadow: 0px 0px 2px #000 inset; background: #191818; position: absolute; left: 25%; top:40%; border-radius: 15px;\
  }\
  .s-l-s-b{\
    width: 0%; height: 10px; border-radius: 10px; background: #f63a0f; float: left; margin-bottom:15px; margin-right: 5px;\
  }';
  var styleDom = document.createElement('style');
  styleDom.innerHTML = progressStyle;
  console.log(styleDom);
  var _this = null;
  var proNumber = Object.create({
    number: 0,
    target: 0
  });
  var processWdth = null;
  proNumber.number = 1;
  var time = null;
  var progressNode = document.createElement('div');
  var progress = function progress(reset) {
    var parameter = {
      id: 'no-Progress', // 自定义loadID
      domload: false, // DOM加载完则隐藏load
      width: 'process-width',
      number: 'process-number'
    };
    _this = this;
    this.resetData = {};
    for (var key in parameter) {
      this.resetData[key] = reset ? reset[key] : parameter[key] || parameter[key];
    }
    this.init();
  };

  // 获取body插入进度条DOM
  var appendProgress = function appendProgress() {
    setTimeout(function () {
      if (document.body) {
        progressNode.className = "progress-load";
        progressNode.innerHTML = '<div class="s-l-span"><b class="s-l-s-b" id="process-width"></b><span id="process-number">0%</span></div>';
        document.body.insertBefore(progressNode, document.body.firstChild);
        processWdth = document.getElementById('process-number');
      } else {
        appendProgress();
      }
    }, 500);
    document.getElementsByTagName('head')[0].appendChild(styleDom);
  };
  progress.prototype = {
    init: function init() {
      var _this2 = this;

      // 开始进度到20-50之间
      var randomPro = parseInt(Math.random() * 20) + 50;

      if (this.resetData.id === "no-Progress") {
        // 添中进度DOM
        appendProgress();
      }

      // 数据变化时DOM跟着更新
      this.change();

      // 开始加载
      this.addTime(randomPro, 400);

      // DOM加载完成，进度条随机到40-70
      document.addEventListener('DOMContentLoaded', function (e) {
        var randomDom = parseInt(Math.random() * (100 - proNumber.target - 20));
        console.log('DOM加载完成');
        if (_this2.resetData.domload) {
          _this2.addTime(100, 100);
          return false;
        }
        var imgAddnumber = function imgAddnumber() {
          var imgDom = document.querySelectorAll('img');
          var imgSize = 0;
          var t = void 0,
              n = void 0;
          for (var i = 0; i < imgDom.length; i++) {
            if (imgDom[i].complete) imgSize++;
          }

          t = parseInt((100 - proNumber.target) / imgSize);
          for (var j = 0; j < imgDom.length; j++) {
            if (imgDom[j].complete) {
              imgDom[j].onload = function () {
                if (imgDom[j].complete) {
                  n = proNumber.target + t;
                  _this.addTime(n, 100);
                }
              };
            }
          }
        };
        console.log(proNumber.target + randomDom);
        _this2.addTime(proNumber.target + randomDom, 200, imgAddnumber());
      });

      // 加载完在，全部结束
      window.onload = function () {
        console.log('load完成');
        _this2.addTime(100, 10);
      };
    },
    addTime: function addTime(target, times, fn) {
      proNumber.target = target;
      clearInterval(time);
      time = setInterval(function () {
        progressNumber >= 100 ? progressNumber = 100 : progressNumber;
        if (progressNumber >= target) {
          clearInterval(time);
          if (fn) fn();
        } else {
          progressNumber += 1;
          proNumber.number = progressNumber;
        }
      }, times);
    },
    change: function change(fn) {
      // 显示进度条
      var widthDom = document.getElementById(_this.resetData.width);
      var numberDom = document.getElementById(_this.resetData.number);
      console.log(widthDom);
      var domTime = setInterval(function () {
        if (widthDom && numberDom) {
          clearInterval(domTime);
        } else {
          widthDom = document.getElementById(_this.resetData.width);
          numberDom = document.getElementById(_this.resetData.number);
        }
      }, 50);
      Object.defineProperty(proNumber, 'number', {
        set: function set(newNumber) {
          if (widthDom) {
            widthDom.style.width = newNumber + '%';
            numberDom.innerHTML = newNumber + '%';
          }
          // 当值变化时触发
          if (newNumber >= 100) {
            // 添加延时效果，增强用户体验
            setTimeout(function () {
              if (_this.resetData.id != "no-Progress") {
                document.body.removeChild(document.getElementById(_this.resetData.id));
              } else {
                document.body.removeChild(document.querySelector('.progress-load'));
              }
            }, 500);
          }
          // 值变化时触发回调
          if (fn) fn(newNumber);
        }
      });
    }
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = MyPlugin;
  if (typeof define === 'function') define(function () {
    return MyPlugin;
  });
  global.progress = progress;
}(this);