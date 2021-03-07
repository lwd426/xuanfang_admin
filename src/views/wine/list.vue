<template>
  <layout>
    <Button type="primary" style="margin-bottom: 12px;">添加酒品</Button>
    <Table border :columns="columns12" :data="data">
        <template slot-scope="{ row }" slot="name">
            <strong >{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row }" slot="pics">
            <strong>
                <img :src="row.pics" style="width: 50px;height: auto;"/>
            </strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">View</Button>
            <Button type="error" size="small" @click="remove(index)">Delete</Button>
        </template>
    </Table>
  </layout>
</template>
<script>
import Layout from '../layout/layout.vue'
export default {
  name: 'wine-list',
  components: {Layout},
    data () {
        return {
            columns12: [
                {
                    title: '名称',
                    slot: 'name'
                },
                {
                    title: '头图',
                    slot: 'pics',
                    type: 'pic',
                    width: 150,
                    align: 'center'
                },
                {
                    title: '规格（容量）',
                    key: 'volumn',
                    align: 'center'
                },
                {
                    title: '酒精含量',
                    key: 'alcoholVolumn',
                    align: 'center'
                },
                {
                    title: '库存',
                    key: 'count',
                    align: 'center'
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            data: [
                {
                    name: '玄方精纯',
                    volumn: 500,
                    alcoholVolumn: 52,
                    count: 100,
                    pics: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.16pic.com%2F00%2F29%2F65%2F16pic_2965671_b.jpg&refer=http%3A%2F%2Fpic1.16pic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1617715035&t=4bab88bea9a0d60db14b5b6d183db994'
                },
                {
                    name: '玄方精纯',
                    volumn: 500,
                    alcoholVolumn: 52,
                    count: 100,
                    pics: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.16pic.com%2F00%2F29%2F65%2F16pic_2965671_b.jpg&refer=http%3A%2F%2Fpic1.16pic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1617715035&t=4bab88bea9a0d60db14b5b6d183db994'
                },
                {
                    name: '玄方精纯',
                    volumn: 500,
                    alcoholVolumn: 52,
                    count: 100,
                    pics: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.16pic.com%2F00%2F29%2F65%2F16pic_2965671_b.jpg&refer=http%3A%2F%2Fpic1.16pic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1617715035&t=4bab88bea9a0d60db14b5b6d183db994'
                }
            ]
        }
    },
    methods: {
        show (index) {
            this.$Modal.info({
                title: 'User Info',
                content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
            })
        },
        remove (index) {
            this.data6.splice(index, 1);
        }
    }
}
</script>
