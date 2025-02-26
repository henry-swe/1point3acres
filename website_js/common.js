var BROWSER = {};
var USERAGENT = navigator.userAgent.toLowerCase();
browserVersion({
    'ie': 'msie',
    'firefox': '',
    'chrome': '',
    'opera': '',
    'safari': '',
    'mozilla': '',
    'webkit': '',
    'maxthon': '',
    'qq': 'qqbrowser',
    'rv': 'rv'
});
if (BROWSER.safari) {
    BROWSER.firefox = true;
}
BROWSER.opera = BROWSER.opera ? opera.version() : 0;
HTMLNODE = document.getElementsByTagName('head')[0].parentNode;
if (BROWSER.ie) {
    BROWSER.iemode = parseInt(typeof document.documentMode != 'undefined' ? document.documentMode : BROWSER.ie);
    HTMLNODE.className = 'ie_all ie' + BROWSER.iemode;
}
var CSSLOADED = [];
var JSLOADED = [];
var JSMENU = [];
JSMENU['active'] = [];
JSMENU['timer'] = [];
JSMENU['drag'] = [];
JSMENU['layer'] = 0;
JSMENU['zIndex'] = {'win': 200, 'menu': 300, 'dialog': 400, 'prompt': 500};
JSMENU['float'] = '';
var CURRENTSTYPE = null;
var discuz_uid = isUndefined(discuz_uid) ? 0 : discuz_uid;
var creditnotice = isUndefined(creditnotice) ? '' : creditnotice;
var cookiedomain = isUndefined(cookiedomain) ? '' : cookiedomain;
var cookiepath = isUndefined(cookiepath) ? '' : cookiepath;
var EXTRAFUNC = [], EXTRASTR = '';
EXTRAFUNC['showmenu'] = [];
var DISCUZCODE = [];
DISCUZCODE['num'] = '-1';
DISCUZCODE['html'] = [];
var USERABOUT_BOX = true;
var USERCARDST = null;
var CLIPBOARDSWFDATA = '';
var NOTICETITLE = [];
var NOTICECURTITLE = document.title;
if (BROWSER.firefox && window.HTMLElement) {
    HTMLElement.prototype.__defineGetter__("innerText", function () {
        var anyString = "";
        var childS = this.childNodes;
        for (var i = 0; i < childS.length; i++) {
            if (childS[i].nodeType == 1) {
                anyString += childS[i].tagName == "BR" ? '\n' : childS[i].innerText;
            } else if (childS[i].nodeType == 3) {
                anyString += childS[i].nodeValue;
            }
        }
        return anyString;
    });
    HTMLElement.prototype.__defineSetter__("innerText", function (sText) {
        this.textContent = sText;
    });
    HTMLElement.prototype.__defineSetter__('outerHTML', function (sHTML) {
        var r = this.ownerDocument.createRange();
        r.setStartBefore(this);
        var df = r.createContextualFragment(sHTML);
        this.parentNode.replaceChild(df, this);
        return sHTML;
    });
    HTMLElement.prototype.__defineGetter__('outerHTML', function () {
        var attr;
        var attrs = this.attributes;
        var str = '<' + this.tagName.toLowerCase();
        for (var i = 0; i < attrs.length; i++) {
            attr = attrs[i];
            if (attr.specified) str += ' ' + attr.name + '="' + attr.value + '"';
        }
        if (!this.canHaveChildren) {
            return str + '>';
        }
        return str + '>' + this.innerHTML + '</' + this.tagName.toLowerCase() + '>';
    });
    HTMLElement.prototype.__defineGetter__('canHaveChildren', function () {
        switch (this.tagName.toLowerCase()) {
            case 'area':
            case 'base':
            case 'basefont':
            case 'col':
            case 'frame':
            case 'hr':
            case 'img':
            case 'br':
            case 'input':
            case 'isindex':
            case 'link':
            case 'meta':
            case 'param':
                return false;
        }
        return true;
    });
}

function $(id) {
    return !id ? null : document.getElementById(id);
}

function $C(classname, ele, tag) {
    var returns = [];
    ele = ele || document;
    tag = tag || '*';
    if (ele.getElementsByClassName) {
        var eles = ele.getElementsByClassName(classname);
        if (tag != '*') {
            for (var i = 0, L = eles.length; i < L; i++) {
                if (eles[i].tagName.toLowerCase() == tag.toLowerCase()) {
                    returns.push(eles[i]);
                }
            }
        } else {
            returns = eles;
        }
    } else {
        eles = ele.getElementsByTagName(tag);
        var pattern = new RegExp("(^|\\s)" + classname + "(\\s|$)");
        for (i = 0, L = eles.length; i < L; i++) {
            if (pattern.test(eles[i].className)) {
                returns.push(eles[i]);
            }
        }
    }
    return returns;
}

function _attachEvent(obj, evt, func, eventobj) {
    eventobj = !eventobj ? obj : eventobj;
    if (obj.addEventListener) {
        obj.addEventListener(evt, func, false);
    } else if (eventobj.attachEvent) {
        obj.attachEvent('on' + evt, func);
    }
}

function _detachEvent(obj, evt, func, eventobj) {
    eventobj = !eventobj ? obj : eventobj;
    if (obj.removeEventListener) {
        obj.removeEventListener(evt, func, false);
    } else if (eventobj.detachEvent) {
        obj.detachEvent('on' + evt, func);
    }
}

function browserVersion(types) {
    var other = 1;
    for (i in types) {
        var v = types[i] ? types[i] : i;
        if (USERAGENT.indexOf(v) != -1) {
            var re = new RegExp(v + '(\\/|\\s|:)([\\d\\.]+)', 'ig');
            var matches = re.exec(USERAGENT);
            var ver = matches != null ? matches[2] : 0;
            other = ver !== 0 && v != 'mozilla' ? 0 : other;
        } else {
            var ver = 0;
        }
        eval('BROWSER.' + i + '= ver');
    }
    BROWSER.other = other;
}

function getEvent() {
    if (document.all) return window.event;
    func = getEvent.caller;
    while (func != null) {
        var arg0 = func.arguments[0];
        if (arg0) {
            if ((arg0.constructor == Event || arg0.constructor == MouseEvent) || (typeof (arg0) == "object" && arg0.preventDefault && arg0.stopPropagation)) {
                return arg0;
            }
        }
        func = func.caller;
    }
    return null;
}

function isUndefined(variable) {
    return typeof variable == 'undefined' ? true : false;
}

function in_array(needle, haystack) {
    if (typeof needle == 'string' || typeof needle == 'number') {
        for (var i in haystack) {
            if (haystack[i] == needle) {
                return true;
            }
        }
    }
    return false;
}

function trim(str) {
    return (str + '').replace(/(\s+)$/g, '').replace(/^\s+/g, '');
}

function strlen(str) {
    return (BROWSER.ie && str.indexOf('\n') != -1) ? str.replace(/\r?\n/g, '_').length : str.length;
}

function mb_strlen(str) {
    var len = 0;
    for (var i = 0; i < str.length; i++) {
        len += str.charCodeAt(i) < 0 || str.charCodeAt(i) > 255 ? (charset == 'utf-8' ? 3 : 2) : 1;
    }
    return len;
}

function mb_cutstr(str, maxlen, dot) {
    var len = 0;
    var ret = '';
    var dot = !dot ? '...' : dot;
    maxlen = maxlen - dot.length;
    for (var i = 0; i < str.length; i++) {
        len += str.charCodeAt(i) < 0 || str.charCodeAt(i) > 255 ? (charset == 'utf-8' ? 3 : 2) : 1;
        if (len > maxlen) {
            ret += dot;
            break;
        }
        ret += str.substr(i, 1);
    }
    return ret;
}

function preg_replace(search, replace, str, regswitch) {
    var regswitch = !regswitch ? 'ig' : regswitch;
    var len = search.length;
    for (var i = 0; i < len; i++) {
        re = new RegExp(search[i], regswitch);
        str = str.replace(re, typeof replace == 'string' ? replace : (replace[i] ? replace[i] : replace[0]));
    }
    return str;
}

function htmlspecialchars(str) {
    return preg_replace(['&', '<', '>', '"'], ['&amp;', '&lt;', '&gt;', '&quot;'], str);
}

function display(id) {
    var obj = $(id);
    if (obj.style.visibility) {
        obj.style.visibility = obj.style.visibility == 'visible' ? 'hidden' : 'visible';
    } else {
        obj.style.display = obj.style.display == '' ? 'none' : '';
    }
}

function checkall(form, prefix, checkall) {
    var checkall = checkall ? checkall : 'chkall';
    count = 0;
    for (var i = 0; i < form.elements.length; i++) {
        var e = form.elements[i];
        if (e.name && e.name != checkall && !e.disabled && (!prefix || (prefix && e.name.match(prefix)))) {
            e.checked = form.elements[checkall].checked;
            if (e.checked) {
                count++;
            }
        }
    }
    return count;
}

function setcookie(cookieName, cookieValue, seconds, path, domain, secure) {
    if (cookieValue == '' || seconds < 0) {
        cookieValue = '';
        seconds = -2592000;
    }
    if (seconds) {
        var expires = new Date();
        expires.setTime(expires.getTime() + seconds * 1000);
    }
    domain = !domain ? cookiedomain : domain;
    path = !path ? cookiepath : path;
    document.cookie = escape(cookiepre + cookieName) + '=' + escape(cookieValue) + (expires ? '; expires=' + expires.toGMTString() : '') + (path ? '; path=' + path : '/') + (domain ? '; domain=' + domain : '') + (secure ? '; secure' : '');
}

function getcookie(name, nounescape) {
    name = cookiepre + name;
    var cookie_start = document.cookie.indexOf(name);
    var cookie_end = document.cookie.indexOf(";", cookie_start);
    if (cookie_start == -1) {
        return '';
    } else {
        var v = document.cookie.substring(cookie_start + name.length + 1, (cookie_end > cookie_start ? cookie_end : document.cookie.length));
        return !nounescape ? unescape(v) : v;
    }
}

function Ajax(recvType, waitId) {
    var aj = new Object();
    aj.loading = '请稍候...';
    aj.recvType = recvType ? recvType : 'XML';
    aj.waitId = waitId ? $(waitId) : null;
    aj.resultHandle = null;
    aj.sendString = '';
    aj.targetUrl = '';
    aj.setLoading = function (loading) {
        if (typeof loading !== 'undefined' && loading !== null) aj.loading = loading;
    };
    aj.setRecvType = function (recvtype) {
        aj.recvType = recvtype;
    };
    aj.setWaitId = function (waitid) {
        aj.waitId = typeof waitid == 'object' ? waitid : $(waitid);
    };
    aj.createXMLHttpRequest = function () {
        var request = false;
        if (window.XMLHttpRequest) {
            request = new XMLHttpRequest();
            if (request.overrideMimeType) {
                request.overrideMimeType('text/xml');
            }
        } else if (window.ActiveXObject) {
            var versions = ['Microsoft.XMLHTTP', 'MSXML.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.7.0', 'Msxml2.XMLHTTP.6.0', 'Msxml2.XMLHTTP.5.0', 'Msxml2.XMLHTTP.4.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP'];
            for (var i = 0; i < versions.length; i++) {
                try {
                    request = new ActiveXObject(versions[i]);
                    if (request) {
                        return request;
                    }
                } catch (e) {
                }
            }
        }
        return request;
    };
    aj.XMLHttpRequest = aj.createXMLHttpRequest();
    aj.showLoading = function () {
        if (aj.waitId && (aj.XMLHttpRequest.readyState != 4 || aj.XMLHttpRequest.status != 200)) {
            aj.waitId.style.display = '';
            aj.waitId.innerHTML = '<span><img src="' + IMGDIR + '/loading.gif" class="vm"> ' + aj.loading + '</span>';
        }
    };
    aj.processHandle = function () {
        if (aj.XMLHttpRequest.readyState == 4 && aj.XMLHttpRequest.status == 200) {
            if (aj.waitId) {
                aj.waitId.style.display = 'none';
            }
            if (aj.recvType == 'HTML') {
                aj.resultHandle(aj.XMLHttpRequest.responseText, aj);
            } else if (aj.recvType == 'XML') {
                if (!aj.XMLHttpRequest.responseXML || !aj.XMLHttpRequest.responseXML.lastChild || aj.XMLHttpRequest.responseXML.lastChild.localName == 'parsererror') {
                    aj.resultHandle('<a href="' + aj.targetUrl + '" target="_blank" style="color:red">内部错误，无法显示此内容</a>', aj);
                } else {
                    aj.resultHandle(aj.XMLHttpRequest.responseXML.lastChild.firstChild.nodeValue, aj);
                }
            } else if (aj.recvType == 'JSON') {
                var s = null;
                try {
                    s = (new Function("return (" + aj.XMLHttpRequest.responseText + ")"))();
                } catch (e) {
                    s = null;
                }
                aj.resultHandle(s, aj);
            }
        }
    };
    aj.get = function (targetUrl, resultHandle) {
        targetUrl = hostconvert(targetUrl);
        setTimeout(function () {
            aj.showLoading()
        }, 250);
        aj.targetUrl = targetUrl;
        aj.XMLHttpRequest.onreadystatechange = aj.processHandle;
        aj.resultHandle = resultHandle;
        var attackevasive = isUndefined(attackevasive) ? 0 : attackevasive;
        if (window.XMLHttpRequest) {
            aj.XMLHttpRequest.open('GET', aj.targetUrl);
            aj.XMLHttpRequest.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            aj.XMLHttpRequest.send(null);
        } else {
            aj.XMLHttpRequest.open("GET", targetUrl, true);
            aj.XMLHttpRequest.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            aj.XMLHttpRequest.send();
        }
    };
    aj.post = function (targetUrl, sendString, resultHandle) {
        targetUrl = hostconvert(targetUrl);
        setTimeout(function () {
            aj.showLoading()
        }, 250);
        aj.targetUrl = targetUrl;
        aj.sendString = sendString;
        aj.XMLHttpRequest.onreadystatechange = aj.processHandle;
        aj.resultHandle = resultHandle;
        aj.XMLHttpRequest.open('POST', targetUrl);
        aj.XMLHttpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        aj.XMLHttpRequest.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        aj.XMLHttpRequest.send(aj.sendString);
    };
    aj.getJSON = function (targetUrl, resultHandle) {
        aj.setRecvType('JSON');
        aj.get(targetUrl + '&ajaxdata=json', resultHandle);
    };
    aj.getHTML = function (targetUrl, resultHandle) {
        aj.setRecvType('HTML');
        aj.get(targetUrl + '&ajaxdata=html', resultHandle);
    };
    return aj;
}

function getHost(url) {
    var host = "null";
    if (typeof url == "undefined" || null == url) {
        url = window.location.href;
    }
    var regex = /^\w+\:\/\/([^\/]*).*/;
    var match = url.match(regex);
    if (typeof match != "undefined" && null != match) {
        host = match[1];
    }
    return host;
}

function hostconvert(url) {
    if (!url.match(/^https?:\/\//)) url = SITEURL + url;
    var url_host = getHost(url);
    var cur_host = getHost().toLowerCase();
    if (url_host && cur_host != url_host) {
        url = url.replace(url_host, cur_host);
    }
    return url;
}

function newfunction(func) {
    var args = [];
    for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
    return function (event) {
        doane(event);
        window[func].apply(window, args);
        return false;
    }
}

function evalscript(s) {
    if (s.indexOf('<script') == -1) return s;
    var p = /<script[^\>]*?>([^\x00]*?)<\/script>/ig;
    var arr = [];
    while (arr = p.exec(s)) {
        var p1 = /<script[^\>]*?src=\"([^\>]*?)\"[^\>]*?(reload=\"1\")?(?:charset=\"([\w\-]+?)\")?><\/script>/i;
        var arr1 = [];
        arr1 = p1.exec(arr[0]);
        if (arr1) {
            appendscript(arr1[1], '', arr1[2], arr1[3]);
        } else {
            p1 = /<script(.*?)>([^\x00]+?)<\/script>/i;
            arr1 = p1.exec(arr[0]);
            appendscript('', arr1[2], arr1[1].indexOf('reload=') != -1);
        }
    }
    return s;
}

var safescripts = {}, evalscripts = [];

function safescript(id, call, seconds, times, timeoutcall, endcall, index) {
    seconds = seconds || 1000;
    times = times || 0;
    var checked = true;
    try {
        if (typeof call == 'function') {
            call();
        } else {
            eval(call);
        }
    } catch (e) {
        checked = false;
    }
    if (!checked) {
        if (!safescripts[id] || !index) {
            safescripts[id] = safescripts[id] || [];
            safescripts[id].push({
                'times': 0, 'si': setInterval(function () {
                    safescript(id, call, seconds, times, timeoutcall, endcall, safescripts[id].length);
                }, seconds)
            });
        } else {
            index = (index || 1) - 1;
            safescripts[id][index]['times']++;
            if (safescripts[id][index]['times'] >= times) {
                clearInterval(safescripts[id][index]['si']);
                if (typeof timeoutcall == 'function') {
                    timeoutcall();
                } else {
                    eval(timeoutcall);
                }
            }
        }
    } else {
        try {
            index = (index || 1) - 1;
            if (safescripts[id][index]['si']) {
                clearInterval(safescripts[id][index]['si']);
            }
            if (typeof endcall == 'function') {
                endcall();
            } else {
                eval(endcall);
            }
        } catch (e) {
        }
    }
}

function $F(func, args, script) {
    var run = function () {
        var argc = args.length, s = '';
        for (i = 0; i < argc; i++) {
            s += ',args[' + i + ']';
        }
        eval('var check = typeof ' + func + ' == \'function\'');
        if (check) {
            eval(func + '(' + s.substr(1) + ')');
        } else {
            setTimeout(function () {
                checkrun();
            }, 50);
        }
    };
    var checkrun = function () {
        if (JSLOADED[src]) {
            run();
        } else {
            setTimeout(function () {
                checkrun();
            }, 50);
        }
    };
    script = script || 'common_extra';
    src = JSPATH + script + '.js?' + VERHASH;
    if (!JSLOADED[src]) {
        appendscript(src);
    }
    checkrun();
}

function appendscript(src, text, reload, charset) {
    var id = hash(src + text);
    if (!reload && in_array(id, evalscripts)) return;
    if (reload && $(id)) {
        $(id).parentNode.removeChild($(id));
    }
    evalscripts.push(id);
    var scriptNode = document.createElement("script");
    scriptNode.type = "text/javascript";
    scriptNode.id = id;
    scriptNode.charset = charset ? charset : (BROWSER.firefox ? document.characterSet : document.charset);
    try {
        if (src) {
            scriptNode.src = src;
            scriptNode.onloadDone = false;
            scriptNode.onload = function () {
                scriptNode.onloadDone = true;
                JSLOADED[src] = 1;
            };
            scriptNode.onreadystatechange = function () {
                if ((scriptNode.readyState == 'loaded' || scriptNode.readyState == 'complete') && !scriptNode.onloadDone) {
                    scriptNode.onloadDone = true;
                    JSLOADED[src] = 1;
                }
            };
        } else if (text) {
            scriptNode.text = text;
        }
        document.getElementsByTagName('head')[0].appendChild(scriptNode);
    } catch (e) {
    }
}

function stripscript(s) {
    return s.replace(/<script.*?>.*?<\/script>/ig, '');
}

function ajaxupdateevents(obj, tagName) {
    tagName = tagName ? tagName : 'A';
    var objs = obj.getElementsByTagName(tagName);
    for (k in objs) {
        var o = objs[k];
        ajaxupdateevent(o);
    }
}

function ajaxupdateevent(o) {
    if (typeof o == 'object' && o.getAttribute) {
        if (o.getAttribute('ajaxtarget')) {
            if (!o.id) o.id = Math.random();
            var ajaxevent = o.getAttribute('ajaxevent') ? o.getAttribute('ajaxevent') : 'click';
            var ajaxurl = o.getAttribute('ajaxurl') ? o.getAttribute('ajaxurl') : o.href;
            _attachEvent(o, ajaxevent, newfunction('ajaxget', ajaxurl, o.getAttribute('ajaxtarget'), o.getAttribute('ajaxwaitid'), o.getAttribute('ajaxloading'), o.getAttribute('ajaxdisplay')));
            if (o.getAttribute('ajaxfunc')) {
                o.getAttribute('ajaxfunc').match(/(\w+)\((.+?)\)/);
                _attachEvent(o, ajaxevent, newfunction(RegExp.$1, RegExp.$2));
            }
        }
    }
}

function ajaxget(url, showid, waitid, loading, display, recall) {
    waitid = typeof waitid == 'undefined' || waitid === null ? showid : waitid;
    var x = new Ajax();
    x.setLoading(loading);
    x.setWaitId(waitid);
    x.display = typeof display == 'undefined' || display == null ? '' : display;
    x.showId = $(showid);
    if (url.substr(strlen(url) - 1) == '#') {
        url = url.substr(0, strlen(url) - 1);
        x.autogoto = 1;
    }
    var url = url + '&inajax=1&ajaxtarget=' + showid;
    x.get(url, function (s, x) {
        var evaled = false;
        if (s.indexOf('ajaxerror') != -1) {
            evalscript(s);
            evaled = true;
        }
        if (!evaled && (typeof ajaxerror == 'undefined' || !ajaxerror)) {
            if (x.showId) {
                x.showId.style.display = x.display;
                ajaxinnerhtml(x.showId, s);
                ajaxupdateevents(x.showId);
                if (x.autogoto) scroll(0, x.showId.offsetTop);
            }
        }
        ajaxerror = null;
        if (recall && typeof recall == 'function') {
            recall();
        } else if (recall) {
            eval(recall);
        }
        if (!evaled) evalscript(s);
    });
}

function ajaxpost(formid, showid, waitid, showidclass, submitbtn, recall) {
    var waitid = typeof waitid == 'undefined' || waitid === null ? showid : (waitid !== '' ? waitid : '');
    var showidclass = !showidclass ? '' : showidclass;
    var ajaxframeid = 'ajaxframe';
    var ajaxframe = $(ajaxframeid);
    var curform = $(formid);
    var formtarget = curform.target;
    var handleResult = function () {
        var s = '';
        var evaled = false;
        showloading('none');
        try {
            s = $(ajaxframeid).contentWindow.document.XMLDocument.text;
        } catch (e) {
            try {
                s = $(ajaxframeid).contentWindow.document.documentElement.firstChild.wholeText;
            } catch (e) {
                try {
                    s = $(ajaxframeid).contentWindow.document.documentElement.firstChild.nodeValue;
                } catch (e) {
                    s = '内部错误，无法显示此内容';
                }
            }
        }
        if (s != '' && s.indexOf('ajaxerror') != -1) {
            evalscript(s);
            evaled = true;
        }
        if (showidclass) {
            if (showidclass != 'onerror') {
                $(showid).className = showidclass;
            } else {
                showError(s);
                ajaxerror = true;
            }
        }
        if (submitbtn) {
            submitbtn.disabled = false;
        }
        if (!evaled && (typeof ajaxerror == 'undefined' || !ajaxerror)) {
            ajaxinnerhtml($(showid), s);
        }
        ajaxerror = null;
        if (curform) curform.target = formtarget;
        if (typeof recall == 'function') {
            recall();
        } else {
            eval(recall);
        }
        if (!evaled) evalscript(s);
        ajaxframe.loading = 0;
        if (!BROWSER.firefox || BROWSER.safari) {
            $('append_parent').removeChild(ajaxframe.parentNode);
        } else {
            setTimeout(function () {
                $('append_parent').removeChild(ajaxframe.parentNode);
            }, 100);
        }
    };
    if (!ajaxframe) {
        var div = document.createElement('div');
        div.style.display = 'none';
        div.innerHTML = '<iframe name="' + ajaxframeid + '" id="' + ajaxframeid + '" loading="1"></iframe>';
        $('append_parent').appendChild(div);
        ajaxframe = $(ajaxframeid);
    } else if (ajaxframe.loading) {
        return false;
    }
    _attachEvent(ajaxframe, 'load', handleResult);
    showloading();
    curform.target = ajaxframeid;
    var action = curform.getAttribute('action');
    action = hostconvert(action);
    curform.action = action.replace(/\&inajax\=1/g, '') + '&inajax=1';
    curform.submit();
    if (submitbtn) {
        submitbtn.disabled = true;
    }
    doane();
    return false;
}

function ajaxmenu(ctrlObj, timeout, cache, duration, pos, recall, idclass, contentclass) {
    if (!ctrlObj.getAttribute('mid')) {
        var ctrlid = ctrlObj.id;
        if (!ctrlid) {
            ctrlObj.id = 'ajaxid_' + Math.random();
        }
    } else {
        var ctrlid = ctrlObj.getAttribute('mid');
        if (!ctrlObj.id) {
            ctrlObj.id = 'ajaxid_' + Math.random();
        }
    }
    var menuid = ctrlid + '_menu';
    var menu = $(menuid);
    if (isUndefined(timeout)) timeout = 3000;
    if (isUndefined(cache)) cache = 1;
    if (isUndefined(pos)) pos = '43';
    if (isUndefined(duration)) duration = timeout > 0 ? 0 : 3;
    if (isUndefined(idclass)) idclass = 'p_pop';
    if (isUndefined(contentclass)) contentclass = 'p_opt';
    var func = function () {
        showMenu({
            'ctrlid': ctrlObj.id,
            'menuid': menuid,
            'duration': duration,
            'timeout': timeout,
            'pos': pos,
            'cache': cache,
            'layer': 2
        });
        if (typeof recall == 'function') {
            recall();
        } else {
            eval(recall);
        }
    };
    if (menu) {
        if (menu.style.display == '') {
            hideMenu(menuid);
        } else {
            func();
        }
    } else {
        menu = document.createElement('div');
        menu.id = menuid;
        menu.style.display = 'none';
        menu.className = idclass;
        menu.innerHTML = '<div class="' + contentclass + '" id="' + menuid + '_content"></div>';
        $('append_parent').appendChild(menu);
        var url = (!isUndefined(ctrlObj.attributes['shref']) ? ctrlObj.attributes['shref'].value : (!isUndefined(ctrlObj.href) ? ctrlObj.href : ctrlObj.attributes['href'].value));
        url += (url.indexOf('?') != -1 ? '&' : '?') + 'ajaxmenu=1';
        ajaxget(url, menuid + '_content', 'ajaxwaitid', '', '', func);
    }
    doane();
}

function hash(string, length) {
    var length = length ? length : 32;
    var start = 0;
    var i = 0;
    var result = '';
    filllen = length - string.length % length;
    for (i = 0; i < filllen; i++) {
        string += "0";
    }
    while (start < string.length) {
        result = stringxor(result, string.substr(start, length));
        start += length;
    }
    return result;
}

function stringxor(s1, s2) {
    var s = '';
    var hash = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var max = Math.max(s1.length, s2.length);
    for (var i = 0; i < max; i++) {
        var k = s1.charCodeAt(i) ^ s2.charCodeAt(i);
        s += hash.charAt(k % 52);
    }
    return s;
}

function showPreview(val, id) {
    var showObj = $(id);
    if (showObj) {
        showObj.innerHTML = val.replace(/\n/ig, "<bupdateseccoder />");
    }
}

function showloading(display, waiting) {
    var display = display ? display : 'block';
    var waiting = waiting ? waiting : '请稍候...';
    $('ajaxwaitid').innerHTML = waiting;
    $('ajaxwaitid').style.display = display;
}

function ajaxinnerhtml(showid, s) {
    if (showid.tagName != 'TBODY') {
        showid.innerHTML = s;
    } else {
        while (showid.firstChild) {
            showid.firstChild.parentNode.removeChild(showid.firstChild);
        }
        var div1 = document.createElement('DIV');
        div1.id = showid.id + '_div';
        div1.innerHTML = '<table><tbody id="' + showid.id + '_tbody">' + s + '</tbody></table>';
        $('append_parent').appendChild(div1);
        var trs = div1.getElementsByTagName('TR');
        var l = trs.length;
        for (var i = 0; i < l; i++) {
            showid.appendChild(trs[0]);
        }
        var inputs = div1.getElementsByTagName('INPUT');
        var l = inputs.length;
        for (var i = 0; i < l; i++) {
            showid.appendChild(inputs[0]);
        }
        div1.parentNode.removeChild(div1);
    }
}

function doane(event, preventDefault, stopPropagation) {
    var preventDefault = isUndefined(preventDefault) ? 1 : preventDefault;
    var stopPropagation = isUndefined(stopPropagation) ? 1 : stopPropagation;
    e = event ? event : window.event;
    if (!e) {
        e = getEvent();
    }
    if (!e) {
        return null;
    }
    if (preventDefault) {
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }
    }
    if (stopPropagation) {
        if (e.stopPropagation) {
            e.stopPropagation();
        } else {
            e.cancelBubble = true;
        }
    }
    return e;
}

function loadcss(cssname) {
    if (!CSSLOADED[cssname]) {
        if (!$('css_' + cssname)) {
            css = document.createElement('link');
            css.id = 'css_' + cssname, css.type = 'text/css';
            css.rel = 'stylesheet';
            css.href = 'data/cache/style_' + STYLEID + '_' + cssname + '.css?' + VERHASH;
            var headNode = document.getElementsByTagName("head")[0];
            headNode.appendChild(css);
        } else {
            $('css_' + cssname).href = 'data/cache/style_' + STYLEID + '_' + cssname + '.css?' + VERHASH;
        }
        CSSLOADED[cssname] = 1;
    }
}

function showMenu(v) {
    var ctrlid = isUndefined(v['ctrlid']) ? v : v['ctrlid'];
    var showid = isUndefined(v['showid']) ? ctrlid : v['showid'];
    var menuid = isUndefined(v['menuid']) ? showid + '_menu' : v['menuid'];
    var ctrlObj = $(ctrlid);
    var menuObj = $(menuid);
    if (!menuObj) return;
    var mtype = isUndefined(v['mtype']) ? 'menu' : v['mtype'];
    var evt = isUndefined(v['evt']) ? 'mouseover' : v['evt'];
    var pos = isUndefined(v['pos']) ? '43' : v['pos'];
    var layer = isUndefined(v['layer']) ? 1 : v['layer'];
    var duration = isUndefined(v['duration']) ? 2 : v['duration'];
    var timeout = isUndefined(v['timeout']) ? 250 : v['timeout'];
    var maxh = isUndefined(v['maxh']) ? 600 : v['maxh'];
    var cache = isUndefined(v['cache']) ? 1 : v['cache'];
    var drag = isUndefined(v['drag']) ? '' : v['drag'];
    var dragobj = drag && $(drag) ? $(drag) : menuObj;
    var fade = isUndefined(v['fade']) ? 0 : v['fade'];
    var cover = isUndefined(v['cover']) ? 0 : v['cover'];
    var zindex = isUndefined(v['zindex']) ? JSMENU['zIndex']['menu'] : v['zindex'];
    var ctrlclass = isUndefined(v['ctrlclass']) ? '' : v['ctrlclass'];
    var winhandlekey = isUndefined(v['win']) ? '' : v['win'];
    zindex = cover ? zindex + 500 : zindex;
    if (typeof JSMENU['active'][layer] == 'undefined') {
        JSMENU['active'][layer] = [];
    }
    for (i in EXTRAFUNC['showmenu']) {
        try {
            eval(EXTRAFUNC['showmenu'][i] + '()');
        } catch (e) {
        }
    }
    if (evt == 'click' && in_array(menuid, JSMENU['active'][layer]) && mtype != 'win') {
        hideMenu(menuid, mtype);
        return;
    }
    if (mtype == 'menu') {
        hideMenu(layer, mtype);
    }
    if (ctrlObj) {
        if (!ctrlObj.getAttribute('initialized')) {
            ctrlObj.setAttribute('initialized', true);
            ctrlObj.unselectable = true;
            ctrlObj.outfunc = typeof ctrlObj.onmouseout == 'function' ? ctrlObj.onmouseout : null;
            ctrlObj.onmouseout = function () {
                if (this.outfunc) this.outfunc();
                if (duration < 3 && !JSMENU['timer'][menuid]) {
                    JSMENU['timer'][menuid] = setTimeout(function () {
                        hideMenu(menuid, mtype);
                    }, timeout);
                }
            };
            ctrlObj.overfunc = typeof ctrlObj.onmouseover == 'function' ? ctrlObj.onmouseover : null;
            ctrlObj.onmouseover = function (e) {
                doane(e);
                if (this.overfunc) this.overfunc();
                if (evt == 'click') {
                    clearTimeout(JSMENU['timer'][menuid]);
                    JSMENU['timer'][menuid] = null;
                } else {
                    for (var i in JSMENU['timer']) {
                        if (JSMENU['timer'][i]) {
                            clearTimeout(JSMENU['timer'][i]);
                            JSMENU['timer'][i] = null;
                        }
                    }
                }
            };
        }
    }
    if (!menuObj.getAttribute('initialized')) {
        menuObj.setAttribute('initialized', true);
        menuObj.ctrlkey = ctrlid;
        menuObj.mtype = mtype;
        menuObj.layer = layer;
        menuObj.cover = cover;
        if (ctrlObj && ctrlObj.getAttribute('fwin')) {
            menuObj.scrolly = true;
        }
        menuObj.style.position = 'absolute';
        menuObj.style.zIndex = zindex + layer;
        menuObj.onclick = function (e) {
            return doane(e, 0, 1);
        };
        if (duration < 3) {
            if (duration > 1) {
                menuObj.onmouseover = function () {
                    clearTimeout(JSMENU['timer'][menuid]);
                    JSMENU['timer'][menuid] = null;
                };
            }
            if (duration != 1) {
                menuObj.onmouseout = function () {
                    JSMENU['timer'][menuid] = setTimeout(function () {
                        hideMenu(menuid, mtype);
                    }, timeout);
                };
            }
        }
        if (cover) {
            var coverObj = document.createElement('div');
            coverObj.id = menuid + '_cover';
            coverObj.style.position = 'absolute';
            coverObj.style.zIndex = menuObj.style.zIndex - 1;
            coverObj.style.left = coverObj.style.top = '0px';
            coverObj.style.width = '100%';
            coverObj.style.height = Math.max(document.documentElement.clientHeight, document.body.offsetHeight) + 'px';
            coverObj.style.backgroundColor = '#000';
            coverObj.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=50)';
            coverObj.style.opacity = 0.5;
            coverObj.onclick = function () {
                hideMenu();
            };
            $('append_parent').appendChild(coverObj);
            _attachEvent(window, 'load', function () {
                coverObj.style.height = Math.max(document.documentElement.clientHeight, document.body.offsetHeight) + 'px';
            }, document);
        }
    }
    if (drag) {
        dragobj.style.cursor = 'move';
        dragobj.onmousedown = function (event) {
            try {
                dragMenu(menuObj, event, 1);
            } catch (e) {
            }
        };
    }
    if (cover) $(menuid + '_cover').style.display = '';
    if (fade) {
        var O = 0;
        var fadeIn = function (O) {
            if (O > 100) {
                clearTimeout(fadeInTimer);
                return;
            }
            menuObj.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + O + ')';
            menuObj.style.opacity = O / 100;
            O += 20;
            var fadeInTimer = setTimeout(function () {
                fadeIn(O);
            }, 40);
        };
        fadeIn(O);
        menuObj.fade = true;
    } else {
        menuObj.fade = false;
    }
    menuObj.style.display = '';
    if (ctrlObj && ctrlclass) {
        ctrlObj.className += ' ' + ctrlclass;
        menuObj.setAttribute('ctrlid', ctrlid);
        menuObj.setAttribute('ctrlclass', ctrlclass);
    }
    if (pos != '*') {
        setMenuPosition(showid, menuid, pos);
    }
    if (BROWSER.ie && BROWSER.ie < 7 && winhandlekey && $('fwin_' + winhandlekey)) {
        $(menuid).style.left = (parseInt($(menuid).style.left) - parseInt($('fwin_' + winhandlekey).style.left)) + 'px';
        $(menuid).style.top = (parseInt($(menuid).style.top) - parseInt($('fwin_' + winhandlekey).style.top)) + 'px';
    }
    if (maxh && menuObj.scrollHeight > maxh) {
        menuObj.style.height = maxh + 'px';
        if (BROWSER.opera) {
            menuObj.style.overflow = 'auto';
        } else {
            menuObj.style.overflowY = 'auto';
        }
    }
    if (!duration) {
        setTimeout('hideMenu(\'' + menuid + '\', \'' + mtype + '\')', timeout);
    }
    if (!in_array(menuid, JSMENU['active'][layer])) JSMENU['active'][layer].push(menuid);
    menuObj.cache = cache;
    if (layer > JSMENU['layer']) {
        JSMENU['layer'] = layer;
    }
    var hasshow = function (ele) {
        while (ele.parentNode && ((typeof (ele['currentStyle']) === 'undefined') ? window.getComputedStyle(ele, null) : ele['currentStyle'])['display'] !== 'none') {
            ele = ele.parentNode;
        }
        if (ele === document) {
            return true;
        } else {
            return false;
        }
    };
    if (!menuObj.getAttribute('disautofocus')) {
        try {
            var focused = false;
            var tags = ['input', 'select', 'textarea', 'button', 'a'];
            for (var i = 0; i < tags.length; i++) {
                var _all = menuObj.getElementsByTagName(tags[i]);
                if (_all.length) {
                    for (j = 0; j < _all.length; j++) {
                        if ((!_all[j]['type'] || _all[j]['type'] != 'hidden') && hasshow(_all[j])) {
                            _all[j].className += ' hidefocus';
                            _all[j].focus();
                            focused = true;
                            var cobj = _all[j];
                            _attachEvent(_all[j], 'blur', function () {
                                cobj.className = trim(cobj.className.replace(' hidefocus', ''));
                            });
                            break;
                        }
                    }
                }
                if (focused) {
                    break;
                }
            }
        } catch (e) {
        }
    }
}

var delayShowST = null;

function delayShow(ctrlObj, call, time) {
    if (typeof ctrlObj == 'object') {
        var ctrlid = ctrlObj.id;
        call = call || function () {
            showMenu(ctrlid);
        };
    }
    var time = isUndefined(time) ? 500 : time;
    delayShowST = setTimeout(function () {
        if (typeof call == 'function') {
            call();
        } else {
            eval(call);
        }
    }, time);
    if (!ctrlObj.delayinit) {
        _attachEvent(ctrlObj, 'mouseout', function () {
            clearTimeout(delayShowST);
        });
        ctrlObj.delayinit = 1;
    }
}

var dragMenuDisabled = false;

function dragMenu(menuObj, e, op) {
    e = e ? e : window.event;
    if (op == 1) {
        if (dragMenuDisabled || in_array(e.target ? e.target.tagName : e.srcElement.tagName, ['TEXTAREA', 'INPUT', 'BUTTON', 'SELECT'])) {
            return;
        }
        JSMENU['drag'] = [e.clientX, e.clientY];
        var sxy = fetchOffset(menuObj);
        JSMENU['drag'][2] = parseInt(sxy['left']) || 0;
        JSMENU['drag'][3] = parseInt(sxy['top']) || 0;
        document.onmousemove = function (e) {
            try {
                dragMenu(menuObj, e, 2);
            } catch (err) {
            }
        };
        document.onmouseup = function (e) {
            try {
                dragMenu(menuObj, e, 3);
            } catch (err) {
            }
        };
        doane(e);
    } else if (op == 2 && JSMENU['drag'][0]) {
        var menudragnow = [e.clientX, e.clientY];
        menuObj.style.left = (JSMENU['drag'][2] + menudragnow[0] - JSMENU['drag'][0]) + 'px';
        menuObj.style.top = (JSMENU['drag'][3] + menudragnow[1] - JSMENU['drag'][1]) + 'px';
        menuObj.removeAttribute('top_');
        menuObj.removeAttribute('left_');
        doane(e);
    } else if (op == 3) {
        JSMENU['drag'] = [];
        document.onmousemove = null;
        document.onmouseup = null;
    }
}

function setMenuPosition(showid, menuid, pos) {
    var showObj = $(showid);
    var menuObj = menuid ? $(menuid) : $(showid + '_menu');
    if (isUndefined(pos) || !pos) pos = '43';
    var basePoint = parseInt(pos.substr(0, 1));
    var direction = parseInt(pos.substr(1, 1));
    var important = pos.indexOf('!') != -1 ? 1 : 0;
    var sxy = 0, sx = 0, sy = 0, sw = 0, sh = 0, ml = 0, mt = 0, mw = 0, mcw = 0, mh = 0, mch = 0, bpl = 0, bpt = 0;
    if (!menuObj || (basePoint > 0 && !showObj)) return;
    if (showObj) {
        sxy = fetchOffset(showObj);
        sx = sxy['left'];
        sy = sxy['top'];
        sw = showObj.offsetWidth;
        sh = showObj.offsetHeight;
    }
    mw = menuObj.offsetWidth;
    mcw = menuObj.clientWidth;
    mh = menuObj.offsetHeight;
    mch = menuObj.clientHeight;
    switch (basePoint) {
        case 1:
            bpl = sx;
            bpt = sy;
            break;
        case 2:
            bpl = sx + sw;
            bpt = sy;
            break;
        case 3:
            bpl = sx + sw;
            bpt = sy + sh;
            break;
        case 4:
            bpl = sx;
            bpt = sy + sh;
            break;
    }
    switch (direction) {
        case 0:
            menuObj.style.left = (document.body.clientWidth - menuObj.clientWidth) / 2 + 'px';
            mt = (document.documentElement.clientHeight - menuObj.clientHeight) / 2;
            break;
        case 1:
            ml = bpl - mw;
            mt = bpt - mh;
            break;
        case 2:
            ml = bpl;
            mt = bpt - mh;
            break;
        case 3:
            ml = bpl;
            mt = bpt;
            break;
        case 4:
            ml = bpl - mw;
            mt = bpt;
            break;
    }
    var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    var scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
    if (!important) {
        if (in_array(direction, [1, 4]) && ml < 0) {
            ml = bpl;
            if (in_array(basePoint, [1, 4])) ml += sw;
        } else if (ml + mw > scrollLeft + document.body.clientWidth && sx >= mw) {
            ml = bpl - mw;
            if (in_array(basePoint, [2, 3])) {
                ml -= sw;
            } else if (basePoint == 4) {
                ml += sw;
            }
        }
        if (in_array(direction, [1, 2]) && mt < 0) {
            mt = bpt;
            if (in_array(basePoint, [1, 2])) mt += sh;
        } else if (mt + mh > scrollTop + document.documentElement.clientHeight && sy >= mh) {
            mt = bpt - mh;
            if (in_array(basePoint, [3, 4])) mt -= sh;
        }
    }
    if (pos.substr(0, 3) == '210') {
        ml += 69 - sw / 2;
        mt -= 5;
        if (showObj.tagName == 'TEXTAREA') {
            ml -= sw / 2;
            mt += sh / 2;
        }
    }
    if (direction == 0 || menuObj.scrolly) {
        if (BROWSER.ie && BROWSER.ie < 7) {
            if (direction == 0) mt += scrollTop;
        } else {
            if (menuObj.scrolly) mt -= scrollTop;
            menuObj.style.position = 'fixed';
        }
    }
    if (ml) menuObj.style.left = ml + 'px';
    if (mt) menuObj.style.top = mt + 'px';
    if (direction == 0 && BROWSER.ie && !document.documentElement.clientHeight) {
        menuObj.style.position = 'absolute';
        menuObj.style.top = (document.body.clientHeight - menuObj.clientHeight) / 2 + 'px';
    }
    if (menuObj.style.clip && !BROWSER.opera) {
        menuObj.style.clip = 'rect(auto, auto, auto, auto)';
    }
}

function hideMenu(attr, mtype) {
    attr = isUndefined(attr) ? '' : attr;
    mtype = isUndefined(mtype) ? 'menu' : mtype;
    if (attr == '') {
        for (var i = 1; i <= JSMENU['layer']; i++) {
            hideMenu(i, mtype);
        }
        return;
    } else if (typeof attr == 'number') {
        for (var j in JSMENU['active'][attr]) {
            hideMenu(JSMENU['active'][attr][j], mtype);
        }
        return;
    } else if (typeof attr == 'string') {
        var menuObj = $(attr);
        if (!menuObj || (mtype && menuObj.mtype != mtype)) return;
        var ctrlObj = '', ctrlclass = '';
        if ((ctrlObj = $(menuObj.getAttribute('ctrlid'))) && (ctrlclass = menuObj.getAttribute('ctrlclass'))) {
            var reg = new RegExp(' ' + ctrlclass);
            ctrlObj.className = ctrlObj.className.replace(reg, '');
        }
        clearTimeout(JSMENU['timer'][attr]);
        var hide = function () {
            if (menuObj.cache) {
                if (menuObj.style.visibility != 'hidden') {
                    menuObj.style.display = 'none';
                    if (menuObj.cover) $(attr + '_cover').style.display = 'none';
                }
            } else {
                menuObj.parentNode.removeChild(menuObj);
                if (menuObj.cover) $(attr + '_cover').parentNode.removeChild($(attr + '_cover'));
            }
            var tmp = [];
            for (var k in JSMENU['active'][menuObj.layer]) {
                if (attr != JSMENU['active'][menuObj.layer][k]) tmp.push(JSMENU['active'][menuObj.layer][k]);
            }
            JSMENU['active'][menuObj.layer] = tmp;
        };
        if (menuObj.fade) {
            var O = 100;
            var fadeOut = function (O) {
                if (O == 0) {
                    clearTimeout(fadeOutTimer);
                    hide();
                    return;
                }
                menuObj.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + O + ')';
                menuObj.style.opacity = O / 100;
                O -= 20;
                var fadeOutTimer = setTimeout(function () {
                    fadeOut(O);
                }, 40);
            };
            fadeOut(O);
        } else {
            hide();
        }
    }
}

function getCurrentStyle(obj, cssproperty, csspropertyNS) {
    if (obj.style[cssproperty]) {
        return obj.style[cssproperty];
    }
    if (obj.currentStyle) {
        return obj.currentStyle[cssproperty];
    } else if (document.defaultView.getComputedStyle(obj, null)) {
        var currentStyle = document.defaultView.getComputedStyle(obj, null);
        var value = currentStyle.getPropertyValue(csspropertyNS);
        if (!value) {
            value = currentStyle[cssproperty];
        }
        return value;
    } else if (window.getComputedStyle) {
        var currentStyle = window.getComputedStyle(obj, "");
        return currentStyle.getPropertyValue(csspropertyNS);
    }
}

function fetchOffset(obj, mode) {
    var left_offset = 0, top_offset = 0, mode = !mode ? 0 : mode;
    if (obj.getBoundingClientRect && !mode) {
        var rect = obj.getBoundingClientRect();
        var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        var scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
        if (document.documentElement.dir == 'rtl') {
            scrollLeft = scrollLeft + document.documentElement.clientWidth - document.documentElement.scrollWidth;
        }
        left_offset = rect.left + scrollLeft - document.documentElement.clientLeft;
        top_offset = rect.top + scrollTop - document.documentElement.clientTop;
    }
    if (left_offset <= 0 || top_offset <= 0) {
        left_offset = obj.offsetLeft;
        top_offset = obj.offsetTop;
        while ((obj = obj.offsetParent) != null) {
            position = getCurrentStyle(obj, 'position', 'position');
            if (position == 'relative') {
                continue;
            }
            left_offset += obj.offsetLeft;
            top_offset += obj.offsetTop;
        }
    }
    return {'left': left_offset, 'top': top_offset};
}

function showTip(ctrlobj) {
    $F('_showTip', arguments);
}

function showPrompt(ctrlid, evt, msg, timeout, classname) {
    $F('_showPrompt', arguments);
}

function showCreditPrompt() {
    $F('_showCreditPrompt', []);
}

var showDialogST = null;

function showDialog(msg, mode, t, func, cover, funccancel, leftmsg, confirmtxt, canceltxt, closetime, locationtime) {
    clearTimeout(showDialogST);
    cover = isUndefined(cover) ? (mode == 'info' ? 0 : 1) : cover;
    leftmsg = isUndefined(leftmsg) ? '' : leftmsg;
    mode = in_array(mode, ['confirm', 'notice', 'info', 'right']) ? mode : 'alert';
    var menuid = 'fwin_dialog';
    var menuObj = $(menuid);
    var showconfirm = 1;
    confirmtxtdefault = '确定';
    closetime = isUndefined(closetime) ? '' : closetime;
    closefunc = function () {
        if (typeof func == 'function') func(); else eval(func);
        hideMenu(menuid, 'dialog');
    };
    if (closetime) {
        showPrompt(null, null, '<i>' + msg + '</i>', closetime * 1000, 'popuptext');
        return;
    }
    locationtime = isUndefined(locationtime) ? '' : locationtime;
    if (locationtime) {
        leftmsg = locationtime + ' 秒后页面跳转';
        showDialogST = setTimeout(closefunc, locationtime * 1000);
        showconfirm = 0;
    }
    confirmtxt = confirmtxt ? confirmtxt : confirmtxtdefault;
    canceltxt = canceltxt ? canceltxt : '取消';
    if (menuObj) hideMenu('fwin_dialog', 'dialog');
    menuObj = document.createElement('div');
    menuObj.style.display = 'none';
    menuObj.className = 'fwinmask';
    menuObj.id = menuid;
    $('append_parent').appendChild(menuObj);
    var hidedom = '';
    if (!BROWSER.ie) {
        hidedom = '<style type="text/css">object{visibility:hidden;}</style>';
    }
    var s = hidedom + '<table cellpadding="0" cellspacing="0" class="fwin"><tr><td class="t_l"></td><td class="t_c"></td><td class="t_r"></td></tr><tr><td class="m_l">&nbsp;&nbsp;</td><td class="m_c"><h3 class="flb"><em>';
    s += t ? t : '提示信息';
    s += '</em><span><a href="javascript:;" id="fwin_dialog_close" class="flbc" onclick="hideMenu(\'' + menuid + '\', \'dialog\')" title="关闭">关闭</a></span></h3>';
    if (mode == 'info') {
        s += msg ? msg : '';
    } else {
        s += '<div class="c altw"><div class="' + (mode == 'alert' ? 'alert_error' : (mode == 'right' ? 'alert_right' : 'alert_info')) + '"><p>' + msg + '</p></div></div>';
        s += '<p class="o pns">' + (leftmsg ? '<span class="z xg1">' + leftmsg + '</span>' : '') + (showconfirm ? '<button id="fwin_dialog_submit" value="true" class="pn pnc"><strong>' + confirmtxt + '</strong></button>' : '');
        s += mode == 'confirm' ? '<button id="fwin_dialog_cancel" value="true" class="pn" onclick="hideMenu(\'' + menuid + '\', \'dialog\')"><strong>' + canceltxt + '</strong></button>' : '';
        s += '</p>';
    }
    s += '</td><td class="m_r"></td></tr><tr><td class="b_l"></td><td class="b_c"></td><td class="b_r"></td></tr></table>';
    menuObj.innerHTML = s;
    if ($('fwin_dialog_submit')) $('fwin_dialog_submit').onclick = function () {
        if (typeof func == 'function') func(); else eval(func);
        hideMenu(menuid, 'dialog');
    };
    if ($('fwin_dialog_cancel')) {
        $('fwin_dialog_cancel').onclick = function () {
            if (typeof funccancel == 'function') funccancel(); else eval(funccancel);
            hideMenu(menuid, 'dialog');
        };
        $('fwin_dialog_close').onclick = $('fwin_dialog_cancel').onclick;
    }
    showMenu({
        'mtype': 'dialog',
        'menuid': menuid,
        'duration': 3,
        'pos': '00',
        'zindex': JSMENU['zIndex']['dialog'],
        'cache': 0,
        'cover': cover
    });
    try {
        if ($('fwin_dialog_submit')) $('fwin_dialog_submit').focus();
    } catch (e) {
    }
}

function showWindow(k, url, mode, cache, menuv) {
    mode = isUndefined(mode) ? 'get' : mode;
    cache = isUndefined(cache) ? 1 : cache;
    var menuid = 'fwin_' + k;
    var menuObj = $(menuid);
    var drag = null;
    var loadingst = null;
    var hidedom = '';
    if (disallowfloat && disallowfloat.indexOf(k) != -1) {
        if (BROWSER.ie) url += (url.indexOf('?') != -1 ? '&' : '?') + 'referer=' + escape(location.href);
        location.href = url;
        doane();
        return;
    }
    var fetchContent = function () {
        if (mode == 'get') {
            menuObj.url = url;
            url += (url.search(/\?/) > 0 ? '&' : '?') + 'infloat=yes&handlekey=' + k;
            url += cache == -1 ? '&t=' + (+new Date()) : '';
            if (BROWSER.ie && url.indexOf('referer=') < 0) {
                url = url + '&referer=' + encodeURIComponent(location);
            }
            ajaxget(url, 'fwin_content_' + k, null, '', '', function () {
                initMenu();
                show();
            });
        } else if (mode == 'post') {
            menuObj.act = $(url).action;
            ajaxpost(url, 'fwin_content_' + k, '', '', '', function () {
                initMenu();
                show();
            });
        }
        if (parseInt(BROWSER.ie) != 6) {
            loadingst = setTimeout(function () {
                showDialog('', 'info', '<img src="' + IMGDIR + '/loading.gif"> 请稍候...')
            }, 500);
        }
    };
    var initMenu = function () {
        clearTimeout(loadingst);
        var objs = menuObj.getElementsByTagName('*');
        var fctrlidinit = false;
        for (var i = 0; i < objs.length; i++) {
            if (objs[i].id) {
                objs[i].setAttribute('fwin', k);
            }
            if (objs[i].className == 'flb' && !fctrlidinit) {
                if (!objs[i].id) objs[i].id = 'fctrl_' + k;
                drag = objs[i].id;
                fctrlidinit = true;
            }
        }
    };
    var show = function () {
        hideMenu('fwin_dialog', 'dialog');
        v = {
            'mtype': 'win',
            'menuid': menuid,
            'duration': 3,
            'pos': '00',
            'zindex': JSMENU['zIndex']['win'],
            'drag': typeof drag == null ? '' : drag,
            'cache': cache
        };
        for (k in menuv) {
            v[k] = menuv[k];
        }
        showMenu(v);
    };
    if (!menuObj) {
        menuObj = document.createElement('div');
        menuObj.id = menuid;
        menuObj.className = 'fwinmask';
        menuObj.style.display = 'none';
        $('append_parent').appendChild(menuObj);
        evt = ' style="cursor:move" onmousedown="dragMenu($(\'' + menuid + '\'), event, 1)" ondblclick="hideWindow(\'' + k + '\')"';
        if (!BROWSER.ie) {
            hidedom = '<style type="text/css">object{visibility:hidden;}</style>';
        }
        menuObj.innerHTML = hidedom + '<table cellpadding="0" cellspacing="0" class="fwin"><tr><td class="t_l"></td><td class="t_c"' + evt + '></td><td class="t_r"></td></tr><tr><td class="m_l"' + evt + ')">&nbsp;&nbsp;</td><td class="m_c" id="fwin_content_' + k + '">' + '</td><td class="m_r"' + evt + '"></td></tr><tr><td class="b_l"></td><td class="b_c"' + evt + '></td><td class="b_r"></td></tr></table>';
        if (mode == 'html') {
            $('fwin_content_' + k).innerHTML = url;
            initMenu();
            show();
        } else {
            fetchContent();
        }
    } else if ((mode == 'get' && (url != menuObj.url || cache != 1)) || (mode == 'post' && $(url).action != menuObj.act)) {
        fetchContent();
    } else {
        show();
    }
    doane();
}

function showError(msg) {
    var p = /<script[^\>]*?>([^\x00]*?)<\/script>/ig;
    msg = msg.replace(p, '');
    if (msg !== '') {
        showDialog(msg, 'alert', '错误信息', null, true, null, '', '', '', 3);
    }
}

function hideWindow(k, all, clear) {
    all = isUndefined(all) ? 1 : all;
    clear = isUndefined(clear) ? 1 : clear;
    hideMenu('fwin_' + k, 'win');
    if (clear && $('fwin_' + k)) {
        $('append_parent').removeChild($('fwin_' + k));
    }
    if (all) {
        hideMenu();
    }
}

function AC_FL_RunContent() {
    var str = '';
    var ret = AC_GetArgs(arguments, "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000", "application/x-shockwave-flash");
    if (BROWSER.ie && !BROWSER.opera) {
        str += '<object ';
        for (var i in ret.objAttrs) {
            str += i + '="' + ret.objAttrs[i] + '" ';
        }
        str += '>';
        for (var i in ret.params) {
            str += '<param name="' + i + '" value="' + ret.params[i] + '" /> ';
        }
        str += '</object>';
    } else {
        str += '<embed ';
        for (var i in ret.embedAttrs) {
            str += i + '="' + ret.embedAttrs[i] + '" ';
        }
        str += '></embed>';
    }
    return str;
}

function AC_GetArgs(args, classid, mimeType) {
    var ret = new Object();
    ret.embedAttrs = new Object();
    ret.params = new Object();
    ret.objAttrs = new Object();
    for (var i = 0; i < args.length; i = i + 2) {
        var currArg = args[i].toLowerCase();
        switch (currArg) {
            case "classid":
                break;
            case "pluginspage":
                ret.embedAttrs[args[i]] = 'http://www.macromedia.com/go/getflashplayer';
                break;
            case "src":
                ret.embedAttrs[args[i]] = args[i + 1];
                ret.params["movie"] = args[i + 1];
                break;
            case "codebase":
                ret.objAttrs[args[i]] = 'http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0';
                break;
            case "onafterupdate":
            case "onbeforeupdate":
            case "onblur":
            case "oncellchange":
            case "onclick":
            case "ondblclick":
            case "ondrag":
            case "ondragend":
            case "ondragenter":
            case "ondragleave":
            case "ondragover":
            case "ondrop":
            case "onfinish":
            case "onfocus":
            case "onhelp":
            case "onmousedown":
            case "onmouseup":
            case "onmouseover":
            case "onmousemove":
            case "onmouseout":
            case "onkeypress":
            case "onkeydown":
            case "onkeyup":
            case "onload":
            case "onlosecapture":
            case "onpropertychange":
            case "onreadystatechange":
            case "onrowsdelete":
            case "onrowenter":
            case "onrowexit":
            case "onrowsinserted":
            case "onstart":
            case "onscroll":
            case "onbeforeeditfocus":
            case "onactivate":
            case "onbeforedeactivate":
            case "ondeactivate":
            case "type":
            case "id":
                ret.objAttrs[args[i]] = args[i + 1];
                break;
            case "width":
            case "height":
            case "align":
            case "vspace":
            case "hspace":
            case "class":
            case "title":
            case "accesskey":
            case "name":
            case "tabindex":
                ret.embedAttrs[args[i]] = ret.objAttrs[args[i]] = args[i + 1];
                break;
            default:
                ret.embedAttrs[args[i]] = ret.params[args[i]] = args[i + 1];
        }
    }
    ret.objAttrs["classid"] = classid;
    if (mimeType) {
        ret.embedAttrs["type"] = mimeType;
    }
    return ret;
}

function simulateSelect(selectId, widthvalue) {
    var selectObj = $(selectId);
    if (!selectObj) return;
    if (BROWSER.other) {
        if (selectObj.getAttribute('change')) {
            selectObj.onchange = function () {
                eval(selectObj.getAttribute('change'));
            }
        }
        return;
    }
    var widthvalue = widthvalue ? widthvalue : 70;
    var defaultopt = selectObj.options[0] ? selectObj.options[0].innerHTML : '';
    var defaultv = '';
    var menuObj = document.createElement('div');
    var ul = document.createElement('ul');
    var handleKeyDown = function (e) {
        e = BROWSER.ie ? event : e;
        if (e.keyCode == 40 || e.keyCode == 38) doane(e);
    };
    var selectwidth = (selectObj.getAttribute('width', i) ? selectObj.getAttribute('width', i) : widthvalue) + 'px';
    var tabindex = selectObj.getAttribute('tabindex', i) ? selectObj.getAttribute('tabindex', i) : 1;
    for (var i = 0; i < selectObj.options.length; i++) {
        var li = document.createElement('li');
        li.innerHTML = selectObj.options[i].innerHTML;
        li.k_id = i;
        li.k_value = selectObj.options[i].value;
        if (selectObj.options[i].selected) {
            defaultopt = selectObj.options[i].innerHTML;
            defaultv = selectObj.options[i].value;
            li.className = 'current';
            selectObj.setAttribute('selecti', i);
        }
        li.onclick = function () {
            if ($(selectId + '_ctrl').innerHTML != this.innerHTML) {
                var lis = menuObj.getElementsByTagName('li');
                lis[$(selectId).getAttribute('selecti')].className = '';
                this.className = 'current';
                $(selectId + '_ctrl').innerHTML = this.innerHTML;
                $(selectId).setAttribute('selecti', this.k_id);
                $(selectId).options.length = 0;
                $(selectId).options[0] = new Option('', this.k_value);
                eval(selectObj.getAttribute('change'));
            }
            hideMenu(menuObj.id);
            return false;
        };
        ul.appendChild(li);
    }
    selectObj.options.length = 0;
    selectObj.options[0] = new Option('', defaultv);
    selectObj.style.display = 'none';
    selectObj.outerHTML += '<a href="javascript:;" id="' + selectId + '_ctrl" style="width:' + selectwidth + '" tabindex="' + tabindex + '">' + defaultopt + '</a>';
    menuObj.id = selectId + '_ctrl_menu';
    menuObj.className = 'sltm';
    menuObj.style.display = 'none';
    menuObj.style.width = selectwidth;
    menuObj.appendChild(ul);
    $('append_parent').appendChild(menuObj);
    $(selectId + '_ctrl').onclick = function (e) {
        $(selectId + '_ctrl_menu').style.width = selectwidth;
        showMenu({
            'ctrlid': (selectId == 'loginfield' ? 'account' : selectId + '_ctrl'),
            'menuid': selectId + '_ctrl_menu',
            'evt': 'click',
            'pos': '43'
        });
        doane(e);
    };
    $(selectId + '_ctrl').onfocus = menuObj.onfocus = function () {
        _attachEvent(document.body, 'keydown', handleKeyDown);
    };
    $(selectId + '_ctrl').onblur = menuObj.onblur = function () {
        _detachEvent(document.body, 'keydown', handleKeyDown);
    };
    $(selectId + '_ctrl').onkeyup = function (e) {
        e = e ? e : window.event;
        value = e.keyCode;
        if (value == 40 || value == 38) {
            if (menuObj.style.display == 'none') {
                $(selectId + '_ctrl').onclick();
            } else {
                lis = menuObj.getElementsByTagName('li');
                selecti = selectObj.getAttribute('selecti');
                lis[selecti].className = '';
                if (value == 40) {
                    selecti = parseInt(selecti) + 1;
                } else if (value == 38) {
                    selecti = parseInt(selecti) - 1;
                }
                if (selecti < 0) {
                    selecti = lis.length - 1
                } else if (selecti > lis.length - 1) {
                    selecti = 0;
                }
                lis[selecti].className = 'current';
                selectObj.setAttribute('selecti', selecti);
                lis[selecti].parentNode.scrollTop = lis[selecti].offsetTop;
            }
        } else if (value == 13) {
            var lis = menuObj.getElementsByTagName('li');
            lis[selectObj.getAttribute('selecti')].onclick();
        } else if (value == 27) {
            hideMenu(menuObj.id);
        }
    };
}

function switchTab(prefix, current, total, activeclass) {
    $F('_switchTab', arguments);
}

function imageRotate(imgid, direct) {
    $F('_imageRotate', arguments);
}

function thumbImg(obj, method) {
    if (!obj) {
        return;
    }
    obj.onload = null;
    file = obj.src;
    zw = obj.offsetWidth;
    zh = obj.offsetHeight;
    if (zw < 2) {
        if (!obj.id) {
            obj.id = 'img_' + Math.random();
        }
        setTimeout("thumbImg($('" + obj.id + "'), " + method + ")", 100);
        return;
    }
    zr = zw / zh;
    method = !method ? 0 : 1;
    if (method) {
        fixw = obj.getAttribute('_width');
        fixh = obj.getAttribute('_height');
        if (zw > fixw) {
            zw = fixw;
            zh = zw / zr;
        }
        if (zh > fixh) {
            zh = fixh;
            zw = zh * zr;
        }
    } else {
        fixw = typeof imagemaxwidth == 'undefined' ? '600' : imagemaxwidth;
        if (zw > fixw) {
            zw = fixw;
            zh = zw / zr;
            obj.style.cursor = 'pointer';
            if (!obj.onclick) {
                obj.onclick = function () {
                    zoom(obj, obj.src);
                };
            }
        }
    }
    obj.width = zw;
    obj.height = zh;
}

var zoomstatus = 1;

function zoom(obj, zimg, nocover, pn, showexif) {
    $F('_zoom', arguments);
}

function showselect(obj, inpid, t, rettype) {
    $F('_showselect', arguments);
}

function showColorBox(ctrlid, layer, k, bgcolor) {
    $F('_showColorBox', arguments);
}

function ctrlEnter(event, btnId, onlyEnter) {
    if (isUndefined(onlyEnter)) onlyEnter = 0;
    if ((event.ctrlKey || onlyEnter) && event.keyCode == 13) {
        $(btnId).click();
        return false;
    }
    return true;
}

function parseurl(str, mode, parsecode) {
    if (isUndefined(parsecode)) parsecode = true;
    if (parsecode) str = str.replace(/\s*\[code\]([\s\S]+?)\[\/code\]\s*/ig, function ($1, $2) {
        return codetag($2, -1);
    });
    str = str.replace(/([^>=\]"'\/]|^)((((https?|ftp):\/\/)|www\.)([\w\-]+\.)*[\w\-\u4e00-\u9fa5]+\.([\.a-zA-Z0-9]+|\u4E2D\u56FD|\u7F51\u7EDC|\u516C\u53F8)((\?|\/|:)+[\w\.\/=\?%\-&~`@':+!]*)+\.(swf|flv))/ig, '$1[flash]$2[/flash]');
    str = str.replace(/([^>=\]"'\/]|^)((((https?|ftp):\/\/)|www\.)([\w\-]+\.)*[\w\-\u4e00-\u9fa5]+\.([\.a-zA-Z0-9]+|\u4E2D\u56FD|\u7F51\u7EDC|\u516C\u53F8)((\?|\/|:)+[\w\.\/=\?%\-&~`@':+!]*)+\.(mp3|wma))/ig, '$1[audio]$2[/audio]');
    str = str.replace(/([^>=\]"'\/@]|^)((((https?|ftp|gopher|news|telnet|rtsp|mms|callto|bctp|ed2k|thunder|qqdl|synacast):\/\/))([\w\-]+\.)*[:\.@\-\w\u4e00-\u9fa5]+\.([\.a-zA-Z0-9]+|\u4E2D\u56FD|\u7F51\u7EDC|\u516C\u53F8)((\?|\/|:)+[\w\.\/=\?%\-&;~`@':+!#]*)*)/ig, mode == 'html' ? '$1<a href="$2" target="_blank">$2</a>' : '$1[url]$2[/url]');
    str = str.replace(/([^\w>=\]"'\/@]|^)((www\.)([\w\-]+\.)*[:\.@\-\w\u4e00-\u9fa5]+\.([\.a-zA-Z0-9]+|\u4E2D\u56FD|\u7F51\u7EDC|\u516C\u53F8)((\?|\/|:)+[\w\.\/=\?%\-&;~`@':+!#]*)*)/ig, mode == 'html' ? '$1<a href="$2" target="_blank">$2</a>' : '$1[url]$2[/url]');
    str = str.replace(/([^\w->=\]:"'\.\/]|^)(([\-\.\w]+@[\.\-\w]+(\.\w+)+))/ig, mode == 'html' ? '$1<a href="mailto:$2">$2</a>' : '$1[email]$2[/email]');
    if (parsecode) {
        for (var i = 0; i <= DISCUZCODE['num']; i++) {
            str = str.replace("[\tDISCUZ_CODE_" + i + "\t]", DISCUZCODE['html'][i]);
        }
    }
    return str;
}

function codetag(text, br) {
    var br = !br ? 1 : br;
    DISCUZCODE['num']++;
    if (br > 0 && typeof wysiwyg != 'undefined' && wysiwyg) text = text.replace(/<br[^\>]*>/ig, '\n');
    text = text.replace(/\$/ig, '$$');
    DISCUZCODE['html'][DISCUZCODE['num']] = '[code]' + text + '[/code]';
    return '[\tDISCUZ_CODE_' + DISCUZCODE['num'] + '\t]';
}

function saveUserdata(name, data) {
    try {
        if (window.localStorage) {
            localStorage.setItem('Discuz_' + name, data);
        } else if (window.sessionStorage) {
            sessionStorage.setItem('Discuz_' + name, data);
        }
    } catch (e) {
        if (BROWSER.ie) {
            if (data.length < 54889) {
                with (document.documentElement) {
                    setAttribute("value", data);
                    save('Discuz_' + name);
                }
            }
        }
    }
    setcookie('clearUserdata', '', -1);
}

function loadUserdata(name) {
    if (window.localStorage) {
        return localStorage.getItem('Discuz_' + name);
    } else if (window.sessionStorage) {
        return sessionStorage.getItem('Discuz_' + name);
    } else if (BROWSER.ie) {
        with (document.documentElement) {
            load('Discuz_' + name);
            return getAttribute("value");
        }
    }
}

function initTab(frameId, type) {
    $F('_initTab', arguments);
}

function openDiy() {
    if (DYNAMICURL) {
        window.location.href = SITEURL + DYNAMICURL + (DYNAMICURL.indexOf('?') < 0 ? '?' : '&') + ('diy=yes');
    } else {
        window.location.href = ((window.location.href + '').replace(/[\?\&]diy=yes/g, '').split('#')[0] + (window.location.search && window.location.search.indexOf('?diy=yes') < 0 ? '&diy=yes' : '?diy=yes'));
    }
}

function hasClass(elem, className) {
    return elem.className && (" " + elem.className + " ").indexOf(" " + className + " ") != -1;
}

function runslideshow() {
    $F('_runslideshow', []);
}

function toggle_collapse(objname, noimg, complex, lang) {
    $F('_toggle_collapse', arguments);
}

function updatestring(str1, str2, clear) {
    str2 = '_' + str2 + '_';
    return clear ? str1.replace(str2, '') : (str1.indexOf(str2) == -1 ? str1 + str2 : str1);
}

function getClipboardData() {
    window.document.clipboardswf.SetVariable('str', CLIPBOARDSWFDATA);
}

function setCopy(text, msg) {
    var cp = document.createElement('textarea');
    cp.style.fontSize = '12pt';
    cp.style.border = '0';
    cp.style.padding = '0';
    cp.style.margin = '0';
    cp.style.position = 'absolute';
    cp.style.left = '-9999px';
    var yPosition = window.pageYOffset || document.documentElement.scrollTop;
    cp.style.top = yPosition + 'px';
    cp.setAttribute('readonly', '');
    text = text.replace(/[\xA0]/g, ' ');
    cp.value = text;
    $('append_parent').appendChild(cp);
    cp.select();
    cp.setSelectionRange(0, cp.value.length);
    try {
        var success = document.execCommand('copy', false, null);
    } catch (e) {
        var success = false;
    }
    $('append_parent').removeChild(cp);
    if (success) {
        if (msg) {
            showPrompt(null, null, '<span>' + msg + '</span>', 1500);
        }
    } else {
        $F('_setCopy', arguments);
    }
}

function copycode(obj) {
    $F('_copycode', arguments);
}

function showdistrict(container, elems, totallevel, changelevel, containertype) {
    $F('_showdistrict', arguments);
}

function setDoodle(fid, oid, url, tid, from) {
    $F('_setDoodle', arguments);
}

function initSearchmenu(searchform, cloudSearchUrl) {
    var defaultUrl = 'search.php?searchsubmit=yes';
    if (typeof cloudSearchUrl == "undefined" || cloudSearchUrl == null || cloudSearchUrl == '') {
        cloudSearchUrl = defaultUrl;
    }
    var searchtxt = $(searchform + '_txt');
    if (!searchtxt) {
        searchtxt = $(searchform);
    }
    var tclass = searchtxt.className;
    searchtxt.className = tclass + ' xg1';
    if (!!("placeholder" in document.createElement("input"))) {
        if (searchtxt.value == '请输入搜索内容') {
            searchtxt.value = '';
        }
        searchtxt.placeholder = '请输入搜索内容';
    } else {
        searchtxt.onfocus = function () {
            if (searchtxt.value == '请输入搜索内容') {
                searchtxt.value = '';
                searchtxt.className = tclass;
            }
        };
        searchtxt.onblur = function () {
            if (searchtxt.value == '') {
                searchtxt.value = '请输入搜索内容';
                searchtxt.className = tclass + ' xg1';
            }
        };
    }
    if (!$(searchform + '_type_menu')) return false;
    var o = $(searchform + '_type');
    var a = $(searchform + '_type_menu').getElementsByTagName('a');
    var formobj = searchtxt.form;
    for (var i = 0; i < a.length; i++) {
        if (a[i].className == 'curtype') {
            o.innerHTML = a[i].innerHTML;
            $(searchform + '_mod').value = a[i].rel;
            formobj.method = 'post';
            if ((a[i].rel == 'forum' || a[i].rel == 'curforum') && defaultUrl != cloudSearchUrl) {
                formobj.action = cloudSearchUrl;
                formobj.method = 'get';
                if ($('srchFId')) {
                    $('srchFId').value = a[i].rel == 'forum' ? 0 : a[i].getAttribute('fid');
                }
            } else {
                formobj.action = defaultUrl;
            }
        }
        a[i].onclick = function () {
            o.innerHTML = this.innerHTML;
            $(searchform + '_mod').value = this.rel;
            formobj.method = 'post';
            if ((this.rel == 'forum' || this.rel == 'curforum') && defaultUrl != cloudSearchUrl) {
                formobj.action = cloudSearchUrl;
                formobj.method = 'get';
                if ($('srchFId')) {
                    $('srchFId').value = this.rel == 'forum' ? 0 : this.getAttribute('fid');
                }
            } else {
                formobj.action = defaultUrl;
            }
        };
    }
}

function searchFocus(obj) {
    if (obj.value == '请输入搜索内容') {
        obj.value = '';
    }
    if ($('cloudsearchquery') != null) {
        $('cloudsearchquery').value = obj.value;
    }
}

function extstyle(css) {
    $F('_extstyle', arguments);
}

function widthauto(obj) {
    $F('_widthauto', arguments);
}

var secST = new Array();

function updatesecqaa(idhash) {
    $F('_updatesecqaa', arguments);
}

function updateseccode(idhash, play) {
    $F('_updateseccode', arguments);
}

function checksec(type, idhash, showmsg, recall) {
    $F('_checksec', arguments);
}

function createPalette(colorid, id, func) {
    $F('_createPalette', arguments);
}

function showForummenu(fid) {
    $F('_showForummenu', arguments);
}

function showUserApp() {
    $F('_showUserApp', arguments);
}

function cardInit() {
    var cardShow = function (obj) {
        if (BROWSER.ie && BROWSER.ie < 7 && obj.href.indexOf('username') != -1) {
            return;
        }
        pos = obj.getAttribute('c') == '1' ? '43' : obj.getAttribute('c');
        USERCARDST = setTimeout(function () {
            ajaxmenu(obj, 500, 1, 2, pos, null, 'p_pop card');
        }, 250);
    };
    var cardids = {};
    var a = document.body.getElementsByTagName('a');
    for (var i = 0; i < a.length; i++) {
        if (a[i].getAttribute('c')) {
            var href = a[i].getAttribute('href', 1);
            if (typeof cardids[href] == 'undefined') {
                cardids[href] = Math.round(Math.random() * 10000);
            }
            a[i].setAttribute('mid', 'card_' + cardids[href]);
            a[i].onmouseover = function () {
                cardShow(this)
            };
            a[i].onmouseout = function () {
                clearTimeout(USERCARDST);
            };
        }
    }
}

function navShow(id) {
    var mnobj = $('snav_mn_' + id);
    if (!mnobj) {
        return;
    }
    var uls = $('mu').getElementsByTagName('ul');
    for (i = 0; i < uls.length; i++) {
        if (uls[i].className != 'cl current') {
            uls[i].style.display = 'none';
        }
    }
    if (mnobj.className != 'cl current') {
        showMenu({'ctrlid': 'mn_' + id, 'menuid': 'snav_mn_' + id, 'pos': '*'});
        mnobj.className = 'cl floatmu';
        mnobj.style.width = ($('nv').clientWidth) + 'px';
        mnobj.style.display = '';
    }
}

function strLenCalc(obj, checklen, maxlen) {
    var v = obj.value, charlen = 0, maxlen = !maxlen ? 200 : maxlen, curlen = maxlen, len = strlen(v);
    for (var i = 0; i < v.length; i++) {
        if (v.charCodeAt(i) < 0 || v.charCodeAt(i) > 255) {
            curlen -= charset == 'utf-8' ? 2 : 1;
        }
    }
    if (curlen >= len) {
        $(checklen).innerHTML = curlen - len;
    } else {
        obj.value = mb_cutstr(v, maxlen, 0);
    }
}

function patchNotice() {
    if ($('patch_notice')) {
        ajaxget('misc.php?mod=patch&action=patchnotice', 'patch_notice', '');
    }
}

function pluginNotice() {
    if ($('plugin_notice')) {
        ajaxget('misc.php?mod=patch&action=pluginnotice', 'plugin_notice', '');
    }
}

function ipNotice() {
    if ($('ip_notice')) {
        ajaxget('misc.php?mod=patch&action=ipnotice&_r=' + Math.random(), 'ip_notice', '');
    }
}

function noticeTitle() {
    NOTICETITLE = {'State': 0, 'oldTitle': NOTICECURTITLE, flashNumber: 0, sleep: 15};
    if (!getcookie('noticeTitle')) {
        window.setInterval('noticeTitleFlash();', 500);
    } else {
        window.setTimeout('noticeTitleFlash();', 500);
    }
    setcookie('noticeTitle', 1, 600);
}

function noticeTitleFlash() {
    if (NOTICETITLE.flashNumber < 5 || NOTICETITLE.flashNumber > 4 && !NOTICETITLE['State']) {
        document.title = (NOTICETITLE['State'] ? '【　　　】' : '【新提醒】') + NOTICETITLE['oldTitle'];
        NOTICETITLE['State'] = !NOTICETITLE['State'];
    }
    NOTICETITLE.flashNumber = NOTICETITLE.flashNumber < NOTICETITLE.sleep ? ++NOTICETITLE.flashNumber : 0;
}

function relatedlinks(rlinkmsgid) {
    $F('_relatedlinks', arguments);
}

function con_handle_response(response) {
    return response;
}

function showTopLink() {
    var ft = $('ft');
    if (ft) {
        var scrolltop = $('scrolltop');
        var viewPortHeight = parseInt(document.documentElement.clientHeight);
        var scrollHeight = parseInt(document.body.getBoundingClientRect().top);
        var basew = parseInt(ft.clientWidth);
        var sw = scrolltop.clientWidth;
        if (basew < 1000) {
            var left = parseInt(fetchOffset(ft)['left']);
            left = left < sw ? left * 2 - sw : left;
            scrolltop.style.left = (basew + left) + 'px';
        } else {
            scrolltop.style.left = 'auto';
            scrolltop.style.right = 0;
        }
        if (BROWSER.ie && BROWSER.ie < 7) {
            scrolltop.style.top = viewPortHeight - scrollHeight - 150 + 'px';
        }
        if (scrollHeight < -100) {
            scrolltop.style.visibility = 'visible';
        } else {
            scrolltop.style.visibility = 'hidden';
        }
    }
}

function showCreditmenu() {
    $F('_showCreditmenu', []);
}

function showUpgradeinfo() {
    $F('_showUpgradeinfo', []);
}

function addFavorite(url, title) {
    try {
        window.external.addFavorite(url, title);
    } catch (e) {
        try {
            window.sidebar.addPanel(title, url, '');
        } catch (e) {
            showDialog("请按 Ctrl+D 键添加到收藏夹", 'notice');
        }
    }
}

function setHomepage(sURL) {
    if (BROWSER.ie) {
        document.body.style.behavior = 'url(#default#homepage)';
        document.body.setHomePage(sURL);
    } else {
        showDialog("非 IE 浏览器请手动将本站设为首页", 'notice');
        doane();
    }
}

function setShortcut() {
    var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    if (!loadUserdata('setshortcut') && !scrollTop) {
        $F('_setShortcut', []);
    }
}

function smilies_show(id, smcols, seditorkey) {
    $F('_smilies_show', arguments, 'smilies');
}

function showfocus(ftype, autoshow) {
    var id = parseInt($('focuscur').innerHTML);
    if (ftype == 'prev') {
        id = (id - 1) < 1 ? focusnum : (id - 1);
        if (!autoshow) {
            window.clearInterval(focusautoshow);
        }
    } else if (ftype == 'next') {
        id = (id + 1) > focusnum ? 1 : (id + 1);
        if (!autoshow) {
            window.clearInterval(focusautoshow);
        }
    }
    $('focuscur').innerHTML = id;
    $('focus_con').innerHTML = $('focus_' + (id - 1)).innerHTML;
}

function rateStarHover(target, level) {
    if (level == 0) {
        $(target).style.width = '';
    } else {
        $(target).style.width = level * 16 + 'px';
    }
}

function rateStarSet(target, level, input) {
    $(input).value = level;
    $(target).className = 'star star' + level;
}

function img_onmouseoverfunc(obj) {
    if (typeof showsetcover == 'function') {
        showsetcover(obj);
    }
    return;
}

function toggleBlind(dom) {
    if (dom) {
        if (loadUserdata('is_blindman')) {
            saveUserdata('is_blindman', '');
            dom.title = '开启辅助访问';
        } else {
            saveUserdata('is_blindman', '1');
            dom.title = '关闭辅助访问';
        }
    }
}

function checkBlind() {
    var dom = $('switchblind');
    if (dom) {
        if (loadUserdata('is_blindman')) {
            dom.title = '关闭辅助访问';
        } else {
            dom.title = '开启辅助访问';
        }
    }
}

function getElementOffset(element) {
    var left = element.offsetLeft, top = element.offsetTop;
    while (element = element.offsetParent) {
        left += element.offsetLeft;
        top += element.offsetTop;
    }
    if ($('nv').style.position == 'fixed') {
        top -= parseInt($('nv').style.height);
    }
    return {'left': left, 'top': top};
}

function mobileplayer() {
    var platform = navigator.platform;
    var ua = navigator.userAgent;
    var ios = /iPhone|iPad|iPod/.test(platform) && ua.indexOf("AppleWebKit") > -1;
    var andriod = ua.indexOf("Android") > -1;
    if (ios || andriod) {
        return true;
    } else {
        return false;
    }
}

if (typeof IN_ADMINCP == 'undefined') {
    if (creditnotice != '' && getcookie('creditnotice')) {
        _attachEvent(window, 'load', showCreditPrompt, document);
    }
    if (typeof showusercard != 'undefined' && showusercard == 1) {
        _attachEvent(window, 'load', cardInit, document);
    }
}

function fixed_top_nv(eleid, disbind) {
    this.nv = eleid && $(eleid) || $('nv');
    this.openflag = this.nv && BROWSER.ie != 6;
    this.nvdata = {};
    this.init = function (disattachevent) {
        if (this.openflag) {
            if (!disattachevent) {
                var obj = this;
                _attachEvent(window, 'resize', function () {
                    obj.reset();
                    obj.init(1);
                    obj.run();
                });
                var switchwidth = $('switchwidth');
                if (switchwidth) {
                    _attachEvent(switchwidth, 'click', function () {
                        obj.reset();
                        obj.openflag = false;
                    });
                }
            }
            var next = this.nv;
            try {
                while ((next = next.nextSibling).nodeType != 1 || next.style.display === 'none') {
                }
                this.nvdata.next = next;
                this.nvdata.height = parseInt(this.nv.offsetHeight, 10);
                this.nvdata.width = parseInt(this.nv.offsetWidth, 10);
                this.nvdata.left = this.nv.getBoundingClientRect().left - document.documentElement.clientLeft;
                this.nvdata.position = this.nv.style.position;
                this.nvdata.opacity = this.nv.style.opacity;
            } catch (e) {
                this.nvdata.next = null;
            }
        }
    };
    this.run = function () {
        var fixedheight = 0;
        if (this.openflag && this.nvdata.next) {
            var nvnexttop = document.body.scrollTop || document.documentElement.scrollTop;
            var dofixed = nvnexttop !== 0 && document.documentElement.clientHeight >= 15 && this.nvdata.next.getBoundingClientRect().top - this.nvdata.height < 0;
            if (dofixed) {
                if (this.nv.style.position != 'fixed') {
                    this.nv.style.borderLeftWidth = '0';
                    this.nv.style.borderRightWidth = '0';
                    this.nv.style.height = this.nvdata.height + 'px';
                    this.nv.style.width = this.nvdata.width + 'px';
                    this.nv.style.top = '0';
                    this.nv.style.left = this.nvdata.left + 'px';
                    this.nv.style.position = 'fixed';
                    this.nv.style.zIndex = '199';
                    this.nv.style.opacity = 0.85;
                }
            } else {
                if (this.nv.style.position != this.nvdata.position) {
                    this.reset();
                }
            }
            if (this.nv.style.position == 'fixed') {
                fixedheight = this.nvdata.height;
            }
        }
        return fixedheight;
    };
    this.reset = function () {
        if (this.nv) {
            this.nv.style.position = this.nvdata.position;
            this.nv.style.borderLeftWidth = '';
            this.nv.style.borderRightWidth = '';
            this.nv.style.height = '';
            this.nv.style.width = '';
            this.nv.style.opacity = this.nvdata.opacity;
        }
    };
    if (!disbind && this.openflag) {
        this.init();
        _attachEvent(window, 'scroll', this.run);
    }
    if (window.location.search.indexOf('diy=yes') === -1) {
        fixedStickyDom();
    }
}

if (BROWSER.ie) {
    document.documentElement.addBehavior("#default#userdata");
}

function _closeBottomBanner() {
    var expire_period = 3 * 24 * 60 * 60;
    setcookie("bottomBannerDismissed", 1, expire_period);
    var banner = document.getElementById("redirect_bottom_banner");
    banner.parentNode.removeChild(banner);
}

function fixedStickyDom() {
    var doms = Array.from(document.querySelectorAll('.sticky-1p3a'));
    var bounds = doms.map(function (dom) {
        return {
            width: dom.getBoundingClientRect().width,
            height: dom.getBoundingClientRect().height,
            top: dom.offsetTop - 64,
        }
    });
    window.addEventListener('scroll', function () {
        var ctHeight = document.querySelector('#ct').offsetHeight + document.querySelector('#ct').offsetTop;
        doms.forEach(function (dom, i) {
            var bound = bounds[i];
            dom.style.width = bound.width + 'px';
            if (window.pageYOffset + 70 + bound.height > ctHeight) {
                dom.style.position = 'absolute';
                dom.style.top = ctHeight - bound.height - 22 + 'px'
            } else if (window.pageYOffset <= bound.top) {
                dom.style.position = 'static';
                dom.style.top = 'auto';
                bound.top = dom.offsetTop - 64;
            } else {
                dom.style.position = 'fixed';
                dom.style.top = '70px';
                dom.style.zIndex = '1';
            }
        })
    })
}

function saveTimezone() {
    if (navigator.cookieEnabled) {
        setcookie('tz_offset', new Date().getTimezoneOffset(), 31536000);
    }
}

window.onload = function () {
    try {
        window.googlefc = window.googlefc || {};
        window.googlefc.ccpa = window.googlefc.ccpa || {};
        window.googlefc.callbackQueue = window.googlefc.callbackQueue || [];
        window.googlefc.controlledMessagingFunction = (message) => {
            var groupIdElement = document.querySelector('meta[name="application-groupid"]');
            var aidElement = document.querySelector('meta[name="application-adid"]');
            var displayMessage = (!groupIdElement || groupIdElement.content !== '53') && (!aidElement || aidElement.content !== '1') && window.location.href !== 'https://www.1point3acres.com/bbs/bischina_017_10-buyvip.html' && window.location.href !== 'https://www.1point3acres.com/bbs/member.php?mod=logging&action=login';
            message.proceed(displayMessage);
        };
        (function () {
            'use strict';
            var g = function (a) {
                var b = 0;
                return function () {
                    return b < a.length ? {done: !1, value: a[b++]} : {done: !0}
                }
            }, l = this || self, m = /^[\w+/_-]+[=]{0,2}$/, p = null, q = function () {
            }, r = function (a) {
                var b = typeof a;
                if ("object" == b) if (a) {
                    if (a instanceof Array) return "array";
                    if (a instanceof Object) return b;
                    var c = Object.prototype.toString.call(a);
                    if ("[object Window]" == c) return "object";
                    if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) return "array";
                    if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) return "function"
                } else return "null"; else if ("function" == b && "undefined" == typeof a.call) return "object";
                return b
            }, u = function (a, b) {
                function c() {
                }

                c.prototype = b.prototype;
                a.prototype = new c;
                a.prototype.constructor = a
            };
            var v = function (a, b) {
                Object.defineProperty(l, a, {
                    configurable: !1, get: function () {
                        return b
                    }, set: q
                })
            };
            var y = function (a, b) {
                this.b = a === w && b || "";
                this.a = x
            }, x = {}, w = {};
            var aa = function (a, b) {
                a.src = b instanceof y && b.constructor === y && b.a === x ? b.b : "type_error:TrustedResourceUrl";
                if (null === p) b:{
                    b = l.document;
                    if ((b = b.querySelector && b.querySelector("script[nonce]")) && (b = b.nonce || b.getAttribute("nonce")) && m.test(b)) {
                        p = b;
                        break b
                    }
                    p = ""
                }
                b = p;
                b && a.setAttribute("nonce", b)
            };
            var z = function () {
                return Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ +new Date).toString(36)
            };
            var A = function (a, b) {
                b = String(b);
                "application/xhtml+xml" === a.contentType && (b = b.toLowerCase());
                return a.createElement(b)
            }, B = function (a) {
                this.a = a || l.document || document
            };
            B.prototype.appendChild = function (a, b) {
                a.appendChild(b)
            };
            var C = function (a, b, c, d, e, f) {
                try {
                    var k = a.a, h = A(a.a, "SCRIPT");
                    h.async = !0;
                    aa(h, b);
                    k.head.appendChild(h);
                    h.addEventListener("load", function () {
                        e();
                        d && k.head.removeChild(h)
                    });
                    h.addEventListener("error", function () {
                        0 < c ? C(a, b, c - 1, d, e, f) : (d && k.head.removeChild(h), f())
                    })
                } catch (n) {
                    f()
                }
            };
            var ba = l.atob("aHR0cHM6Ly93d3cuZ3N0YXRpYy5jb20vaW1hZ2VzL2ljb25zL21hdGVyaWFsL3N5c3RlbS8xeC93YXJuaW5nX2FtYmVyXzI0ZHAucG5n"),
                ca = l.atob("WW91IGFyZSBzZWVpbmcgdGhpcyBtZXNzYWdlIGJlY2F1c2UgYWQgb3Igc2NyaXB0IGJsb2NraW5nIHNvZnR3YXJlIGlzIGludGVyZmVyaW5nIHdpdGggdGhpcyBwYWdlLg=="),
                da = l.atob("RGlzYWJsZSBhbnkgYWQgb3Igc2NyaXB0IGJsb2NraW5nIHNvZnR3YXJlLCB0aGVuIHJlbG9hZCB0aGlzIHBhZ2Uu"),
                ea = function (a, b, c) {
                    this.b = a;
                    this.f = new B(this.b);
                    this.a = null;
                    this.c = [];
                    this.g = !1;
                    this.i = b;
                    this.h = c
                }, F = function (a) {
                    if (a.b.body && !a.g) {
                        var b = function () {
                            D(a);
                            l.setTimeout(function () {
                                return E(a, 3)
                            }, 50)
                        };
                        C(a.f, a.i, 2, !0, function () {
                            l[a.h] || b()
                        }, b);
                        a.g = !0
                    }
                }, D = function (a) {
                    for (var b = G(1, 5), c = 0; c < b; c++) {
                        var d = H(a);
                        a.b.body.appendChild(d);
                        a.c.push(d)
                    }
                    b = H(a);
                    b.style.bottom = "0";
                    b.style.left = "0";
                    b.style.position = "fixed";
                    b.style.width = G(100, 110).toString() + "%";
                    b.style.zIndex = G(2147483544, 2147483644).toString();
                    b.style["background-color"] = I(249, 259, 242, 252, 219, 229);
                    b.style["box-shadow"] = "0 0 12px #888";
                    b.style.color = I(0, 10, 0, 10, 0, 10);
                    b.style.display = "flex";
                    b.style["justify-content"] = "center";
                    b.style["font-family"] = "Roboto, Arial";
                    c = H(a);
                    c.style.width = G(80, 85).toString() + "%";
                    c.style.maxWidth = G(750, 775).toString() + "px";
                    c.style.margin = "24px";
                    c.style.display = "flex";
                    c.style["align-items"] = "flex-start";
                    c.style["justify-content"] = "center";
                    d = A(a.f.a, "IMG");
                    d.className = z();
                    d.src = ba;
                    d.style.height = "24px";
                    d.style.width = "24px";
                    d.style["padding-right"] = "16px";
                    var e = H(a), f = H(a);
                    f.style["font-weight"] = "bold";
                    f.textContent = ca;
                    var k = H(a);
                    k.textContent = da;
                    J(a, e, f);
                    J(a, e, k);
                    J(a, c, d);
                    J(a, c, e);
                    J(a, b, c);
                    a.a = b;
                    a.b.body.appendChild(a.a);
                    b = G(1, 5);
                    for (c = 0; c < b; c++) d = H(a), a.b.body.appendChild(d), a.c.push(d)
                }, J = function (a, b, c) {
                    for (var d = G(1, 5), e = 0; e < d; e++) {
                        var f = H(a);
                        b.appendChild(f)
                    }
                    b.appendChild(c);
                    c = G(1, 5);
                    for (d = 0; d < c; d++) e = H(a), b.appendChild(e)
                }, G = function (a, b) {
                    return Math.floor(a + Math.random() * (b - a))
                }, I = function (a, b, c, d, e, f) {
                    return "rgb(" + G(Math.max(a, 0), Math.min(b, 255)).toString() + "," + G(Math.max(c, 0), Math.min(d, 255)).toString() + "," + G(Math.max(e, 0), Math.min(f, 255)).toString() + ")"
                }, H = function (a) {
                    a = A(a.f.a, "DIV");
                    a.className = z();
                    return a
                }, E = function (a, b) {
                    0 >= b || null != a.a && 0 != a.a.offsetHeight && 0 != a.a.offsetWidth || (fa(a), D(a), l.setTimeout(function () {
                        return E(a, b - 1)
                    }, 50))
                }, fa = function (a) {
                    var b = a.c;
                    var c = "undefined" != typeof Symbol && Symbol.iterator && b[Symbol.iterator];
                    b = c ? c.call(b) : {next: g(b)};
                    for (c = b.next(); !c.done; c = b.next()) (c = c.value) && c.parentNode && c.parentNode.removeChild(c);
                    a.c = [];
                    (b = a.a) && b.parentNode && b.parentNode.removeChild(b);
                    a.a = null
                };
            var ia = function (a, b, c, d, e) {
                var f = ha(c), k = function (n) {
                    n.appendChild(f);
                    l.setTimeout(function () {
                        f ? (0 !== f.offsetHeight && 0 !== f.offsetWidth ? b() : a(), f.parentNode && f.parentNode.removeChild(f)) : a()
                    }, d)
                }, h = function (n) {
                    document.body ? k(document.body) : 0 < n ? l.setTimeout(function () {
                        h(n - 1)
                    }, e) : b()
                };
                h(3)
            }, ha = function (a) {
                var b = document.createElement("div");
                b.className = a;
                b.style.width = "1px";
                b.style.height = "1px";
                b.style.position = "absolute";
                b.style.left = "-10000px";
                b.style.top = "-10000px";
                b.style.zIndex = "-10000";
                return b
            };
            var K = {}, L = null;
            var M = function () {
            }, N = "function" == typeof Uint8Array, O = function (a, b) {
                a.b = null;
                b || (b = []);
                a.j = void 0;
                a.f = -1;
                a.a = b;
                a:{
                    if (b = a.a.length) {
                        --b;
                        var c = a.a[b];
                        if (!(null === c || "object" != typeof c || Array.isArray(c) || N && c instanceof Uint8Array)) {
                            a.g = b - a.f;
                            a.c = c;
                            break a
                        }
                    }
                    a.g = Number.MAX_VALUE
                }
                a.i = {}
            }, P = [], Q = function (a, b) {
                if (b < a.g) {
                    b += a.f;
                    var c = a.a[b];
                    return c === P ? a.a[b] = [] : c
                }
                if (a.c) return c = a.c[b], c === P ? a.c[b] = [] : c
            }, R = function (a, b, c) {
                a.b || (a.b = {});
                if (!a.b[c]) {
                    var d = Q(a, c);
                    d && (a.b[c] = new b(d))
                }
                return a.b[c]
            };
            M.prototype.h = N ? function () {
                var a = Uint8Array.prototype.toJSON;
                Uint8Array.prototype.toJSON = function () {
                    var b;
                    void 0 === b && (b = 0);
                    if (!L) {
                        L = {};
                        for (var c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""), d = ["+/=", "+/", "-_=", "-_.", "-_"], e = 0; 5 > e; e++) {
                            var f = c.concat(d[e].split(""));
                            K[e] = f;
                            for (var k = 0; k < f.length; k++) {
                                var h = f[k];
                                void 0 === L[h] && (L[h] = k)
                            }
                        }
                    }
                    b = K[b];
                    c = [];
                    for (d = 0; d < this.length; d += 3) {
                        var n = this[d], t = (e = d + 1 < this.length) ? this[d + 1] : 0;
                        h = (f = d + 2 < this.length) ? this[d + 2] : 0;
                        k = n >> 2;
                        n = (n & 3) << 4 | t >> 4;
                        t = (t & 15) << 2 | h >> 6;
                        h &= 63;
                        f || (h = 64, e || (t = 64));
                        c.push(b[k], b[n], b[t] || "", b[h] || "")
                    }
                    return c.join("")
                };
                try {
                    return JSON.stringify(this.a && this.a, S)
                } finally {
                    Uint8Array.prototype.toJSON = a
                }
            } : function () {
                return JSON.stringify(this.a && this.a, S)
            };
            var S = function (a, b) {
                return "number" !== typeof b || !isNaN(b) && Infinity !== b && -Infinity !== b ? b : String(b)
            };
            M.prototype.toString = function () {
                return this.a.toString()
            };
            var T = function (a) {
                O(this, a)
            };
            u(T, M);
            var U = function (a) {
                O(this, a)
            };
            u(U, M);
            var ja = function (a, b) {
                this.c = new B(a);
                var c = R(b, T, 5);
                c = new y(w, Q(c, 4) || "");
                this.b = new ea(a, c, Q(b, 4));
                this.a = b
            }, ka = function (a, b, c, d) {
                b = new T(b ? JSON.parse(b) : null);
                b = new y(w, Q(b, 4) || "");
                C(a.c, b, 3, !1, c, function () {
                    ia(function () {
                        F(a.b);
                        d(!1)
                    }, function () {
                        d(!0)
                    }, Q(a.a, 2), Q(a.a, 3), Q(a.a, 1))
                })
            };
            var la = function (a, b) {
                V(a, "internal_api_load_with_sb", function (c, d, e) {
                    ka(b, c, d, e)
                });
                V(a, "internal_api_sb", function () {
                    F(b.b)
                })
            }, V = function (a, b, c) {
                a = l.btoa(a + b);
                v(a, c)
            }, W = function (a, b, c) {
                for (var d = [], e = 2; e < arguments.length; ++e) d[e - 2] = arguments[e];
                e = l.btoa(a + b);
                e = l[e];
                if ("function" == r(e)) e.apply(null, d); else throw Error("API not exported.");
            };
            var X = function (a) {
                O(this, a)
            };
            u(X, M);
            var Y = function (a) {
                this.h = window;
                this.a = a;
                this.b = Q(this.a, 1);
                this.f = R(this.a, T, 2);
                this.g = R(this.a, U, 3);
                this.c = !1
            };
            Y.prototype.start = function () {
                ma();
                var a = new ja(this.h.document, this.g);
                la(this.b, a);
                na(this)
            };
            var ma = function () {
                var a = function () {
                    if (!l.frames.googlefcPresent) if (document.body) {
                        var b = document.createElement("iframe");
                        b.style.display = "none";
                        b.style.width = "0px";
                        b.style.height = "0px";
                        b.style.border = "none";
                        b.style.zIndex = "-1000";
                        b.style.left = "-1000px";
                        b.style.top = "-1000px";
                        b.name = "googlefcPresent";
                        document.body.appendChild(b)
                    } else l.setTimeout(a, 5)
                };
                a()
            }, na = function (a) {
                var b = Date.now();
                W(a.b, "internal_api_load_with_sb", a.f.h(), function () {
                    var c;
                    var d = a.b, e = l[l.btoa(d + "loader_js")];
                    if (e) {
                        e = l.atob(e);
                        e = parseInt(e, 10);
                        d = l.btoa(d + "loader_js").split(".");
                        var f = l;
                        d[0] in f || "undefined" == typeof f.execScript || f.execScript("var " + d[0]);
                        for (; d.length && (c = d.shift());) d.length ? f[c] && f[c] !== Object.prototype[c] ? f = f[c] : f = f[c] = {} : f[c] = null;
                        c = Math.abs(b - e);
                        c = 1728E5 > c ? 0 : c
                    } else c = -1;
                    0 != c && (W(a.b, "internal_api_sb"), Z(a, Q(a.a, 6)))
                }, function (c) {
                    Z(a, c ? Q(a.a, 4) : Q(a.a, 5))
                })
            }, Z = function (a, b) {
                a.c || (a.c = !0, a = new l.XMLHttpRequest, a.open("GET", b, !0), a.send())
            };
            (function (a, b) {
                l[a] = function (c) {
                    for (var d = [], e = 0; e < arguments.length; ++e) d[e - 0] = arguments[e];
                    l[a] = q;
                    b.apply(null, d)
                }
            })("__d3lUW8vwsKlB__", function (a) {
                "function" == typeof window.atob && (a = window.atob(a), a = new X(a ? JSON.parse(a) : null), (new Y(a)).start())
            });
        }).call(this);
        window.__d3lUW8vwsKlB__("WyJhYWIxZTI3NzM1NzE1YmJiIixbbnVsbCxudWxsLG51bGwsImh0dHBzOi8vZnVuZGluZ2Nob2ljZXNtZXNzYWdlcy5nb29nbGUuY29tL2YvQUdTS1d4V1ViWVl6YWxUVUpZcXFQc3RCZVBjWWRPdmZqQXNnQ01pc1JkSmV0YWhQcno4WTBhM0VSbEMyaGZ1TENSUGRpRnJoaHdiMllqallHMHl3OUtGWnNfOFx1MDAzZCJdCixbMjAsImRpdi1ncHQtYWQiLDEwMCwiWVdGaU1XVXlOemN6TlRjeE5XSmlZZ1x1MDAzZFx1MDAzZCIsW251bGwsbnVsbCxudWxsLCJodHRwczovL3d3dy5nc3RhdGljLmNvbS8wZW1uL2YvcC9hYWIxZTI3NzM1NzE1YmJiLmpzP3VzcXBcdTAwM2RDQVEiXQpdCiwiaHR0cHM6Ly9mdW5kaW5nY2hvaWNlc21lc3NhZ2VzLmdvb2dsZS5jb20vbC9BR1NLV3hVX09UazJkSjdsUTluaEFzbzNhVTQyeW9JMVFoNlhaQ2kyVEEyVmVhc3FvYXFqNGhkVmx3c0ZtWnB5U3NTMWM0MlBObnJubXNTQ3NySko0bTlrP2FiXHUwMDNkMSIsImh0dHBzOi8vZnVuZGluZ2Nob2ljZXNtZXNzYWdlcy5nb29nbGUuY29tL2wvQUdTS1d4VXRGcGMyeWRmSFJ3QTEzYmduOWR6UHQ2cE82dmJLOW9JQUJrZkxDS0FKaG9GUVlyYnJ6NV83TVpUbktJLVBpYVRnQWdLZTFXUXI1eEJmcTlLMz9hYlx1MDAzZDJcdTAwMjZzYmZcdTAwM2QxIiwiaHR0cHM6Ly9mdW5kaW5nY2hvaWNlc21lc3NhZ2VzLmdvb2dsZS5jb20vbC9BR1NLV3hWaUltOUFLRVNMSFJKNzVXQTF6eFhIUm9hWVk4blZDWDlpZHZlZnYwZUt2cHNGNHZQWk9ZVGM3cWwtZDI3MlZXaDF3cVV1cVVmcXdVbzYyRlpsP3NiZlx1MDAzZDIiXQo=");
        window.googlefc.callbackQueue.push({
            'AD_BLOCK_DATA_READY': () => {
                switch (window.googlefc.getAdBlockerStatus()) {
                    case window.googlefc.AdBlockerStatusEnum.EXTENSION_LEVEL_AD_BLOCKER:
                        if (window.ga) {
                            window.ga('send', 'event', 'adblock', 'on-extension', null);
                        }
                        break;
                    case window.googlefc.AdBlockerStatusEnum.NETWORK_LEVEL_AD_BLOCKER:
                        if (window.ga) {
                            window.ga('send', 'event', 'adblock', 'on-network', null);
                        }
                        break;
                }
            }
        });
    } catch (err) {
    }
    saveTimezone();
}