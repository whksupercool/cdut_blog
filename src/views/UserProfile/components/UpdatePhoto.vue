<!--  -->
<template>
    <div class='update-photo'>
        <img :src="img" class="img" ref="img">
        <div class="toolbar">
            <div class="cancel" @click="$emit('close')">取消</div>
            <div class="confirm" @click="onConfirmPhoto">完成</div>
        </div>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { updateUserPhoto } from '@/api/user'

export default {
    //组件名称
    name: 'UpdatePhoto',
    //import引入的组件需要注入到对象中才能使用
    components: {},
    props: {
        img: {
            type: [String, Object],
            required: true
        }
    },
    data() {
        //这里存放数据
        return {
            cropper: null,
        }
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        onConfirmPhoto() {
            // 基于服务端的裁切使用 getData 方法获取裁切参数
            // console.log(this.cropper.getData())

            // 纯客户端的裁切使用 getCroppedCanvas 获取裁切的文件对象
            this.cropper.getCroppedCanvas().toBlob(blob => {
                this.updateUserPhoto(blob)
            })
        },
        async updateUserPhoto(blob) {
            // console.log(blob)
            this.$toast.loading({
                message: '保存中...',
                forbidClick: true, // 禁止背景点击
                duration: 0 // 持续展示
            })
            try {
                // 如果接口要求 Content-Type 是 multipart/form-data
                // 则你必须传递 FormData 对象
                const formData = new FormData()
                formData.append('photo', blob)

                const { data } = await updateUserPhoto(formData)

                // 关闭弹出层
                this.$emit('close')

                // 更新视图
                this.$emit('update-photo', data.data.photo)

                // 提示成功
                this.$toast.success('更新头像成功')
            } catch (error) {
                this.$toast.fail(error.response.data.message)
            }
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {

    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        const image = this.$refs.img
        this.cropper = new Cropper(image, {
            viewMode: 1,
            dragMode: 'move',
            aspectRatio: 1,
            autoCropArea: 1,
            cropBoxMovable: false,
            cropBoxResizable: false,
            background: false
        })
    },
    //生命周期 - 创建之前
    beforeCreate() { },
    //生命周期 - 挂载之前
    beforeMount() { },
    //生命周期 - 更新之前
    beforeUpdate() { },
    //生命周期 - 更新之后
    updated() { },
    //生命周期 - 销毁之前
    beforeDestroy() { },
    //生命周期 - 销毁完成
    destroyed() { },
    //如果页面有keep-alive缓存功能，这个函数会触发
    activated() { },
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
.update-photo {
    background-color: #000;
    height: 100%;

    .img {
        display: block;
        max-width: 100%;
    }

    .toolbar {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: space-between;

        .cancel,
        .confirm {
            width: 90px;
            height: 90px;
            font-size: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
        }
    }
}
</style>