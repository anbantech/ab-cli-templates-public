<template>
  <div id="wangeditor">
    <Toolbar class="border-1-solid" :editor="editor" :defaultConfig="toolbarConfig" :mode="mode" />
    <Editor v-model="html" :defaultConfig="editorConfig" class="border-1-solid editor-container" @onCreated="onCreated" @onChange="onChange" />
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import API from '@/api/index'

import '@wangeditor/editor/dist/css/style.css'

import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
export default {
  name: 'App',
  components: {
    Editor,
    Toolbar
  },
  data() {
    return {
      editor: null,
      html: '',
      toolbarConfig: {},
      editorConfig: {
        placeholder: '请输入内容...',
        MENU_CONF: {
          // 配置上传图片
          uploadImage: {
            timeout: 5 * 1000, // 5s
            fieldName: 'file',
            metaWithUrl: false, // join params to url
            headers: { Accept: 'multipart/form-data' },
            maxFileSize: 10 * 1024 * 1024, // 10M
            base64LimitSize: 5 * 1024, // insert base64 format, if file's size less than 5kb
            async customUpload(file, insertFn) {
              const form = new FormData()
              form.append('file', file)
              form.append('region', 0)
              const response = await API.news.uploadPicture(form)
              const { code, data } = response
              if (code !== 200) {
                ElMessage.error('上传失败，请重试')
                return
              }
              const { path, filename } = data.resources[0]
              insertFn(path, filename, path)
            }
            // onProgress(progress) {
            //   console.log('onProgress', progress)
            // },
            // onSuccess(file, res) {
            //   console.log('onSuccess', file, res)
            // },
            // onFailed(file, res) {
            //   console.log(res.message)
            //   console.log('onFailed', file, res)
            // },
            // onError(file, err, res) {
            //   console.log(err.message)
            //   console.error('onError', file, err, res)
            // }
          },
          uploadVideo: {
            timeout: 5 * 1000,
            fieldName: 'file',
            metaWithUrl: false, // join params to url
            headers: { Accept: 'multipart/form-data' },
            maxFileSize: 500 * 1024 * 1024,
            async customUpload(file, insertFn) {
              const form = new FormData()
              form.append('file', file)
              form.append('region', 0)
              const response = await API.news.uploadPicture(form)
              const { code, data } = response
              if (code !== 200) {
                ElMessage.error('上传失败，请重试')
                return
              }
              const { path, filename } = data.resources[0]
              insertFn(path, filename, path)
            }
          }
          // onSuccess(file, res) {
          //   console.log(`${file.name} 上传成功`, res)
          // }
        }
      },
      mode: 'default' // or 'simple'
    }
  },
  methods: {
    onCreated(editor) {
      const localHtml = localStorage.getItem('editorCache')
      if (localHtml) {
        this.html = localHtml
      }
      this.editor = Object.seal(editor)
    },
    onChange() {
      localStorage.setItem('editorCache', this.html)
      this.$emit('receive-content', this.html)
    }
    // onDestroyed(editor) {
    //   console.log('onDestroyed', editor)
    // },
    // onMaxLength(editor) {
    //   console.log('onMaxLength', editor)
    // },
    // onFocus(editor) {
    //   console.log('onFocus', editor)
    // },
    // onBlur() {
    //   const html = this.editor.getHtml()
    //   localStorage.setItem('editorCache', html)
    // }
    // customAlert(info, type) {
    //   Message.warning(`customAlert in Vue demo\n${type}:\n${info}`)
    // },
    // customPaste(editor, event, callback) {
    //   console.log('ClipboardEvent 粘贴事件对象', event)
    //   // const html = event.clipboardData.getData('text/html') // 获取粘贴的 html
    //   // const text = event.clipboardData.getData('text/plain') // 获取粘贴的纯文本
    //   // const rtf = event.clipboardData.getData('text/rtf') // 获取 rtf 数据（如从 word wsp 复制粘贴）

    //   // 自定义插入内容
    //   editor.insertText('xxx')

    //   // 返回 false ，阻止默认粘贴行为
    //   event.preventDefault()
    //   callback(false) // 返回值（注意，vue 事件的返回值，不能用 return）

    //   // 返回 true ，继续默认的粘贴行为
    //   // callback(true)
    // }
  },
  beforeUnmount() {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  }
}
</script>

<style lang="stylus" scoped>
.border-1-solid {
  border: 1px solid #aaa;
}

.editor-container {
  height: 600px !important;
  background: #fff;
}
</style>
