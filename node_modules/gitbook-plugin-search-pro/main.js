'use strict';
var 
    
    fs = require('fs'),
    path = require('path'),
    
    _ = require('lodash'),
    nodejieba = require('nodejieba'),

    
    /**
     * 所有配置
     */
    config,
    /**
     * 插件配置
     * @type object
     */
    pluginConfig,
    /**
     * 页面索引容器
     * @type object
     */
    pageId = 1,
    pageIndex = {},
    /**
     * 搜索词索引map容器
     * @type object
     */
    searchIndexMap = {}
    ;


module.exports = {
    
    website: {
        assets: './assets',
        js: [
            'search-pro.js'
        ],
        css: [
            'search-pro.css'
        ]
    },
    
    hooks: {
        
        "init" : function(){
            
            config = this.options;
            
            pluginConfig = this.options.pluginsConfig['search-pro'];
            
            // 导入book.json里面插件配置中的自定义词典
            // nodejieba.insertWord("word1","word2",....);
            
            nodejieba.insertWord.apply(this,pluginConfig.defineWord);
            
        },
        
        "page": function(page){
            
            // console.log(page);
            
            // 建立页面内容索引
            pageIndex[pageId] = {
                path : page.path.replace('.md','.html'),
                title : page.progress.current.title,
                level : page.progress.current.level
            }
            
            // 分词
            var words = _.uniq( nodejieba.cut(page.content) );
            
            // 去重
            _(words).forEach(function(word) {
                
                // 不索引1个字的词
                //if(word.length > 1){
                    
                    // 转为大写
                    word = word.toUpperCase();
                    
                    // 如果没有这个词的索引空间
                    if(!searchIndexMap[word]) {
                        searchIndexMap[word] = [];
                    }
                    
                    // 搜索词容器推入
                    searchIndexMap[word].push(pageId);
                
                //}
                
            }).value();
            
            // pageId 自增长
            pageId++;
            
            // 返回page对象
            return page;
            
        },
        
        "finish": function() {
            
            // 最终写入索引数据
            fs.writeFileSync(path.join(config.output , './search_pro_index.json'), 
                JSON.stringify(
                    {
                        pageIndex : pageIndex,
                        searchIndexMap : searchIndexMap
                    }
                )
            );
            
        }
    }
};