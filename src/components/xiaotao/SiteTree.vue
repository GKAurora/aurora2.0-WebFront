<template>
    <div>
        <p>
            <span style="font-size: 14px">当前：{{currentNode.name}} </span>
            <el-button @click="show = true" size="mini">选择站点</el-button>
        </p>
        <el-dialog
            title="选择站点"
            :visible.sync="show"
        >
            <div style="text-align: left; padding: 0 10px">
                <el-button @click="select" size="small" type="primary">选定</el-button>
                <el-tree
                    lazy
                    :load="loadNode"
                    @node-click="handleNodeClick"
                ></el-tree>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import API from '../api'
export default {
    name: 'SiteTree',
    data() {
        return {
            loading: false,
            currentNode: {
                label: '/ root',
                name: 'root',
                id: '/',
                is_parent: true,
                isLeaf: true
            },
            selectingNode: '',
            show: false
        }
    },
    mounted() {
        this.selectingNode = this.currentNode
    },
    methods: {
        async loadNode(node, resolve) {
            if (node.level === 0) {
                resolve([{
                    label: '/ root',
                    name: 'root',
                    id: '/',
                    is_parent: true,
                    isLeaf: true
                }])
            } else {
                this.loading = true
                const data = (await this.axios(API.network.getSiteList(node.data.id))).data
                this.loading = false
                resolve(data.map(e => {
                    e.label = `${e.name} | 类型：${e.position_type}`
                    e.isLeaf = !e.is_parent
                    return e
                }))
            }
        },
        handleNodeClick(e) {
            this.selectingNode = e
        },
        select() {
            this.currentNode = this.selectingNode
            this.$emit('select', this.currentNode)
            this.show = false
        }
    }
}
</script>

<style>

</style>
