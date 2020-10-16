<template>
    <div class="wrapper">
        <header class="lheader">
            <div class="lheader__wrapper">
                <div class="lheader__items">
                    <div class="lheader__items_item">
                        <img src="/potolki/images/logo.svg" alt="Твой Стиль">
                        <p class="lheader__name">Фабрика потолков</p>
                    </div>
                    <div class="lheader__items_item_small lheader__phone">
                        <a class="lheader__phone_link" :href="phone">{{phone}}</a>
                        <span class="lheader__phone_btn" @click="toogleModal('Заказать звонок', 'Заказать звонок')">Заказать звонок</span>
                    </div>
                </div>
            </div>
        </header>
    </div>
</template>

<script>
import Form from './Form'
export default {
    name: 'App',

    data: () => ({
    phone: '+78007759020',
    modalTitle: '',
    btnName: '',
      visible:false,
    }),

    props: ['name_formatted', 'city'],
    
    mounted() {
      this.visible = !this.visible;
      this.$store.state.city = this.city;
      //this.$store.state.siteUrl = this.$store.state.siteUrl + "/" + this.city.code;
    },

    methods: {
            toogleModal(title, btn) {
            this.modalTitle = title;
            this.btnName = btn;
            this.$store.state.isModal = !this.$store.state.isModal;
        }
    },

    phoneFormatted(){
      return this.city.phone.replace(/[^\d]/g, "");
    },
    
    components: {
        Form
    },
}
</script>