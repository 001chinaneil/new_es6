if($('#active-box').length >0){
    var url = '/active/group',active_list = [];
    $.ajax({
        type: 'post',
        url: url,
        data: [],
        dataType: 'json',
        async: true,
        success: function(data){
            if(data.result == 1){
                var first_option = '',second_option = '';
                active_list = data.data;
                $.each(data.data,function(index,sel){
                    first_option += '<option value="'+ sel.group_id +'" data-index="'+ index +'">'+ sel.title +'</option>';
                });
                $('#first_level').append(first_option);
                if(!!$('#group_id').val()){
                    $('#first_level').val($('#group_id').val());
                    $('#first_level').trigger('change');
                }
            }else{
                Messenger().post({
                    message:data.msg,
                    type: 'error',
                    showCloseButton: true
                });
            }
        }
    });
    $('body').on('change','#first_level',function(){
        var val = $(this).children('option:selected').val();
        $.each(active_list,function(index,act){
            if(act.group_id == val){
                if(!!act.history_activities){
                    var html = '';
                    $('#second_level').empty().addClass('hide');
                    $.each(act.history_activities,function(index,his){
                        html += '<option value="'+ his.hid +'">'+ his.period_name +'</option>'
                    });
                    $('#second_level').append(html).removeClass('hide');
                    if(!!$('#activity_id').val()){
                        $('#second_level').val($('#activity_id').val());
                    }
                }else{
                    $('#second_level').empty().addClass('hide');
                }
            }
        });
    });
}

//切换选择开启赞赏的按钮
//总开关是关闭，这里默认是关闭(未打钩)；总开关是开启，这里默认是开启(打钩)
//只有在这里是关闭状态，想打开赞赏才检查总开关

$(document).on('click','.js-close-reward',function(e){
    var value = $("input[name='is_open_reward']").val();
    if(value==1){  //选中开启赞赏
        value = 0;
        $("input[name='is_open_reward']").val(value).prop("checked",false);
    }else{ //要去开启赞赏
        e.preventDefault();
        $.ajax({
            url:'/reward/checkIsOpenReward',
            dataType:'json',
            success:function(res){
                if(res.success){
                    if(res.data.is_open_reward == 1){ //用户如果已经开启了赞赏的功能，那么赞赏功能正常开启
                        value = 1;
                        $("input[name='is_open_reward']").prop("checked",true);
                    }else{ //如果用户没有开启赞赏功能，那么提示用户去开启，并且按钮只能是不选中的状态
                        $("input[name='is_open_reward']").prop("checked",false);
                        Messenger().post({
                            message: "您的账号已关闭赞赏功能，请到个人中心打开，再设置本文赞赏",type: 'error',hideAfter: 3,showCloseButton: true
                        });
                        value = 0;
                    }
                    $("input[name='is_open_reward']").val(res.data.is_open_reward);
                }
            }
        });
    }
});

//初始化选中框的value值
function initReward(){
    var value = $("input[name='is_open_reward']").prop("checked")?1:0;
    $("input[name='is_open_reward']").val(value);
}
initReward();

//正常发布确认函数
function normalPulishSure(){
    var dateline = $('#dateline').val()
        , title = $('#title').val();

    if(!dateline){
        var now = new Date();
        dateline = now.getFullYear()+'-'+(now.getMonth()+1)+'-'+now.getDate()+' '+now.getHours()+':'+now.getMinutes();
    }

    var address = $('.js-article-tag-ul li.active span').html() || '圆桌';
    var strHtml = '<div class="control-group">' +
        '<label for="articleLink" class="control-label">文章标题：</label>' +
        '<div class="controls">'+title+'</div>' +
        '</div>'+
        '<div class="control-group">' +
        '<label for="articleLink" class="control-label">发布时间：</label>' +
        '<div class="controls">'+dateline+'</div>' +
        '</div>',
        btnOk = '<button class="btn btn-success btn-article-publish-confirm">确定</button>';
    dialogBox('publishModal', '确定发布?', strHtml, btnOk);
}

//发布文章的检查置顶
$(document).delegate('.btn-article-publish', 'click', function(){
    normalPulishSure();
});

$('body').on('click','.btn-article-ignore',function(){
    $(this).addClass('hide');
    $('.btn-article-publish-confirm').removeClass('hide');
    $('#error_html').addClass('hide');
    $('#e_strHtml').removeClass('hide');
});

$(document).on('click', '.btn-article-publish-confirm', function(){
    var t = $(this);
    /**
     * source_status = 1 表示目前是转载站外的文章;
     */

    if(source_status == 1){
        if($('#review').val().length == 0 ||$('#review').val() == ''){
            Messenger().post({
                message: "点评不能为空!",type: 'error',hideAfter: 3,showCloseButton: true
            });
        } else if ($('#review').val().length < 20) {
            Messenger().post({
                message: "点评最少20字!",type: 'error',hideAfter: 3,showCloseButton: true
            });
        }else{
            t.addClass('noReturn');
            add_article(0);
        }
    }else{
        t.addClass('noReturn');
        add_article(0);
    }
});

//存草稿
$(document).delegate('.btn-article-save-draft', 'click', function(){
    $(this).addClass('noReturn');
    add_article(6);
});
if($('.js-editor').length>0){
    $(document).ready( function(){
        setTimeout(function(){
            if(UE.getEditor('myEditor').execCommand('getlocaldata')!=''){
                UE.getEditor('myEditor').setContent(UE.getEditor('myEditor').execCommand( "getlocaldata" ));
            }
        },500)
    });
    window.onbeforeunload = function(event){
        if($('.js-submit-huknows').hasClass('noReturn') || $('.btn-article-publish-confirm').hasClass('noReturn')||$('.btn-article-save-draft').hasClass('noReturn')||$('#article_save_confirm').hasClass('noReturn')||$('.btn-article-save-confirm').hasClass('noReturn')||$('#article_check_save').hasClass('noReturn')||$('#article_ignore_save').hasClass('noReturn')||$('#article_author_appeal_save').hasClass('noReturn')||$('#article_final_check_save').hasClass('noReturn')||$('#article_delete_save').hasClass('noReturn')||$('#article_draft_save').hasClass('noReturn')){
        }else{
            event = event || window.event;
            event.returnValue = ' ';
        }
    };
}
//写文章发布
function add_article(status){

    if($('#official-notes').length > 0){
        //official-notes 表示这个是一片官方笔记
        var data = get_article_notes_data();
    }else{

        var data = get_article_data();
    }
    if(data['authorid']=='' || data['authorid']==0){
        Messenger().post({
            message:"选择一个作者吧,不然不能发布",
            hideAfter: 5,
            type: 'error',
            hideOnNavigate: true
        });
        return false;
    }
    data.status = status;
    var confirmMsg = '';
    if($('.js-article-tag-ul li.active').attr('data-type') == 'article'){
        if(data.channel.length == 0 && data.collection.length == 0 && data.sponsor.length == 0){
            confirmMsg = '确定不选择任何分类吗?';
        }
    }else if($('.js-article-tag-ul li.active').attr('data-type') == 'sponsor'){
        if(data.sponsor.length == 0){
            confirmMsg = '确定不选择赞助类型吗?';
        }
    }
    // data.is_open_reward = $("input[name='is_open_reward']").length!==0?$("input[name='is_open_reward']").val():1;
    // data.reward_guide = $("#rewardText").length!==0?$("#rewardText").val()||'别打CALL，打钱':'';
    var postAddAction = function(){
        $.ajax({
            type: 'post',
            url: '/article/article_add_action',
            data: data,
            dataType: 'json',
            async: true,
            success: after_article_add_action
        });
    };

    if(confirmMsg){
        if(confirm(confirmMsg)){
            /*
             * 如果选择早晚报 关键词和简介不能为空 的提示
             * */
            if($('#column_type').length>0){
                if($('#column_type').val() === 'column'){
                    if($('#column_keyword').val() === '' || $('#column_summary').val() === ''){
                        Messenger().post({
                            message:'关键词和简介不能为空',
                            hideAfter: 3,
                            type: 'error',
                            hideOnNavigate: true
                        });
                        return;
                    }
                }
            }
            if($('#review').length!==0 && $('#review').val().length < 20){
                alert('点评语必须在20～200字以内');
                return;
            }
            postAddAction();
        }
    }else{
        /*
         * 如果选择早晚报 关键词和简介不能为空 的提示
         * */
        if($('#column_type').length>0){
            if($('#column_type').val() === 'column'){
                if($('#column_keyword').val() === '' || $('#column_summary').val() === ''){
                    Messenger().post({
                        message:'关键词和简介不能为空',
                        hideAfter: 3,
                        type: 'error',
                        hideOnNavigate: true
                    });
                    return;
                }
            }
        }
        postAddAction();
    }

}

//文章编辑前检查
$(document).delegate('.article-edit', 'click', function(){
    var t = $(this);
    var aid = $(this).attr('aid');
    var post_data = {'aid':aid};
    var status = $(this).attr('status');
    $.post('/article/article_get',{'huxiu_hash_code':huxiu_hash_code,'aid':aid},function(data){
        data = eval('('+ data +')');

        if(data.result == 1){
            if(data.data.status == status){
                $.ajax({
                    type: 'post',
                    url: '/article/article_edit_check',
                    data: post_data,
                    dataType: 'json',
                    async: true,
                    success: function(data){
                        if(data.result == 1)
                        {
                            var parameter = '';
                            if(t.attr('is_video_article') == '1'){
                                parameter = '?article_type=video';
                            }
                            location.href = '/article/edit/' + aid + parameter;
                        }else{
                            article_modal('article_edit_confirm', aid, data.msg + '<br>您确定要编辑吗?');
                        }
                    }
                })
            }else{
                if(data.data.status == 0){
                    Messenger().post({
                        message:'该文章已发布',
                        hideAfter: 3,
                        type: 'error',
                        hideOnNavigate: true
                    });
                }else if(data.data.status == 1){
                    Messenger().post({
                        message:'该文章正在审核中',
                        hideAfter: 3,
                        type: 'error',
                        hideOnNavigate: true
                    });
                }else if(data.data.status == 2){
                    Messenger().post({
                        message:'该文章已被忽略',
                        hideAfter: 3,
                        type: 'error',
                        hideOnNavigate: true
                    });
                }else if(data.data.status == 3){
                    Messenger().post({
                        message:'该文章作者正在申诉',
                        hideAfter: 3,
                        type: 'error',
                        hideOnNavigate: true
                    });
                }else if(data.data.status == 4){
                    Messenger().post({
                        message:'该文章已终审',
                        hideAfter: 3,
                        type: 'error',
                        hideOnNavigate: true
                    });
                }else if(data.data.status == 5){
                    Messenger().post({
                        message:'该文章已删除',
                        hideAfter: 3,
                        type: 'error',
                        hideOnNavigate: true
                    });
                }else if(data.data.status == 6){
                    Messenger().post({
                        message:'该文章在草稿箱',
                        hideAfter: 3,
                        type: 'error',
                        hideOnNavigate: true
                    });
                }

                location.reload();
            }
        }
    });
});
//关于文章编辑前检查
$(document).delegate('.about-edit', 'click', function(){
    var aid = $(this).attr('aid');
    var post_data = {'aid':aid};
    var status = $(this).attr('status');
    $.post('/article/article_get',{'huxiu_hash_code':huxiu_hash_code,'aid':aid},function(data){
        data = eval('('+ data +')');

        if(data.result == 1){
            if(data.data.status == status){
                $.ajax({
                    type: 'post',
                    url: '/article/article_edit_check',
                    data: post_data,
                    dataType: 'json',
                    async: true,
                    success: function(data){
                        if(data.result == 1)
                        {
                            location.href = '/about/edit/' + aid;
                        }else{
                            article_modal('about_edit_confirm', aid, data.msg + '<br>您确定要编辑吗?');
                        }
                    }
                })
            }else{
                if(data.data.status == 0){
                    Messenger().post({
                        message:'该文章已发布',
                        hideAfter: 3,
                        type: 'error',
                        hideOnNavigate: true
                    });
                }else if(data.data.status == 1){
                    Messenger().post({
                        message:'该文章正在审核中',
                        hideAfter: 3,
                        type: 'error',
                        hideOnNavigate: true
                    });
                }else if(data.data.status == 2){
                    Messenger().post({
                        message:'该文章已被忽略',
                        hideAfter: 3,
                        type: 'error',
                        hideOnNavigate: true
                    });
                }else if(data.data.status == 3){
                    Messenger().post({
                        message:'该文章作者正在申诉',
                        hideAfter: 3,
                        type: 'error',
                        hideOnNavigate: true
                    });
                }else if(data.data.status == 4){
                    Messenger().post({
                        message:'该文章已终审',
                        hideAfter: 3,
                        type: 'error',
                        hideOnNavigate: true
                    });
                }else if(data.data.status == 5){
                    Messenger().post({
                        message:'该文章已删除',
                        hideAfter: 3,
                        type: 'error',
                        hideOnNavigate: true
                    });
                }else if(data.data.status == 6){
                    Messenger().post({
                        message:'该文章在草稿箱',
                        hideAfter: 3,
                        type: 'error',
                        hideOnNavigate: true
                    });
                }

                location.reload();
            }
        }
    });
});
//文章编辑确认
$(document).delegate('#article_edit_confirm', 'click', function(){
    var aid = $(this).attr('typeid');
    location.href = '/article/edit/' + aid;
});
//关于文章编辑确认
$(document).delegate('#about_edit_confirm', 'click', function(){
    var aid = $(this).attr('typeid');
    location.href = '/about/edit/' + aid;
});
//编辑后确定保存
$(document).delegate('#article_save_confirm', 'click', function(){
    $(this).addClass('noReturn');
    var status = $(this).attr('status');
    article_edit_save(status);
});
//关于编辑后确定保存
$(document).delegate('#about_save_confirm', 'click', function(){
    $(this).addClass('noReturn');
    about_article_edit_save();
});


/**
 * 判断文章中是否存在在第三方的图片有的话添加提示,提醒编辑手动替换
 * @returns {{flag: boolean, num: number}}
 */
var hasExternalPic = function(){
    var piArr = {
        flag : false,
        num : 0
    };
    var root = UE.htmlparser(UE.getEditor('myEditor').getContent(), true),
        arrNodeTmp = root.getNodesByTagName('img');
    for(var i=0; i<arrNodeTmp.length; i++){
        if(arrNodeTmp[i].attrs.src){
            if(arrNodeTmp[i].attrs.src.indexOf('img.huxiucdn.com') == -1 && arrNodeTmp[i].attrs.src.indexOf('images.bipush.com') == -1 && arrNodeTmp[i].attrs.src.indexOf('images.huxiu.com') == -1 && arrNodeTmp[i].attrs.src.indexOf('imgs.bipush.com') == -1 && arrNodeTmp[i].attrs.src.indexOf('img-proxy.huxiu.com') == -1){
                piArr.flag = true;
                piArr.num += 1;
            }
        }
    }
    return piArr;
};

//正常文章保存 草稿保存发布
$(document).delegate('#article_check_save_pub, #article_draft_save_pub', 'click', function(){
    var date = $('#dateline').val(),
        title = $('#title').val();
    if(date) {
        var dateline = parseInt(new Date(date.replace(/-/g, "/")).getTime() / 1000);

        var timestamp = Math.round(new Date().getTime() / 1000);
        if (dateline < timestamp) {
            dateline = timestamp;
        }
    }
    else{
        var dateline = parseInt(new Date().getTime() / 1000);
    }

    var now = new Date(parseInt(dateline) * 1000);
    var fdateline = now.getFullYear()+'-'+(now.getMonth()+1)+'-'+now.getDate()+' '+now.getHours()+':'+now.getMinutes();

    $('#dateline').val(fdateline);

    var strHtml = '<div class="control-group">' +
        '<label for="articleLink" class="control-label">文章标题：</label>' +
        '<div class="controls">'+title+'</div>' +
        '</div>'+
        '<div class="control-group">' +
        '<label for="articleLink" class="control-label">发布时间：</label>' +
        '<div class="controls">'+fdateline+'</div>' +
        '</div>'
        , btnOk = '<button class="btn btn-success btn-article-save-confirm">确定</button>'
    dialogBox('publishModal', '发布', strHtml, btnOk);

});

//关于类文章保存
$(document).delegate('#about_article_save', 'click', function(){
    var title = $('#title').val();

    var strHtml = '<div class="control-group">' +
        '<label for="articleLink" class="control-label">文章标题：</label>' +
        '<div class="controls">'+title+'</div>' +
        '</div>'
        , btnOk = '<button class="btn btn-success btn-about-article-save-confirm">确定</button>'
    dialogBox('publishModal', '发布', strHtml, btnOk);

});

//正常文章保存
$(document).delegate('#article_save', 'click', function(){
    var dateline = $('#dateline').val()
        , title = $('#title').val();

    if(!dateline){
        var now = new Date();
        dateline = now.getFullYear()+'-'+(now.getMonth()+1)+'-'+now.getDate()+' '+now.getHours()+':'+now.getMinutes();
    }
    var address = $('.js-article-tag-ul li.active span').html() || '圆桌';
    var strHtml = '<div class="control-group">' +
        '<label for="articleLink" class="control-label">文章标题：</label>' +
        '<div class="controls">'+title+'</div>' +
        '</div>'+
        '<div class="control-group">' +
        '<label for="articleLink" class="control-label">发布时间：</label>' +
        '<div class="controls">'+dateline+'</div>' +
        '</div>'
        , btnOk = '<button class="btn btn-success btn-article-save-confirm">确定</button>'
    dialogBox('publishModal', '发布', strHtml, btnOk);

});
$(document).delegate('.btn-article-save-confirm', 'click', function(){
    $(this).addClass('noReturn');
    edit_article(0, $(this));
});
$(document).delegate('.btn-about-article-save-confirm', 'click', function(){
    $(this).addClass('noReturn');
    edit_about_article(0, $(this));
});
//待审核文章保存
$(document).delegate('#article_check_save', 'click', function(){
    $(this).addClass('noReturn');
    edit_article(1, $(this));
});
//已忽略文章保存
$(document).delegate('#article_ignore_save', 'click', function(){
    $(this).addClass('noReturn');
    edit_article(2, $(this));
});
//作者申诉文章保存
$(document).delegate('#article_author_appeal_save', 'click', function(){
    $(this).addClass('noReturn');
    edit_article(3, $(this));
});
//终审文章保存
$(document).delegate('#article_final_check_save', 'click', function(){
    $(this).addClass('noReturn');
    edit_article(4, $(this));
});
//回收站文章保存
$(document).delegate('#article_delete_save', 'click', function(){
    $(this).addClass('noReturn');
    edit_article(5, $(this));
});
//草稿保存
$(document).delegate('#article_draft_save', 'click', function(){
    $(this).addClass('noReturn');
    edit_article(6, $(this));
});

function edit_article(status, btn){
    if(!btn.hasClass('disabled')){
        btn.addClass('disabled');
//        btn.parents('.modal').find('.modal-body').prepend('<div class="alert alert-info">正在提交数据，请稍候...</div>')
        var data = {'aid':aid};
        $.ajax({
            type: 'post',
            url: '/article/article_edit_save_check',
            data: data,
            dataType: 'json',
            async: true,
            success: function(data){
                if(data.result == 1){
                    article_edit_save(status);
                }else{
                    article_modal('article_save_confirm', aid, data.msg + '<br>您确定要保存吗?', status);
                }
                btn.removeClass('disabled');
            }
        });
    }

}

function edit_about_article(status, btn){
    if(!btn.hasClass('disabled')){
        btn.addClass('disabled');
//        btn.parents('.modal').find('.modal-body').prepend('<div class="alert alert-info">正在提交数据，请稍候...</div>')
        var data = {'aid':aid};
        $.ajax({
            type: 'post',
            url: '/article/article_edit_save_check',
            data: data,
            dataType: 'json',
            async: true,
            success: function(data){
                console.log(data);
                if(data.result == 1){
                    about_article_edit_save(status);
                }else{
                    article_modal('about_save_confirm', aid, data.msg + '<br>您确定要保存吗?');
                }
                btn.removeClass('disabled');
            }
        });
    }

}

function get_about_article_data(){
    var type = $('.js-article-tag-ul li.active').attr('data-type');
    var authorid = -1;
    if($('.js-author-box').length > 0){
        var oInputRadio = $('.js-author-box .box-info-wrap input[type=\'radio\']:checked');
        authorid = oInputRadio.val();
        if(authorid == -1){
            authorid= $('#article_authour').val();
        }

        if(authorid == -2){
            authorid = $('#source').val();

        }
    }
    var title = $('#title').val();
    var subtitle = $('#subtitle').val();
    var list_title = $('#list_title').val();
    var digest = $('#digest'),
        summary = digest.val()
    ;
    if(summary == digest.attr('placeholder')){
        summary = '';
    }
    var content = $('#myEditor').val();

    var source = $('#source').val(),
        source_url = $('#source_url').val();

    //标签
    var tags = $('#article_tags').val();

    //相关文章aid
    var related_articles = new Array;
    $.each($('.related-list li'),function(i){
        related_articles[i]= $(this).attr('aid')
    });

    var dateline = $('#dateline').val();

    //是否可以评论
    var allow_comment = $('#disallow_comment').hasClass('active')?0:1;


    var channel = [],
        channel_ids = $('.js-article-channel-ul li.active'),
        collection = [],
        collection_ids = $('.js-commonColumn-option').next(".commonColumnBox").find("li.active span"),
        sponsor = [],
        sponsor_ids = $('.js-article-sponsor-ul li.active');

    $.each(channel_ids,function(index){
        var t2 = $(this);
        channel[index] = t2.attr('catid');
    });
    $.each(collection_ids,function(index){
        var t3 = $(this);
        collection[index] = t3.attr('data-collection_id');
    });
    $.each(sponsor_ids,function(index){
        var t4 = $(this);
        sponsor[index] = t4.attr('catid');
    });


    var data;

    data = {
        'article_type':type,
        'authorid':authorid,
        'title':title,'subtitle':subtitle,'list_title':list_title,
        'summary':summary,'content':content,
        'source':source,'source_url':source_url,
        'pic':pic_url,
        'pic1':pic1_url,
        'list_pic':list_pic_url,
        'tags':tags,'related_articles':related_articles,
        'pic_attach_id':pic_attach_id,'list_pic_attach_id':list_pic_attach_id,
        'dateline':dateline,'allow_comment':allow_comment,'status':status,
        'channel':channel,
        'collection':collection,
        'sponsor':sponsor,
        'special':[],
        'outline':!!$('#outline').prop('checked') ? 1 : 0
    };

    if($('.js-special-id').length > 0) {
        data.special = $('.js-special-id').attr('data-id').split(',');
    }

    return data;
}
/**
 *  获取 普通文章
 * @returns {{article_type: jQuery, authorid: number, title: jQuery, subtitle: jQuery, list_title: jQuery, summary, content, source: jQuery, source_url: jQuery, pic, pic1, list_pic, tags: jQuery, related_articles: Array, cids: jQuery, pic_attach_id, list_pic_attach_id, dateline: jQuery, allow_comment: number, status: string, activity_id: jQuery, reprinted_status: *, share_pic: *, novip_summary: jQuery, report_tag: jQuery, is_free: jQuery, channel: Array, collection: Array, sponsor: Array, special: Array, video_id, is_video: *}|*}
 */
function get_article_data(){
    var type = $('.js-article-tag-ul li.active').attr('data-type');
    var authorid = -1;
    if($('.js-author-box').length > 0){
        var oInputRadio = $('.js-author-box .box-info-wrap input[type=\'radio\']:checked');
        authorid = oInputRadio.val();
        if(authorid == -1){
            authorid= $('#article_authour').val();
        }

        if(authorid == -2){
            authorid = $('#source').val();

        }
    }
    var title = $('#title').val();
    var subtitle = $('#subtitle').val();
    var list_title = $('#list_title').val();
    var digest = $('#digest'),
        summary = digest.val();

    if(summary == digest.attr('placeholder')){
        summary = '';
    }
    var content = UE.getEditor('myEditor').getContent();

    var source = $('#source').val(),
        source_url = $('#source_url').val();

    //标签
    var tags = $('#article_tags').val();

    //相关文章aid
    var related_articles = new Array;
    $.each($('.related-list li'),function(i){
        related_articles[i]= $(this).attr('aid')
    });

    var dateline = $('#dateline').val();

    //是否可以评论
    var allow_comment = $('#disallow_comment').hasClass('active')?0:1;

    //活动id
    var activity_id = $('#second_level').val();

    //外部转载状态
    var reprinted_status;
    if ($('#reprinted').attr('checked')) {
        reprinted_status = 1;
    }else{
        reprinted_status = 0;
    }
    var data;

    var channel = [],
        channel_ids = $('.js-article-channel-ul li.active'),
        collection = [],
        collection_ids = $('.js-commonColumn-option').next(".commonColumnBox").find("li.active span"),
        sponsor = [],
        sponsor_ids = $('.js-article-sponsor-ul li.active');

    $.each(channel_ids,function(index){
        var t2 = $(this);
        channel[index] = t2.attr('catid');
    });
    $.each(collection_ids,function(index){
        var t3 = $(this);
        collection[index] = t3.attr('data-collection_id');
    });
    $.each(sponsor_ids,function(index){
        var t4 = $(this);
        sponsor[index] = t4.attr('catid');
    });
    var is_video = GetQueryString('article_type');
    is_video = is_video == 'video' ? 1 : 0;

    data = {
        'article_type':type,
        'authorid':authorid,
        'title':title,'subtitle':subtitle,'list_title':list_title,
        'summary':summary,'content':content,
        'source':source,
        'source_url':source_url,
        'pic':pic_url,
        'pic1':pic1_url,
        'list_pic':list_pic_url,
        'tags':tags,
        'related_articles':related_articles,
        'pic_attach_id':pic_attach_id,
        'list_pic_attach_id':list_pic_attach_id,
        'dateline':dateline,
        'allow_comment':allow_comment,
        'status':status,activity_id:activity_id,
        'reprinted_status':reprinted_status,
        'share_pic':$('.article-share-pic img').attr('src') == 'https://img.huxiucdn.com/article/cover/201703/11/175600370063.png'? '' : $('.article-share-pic img').attr('src'),
        'novip_summary':$('#novip_summary').val(),
        'channel':channel,
        'collection':collection,
        'sponsor':sponsor,
        'special':[],
        'video_id':video_id,
        'is_video':is_video,
        'outline':!!$('#outline').prop('checked') ? 1 : 0,
        'is_index_show':!!$('#is_index_show').prop('checked') ? 1 : 0,
        'is_baidu_original':!!$('#is_baidu_original').prop('checked') ? 1 : 0,
        //资讯改版 写文章获取特殊专栏、通用专栏标志
        'column_type': $("#column_type").val(),
        'column_id': $("#column_id").val(),
        'column_keyword': $("#column_keyword").val(),
        'column_summary': $("#column_summary").val(),
        'vip_column_id': $("#vip_column_id").val(), //20171117 会员内容管理 添加入口 所需栏目ID
        'is_free' : 0
    };

    //如果音频文章且音频链接不为空 则发送音频链接 201801111635
    var t_audio_url = $("#audio_url").val();
    if($("#audio_url").length > 0 && t_audio_url !==""){
        data["audio_path"] = t_audio_url;
    }

    //若赞赏语为空，则设为默认语
    if($("#rewardText").length>0){
        if($("#rewardText").val() == ""){
            data.reward_guide = "别打CALL，打钱";
        }else{
            data.reward_guide = $("#rewardText").val();
        }

        //选中"开启赞赏"，发送0；否则发送1
        if($("#closeReward").prop('checked')){
            data.is_open_reward = 1;
        }else{
            data.is_open_reward = 0;
        }
    }

    if($('.js-special-id').length > 0) {
        data.special = $('.js-special-id').attr('data-id').split(',');
    }
    /**
     * 创新案例
     */
    if(type == 'report'){
        data.pdf_url = $('.pdf-url').val();
        data.report_type = 1;
        data.report_tag = $('#report_tag').val();
        data.cover = $('#active-pic').attr('src');
    }else if(type == 'weekly'){
        //会员周报
        data.report_type = 2;
        data.report_type = 2;
        data.weekly_type = $('input[name=weekly_type]:checked').val();
        data.weekly_start_time = $('#weekly_start_time').val();
        data.weekly_end_time = $('#weekly_end_time').val();
        data.report_tag = $('#weekly_tag').val();
    }else if(type == 'vip_column'){
        //会员周报
        data.report_type = 4;
    }
    /**
     * 抓取的文章保存
     */
    if(source_status == 1){
        data.source_status = source_status;
        data.review = $('#review').val();
        data.news_id = news_id;
        data.news_type = news_type;
    }

    return data;
}
/**
 *  获取 活动笔记文章
 * @returns {{article_type: jQuery, authorid: number, title: jQuery, subtitle: jQuery, list_title: jQuery, summary, content, source: jQuery, source_url: jQuery, pic, pic1, list_pic, tags: jQuery, related_articles: Array, cids: jQuery, pic_attach_id, list_pic_attach_id, dateline: jQuery, allow_comment: number, status: string, activity_id: jQuery, reprinted_status: *, share_pic: *, novip_summary: jQuery, report_tag: jQuery, is_free: jQuery, channel: Array, collection: Array, sponsor: Array, special: Array, video_id, is_video: *}|*}
 */
function get_article_notes_data(){

    var type = $('.js-article-tag-ul li.active').attr('data-type');
    var authorid = -1;
    if($('.js-author-box').length > 0){
        var oInputRadio = $('.js-author-box .box-info-wrap input[type=\'radio\']:checked');
        authorid = oInputRadio.val();
        if(authorid == -1){
            authorid= $('#article_authour').val();
        }
        if(authorid == -2){
            authorid = $('#source').val();
        }
    }
    var title = $('#title').val();
    var subtitle = $('#subtitle').val();
    var list_title = $('#list_title').val();
    var digest = $('#digest'),
        summary = digest.val();

    if(summary == digest.attr('placeholder')){
        summary = '';
    }
    var content = UE.getEditor('myEditor').getContent();

    var source = $('#source').val(),
        source_url = $('#source_url').val();

    //标签
    var tags = $('#article_tags').val();

    //相关文章aid
    var related_articles = new Array;
    $.each($('.related-list li'),function(i){
        related_articles[i]= $(this).attr('aid')
    });

    var dateline = $('#dateline').val();

    var data;

    data = {
        'authorid':authorid,
        'title':title,
        'subtitle':subtitle,
        'list_title':list_title,
        'summary':summary,
        'content':content,
        'source':source,
        'source_url':source_url,
        'pic':pic_url,
        'pic1':pic1_url,
        'list_pic':list_pic_url,
        'tags':tags,
        'related_articles':related_articles,
        'pic_attach_id':pic_attach_id,
        'list_pic_attach_id':list_pic_attach_id,
        'dateline':dateline,
        'status':status,
        'activity_id':$('#hid').val(),
        'share_pic':$('.article-share-pic img').attr('src') == 'https://img.huxiucdn.com/article/cover/201703/11/175600370063.png'? '' : $('.article-share-pic img').attr('src'),
        'novip_summary':$('#novip_summary').val(),
        'special':[],
        'report_type':3,//笔记  report_type 为3
        'vip_column_id': $("#vip_column_id").val() //20171117 会员内容管理 添加入口 所需栏目ID
    };

    //如果音频文章且音频链接不为空 则发送音频链接 201801111635
    var t_audio_url = $("#audio_url").val();
    if($("#audio_url").length > 0 && t_audio_url !==""){
        data["audio_path"] = t_audio_url;
    }

    //若赞赏语为空，则设为默认语
    if($("#rewardText").length>0){
        if($("#rewardText").val() == ""){
            data.reward_guide = "别打CALL，打钱";
        }else{
            data.reward_guide = $("#rewardText").val();
        }

        //选中"开启赞赏"，发送0；否则发送1
        if($("#closeReward").prop('checked')){
            data.is_open_reward = 1;
        }else{
            data.is_open_reward = 0;
        }
    }

    //选中"开启赞赏"，发送0；否则发送1
    if($("#closeReward").prop('checked')){
        data.is_open_reward = 1;
    }else{
        data.is_open_reward = 0;
    }

    return data;
}

//文章编辑后保存
function article_edit_save(status){
    if($('#official-notes').length > 0){
        //official-notes 表示这个是一片官方笔记
        var data = get_article_notes_data();
    }else{
        var data = get_article_data();
    }
    data.status = status;
    data.aid = aid

    var confirmMsg = '';
    if($('.js-article-tag-ul li.active').attr('data-type') == 'article'){
        if(data.channel.length == 0 && data.collection.length == 0 && data.sponsor.length == 0){
            confirmMsg = '确定不选择任何分类吗？';
        }
    }else if($('.js-article-tag-ul li.active').attr('data-type') == 'sponsor'){
        if(data.sponsor.length == 0){
            confirmMsg = '确定不选择赞助类型吗';
        }
    }
    // data.is_open_reward = $("input[name='is_open_reward']").length!==0?$("input[name='is_open_reward']").val():1;
    // data.reward_guide = $("#rewardText").length!==0?$("#rewardText").val()||'别打CALL，打钱':'';

    var postEditAction = function(){
        $.ajax({
            type: 'post',
            url: '/article/article_edit_action',
            data: data,
            dataType: 'json',
            async: true,
            success: after_article_edit_action
        });
    };
    if(confirmMsg){
        if(confirm(confirmMsg)){
            /*
             * 如果选择早晚报 关键词和简介不能为空 的提示
             * */
            if($('#column_type').length>0){
                if($('#column_type').val() === 'column'){
                    if($('#column_keyword').val() === '' || $('#column_summary').val() === ''){
                        Messenger().post({
                            message:'关键词和简介不能为空',
                            hideAfter: 3,
                            type: 'success',
                            hideOnNavigate: true
                        });
                        return;
                    }
                }
            }
            postEditAction();
        }
    }else {
        /*
         * 如果选择早晚报 关键词和简介不能为空 的提示
         * */
        if($('#column_type').length>0){
            if($('#column_type').val() === 'column'){
                if($('#column_keyword').val() === '' || $('#column_summary').val() === ''){
                    Messenger().post({
                        message:'关键词和简介不能为空',
                        hideAfter: 3,
                        type: 'success',
                        hideOnNavigate: true
                    });
                    return;
                }
            }
        }
        postEditAction();
    }
}

//关于文章编辑后保存
function about_article_edit_save(status){
    var data = get_about_article_data();
    data.status = status;
    data.aid = aid;

    $.ajax({
        type: 'post',
        url: '/article/about_article_edit_action',
        data: data,
        dataType: 'json',
        async: true,
        success: after_about_article_edit_action
    });
}


function article_localStore(data){
    var article_list = [];
    article_list.push({
        id:data.aid,
        content : UE.getEditor('myEditor').getContent()
    });
    localStorage.setItem('article_list',JSON.stringify(article_list));
}
//文章添加请求后执行
function after_article_add_action(data){


    if(data.result == 1){
        //做本地存储,以防出现丢失的情况;
        article_localStore(data);
        if(data.status == 6) {
            location.href = "/article/edit/" + data['aid'];
        } else {
            location.href = "/article/push/" + data['aid'];//先注释
        }
    }else{
        Messenger().post({
            message: data.msg
            ,type: 'error'
            ,hideAfter: 3
            ,showCloseButton: true
        });
    }
    UE.getEditor('myEditor').execCommand('clearlocaldata');
    $(this).removeClass('disabled');
}

function after_article_edit_action(data){
    if(data.result == 1){
        //做本地存储,以防出现丢失的情况;
        article_localStore(data);
        if(data.status == 6){
            Messenger().post({
                message: "草稿保存成功"
                ,type: 'success'
                ,hideAfter: 3
                ,showCloseButton: true
            });
        } else {
            location.href = "/article/push/" + data['aid'];
        }
    }else{
        Messenger().post({
            message: data.msg
            ,type: 'error'
            ,hideAfter: 3
            ,showCloseButton: true
        });
    }
    UE.getEditor('myEditor').execCommand('clearlocaldata');
}

function after_about_article_edit_action(data){
    if(data.result == 1){
        location.href = "/about";
    }else{
        Messenger().post({
            message: data.msg
            ,type: 'error'
            ,hideAfter: 3
            ,showCloseButton: true
        });
    }
    UE.getEditor('myEditor').execCommand('clearlocaldata');
}

// 单条文章删除
$(document).delegate('.article-delete-confirm', 'click', function(){
    var t = $(this)
        ,aid = t.attr('aid')
        ,status = t.attr('status');

    $.post('/article/article_get',{'huxiu_hash_code':huxiu_hash_code,'aid':aid},function(data){
        data = eval('('+ data +')');
        // console.log(data);
        // console.log(status);
        // return false;
        if(data.result == 1){
            if(data.data.status == status){
                postTypeDelete(t,'aid', aid);
            }else{
                if(data.data.status == 0){
                    Messenger().post({
                        message:'该文章已发布',
                        hideAfter: 3,
                        type: 'error',
                        hideOnNavigate: true
                    });
                }else if(data.data.status == 1){
                    Messenger().post({
                        message:'该文章正在审核中',
                        hideAfter: 3,
                        type: 'error',
                        hideOnNavigate: true
                    });
                }else if(data.data.status == 2){
                    Messenger().post({
                        message:'该文章已被忽略',
                        hideAfter: 3,
                        type: 'error',
                        hideOnNavigate: true
                    });
                }else if(data.data.status == 3){
                    Messenger().post({
                        message:'该文章作者正在申诉',
                        hideAfter: 3,
                        type: 'error',
                        hideOnNavigate: true
                    });
                }else if(data.data.status == 4){
                    Messenger().post({
                        message:'该文章已终审',
                        hideAfter: 3,
                        type: 'error',
                        hideOnNavigate: true
                    });
                }else if(data.data.status == 5){
                    Messenger().post({
                        message:'该文章已删除',
                        hideAfter: 3,
                        type: 'error',
                        hideOnNavigate: true
                    });
                }else if(data.data.status == 6){
                    Messenger().post({
                        message:'该文章在草稿箱',
                        hideAfter: 3,
                        type: 'error',
                        hideOnNavigate: true
                    });
                }

                location.reload();
            }
        }
    });
});
// 单条评论,点评删除,审核文章评论;
$(document).delegate('.comment-del-comfirm-btn', 'click', function(){
    var t=$(this),
        pid = $(this).attr('pid'),
        typename = $('#typeName').val(),
        msg = t.attr('data-type');

    postTypeDelete(t,typename,pid,msg);
});

// 单条标签删除
$(document).delegate('.tag-del-btn', 'click', function(){
    var t=$(this)
        ,tag_id = $(this).attr('tag_id')
    ;
    postTypeDelete(t,'tag_id',tag_id)
});

/**
 * 删除多篇文章,评论点评按钮/活动嘉宾
 */
$(document).delegate('.all-del-btn', 'click', function(){
    var t = $(this),
        boxWrap = $('.active-list-box').eq(0);
    if(!t.hasClass('disabled')){
        var aid = new Array,
            pid = new Array,
            tag_id = new Array,
            guest_id = new Array,
            f_id = new Array;
        console.log(boxWrap.attr('data-fid'))
        if(typeof(boxWrap.attr('aid'))!='undefined'){ //批量删除文章
            $.each($('.active-list .ipt-checkbox:checked'),function(i){
                aid[i] = $(this).parents('.active-list-box').attr('aid');
            });
            postTypeDelete(t,'aid',aid);
        }else if(typeof(boxWrap.attr('pid'))!='undefined'){ //批量删除评论,点评, 文章,活动,创业,传言,热议
            $.each($('.active-list .ipt-checkbox:checked'),function(i){
                pid[i] = $(this).parents('.active-list-box').attr('pid');
            });

            var typename = $('#typeName').val();
            var msg = t.attr('data-type') == 'audit' ? 'audit' :'';
            postTypeDelete(t,typename,pid,msg);
        }else if(typeof(boxWrap.attr('tag_id'))!='undefined'){
            $.each($('.active-list .ipt-checkbox:checked'),function(i){
                tag_id[i] = $(this).parents('.active-list-box').attr('tag_id');
            });
            postTypeDelete(t,'tag_id',tag_id);
        }else if(typeof(boxWrap.attr('gid'))!='undefined'){
            $.each($('.active-list .ipt-checkbox:checked'),function(i){
                guest_id[i] = $(this).parents('.active-list-box').attr('gid');
            });
            postTypeDelete(t,'guest_id',guest_id);
        }else if(typeof(boxWrap.attr('data-fid'))!='undefined'){
            $.each($('.active-list .ipt-checkbox:checked'),function(i){
                f_id[i] = $(this).parents('.active-list-box').attr('data-fid');
            });
            postTypeDelete(t,'fid',f_id);
        }
    }
});

// 删除文章/评论/点评/标签，确认框
function postTypeDelete(t,type,typeid,msg_flag) {

    var msg = msg_flag == 'audit' ?'您确定要审核通过吗?':'您确定要删除吗?';

    var boxHtml =
        '<div class="modal-body">' +
        '<div>' +
        '<span class="text text-error"><span>'+
        msg +
        '</span></span>' +
        '</div>' +
        '</div>' +
        '<div class="modal-footer">' +
        '<button type_flag="'+ msg_flag +'" typename="'+type+'" pid="'+typeid+
        '" class="btn btn-success article-delete" data-dismiss="modal" aria-hidden="true">确定</button><button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>' +
        '</div>';
    htmlBox('pushModal','提示',boxHtml);
}

/**
 * 文章列表  ,文章(article{评论} , article_r {点评}),活动(active),创业(chuangye),传言(rumor),热议(topic)的评论,点评删除功能
 * pid ——> product_id
 */
$(document).delegate('.article-delete', 'click', function(){
    var t = $(this),
        url='',
        dataPost = {
            'huxiu_hash_code':huxiu_hash_code,
            'pid':t.attr('pid')
        },
        typename = t.attr('typename');

    if(typename=='aid'){
        dataPost.status = 5;
        dataPost.aid = t.attr('pid');
        url = '/article/article_change_status_action';
    }else if(typename=='article'){
        if(t.attr('type_flag') == 'audit'){ //文章评论审核
            url = '/comment/auditFromArticle';
        }else{
            url = '/comment/deleteFromArticle';
        }
    }else if(typename=='article_r'){
        if(t.attr('type_flag') == 'audit'){ //文章点评审核
            url = '/comment/auditFromArticleReply';
        }else{
            url = '/comment/deleteFromArticleReply';
        }
    }else if(typename=='tag_id'){

        dataPost.tag_id = t.attr('pid');
        url = '/tag/delete_action';
    }else if(typename=='rumor'){

        url = '/comment/deleteFromRumor';
    }else if(typename=='rumor_r'){

        url = '/comment/deleteFromRumorReply';
    }else if(typename=='topic'){

        dataPost.comment_id = t.attr('pid');
        url = '/topic/batchDeleteComment ';
    }else if(typename=='topic_r'){

        dataPost.reply_id = t.attr('pid');
        url = '/topic/batchDeleteReply  ';
    }else if(typename=='active'){

        url = '/comment/deleteFromActivity';
    }else if(typename=='active_r'){

        url = '/comment/deleteFromActivityReply';
    }else if(typename=='chuangye'){

        url = '/comment/deleteFromChuangYe';
    }else if(typename=='chuangye_r'){

        url = '/comment/deleteFromChuangYeReply';
    }else if(typename=='guest_id'){

        url = '/active/deleteGuest';
        dataPost.id = t.attr('pid').split(',')
    }
    else if(typename=='fid'){
        url = '/feedback/delete';
        dataPost.id = t.attr('pid').split(',')
    }

    $.ajax({
        type: 'post',
        url: url,
        data: dataPost,
        dataType: 'json',
        async: true,
        success: function(data){
            if(typename=='aid' || typename == 'tag_id' || typename == 'guest_id' || typename == 'fid'){
                //文章特殊处理
                if (data.result == 1) {
                    Messenger().post({
                        message: data.msg || "删除成功" ,type: 'success',showCloseButton: true
                    });
                    window.location.reload();
                } else {
                    Messenger().post({
                        message: data.msg ,type: 'error',showCloseButton: true
                    });
                }
            }else{
                if (data.success) {
                    Messenger().post({
                        message: data.data.msg ,type: 'success',showCloseButton: true
                    });
                    window.location.reload();
                } else {
                    Messenger().post({
                        message: data.error.msg ,type: 'error',showCloseButton: true
                    });
                }
            }

        }
    });
});

//选择签名图片后自动提交上传
$(function () {
    $("#cover_upload_pic").change(function () {
        $("#cover_upload_form").submit();
//        console.log($(window.frames["cover_upload_target"].document).text());
    })
});

$(function () {
    $("#cover_upload_pic2").change(function () {
        $("#cover_upload_form2").submit();
    });
});

/*
 批量/单个删除图说中的图片
 2014.919
 by zhaojinye
 */
$('.js-manage-article-photo-box').on('click', '.js-img-all-del, .js-img-del', function(){
    var btn = $(this),
        oParent = btn.parents('li'),
        oCheckbox,
        url = '/article/article_attachment_delete_action',
        attachid = [],
        param = {'huxiu_hash_code':huxiu_hash_code};

    //singel del
    if(btn.hasClass('js-img-del')){
        attachid.push(oParent.find('.item-m .item-m-img img').attr('attachid'));
        param['attachid'] = attachid;
        //pictel del
    }else if(btn.hasClass('js-img-all-del')){
        oParent = btn.parents('.js-manage-article-photo-box'),
            oCheckbox = oParent.find('ul li input[type="checkbox"]');
        var flag = false;//判断复选框被选

        $.each(oCheckbox, function(index, ele){
            var oLi = $(ele).parents('li');
            if($(ele).attr('checked') == 'checked'){
//                oLi.remove();
                flag = true;
                attachid.push(oLi.find('.item-m .item-m-img img').attr('attachid'));
            }
        });
        if(!flag){
            alert('请选择将要删除的数据！');
            return;
        }
        param['attachid'] = attachid;
    }

    $.post(url, param, function(data){
        data = eval('('+data+')');
        if(data.result == 1){
            if(btn.hasClass('js-img-del')){
                oParent.remove();
            }else if(btn.hasClass('js-img-all-del')){
                $.each(oCheckbox, function(index, ele){
                    var oLi = $(ele).parents('li');
                    if($(ele).attr('checked') == 'checked'){
                        oLi.remove();
                    }
                });
            }
        }else{
            alert(data.msg);
        }
    })

});


/*
 全选与单选按钮的选中动作
 2014.919
 by zhaojinye
 */
$('.js-manage-article-photo-box').on('click', 'input[type="checkbox"]', function(){
    var oCheckbox = $(this)
        , oParent = oCheckbox.parents('.js-manage-article-photo-box');
    //all check
    if(oCheckbox.attr('name') == 'all-check'){
        var checkValue = oCheckbox.attr('checked');
//        console.log('checked:'+checkValue)
        if(checkValue == 'checked'){
            oParent.find('input[type="checkbox"]').attr('checked', 'checked');
        }else{
            oParent.find('input[type="checkbox"]').removeAttr('checked');
        }

        // single check
    }else{
        var checkSingleValue = oCheckbox.attr('checked')
            , oCheckAll = oParent.find('input[name="all-check"]')
            , checkAllValue = oCheckAll.attr('checked');
        if(checkSingleValue == undefined && checkAllValue == 'checked'){
            oCheckAll.removeAttr('checked');
        }
    }

});
/**
 * 内容初始化
 * @param type
 */
var tagInit = function(type){

    if(type == "article" && !aid) {
        $('#is_index_show').prop("checked", true);
    }

    $('.manage-report-article-box').hide();
    $('.manage-general-article-box').hide();
    $('.manage-weekly-article-box').hide();
    $('.novip-summary-box').show();

    if(type == "report"){
        $('.manage-report-article-box').show();
        if (!aid) {
            $('#is_index_show').prop("checked", false);
        }
    }else if(type == "weekly"){
        $('.manage-weekly-article-box').show();
        if (!aid) {
            $('#is_index_show').prop("checked", false);
        }
    }else{

        if($('#vip_column_id').val() == 0){
            $('.manage-general-article-box').show();
            $('.novip-summary-box').hide();
        }

        if(type == 'sponsor'){
            $('.sponsor-article-box').show();
            if (!aid) {
                $('#is_index_show').prop("checked", false);
            }
        }else if(type == 'video'){
            $('.article-video-wrap').show();
            var activeType = $('.js-article-tag-ul li.active').attr('data-type');
            if(activeType == 'sponsor'){
                $('.sponsor-article-box').show();
            }else{
                $('.sponsor-article-box').hide();
            }
        }else{
            $('.sponsor-article-box').hide();
        }
    }
};
/**
 * 获取url 参数
 */
function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}
/*
 标签切换
 */
$(function(){
    var type = '';
    if(!!GetQueryString('article_type')){
        type = GetQueryString('article_type');
        if(type == 'video'){
            $('.article-video-wrap').show();
            $('#head-app-pic').hide();
            $('.js-pic-size').hide();
            $('.js-video-pic-size').show();
        }else{
            $('.js-article-tag-ul li').removeClass('active');
            var tag_li =$('.js-article-tag-ul li');
            $.each(tag_li,function(i,item){
                var t = $(this);
                if(t.attr('data-type') == type){
                    t.addClass('active');
                    return false;
                }
            });
        }
    }else{
        type = $('.js-article-tag-ul li.active').attr('data-type');
    }
    tagInit(type);
});
/**
 * 点击忽略按钮
 */




$(document).on('click', '.article-check-ignore', function(){
    var $t = $(this),
        dataType = $t.attr('data-type'),
        boxWrap = $('.active-list-box').eq(0),
        aid = '',
        status = $t.attr('status');//1

    if(dataType == 'all-ignore' && $t.attr('data-article-status') == status){
        //批量忽略
        if(!$t.hasClass('disabled')){
            var ignoreAid = new Array;

            if(typeof(boxWrap.attr('aid'))!='undefined') {
                $.each($('.active-list .ipt-checkbox:checked'), function (i) {
                    ignoreAid[i] = $(this).parents('.active-list-box').attr('aid');
                });
            }
        }
        aid = ignoreAid.join(',');
        ignore_reasons(aid);
    }else {
        aid = $t.attr('aid');
        $.post('/article/article_get',{'huxiu_hash_code':huxiu_hash_code,'aid':aid},function(data){
            data = eval('('+ data +')');
            if(data.result == 1){
                if(data.data.status == status){
                    ignore_reasons(aid);
                }else{
                    if(data.data.status == 0){
                        alert('该文章已发布');
                    }else if(data.data.status == 1){
                        alert('该文章正在审核中');
                    }else if(data.data.status == 2){
                        alert('该文章已被忽略');
                    }else if(data.data.status == 3){
                        alert('该文章作者正在申诉');
                    }else if(data.data.status == 4){
                        alert('该文章已终审');
                    }else if(data.data.status == 5){
                        alert('该文章已删除');
                    }else if(data.data.status == 6){
                        alert('该文章在草稿箱');
                    }

                    location.reload();
                }
            }
        });
    }
});

//审核文章列表 忽略弹窗
function ignore_reasons(aid){
    var url = '/article/article_reasons',
        post_data = {'huxiu_hash_code':huxiu_hash_code};

    $.post(url, post_data, function(data){
        data = eval('('+data+')');

        var html = '';
        for(i=0;i<data.data.length;i++){
            html+= '<label class="new-lb"><input id="'+ data.data[i].id +'" name="reason" value="'+ data.data[i].message +'" type="checkbox">'+ data.data[i].message +'</label>';
        }

        if(data.result == 1){
            var strHtml = '' +
                '<div class="clearfix">' +
                '<div class="pull-left">忽略理由如下:</div>' +
                '<div class="modal-manage pull-right"><a class="js-modal-manage" href="javascript:void(0);">管理</a></div>' +
                '</div>' +
                '<div class="reason-box js-reason-box">' + html + '<label class="new-lb"><textarea class="js-custom-reason" placeholder="您可在此输入自定义忽略理由"></textarea></label>' +
                '</div>' +
                '<div class="reason-edit-box js-reason-edit-box"></div>'
                , title = '忽略'
                , strBtn = '<button class="btn btn-success article-check-ignore-conform" aid='+ aid +' data-dismiss="modal" aria-hidden="true">确定</button>'
            ;
            dialogBox('ignoreModal',title, strHtml, strBtn);
        }
    });
}


//点击忽略对话框中的忽略按钮
$(document).on('click', '.article-check-ignore-conform', function(){
    var btn = $(this)
        , oParent = btn.parents('.modal')
        , oReasonBox = oParent.find('.js-reason-box')
        , iReason = oReasonBox.find('.js-custom-reason').val()
        , aid = $(this).attr('aid')
        , url = '/article/article_ignore_action'
        , param = {'huxiu_hash_code':huxiu_hash_code,'aid':aid}
        , reason = new Array
        , i = 0
    ;
    $.each(oReasonBox.find('.new-lb input[type="checkbox"]'), function(index, ele){
        var value = $(ele).val(),
            id = $(ele).attr('id');
        if($(ele).prop('checked')){
            reason[i] = {'id':id, 'message':value};
            i++;
        }
    });
    if(iReason != ''){
        reason[reason.length] = {'id':0, 'message':iReason};
    }
    param.reasons = reason;
    param.ismessage = !!$('#is-group-message').prop('checked') ? 1 : 0;

    $.post(url, param, function(data){
        var data = eval('('+data+')');
        if(data.success){
            location.reload();
        }else{
            alert(data.error.msg);
        }
    })
});

//点击管理按钮
$(document).on('click', '.js-modal-manage', function()  {
    var btn = $(this)
        , oParent = btn.parents('.modal')
        , oReasonBox = oParent.find('.js-reason-box')
        , oReasonEditBox = oParent.find('.js-reason-edit-box')
    ;
    $.each(oReasonBox.find('.new-lb input[type="checkbox"]'), function(index, ele){
        var strHtml = '<label class="new-lb"><span class="remove-article-reason">-</span><input id="'+ $(ele).attr('id') +'" name="reason" type="text" value="'+$(ele).val()+'" /></label>';
        oReasonEditBox.append(strHtml);
    });
    oReasonBox.css('display', 'none');
    btn.attr('class', 'js-btn-reason-add').html('添加');
    oParent.find('.article-check-ignore-conform').attr('class', 'btn btn-success js-btn-article-manage-ignore');

});

//点击删除按钮
$(document).on('click', '.js-reason-edit-box .new-lb span', function(){
    var btn = $(this)
        , iReasonBox = btn.parent().find('input[type="text"]')
        , url = '/article/article_reason_delete_action'
        , param = {'huxiu_hash_code':huxiu_hash_code, 'reason_id':iReasonBox.attr('id')};

    if(iReasonBox.attr('id')==undefined){
        iReasonBox.parent().remove();
        return;
    }
//    if(confirm('确定要删除该理由吗？')){
    $.post(url, param, function(data){
        data = eval('('+data+')');
        if(data.result == 1){
            btn.parent().remove();
        }else{
            alert(data.msg);
        }
    });
//    }



});

//点击添加按钮
$(document).on('click', '.js-btn-reason-add', function(){
    var btn = $(this)
        , oParent = btn.parents('.modal')
        , oReasonEditBox = oParent.find('.js-reason-edit-box')
    ;
    oReasonEditBox.prepend('<label class="new-lb"><span class="remove-article-reason">-</span><input name="reason" type="text" value="" /></label>');
    oReasonEditBox.find('.new-lb:first-child input').focus();
});

//点击管理忽略理由中确定按钮
$(document).on('click', '.js-btn-article-manage-ignore', function(){
    var btn = $(this)
        , oParent = btn.parents('.modal')
        , oReasonEditBox = oParent.find('.js-reason-edit-box')
        , urlModify = '/article/article_reason_edit_action'
        , urlAdd = '/article/article_reason_add_action'
        , paramAdd = {'huxiu_hash_code':huxiu_hash_code}
        , paramModify = {'huxiu_hash_code':huxiu_hash_code}
        , arrModify = []
        , arrAdd = []
    ;
    $.each(oReasonEditBox.find('.new-lb input[type="text"]'), function(index, ele){
        if($(ele).attr('id') == undefined){
            arrAdd.push($(ele).val());
        }else{
            var obj = {};
            obj.id = $(ele).attr('id');
            obj.message = $(ele).val();
            arrModify.push(obj);
        }
        paramAdd['reason'] = arrAdd;
        paramModify['reason'] = arrModify;

    });

    if(arrAdd.length > 0){
        $.post(urlAdd, paramAdd, function(data){
            var data = eval('('+data+')');
            if(data.result == 1){

            }else{
                alert(data.msg)
            }
        })
    }

    if(arrModify.length > 0){
        $.post(urlModify, paramModify, function(data){
            var data = eval('('+data+')');
            if(data.result == 1){

            }else{
                alert(data.msg)
            }
        })
    }


});
//此弹窗自定义：弹窗ID，弹窗标题，弹窗内容，弹窗"确认按钮"(仅是确认按钮)
function dialogBox(id, title, strBody, btnOk){
    var html = '<div id="'+id+'" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">' +
        '<div class="modal-header">' +
        '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">X</button>' +
        '<h4 id="myModalLabel">'+title+'</h4>' +
        '</div>' +
        '<div class="modal-body">'+strBody+'</div>' +
        '<div class="modal-footer">' + btnOk + '&nbsp;&nbsp;&nbsp;&nbsp;<button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>' + '</div>' +
        '</div>';
    if($('#' + id).length > 0){
        $('#' + id).remove();
    }
    $('body').append(html);
    $('#'+id+'').modal();
}

/**
 * 添加bootstrap-datetimepicker.js插件
 */
$('.js-prdt #go_time').datetimepicker({
    todayBtn: "linked",
    autoclose: true,
    format: 'yyyy-mm-dd',
    minView:2,
    endDate: new Date()

});

/***
 * 展开全文,收起  js动作
 */
if($('.js-search').length > 0){
    $('.js-search').on('click', '.js-more' , function(){
        var btn = $(this);
        var parent = btn.parents('.js-search');
        var boxCut = parent.find('.js-search-cut');
        var boxComplete = parent.find('.js-search-complete');
        if('展开全文' == btn.html()){
            boxCut.css('display', 'none');
            boxComplete.css('display', 'inline');
            btn.html('收起');
        }else if('收起' == btn.html()){
            boxCut.css('display', 'inline');
            boxComplete.css('display', 'none');
            btn.html('展开全文');

        }
    });
}

/**
 * 摘要文字超过100即显示红色
 */
if($('#digest').length > 0){
    var digestNum;
    $('#title').keyup(function(){
        if($('#title').val().length > 20){
            digestNum = 46;
        }else{
            digestNum = 70;
        }
        if($('#digest').val().length > digestNum){
            $('#digest').css('color', '#d9534f');
        }else{
            $('#digest').css('color', '#999');
        }
    });
    $('#digest').keyup(function(){
        var text = $('#digest').val();
        if(text.length > digestNum){
            $('#digest').css('color', '#d9534f');
        }else{
            $('#digest').css('color', '#999');
        }
    });
}

/**
 * 文章作者
 */
if($('.js-author-box').length > 0){
    $('.js-author-box .box-info-item .box-input input').click(function(){
        $(this).parents('.box-info-item').find('label input[type="radio"]').attr('checked', 'checked');
    })
}

//
//window.setInterval(show,5000);
//function show()
//{
//    $('#article_draft_save').addClass('noReturn');
//    edit_article(6, $('#article_draft_save'));
//}

var SearchImgPost = function (p) {
    var url = '',
        data = {
            huxiu_hash_code: huxiu_hash_code,
            page: '1',
            s: $('#searchHeardImg').val()
        };
    $.ajax({
        type: 'post',
        url: url,
        data: data,
        dataType: 'json',
        async: true,
        beforeSend: function (XMLHttpRequest) {
            //app.find('img').attr('src','/static_2015/img/loading.gif');
        },
        success: function (data) {
            if (data.result == 1) {

            }
        },
        error: function (e) {

        }
    });
};

var interceptionString = function (str) {
    if (str.length > 11) {
        str = str.substring(0, 11) + '...';
    }
    return str;
};
var search_article_pic = true,keyword = '';
var getSearchImg = function (page) {
    if(!!search_article_pic){
        search_article_pic = false;
        $.ajax({
            type: 'post',
            url: '/article/search_article_pic',
            data: {
                keyword: $('#searchHeardImg').val(),
                page: page
            },
            dataType: 'json',
            async: true,
            success: function (data) {
                if (data.result == 1) {
                    var liHtml = '';
                    var p = 0;

                    $.each(data.data, function (index, img) {
                        liHtml +=
                            '<li>' +
                            '<a href="' + img.url + '" target="_blank" title="' + img.title + '">' + interceptionString(img.title) + '</a>' +
                            '<div class="number"></div><div class="time">使用时间:' + img.time + '</div>' +
                            '<input type="radio" class="custom" name="search-img">' +
                            '<img class="history-img"  src="' + img.pic + '?imageView2/1/w/180/h/102/imageMogr2/strip/interlace/1/quality/85" >' +
                            '</li>';
                    });
                    if (page == 1) {
                        if (data.data.length == 0) {
                            alert('暂无此类图片');
                        }
                        $('.search-img-ul').empty();
                    }

                    if(keyword == $('#searchHeardImg').val()){
                        $('.search-img-ul').append(liHtml);
                        p = parseInt(page) + 1
                    }else{
                        keyword = $('#searchHeardImg').val();
                        $('.search-img-ul').empty().append(liHtml);
                        p = 2;
                    }
                    $('.search-img-info').hide();
                    $('.js-get-more-search-img').attr('data-page', p+'');
                    $('.js-get-more-search-img').removeClass('hide');

                    $('body').on('error','.history-img',function(){
                        $(this).attr('src', $(this).attr('src').replace('?imageView2/1/w/180/h/102/imageMogr2/strip/interlace/1/quality/85', ''));
                    })

                } else {
                    if (page == 1) {
                        alert('暂无此类图片');
                    }
                }
                search_article_pic = true;
            },
            error: function (e) {

            }
        });
    }
};

/**
 * 通过关键字搜索图片
 */
$('body').on('keypress','#searchHeardImg',function(event){
    if (event.keyCode == "13") {
        getSearchImg('1');
    }
});

/**
 * 点击搜索
 */
$('body').on('click', '.js-search-img', function () {
    getSearchImg('1');
});

/**
 * 打开搜索modal
 */
$('body').on('click', '.js-open-search-pic', function () {
    var strHtml =
        '<div class="search-img-box history-img-box">'
        +'<input type="text" id="searchHeardImg" placeholder="图片关键字">'
        +'<span class="input-group-addon js-search-img" data-page="1"><i class="fa fa-search"></i></span>'
        +'</div>'
        +'<ul class="search-img-ul"></ul>'
        +'<div class="search-img-info">搜索的结果会在这里显示</div>'
        +'<a class="pull-right js-get-more-search-img search-img-more hide" data-page="1">获取更多</a>';

    var btnOk = '<button class="btn btn-primary js-determine-choose-img">确定</button>';
    dialogBox('searchImgModal', '搜索图片', strHtml, btnOk);
});

/**
 * 获取更多搜索图片
 */
$('body').on('click', '.js-search-img,.js-get-more-search-img', function () {
    var t = $(this);
    getSearchImg(t.attr('data-page'));
});

/**
 * 图片提示信息
 */
$('body').on('click','input:radio[name="search-img"]',function(){
    $(".str-ok").remove();
    $(".str-bok").remove();
    var $t=$(this);
    var oStrBok=$('<div class="str-bok">注意：该图片尺寸为：<strong></strong>*<strong></strong>，不满足网站要求！建议重新上传</div>');
    var oStrOk=$('<div class="str-ok"><span>注意：</span>该图片尺寸为<strong></strong>*<strong></strong>，符合网站要求，可上传使用~</div>');
    var oSrc = $t.next().attr('src').replace('?imageView2/1/w/180/h/102/imageMogr2/strip/interlace/1/quality/85', '');
    var oImg=new Image();
    oImg.src = oSrc;
    oImg.onload=function(){
        $(".str-bok").remove();
        $(".str-ok").remove();
        var oW=this.width;
        var oH=this.height;
        if(oW<800||oH<600){
            $('.modal-body').append(oStrBok);
            $('.str-bok strong:eq(0)').html(oW);
            $('.str-bok strong:eq(1)').html(oH);
        }else {
            $('.modal-body').append(oStrOk);
            $('.str-ok strong:eq(0)').html(oW);
            $('.str-ok strong:eq(1)').html(oH);
        }
    };
});

/**
 * 确定选择搜索的图片
 */
$('body').on('click', '.js-determine-choose-img', function () {
    var liList = $('.search-img-ul li');
    var input = $('input:radio[name="search-img"]:checked');
    var src = input.next().attr('src').replace('?imageView2/1/w/180/h/102/imageMogr2/strip/interlace/1/quality/85', '');
    if (!!src) {
        pic_url = src;
        $('#head-pic').find('.first-figure-pic img').attr('src',src);
        $('#head-pic').find('.first-figure-pic').removeClass('hide');
        $('#head-pic').find('.first-figure-content').hide();
        $('#head-pic').find('.icon-article').removeClass('hide');
        $('#searchImgModal').modal('hide');
    }
});

/**
 * 文件通用上传方法
 */
function UploadFile(url,id,callback) {
    $.ajaxFileUpload({
        data:{
            'is_ajax':'1',
            'huxiu_hash_code':huxiu_hash_code
        },
        url:url, //你处理上传文件的服务端
        secureuri:false,
        fileElementId: id,
        dataType: 'json',
        success: function (data){
            callback(data);
        }
    });
    return false;
}

$('body').on('change','#report_pdf',function(e){
    var file = e.target.files[0],t = $(this);
    $('.pdf_name').html('正在上传...');
    var call = function(data){
        $('.pdf-url').val(data.data.url);
        $('.pdf_name').html('上传完成.');
        setTimeout(function(){
            $('.pdf_name').html('');
        },1000);
        t.val('');
    };
    UploadFile('/tool/report_upload','report_pdf',call);
});


/**
 * 2016.0531 新编辑器修改
 */

/**
 * 生成编辑器
 */
if($('#myEditor').length > 0){
    var ue = UE.getEditor('myEditor');
}
/**
 * 从图片库中选择图片
 */
$('body').on('click','.js-add-pic-article',function(){
    var t = $(this),src = t.parent('li').find('.add-pic-article').attr('src');
    var t_imgWidth = t.parent('li').find('.add-pic-article').attr('data-width');
    var t_imgHeight = t.parent('li').find('.add-pic-article').attr('data-height');
    var value = '<p class="img-center-box"><img src="'+ src +'" data-w="'+ t_imgWidth +'" data-h="'+ t_imgHeight +'"></p><p><br/></p>';
    UE.getEditor('myEditor').execCommand('insertHtml', value);
    t.parent('li').remove();
    $('.pic-number').html($('.js-pic-list li').length);
});
/**
 * 图片库视频库跟随页面滚动
 */
$(document).ready(function () {
    if($('#articlePicGroup').length > 0){
        var t = $('#articlePicGroup');
        var top = t.offset().top - 55;
        $(window).scroll(function () {
            if($(window).scrollTop() > top){
                var h = $(window).scrollTop() - top +'px';
                t.stop().css({top:'60px','margin-left':'784px','right':'auto',position: 'fixed'});
            }else{
                t.stop().css({top:0,'margin-left':'0','right':'0',position: 'absolute'});
            }
        })
    }
});

/**
 * 检验url地址是否正确
 * @param URL
 * @returns {boolean}
 */
function checkURL(URL){
    var str=URL;
    var Expression=/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w .\/?%&=]*)?/;
    var objExp=new RegExp(Expression);
    if(objExp.test(str)==true){
        return true;
    }else{
        return false;
    }
}
/**
 * 过滤视频url
 */

function convert_url(url){
    if ( !url ) return '';
    var src,str,height = 280,width = 420;
    //腾讯视频使用iframe的方式展示,原因是腾讯支持https;
    if(!checkURL(url)){
        str = '';
    }else if(url.indexOf('qq.com')>0){//腾讯视频；
        //根据不同的视频左出vid
        if(url.indexOf('vid') > 0){
            src = url.trim(url).replace(/v\.qq\.com\/.+[\?\&]vid=([^&]+).*$/i, "v.qq.com/iframe/player.html?vid=$1&tiny=0&auto=0");
            if(src.indexOf('https') == -1){
                src = src.replace('http','https');
            }
            str = "<iframe id='video_play' frameborder='0' height='"+height+"' width='"+width+"' src='"+src+"' allowfullscreen></iframe>"
        }else{
            var obj = url.split('/');
            if(obj[obj.length-1].indexOf('.html')>0){
                var vid = obj[obj.length-1].replace(".html","");
                if(vid.length == 11){
                    src = 'https://v.qq.com/iframe/player.html?vid='+vid+'&tiny=0&auto=0';
                    str = "<iframe id='video_play' frameborder='0' height='"+height+"' width='"+width+"' src='"+src+"' allowfullscreen></iframe>"
                }else{
                    str = '<a href="'+ url +'" target="_blank" class="border-none videoA"></a>';
                }
            }else{
                str = '<a href="'+ url +'" target="_blank" class="border-none videoA"></a>';
            }
        }
    }else{
        //非腾讯视频用木人video.jpg图片代替,点击打开视频链接页面
        str = '<a href="'+ url +'" target="_blank" class="border-none videoA"></a>'
    }
    return str;
}

/**
 * 根据url生成视频预览
 */
function createPreviewVideo(url){
    if ( !url )return;
    var conUrl = convert_url(url);
    if(!!conUrl){
        var video_html = '<p class="text-center" >'+ convert_url(url) +'</p>';
        $('.video-box').empty().append(video_html);
    }else{
        $('.video-box').empty().append('<div class="error-info-box">暂不支持此网站视频，换一个视频地址试试</div>');
    }
}

/**
 * 添加视频
 */
$('body').on('click','.js-add-video',function(){
    var t = $(this);
    var strHtml = '<div class="control-group">'
        //+'<label>'
        //+'<input class="btn btn-success hide" type="file" accept="video/mp4">'
        //+'<span class="btn btn-success">本地上传 &nbsp; <i class="fa fa-file-movie-o"></i></span>'
        //+'</label>'
        +'</div>'
        +'<div class="control-group">'
        +'<label class="control-label">视频地址：<input class="form-control" id="video_url" type="text" placeholder="视频地址"></label>'
        +'</div>'
        +'<div class="control-group">'
        +'<div class="video-box">'
        +'<div class="error-info-box hide">'
        +'暂不支持此网站视频，换一个视频地址试试'
        +'</div>'
        +'</div>'
        +'</div>',

        btnOk = '<button class="btn btn-success js-sure-add-video">确定</button>';

    dialogBox('videoModal', '上传视频', strHtml, btnOk);
});


/**
 * 暂存视频资源
 */
$('body').on('click','.js-sure-add-video',function(){
    if($('.video-box').find('.error-info-box') .length != 1){
        var video_html = '';
        if($('.video-box p iframe').length > 0){
            var src = $('.video-box p iframe').attr('src');
            video_html = '<p style="text-align:center"><iframe height="400" width="710" src="'+ src +'" frameborder="0" allowfullscreen=""></iframe></p>';
        }else{
            video_html = '<p class="text-center">' + $('.video-box p').html() +'</p>';
        }
        /**
         * 添加到编辑器中
         */
        UE.getEditor('myEditor').execCommand('insertHtml', video_html);
        $('#videoModal').modal('hide');
    }
});

/**
 * 动态添加视频
 */
$('body').on('change','#video_url',function(){
    var t = $(this),url = $('#video_url').val();
    createPreviewVideo(url);
});

/**
 * 图片演示修改 左右 垂直居中
 */
var imgReportWH = function(){
    $.each($('.js-pic-list li'),function(){
        var t = $(this),img = t.find('img'),src = img.attr('src');
        var img_push = new Image,
            img_w = '',
            img_h = '';
        img_push.src = src;
        img_push.onload = function(){
            img_w = img_push.width;
            img_h = img_push.height;
            if((img_w/img_h) > (16/9) || ((img_w < 68) && (img_h < 68))){
                t.css({'line-height':'68px'});
            }else{
                img.css({'max-height':'100%'});
            }
        };
    });
};
/**
 * 初始化图片库样式
 */
imgReportWH();

/**
 * 多图片上传预览方法（写文章 and 24小时 共用）
 */
var imgUpload = function(i,file,url,type){

    /**
     * 初始化form表单
     */
    var form = document.forms[0];
    var formData = new FormData(form);
    formData.append("Filedata",file);
    formData.append("is_ajax",1);
    formData.append("huxiu_hash_code",huxiu_hash_code);

    /**
     * ajax 提交form
     */
    var html = '<li id="pic_list'+ i +'">'
        +'<div class="loading-box">'
        +'<img src="https://img.huxiucdn.com/article/cover/201605/31/115241386639.png" alt="">'
        +'<div class="text">上传中</div>'
        +'</div>'
        +'<div class="btn-icon-box js-delect-pic">'
        +'<i class="fa fa-trash-o"></i>'
        +'</div>'
        +'<i class="btn-left-icon btn-change-icon-box js-left-icon hide"></i>'
        +'<i class="btn-right-icon btn-change-icon-box js-right-icon hide"></i>'
        +'<div class="js-add-pic-article pic-name-bg"><span>'+ file.name +'</span></div>'
        +'</li>';

    $('.list-ul-box').css({'max-height':window.innerHeight - 217,'overflow': 'auto'});
    $('.article-pic-box .box-label').addClass('active');
    $('.js-pic-list').append(html);

    $.ajax({
        url : url,
        type : "post",
        data : formData,
        dataType:"json",
        processData : false,         // 告诉jQuery不要去处理发送的数据
        contentType : false,        // 告诉jQuery不要去设置Content-Type请求头
        success:function(data){
            var imgID = '', imgUrl = '';
            if(type == 1){
                //文章上传多图
                imgID = data.attachid;
                imgUrl = data.url;
                var imgWidth = data.width;
                var imgHeight = data.height;
                var img = '<img class="add-pic-article" data-id="'+imgID+'" src="'+imgUrl+'" data-width="'+ imgWidth +'" data-height="'+ imgHeight +'">';
            }
            if(type == 2){
                //24小时上传多图
                imgID = data.data.uuid;
                imgUrl = data.data.img_url;
                var img = '<img class="add-pic-article" data-id="'+imgID+'" src="'+imgUrl+'">';
            }

            $('#pic_list'+i).append(img).find('.loading-box').remove();
            $('#pic_list'+i).removeAttr('id');
            imgReportWH();
            $('.pic-number').html($('.js-pic-list li').length);
        },
        error : function(e){

        }

    });
};

/**
 * 选择多图上传
 */
$('body').on('change','#article-pic',function(){
    var t = $(this);
    var docObj = document.getElementById("article-pic");
    var fileList = docObj.files;
    for (var i = 0; i < fileList.length; i++) {
        if (docObj.files && docObj.files[i]) {
            imgUpload(i,docObj.files[i],'/tool/img_cover_upload',1);
        }
    }
});
/**
 * 滚动条样式修改
 */
if($('.nano').length > 0){
    var nano_init = function(){
        var nano = $('.nano').nanoScroller({
            preventPageScrolling: false
        });
    };
    nano_init();
}
/**
 * 删除图片库的图片
 */
$('body').on('click','.js-delect-pic',function(e){
    var t = $(this);
    //event.stopPropagation(); // 阻止事件冒泡
    t.parents('li').remove();
    $('.pic-number').html($('.js-pic-list li').length);
    if($('.js-pic-list li').length == 0){
        $('.article-pic-box .box-label').removeClass('active');
    };
});
/**
 * 文章类型切换
 */
$('body').on('click','.js-article-tag-ul li',function(){
    var t = $(this),type = t.attr('data-type');
    $('.js-article-tag-ul li').removeClass('active');
    t.addClass('active');
    tagInit(type);
});

//获取input图片宽高和大小
function getImageWidthAndHeight(id, callback) {
    var _URL = window.URL || window.webkitURL;
    $("#" + id).change(function (e) {
        var file, img;
        console.log(file,img);
        if ((file = this.files[0])) {
            img = new Image();
            img.onload = function () {
                callback && callback({"width": this.width, "height": this.height, "filesize": file.size});
                console.log(this.width);
            };
            img.src = _URL.createObjectURL(file);
        }
    });
}

/**
 * 文章头图 初始化裁剪数据
 */
var updateCoords = function (c) {
    $('#x1').val(c.x);
    $('#y1').val(c.y);
    $('#x2').val(c.x2);
    $('#y2').val(c.y2);
    $('#w').val(c.w);
    $('#h').val(c.h);
};
var jcrop_api, boundx, boundy,current_image;


var jcropInit = function (_pic) {

    var select = [0, 0, 560, 315];
    if(_pic.height == 1000){
        select = [0, 0, 400, 500];
    }
    $('#target').Jcrop({
        onChange: updateCoords,
        onSelect: updateCoords,
        allowSelect: true, //允许选择
        allowResize: true, //是否允许调整大小
        setSelect: select,
        aspectRatio: _pic.prop_num,
        addClass: 'jcrop-dark',
        bgOpacity:'0.4',
        handleSize:'10'
    }, function () {
        var bounds = this.getBounds();
        boundx = bounds[0];
        boundy = bounds[1];
        jcrop_api = this;

    });
};

/*
* 前端处理裁剪代码
*/
function preview() {
    // Set canvas
    var x1 = parseInt($('#x1').val()),
        y1 = parseInt($('#y1').val()),
        x2 = parseInt($('#x2').val()),
        y2 = parseInt($('#y2').val());

    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');

    // Delete previous image on canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Set selection width and height
    var sw = parseInt($('#w').val());
    var sh = parseInt($('#h').val());


    // Set image original width and height
    var imgWidth = $('#target').width();
    var imgHeight = $('#target').height();

    // Set selection koeficient
    var kw = current_image.width / imgWidth ;
    var kh = current_image.height / imgHeight ;

    // Set canvas width and height and draw selection on it
    canvas.width = (sw * kw);
    canvas.height = (sh * kh);


    var y =  (y1 * kh) < 0 ? 0 : (y1 * kh);
    context.drawImage(current_image, (x1 * kw), y, (sw * kw), (sh * kh), 0, 0, canvas.width, canvas.height);
    //remove old img;
    //$('#imglogo').remove();
    // Convert canvas image to normal img
    var dataUrl = canvas.toDataURL("image/jpeg");
    return dataUrl;

}


/**
 * 文章gif图片上传
 */
var articleFileGifUpload = function(data_pic,id){

    var call = function(data){
        if(data.success){
            var head_pic = '#head-pic'; //默认值  app头图id为head-app-pic
            if(data_pic == 'pic1'){
                pic1_url = data.data.url;
                head_pic = '#head-app-pic'
            }else{
                pic_url = data.data.url;
            }

            $(head_pic+' .first-figure-pic img').attr('src',data.data.url);
            $(head_pic+' .first-figure-pic').removeClass('hide');
            $(head_pic+' .first-figure-content').hide();
            $(head_pic+' .icon-article').removeClass('hide');

        }else{
            Messenger().post({
                message: data.error.message,
                type: 'error',
                showCloseButton: true
            });
        }
    };
    UploadFile('/tool/imageUpload/article_cover',id,call);
};

/**
 * 打开弹窗
 */
var openJcropModal = function(src,_pic,file,id,type){

    /**
     * src : 本地图片地址,
     * _pic : 限制图片的比例尺寸 必传;
     */

    current_image = new Image();
    current_image.onload = function () {
        var data_pic = 'pic';
        if(_pic.height == 1000){
            data_pic = 'pic1';
        }
        //this.width 宽,this.height 高,file.size  size;
        if(file.type == 'image/gif'){

            if(this.width >= 400 && this.height >= 300){
                /**
                 * 上传gif文件
                 */
                articleFileGifUpload(data_pic,id);
            }else{
                Messenger().post({
                    message: 'gif图尺寸应不低于400*300像素',
                    type: 'error',
                    showCloseButton: true
                });
            }


        }else if(this.width >= _pic.width && this.height >= _pic.height){

            var pic_html = '<div class="jcrop-pic-box">'
                +'<img id="target" src="'+ src +'">'
                +'</div>'
                +'<canvas id="myCanvas" style="display:none;"></canvas>'
                +'<input id="x1" hidden><input id="y1" hidden><input id="x2" hidden><input id="y2" hidden><input id="w" hidden><input id="h" hidden>',

                btnOk = '<button class="btn btn-primary js-UploadFile" data-type="'+ type +'"  data-pic="'+ data_pic +'" data-dismiss="modal" aria-hidden="true">上传</button>';

            dialogBox('ImgCutterModal', '文章图片上传', pic_html, btnOk);


            var h = this.height;
            var w = this.width;
            setTimeout(function(){
                if((w/h) > _pic.prop_num){
                    $("#target").css({width: '100%', height: 'auto'});
                }else if((w/h) < _pic.prop_num){
                    $("#target").css({height: '100%', width: 'auto'});
                }

                //修改裁剪框的宽高
                if(_pic.height == 1000){
                    $('.jcrop-pic-box').css({'width':'320px','height':'400px','left':'120px'});
                }

            },100);

            setTimeout(function(){
                jcropInit(_pic);
            },500);

            $('#article-heard-pic,#article-heard-icon-pic,#article-heard-pic1,#article-heard-icon-pic1').val('');

        }else{
            if(this.width < _pic.width){
                Messenger().post({message: '图片的宽不能小于'+_pic.width,type: 'error',showCloseButton: true});
            }else if(this.height >= _pic.height){
                Messenger().post({message: '图片的高不能小于'+_pic.height,type: 'error',showCloseButton: true});
            }else{
                Messenger().post({message: '图片尺寸不符合要求,请上传'+_pic.width+'*'+_pic.height+'尺寸的图片',type: 'error',showCloseButton: true});
            }
        }
    };
    current_image.src = src;
};
/**
 * 上传文章头图
 */
$('body').on('change','#article-heard-icon-pic-knows,#article-heard-pic-knows,#article-heard-pic,#article-heard-icon-pic,#article-heard-pic1,#article-heard-icon-pic1',function(e){
    var t = $(this), _URL = window.URL || window.webkitURL;

    var file, img , src;
    if ((file = this.files[0])) {
        var _pic = {
            width:800,
            height:600,
            prop_num:4/3
        };
        if(t.attr('data-pic') == 'pic1'){
            _pic = {
                width:800,
                height:1000,
                prop_num:8/10
            }
        }
        if(t.attr('data-pic') == 'knows'){
            _pic = {
                width:800,
                height:640,
                prop_num:5/4
            }
        }
        if(GetQueryString('article_type') == 'video'){
            _pic = {
                width:800,
                height:450,
                prop_num:16/9
            }
        }
        openJcropModal( _URL.createObjectURL(file),_pic,file, t.attr('id'));
    }

});


/**
 * 选择裁剪好的图片最终上传
 */
$(document).on('click','.js-UploadFile',function(){

    var t = $(this);
    /**
     * 将以base64的图片url数据转换为Blob
     * @param urlData
     * 用url方式表示的base64图片数据
     */
    function convertBase64UrlToBlob(urlData){

        var bytes=window.atob(urlData.split(',')[1]);        //去掉url的头，并转换为byte

        //处理异常,将ascii码小于0的转换为大于0
        var ab = new ArrayBuffer(bytes.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < bytes.length; i++) {
            ia[i] = bytes.charCodeAt(i);
        }

        return new Blob( [ab] , {type : 'image/png'});
    }
    //这里连带form里的其他参数也一起提交了,如果不需要提交其他参数可以直接FormData无参数的构造函数
    var formData = new FormData();

    //convertBase64UrlToBlob函数是将base64编码转换为Blob
    //append函数的第一个参数是后台获取数据的参数名,和html标签的input的name属性功能相同
    formData.append("Filedata",convertBase64UrlToBlob(preview()));
    formData.append("is_ajax",'1');
    formData.append("huxiu_hash_code",huxiu_hash_code);

    $.ajax({
        url : '/tool/imageUpload/article_cover',
        type : "POST",
        data : formData,
        dataType:"json",
        processData : false,  // 告诉jQuery不要去处理发送的数据
        contentType : false,  // 告诉jQuery不要去设置Content-Type请求头
        success:function(data){
            if(t.attr('data-type') == 'topic'){
                if(data.success){
                    pic_attach_id = data.attachid;
                    pic_url = data.data.url;
                    $('#topic-heard-img').parents('label').find('.js-thumb-img').empty().html('<img src="'+data.url+'" />');
                }else{
                    Messenger().post({
                        message: data.msg,type: 'error',showCloseButton: true
                    });
                }
            }else{

                if(data.success){
                    var head_pic = '#head-pic'; //默认值  app头图id为head-app-pic
                    if(t.attr('data-pic') == 'pic1'){
                        pic1_url = data.data.url;
                        head_pic = '#head-app-pic'
                    }else{
                        pic_url = data.data.url;
                    }

                    $(head_pic+' .first-figure-pic img').attr('src',data.data.url);
                    $(head_pic+' .first-figure-pic').removeClass('hide');
                    $(head_pic+' .first-figure-content').hide();
                    $(head_pic+' .icon-article').removeClass('hide');


                }else{
                    Messenger().post({
                        message: data.error.message,
                        type: 'error',
                        showCloseButton: true
                    });
                }
            }

        }
    });

});

/**
 * 缩略图
 */
commonComponents.formDataUpImg("share_pic_new","/tool/imageUpload/article_share");


/**
 * 文章title输入框自适应高度
 */
if($('#article-title').length > 0){

    $('#title').autoResize({
        onResize : function() {
            $(this).css({opacity:0.8});
        },
        animateCallback : function() {
            $(this).css({opacity:1});
        },
        animateDuration : 300,
        extraSpace : 0
    });
    document.getElementById('title').addEventListener('keydown',function(e){
        if(e.keyCode!=13) return;
        e.preventDefault();
        this.value += '';
    });
}
/**
 * 响应文章title
 */
if($('#article-edit-title').length > 0){
    $('#title').trigger('keydown');
}
/**
 * 删除头图
 */
$('body').on('click','.js-del-first-figure',function(){
    var t = $(this);
    t.parents('.first-figure-box').find('.first-figure-content').show();
    t.parents('.first-figure-box').find('.icon-del').addClass('hide');
    t.parents('.first-figure-box').find('.icon-pic').addClass('hide');
    t.parents('.first-figure-box').find('.first-figure-pic').addClass('hide');
    if(t.attr('data-pic') == 'pic1'){
        pic1_url = '';
    }else{
        pic_attach_id = '';
        pic_url = '';
    }
});

/**
 * 修改研究报告免费  选中是显示  非会员摘要信息展示
 */
$(document).on('change','.is_free,.weekly_is_free',function(){
    var t = $(this);
    if(!t.prop('checked')){
        $('.novip-summary-box').show();
    }else{
        $('.novip-summary-box').hide();
    }
});


/**
 * 添加修改内容推广表
 */
$(document).on('click','.js-save-promotion',function(){
    var t = $(this),
        url= t.attr('data-type') == 'edit' ? '/article/editContentPromotion' : '/article/addContentPromotion',
        postData = {
            is_ajax:1,
            id:$('#id').val(),
            title:$('#title').val(),
            icon:$('#icon').attr('src'),
            position:$('input[name=position]:checked').val(),
            start_time:$('#start_time').val(),
            end_time:$('#end_time').val(),
            aid:[],
            tag:$('#tag').val()
        };
    $.each($('.related-list li'),function(){
        var t = $(this);
        postData.aid.push(t.attr('aid'));
    });

    if(postData.aid.length < 3 || postData.aid.length >30){
        Messenger().post({
            message: '相关文章最少3篇,最多30篇' ,type: 'error',hideAfter: 3,showCloseButton: true
        });
        return false;
    }

    if(!t.hasClass('disabled')){
        t.addClass('disabled');
        $.ajax({
            type: 'post',
            url: url,
            data: postData,
            dataType: 'json',
            async: true,
            success: function(data){
                if(data.result == 1){
                    Messenger().post({
                        message: data.msg ,type: 'success',hideAfter: 3,showCloseButton: true
                    });
                    location.reload();
                }else{
                    Messenger().post({
                        message: data.msg ,type: 'error',hideAfter: 3,showCloseButton: true
                    });
                }
                t.removeClass('disabled');
            }
        });
    }
});

/**
 * 显示或者隐藏会员专享
 */

$(document).on('click','.js-edit-vip-content-promotion',function(){
    var t = $(this),
        url= '/article/editContentPromotionStatus',
        dataPost = {
            is_ajax:1,
            id: t.attr('data-id'),
            status: t.attr('data-status')
        };
    if (!t.hasClass('disabled')) {
        t.addClass('disabled');
        $.ajax({
            type: 'post',
            url: url,
            data: dataPost,
            dataType: 'json',
            async: true,
            success: function (data) {
                t.removeClass('disabled');
                if (data.result == '1') {
                    Messenger().post({
                        message: data.msg ,type: 'success',hideAfter: 3,showCloseButton: true
                    });
                    location.reload();
                } else {
                    Messenger().post({
                        message: data.msg ,type: 'error',hideAfter: 3,showCloseButton: true
                    });
                }
                t.removeClass('disabled');
            }
        });
    }
});
/**
 * 删除内容推广
 */
$(document).on('click','.js-del-vip-promotion',function(){
    var t = $(this),
        url= '/article/delContentPromotion',
        dataPost = {
            is_ajax:1,
            id: t.attr('data-id')
        };
    if(confirm("确定要删除吗?")){
        if (!t.hasClass('disabled')) {
            t.addClass('disabled');
            $.ajax({
                type: 'post',
                url: url,
                data: dataPost,
                dataType: 'json',
                async: true,
                success: function (data) {
                    t.removeClass('disabled');
                    if (data.result == '1') {
                        Messenger().post({
                            message: data.msg ,type: 'success',hideAfter: 3,showCloseButton: true
                        });
                        location.reload();
                    } else {
                        Messenger().post({
                            message: data.msg ,type: 'error',hideAfter: 3,showCloseButton: true
                        });
                    }
                    t.removeClass('disabled');
                }
            });
        }
    }
});

/**
 * 专题图片上传
 */
$('body').on('change','#special_pic_file',function(){
    var t = $(this);
    var callBack = function(data){
        if(data.success == '1'){
            $('#special_pic').attr('src',data.data.url);
        }else{
            Messenger().post({message: data.data.message,type: 'error',showCloseButton: true});
        }
    };
    UploadFile('/tool/imageUpload/special','special_pic_file',callBack);
});

/**
 * 专题图片上传
 */
$('body').on('change','#special_sponsor_logo_file',function(){
    var t = $(this);
    var callBack = function(data){
        if(data.success == '1'){
            $('#special_sponsor_logo').attr('src',data.data.url);
        }else{
            Messenger().post({message: data.data.message,type: 'error',showCloseButton: true});
        }
    };
    UploadFile('/tool/imageUpload/special','special_sponsor_logo_file',callBack);
});

/**
 * 添加修改专题
 */
$(document).on('click','.js-subject-add',function(){
    var t = $(this),
        data_require = $("[data-require = 'true']"),
        url = t.attr('data-type') == 'edit' ? '/article_subject/edit' :  '/article_subject/add',
        dataPost = {
            id:$('#id').val(),
            name:$('#name').val(),
            img:$('#special_pic').attr('src'),
            introduce:$('#introduce').val(),
            url:$('#url').val(),
            is_ajax:1,
            label:$('#label').val(),
            sponsor_logo:$('#special_sponsor_logo').attr('src'),
            is_sponsor: !!($('#is_sponsor').prop('checked')) ? 1 : 0 //是赞助专题 1 否 0
        };

    var checkVal = checkRequired(data_require);
    if(checkVal){
        if(dataPost.img == '/static/common/images/bg.png'){
            Messenger().post({
                message: '图片不能为空' ,type: 'error',hideAfter: 3,showCloseButton: true
            });
            return false;
        }

        if (!t.hasClass('disabled')) {
            t.addClass('disabled');
            $.ajax({
                type: 'post',
                url: url,
                data: dataPost,
                dataType: 'json',
                async: true,
                success: function (data) {
                    t.removeClass('disabled');
                    console.log(data);
                    if (data.result == '1') {
                        Messenger().post({
                            message: data.msg ,type: 'success',hideAfter: 3,showCloseButton: true
                        });
                        window.location.href = '/article_subject/index';
                    } else {
                        Messenger().post({
                            message: data.msg ,type: 'error',hideAfter: 3,showCloseButton: true
                        });
                    }
                    t.removeClass('disabled');
                }
            });
        }
    }


});
/**
 * 添加修改频道
 */
$(document).on('click','.js-channel-add',function(){
    var t = $(this),
        url = t.attr('data-type') == 'edit' ? '/article_channel/edit' :  '/article_channel/add',
        dataPost = {
            id:$('#id').val(),
            name:$('#name').val(),
            is_ajax:1,
            pic:$('#active-pic').attr('src')
        };
    if (!t.hasClass('disabled')) {
        t.addClass('disabled');
        $.ajax({
            type: 'post',
            url: url,
            data: dataPost,
            dataType: 'json',
            async: true,
            success: function (data) {
                t.removeClass('disabled');
                if (data.result == '1') {
                    Messenger().post({
                        message: data.msg ,type: 'success',hideAfter: 3,showCloseButton: true
                    });
                    window.location.href = '/article_channel/index';
                } else {
                    Messenger().post({
                        message: data.msg ,type: 'error',hideAfter: 3,showCloseButton: true
                    });
                }
                t.removeClass('disabled');
            }
        });
    }
});
/**
 * 添加修改专栏 资讯改版 20170911
 */
//通用专栏添加和编辑接口
$(document).on('click','.js-collection-add',function(){
    var t = $(this),
        data_require = $("[data-require = 'true']"),
        summary = $(".column-intrduce-textarea").val(),
        compere_uid = $("#columnPerson").val(),
        icon = $("#column-icon").attr("data-url"),
        head_img = $("#column-headIcon").attr("data-url"),
        url = t.attr('data-type') == 'edit' ? '/article_collection/edit' :  '/article_collection/add',
        dataPost = {
            id:$('#id').val(),
            name:$('#name').val(),
            is_ajax:1,
            summary: summary,
            compere_uid: compere_uid,
            icon: icon,
            head_img: head_img,
            is_sponsor: !!$('#is_sponsor').prop('checked') ? 1 : 0,
            label: $('#label').val()
        };
    var checkVal = checkRequired(data_require);
    if(checkVal){
        if(dataPost.is_sponsor == 1){
            if(dataPost.label == ''){
                Messenger().post({
                    message: '赞助标签不可为空' ,type: 'error',hideAfter: 3,showCloseButton: true
                });
                return false;
            }
        }

        if (!t.hasClass('disabled')) {
            t.addClass('disabled');
            $.ajax({
                type: 'post',
                url: url,
                data: dataPost,
                dataType: 'json',
                async: true,
                success: function (data) {
                    t.removeClass('disabled');
                    if (data.result == '1') {
                        Messenger().post({
                            message: data.msg ,type: 'success',hideAfter: 3,showCloseButton: true
                        });
                        window.location.href = '/article_collection/index';
                    } else {
                        Messenger().post({
                            message: data.msg ,type: 'error',hideAfter: 3,showCloseButton: true
                        });
                    }
                    t.removeClass('disabled');
                }
            });
        }
    }
});

//特殊专栏 添加和编辑接口
$(document).on("click",".js-column-add",function(){
    var t = $(this),
        data_require = $("[data-require = 'true']"),
        summary = $(".column-intrduce-textarea").val(),
        compere_uid = $("#columnPerson").val(),
        icon = $("#column-icon").attr("data-url"),
        head_img = $("#column-headIcon").attr("data-url"),
        url = t.attr('data-type') == 'edit' ? '/column/edit' :  '/column/add',
        dataPost = {
            id:$('#id').val(),
            name:$('#name').val(),
            is_ajax:1,
            summary: summary,
            compere_uid: compere_uid,
            //icon: icon,
            head_img: head_img
        };
    var checkVal = checkRequired(data_require);
    if(checkVal){
        if (!t.hasClass('disabled')) {
            t.addClass('disabled');
            $.ajax({
                type: 'post',
                url: url,
                data: dataPost,
                dataType: 'json',
                async: true,
                success: function (data) {
                    t.removeClass('disabled');
                    if (data.result == '1') {
                        Messenger().post({
                            message: data.msg ,type: 'success',hideAfter: 3,showCloseButton: true
                        });
                        window.location.href = '/column/index';
                    } else {
                        Messenger().post({
                            message: data.msg ,type: 'error',hideAfter: 3,showCloseButton: true
                        });
                    }
                    t.removeClass('disabled');
                }
            });
        }
    }

});

//资讯改版 添加通用专栏 图片上传接口
$(document).on("change",".js-column-uploadPic",function(){
    var t = $(this);
    var t_file = t[0].files[0];
    var formData = new FormData();
    formData.append("image",t_file);
    $.ajax({
        url: '/article_collection/uploadImage' ,
        type: 'POST',
        dataType: "json",
        data: formData,
        contentType: false,
        processData: false,
        success: function (data) {
            console.log(data);
            console.log(data.msg);
            if(data.success){
                var t_url = data.data.img_url;
                t.parents(".column-uploadPicBox").find("#column-upload-pic").attr("src",t_url);
                t.attr("data-url",t_url);
            }else{
                Messenger().post({
                    message: data.msg,
                    type: 'error',
                    showCloseButton: true
                });
            }
        },
        error: function (data) {
            console.log(data);
        }
    });
});

/**
 * 获取当前专题是第几个
 */
$(document).on('click','.js-append-number',function(){
    var num = $('.manage-subject').index($(this).parents('.manage-subject') );
    $('#subject-number').val(num);
});

/**
 * 上下调整
 */
$(document).on('click','.js-subject-btn .s-btn',function(){

    var t = $(this),
        tBox = t.parents('.manage-subject');

    if(t.hasClass('btn-up')){
        tBox.prev('.manage-subject').before(tBox);
    }else if(t.hasClass('btn-down')){
        tBox.next('.manage-subject').after(tBox);
    }else if(t.hasClass('btn-del')){
        if(confirm('确认要删除吗?')){
            tBox.remove();
        }
    }

});

/**
 * 添加专题栏目
 */

$(document).on('click','.js-add-subject-box',function(){
    var t = $(this);
    var html = '<div class="manage-article-box manage-subject">'
        +'<div class="pull-right right-btn-group js-subject-btn">'
        +'<span class="s-btn btn-up" title="向上移动"><i class="fa fa-arrow-up"></i></span>&nbsp;'
        +'<span class="s-btn btn-down" title="向下移动"><i class="fa fa-arrow-down"></i></span>&nbsp;'
        +'<span class="s-btn btn-del"><i class="fa fa-times"></i></span>'
        +'</div>'
        +'<div class="manage-art-other manage-article-related">'
        +'<div class="box-info-wrap box-info-item">'
        +'<label>分栏名称 :</label>'
        +'<div class="box-input">'
        +' <input type="text" class="name"  placeholder="2-15个字符" maxlength="15">'
        +'</div>'
        +'</div>'
        +'</div>'
        +'<div class="manage-art-other manage-article-related">'
        +'<span class="btn add-related-modal js-append-number"><i class="fa fa-plus"></i>添加相关文章</span>'
        +'<br>'
        +'<ol class="clearfix related-list"></ol>'
        +'</div>'
        +'</div>';

    $('.manage-subject-box').append(html);

});

/**
 * 修改显示隐藏状态
 */
$(document).on('click','.js-article-edit-status',function(){
    var t = $(this),
        url = t.attr('data-url'),
        dataPost = {
            id: t.attr('data-id'),
            status: t.attr('data-status'),
            is_ajax:1
        };
    if (!t.hasClass('disabled')) {
        t.addClass('disabled');
        $.ajax({
            type: 'post',
            url: url,
            data: dataPost,
            dataType: 'json',
            async: true,
            success: function (data) {

                if (data.result == '1') {
                    Messenger().post({
                        message: data.msg ,type: 'success',hideAfter: 3,showCloseButton: true
                    });
                    location.reload();
                } else {
                    Messenger().post({
                        message: data.msg ,type: 'error',hideAfter: 3,showCloseButton: true
                    });
                }
                t.removeClass('disabled');
            }
        });
    }

});

/**
 * 文集,频道添加内容
 */
$(document).on('click','.js-collection-content-add,.js-channel-content-add',function(){
    var t = $(this),
        url = t.attr('data-url'),
        callback_url = t.attr('data-href'),
        dataPost = {
            id: t.attr('data-id'),
            is_ajax:1,
            aid:[]
        };

    $.each($('.related-list li'),function(){
        var t = $(this);
        dataPost.aid.push(t.attr('aid'));
    });

    if (!t.hasClass('disabled')) {
        t.addClass('disabled');
        $.ajax({
            type: 'post',
            url: url,
            data: dataPost,
            dataType: 'json',
            async: true,
            success: function (data) {

                if (data.result == '1') {
                    Messenger().post({
                        message: data.msg ,type: 'success',hideAfter: 3,showCloseButton: true
                    });
                    window.location.href = callback_url;
                } else {
                    Messenger().post({
                        message: data.msg ,type: 'error',hideAfter: 3,showCloseButton: true
                    });
                }
                t.removeClass('disabled');
            }
        });
    }
});
/**
 * 专题添加内容
 */
$(document).on('click','.js-subject-content-add',function(){
    var t = $(this),
        url = t.attr('data-url'),
        callback_url = t.attr('data-href'),
        dataPost = {
            id: t.attr('data-id'),
            is_ajax:1,
            data:[]
        };

    $.each($('.manage-subject'),function(){
        "use strict";
        var tM = $(this),
            li_list = tM.find('.related-list li'),
            name = tM.find('.name').val(),
            id = tM.find('.name').attr('data-id'),
            aid = [];
        if(li_list.length > 0){
            $.each(li_list,function(){
                var tLi = $(this);
                aid.push(tLi.attr('aid'));
            });
            dataPost.data.push({
                id:id,
                name:name,
                aid:aid
            })
        }
    });

    if (!t.hasClass('disabled')) {
        t.addClass('disabled');
        $.ajax({
            type: 'post',
            url: url,
            data: dataPost,
            dataType: 'json',
            async: true,
            success: function (data) {

                if (data.result == '1') {
                    Messenger().post({
                        message: data.msg ,type: 'success',hideAfter: 3,showCloseButton: true
                    });
                    window.location.href = callback_url;
                } else {
                    Messenger().post({
                        message: data.msg ,type: 'error',hideAfter: 3,showCloseButton: true
                    });
                }
                t.removeClass('disabled');
            }
        });
    }
});

/**
 * 频道排序
 */
$(document).on('click','.js-save-sort-num',function(){
    var t = $(this),
        url = '/article_channel/editSort',
        dataPost = {
            id: t.attr('data-id'),
            is_ajax:1,
            data:[]
        };
    var sortList = $('.js-sort-num');
    $.each(sortList,function(){
        var s_t = $(this);
        dataPost.data.push({
            id:s_t.attr('data-id'),
            sort_num:s_t.val()
        })
    });
    if (!t.hasClass('disabled')) {
        t.addClass('disabled');
        $.ajax({
            type: 'post',
            url: url,
            data: dataPost,
            dataType: 'json',
            async: true,
            success: function (data) {

                if (data.result == '1') {
                    Messenger().post({
                        message: data.msg ,type: 'success',hideAfter: 3,showCloseButton: true
                    });
                    location.reload();
                } else {
                    Messenger().post({
                        message: data.msg ,type: 'error',hideAfter: 3,showCloseButton: true
                    });
                }
                t.removeClass('disabled');
            }
        });
    }

});


/**
 * 频道,文集选择发表位置
 */
$(document).on('click','.js-article-channel-ul li,.js-article-collection-ul li,.js-article-sponsor-ul li',function(){

    var t = $(this),
        t_parent = t.parent('ul'),
        max_num = t.parents('ul').attr('data-num'),
        at_num = t.parents('ul').find('li.active').length;

    if(t.hasClass('active')){
        t.removeClass('active');
    }else{
        if(at_num<max_num){
            t.addClass('active');
        }
    }

});

/**
 * 文集 频道 专题 排序
 */

$(document).on('click','.js-sorting',function(){
    var t = $(this),
        search = window.location.search,
        url = window.location.href.replace(search,'') + '?sort='+ t.attr('data-sort') +'&field=' + t.attr('data-field');
    window.location.href = url;
});


/**
 * 获取视频列表
 */

var getVideoList = function(page,callback){

    $.ajax({
        type: 'post',
        url: '/video/get_video_list',
        data: {
            page:page,
            k:$('#searchHeardVideo').val()
        },
        dataType: 'json',
        async: true,
        success: function (data) {

            if (data.result == 1) {
                var liHtml = '';
                var p = 0;

                $.each(data.data, function (index, video) {
                    liHtml +=
                        '<li data-id="'+ video.id +'">' +
                        '<a>' + interceptionString(video.title) + '</a>' +
                        '<input type="radio" class="custom" name="search-video">' +
                        '<img class="history-img"  src="' + video.cover + '" data-videourl="'+ video.fhd_link +'">' +
                        '</li>';
                });

                if (page == 1) {
                    if (data.data.length == 0) {
                        alert(data.msg);
                    }
                    $('.search-video-ul').empty();
                }

                if(keyword == $('#searchHeardVideo').val()){
                    $('.search-video-ul').append(liHtml);
                    p = parseInt(page) + 1
                }else{
                    keyword = $('#searchHeardVideo').val();
                    $('.search-video-ul').empty().append(liHtml);
                    p = 1;
                }
                $('.search-img-info').hide();
                $('.js-get-more-search-video').attr('data-page', p+'');
                $('.js-get-more-search-video').removeClass('hide');

            } else {
                if (page == 1) {
                    alert(data.msg);
                    $('.search-img-ul').empty();
                }
            }
        }
    });
};

/**
 * 文章中添加视频(包含视频文章的视频添加、普通文章右侧站内视频的添加)
 */
$(document).on('click','.js-open-video-modal',function(){
    var type = $(this).attr("data-type");
    if (type === 'feedAd' && $("#img_urls").attr('data-imgid')) {
        Messenger().post({
            message: '图片和小视频不能同时发布',
            type: 'error',
            showCloseButton: true
        });
        return false;
    }
    if ($('.js-moment-upload-img li').length > 0) {
        Messenger().post({
            message: '图片和小视频不能同时发布',
            type: 'error',
            showCloseButton: true
        });
        return false;
    }
    var strHtml =
        '<div class="search-img-box history-img-box">'
        +'<a href="/video/add" class="btn  btn-success pull-left" style="margin-top: 10px;" target="_blank">添加视频</a>&nbsp;&nbsp;' +
        '<input type="text" id="searchHeardVideo" placeholder="视频关键字">'
        +'<span class="input-group-addon js-search-video" data-page="1"><i class="fa fa-search"></i></span>'
        +'</div>'
        +'<ul class="search-img-ul search-video-ul">' +
        '' +
        '</ul>'
        +'<div class="search-img-info">搜索的结果会在这里显示</div>'
        +'<a class="pull-right js-get-more-search-video search-img-more hide" data-page="1">获取更多</a>';

    var btnOk = '<button class="btn btn-primary js-determine-choose-video">确定</button>';
    dialogBox('searchImgModal', '搜索视频', strHtml, btnOk);

    if(type == "station"){
        //如果是站内视频，则做个标志
        choice_video.type = "station";
    }

    if ($('#admin-moment-add-box').length > 0) {
        getMomentVideoList(1);
        $('#searchHeardVideo').remove();
        $('.js-search-video').addClass('hide');
    } else {
        getVideoList(1);
    }
});

/**
 * 通过关键字搜索图片
 */
$('body').on('keypress','#searchHeardVideo',function(event){
    if (event.keyCode == "13") {
        getVideoList(1);
    }
});

/**
 * 点击搜索
 */
$('body').on('click', '.js-search-video', function () {
    getVideoList(1);
});

$('body').on('click', '.js-get-more-search-video', function () {
    var t = $(this);
    getVideoList(t.attr('data-page'));
});

//上传视频的文章类型(视频文章：video_article;普通文章：normal_article)
var choice_video = {
    type: ""
}

/**
 * 确定选择搜索的视频
 */
$('body').on('click', '.js-determine-choose-video', function () {
    var input = $('input:radio[name="search-video"]:checked');
    var src = input.next().attr('src'),
        id = input.parents('li').attr('data-id'),
        video_url = input.next().attr("data-videourl");

    //鉴别此是非视频文章的站内上传
    if(choice_video.type == "station"){
        if(src == ""){
            Messenger().post({
                message: '此视频封面图为空，请更换视频',
                type: 'error',
                showCloseButton: true
            });
            return false;
        }
        //站内视频选择逻辑
        video_pic = src;
        var station_video_box = '<video src=' + video_url + ' poster=' +video_pic+ ' controls="controls" width="100%">您目前设备暂不支持播放</video>';
        //添加到编辑器中
        UE.getEditor('myEditor').execCommand('insertHtml',station_video_box);
        $('#searchImgModal').modal('hide');
    }else{
        //正常视频文章的逻辑
        video_pic = src;
        video_id = id;
        $('.first-figure-video').addClass('hide');
        $('.article-video-pic').removeClass('hide').attr("data-vid", video_id);
        $('.article-video-pic img').attr('src',video_pic);
        $('#searchImgModal').modal('hide');
        //24视频
        if ($('#admin-moment-add-box').length > 0) {
            $('#moment-upload-img').attr('type', '');
        }
    }
});

/**
 * 频道,专栏添加相关内容
 */
$(document).on('click','.js-add-content-modal',function(){
    contentManage();
});

$(document).on('click','.js-content-box-btn',function(){
    var t = $(this);
    var aidObject = [],
        contentLi = $('.related-box-ctt ul li');
    $.each(contentLi,function(index){
        var li = $(this);
        aidObject[index] = li.attr('aid');
    });
    if(aidObject.length >0){
        $.ajax({
            type: 'post',
            url: '/article/addArticleRelation',
            data: {
                aid:aidObject,
                relation_type:$('#relation_type').val(),
                relation_id :$('#relation_id').val(),
            },
            dataType: 'json',
            async: true,
            success: function(data){
                if(data.result == 1){
                    Messenger().post({
                        message:data.msg,
                        type: 'success',
                        showCloseButton: true
                    });
                    location.reload();
                }else{
                    Messenger().post({
                        message:data.msg,
                        type: 'error',
                        showCloseButton: true
                    });
                }
            }
        });
    }
});

/**
 * 移出当前分类
 */
$(document).on('click','.js-remove-article-relation',function(){
    var t = $(this);
    if(confirm('确定要移除此文章!')){
        $.ajax({
            type: 'post',
            url: '/article/removeArticleRelation',
            data: {
                aid: t.attr('aid'),
                relation_type:$('#relation_type').val(),
                relation_id :$('#relation_id').val(),
            },
            dataType: 'json',
            async: true,
            success: function(data){
                if(data.result == 1){
                    Messenger().post({
                        message:data.msg,
                        type: 'success',
                        showCloseButton: true
                    });
                    location.reload();
                }else{
                    Messenger().post({
                        message:data.msg,
                        type: 'error',
                        showCloseButton: true
                    });
                }
            }
        });
    }



});

/**
 * APP 广告 内容推广 状态操作
 */
$(document).on('click','.js-edit-app-promotion',function () {
    var t = $(this);
    var postAppPromotion = function () {
        if(!t.hasClass('disabled')){
            t.addClass('disabled');
            $.ajax({
                type: 'post',
                url:'/app_promotion/updateAppPromotionStatus ',
                data:{
                    id: t.attr('data-id'),
                    status:t.attr('data-status')
                },
                dataType: 'json',
                async:true,
                success:function(data){
                    location.reload();
                    t.removeClass('disabled');
                }
            });
        }
    };
    if(t.attr('data-status') == '2'){
        if(confirm("确定要删除吗？")){
            postAppPromotion();
        }
    }else{
        postAppPromotion();
    }
});

/**
 * APP 添加/修改内容推广
 */
$(document).on('click','.js-add-app-promotion-form,.js-edit-app-promotion-form',function () {
    var t = $(this),
        url = t.attr('data-type') == 'add' ? '/app_promotion/addAppPromotion' : '/app_promotion/updateAppPromotion';

    var postData = {
        'id': t.attr('data-id'),
        'title':$('#title').val(),
        'page':$('#page').val(),
        'start_position':$('#start_position').val(),
        'start_dateline':$('#start_dateline').val(),
        'end_dateline':$('#end_dateline').val(),
        'url':$('#url').val(),
        'pic':$('#pic').attr('src'),
        'pic1':$('#pic1').attr('src'),
        'scroll_type':$('input:radio[name="scroll_type"]:checked').val(),
        'label':$('#label').val(),
        'status':'1'
    };

    if(!t.hasClass('disabled')){
        t.addClass('disabled');
        $.ajax({
            type: 'post',
            url:url,
            data:postData,
            dataType: 'json',
            async:true,
            success:function(data){
                if(!!data.success){
                    Messenger().post({
                        message:data.data.message,
                        type: 'success',
                        showCloseButton: true
                    });
                    window.location.href = '/app_promotion/index';
                }else{
                    Messenger().post({
                        message:data.error.message,
                        type: 'error',
                        showCloseButton: true
                    });
                }
                t.removeClass('disabled');
            }
        });
    }
});

/**
 * 添加/修改内容推广 图片上传
 */
$('body').on('change','#promotion-pic,#promotion-pic1',function(e){

    var t = $(this),
        pic_id = $('#'+t.attr('data-type'));

    var callback = function(data){
        if(!!data.success){
            pic_id.attr('src',data.data.url);
        }else{
            Messenger().post({
                message:data.data.message,
                type: 'error',
                showCloseButton: true
            });
        }
    };
    UploadFile('/tool/imageUpload/ad',t.attr('id'),callback);
});


/*
* 4.5.4 写文章或编辑文章 编辑器添加专题
* */
$(document).delegate('.js-zt-btn','click',function(){
    var $t = $(this),
        url = '/article_subject/getAllByKeyword';
    if($('.article-zt-btn-wrap').length){
        $.ajax({
            type: 'post',
            url: url,
            data: [],
            dataType: 'json',
            async: true,
            success: function(data){
                if(data.success){
                    var li = '';
                    for(var i = 0; i<data.data.length; i++){
                        li += '<li class="js-zt-info" data-id="'+data.data[i].id+'" data-href="'+data.data[i].special_url+'">'+data.data[i].name+'</li>'
                    }

                    var zt_html = '<ul class="article-zt-list-wrap">'+li+'</ul>';
                    $t.parents('.article-zt-btn-wrap').append(zt_html);
                }
            },
            error:function(data){

            }
        })
    }else {
        $('.article-zt-list-wrap').remove();
    }
});
/*
* 选中专题名到编辑器
* */
$(document).on('click','.js-zt-info',function(){
    var $t = $(this),zt_href = $t.attr('data-href'),zt_name = $t.text();
    var zt_value = '<a href="'+ zt_href +'" target="_blank">'+zt_name+'</a>';
    UE.getEditor('myEditor').execCommand('insertHtml', zt_value);
    $('.article-zt-list-wrap').remove();
});


/*
 * 待审核作者投稿信息
 * */

var remarkTimer = null;
$(document).on('mouseenter','.js-article-author',function(){
    clearTimeout(remarkTimer);
    var t = $(this),
        author_info = t.parents('.active-list-box').find('.article-to-audit-wrap'),
        aid = t.parents('.active-list-box').attr('aid'),
        url = '/article/article_author_stat';

    $('.article-to-audit-wrap').addClass('hide');

    $.ajax({
        type: 'post',
        url: url,
        data: {
            aid: aid
        },
        dataType: 'json',
        async: true,
        success: function(data){
            if(data.success){
                author_info.empty().append(data.data);
                author_info.removeClass('hide');
            }
        }
    });
});

$(document).on('mouseleave','.js-article-author',function(){
    clearTimeout(remarkTimer);
    var t = $(this);
    remarkTimer = setTimeout(function(){
        t.parents('.active-list-box').find('.article-to-audit-wrap').addClass('hide');
    },200);
});

$(document).on('mouseenter','.article-to-audit-wrap',function(){
    clearTimeout(remarkTimer);
    var t = $(this);
    t.removeClass('hide');
});

$(document).on('mouseleave','.article-to-audit-wrap',function(){
    clearTimeout(remarkTimer);
    var t = $(this);
    remarkTimer = setTimeout(function(){
        t.addClass('hide');
    },200);
});



/*
* 待审核作者添加备注弹层
* */
$(document).on('click','.js-remark-icon',function(){
    var t = $(this),
        authorId = t.parents('.article-author-tg-info').find('#author-id').attr('data-uid'),
        remarkInfo = t.prev($('.js-remark-wrap')).html(),
        remarkText = '',
        remarkBtnWrap = '<button class="btn btn-primary js-remark-sure" data-uid="'+authorId+'">确定</button>';

    if(remarkInfo == ''){
        remarkText = '<textarea type="text" class="alert-remark-text"></textarea>';
    }else {
        remarkText = '<textarea type="text" class="alert-remark-text">'+remarkInfo+'</textarea>';
    }
    dialogBox('remarkWrap','备注', remarkText,remarkBtnWrap);
});

$(document).on('click','.js-remark-sure',function(){
    var url = '/permission/update_user_remark',
        t = $(this),
        postData = {
            uid: t.attr('data-uid'),
            remark: t.parents('#remarkWrap').find('.alert-remark-text').val(),
            huxiu_hash_code: huxiu_hash_code
        };
    $('.article-to-audit-wrap').addClass('hide');

    $.ajax({
        type: 'post',
        url: url,
        data: postData,
        dataType: 'json',
        async: true,
        success: function (data) {
            if(data.success){
                if ($('#remarkWrap').length > 0) {
                    $('#remarkWrap').remove();
                    $('.modal-backdrop').remove();
                }
            }else {
                Messenger().post({
                    message: data.error,
                    type: 'error',
                    showCloseButton: true
                });
            }
        }
    })
});


//资讯改版 20170913 通用专栏删除已选中
$(document).on("click",".js-commonColumnLiDelete",function(){
    var t = $(this);
    t.parent("li").remove();
});

//动态获取通用专栏下拉列表项
$(document).on("change",".js-commonColumn-option",function(){
    var t = $(this);
    var max_num = t.attr('data-num');
    var now_num = t.next(".commonColumnBox").find("li.active").length;
    var t_id = $(".js-commonColumn-option").find("option:selected").attr("data-id");

    //去重判断
    collection = [];
    collection_ids = $('.js-commonColumn-option').next(".commonColumnBox").find("li.active span");
    $.each(collection_ids,function(index){
        var t3 = $(this);
        collection[index] = t3.attr('data-collection_id');
    });
    if(collection.length > 0 && $.inArray(t_id, collection) >= 0){
        return false;
    }

    if((now_num < max_num) && (t_id != 0) ){
        var t_value = t.val();
        var t_optionLi = '<li class="active">' +
            '<span data-collection_id="'+ t_id +'">'+ t_value +'</span>' +
            '<p class="commonColumnLiDelete js-commonColumnLiDelete"></p>' +
            '</li>';
        $(".commonColumn .commonColumnBox").append(t_optionLi);
    }else if(now_num >= max_num){
        Messenger().post({
            message:"通用专栏选择上限5个哦",
            type: 'error',
            showCloseButton: true
        });
    }

});


//feed置顶modal
$(document).on('click','.feed-top-modal',function(){
    var t = $(this);
    var aid = t.attr('aid');
    var title = '置顶普通文章';
    if(t.attr('relation_type')=='collection' || t.attr('relation_type')=='column'){
        title = '置顶专栏文章';
    }
    var timestamp = t.attr('publish-time');
    var minDateTimeStr = formatTopDatetime(timestamp);
    //默认结束时间为发布时间的2小时后
    var defaultTopEndStr = formatTopDatetime(parseInt(timestamp) + 7200);
    mixDatetimeHtml = '<input type="hidden" id="minDateTime" value="'+minDateTimeStr+'"/>';

    remarkBtnWrap = '<button class="btn btn-success js-top-sure" data-aid="'+aid+'" aria-hidden="true">确定</button>';

    remarkText = mixDatetimeHtml + '<p>开始时间: <input type="text" class="top-start-time" value="'+minDateTimeStr+'"></p><p>结束时间: <input type="text" class="top-end-time" value="'+defaultTopEndStr+'"></p><div id="dtBox"></div>';
    dialogBox('topModal',title, remarkText,remarkBtnWrap);
});

//格式化置顶时间(将发布时间向上取整为5分钟)
function formatTopDatetime(timestamp) {
    var remainder = timestamp % 300;
    var need_add_second = 300 - remainder;
    var newTimestamp = parseInt(timestamp) + parseInt(need_add_second);

    var addZero = function (v){
        return v<10 ? '0'+v : v;
    };
    //timestamp是整数，否则要parseInt转换
    var time = new Date(newTimestamp * 1000);
    var year = time.getFullYear();
    var month = time.getMonth()+1;
    var day = time.getDate();
    var hour = time.getHours();
    var minute = time.getMinutes();

    var remainder = minute % 5;
    if(remainder > 0){
        minute = minute + (5 - remainder);
    }
    if(minute > 59){
        hour += minute / 60;
        minute = minute % 60;
    }
    if(hour > 23){
        day = day + 1;
        hour = hour % 24;
    }

    var res = year+'-'+addZero(month)+'-'+addZero(day)+' '+addZero(hour)+':'+addZero(minute);

    return res;
};


//时间input绑定生成时间选择器方法
$(document).on('click','.top-start-time',function(){
    makeDateTimePicker('.top-start-time');
});
$(document).on('click','.top-end-time',function(){
    makeDateTimePicker('.top-end-time');
});

//检测置顶时间
$(document).delegate('.js-top-sure','click',function(){
    var start_time = $('.top-start-time').val();
    var end_time = $('.top-end-time').val();
    var post_data = {
        'start_time':start_time,
        'end_time':end_time
    };
    $.ajax({
        type: 'post',
        url: '/article/checkTopTime',
        data: post_data,
        dataType: 'json',
        async: true,
        success: function(data){
            if(data.result == 1){
                // console.log(data);
                // return false;
                if(data.data.confict && data.data.confict.length>0){
                    // var remindHtml = '<p>检测置顶时间冲突</p>';
                    // $.each(data.data.confict,function(k,v){
                    //     remindHtml += '<p>'+v.name+'，置顶时间:'+v.startTime+' - '+v.endTime+'</p>';
                    // });
                    // remindHtml += '<p>当前置顶时间:'+start_time+' - '+end_time+'</p>';
                    // remindHtml += '<p>是否继续设置当前置顶时间?</p>';

                    var remindHtml = '检测置顶时间冲突\n';
                    $.each(data.data.confict,function(k,v){
                        remindHtml += v.name+'置顶时间: '+v.startTime+' - '+v.endTime+'\n';
                    });
                    remindHtml += '当前置顶时间: '+start_time+' - '+end_time+'\n';
                    remindHtml += '是否继续设置当前置顶时间?\n';
                    // console.log(remindHtml);
                    if(confirm(remindHtml)){
                        feed_top();
                    }
                }else{
                    feed_top();
                }
            }else{
                alert(data.msg);
            }
        },
        error:function(e){
            Messenger().post({
                message: e.msg,
                type: 'error',
                showCloseButton: true
            });
        }
    })
});

//确定置顶confirm
$(document).delegate('#feed_top_confirm', 'click', function(){
    feed_top();
});

//置顶请求方法
function feed_top(){
    var aid = $(".js-top-sure").attr("data-aid");
    var start_time = $('.top-start-time').val();
    var end_time = $('.top-end-time').val();
    var post_data = {
        'aid':aid,
        'start_time':start_time,
        'end_time':end_time
    };
    $.ajax({
        type: 'post',
        url: '/article/feed_top_handle',
        data: post_data,
        dataType: 'json',
        async: true,
        success: function(data){
            if(data.result == 1){
                Messenger().post({message: data.msg, type: 'success',showCloseButton: true });
            }else{
                Messenger().post({message: data.msg, type: 'error',showCloseButton: true });
            }
        },
        error:function(e){
            Messenger().post({
                message: e.msg,
                type: 'error',
                showCloseButton: true
            });
        }
    })

    $("#topModal").modal("hide");
}

//时间选择器事件
function makeDateTimePicker(inputName){
    var minDateTime = $("#minDateTime").val();
    var inputNode = $(inputName);
    $("#dtBox").DateTimePicker({
        isInline: true,
        mode: "datetime",
        minuteInterval: 5,  //分钟间隔
        minDateTime: minDateTime,
        dateTimeFormat: "yyyy-MM-dd HH:mm",
        shortMonthNames: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
        inputElement: inputNode,
        buttonsToDisplay: [],
        showHeader: false,
        readonlyInputs: false,
        setValueInTextboxOnEveryClick: true,
        settingValueOfElement: function(oDTP, sElemValue, dElemValue)
        {
            //要显示的日期格式处理
            inputNode.html(oDTP);
        }
    });

    $(".dtpicker-compValue").css({
        "margin-left":"-5px"
    });
}

//4.7资讯改版 添加通用专栏、特殊专栏 搜索关联人
if($("#columnPerson").length > 0){
    $("#columnPerson").select2({
        placeholder: "",
        multiple: true,
        maximumSelectionSize: 1,
        query: function (query){
            $.ajax({
                type: 'post',
                url: "/article/search_author?keyword="+query.term+"&huxiu_hash_code=" + huxiu_hash_code,
                dataType: 'json',
                async: true,
                success: function(data){
                    var data2 = {results: []};
                    if(data.result == 1){
                        $.each(data.data, function(v,k){
                            data2.results.push({id: k.id, text: k.title });
                        });
                    }
                    query.callback(data2);
                },
                error:function(e){
                    console.log(e);
                }
            });
        }
    });

    if(typeof(article_author_data)!='undefined'){
        $('#columnPerson').select2('data',article_author_data);
    }

}


//标题打分按钮事件
$(document).on('click','#hx-title-check-help',function(){
    var agent = navigator.userAgent.toLowerCase();
    var url_protocol = window.location.protocol;
    var url_server_update = "//api-alpha.huxiu.com/version";
    var ext_pack_name = 'hx_clue_ext_pro';
    var ext_pack_url = "//api-alpha.huxiu.com/static/hx_clue_ext_pro.crx";
    var url_help_doc = '//api-alpha.huxiu.com/static/hx_clue_ext_doc.docx';
    //chrome
    if(agent.indexOf("chrome") > 0){
        //渲染modal
        remarkText = '<p><a style="font-size:16px;" href="'+ url_protocol + url_help_doc +'" download>下载安装说明文档</a></p><p><a style="font-size:16px;" href="'+ url_protocol + ext_pack_url +'" download>下载虎算安装包</a></p>';
        dialogBox('titleCheckHelp','&nbsp;', remarkText,'');
    }else{
        //非chrome
        alert('此功能只支持Chrome浏览器，建议您更换Chrome浏览器');
    }
});

//弹窗活动推广 4.8.1 20171214 列表排序接口
$(document).on("click",".js-promotion-active-btn",function(){
    var t = $(this);
    var t_sorts = {};
    var dataPost = {
        sorts: t_sorts
    };

    var sortStatus = true;
    $(".white-list-table tbody tr").each(function(index,ele){
        var t_id = $(ele).attr("data-paid");
        var t_value = $(ele).find(".sortVal").val();
        if(!t_value){
            Messenger().post({
                message: "优先级不能为空",
                type: 'error',
                hideAfter: 3,
                showCloseButton: true
            });
            sortStatus = false;
            return false;
        }
        t_sorts[t_id] = t_value;
    });

    if(!t.hasClass("disabled") && sortStatus){
        t.addClass("disabled");
        $.ajax({
            url: "/promotion_active/updatePromotionActiveSort",
            data: dataPost,
            dataType: "json",
            type: "post",
            success: function (data) {
                console.log(data);
                if(data.success){
                    Messenger().post({
                        message: data.data.message,
                        type: 'success',
                        showCloseButton: true
                    });
                    window.location.reload();
                }else{
                    Messenger().post({
                        message: data.error.message,
                        type: 'error',
                        showCloseButton: true
                    });
                }
                t.removeClass("disabled");
            }
        });
    }
});

//运营活动弹窗 启动 暂停 删除接口
$(document).on("click",".js-promotion-control",function(){
    var t = $(this);
    var t_id = t.parents("tr").attr("data-paid");
    var t_status = t.attr("data-status");
    var t_type = t.attr("data-type");
    if(t_type == "del"){
        //删除接口 弹窗提示
        var delBtn = '<p style="height:50px;"></p><div class="modal-footer">' +
            '<div class="btn btn-primary js-promotion-del-sureBtn" data-status="' +
            t_status +
            '" data-id="' +
            t_id +
            '">' +
            '确定' +
            '</div>' +
            '</div>';
        htmlBox("promotion","确认要删除吗？",delBtn);
        return false;
    }

    var dataPost = {
        id: t_id,
        status: t_status
    };

    if(!t.hasClass("disabled")){
        t.addClass("disabled");
        $.ajax({
            url: "/promotion_active/change",
            data: dataPost,
            dataType: "json",
            type: "post",
            success: function (data) {
                console.log(data);
                if(data.success){
                    Messenger().post({
                        message: data.data.message,
                        type: 'success',
                        showCloseButton: true
                    });
                    window.location.reload();
                }else{
                    Messenger().post({
                        message: data.error.message,
                        type: 'error',
                        showCloseButton: true
                    });
                }
                t.removeClass("disabled");
            }
        });
    }
});

//运营活动推广 列表右侧的删除确认
$(document).on("click",".js-promotion-del-sureBtn",function(){
    var t = $(this);
    var t_id = t.attr("data-id");
    var t_status = t.attr("data-status");
    var dataPost = {
        id: t_id,
        status: t_status
    };

    if(!t.hasClass("disabled")){
        t.addClass("disabled");
        $.ajax({
            url: "/promotion_active/change",
            data: dataPost,
            dataType: "json",
            type: "post",
            success: function (data) {
                console.log(data);
                if(data.success){
                    Messenger().post({
                        message: data.data.message,
                        type: 'success',
                        showCloseButton: true
                    });
                    window.location.reload();
                }else{
                    Messenger().post({
                        message: data.error.message,
                        type: 'error',
                        showCloseButton: true
                    });
                }
                t.removeClass("disabled");
            }
        });
    }
});

//运营活动弹窗 图片上传接口
commonComponents.formDataUpImg("js-promotion-active-upImg","/tool/imageUpload/ad");

//运营活动弹窗 添加 编辑 按钮
$(document).on("click",".js-promotion-save",function(){
    var t = $(this);

    //先检查必填项是否为空
    var data_require = $("[data-require = 'true']");
    var checkVal = checkRequired(data_require);

    var t_name = $("#title").val();
    var t_start_time = $("#start_time").val();
    var t_end_time = $("#end_time").val();
    var t_img_path = $("#js-promotion-active-upImg").attr("data-imgurl");
    var t_url_path = $("#url_path").val();

    //发布渠道的获取
    var t_channels = [];
    var t_channelIOSStatus = $(".js-channelIOS").prop("checked");
    var t_channelIOSValue = $(".js-channelIOS").val();
    if(t_channelIOSStatus){
        t_channels.push(t_channelIOSValue);
    }

    $(".js-singleLi").each(function(index,ele){
        var t = $(ele);
        if(t.hasClass("active")){
            var t_androidValue = t.attr("data-channel");
            t_channels.push(t_androidValue);
        }
    });
    console.log(t_channels);

    //用户群 选择的获取
    var t_types = [];
    var t_userTotal = $(".js-userTotal").prop("checked");
    if(t_userTotal){
        var t_userTotalValue = $(".js-userTotal").val();
        t_types.push(t_userTotalValue);
    }

    //如果选择了部分用户选项，但具体选项没有选，弹窗提示
    var t_userClassRadio = $(".js-userRadioBtn").prop("checked");
    var t_userClassSingleFlag = false;

    $(".js-userClass").each(function(index,ele){
        var t = $(this);
        if(t.prop("checked")){
            //只要有一个具体选项选中flag就为true
            t_userClassSingleFlag = true;
            var t_userRadio = t.val();
            t_types.push(t_userRadio);
        }
    });

    if(t_userClassRadio && !t_userClassSingleFlag){
        Messenger().post({
            message: "仅限指定用户，下面至少选中一类用户",
            type: 'error',
            showCloseButton: true
        });
        return false;
    }

    console.log(t_types);

    var dataPost = {
        name: t_name,
        start_time: t_start_time,
        end_time: t_end_time,
        url_path: t_url_path,
        img_path: t_img_path,
        types: t_types,
        channels: t_channels
    };

    var t_data_type = t.attr("data-type");
    var t_dataId = t.attr("data-id");

    //如果类型为edit，则增加参数id
    if(t_data_type == "edit"){
        dataPost["id"] = t_dataId;
    }

    if(checkVal){
        if(!t.hasClass("disabled")){
            t.addClass("disabled");
            $.ajax({
                url: "/promotion_active/save",
                data: dataPost,
                dataType: "json",
                type: "post",
                success: function (data) {
                    console.log(data);
                    if(data.success){
                        Messenger().post({
                            message: data.data.message,
                            type: 'success',
                            showCloseButton: true
                        });
                        window.location.href = "/promotion_active/index";
                    }else{
                        Messenger().post({
                            message: data.error.message,
                            type: 'error',
                            showCloseButton: true
                        });
                    }
                    t.removeClass("disabled");
                }
            });
        }
    }
});

//运营弹窗推广 安卓渠道全选 全不选效果
$(document).on("click",".js-channel-android",function(){
    var t = $(this);
    if(t.prop("checked")){
        t.parent("li").find(".channel_info .singleLi").addClass("active");
    }else{
        t.parent("li").find(".channel_info .singleLi").removeClass("active");
    }
});

//运营弹窗推广 用户设置 选择逻辑
$(document).on("click",".js-userClass",function(){
    var t = $(this);
    var t_parentRadio = t.parents(".userClassLi").find("input.userRadio");
    if(!t_parentRadio.prop("checked")){
        t_parentRadio.prop("checked",true);
    }
});

$(document).on("click",".js-userTotal",function(){
    var t = $(this);
    var t_userPartRadio = t.parents(".userClassBox").find(".js-userClass");
    $(t_userPartRadio).each(function(index,ele){
        if($(ele).prop("checked")){
            $(ele).prop("checked",false);
        }
    });
});



