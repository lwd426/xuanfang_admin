<style scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    overflow-y: auto;
}
.ivu-layout {
    height: 100%;
    padding: 0px !important;
}
.layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}

.ivu-menu-light {
    height: 100%;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
.layout-footer-center{
    text-align: center;
}
</style>
<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" :active-name="menu[0].sort" @on-select="menuHandler">
                    <div class="layout-logo"></div>
                    <div class="layout-nav" style="float: right;" >
                        <MenuItem :name="m.sort" :key="m.sort" v-for="m in menu">
                            <Icon :type="m.icon"></Icon>
                            {{m.name}}
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Layout :style="{padding: '0 50px'}">
                <Breadcrumb :style="{margin: '16px 12px'}">
                    <BreadcrumbItem :key="i" v-for="(item,i) in $route.matched">{{item.meta.title}}</BreadcrumbItem>
                </Breadcrumb>
                <Content :style="{minHeight: '280px', background: '#fff', overflow:'auto'}">
                    <Layout>
                        <!-- <Sider hide-trigger :style="{background: '#fff'}">
                            <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
                                <Submenu name="1">
                                    <template slot="title">
                                        <Icon type="ios-navigate"></Icon>
                                        Item 1
                                    </template>
                                    <MenuItem name="1-1">Option 1</MenuItem>
                                    <MenuItem name="1-2">Option 2</MenuItem>
                                    <MenuItem name="1-3">Option 3</MenuItem>
                                </Submenu>
                                <Submenu name="2">
                                    <template slot="title">
                                        <Icon type="ios-keypad"></Icon>
                                        Item 2
                                    </template>
                                    <MenuItem name="2-1">Option 1</MenuItem>
                                    <MenuItem name="2-2">Option 2</MenuItem>
                                </Submenu>
                                <Submenu name="3">
                                    <template slot="title">
                                        <Icon type="ios-analytics"></Icon>
                                        Item 3
                                    </template>
                                    <MenuItem name="3-1">Option 1</MenuItem>
                                    <MenuItem name="3-2">Option 2</MenuItem>
                                </Submenu>
                            </Menu>
                        </Sider> -->
                        <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                            <slot></slot>
                        </Content>
                    </Layout>
                </Content>
            </Layout>
            <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>
        </Layout>
    </div>
</div>
</template>
<script>
  export default {
    name: 'layout',
    data () {
        return {
            menu: [
                {sort: 1, icon: 'ios-navigate', name: '酒品管理', link: '/wine/list'},
                {sort: 2, icon: 'ios-keypad', name: '客户管理', link: '/consumersList'},
                {sort: 3, icon: 'ios-analytics', name: '客服信息', link: '/service'},
                {sort: 4, icon: 'ios-paper', name: '系统管理', link: '/admin'},
            ]
        }
    },
    created() {
        console.log(this.$route)
    },
    methods: {
        menuHandler (sort) {
            this.$router.push(this.menu[sort-1].link)
        }
    }
  }
</script>