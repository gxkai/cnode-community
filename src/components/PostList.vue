<script lang="tsx">
import { Component, Mixins } from "vue-property-decorator";
import { getTopicLists } from "@/api";
import { NavItem, TopicListItem } from "@/types/type";
import PostListItem from "@/components/PostListItem.vue";
import Loading from "@/components/Loading.vue";
import LoadingMixin from "@/mixins/LoadingMixin";
import Pagination from "@/components/Pagination.vue";

@Component({
  components: {
    Loading,
    PostListItem,
    Pagination
  }
})
export default class PostList extends Mixins(LoadingMixin) {
  $refs!: {
    loading: Loading;
  };

  protected render() {
    return (
      <div class="post-list-wrap">
        <nav class="tips-nav">
          <ul>
            {this.tabLists.map(item => {
              return (
                <li>
                  <a href={item.url}>{item.txt}</a>
                </li>
              );
            })}
          </ul>
        </nav>
        <div class="post-list">
          <loading
            ref="loading"
            onChangeLoadingStatus={this.changeLoadingStatus}
          />
          <ul class="lists" v-show={!this.isLoading}>
            {this.topicLists.map(item => {
              return <post-list-item topicDetail={item} />;
            })}
          </ul>
        </div>
        <pagination onPageHandler={this.pageHandler} />
      </div>
    );
  }

  private topicLists: Array<TopicListItem> = new Array<TopicListItem>();
  private currentPage = 1;
  private tabLists: Array<NavItem> = [
    {
      txt: "全部",
      url: "/"
    },
    {
      txt: "精华",
      url: "/"
    },
    {
      txt: "分享",
      url: "/"
    },
    {
      txt: "问答",
      url: "/"
    },
    {
      txt: "招聘",
      url: "/"
    }
  ];

  public mounted() {
    this.initData(1);
  }

  public async initData(page: number) {
    this.$refs.loading.showLoading();
    await getTopicLists({
      limit: 40,
      page
    }).then(response => {
      this.topicLists = [];
      response.map(item => {
        this.topicLists.push({
          id: item.id,
          avatarUrl: item.author.avatar_url,
          loginName: item.author.loginname,
          good: item.good,
          lastReplyAt: item["last_reply_at"],
          replyCount: item["reply_count"],
          tab: item.tab,
          title: item.title,
          top: item.top,
          visitCount: item.visit_count
        });
      });
      this.$refs.loading.closeLoading();
    });
  }

  public pageHandler(page: number) {
    if (page !== this.currentPage) {
      this.currentPage = page;
      this.initData(page);
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/style";

.post-list-wrap {
  @include widthLimit(1);
  flex-direction: column;
  margin: 15px auto;
  flex: 1;
  border-radius: 8px;

  .tips-nav {
    background: #eee;
    padding: 10px 5px;
    border-radius: 8px 8px 0 0;

    ul {
      display: flex;
      flex-direction: row;

      li {
        margin: 0 15px;

        a {
          color: #80bd01;
        }
      }
    }
  }

  .post-list {
    @include contentWidth;
    justify-content: center;
    background: #fff;
    margin-bottom: 15px;

    ul.lists {
      width: 100%;
      div.topicItem:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
