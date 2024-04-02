<template>
  <view class="main">

    <!-- <view class="header">

      <view :style="{ 'height': statusBarHeight + 'rpx' }"></view>
      <view  class="title">
        <image class="img" src="../../static/img/return.png"></image>

        <view class="text">病人信息</view>
      </view>
    </view> -->

    <view class="info">

      <view class="base-info">
        <view class="first">

          <view class="name">陈敏</view>

          <wd-tag custom-class="space" round bg-color="rgba(230, 255, 248, 1)"  type="success">三次随诊</wd-tag>
          <wd-tag custom-class="space" round bg-color="rgba(230, 255, 248, 1)"  type="success">1008611</wd-tag>

        </view>

        <view class="second">

          <view class="left">
            <view class="up">
              <wd-tag color="rgba(0, 0, 0, 1);" custom-class="space2" bg-color="white" >女</wd-tag>
              <wd-tag color="rgba(0, 0, 0, 1);" custom-class="space2" bg-color="white" >36</wd-tag>
              <wd-tag color="rgba(0, 0, 0, 1);" custom-class="space2" bg-color="white" >tak</wd-tag>

            </view>
            <view class="down">
              距离下次诊疗已逾10天
            </view>
          </view>

          <view class="right">
            <view class="phone">
              <image class="img" src="../../static/img/phone.png"></image>
              <view>拨打电话</view>
            </view>
            <view class="message">
              <image class="img" src="../../static/img/message.png"></image>
              <view>发短信</view>
            </view>
          </view>
          
        </view>
      </view>
    </view>
    
    <view class="follow">

          <wd-collapse v-model="Collapse">
            <wd-collapse-item title="随诊" name="item1">
              <view class="zlList">
                <view class="item">
                  <view class="top">
                    <view class="status">未诊疗</view>
                    <view class="date">2024-3-11</view>
                  </view>
                  <view class="address">
                    李丽(北京市顺义区医院)
                  </view>
                </view>

                <view class="item">
                  <view class="top">
                    <view class="status">未诊疗</view>
                    <view class="date">2024-3-11</view>
                  </view>
                  <view class="address">
                    李丽(北京市顺义区医院)
                  </view>
                </view>

                <view class="item">
                  <view class="top">
                    <view class="status">未诊疗</view>
                    <view class="date">2024-3-11</view>
                  </view>
                  <view class="address">
                    李丽(北京市顺义区医院)
                  </view>
                </view>
              </view>
            </wd-collapse-item>
            <wd-collapse-item title="病史" name="item2">
              <view class="history">

                <wd-form ref="form" :model="model">

                  <wd-cell-group  custom-class="cell-group" border>
                    <wd-calendar label="发病时间" label-width="100px" placeholder=" " prop="date" align-right="true" v-model="model.date" />
                    <wd-calendar label="确诊时间" label-width="100px" placeholder=" "  prop="date" align-right="true" v-model="model.date" />
                    
                    <wd-cell title="脑卒中" title-width="100px" prop="count">
                    
                      <wd-radio-group v-model="model.radioValue" shape="dot" inline>
                      <wd-radio value="1">有</wd-radio>
                      <wd-radio value="2">无</wd-radio>
                      </wd-radio-group>
                    
                    </wd-cell>

                    <wd-cell title="脑卒中" title-width="100px" prop="count">
                    
                      <wd-radio-group v-model="model.radioValue" shape="dot" inline>
                      <wd-radio value="1">有</wd-radio>
                      <wd-radio value="2">无</wd-radio>
                      </wd-radio-group>

                  </wd-cell>
                  </wd-cell-group>

                  </wd-form>

              </view>
              
            </wd-collapse-item>
            <wd-collapse-item title="tak" name="item3">
              <view class="disease">
                <view class="title">
                  <view class="name">tak</view>
                  <wd-button type="success" size="small"> 转病种</wd-button>
                </view>
                
                <view class="content">
                  <view>1.下背痛的病程至少了个月，疼痛随活动改善休衤啭鬻艫田息不缓解</view>
                  <view>1.下背痛的病程至少了个月，疼痛随活动改善休衤啭鬻艫田息不缓解</view>
                </view>
              </view>
              
            </wd-collapse-item>
          </wd-collapse>

    </view>
  </view>
 </template>

<script lang="ts" setup>


  import { ref ,reactive} from 'vue'

  const statusBarHeight = ref(90);


  const Collapse = ref<string[]>(['item1'])

  const columns = ref(['选项1', '选项2', '选项3', '选项4', '选项5', '选项6', '选项7'])
  const value = ref('选项1')

  function handleConfirm({ value }) {
    value.value = value
  }


  const model = reactive({
      value1: '',
      value2: '',
      date:2024,
      radioValue: 0

    })

  const form = ref()


  const handleSubmit = () => {

    console.log(111)

    form.value
      .validate()
      .then((data:any) => {
        if (data.valid) {
          console.log(data.valid)
        } else {
          console.log(333)
        }
      })
      .catch((error:any) => {
        console.log(error, 'error')
      })
}

</script>

<script lang="ts">
export default {
  options: {
    styleIsolation: 'shared',

  }
}
</script>

 <style lang="scss">


 .main{
   opacity: 1;
   background: rgba(255, 255, 255, 1);
   .header{
    height: 328rpx;
    opacity: 1;
    border-radius: 0px 0px, 24rpx, 24rpx;
    background: linear-gradient(180deg, rgba(30, 217, 167, 1) 0%, rgba(17, 194, 147, 1) 100%);
    .title{
      padding:0 30rpx;
      height:110rpx;
      display: flex;
      image{
        margin-left: 8.34rpx;
        margin-top:58.78rpx;
        width: 15.32rpx;
        height: 26.44rpx;
        .img{
          width: 100%;
        }
      }
      .text{
        margin-top:46rpx;
        margin-left: 30rpx;
        opacity: 1;
        /** 文本1 */
        font-size: 36rpx;
        font-weight: 700;
        letter-spacing: -0.5rpx;
        line-height: 50rpx;
        color: rgba(255, 255, 255, 1);

      }
    }
   }

   .info{
    padding: 30rpx;

    background: rgba(245, 245, 245, 1);

    .base-info{
      opacity: 1;
      border-radius: 16px;
      background: rgba(255, 255, 255, 1);
      margin-top: 30rpx;
      padding-left: 50rpx;
      

      .first{
        display: flex;
        padding-top: 32rpx;
        .name{
      
      
        }

      }
      .second{
        display: flex;
        
        .left{
          .up{
            margin-top: 20rpx;
            display: flex;
            
          }
          .down{
            margin-top:12rpx ;
            margin-bottom: 30rpx ;
          }
        }
        .right{
          display: flex;
          width: 200rpx;
          margin-left: 100rpx;
          font-size:20rpx ;
          
          justify-content: space-around;
          .phone{
            display: flex;
            flex-direction: column;
            align-items: center;
            image{
              width: 24rpx;
              height: 32rpx;
              .img{
                height: 100%;
              }

            }
          }
          .message{
            display: flex;
            flex-direction: column;
            align-items: center;
            image{
              width:36rpx;
              height: 32rpx;
              .img{
                height: 100%;
              }
            }
          }
        }
      }

    }
   }

   .follow{
    
      padding: 0rpx;
      opacity: 1;
      width: 100%;
      background: rgba(255, 255, 255, 1);

      .zlList{
        .item{
          opacity: 1;
          border-radius: 8px;
          background: rgba(245, 252, 252, 1);
      
          padding-left: 40rpx;
          padding-top: 20rpx;
          margin-bottom: 20rpx;
        
          .top{
            display: flex;
          
            .date{
              margin-left: 300rpx;
              margin-bottom: 20rpx;
            }
           
          }
          .address{

            padding-bottom: 20rpx;
          }
        }

      }

      .history{

        padding: 0rpx;
        border-radius: 8px;
        opacity: 1;
       // background: rgba(247, 247, 247, 1);

        .content{
          background: rgba(245, 252, 252, 1);
        
          opacity: 1;
          border-radius: 8px;
  
        }

       
        }

        .disease{

          background: rgba(245, 252, 252, 1);
          padding-left: 20rpx;

          .title{
            padding-top: 20rpx;
           
            display: flex;
            justify-content: space-around;
            .name{
              margin-top:16rpx;
              margin-right: 300rpx;
            }
          }
          
          .content{
            margin-top:40rpx;
            background: rgba(245, 252, 252, 1);
            padding-bottom: 20rpx;
            view{
              margin-bottom: 20rpx;
            }
          }



      }
    }

  

    .submit{
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 200rpx;
      height: 100rpx;
      opacity: 1;
      border-radius: 8px;
      color: rgba(255, 255, 255, 1);
      font-size: 16px;
      font-weight: 700;
      background: rgba(0, 191, 140, 1);
    }

    :deep(.space) {
      margin: 0rpx 10rpx 10rpx;
    }
    :deep(.space2) {
      margin: 0rpx 10rpx 10rpx;
      font-size: 26rpx;
    }

    :deep(.cell-group){
      background: rgb(188, 14, 14);
    }

    :deep(.wd-cell__wrapper){
      align-items: center;
    }
    :deep(.wd-radio-group){
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

 }

 
 </style>