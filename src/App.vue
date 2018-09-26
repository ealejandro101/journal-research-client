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
</style>
