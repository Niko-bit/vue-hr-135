<template>
  <div>
    <el-form ref="form" :model="deptForm" label-width="90px">
      <el-form-item label="部门名称">
        <el-input v-model="deptForm.name" />
      </el-form-item>
      <el-form-item label="部门编码">
        <el-input v-model="deptForm.code" />
      </el-form-item>
      <el-form-item label="部门负责人">
        <el-select v-model="deptForm.manager" placeholder="请选择活动区域">
          <!-- label: 用户看到的 select 信息 -->
          <!-- value：选中的某一项后本身绑定的值，后端接收的是 username -->
          <el-option
            v-for="item in employees"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍">
        <el-input v-model="deptForm.introduce" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="hSubmit">确定</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 导入封装的 API 模块
import {
  getEmployeeSimple,
  addDepartments,
  getDepartDetail,
  updateDepartments
} from "@/api/departments";

export default {
  name: "DeptDialog",
  props: {
    pid: {
      type: String,
      required: true
    },
    isEdit: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      deptForm: {
        name: "", // 部门名称
        code: "", // 部门编码
        manager: "", // 部门管理者
        introduce: "" // 部门介绍
      },
      employees: [] // 负责人列表
    };
  },
  // watch: {
  //   pid() {
  //     this.getDepartDetail()
  //   }
  // },
  created() {
    // 调用获取负责人列表数据的方法
    this.getEmployeeSimple();
    // 调用获取部门详情的数据的方法
    this.getDepartDetail();
  },
  methods: {
    // 获取部门详情的数据
    async getDepartDetail() {
      // 先判断是否是编辑
      if (this.isEdit) {
        const res = await getDepartDetail(this.pid);
        this.deptForm = res.data;
      }
    },

    // 新增部门的方法
    async addDeptHandler() {
      // 调用 API，传入参数
      const res = await addDepartments({ ...this.deptForm, pid: this.pid });
      // 需要给用户提示
      this.$message.success(res.message);
      // 弹框关闭，通知父组件更新
      this.$emit("update-depart");
    },

    // 编辑部门的方法
    async editDeptHandler() {
      const res = await updateDepartments(this.deptForm);
      // 需要给用户提示
      this.$message.success(res.message);
      // 弹框关闭，通知父组件更新
      this.$emit("update-depart");
    },

    // 新增/编辑部门
    hSubmit() {
      // 如果 isEdit 是true，说明是编辑，调用编辑的方法
      this.isEdit ? this.editDeptHandler() : this.addDeptHandler();
    },

    // 获取负责人列表数据
    async getEmployeeSimple() {
      const res = await getEmployeeSimple();
      this.employees = res.data;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-form {
  padding: 5px 70px 5px 28px;
}
.el-select {
  width: 100%;
}
</style>
