<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- Card 卡片组件 -->
      <el-card class="box-card">
        <!-- Tabs 标签页组件  -->
        <!-- v-model: tabs 绑定的激活项 name -->
        <el-tabs v-model="activeName">
          <el-tab-pane label="组织架构" name="first" class="tab-pane">
            <!-- 布局组件 -->
            <el-row type="flex" justify="space-between">
              <el-col :span="20">
                <i class="el-icon-s-home" />
                <span class="company">江苏传智播客教育科技股份有限公司</span>
              </el-col>

              <el-col :span="4">
                <el-row type="flex" justify="end">
                  <el-col>负责人</el-col>
                  <el-col>
                    <el-dropdown>
                      <span class="el-dropdown-link">
                        操作<i class="el-icon-arrow-down el-icon--right" />
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="addDept('')">添加子部门</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>

            <!-- 使用树行控件渲染组织架构主体区域 -->
            <el-tree
              default-expand-all
              class="departments-tree"
              :data="treeData"
              :props="defaultProps"
              @node-click="handleNodeClick"
            >
              <!-- slot-scope Vue 2.6 之前的语法 -->
              <!-- 最新的语法：v-slot -->
              <template slot-scope="{ data }">
                <el-row type="flex" style="height: 50px; width: 100%;" justify="space-between" align="middle">
                  <el-col :span="20">
                    <span>{{ data.name }}</span>
                  </el-col>

                  <el-col :span="4">
                    <el-row type="flex" justify="end">
                      <el-col>{{ data.manager }}</el-col>
                      <el-col>
                        <el-dropdown>
                          <span class="el-dropdown-link">
                            操作<i class="el-icon-arrow-down el-icon--right" />
                          </span>
                          <el-dropdown-menu slot="dropdown">
                            <!-- 添加 native 就能够找到组件内部触发事件的那个元素 -->
                            <!-- 需要传 id，只不过接口传递参数是 pid: -->
                            <el-dropdown-item @click.native="addDept(data.id)">添加部门</el-dropdown-item>
                            <el-dropdown-item @click.native="editDept(data.id)">编辑部门</el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </template>
            </el-tree>
          </el-tab-pane>
        </el-tabs>

        <!-- 新增/编辑部门弹框 -->
        <el-dialog
          :title="isEdit ? '编辑部门' : '新增部门'"
          :visible.sync="showDialog"
          :close-on-click-modal="false"
          :close-on-press-escape="false"
          width="50%"
        >
          <!-- 新增/编辑部门表单 -->
          <dept-dialog v-if="showDialog" :pid="pid" :is-edit="isEdit" @update-depart="updateDept" />
        </el-dialog>
      </el-card>

      <!--
        测试树行控件
        data：展示数据，需要是树形结构的数据
        props：组件本身的属性，不是父子传值那个 props
        props：是配置项，用来配置树行控件展示方式，按照那个属性来渲染的，例如：展示的文字
        node-click：节点被触发时的事件
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" />
      -->
    </div>
  </div>
</template>

<script>
// 导入 API
import { getDepartments } from '@/api/departments'
// 导入封装的方法
import { transListToTree } from '@/utils'
// 导入封装的子组件
import DeptDialog from './deptDialog.vue'

export default {
  name: 'Departments',
  components: {
    DeptDialog
  },
  data() {
    return {
      activeName: 'first',
      treeData: [], // 组织架构数据
      defaultProps: {
        // 键：是配置属性，是固定的
        // 值：是 data 需要渲染的数据中的属性
        children: 'children', // 树行结构描述父子嵌套关系的，父子嵌套的关键字
        label: 'name' // 渲染用户能够看到的文字
      },
      showDialog: false, // 控制新增和编辑弹框
      pid: '', // pid
      isEdit: false // 是否是编辑
    }
  },
  created() {
    // 调用获取组织架构的数据的方法
    this.getDepartments()
  },
  methods: {
    // 编辑部门弹框
    editDept(id) {
      this.pid = id
      this.showDialog = true
      this.isEdit = true
    },

    // 新增部门弹框
    addDept(id) {
      this.pid = id
      this.showDialog = true
      this.isEdit = false
    },

    // 隐藏弹框，刷新列表
    updateDept() {
      this.showDialog = false
      this.getDepartments()
    },

    // 获取组织架构的数据
    async getDepartments() {
      const res = await getDepartments()
      // this.treeData = res.data.depts
      this.treeData = transListToTree(res.data.depts, '')
    },

    handleNodeClick(data) {
      // data 点击的节点本身绑定的数据
      console.log(data)
    }
  }
}
</script>

<style lang="scss" scoped>
.box-card {
  padding: 10px 30px;
}

.departments-tree {
  margin: 12px 0px;
}

.tab-pane {
  padding: 20px 80px;

  .company {
    margin-left: 12px;
    font-weight: bold;
    font-size: 14px;
  }

  .department-header {
    height: 50px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ccc;
  }
}
</style>
