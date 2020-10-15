<template>
  <div class="wrapper">
    <header class="lheader">
      <div class="lheader__wrapper">
        <div class="lheader__items">
          <div class="lheader__items_item">
            <img src="/img/lead/logo.svg" alt="Твой Стиль">
            <p class="lheader__name">Фабрика потолков</p>
          </div>
          <div class="lheader__items_item_small lheader__phone">
            <a class="lheader__phone_link">{{city.phone}}</a>
            <span
                class="lheader__phone_btn"
                @click="toogleModal('Заказать звонок', 'Заказать звонок')"
            >
                            Заказать звонок
                        </span>
          </div>
        </div>
      </div>
    </header>
    <section class="lcontent">
      <div class="banner_girl">
        <img src="/img/lead/banner-girl-mv.png" alt="">
      </div>
      <div class="lcontent__wrapper">
        <div class="lcontent__items">
          <div class="lcontent__items_item">
            <p class="lcontent_intro"></p>
            <h1 class="lcontent_title">
              <span class="header">Натяжные потолки</span><br>
              <span class="location" v-html="name_formatted"></span> от <span class="animate_number"><i>1</i><i>0</i><i>0</i></span> <span class="rouble">8</span>/м<sup>2</sup>
            </h1>
            <p class="lcontent_subtitle">
              Оставьте ваш номер телефона для расчёта натяжного потолка по WhatsApp и получите купон на сумму 5000 <span class="rouble">8</span> в подарок!
            </p>
            <Form :buttonName="'Получить расчёт и подарок'" v-if="visible"/>
            <div class="lcontent_site_link">
              <a :href="$store.state.siteUrl">Перейти на сайт</a>
            </div>
            <div style="flex-grow: 1;"></div>
            <div class="lcontent_copyright">Оставляя контактную информацию, вы соглашаетесь на <span>обработку персональных данных</span></div>
          </div>
        </div>
      </div>

      <div class="modal" v-if="$store.state.isModal">
        <div class="modal__container" v-if="!$store.state.isSuccess">
                    <span class="modal_close close" @click="toogleModal">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 18 18">
                            <path fill="none" stroke="#d9d7d7" stroke-linecap="round" stroke-linejoin="round"
                                  stroke-miterlimit="20" stroke-width="1.5" d="M1 1l16 16"/>
                            <path fill="none" stroke="#d9d7d7" stroke-linecap="round" stroke-linejoin="round"
                                  stroke-miterlimit="20" stroke-width="1.5" d="M17 1L1 17"/>
                        </svg>
                    </span>
          <div class="modal__lcontent">
            <p class="modal_title">{{ modalTitle }}</p>
            <Form :buttonName="btnName" :title="modalTitle" :type="'callback'"/>
            <span class="modal_linkClose" @click="toogleModal">Закрыть</span>
          </div>
        </div>
        <div class="modal__container" v-else>
                    <span class="modal_close close" @click="toogleModal">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 18 18">
                            <path fill="none" stroke="#d9d7d7" stroke-linecap="round" stroke-linejoin="round"
                                  stroke-miterlimit="20" stroke-width="1.5" d="M1 1l16 16"/>
                            <path fill="none" stroke="#d9d7d7" stroke-linecap="round" stroke-linejoin="round"
                                  stroke-miterlimit="20" stroke-width="1.5" d="M17 1L1 17"/>
                        </svg>
                    </span>
          <div class="modal__lcontent">
            <p class="modal_pre">Спасибо!</p>
            <p class="modal_title">Ваша заявка принята</p>
            <a :href="$store.state.siteUrl" class="btn btn_purple btn_pulse"><span>Перейти на сайт</span></a>
            <!--<span class="modal_linkClose" @click="toogleModal">Закрыть</span>-->
            <div class="modal_icons">
              <div class="modal_icons_item">
                <div class="modal_icons_item_ico">
                  <img src="/img/lead/ico1.svg" alt="">
                </div>
                <div class="modal_icons_item_text">Выезд мастера бесплатно!</div>
              </div>
              <div class="modal_icons_item">
                <div class="modal_icons_item_ico">
                  <img src="/img/lead/ico2.svg" alt="">
                </div>
                <div class="modal_icons_item_text">Договор на дому</div>
              </div>
              <div class="modal_icons_item">
                <div class="modal_icons_item_ico">
                  <img src="/img/lead/ico3.svg" alt="">
                </div>
                <div class="modal_icons_item_text">Сертификаты</div>
              </div>
              <div class="modal_icons_item">
                <div class="modal_icons_item_ico">
                  <img src="/img/lead/ico4.svg" alt="">
                </div>
                <div class="modal_icons_item_text">Гарантия 5 лет</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import Form from './Form'

export default {
  name: 'Lead',
  props: ['name_formatted', 'city'],
  data: () => ({
    modalTitle: '',
    btnName: '',
      visible:false,
  }),
    mounted() {
        this.visible = !this.visible;
        this.$store.state.city = this.city
        this.$store.state.siteUrl = this.$store.state.siteUrl + "/" + this.city.code
        $("body").on('DOMSubtreeModified', ".lheader__phone_link", function() {
            $(this).attr('href', 'tel:'+$(this).html().replace(/[^\d]/g, ""))
        });
    },
    methods: {
    toogleModal(title, btn) {
      this.modalTitle = title
      this.btnName = btn
      this.$store.state.isModal = !this.$store.state.isModal
    },
    phoneFormatted(){
      return this.city.phone.replace(/[^\d]/g, "");
    }
  },
  components: {
    Form
  }
}
</script>
<style lang="scss">
@import 'mixins';

@font-face {
    font-family: 'PTRoubleSans';
    src: url('../../fonts/subset-PTRoubleSans.woff2') format('woff2'),
    url('../../fonts/subset-PTRoubleSans.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Futura PT';
    src: url('../../fonts/Futura-PT-Light.woff2') format('woff2'),
    url('../../fonts/Futura-PT-Light.woff') format('woff');
    font-weight: 300;
    font-style: normal;
    font-stretch: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Futura PT';
    src: url('../../fonts/Futura-PT-Book.woff2') format('woff2'),
    url('../../fonts/Futura-PT-Book.woff') format('woff');
    font-weight: 400;
    font-style: normal;
    font-stretch: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Playfair Display';
    src: url('../../fonts/subset-PlayfairDisplay-Italic.woff2') format('woff2'),
    url('../../fonts/subset-PlayfairDisplay-Italic.woff') format('woff');
    font-weight: 400;
    font-style: italic;
    font-display: swap;
}

@font-face {
    font-family: 'Playfair Display';
    src: url('../../fonts/subset-PlayfairDisplay-Regular.woff2') format('woff2'),
    url('../../fonts/subset-PlayfairDisplay-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Helvetica Neue';
    src: url('../../fonts/subset-HelveticaNeue-Bold.woff') format('woff');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Helvetica Neue';
    src: url('../../fonts/subset-HelveticaNeue-Medium.woff') format('woff');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Helvetica Neue';
    src: url('../../fonts/subset-HelveticaNeue-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Helvetica Neue';
    src: url('../../fonts/subset-HelveticaNeue-Light.woff') format('woff');
    font-weight: 300;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'PTRoubleSerif';
    font-display: swap;
    src: url('../../fonts/PTRoubleSerif.woff') format('woff');
    font-weight: 300;
    font-style: normal;
    font-stretch: normal;
}


.rouble {
    font-family: 'PTRoubleSerif';
}

@include resset();

body {
  font-family: $font-family;
  line-height: 1.25;
  font-size: rem(16);
  font-weight: 300;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  justify-content: center;
  overflow-x: hidden;

  @include above($break_sm) {
    display: block;
  }

  & > div {
    max-width: rem(414);

    @include above($break_sm) {
      max-width: none;
    }
  }
}

.wrapper{
  max-width: 1180px;
  margin: 0 auto;
}

.lheader {
  height: rem(82);
  padding: rem(20) 0;
  box-sizing: border-box;
  background-color: #fff;
  @include above($break_sm) {
    padding: rem(16) 0;
  }


  &__wrapper {
    @include wrapper();
      @include above($break_md) {
          padding-left: 0;
          padding-right: 0;
      }
  }

  &__items {
    @include row-flex();
    justify-content: space-between;
    align-items: center;

    &_item {
      @include col();
      @include size(12);
      @include size-sm(14);
      display: flex;
      align-items: center;
      @include above($break_sm){
        width: auto;
      }
    }

    &_item_small {
      @include col();
      @include size(12);
      @include size-sm(10);
      display: flex;
      align-items: center;
      @include above($break_sm){
        width: auto;
      }
    }
  }

  &__name {
    display: none;
    @include above($break_sm) {
      display: flex;
      align-items: center;
      justify-content: center;
      text-transform: uppercase;
      font-size: rem(14);
      letter-spacing: rem(0.9);
      color: #485058;
      line-height: 20px;
      margin-left: 40px;
      margin-top: rem(10);
    }
  }

  &__phone {
    font-size: rem(14);
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    font-weight: 400;

    @include above($break_sm) {
        margin-top: .5rem;
      flex-direction: row;
    }

    &_link {
      color: #485058;
      @include above($break_sm) {
        margin-right: rem(16);
      }
    }

    &_btn {
      font-size: rem(13);
      color: $primary_light;
      border-bottom: solid rem(1) $primary_light;
      cursor: pointer;
      letter-spacing: 0.2px;
      line-height: 16px;
      @include above($break_sm) {
        font-size: rem(14);
      }
    }
  }
}

.banner_girl{
  display: none;
  position: absolute;
  @include above($break_sm){
    display: block;
    bottom: rem(-24);
    right: rem(-50);
  }
  @include above($break_md){
    right: rem(-30);
  }
}

.lcontent {
  background-image: url("/img/lead/stretch-ceiling-usa-14.jpg");
  background-size: cover;
  background-position: left bottom;
  color: #fff;
  position: relative;
  flex-grow: 1;

    @include above($break_md) {
        background-position: center;
    }

  &__wrapper {
    max-width: $break_lg;
    padding-left: rem(16);
    padding-right: rem(16);
    margin: 0 auto;

    @include above($break_sm) {
      padding-left: rem(16);
      padding-right: rem(16);
    }

    @include above($break_md) {
      padding-left: rem(100);
      padding-right: rem(16);
    }
  }

  &__items {
    @include row-flex();

    &_item {
      @include col();
      @include size(24);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      z-index: 10;
      padding: rem(10) 0 rem(7) 0;
      //100vh - lheader
      min-height: calc(100vh - 82px);

      @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
        min-height: calc(100vh - 82px - 179px);
      }
      @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
        min-height: calc(100vh - 82px - 179px);
      }

      @include above($break_sm) {
        min-height: calc(100vh - 82px - 24px);
        justify-content: space-around;
        align-items: flex-start;
      }

      @include above($break_md) {
        min-height: calc(100vh - 82px - 80px);
      }
    }
  }


  &_title {
    font-family: 'Playfair Display', serif;
    font-size: rem(24);
    font-weight: 400;
    line-height: 36px;
    margin-bottom: rem(23);
    width: 100%;
    text-align: center;

    @include above($break_sm) {
      font-size: rem(40);
      line-height: rem(48);
      text-align: left;
      margin-bottom: rem(32);
    }

    @include above($break_md) {
    }

    span.header {
      display: inline-block;
      text-transform: uppercase;
      font-size: rem(30);
      letter-spacing: -.3px;
      @include above($break_sm) {
        letter-spacing: 0;
        font-size: rem(48);
        line-height: rem(72);
        margin-bottom: rem(12);
      }
      @include above($break_md) {
        font-size: rem(56);
      }
    }
      span{
          display: inline-block;
          i{
              font-style: normal;
              letter-spacing: rem(-0.4);
              line-height: 1.33;
              display:inline-block;
              animation:float .3s ease-in-out infinite;

              &:nth-child(2){ animation-delay:.05s; }
              &:nth-child(3){ animation-delay:.15s; }
              &:nth-child(4){ animation-delay:.3s; }
          }
      }

      .animate_number{
          font-family: "Times New Roman", serif;
      }
  }

  &_intro {
    font-size: rem(14);
    text-transform: uppercase;
    letter-spacing: rem(4);
    margin-bottom: rem(24);
    line-height: 1.4;
    width: 100%;
    text-align: center;
    flex-grow: 1;

    @include above($break_sm) {
      font-size: rem(18);
      letter-spacing: rem(5);
      text-align: left;
    }

    @include above($break_md) {
    }
  }

  &_subtitle {
    line-height: rem(24);
    margin-bottom: rem(42);
    width: 100%;
    text-align: center;
    font-size: rem(16);
    font-weight: 300;

    @include above($break_sm) {
      font-size: rem(18);
      max-width: rem(485);
      text-align: left;
    }

    @include above($break_md) {
      max-width: rem(533);
        margin-bottom: rem(48);
      line-height: 26px;
    }

  }

  &_link {
    letter-spacing: rem(-0.3);
    font-weight: 500;
    line-height: 1.5;
    margin-top: rem(24);
    text-decoration: underline;
    color: #faf9f8;
  }

  &_site_link {
    color: #f3f2f2;
    font-size: 18px;
    font-weight: 300;
    line-height: 24px;
    text-decoration: underline;
    margin-top: rem(24);
      margin-bottom: rem(20);
    @include above($break_sm) {
      display: none;
    }
  }

  &_copyright {
    color: #babec2;
    font-size: rem(7);
    font-weight: 300;
    margin-bottom: rem(7);
    flex: none;

    @include above($break_sm) {
      font-size: rem(12);
      max-width: rem(360);
      margin-bottom: rem(16);
      line-height: rem(16);
    }

    span{
      @include above($break_sm) {
        text-decoration: underline;
      }
    }
  }

  &_btn {
    margin-bottom: rem(16);
  }


  .agree {
    @include above($break_md) {
      max-width: rem(290);
    }
  }
}

.btn {
  font-family: inherit;
  font-size: rem(20);
  font-weight: 300;
  color: #fff;
  height: rem(56);
  width: 100%;
  max-width: $break_xs;
  display: flex;
  justify-content: center;
  align-items: center;
  // padding: 0 rem(25);
  border-radius: rem(8);
  box-shadow: inset 0 -1px 0 #a01414;
  border: none;
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
  outline: none;
  overflow: hidden;


  &:after {
    content: "";
    height: rem(155);
    left: rem(-75);
    opacity: .2;
    position: absolute;
    top: rem(-50);
    transform: rotate(35deg);
    transition: all 550ms cubic-bezier(0.19, 1, 0.22, 1);
    width: rem(50);
    z-index: 1;
  }

  &:hover {
    &:after {
      left: 120%;
      transition: all 550ms cubic-bezier(0.19, 1, 0.22, 1);
    }
  }

  &_purple {
    background-color: #dc1414;

    &:after {
      background: #fff;
    }
  }

  &_white {
    color: $primary_dark;
    background-color: #fff;
    border: 1px solid $primary_dark;

    &:after {
      background: $primary_dark;
    }
  }

  &_pulse {
    &::after {
      animation-delay: 0.01s;
      animation-timing-function: ease-in-out;
      animation-name: radiance;
      animation-duration: 2s;
      animation-iteration-count: infinite;
    }
  }
}

@keyframes float {
  0%, 100% {
    transform: none;
  }
  33% {
    transform: translateY(-1px) rotate(-2deg);
  }
  66% {
    transform: translateY(1px) rotate(2deg);
  }
}

@-webkit-keyframes float {
  0%, 100% {
    -webkit-transform: none;
  }
  33% {
    -webkit-transform: translateY(-1px) rotate(-2deg);
  }
  66% {
    -webkit-transform: translateY(1px) rotate(2deg);
  }
}

@keyframes radiance {
  0% {
    left: -30px;
    margin-left: 0px;
  }

  30% {
    left: 110%;
    margin-left: 80px;
  }

  100% {
    left: 110%;
    margin-left: 80px;
  }
}

.input {
  height: rem(56);
  width: 100%;
  background: #fff;
  box-sizing: border-box;
  outline: none;
  border: solid rem(1) #d9d7d7;
  border-radius: rem(8);
  font-size: rem(18);
  text-align: center;
  line-height: 1.33;
  color: #b3adae;
  padding: 0 rem(16);
  display: flex;
  align-items: center;

  &_field {
    width: 100%;
    max-width: $break_xs;
  }
}

.error {
  border-color: red;

  &_wrapper {
    position: relative;
    width: 100%;
    max-width: rem(414);
  }

  &_alert {
    font-size: rem(12);
    text-transform: uppercase;
    color: red;
    position: absolute;
    z-index: 10;
    background-color: #fff;
    right: rem(8);
    top: rem(-8);
    padding: 0 rem(2);
  }
}

.modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  display: flex;
  justify-content: center;
  color: #332d2e;
  z-index: 100;
  background-color: #fff;
  margin-top: rem(82);
  height: calc(100vh - 82px);

  @include above($break_sm) {
    align-items: center;
  }

  &__container {
    width: 100%;
    max-width: 1180px;
    margin: 0 auto;
    height: calc(100vh - 82px);
    padding: rem(48) rem(16) rem(18);
    box-sizing: border-box;
    background-color: #fff;
    transition: all .3s ease;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-top: 2px solid #e3e3e3;

    .input {
      margin-bottom: rem(16);
    }

    .error_alert {
      top: rem(-24);
    }
  }

  &__lcontent {
    width: 100%;
    margin: auto;
    text-align: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

      .btn_pulse{
          margin-bottom: rem(25);
          @include above($break_sm){
              margin-bottom: rem(0);
          }
      }
  }

  &_pre {
    font-family: "Futura PT", serif;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 6px;
    line-height: 16px;
    text-transform: uppercase;
    margin-bottom: rem(16);

    @include above($break_sm){
      font-size: 16px;
      font-weight: 400;
      letter-spacing: 7px;
      line-height: 18px;
    }

    @include above($break_md){
      font-size: 22px;
      font-weight: 400;
      letter-spacing: 7px;
      line-height: 24px;
    }
  }


  &_title {

    font-family: "Playfair Display", serif;
    font-size: 28px;
    font-weight: 400;
    line-height: 36px;
    margin-bottom: rem(48);
    color: #485058;

    @include above(rem(360)){
      font-size: 32px;
    }

    @include above($break_sm){
      font-size: 48px;
      line-height: 56px;
    }
    @include above($break_md){
      font-size: 64px;
      line-height: 72px;
    }

  }

  &_intro {
    font-size: rem(18);
    line-height: 1.25;
    letter-spacing: rem(-0.4);
  }

  &_close {
    position: absolute;
    top: rem(16);
    right: rem(16);
    cursor: pointer;
  }

  &_linkClose {
    display: inline-block;
    color: $primary_dark;
    font-size: rem(16);
    letter-spacing: rem(-0.3);
    line-height: 1.5;
    text-decoration: underline;
    margin-top: rem(24);
    cursor: pointer;
  }

  &_icons{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: rem(100);

    @include below($break_sm) {
      display: none;
    }
    @include above($break_md) {
      margin-top: rem(200);
    }

    &_item{
      width: 50%;
      @include above($break_md) {
        width: 25%;
      }
      &_ico{
        min-height: 120px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        img{

        }
      }
      &_text{
        font-family: "Playfair Display", serif;
        font-size: 20px;
        font-weight: 400;
        line-height: 24px;
        color: #485058;
      }
    }
  }

  .agree {
    color: #b3adae;
  }

  .btn {
    @include above($break_md) {
      max-width: $break_xs;
    }
  }
}

.form {
  width: 100%;
  max-width: ($break_xs);

  .btn {
    margin-top: rem(16);
  }
}

.agree {
  display: none;
  font-size: rem(12);
  letter-spacing: rem(-0.2);
  color: #f4f6f8;
  margin-top: rem(8);

  @include above($break_sm) {
    display: block;
  }
}

</style>
