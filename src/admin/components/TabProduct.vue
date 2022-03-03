<template>
	<div>
		<el-form :inline="true">
			<el-form-item label="商品名称：">
				<el-input placeholder="请输入商品名称" prefix-icon="el-icon-search" v-model="search.name"></el-input>
			</el-form-item>
			<el-form-item label="商品类别：">
				<el-select v-model="search.mId">
					<el-option label="请选择" :value="0"></el-option>
					<el-option v-for="item in mainList" :key="item.id" :label="item.name" :value="item.id"></el-option>
				</el-select>
				&nbsp;-&nbsp;
				<el-select v-model="search.sId" :disabled="searchSId">
					<el-option label="请选择" :value="0"></el-option>
					<el-option v-for="item in subList" :key="item.id" :label="item.name" :value="item.id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button @click="searchHandler">查询</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="list" border>
			<el-table-column type="index" width="50" label="序号" align="center" fixed="left"></el-table-column>
			<el-table-column prop="name" label="商品名称" :show-overflow-tooltip="true" fixed="left"></el-table-column>
			<el-table-column label="价格(元)" width="80" align="center">
				<template slot-scope="{ row, column, $index }">
					￥<span v-text="row.price"></span>
				</template>
			</el-table-column>
			<el-table-column label="备注" prop="remark" :show-overflow-tooltip="true"></el-table-column>
			<el-table-column label="商品分类" width="180">
				<template slot-scope="{ row, column, $index }">
					<span v-text="row.mainCategoryName"></span>-<span v-text="row.subCategoryName"></span>
				</template>
			</el-table-column>
			<el-table-column label="avatar" width="100" align="center">
				<template slot-scope="{ row, column, $index }">
					<el-popover
						placement="left"
						:title="`avatar - ${ row.name }`"
						width="50"
						trigger="hover">
						<el-image :src="row.avatar" ></el-image>
						<el-button slot="reference" icon="el-icon-picture" type="text"></el-button>
					</el-popover>
				</template>
			</el-table-column>
			<el-table-column label="banner" fixed="right" width="100" align="center">
				<template slot-scope="{ row, column, $index }">
					<el-button type="text" @click="beginBannerEdit(row)">
						<i class="el-icon-picture"></i>/<i class="el-icon-edit"></i>
					</el-button>
				</template>
			</el-table-column>
			<el-table-column label="操作" fixed="right" align="center" width="130">
				<template slot-scope="{ row, column, $index }">
					<el-button type="text" size="mini" icon="el-icon-edit">修改</el-button>
					<el-button type="text" size="mini" icon="el-icon-delete">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination background
			layout="prev, pager, next, total, sizes"
			:total="pagination.total"
			:page-sizes="[5, 8, 10, 12, 15]"
			:page-size="pagination.pageSize"
			:current-page="pagination.currentPage"
			@size-change="pageSize => { pagination.pageSize = pageSize; getData2(1); }"
			@current-change="getData2">
		</el-pagination>
		<el-dialog :visible="banner.isEdit" title="banner维护" width="700" :before-close="endBannerEdit">
			<el-upload
				:data="{ id: banner.id }"
				:file-list="banner.list"
				:on-success="bannerUploadSuccessHandler"
				list-type="picture-card"
				multiple
				accept=".jpg,.png,.jpeg"
				name="banner"
				action="/product/banner/upload"
				:before-remove="bannerBeforeRemoveHandler">
			</el-upload>
		</el-dialog>
	</div>
</template>

<script type="text/ecmascript-6">
	import { mapState, mapActions, mapMutations } from 'vuex';

        export default {
                data() {
                        return {
                                banner: { isEdit: false, id: 0, list:[] },
                                searchSId: false,
                                search: { name: '', mId: 0, sId: 0 },
	                        ajaxSearch: { name: '', mId: 0, sId: 0 },
	                        pagination: { pageSize: 5, total: 0, currentPage: 0 }
                        }
                },
	        computed: {
		        ...mapState('category',[ 'mainList', 'subLists' ]),
		        ...mapState('product',[ 'list' ]),
		        subList() {
		                if(this.search.mId === 0) return [];
		                else return this.subLists[this.search.mId] || [];
		        }
	        },
	        watch: {
                        'search.mId': function(newValue, oldValue){
	                        this.search.sId = 0;
	                        if(newValue !== 0) {
	                                this.searchSId = true;
                                        this.initSubLists(newValue)
	                                        .then(() => this.searchSId = false);
	                        }

                        }
	        },
	        methods: {
		        ...mapActions('category',[ 'initMainList', 'initSubLists' ]),
                        ...mapActions('product',[ 'getData', 'removeBanner' ]),
		        ...mapMutations('product', [ 'uploadBanner' ]),
		        getData2(currentPage) {
		                this.pagination.currentPage = currentPage;
		                this.getData({
			                ...this.ajaxSearch,
			                begin: (this.pagination.currentPage - 1) * this.pagination.pageSize,
			                pageSize: this.pagination.pageSize
		                }).then(total => this.pagination.total = total);
		        },
                        searchHandler () {
		                this.ajaxSearch.name = this.search.name;
		                this.ajaxSearch.mId = this.search.mId;
		                this.ajaxSearch.sId = this.search.sId;
		                this.getData2(1);
                        },
		        beginBannerEdit(row) {
				this.banner.id = row.id;
				if(row.bannerImg) {
                                        row.bannerImg.split(',').forEach(item => {
                                                this.banner.list.push({
                                                        name: item.substr(item.lastIndexOf('/') + 1),
                                                        url: item
                                                })
                                        });
				}
		                this.banner.isEdit = true;
		        },
                        endBannerEdit() {
                                this.banner.id = 0;
                                this.banner.list = [];
                                this.banner.isEdit = false;
                        },
		        bannerUploadSuccessHandler({ status, data }, file, fileList) {
		                if(status === 200) {
		                        this.uploadBanner({ id: this.banner.id, filePath: data });
		                        this.banner.list.push({
			                        name: data.substr(data.lastIndexOf('/') + 1),
			                        url: data,
			                        uid: file.uid
		                        })
		                }
		        },
                        bannerBeforeRemoveHandler(file, fileList) {
		                this.$confirm('真删？', '提示', { type: 'warning' })
			                .then(() => {
		                                this.removeBanner({ id: this.banner.id, filePath: file.url })
			                                .then(() => {
		                                                let i = this.banner.list.findIndex(item => item.url === file.url);
		                                                this.banner.list.splice(i, 1);
			                                });
			                })
			                .catch(() => {});
		                return false;  // 不让删除

                        }
	        },
	        created() {
                        this.initMainList(); // 通知仓库去请求一级分类，如果已经请求过就什么也不做
	                this.getData2(1);  // 看第一页
	        }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>