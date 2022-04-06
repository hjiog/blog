(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{678:function(v,_,s){"use strict";s.r(_);var e=s(6),a=Object(e.a)({},(function(){var v=this,_=v.$createElement,s=v._self._c||_;return s("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[s("h3",{attrs:{id:"redis-使用总结"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#redis-使用总结"}},[v._v("#")]),v._v(" redis 使用总结")]),v._v(" "),s("h4",{attrs:{id:"一、字符串"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#一、字符串"}},[v._v("#")]),v._v(" 一、字符串")]),v._v(" "),s("p",[v._v("a) 缓存功能")]),v._v(" "),s("p",[v._v("​        典型使用场景：Redis作为缓存层，MySQL作为存储层，绝大部分请求的数据都是从Redis中获取，由于Redis具有支撑高并发的特性，所以缓存通常能起到加速读写和降低后端压力的作用。")]),v._v(" "),s("p",[v._v('​        开发提示：与MySQL等关系型数据库不同的是，Redis没有命令空间，而且也没有对键名有强制要求，但设计合理的键名，有利于防止键冲突和项目的可维护性，比较推荐的方式是使用“业务名:对象名🆔[属性]”作为键名。例如MySQL的数据库名为vs，用户表名为user，那么对应的键可以用"vs:user:1"，"vs:user:1:name"来表示，如果当前Redis只被一个业务使用，甚至可以去掉vs。如果键名比较长，例如"user:{uid}:friends:message:{mid}"，可以在能描述含义的前提下适当减少键的长度，例如采用缩写形式，从而减少由于键过长的内存浪费。')]),v._v(" "),s("p",[v._v("​    b) 计数")]),v._v(" "),s("p",[v._v("​        典型应用场景：视频播放数计数的基础组件，用户每播放一次视频，相应的视频播放数就会自增1。Redis可以实现快速计数、查询缓存的功能，同时数据可以异步落地到其他数据源。")]),v._v(" "),s("p",[v._v("​        开发提示：实际上一个真实的计数系统要考虑的问题会很多，防作弊、按照不同维度计数，数据持久化到底层数据源等。")]),v._v(" "),s("p",[v._v("​    c) 共享Session")]),v._v(" "),s("p",[v._v("​        典型应用场景：用户登陆信息，Redis将用户的Session进行集中管理，每次用户更新或查询登陆信息都直接从Redis中集中获取。")]),v._v(" "),s("p",[v._v("​    d) 限速")]),v._v(" "),s("p",[v._v("​        典型应用场景：验证码接口访问频率限制，用户登陆时需要让用户输入手机验证码，从而确定是否是用户本人，但是为了短信接口不被频繁访问，会限制用户每分钟获取验证码的频率，例如一分钟不能超过5次。")]),v._v(" "),s("h4",{attrs:{id:"二、哈希"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#二、哈希"}},[v._v("#")]),v._v(" 二、哈希")]),v._v(" "),s("p",[v._v("a) 缓存用户信息")]),v._v(" "),s("p",[v._v("​        相比于使用字符串序列化缓存用户信息，哈希类型变得更加直观，并且在更新操作上会更加便捷。可以将每个用户的id定义为键后缀，多对field-value对应每个用户的属性。")]),v._v(" "),s("p",[v._v("​        哈希类型和关系型数据库不同之处：")]),v._v(" "),s("p",[v._v("​              哈希类型是稀疏的，而关系型数据库是完全结构化的，例如哈希类型每个键可以有不同的field，而关系型数据库一旦添加新的列，所有行都要为其设置值(即使为NULL)。")]),v._v(" "),s("p",[v._v("​              关系型数据库可以做复杂的关系查询，而Redis去模拟关系型复杂查询开发困难，维护成本高。")]),v._v(" "),s("p",[v._v("​        三种缓存用户信息优缺点比较：")]),v._v(" "),s("p",[v._v("​              原生字符串类型：每个属性一个键")]),v._v(" "),s("p",[v._v("​                   优点：简单直观，每个属性都支持更新操作。")]),v._v(" "),s("p",[v._v("​                   缺点：占用过多的键，内存占用量较大，同时用户信息内聚性比较差，所以此种方案一般不会在生产环境使用。")]),v._v(" "),s("p",[v._v("​             序列化字符串类型：将用户信息序列化后用一个键保存。")]),v._v(" "),s("p",[v._v("​                  优点：简化编程，如果合理的使用序列化可以提高内存的使用效率。")]),v._v(" "),s("p",[v._v("​                  缺点：序列化和反序列化有一定的开销，同时每次更新属性都需要把全部数据取出进行反序列化，更新后再序列化到Redis中。")]),v._v(" "),s("p",[v._v("​             哈希类型：每个用户属性使用一对field-value，但是只用一个键保存。")]),v._v(" "),s("p",[v._v("​                  优点：简单直观，如果使用合理可以减少内存空间的使用。")]),v._v(" "),s("p",[v._v("​                  缺点：要控制哈希在ziplist和hashtable两种内部编码的转换，hashtable会消耗更多内存。")]),v._v(" "),s("h4",{attrs:{id:"三、列表"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#三、列表"}},[v._v("#")]),v._v(" 三、列表")]),v._v(" "),s("p",[v._v("a) 消息队列")]),v._v(" "),s("p",[v._v('​        Redis的lpush+brpop命令组合即可实现阻塞队列，生产者客户端使用lrpush从列表左侧插入元素，多个消费者客户端使用brpop命令阻塞式的"抢"列表尾部的元素，多个客户端保证了消费的负载均衡和高可用性。')]),v._v(" "),s("p",[v._v("​    b) 文章列表")]),v._v(" "),s("p",[v._v("​        每个用户有属于自己的文章列表，现在需要分页展示文章列表。此时可以考虑使用列表，因为列表不但是有序的，同时支持按照索引范围获取元素。")]),v._v(" "),s("p",[v._v("​    c) 开发提示")]),v._v(" "),s("p",[v._v("​        lpush + lpop = Stack(栈)")]),v._v(" "),s("p",[v._v("​        lpush + rpop = Queue(队列)")]),v._v(" "),s("p",[v._v("​        lpush + ltrim = Capped Collection(有限集合)")]),v._v(" "),s("p",[v._v("​        lpush + brpop = Message Queue(消息队列)")]),v._v(" "),s("h4",{attrs:{id:"四、集合"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#四、集合"}},[v._v("#")]),v._v(" 四、集合")]),v._v(" "),s("p",[v._v("a) 标签(tag)")]),v._v(" "),s("p",[v._v("​        集合类型比较典型的使用场景是标签(tag)，例如一个用户可能对娱乐、体育比较感兴趣，另一个用户可能对历史、新闻比较感兴趣，这些兴趣就是标签。 开发提示：用户和标签的关系维护应该在一个事物执行，防止部分命令失败造成的数据不一致。")]),v._v(" "),s("h4",{attrs:{id:"五、有序集合"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#五、有序集合"}},[v._v("#")]),v._v(" 五、有序集合")]),v._v(" "),s("p",[v._v("a) 排行榜系统")]),v._v(" "),s("p",[v._v("​        有序集合比较典型的使用场景就是排行榜系统，例如视频网站需要对用户上传的视频做排行榜，榜单的维度可能是多个方面的：按照时间、按照播放数量、按照获得的赞数。")])])}),[],!1,null,null,null);_.default=a.exports}}]);