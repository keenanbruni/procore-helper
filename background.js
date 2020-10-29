// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){ 
  let rfiNumber = request.rfi[0].rfiNumber
  let rfiTitle = request.rfi[1].rfiTitle
  chrome.storage.local.set({'rfiNumber' : rfiNumber})
  chrome.storage.local.set({'rfiTitle' : rfiTitle})
  sendResponse('sent from the background page (with love)')
})



