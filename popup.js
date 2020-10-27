// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let printRfi = document.getElementById('printRfi');
let openReadme = document.getElementById('openReadme')
let rfiNumber = ''
let rfiTitle = ''
let rfiUrl = ''

const downloadRfi = () => {chrome.downloads.download({
    url: rfiUrl,
    filename: `RFI ${rfiNumber} - ${rfiTitle}.pdf`
})}

// Downloads RFI with prepopulated filename information

printRfi.onclick = function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.storage.local.get("rfiNumber", (obj) => {
            rfiNumber = obj.rfiNumber
        })
        chrome.storage.local.get("rfiTitle", (obj) => {
            rfiTitle = obj.rfiTitle
            rfiUrl = tabs[0].url
            if (rfiUrl.includes('amazonaws.com/procore-pdf')){
                downloadRfi()
            }
        })
    })
}

