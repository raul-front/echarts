<template>
  <div class="home-project" v-loading="loading">
    <div class="project-item" v-for="(item, i) in projectList" :key="i" @click="goProjectSpace(item)">
      <div class="header">
        <div class="name-wrapper">
          <div class="name" v-if="item.name.length < 9">{{item.name}}</div>
          <el-tooltip v-else effect="dark" :content="item.name" placement="top">
            <div class="name">{{item.name}}</div>
          </el-tooltip>
          <fx-icon v-if="item.isPrivate" class="fx-margin-left-mini" microsoft icon="icon-lock" size="mini"></fx-icon>
        </div>
        <fx-icon :class="['star', 'fx-margin-left-mini', {'is-stared': item.isStared, 'fx-display-none': !item.isStared}]"
          microsoft icon="icon-star-shoucang" size="mini"
          :loading="item.loading" @click.native.stop="starProjectHandle(item)"></fx-icon>
      </div>
      <div class="desc" v-if="item.desc.length < 20">{{item.desc}}</div>
      <el-tooltip v-else effect="dark" :content="item.desc" placement="top">
        <div class="desc">{{item.desc}}</div>
      </el-tooltip>
    </div>
    <div v-if="type === 'all'" class="project-item project-item_add fx-flex-center" @click="openAddDialog">
      <i class="el-icon-plus"></i>
      <span>创建新看板</span>
    </div>

    <!-- edit -->
    <el-dialog :title="editForm.action === 'update' ? '修改看板' : '添加看板'" :visible.sync="visible" width="600px">
      <el-form ref="editForm" :model="editForm" :rules="editFormRule" label-width="100px">
        <el-form-item label="标题：" prop="name">
          <el-input v-model.trim="editForm.name" placeholder="请填写看板标题"></el-input>
        </el-form-item>
        <el-form-item label="描述：" prop="desc">
          <el-input type="textarea" v-model="editForm.desc" placeholder="请填写看板描述"></el-input>
        </el-form-item>
        <el-form-item label="可见性：" prop="isPrivate">
          <project-private v-model="editForm.isPrivate"></project-private>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeEditDialog">取 消</el-button>
        <el-button type="primary" @click="submitEditForm" :loading="editSubmitBtnLoading">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import editDialogMixin from 'lisa/mixins/editDialog'
import { listProject, listStaredProject, addProject, updateProject, updateProjectStarStatus } from 'api/oa'
// import ProjectStar from '@/views/project/ProjectComponents/Star'
import ProjectPrivate from '@/views/project/ProjectComponents/Private'

export default {
  name: 'home-project',
  mixins: [editDialogMixin],
  props: {
    type: String
  },
  components: { ProjectPrivate },
  beforeCreate () {
    this.defaultForm = {
      action: 'add',
      name: '',
      desc: '',
      isPrivate: true
    }
  },
  data () {
    return {
      loading: false,
      projectList: [],

      visible: false,
      editFormRule: {
        name: [
          { required: true, type: 'string', message: '请填写看板标题', trigger: 'blur' },
          { min: 3, message: '名称不少于3个字', trigger: 'blur' },
          { max: 20, message: '名称最多20个字', trigger: 'blur' }
        ],
        desc: [{ required: true, type: 'string', message: '请填写看板描述', trigger: 'blur' }],
        isPrivate: [{ required: true, type: 'boolean', message: '', trigger: 'change' }]
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.loading = true
      if (this.type === 'all') {
        listProject({ list_all: true }).then(res => {
          this.loading = false
          let list = res.items || []
          this.projectList = list.map(x => this.getItem(x))
        }).catch(_ => {
          this.loading = false
        })
      } else {
        listStaredProject({ list_all: true }).then(res => {
          this.loading = false
          let list = res.items || []
          this.projectList = list.map(x => this.getItem(x))
        }).catch(_ => {
          this.loading = false
        })
      }
    },
    getItem (x) {
      return {
        id: x.ID,
        name: x.name,
        desc: x.desc,
        isStared: this.type === 'star' || x.is_stared,
        isPrivate: x.is_private,
        loading: false
      }
    },

    // edit
    refresh () {
      this.getData()
    },
    addDataHandle (data) {
      return addProject(data)
    },
    updateDataHandle (id, data) {
      return updateProject(id, data)
    },
    getUpdateData (row) {
      return {
        id: row.id,
        name: row.name,
        desc: row.desc,
        isPrivate: row.isPrivate
      }
    },
    getSubmitData (data) {
      return {
        name: data.name,
        desc: data.desc,
        is_private: data.isPrivate
      }
    },

    starProjectHandle (item) {
      if (item.loading) {
        return
      }
      let status = item.isStared ? 'unstar' : 'star'
      item.loading = true
      updateProjectStarStatus(item.id, status).then(res => {
        item.isStared = !item.isStared
        item.loading = false
        this.$message.success(`${!item.isStared ? '取消' : ''}收藏成功`)
      }).catch(_ => {
        item.loading = false
      })
    },

    goProjectSpace (item) {
      this.$router.push({
        name: 'ProjectSpace',
        params: {
          id: item.id
        }
      })
    }
  }
}
</script>

<style lang="scss">
.home-project{
  display: flex;
  flex-wrap: wrap;
  min-height: 121px;
  .project-item{
    margin: 0 24px 16px 0;
    padding: 10px;
    width: 216px;
    height: 105px;
    border-radius: 4px;
    background: $bg-color;
    cursor: pointer;
    box-sizing: border-box;
    &:hover{
      margin-top: -5px;
      box-shadow: 0 4px 8px 0 rgba(31, 22, 67, .1);
      .star{
        display: inherit !important;
      }
    }
    .header{
      @include flex-center-y();
      .name-wrapper{
        flex: 1;
        overflow: hidden;
        @include flex-center-y();
        .name{
          font-size: 18px;
          height: 25px;
          line-height: 25px;
          color: $color-title;
          @include ellipsis();
        }
      }
      .star{
        color: rgba(64, 64, 64, 0.2)
      }
      .is-stared{
        color: $color-warning;
      }
    }
    .desc{
      margin-top: 3px;
      height: 36px;
      line-height: 18px;
      @include multiline-ellipsis(2);
    }
  }
  .project-item_add:hover{
    margin-top: 0;
    color: $color-primary;
    background-color: #F4FFFF;
  }
}
</style>
