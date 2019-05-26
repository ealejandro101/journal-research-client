<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.autocomplete__icon.autocomplete--clear {
  display: flex;
}
.noPadding{
  padding: 0px;
}
.noPadding .row{
  margin: 0px;
}
img{
    width: 100%;
    height: auto;
}
.block-center{
  margin-left: auto;
  margin-right: auto;
  display: block;
}
@media (max-width: 575px){
  .col-0{
    display: none !important;
  }
}
@media (min-width: 576px){
  .col-sm-0{
    display: none;
  }
}
@media (min-width: 768px){
  .col-md-0{
    display: none;
  }
}
@media (min-width: 992px){
  .col-lg-0{
    display: none;
  }
}
@media (min-width: 1200px){
  .col-xl-0{
    display: none;
  }
}
.check .custom-control-label::before, .check .custom-control-label::after{
    left: auto !important;
    right: -4px !important

}
.check .custom-control-label{
  width: calc(100% - 11px);
}
.no-list-style{
  list-style: none;
}
.cursor-pointer{
  cursor: pointer;
}
.top-0{
  top: 0px;
}
.bottom-0{
  bottom: 0px;
}
.right-0{
  right: 0;
}
.text-overflow-ellipsis{
  text-overflow: ellipsis;
}
.backgroundImg2 {
  background-image: url(/static/fondoIndex2.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
.backgroundImg3{
  background-image: url('/static/fondoIndex3.png');
  background-size: contain;
  background-repeat: no-repeat;
  height: 100vh;
}
.no-bnt{
  background: transparent !important;
  border: none;
}
</style>
