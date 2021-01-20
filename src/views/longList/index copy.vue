<template>
  <div class="home">
      <div class="content">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
          <p>12</p>
          <p>13</p>
          <p>14</p>
          <p>15</p>
          <p>16</p>
          <p>17</p>
          <p>18</p>
          <p>19</p>
          <p>20</p>
      </div>
      <div class="pay-detail-content">
          6666
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.home{
  height: 100%;
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
  position: relative;
  .pay-detail-content {
    position: absolute;
    width: 100vw;
    height: 100vh;
    z-index:1000;
    border: 1px solid red;
    background: red;
    .content {
        background-color: rgb(248, 248, 248);
        // overflow: hidden;
        position: relative;
        z-index: 1;
        overflow-y: scroll;
        // top: 55px;
        // left: 0;
        // right: 0;
        // bottom: 0px;
    }
  }
}
</style>