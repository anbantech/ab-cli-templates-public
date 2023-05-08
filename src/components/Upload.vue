<template>
  <el-upload drag width="100%" :http-request="uploadHandler" :show-file-list="false" :multiple="false" accept=".jpg, .jpeg, .png">
    <el-icon v-if="!imageUrl" class="el-icon--upload"><upload-filled /></el-icon>
    <div v-if="!imageUrl" class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    <img v-if="imageUrl" class="el-upload-list__item-thumbnail" :src="imageUrl" alt="" />
  </el-upload>
</template>
<script>
import { ElMessage } from 'element-plus'
import API from '@/api/index'
import { UploadFilled } from '@element-plus/icons-vue'
export default {
  name: 'Upload',
  props: {
    defaultUrl: {
      tyep: String,
      default: ''
    }
  },
  components: {
    UploadFilled
  },
  watch: {
    defaultUrl(val) {
      this.imageUrl = val
    }
  },
  data() {
    return {
      imageUrl: ''
    }
  },
  methods: {
    async uploadHandler({ file }) {
      try {
        // this.deleteUploadImage()
        const form = new FormData()
        form.append('file', file)
        form.append('region', 0)
        const response = await API.news.uploadPicture(form)
        const { code, data } = response
        if (code !== 200) {
          ElMessage.error('上传失败，请重试')
          return
        }
        this.imageUrl = data.resources[0].path
        this.$emit('receive-upload-file', data.resources[0])
      } catch (error) {
        ElMessage.error(error)
      }
    },
    async deleteUploadImage() {
      if (!this.imageUrl) return
      try {
        await API.news.deletePicture({
          path: encodeURI(this.imageUrl)
        })
      } catch (error) {
        ElMessage.error(error)
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.el-upload-list__item-thumbnail {
  width: 100%;
  height: 100%;
}
</style>
