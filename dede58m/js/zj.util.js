/*
 * zj.util
 * Copyright (c) 2012 wwwh.hbbaijie.cn
 * Version : 2.6
 */
String.prototype.trim = function() {return (this.replace(/^\s+|\s+$/g,""));}
String.prototype.ltrim = function() {return (this.replace(/^\s*/,""));}
String.prototype.rtrim = function() {return (this.replace(/\s*$/,""));}

var zj = {
    setHome: function () {
        var url = document.location.protocol + "//" + document.location.hostname;
        if (document.all) {
            document.body.style.behavior = 'url(#default#homepage)';
            document.body.setHomePage(url);
        } else if (window.sidebar) {
            if (window.netscape) {
                try {
                    netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
                } catch (e) {
                    alert("该操作被浏览器拒绝");
                }
            }
            var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
            prefs.setCharPref('browser.startup.homepage', url);
        }
    },
    addFavorite: function (url, title) {
        try {
            if (url == null) url = document.location.href;
            if (title == null) title = document.title;
            if (document.all) {
                window.external.addFavorite(url, title);
            } else if (window.sidebar) {
                window.sidebar.addPanel(title, url, "");
            }

        } catch (e) {
            alert("加入收藏失败，请使用Ctrl+D进行添加");
        }
    },
    getCookie: function (name) {
        var cookie_start = document.cookie.indexOf(name);
        var cookie_end = document.cookie.indexOf(";", cookie_start);
        if (cookie_start == -1) {
            return "";
        } else {
            var length = cookie_end > cookie_start ? cookie_end : document.cookie.length;
            var val = document.cookie.substring(cookie_start + name.length + 1, length);
            return unescape(val);
        }
    },
    setCookie: function (cookieName, cookieValue, seconds, path, domain, secure) {
        var expires = new Date();
        expires.setTime(expires.getTime() + seconds);
        document.cookie = escape(cookieName) + '=' + escape(cookieValue)
        + (expires ? '; expires=' + expires.toGMTString() : '')
        + (path ? '; path=' + path : '/')
        + (domain ? '; domain=' + domain : '')
        + (secure ? '; secure' : '');
    },
    deleteCookie: function (name) {
        var date = new Date();
        date.setTime(date.getTime() - 10000);
        document.cookie = name + "=a; expires=" + date.toGMTString();
    },
    enter: function (event, linkOpenType) {
        if (event.keyCode == 13 && !(event.srcElement && (event.srcElement.tagName.toLowerCase() == "textarea"))) {
            var defaultButton = jQuery(linkOpenType);
            if (defaultButton && typeof (defaultButton.click) != "undefined") {
                defaultButton.click();
                event.cancelBubble = true;
                if (event.stopPropagation)
                    event.stopPropagation();
                return false;
            }
        }
        return true;
    },
    tabOver: function (tabName, divName, hoverCss) {
        jQuery("[name='" + tabName + "'] li").hover(function () {
            jQuery("[name='" + divName + "'] > div").hide();
            jQuery("[name='" + tabName + "'] li").removeClass(hoverCss);
            alert(jQuery("[name='" + divName + "'] > div").eq(jQuery(this).index()).html());
            jQuery("[name='" + divName + "'] > div").eq(jQuery(this).index()).show();
        }, function () {
        });
    },
    tabClick: function (tabName, divName, hoverCss) {
        jQuery("[name='" + tabName + "'] li").click(function () {
            jQuery("[name='" + divName + "'] > div").hide();
            jQuery("[name='" + tabName + "']  li").removeClass(hoverCss);

            jQuery(this).addClass(hoverCss);
            jQuery("[name='" + divName + "'] > div").eq(jQuery(this).index()).show();
        });
    },
    getQuery: function (name, defaultValue) {
        var vStr = defaultValue;
        var search = document.location.search.toLowerCase();
        search = search.substring(1, search.length);

        var arr = search.split("&");
        for (i = 0; i < arr.length; i++) {
            var temp = arr[i].split("=");
            if (temp[0] == name) {
                vStr = temp[1];
                break;
            }
        }
        return vStr;
    },
    getQuery2: function (search, name) {
        var vStr = "";
        search = search.toLowerCase();
        search = search.substring(1, search.length);

        var arr = search.split("&");
        for (i = 0; i < arr.length; i++) {
            var temp = arr[i].split("=");
            if (temp[0] == name) {
                vStr = temp[1];
                break;
            }
        }
        return vStr;
    },
    addQuery: function (name, value) {
        var path = document.location.pathname;
        var search = document.location.search.toLowerCase();
        search = search.substring(1, search.length);
        var newSearch = "?";
        var arr = search.split("&");
        for (i = 0; i < arr.length; i++) {
            if (arr[i] == "") continue;
            var temp = arr[i].split("=");
            if (temp[0] == name) continue;
            newSearch += arr[i] + "&";
        }
        newSearch += name + "=" + value;
        return path + newSearch;
    },
    addQuery2: function (url, name, value) {
        var arr = url.split('?');
        if (arr.length == 1) return url + "?" + name + "=" + value;

        var path = arr[0];
        var search = arr[1];
       
        var newSearch = "?";
        var arr1 = search.split("&");
        for (i = 0; i < arr1.length; i++) {
            var temp = arr1[i].split("=");
            if (temp[0] == name) continue;
            newSearch += arr1[i] + "&";
        }
        newSearch += name + "=" + value;
        return path + newSearch;
    },
    getDomain: function () {
        var url = document.location.protocol + "//" + document.location.host;
        return url;
    },
    validTip: function (tipCss) {
        jQuery(tipCss).each(function () {
            var inputID = jQuery(this).attr("controltovalidate");
            var w = jQuery("#" + inputID).width();
            var offset = jQuery("#" + inputID).offset();
            var l = offset.left;
            var t = offset.top;
            jQuery(this).css({ left: l + w, top: t });
        });
    },
    validTipV: function (tipCss) {
        jQuery(tipCss).each(function () {
            var inputID = jQuery(this).attr("controltovalidate");
            var h = jQuery("#" + inputID).height();
            var offset = jQuery("#" + inputID).offset();
            var l = offset.left;
            var t = offset.top;
            jQuery(this).css({ left: l, top: t + h });
        });
    },
    fixImageSize: function (filter, w, h) {
        if (filter == null) return;
        if (w == null) w = 700;
        if (h == null) h = 2000;

        jQuery(filter).find("img").bind("load", function () {
            var img = jQuery(this).get(0);
            var heightWidth = img.offsetHeight / img.offsetWidth;
            var widthHeight = img.offsetWidth / img.offsetHeight;

            if (img.offsetHeight > 1)
                if (img.readyState != "complete") {
                    return false; //确保图片完全加载
                }
            if (img.offsetWidth > w) {
                img.width = w;
                img.height = w * heightWidth;
            }
            if (img.offsetHeight > h) {
                img.height = h;
                img.width = h * widthHeight;
            }
        });
    }
};