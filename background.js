// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let rfiNumber = ''
let rfiTitle = ''
let rfiPdfUrl = window.location.href

// Set RFI Number Title
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){ 
  if (request.rfi[0].rfiNumber){
    rfiNumber = request.rfi[0].rfiNumber
    rfiTitle = request.rfi[1].rfiTitle
    chrome.storage.local.set({'rfiNumber' : rfiNumber})
    chrome.storage.local.set({'rfiTitle' : rfiTitle})
  }
  sendResponse('sent from the background page (with love)')
})

// Download RFI PDF on message from content script
chrome.runtime.onMessage.addListener(function(request){
  if(request.download){
    function replaceNbsps(str) {
      var re = new RegExp(String.fromCharCode(160), "g");
      return str.replace(re, " ");
    } 
    chrome.downloads.download({
      url: request.download,
      filename: `RFI ${rfiNumber} - ${replaceNbsps(rfiTitle)}.pdf`
    })
  }
})



