// msite 外卖页面
<template>
  <div id="msite">
    <header>
      <div class="locationAndWeather">
        <div class="location">
          <i class="material-icons">place</i>
          <span v-cloak
                class="locationName">{{ currentGeoObj.formatted_address }}</span>
        </div>
        <div class="weather">
  
        </div>
      </div>
      <div class="searchBox">
        <input type="search"
               name="searchBox"
               placeholder="搜索商家 商品">
      </div>
      <!--hot随机热搜词汇-->
      <div class="hot">
        <ul>
          <li v-for="singleHot in hots">
            <a v-cloak
               href="#">{{ singleHot.word }}</a>
          </li>
        </ul>
      </div>
    </header>
    <main>
      <div class="themes-container">
        <!--theme主题推荐-->
        <div class="themes">
          <a class="theme"
             v-for="theme in themes"
             :title="theme.description"
             href="#">
            <figure>
              <img class="themeImage"
                   :src="getThemeImage(theme.image_url)"
                   alt="推荐主题的图片">
            </figure>
            <figcaption>
              <h6 v-cloak
                  class="theme-title">{{ theme.title }}</h6>
            </figcaption>
          </a>
        </div>
      </div>
      <!--店铺推荐-->
      <div class="restaurants">
        <h6>商家推荐</h6>
        <div v-for="restaurant in restaurants"
             class="restaurant">
          <!--是不是新店-->
          <!--绑定class不好使-->
          <div v-show="restaurant.is_new"
               class="is-new">
            <span class="is-new-band">新店</span>
          </div>
          <img :src="computedResImage(restaurant.image_path)"
               alt="restaurant.name">
          <div class="res-details ">
            <h6 v-cloak
                class="res-title ellipsis">{{ restaurant.name }}</h6>
            <div class="rating">
  
            </div>
            <p class="ellipsis">
              <span v-cloak
                    class="rating-num">{{ restaurant.rating }}</span>
              <span v-cloak
                    class="deal">月售 {{ restaurant.recent_order_num }} 单</span>
            </p>
            <p class="ellipsis">
              <span v-cloak
                    class="deal">￥{{ restaurant.float_delivery_fee }}起送 / </span>
              <span v-cloak
                    class="deal">{{ restaurant.piecewise_agent_fee.description }}</span>
            </p>
          </div>
          <div class="express">
            <p class="ellipsis">
              <span v-cloak
                    class="support"
                    v-show="restaurant.supports"
                    v-for="support in restaurant.supports">{{ support.icon_name }}</span>
            </p>
            <p class="ellipsis">
              <span v-if="check(restaurant,'delivery_mode')"
                    class="delivery_mode_solid">准时达</span>
              <span v-cloak
                    v-if="check(restaurant,'delivery_mode')"
                    class="delivery_mode">{{ restaurant.delivery_mode.text }}</span>
            </p>
            <p class="exp-dis-time">
              <span v-cloak
                    class="exp-dis">{{ getDistance(restaurant.distance) }} / </span>
              <span v-cloak
                    class="exp-time">{{ restaurant.order_lead_time }}分钟</span>
            </p>
          </div>
        </div>
      </div>
    </main>
    <mainfooter></mainfooter>
  </div>
</template>

<script>
import axios from 'axios'
import mainfooter from '../common/mainfooter/mainfooter'
export default {
  data: function () {
    return {
      // 随机热搜索
      hots: [],
      // 主题推荐
      themes: [],
      // 店铺推荐
      restaurants: [],
      // 当前地理位置是 currentGeoObj.formatted_address
      currentGeoObj: {},
      // 鼠标滚动事件
      scrolled: false
    }
  },
  components: {
    mainfooter
  },
  mounted: function () {
    this.init()
    this.$nextTick(function () {
      window.addEventListener('scroll', this.scrollLoad(), false)
    })
  },
  methods: {
    scrollLoad: function () {
      console.log('true')
      let differ = this.$el.offsetHeight - window.scrollY
      if (Math.floor(differ) === window.innerHeight) {
        console.log('true')
        let that = this
        let restaurantsUrl = `http://localhost:30000/shopping/restaurants?latitude=31.23037&longitude=121.473701&offset=100&limit=10&extras[]=activities&terminal=h5`
        axios.get(restaurantsUrl).then(function (response) {
          that.restaurants = that.restaurants.concat(response.data)
        })
      }
    },
    check: function (obj, props) {
      // 此处不能检查undefined
      // 用getOwnProperty
      return obj.hasOwnProperty(props)
    },
    getDistance: function (num) {
      return num < 1000 ? num + 'm' : (num / 1000).toFixed(2) + 'Km'
    },
    getThemeImage: function (string) {
      return 'http://localhost:30000//' + string + '?imageMogr/format/webp'
    },
    computedResImage: function (string) {
      let length = string.length
      let temp = string[length - 2] === 'n' ? '.png' : '.jpeg'
      return 'http://localhost:30000///' + string[0] + '/' + string.slice(1, 3) + '/' + string.slice(3) + temp + '?imageMogr/format/webp/'
    },
    init: function () {
      let that = this
      // 随机热搜索
      let hotUrl = `http://localhost:30000/shopping/v3/hot_search_words?latitude=31.23037&longitude=121.473701`
      axios.get(hotUrl).then(function (response) {
        that.hots = response.data
      })
      // theme主题推荐
      let themeUrl = 'http://localhost:30000/v2/index_entry?geohash=wx4sp3f251jb8dbcw863zr&group_type=1&flags[]=F'
      axios.get(themeUrl).then(function (response) {
        that.themes = response.data
      })
      // 店铺推荐
      let restaurantsUrl = `http://localhost:30000/shopping/restaurants?latitude=31.23037&longitude=121.473701&offset=10&limit=10&extras[]=activities&terminal=h5`
      axios.get(restaurantsUrl).then(function (response) {
        that.restaurants = response.data
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@charset "utf-8";
* {
  box-sizing: border-box;
  margin: 0;
}

html {
  font-size: 40px;
  user-select: none;
}

#msite {
  width: 100%;
}

header {
  background-color: #0096ff;
}

.locationAndWeather {
  display: flex;
  padding: .8rem .5rem;
  justify-content: space-between;
}

.location {
  align-items: center;
  display: flex;
}

.location>.material-icons {
  font-size: 1.2rem;
  color: #fff;
}

.locationName {
  font-size: 1.2rem;
  color: #fff;
  font-family: 'MicroSoft Yahei';
}

.searchBox {
  margin: 0 auto;
  width: 93%;
  height: 2.4rem;
}

.searchBox>input[type="search"] {
  color: #222;
  width: 100%;
  font-size: .8rem;
  height: inherit;
  border: none;
  outline: none;
  border-radius: 1.2rem;
  text-align: center;
  background: #fff;
}

input::-webkit-search-cancel-button {
  display: none;
}


/*热搜*/

.hot {
  width: 100%;
  overflow-x: scroll;
}

.hot>ul {
  width: 120%;
  padding: 20px 0;
  overflow-x: scroll;
  justify-content: space-around;
  display: flex;
}

.hot>ul>li {
  color: #fff;
  list-style-type: none;
  padding: 5px;
}

.hot a {
  font-size: .7rem;
  text-decoration: none;
  color: #fff;
}

main {
  position: relative;
  width: 100%;
}

.themes-container {
  width: 100%;
  overflow-x: scroll;
}


/*主题推荐*/

.themes {
  width: 200%;
}

.theme {
  display: inline-block;
  padding: .5rem 0;
  width: 12.5%;
  text-decoration-line: none;
}

.themeImage {
  display: block;
  margin: 0 auto;
  width: 50%;
}

.theme-title {
  text-align: center;
  font-size: .75rem;
  color: #666;
}

.restaurants {
  position: relative;
  width: 100%;
}

.restaurant {
  position: relative;
  width: inherit;
  display: flex;
  justify-content: space-between;
}

.is-new {
  position: absolute;
  width: 2rem;
  height: 2rem;
  top: 0;
  left: 0;
  background-image: linear-gradient(135deg, #26ce61, #26ce61 50%, transparent 0);
}

.is-new-band {
  font-size: .6rem;
  font-weight: 600;
  display: block;
  color: #fff;
  transform: rotate(-45deg);
}

.restaurant>img {
  width: 5rem;
  height: 5rem;
  padding: .5rem;
  border-radius: .5rem;
}

.res-details {
  width: 50%;
  text-align: left;
  padding-top: .5rem;
  flex-direction: column;
}

.res-title {
  text-overflow: ellipsis;
  overflow: hidden;
  color: #444;
  font-weight: 600;
  font-size: 1rem;
}

.rating-num {
  color: #ff6000;
  font-size: .7rem;
}

.deal {
  color: #444;
  font-size: .7rem;
}

.express {
  display: flex;
  text-align: right;
  width: 28%;
  justify-content: space-between;
  flex-direction: column;
  padding: .5rem;
}

.ellipsis {
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
  white-space: nowrap;
  padding-bottom: 1px;
}

.support {
  color: #444;
  font-weight: 100;
  font-size: .65rem;
  border: 1px solid #999;
  border-radius: 3px;
  margin: 0 2px;
  padding: 0 2px;
  display: inline-block;
}

.delivery_mode,
.delivery_mode_solid {
  font-weight: 100;
  font-size: .7rem;
  border-radius: 5px;
  padding: 2px;
  display: inline-block;
}


/*准时到达跟蜂鸟传送的前景色背景色正好相反*/

.delivery_mode {
  color: #fff;
  background-color: #2395ff;
}

.delivery_mode_solid {
  color: #2395ff;
  border: 1px solid #2395ff;
  background-color: #fff;
}

.exp-dis {
  color: #666;
  font-size: .7rem;
}

.exp-time {
  color: #2395FF;
  font-size: .8rem;
}
</style>
