/*
 * ***** BEGIN LICENSE BLOCK *****
 *
 * Zimbra Collaboration Suite Zimlets
 * Copyright (C) 2006, 2007 Zimbra, Inc.
 *
 * The contents of this file are subject to the Yahoo! Public License
 * Version 1.0 ("License"); you may not use this file except in
 * compliance with the License.  You may obtain a copy of the License at
 * http://www.zimbra.com/license.
 *
 * Software distributed under the License is distributed on an "AS IS"
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied.
 *
 * ***** END LICENSE BLOCK *****
 */

//////////////////////////////////////////////////////////////////////////////
// Allows downloading a single email message
// @author Zimlet author: Raja Rao DV(rrao@zimbra.com)
//////////////////////////////////////////////////////////////////////////////

function com_zimbra_emaildownloader() {
}

com_zimbra_emaildownloader.prototype = new ZmZimletBase();
com_zimbra_emaildownloader.prototype.constructor = com_zimbra_emaildownloader;

com_zimbra_emaildownloader.prototype.doDrop =
function(msgObj) {
	this.srcMsgObj = msgObj.srcObj;
	if(this.srcMsgObj.type == "CONV"){
		this.srcMsgObj = this.srcMsgObj.getFirstHotMsg();
	}
	var url = [];
	var i = 0;
	var proto = location.protocol;
	var port = Number(location.port);
	url[i++] = proto;
	url[i++] = "//";
	url[i++] = location.hostname;
	if (port && ((proto == ZmSetting.PROTO_HTTP && port != ZmSetting.HTTP_DEFAULT_PORT) 
		|| (proto == ZmSetting.PROTO_HTTPS && port != ZmSetting.HTTPS_DEFAULT_PORT))) {
		url[i++] = ":";
		url[i++] = port;
	}
	url[i++] = "/home/";
	url[i++]= AjxStringUtil.urlComponentEncode(appCtxt.getActiveAccount().name);
	url[i++] = "/message.txt?fmt=tgz&id=";
	url[i++] = this.srcMsgObj.id;
	try{
		var subject = this.srcMsgObj.subject.replace(/\*/g, "").replace(/\[/g, "").replace(/\]/g, "").replace(/\</g, "").replace(/\>/g, "").replace(/\=/g, "").replace(/\+/g, "").replace(/\'/g, "").replace(/\"/g, "").replace(/\\/g, "").replace(/\//g, "").replace(/\,/g, "").replace(/\./g, "").replace(/\:/g, "").replace(/\;/g, "").replace(/ /g, "").replace(/!/g, ""); 
		if(subject.length > 16){
			subject = subject.substring(0,15);
        }
		url[i++] = "&filename=" + subject;
	} catch(e) {
	}
	var getUrl = url.join(""); 
	window.open(getUrl, "_blank");
};