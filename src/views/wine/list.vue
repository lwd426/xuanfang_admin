<template>
  <layout>
    <Button type="primary" style="margin-bottom: 12px;" @click="showAddWineModal">添加酒品</Button>
    <Table border :columns="columns12" :data="winelist">
        <template slot-scope="{ row }" slot="name">
            <strong >{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row }" slot="pics">
            <strong>
                <img :src="row.pics" style="width: 50px;height: auto;"/>
            </strong>
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
            <Form ref="formInline" :model="addWine" :label-width="80">
            <FormItem label="酒品名称">
                <Input type="text" v-model="addWine.name" placeholder=""></Input>
            </FormItem>
            <FormItem label="酒品标题">
                <Input type="text" v-model="addWine.title" placeholder=""></Input>
            </FormItem>
            <FormItem label="酒品头图">
                <!-- <Upload :action="$config.host + '/img/upload'" v-model="addWine.pics">
                    <Button icon="ios-cloud-upload-outline">上传</Button>
                </Upload> -->
                <upload-pics :url="$config.host + '/img/upload'" :limit="1" :add="addTitlePicHandler" :remove="removeTitlePicHandler"></upload-pics>
            </FormItem>
            <FormItem label="酒品详情">
                <upload-pics :url="$config.host + '/img/upload'" :limit="5" :add="addPicsHandler" :remove="removePicsHandler"></upload-pics>
            </FormItem>
            <FormItem label="原价">
                <Input type="text" v-model="addWine.origin_price" placeholder="单位：元"></Input>
            </FormItem>
            <FormItem label="当前价">
                <Input type="text" v-model="addWine.current_price" placeholder="单位：元"></Input>
            </FormItem>
            <FormItem label="规格（ml）">
                <Input type="text" v-model="addWine.volume" placeholder=""></Input>
            </FormItem>
            <FormItem label="酒精度数">
                <Input type="text" v-model="addWine.alcoho_vol" placeholder=""></Input>
            </FormItem>
            <FormItem label="库存">
                <Input type="text" v-model="addWine.count" placeholder=""></Input>
            </FormItem>
            <!-- <FormItem>
                <Button type="primary" @click="add('formInline')">Signin</Button>
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
import uploadPics from  './components/uploadPics.vue'
export default {
  name: 'wine-list',
  components: {Layout,uploadPics},
    data () {
        return {
            // uploadPic: $config.host + '/img/upload',
            addModal: {
                show: false,
                type: ''
            },
            addWine: {detail_pics: [], pics: []},
            confirm: {
                show: false,
                content: '',
                item: undefined
            },
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
                    title: '标题',
                    key: 'title',
                },
                {
                    title: '当前价',
                    key: 'current_price',
                },
                {
                    title: '原价',
                    key: 'origin_price',
                },
                {
                    title: '规格（ml）',
                    key: 'volume',
                    align: 'center'
                },
                {
                    title: '酒精度数',
                    key: 'alcoho_vol',
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
            winelist: [
            ]
        }
    },
    created () {
       this.getList()
    },
    methods: {
        getList () {
            this.$http.get(this.$config.host+ '/api/wine/list').then(response => {
            var res = response.data.data;
            this.winelist = res.map((wine) => {
                return {
                    id: wine.id || undefined,
                    name: wine.name || '',
                    title: wine.title || '',
                    volume: wine.volume || '',
                    alcoho_vol: wine.alcoho_vol ||'',
                    origin_price: wine.origin_price ||'',
                    current_price: wine.current_price ||'',
                    count: wine.count || 0,
                    pics: wine.pics || 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.16pic.com%2F00%2F29%2F65%2F16pic_2965671_b.jpg&refer=http%3A%2F%2Fpic1.16pic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1617715035&t=4bab88bea9a0d60db14b5b6d183db994'
                }
            })
        
        }).catch(error => {
            console.log(error);
        });
        },
        edit (wine) {
            this.addWine = wine
            this.addModal = {
                show: true,
                type: 'edit'
            }
        },
        remove (row,index) {
            debugger
            if (!row || !row.id) return 
            this.confirm = {
                content: '确认要删除'+row.name + '?',
                show: true,
                index: index,
                item: row
            }
        },
        showAddWineModal () {
            this.addModal = {
                show: true,
                type: 'add'
            }
        },
        add () {
            if(!this.addWine) return
            let url = this.$config.host + '/api/wine/add'
            if (this.addModal.type === 'edit') {
                url = `${this.$config.host}/wine/edit/${this.addWine.id}`
            }
            this.$http.post(url, this.addWine).then(response => {
                this.addModal.type === 'add' && this.$Message.info('添加成功');
                this.addModal.type === 'edit' && this.$Message.info('编辑成功');
                this.addModal.show = false
                this.addModal = {
                    show: false,
                    type: ''
                }
                this.getList()
                this.addWine = {}

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
        },
        addPicsHandler (pic) {
            this.addWine.detail_pics.push(pic)
        },
        removePicsHandler (pic) {
            this.addWine.detail_pics.splice(this.addWine.detail_pics.indexOf(pic), 1)
        },
        addTitlePicHandler (pic) {
            this.addWine.pics.push(pic)
        },
        removeTitlePicHandler (pic) {
            this.addWine.pics.splice(this.addWine.pics.indexOf(pic), 1)
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
