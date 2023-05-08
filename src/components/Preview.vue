<template>
  <el-dialog v-model="showDialog" width="760px" @close="close">
    <div class="tilte">
      {{ newsData.title }}
    </div>
    <div class="tagTitle">
      <template v-if="newsData.tags && newsData.tags.length > 0">
        <div style="display: flex; margin: 13px 0 28px 0">
          <div v-for="(val, index) in newsData.tags.slice(0, 8)" :key="index" class="tag">{{ val.name }}</div>
          <div class="time">
            <span>{{ formateDate(newsData.updatedAt) }}</span>
          </div>
        </div>
      </template>
    </div>
    <div class="news-container" v-html="newsData.content" />
  </el-dialog>
</template>
<script>
import { formateDate } from '@/utils/common'

export default {
  name: 'Preview',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    newsData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  watch: {
    visible(val) {
      this.showDialog = val
    }
  },
  data() {
    return {
      showDialog: false
    }
  },
  methods: {
    formateDate,
    close() {
      this.$emit('event-tranggle')
    }
  }
}
</script>

<style lang="stylus" scoped>
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.tilte {
  font-weight: 700;
  font-size: 40px;
  line-height: 60px;
  color: #2c2c2c;
  text-align: left;
}

.time, .from {
  color: #888b94;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  margin-left: 16px;
}

.from {
  color: #0077ff;
}

.tag {
  z-index: 999;
  padding: 1px 8px;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: #333333;
  background: #fafafa;
  border: 1px solid #bfbfbf;
  border-radius: 2px;
  max-width: 106px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.tag:not(:nth-child(1)) {
  margin-left: 16px;
}

.news-container {
  text-align: left;
  line-height: 1.8;

  :deep(img) {
    max-width: 100%;
  }
}
</style>
