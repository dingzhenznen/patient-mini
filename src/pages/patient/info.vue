<template>
  <view class="main">

    <!-- <view class="header">

      <view :style="{ 'height': statusBarHeight + 'rpx' }"></view>
      <view  class="title">
        <image class="img" src="../../static/img/return.png"></image>

        <view class="text">病人信息</view>
      </view>
    </view> -->


    <wd-message-box />

    <wd-toast />
    <view class="info">

      <view class="base-info">
        <view class="first">

          <view class="name">{{ form.name }}</view>

          <wd-tag custom-class="space" round bg-color="rgba(230, 255, 248, 1)"  type="success">{{form.followList.length}}次随诊</wd-tag>
          <wd-tag custom-class="space" round bg-color="rgba(230, 255, 248, 1)"  type="success">{{ form.caseId }}</wd-tag>

        </view>

        <view class="second">

          <view class="left">
            <view class="up">
              <wd-tag color="rgba(0, 0, 0, 1);" custom-class="space2" bg-color="white" >{{ form.age }}</wd-tag>
              <wd-tag color="rgba(0, 0, 0, 1);" custom-class="space2" bg-color="white" >{{ form.sex }}</wd-tag>
              <wd-tag color="rgba(0, 0, 0, 1);" custom-class="space2" bg-color="white" >{{ form.selectDisease?.en }}</wd-tag>

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

                <view class="item" v-for="item in form.followList" :key="item._id" @click="handleSelect(item.status)">
                  <view class="top">
                    <view class="status">{{item.status==0?"未诊疗":item.status==1?"诊疗中":"诊疗结束"}}</view>
                    <view class="date">{{ dayjs(item.thisDate).format('YYYY-MM-DD')}}</view>
                  </view>
                  <view class="address">
                    {{ item.doctorName }}
                  </view>
                </view>
              </view>
            </wd-collapse-item>
            <wd-collapse-item title="病史" name="item2">
              <view class="history">

                <wd-form ref="form" :model="form">

                  <wd-cell-group  custom-class="cell-group" border>
                    <wd-calendar label="发病时间" label-width="100px" placeholder=" " prop="date" :align-right="flag" v-model="form.history.attackTime" />
                    <wd-calendar label="确诊时间" label-width="100px" placeholder=" "  prop="date" :align-right="flag" v-model="form.history.confirmTime" />
                    
                    <wd-cell title="冠心病" title-width="100px" prop="count">
                    
                      <wd-radio-group v-model="form.complication.coronaryHeartDisease" shape="dot" inline>
                      <wd-radio value="1">有</wd-radio>
                      <wd-radio value="2">无</wd-radio>
                      </wd-radio-group>
                    
                    </wd-cell>

                    <wd-cell title="脑卒中" title-width="100px" prop="count">
                    
                      <wd-radio-group v-model="form.complication.cerebralApoplexy" shape="dot" inline>
                      <wd-radio value="1">有</wd-radio>
                      <wd-radio value="2">无</wd-radio>
                      </wd-radio-group>

                  </wd-cell>

                  <wd-cell title="脆性骨折" title-width="100px" prop="count">
                    
                    <wd-radio-group v-model="form.complication.fragilityFractures" shape="dot" inline>
                    <wd-radio value="1">有</wd-radio>
                    <wd-radio value="2">无</wd-radio>
                    </wd-radio-group>

                </wd-cell>

                <wd-cell title="脑瘤" title-width="100px" prop="count">
                    
                    <wd-radio-group v-model="form.complication.brainTumor" shape="dot" inline>
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
  import { onLoad } from '@dcloudio/uni-app';
  import { getPatient } from '@/apis/patient/index'
  import { startFollow } from '@/apis/follow/index'
  import { usePatientStore }  from "@/store/patient"
  import type { Patient } from '@/utils/types'
  import {showTip} from '@/utils/show'
  import dayjs from 'dayjs'

  import { useMessage ,useToast} from '@/uni_modules/wot-design-uni'
  const message = useMessage()
  const toast = useToast()


  const patientStore = usePatientStore();

  const idCard = ref('')

  const flag = ref<boolean>(true)

  const isExistGoing = ref(0)

  const Collapse = ref<string[]>(['item1'])

  const form = reactive<Patient>(
    {
        name: '',
        caseId: 0,
        sex:'',
        age:44,

        phone:'',
        history:{
          attackTime:0,
          confirmTime: 0,
        },
        complication:{
          coronaryHeartDisease:0,
          cerebralApoplexy:0,
          fragilityFractures:0,
          brainTumor:0,
        },
        
        tags:[],
        followList:[]
      
    })


  const handleSelect = (status:any) => {


    // 0 未开始  1 诊疗中 2 已结束
    if(status==0){
      // 没有进行中的
      if(isExistGoing.value==0){
        console.log(111)
        // 确定开始吗  请求接口更新状态为进行中 跳转 
        message
        .confirm({
          msg: '确定开始本次随访',
          title: '开始随访'
        })
        .then(async() => {
          const res = await startFollow({idCard:patientStore.patientInfo.idCard});
          if(res.code==0){
            uni.navigateTo({'url':'/pages/patient/finish?status=1'})
          }
        })
        .catch(() => {
          console.log('点击了取消按钮')
        })
      }
      else{
        // 提示结束
        toast.show('请结束当前随诊')
        showTip(' 请结束当前随诊')

      }


      //uni.navigateTo({'url':'/pages/patient/finish?status=0'})

    }else if(status==1){
      uni.navigateTo({'url':'/pages/patient/finish?status=1'})

    }else{
      uni.navigateTo({'url':'/pages/patient/finish?status=2'})
    }
  }


  onLoad(async(option:any)=>{

    idCard.value=option.idCard  
    idCard.value='340602197006152466'
    const res = await getPatient({'idCard':idCard.value})
    console.log(res)
    patientStore.updatePatientInfo(res.data.data[0])
    Object.assign(form, res.data.data[0]);

    const goingFollow:any = form.followList?.filter((item,index)=> item.status==1)

    isExistGoing.value = goingFollow?.length>0?1:0
    console.log(isExistGoing.value)
    console.log('flag',flag)// (value, index) => index !== order
    console.log(44444,form)
  })

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

 
 </style>../../utils/types/index