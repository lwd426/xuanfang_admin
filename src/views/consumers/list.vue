<template>
  <layout>
    <Button type="primary" style="margin-bottom: 12px;" @click="showaddConsumerModal">添加客户</Button>
    <Table border :columns="columns12" :data="consumers">
        <template slot-scope="{ row }" slot="name">
            <strong >{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row }" slot="money">
            <strong >{{ row.money }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="edit(row)">编辑</Button>
            <Button type="error" size="small" @click="remove(row,index)">删除</Button>
        </template>
    </Table>
    <!-- 添加酒品 -->
    <Modal
        v-model="addModal.show"
        title="提示"
        @on-ok="add"
        @on-cancel="cancel">
        <div class="wine-add-wrapper">
            <Form ref="formInline" :model="addConsumer" :label-width="80">
            <FormItem label="客户名称">
                <Input type="text" v-model="addConsumer.name" placeholder=""></Input>
            </FormItem>
            <FormItem label="余额">
                <Input type="text" v-model="addConsumer.money" placeholder=""></Input>
            </FormItem>
            <!-- <FormItem label="默认提货地址">
            </FormItem> -->
            <!-- <FormItem label="个人酒窖ID">
                <Input type="text" v-model="addConsumer.title" placeholder=""></Input>
            </FormItem> -->
        </Form>
        </div>   
    </Modal>
    <!-- 删除酒品确认弹框 -->
    <Modal
        v-model="confirm.show"
        title="提示"
        @on-ok="ok(confirm.item)"
        @on-cancel="cancel">
        <p>{{confirm.content}}</p>
    </Modal>
  </layout>
</template>
<script>
import Layout from '../layout/layout.vue'
// import uploadPics from  './components/uploadPics.vue'
export default {
  name: 'wine-list',
  components: {Layout},
    data () {
        return {
            // uploadPic: $config.host + '/img/upload',
            addModal: {
                show: false,
                type: ''
            },
            addConsumer: {
                name: '',
                money: ''
            },
            confirm: {
                show: false,
                content: '',
                item: undefined
            },
            columns12: [
                {
                    title: '客户姓名',
                    slot: 'name',
                     width: 200,
                },
                {
                    title: '余额',
                    slot: 'money',
                    width: 150,
                    align: 'center'
                },
                {
                    title: '个人酒窖',
                    key: 'wines',
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            consumers: [
            ]
        }
    },
    created () {
       this.getList()
    },
    methods: {
        getList () {
            this.$http.get(this.$config.host+ '/api/consumers/list').then(response => {
            var res = response.data.data;
            this.consumers = res.map((consumers) => {
                return {
                    id: consumers.user_id,
                    name: consumers.name || '',
                    money: consumers.money || 0,
                    celler_id: consumers.id,
                    wines: consumers.wines.map(w => {
                        return w.wine_name + '：'+w.count + '瓶'
                    }).join(' ') || ''
                }
            })
        
        }).catch(error => {
            console.log(error);
        });
        },
        edit (consumer) {
            this.addConsumer = consumer
            this.addModal = {
                show: true,
                type: 'edit'
            }
        },
        remove (row,index) {
            if (!row || !row.id) return 
            this.confirm = {
                content: '确认要删除'+row.name + '?',
                show: true,
                index: index,
                item: row
            }
        },
        showaddConsumerModal () {
            this.addModal = {
                show: true,
                type: 'add'
            }
        },
        add () {
            if(!this.addConsumer) return
            let url = this.$config.host + '/api/consumers/add'
            if (this.addModal.type === 'edit') {
                url = `${this.$config.host}/consumers/edit/${this.addConsumer.id}`
            }
            this.$http.post(url, this.addConsumer).then(response => {
                this.addModal.type === 'add' && this.$Message.info('添加成功');
                this.addModal.type === 'edit' && this.$Message.info('编辑成功');
                this.addModal.show = false
                this.addModal = {
                    show: false,
                    type: ''
                }
                this.getList()
                this.addConsumer = {}

            }).catch(error => {
                console.log(error);
            });
        },
        ok () {
            this.$http.post(this.$config.host + `/api/wine/delete/${this.confirm.item.id}`).then(response => {
                this.winelist.splice(this.confirm.index, 1);
                this.$Message.info('删除成功');
        
            }).catch(error => {
                console.log(error);
            });
        },
        cancel () {
            this.$Message.info('取消操作');
        }
    }
}
</script>
<style lang="less">
.wine-add-wrapper {
    margin-right: 10%;
    margin-top: 10px;
}
</style>
