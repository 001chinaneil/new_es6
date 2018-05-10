"use strict";

/**
 * Select2 Chinese translation
 */
(function ($) {
    "use strict";

    $.fn.select2.locales['zh-CN'] = {
        formatNoMatches: function formatNoMatches() {
            return "没有找到匹配项";
        },
        formatInputTooShort: function formatInputTooShort(input, min) {
            var n = min - input.length;return "请再输入" + n + "个字符";
        },
        formatInputTooLong: function formatInputTooLong(input, max) {
            var n = input.length - max;return "请删掉" + n + "个字符";
        },
        formatSelectionTooBig: function formatSelectionTooBig(limit) {
            return "你只能选择最多" + limit + "项";
        },
        formatLoadMore: function formatLoadMore(pageNumber) {
            return "加载结果中…";
        },
        formatSearching: function formatSearching() {
            return "搜索中…";
        }
    };

    $.extend($.fn.select2.defaults, $.fn.select2.locales['zh-CN']);
})(jQuery);