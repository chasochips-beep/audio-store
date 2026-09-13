// 万能工具区（全篇共用，只写一次）
function $(s, r) { return (r || document).querySelector(s); }
function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
function openM(id) { var el = document.getElementById(id); if (el) el.classList.add('active'); }
function closeM(id) { var el = document.getElementById(id); if (el) el.classList.remove('active'); }

// 找到当前手机并打标记，避免重复初始化
function grabPhone(tag) {
  var list = $$('#w-dynamic-wrapper, .w-wrapper');
  for (var i = list.length - 1; i >= 0; i--) {
    if (list[i].dataset[tag] !== 'true') {
      list[i].dataset[tag] = 'true';
      return list[i];
    }
  }
  return null;
}

// 算存储钥匙（roleId 和 pageId 只算一次，缓存到 dataset 里）
function makeOKey(wrapper, key) {
  if (!wrapper.dataset.roleId) {
    var tpl = wrapper.querySelector('.seb-chat-data');
    wrapper.dataset.roleId = tpl ? (tpl.innerHTML.match(/<n>(.*?)<\/n>/)?.[1] || 'default') : 'default';
  }
  if (!wrapper.dataset.pageId) {
    try { wrapper.dataset.pageId = window.parent.location.href.replace(/[^a-zA-Z0-9]/g, '_'); }
    catch (e) { wrapper.dataset.pageId = 'idx'; }
  }
  return 'w_os_' + wrapper.dataset.roleId + '_' + wrapper.dataset.pageId + '_' + key;
}

// 塞字进父窗口输入框
function triggerParentInput(text) {
  try {
    var pd = window.parent.document;
    var ta = pd.querySelector('textarea.flex.rounded-xl.border.border-input') || pd.querySelector('textarea');
    if (!ta) return;
    var setter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set;
    var cur = ta.value || '';
    setter.call(ta, cur + (cur && !cur.endsWith('\n') ? '\n' : '') + text);
    ta.dispatchEvent(new Event('input', { bubbles: true }));
    ta.focus();
  } catch (e) {}
}
window.triggerParentInput = triggerParentInput;

// 弹提示框（在最新那台手机里）
function showToast(title, message, isSuccess) {
  var list = $$('.w-wrapper');
  var w = list[list.length - 1];
  if (!w) return;
  var modal = w.querySelector('#w-toast-modal');
  var titleEl = w.querySelector('#w-toast-title');
  var msgEl = w.querySelector('#w-toast-message');
  var confirmBtn = w.querySelector('#w-toast-confirm');
  if (!modal) return;
  titleEl.textContent = title || (isSuccess ? '成功' : '提示');
  msgEl.innerHTML = (message || '').replace(/\n/g, '<br>');
  confirmBtn.style.color = isSuccess ? '#07c160' : '#e64340';
  modal.classList.add('active');
  confirmBtn.onclick = function () { modal.classList.remove('active'); };
  modal.onclick = function (e) { if (e.target === modal) modal.classList.remove('active'); };
}
window.showToast = showToast;

// 表情映射
var bqbMap = {
  '表情包1':'https://pic2.zhimg.com/80/v2-10edc0f0009489d86904fa96243d1197_720w.jpg',
  '表情包2':'https://picx.zhimg.com/80/v2-42de2bf29fffd3da07cf691bbb4938b7_720w.jpg',
  '表情包3':'https://pica.zhimg.com/80/v2-0856c3157fd5652e1a98d92e02cffc46_720w.webp',
  '表情包4':'https://pic2.zhimg.com/80/v2-b66acaacb71ede1c1a37e45ab157c25b_720w.webp',
  '表情包5':'https://pica.zhimg.com/80/v2-cc3cfb19a2f753b0c552698e5c0ad518_720w.webp',
  '表情包6':'https://pic4.zhimg.com/80/v2-d6327303421453a73070d87a95d73bbd_720w.webp',
  '表情包7':'https://pic2.zhimg.com/80/v2-01d878a50b977cb4b48a56449d867e01_720w.webp',
  '表情包8':'https://pica.zhimg.com/80/v2-96a2fbc733ade7bac3870d06c4455f78_720w.webp',
  '表情包9':'https://picx.zhimg.com/80/v2-07bf94e881ebb656f95b15238814f47b_720w.webp',
  '表情包10':'https://pic1.zhimg.com/80/v2-f87c7de5cde8bbd501b2361bb224d4d2_720w.webp',
  '表情包11':'https://pic3.zhimg.com/80/v2-6ef49ed49b2a6a05adf34569c6c0152c_720w.webp',
  '表情包12':'https://pic4.zhimg.com/80/v2-da824dd48f8165c3602435907c51789b_720w.webp',
  '表情包13':'https://pic1.zhimg.com/80/v2-d011c75b3addba890917a3c21d12ee00_720w.webp',
  '表情包14':'https://pica.zhimg.com/80/v2-9e1977b900add602d366a89498afa864_720w.webp',
  '表情包15':'https://pic2.zhimg.com/80/v2-aca5f4baeb9ed65ded422c6e88272a5d_720w.webp',
  '表情包16':'https://pic2.zhimg.com/80/v2-69b2220e4d3f235a09971f8f38f690c1_720w.webp',
  '表情包17':'https://pic3.zhimg.com/80/v2-d1021dd13228b996b0a6ce986c514e6a_720w.webp',
  '表情包18':'https://picx.zhimg.com/80/v2-7cc09965f9d69cd42d41194e958679a9_720w.webp',
  '表情包19':'https://picx.zhimg.com/80/v2-b21696a1e1c79a915ca4a8e02865bc13_720w.webp',
  '表情包20':'https://picx.zhimg.com/80/v2-7046a8cf778be6b21466527d5ffca95b_720w.webp',
  '表情包21':'https://pica.zhimg.com/80/v2-6f1dc88e049260d1089291edfb251df6_720w.webp',
  '表情包22':'https://pic3.zhimg.com/80/v2-3c084aed1f84be2cba518d0169d7b740_720w.webp',
  '表情包23':'https://picx.zhimg.com/80/v2-f99c263a52aaf474f2a40a7056f19e41_720w.webp',
  '表情包24':'https://pic3.zhimg.com/80/v2-7bb65ee1e95b57737f627f328764967c_720w.webp',
  '表情包25':'https://pica.zhimg.com/80/v2-47ae09a29be6f515898249b43d4801ca_720w.webp',
  '表情包26':'https://pic2.zhimg.com/80/v2-1d46ce7a4c2f2422c5fc48e0ef714b51_720w.webp',
  '表情包27':'https://pic3.zhimg.com/80/v2-223d8a5bc9b833480c284fdd87307790_720w.webp',
  '表情包28':'https://pic2.zhimg.com/80/v2-94fa9183daa76e6c793cc68abe961657_720w.webp',
  '表情包29':'https://pic4.zhimg.com/80/v2-e5ebbfebc1f99fd60a3e6386591f1eab_720w.webp',
  '表情包30':'https://pica.zhimg.com/80/v2-b70bda0ad1da8e36a107607a9a926566_720w.webp',
  '表情包31':'https://pic3.zhimg.com/80/v2-bc2851565d32054e719e336e68691e44_720w.webp',
  '表情包32':'https://pic3.zhimg.com/80/v2-80856f9d2d96cfb6a47e97024d459de0_720w.webp',
  '表情包33':'https://pic1.zhimg.com/80/v2-b89feb8bf545585649f06b3f2ae8a2d0_720w.webp',
  '表情包34':'https://pica.zhimg.com/80/v2-68d9b920183747befc7ec18b72bc670c_720w.webp',
  '表情包35':'https://pic4.zhimg.com/80/v2-2d52f523d712f98255ca8e909f97a9bb_720w.webp',
  '表情包36':'https://picx.zhimg.com/80/v2-2dee74ae4856ac9e1b3682734d62bef5_720w.webp',
  '表情包37':'https://pic2.zhimg.com/80/v2-41a7fef7a9ecdbb5fa94cab2e3914da3_720w.webp',
  '表情包38':'https://pic4.zhimg.com/80/v2-a392064b1dea3b42ef0e30a06ac086c7_720w.webp',
  '表情包39':'https://pica.zhimg.com/80/v2-c8b7fecf495648f1898c6a6d3ae4d614_720w.webp',
  '表情包40':'https://pica.zhimg.com/80/v2-230de0bfea5cacb52aa31489df298062_720w.webp',
  '表情包41':'https://pic3.zhimg.com/80/v2-79f8fcaabf99a166467b2d2b54f6f5ea_720w.webp'
};

// 气泡渲染器（正常消息 + 撤回鬼影共用同一个）
function buildBubbleHtml(type, parts, side, opts) {
  var savedOtherColor = opts.savedOtherColor;
  var savedMeColor = opts.savedMeColor;
  var defaultBubbleCls = side === 'l' ? ('w-bubble-' + savedOtherColor) : ('w-bubble-' + savedMeColor);
  var esc = function (t) { var d = document.createElement('div'); d.textContent = (t == null ? '' : t); return d.innerHTML; };

  switch (type) {
    case 't': return '<div class="w-bubble ' + defaultBubbleCls + '">' + esc(parts[1]) + '</div>';
    case 'i': return '<img src="' + (parts[1] || '') + '" class="w-msg-img">';
    case 'bqb': return '<img src="' + (bqbMap[parts[1]] || bqbMap['表情包1']) + '" class="w-bqb-img">';
    case 'imgt':
      var fullText = parts[2] || parts[1] || '[图片]';
      return '<div class="w-bubble-wrap"><div class="w-fake-img-container" onclick="showFakeImgFull(this)">' +
        '<div class="w-img-thumb"><svg class="w-img-thumb-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="8" width="18" height="12" rx="2"/><path d="M16 8v-2a2 2 0 0 0-2-2H10a2 2 0 0 0-2 2v2"/><circle cx="12" cy="14" r="3"/></svg>' +
        '<div class="w-img-thumb-text">' + esc(fullText) + '</div><div class="w-img-thumb-hint">点击查看大图</div></div>' +
        '<div style="display:none;" class="w-fake-full-text">' + esc(fullText) + '</div></div></div>';
    case 'v':
      return '<div class="w-bubble ' + defaultBubbleCls + '" onclick="toggleVoiceText(this)"><div class="w-voice-box ' + (side === 'r' ? 'w-voice-right' : '') + '"><svg class="w-voice-icon" viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="2"><path d="M12 5v14M8 9v6M16 7v10M4 11v2M20 10v4"/></svg><span class="w-voice-sec">' + esc(parts[1] || '5') + '"</span>' + (side === 'l' ? '<div class="w-voice-dot"></div>' : '') + '</div>' + (parts[2] ? '<div class="w-voice-text">' + esc(parts[2]) + '</div>' : '') + '</div>';
    case 'vd':
      var vdStatus = parts[1] || '通话时长 00:00';
      var vdMissed = (vdStatus.indexOf('取消') > -1 || vdStatus.indexOf('未应答') > -1) ? 'w-voice-missed' : '';
      return '<div class="w-bubble ' + defaultBubbleCls + ' ' + vdMissed + '"><div class="w-video-box ' + (side === 'r' ? 'w-video-right' : '') + '" style="cursor:pointer;"><svg class="w-video-call-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px;flex-shrink:0;"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg><span>' + esc(vdStatus) + '</span></div></div>';
    case 'vc':
      var vcStatus = parts[1] || '通话时长 00:00';
      var vcMissed = (vcStatus.indexOf('取消') > -1 || vcStatus.indexOf('未应答') > -1) ? 'w-voice-missed' : '';
      var vcRight = side === 'r' ? 'w-voice-call-right' : '';
      return '<div class="w-bubble-wrap"><div class="w-bubble ' + defaultBubbleCls + ' w-voice-trigger ' + vcMissed + ' ' + vcRight + '"><svg class="w-voice-call-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px;transform:rotate(135deg);flex-shrink:0;"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg><span>' + esc(vcStatus) + '</span></div></div>';
    case 'hb':
      var hbAmt = parts[1] || '0.00'; var hbDesc = parts[2] || '恭喜发财'; var hbState = parts[3] || '未领取';
      var hbOpened = hbState.indexOf('已') > -1 ? 'w-bubble-opened' : '';
      var hbSide = side === 'l' ? 'w-bubble-orange-left w-hb-bubble' : 'w-bubble-orange-right w-hb-self-bubble';
      return '<div class="w-bubble w-bubble-orange ' + hbSide + ' ' + hbOpened + '" data-amt="' + esc(hbAmt) + '" data-desc="' + esc(hbDesc) + '" data-opened="' + (hbState.indexOf('已') > -1) + '"><div class="w-orange-top"><div class="w-orange-icon"><svg width="28" height="34" viewBox="0 0 24 30" fill="#f4ca99"><path d="M4 2h16a2 2 0 0 1 2 2v22a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/><path d="M2 10s4 4 10 4 10-4 10-4" stroke="#f28b22" stroke-width="2" fill="none"/><circle cx="12" cy="14" r="3" fill="#f28b22"/></svg></div><div class="w-orange-info"><div class="w-orange-title w-hb-title-text">' + esc(hbDesc) + '</div><div class="w-orange-sub w-hb-sub-text">' + esc(hbState) + '</div></div></div><div class="w-orange-bot">微信红包</div></div>';
    case 'tf':
      var tfAmt = parts[1] || '0.00'; var tfStatus = parts[2] || (side === 'l' ? '转账给你' : '转账给 对方');
      var tfSide = side === 'l' ? 'w-bubble-orange-left' : 'w-bubble-orange-right';
      var tfRecv = tfStatus.indexOf('已收款') > -1 || tfStatus.indexOf('已被接收') > -1;
      var tfRet = tfStatus.indexOf('已退还') > -1 || tfStatus.indexOf('已被退还') > -1;
      var tfOpened = (tfRecv || tfRet) ? 'w-bubble-opened' : '';
      var tfIcon = tfRecv ? '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>' : '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 10h10M17 10l-3-3M17 14H7M7 14l3 3"/><circle cx="12" cy="12" r="10" stroke-opacity="0.3"/></svg>';
      var tfTarget = tfStatus.indexOf('转账给') > -1 ? tfStatus.replace('转账给', '').trim() : '';
      return '<div class="w-bubble w-bubble-orange ' + tfSide + ' ' + tfOpened + ' w-tf-bubble" data-amt="' + esc(tfAmt) + '" data-action="' + (side === 'l' ? 'recv' : 'send') + '" data-status="' + (tfRecv ? 'received' : (tfRet ? 'returned' : 'pending')) + '" data-target="' + esc(tfTarget) + '"><div class="w-orange-top"><div class="w-orange-icon">' + tfIcon + '</div><div class="w-orange-info"><div class="w-orange-title">￥' + esc(tfAmt) + '</div><div class="w-orange-sub tf-status-text">' + esc(tfStatus) + '</div></div></div><div class="w-orange-bot">微信转账</div></div>';
    case 'tfr':
      var trAmt = parts[1] || '0.00'; var trStatus = parts[2] || '已收款';
      var trRecv = trStatus === '已收款'; var trRet = trStatus === '已退还';
      var trDataStatus = trRecv || !trRet ? 'received' : 'returned';
      var trRole = side === 'l' ? 'other' : 'me';
      var trDesc = trRecv ? (trRole === 'other' ? '对方已收款，资金已存入对方零钱' : '你已收款，资金已存入零钱') : (trRet ? (trRole === 'other' ? '对方已退还' : '你已退还') : '');
      var trIcon = trRecv ? '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>' : (trRet ? '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 14l-4-4 4-4"/><path stroke-linecap="round" stroke-linejoin="round" d="M5 10h11a4 4 0 1 1 0 8h-1"/></svg>' : '');
      var trSide = side === 'l' ? 'w-bubble-orange-left' : 'w-bubble-orange-right';
      return '<div class="w-bubble w-bubble-orange ' + trSide + ' w-bubble-opened w-tf-bubble" data-amt="' + esc(trAmt) + '" data-action="readonly" data-status="' + trDataStatus + '" data-role="' + trRole + '" style="cursor:pointer;"><div class="w-orange-top"><div class="w-orange-icon">' + trIcon + '</div><div class="w-orange-info"><div class="w-orange-title">￥' + esc(trAmt) + '</div><div class="w-orange-sub tf-status-text">' + esc(trStatus) + '</div></div></div><div class="w-orange-bot">' + esc(trDesc) + '</div></div>';
    case 'loc':
      return '<div class="w-bubble w-bubble-white w-bubble-card w-card-width w-msg-clickable" data-msg-type="loc" style="padding:0;"><div class="w-loc-info"><div class="w-loc-title" style="font-size:12px;line-height:1.3;">' + esc(parts[1] || '未知地点') + '</div><div class="w-loc-sub" style="font-size:10px;line-height:1.2;margin-top:2px;">' + esc(parts[2] || '') + '</div></div><div class="w-loc-map" style="height:55px;"><svg class="w-loc-pin" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg></div></div>';
    case 'cd':
      var cdName = parts[1] || '联系人'; var cdWxid = parts[2] || '微信号'; var cdAva = parts[3] || 'https://q4.itc.cn/q_70/images03/20240613/1337649c5c614354af05b57731980a32.jpeg';
      return '<div class="w-bubble w-bubble-white w-bubble-card w-card-width" style="padding:0;"><div class="w-card-top"><div class="w-card-avatar" style="background-image:url(\'' + esc(cdAva) + '\');"></div><div class="w-card-info"><div class="w-card-name">' + esc(cdName) + '</div><div class="w-card-id">' + esc(cdWxid) + '</div></div></div><div class="w-card-bot">个人名片</div></div>';
    case 'lnk':
      return '<div class="w-bubble w-bubble-white w-bubble-card w-msg-clickable" data-msg-type="link" style="max-width:215px;width:100%;"><div class="w-link-title">' + esc(parts[1] || '标题') + '</div><div class="w-link-main"><div class="w-link-desc">' + esc(parts[2] || '描述') + '</div><img src="' + esc(parts[3] || 'https://img0.baidu.com/it/u=3997181045,3946027856&fm=253&fmt=auto&app=138&f=JPEG?w=300&h=300') + '" class="w-link-thumb"></div></div>';
    case 'q':
      return '<div class="w-bubble-wrap"><div class="w-bubble ' + defaultBubbleCls + '" style="cursor:pointer;"><div>' + esc(parts[1] || '') + '</div><div class="w-quote-box">' + esc(parts[2] || '') + '</div></div></div>';
    case 'f': {
      var fName = parts[1] || '未知文件';
      var fSize = parts[2] || '0 KB';
      var fExt = fName.indexOf('.') > -1 ? fName.split('.').pop().toLowerCase() : '';
      var getFileSvg = function (bgColor, foldColor, text) { return '<svg class="w-file-icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:42px;height:42px;flex-shrink:0;"><path d="M9 4C9 2.89543 9.89543 2 11 2H29L41 14V44C41 45.1046 40.1046 46 39 46H11C9.89543 46 9 45.1046 9 44V4Z" fill="' + bgColor + '"/><path d="M29 2L41 14H31C29.8954 14 29 13.1046 29 12V2Z" fill="' + foldColor + '"/><rect x="13" y="24" width="22" height="12" rx="2" fill="white" fill-opacity="0.2"/><text x="24" y="33" fill="white" font-size="9" font-family="Arial,Helvetica,sans-serif" font-weight="900" text-anchor="middle" letter-spacing="1">' + text + '</text><rect x="14" y="16" width="10" height="3" rx="1.5" fill="white" fill-opacity="0.5"/><rect x="14" y="20" width="6" height="3" rx="1.5" fill="white" fill-opacity="0.5"/></svg>'; };
      var zipSvg = '<svg class="w-file-icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:42px;height:42px;flex-shrink:0;"><path d="M9 4C9 2.89543 9.89543 2 11 2H29L41 14V44C41 45.1046 40.1046 46 39 46H11C9.89543 46 9 45.1046 9 44V4Z" fill="#FFC107"/><path d="M29 2L41 14H31C29.8954 14 29 13.1046 29 12V2Z" fill="#FFE082"/><path d="M21 2V12M27 2V12M24 5V15M24 18V22H21V28H27V22H24" stroke="#D4A000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><text x="24" y="37" fill="white" font-size="10" font-family="Arial,Helvetica,sans-serif" font-weight="900" text-anchor="middle" letter-spacing="1" style="text-shadow:0px 1px 2px rgba(0,0,0,0.2);">ZIP</text></svg>';
      var getMediaSvg = function (bgColor, iconPath, text) { return '<svg class="w-file-icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:42px;height:42px;flex-shrink:0;"><rect x="4" y="4" width="40" height="40" rx="10" fill="' + bgColor + '"/><circle cx="24" cy="21" r="12" fill="white" fill-opacity="0.15"/><path d="' + iconPath + '" fill="white"/><text x="24" y="41" fill="white" font-size="8" font-family="Arial,Helvetica,sans-serif" font-weight="900" text-anchor="middle" letter-spacing="1">' + text + '</text></svg>'; };
      var audioPath = "M25 12V23C24.2 22.4 23.2 22 22 22C19.8 22 18 23.8 18 26C18 28.2 19.8 30 22 30C24.5 30 26 28 26 25V15C28 17 30 19 31 22C31 19 29 14 25 12Z";
      var videoPath = "M19 13L32 21L19 29V13Z";
      var iconHtml = '';
      if (fExt.indexOf('pdf') > -1) iconHtml = getFileSvg('#E53935', '#FFCDD2', 'PDF');
      else if (fExt.indexOf('xls') > -1 || fExt.indexOf('csv') > -1) iconHtml = getFileSvg('#43A047', '#C8E6C9', 'XLS');
      else if (fExt.indexOf('ppt') > -1) iconHtml = getFileSvg('#FB8C00', '#FFE0B2', 'PPT');
      else if (fExt.indexOf('zip') > -1 || fExt.indexOf('rar') > -1 || fExt.indexOf('7z') > -1) iconHtml = zipSvg;
      else if (fExt.indexOf('txt') > -1 || fExt.indexOf('md') > -1 || fExt.indexOf('json') > -1) iconHtml = getFileSvg('#757575', '#E0E0E0', 'TXT');
      else if (fExt.indexOf('doc') > -1 || fExt.indexOf('wps') > -1) iconHtml = getFileSvg('#1E88E5', '#BBDEFB', 'DOC');
      else if (fExt.indexOf('mp3') > -1 || fExt.indexOf('wav') > -1 || fExt.indexOf('flac') > -1) iconHtml = getMediaSvg('#9C27B0', audioPath, 'AUDIO');
      else if (fExt.indexOf('mp4') > -1 || fExt.indexOf('avi') > -1 || fExt.indexOf('mov') > -1 || fExt.indexOf('mkv') > -1) iconHtml = getMediaSvg('#E91E63', videoPath, 'VIDEO');
      else iconHtml = getFileSvg('#607D8B', '#CFD8DC', 'FILE');
      return '<div class="w-bubble w-bubble-white w-bubble-card w-msg-clickable" data-msg-type="file" style="max-width:230px;width:100%;"><div class="w-file-main" style="align-items:center;gap:12px;"><div class="w-file-info" style="flex:1;overflow:hidden;"><div class="w-file-name" style="font-weight:500;color:#333;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + esc(fName) + '</div><div class="w-file-size" style="font-size:11px;color:#888;margin-top:2px;">' + esc(fSize) + '</div></div>' + iconHtml + '</div></div>';
    }
    case 'vry':
      if (side === 'l') {
        return '<div class="w-vry-card"><div class="w-vry-title">对方请求添加你为朋友</div><div class="w-vry-msg">" ' + esc(parts[1] || '') + ' "</div><div class="w-vry-btn-group"><div class="w-vry-btn reject" onclick="rejectFriendVerify(this)">拒绝</div><div class="w-vry-btn accept" onclick="acceptFriendVerify(this)">通过</div></div></div>';
      } else {
        var curStat = (opts && opts.wrapper) ? (localStorage.getItem(makeOKey(opts.wrapper, 'relStatus')) || 'normal') : 'normal';
        var tip = curStat === 'normal' ? '对方已通过' : '等待对方通过';
        return '<div class="w-vry-card"><div class="w-vry-title">你发起了好友验证请求</div><div class="w-vry-msg">" ' + esc(parts[1] || '') + ' "</div><div style="font-size:11px;color:#999;text-align:center;margin-top:4px;">' + tip + '</div></div>';
      }
    case 'vrypass':
      return '<div class="w-vry-card"><div class="w-vry-title" style="color:#07c160;">' + (side === 'l' ? '对方已通过你的好友验证' : '你已通过对方的好友验证') + '</div>' + (parts[1] ? '<div class="w-vry-msg">" ' + esc(parts[1]) + ' "</div>' : '') + '<div style="font-size:11px;color:#07c160;text-align:center;margin-top:4px;">你们已恢复好友关系</div></div>';
    case 'vrydeny':
      return '<div class="w-vry-card"><div class="w-vry-title" style="color:#e64340;">' + (side === 'l' ? '对方拒绝了你的好友验证' : '你已拒绝对方的好友验证') + '</div>' + (parts[1] ? '<div class="w-vry-msg">" ' + esc(parts[1]) + ' "</div>' : '') + '<div style="font-size:11px;color:#999;text-align:center;margin-top:4px;">' + (side === 'l' ? '可稍后再试' : '') + '</div></div>';
    case 'err': {
      var errBubbleCls = side === 'l' ? ('w-bubble-' + savedOtherColor) : ('w-bubble-' + savedMeColor);
      return '<div class="w-bubble ' + errBubbleCls + '" style="position:relative;overflow:visible;">' + esc(parts[1] || '消息未发送') + '</div>';
    }
    default:
      return '<div class="w-bubble w-bubble-white">[不支持的消息类型]</div>';
  }
}

// 全屏假图片
window.showFakeImgFull = function (c) {
  var t = c.querySelector('.w-fake-full-text');
  if (!t) return;
  var w = c.closest('.w-wrapper');
  if (!w) return;
  var ov = w.querySelector('#w-fake-img-overlay');
  var tx = w.querySelector('#w-fake-img-text');
  if (!ov || !tx) return;
  tx.textContent = t.textContent.trim();
  ov.classList.add('active');
  document.body.style.overflow = 'hidden';
};
window.closeFakeImgFull = function () {
  $$('#w-fake-img-overlay.active').forEach(function (el) { el.classList.remove('active'); });
  document.body.style.overflow = '';
};
window.toggleVoiceText = function (el) {
  var tb = el.querySelector('.w-voice-text'), rd = el.querySelector('.w-voice-dot');
  if (!tb) return;
  if (tb.style.display === 'block') { tb.style.display = 'none'; }
  else { tb.style.display = 'block'; if (rd) rd.style.display = 'none'; }
};

// 模块：红包弹窗
(function () {
  var wrappers = $$('.w-wrapper');
  var wrapper = wrappers[wrappers.length - 1];
  if (!wrapper || wrapper.dataset.hbInited === 'true') return;
  wrapper.dataset.hbInited = 'true';

  var hm = wrapper.querySelector('#w-hb-modal');
  var ho = wrapper.querySelector('#w-hb-open');
  var hc = wrapper.querySelector('#w-hb-close');
  var hAmt = wrapper.querySelector('#w-hb-amount');
  var hDesc = wrapper.querySelector('#w-hb-desc');
  var hLink = wrapper.querySelector('#w-hb-link');
  var chatArea = wrapper.querySelector('#w-chat-bg');
  var currentBubble = null;
  if (!chatArea || !hm) return;

  hc.addEventListener('click', function () { hm.classList.remove('active'); });
  ho.addEventListener('click', function () {
    if (!currentBubble) return;
    ho.classList.add('w-hb-spinning');
    setTimeout(function () {
      ho.classList.remove('w-hb-spinning');
      ho.style.display = 'none';
      hAmt.style.display = 'block';
      hDesc.innerText = '已存入零钱';
      hLink.style.display = 'block';
      currentBubble.classList.add('w-bubble-opened');
      currentBubble.dataset.opened = 'true';
      var subText = currentBubble.querySelector('.w-hb-sub-text');
      if (subText) subText.innerText = '已领取';
      triggerParentInput('$系统提示：我已领取对方的红包，金额 ' + currentBubble.dataset.amt + ' 元');
    }, 400);
  });

  chatArea.addEventListener('click', function (e) {
    if (e.target.closest('.w-err-wrapper')) return;
    var hbLeft = e.target.closest('.w-hb-bubble');
    if (hbLeft) {
      currentBubble = hbLeft;
      hm.classList.add('active');
      var amt = hbLeft.dataset.amt || '0.00';
      var desc = hbLeft.dataset.desc || '恭喜发财';
      var hbTitle = wrapper.querySelector('.w-hb-name');
      var hbAva = wrapper.querySelector('.w-hb-avatar');
      var tName = wrapper.querySelector('#w-target-name');
      if (hbTitle) hbTitle.innerText = (tName ? tName.innerText : '对方') + '的红包';
      if (hbAva) {
        var row = hbLeft.closest('.w-row');
        var av = row ? row.querySelector('.w-avatar') : null;
        if (av) {
          hbAva.style.backgroundImage = window.getComputedStyle(av).backgroundImage;
          hbAva.style.backgroundColor = 'transparent';
          hbAva.style.border = 'none';
        }
        hbAva.classList.remove('w-avatar-me'); hbAva.classList.add('w-avatar-other');
      }
      hAmt.innerHTML = amt + '<span style="font-size:16px;">元</span>';
      if (hbLeft.dataset.opened === 'true') {
        ho.style.display = 'none'; hAmt.style.display = 'block';
        hDesc.innerText = '已存入零钱'; hLink.style.display = 'block';
      } else {
        ho.style.display = 'flex'; hAmt.style.display = 'none';
        hDesc.innerText = desc; hLink.style.display = 'none';
      }
      return;
    }
    var hbRight = e.target.closest('.w-hb-self-bubble');
    if (hbRight) {
      currentBubble = hbRight;
      hm.classList.add('active');
      var amt2 = hbRight.dataset.amt || '0.00';
      ho.style.display = 'none';
      hAmt.style.display = 'block';
      hAmt.innerHTML = amt2 + '<span style="font-size:16px;">元</span>';
      hDesc.innerText = hbRight.dataset.opened === 'true' ? '对方已领取' : '1个红包共' + amt2 + '元，等待对方领取';
      hLink.style.display = 'none';
      var hbTitle2 = wrapper.querySelector('.w-hb-name');
      var hbAva2 = wrapper.querySelector('.w-hb-avatar');
      if (hbTitle2) hbTitle2.innerText = '我的红包';
      if (hbAva2) {
        var row2 = hbRight.closest('.w-row');
        var av2 = row2 ? row2.querySelector('.w-avatar') : null;
        if (av2) {
          hbAva2.style.backgroundImage = window.getComputedStyle(av2).backgroundImage;
          hbAva2.style.backgroundColor = 'transparent';
          hbAva2.style.border = 'none';
        }
        hbAva2.classList.remove('w-avatar-other'); hbAva2.classList.add('w-avatar-me');
      }
    }
  });
})();

// 模块：转账弹窗
(function () {
  var wrappers = $$('.w-wrapper');
  var wrapper = wrappers[wrappers.length - 1];
  if (!wrapper || wrapper.dataset.tfInited === 'true') return;
  wrapper.dataset.tfInited = 'true';

  var rm = wrapper.querySelector('#w-tf-receive-modal');
  var rbtn = wrapper.querySelector('#w-tf-btn-recv');
  var retbtn = wrapper.querySelector('#w-tf-btn-return');
  var titleRecv = wrapper.querySelector('#w-tf-title-recv');
  var iconNormalRecv = wrapper.querySelector('#w-tf-icon-normal-recv');
  var iconSuccessRecv = wrapper.querySelector('#w-tf-icon-success-recv');
  var amtTextRecv = rm ? rm.querySelector('.w-tf-amount') : null;
  var dm = wrapper.querySelector('#w-tf-detail-modal');
  var titleDetail = dm ? dm.querySelector('.w-tf-title') : null;
  var amtTextDetail = dm ? dm.querySelector('.w-tf-amount') : null;
  var chatArea = wrapper.querySelector('#w-chat-bg');
  var currentTfBubble = null;
  if (!chatArea) return;

  rbtn.addEventListener('click', function () {
    if (!currentTfBubble) return;
    rbtn.style.display = 'none';
    retbtn.parentElement.style.display = 'none';
    iconNormalRecv.style.display = 'none';
    iconSuccessRecv.style.display = 'block';
    titleRecv.innerText = '已收款';
    currentTfBubble.classList.add('w-bubble-opened');
    currentTfBubble.dataset.status = 'received';
    var stText = currentTfBubble.querySelector('.tf-status-text');
    if (stText) stText.innerText = '已被接收';
    triggerParentInput('$转账操作提示：我已收款转账 ￥' + currentTfBubble.dataset.amt);
  });

  retbtn.addEventListener('click', function () {
    if (!currentTfBubble) return;
    rbtn.style.display = 'none';
    retbtn.parentElement.style.display = 'none';
    titleRecv.innerText = '已退还';
    iconNormalRecv.style.display = 'flex';
    iconSuccessRecv.style.display = 'none';
    iconNormalRecv.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 14l-4-4 4-4"/><path stroke-linecap="round" stroke-linejoin="round" d="M5 10h11a4 4 0 1 1 0 8h-1"/></svg>';
    currentTfBubble.classList.add('w-bubble-opened');
    currentTfBubble.dataset.status = 'returned';
    var stText = currentTfBubble.querySelector('.tf-status-text');
    if (stText) stText.innerText = '已被退还';
    triggerParentInput('$转账操作提示：我已退还转账 ￥' + currentTfBubble.dataset.amt);
  });

  chatArea.addEventListener('click', function (e) {
    if (e.target.closest('.w-err-wrapper')) return;
    var tfBubble = e.target.closest('.w-tf-bubble');
    if (!tfBubble) return;
    currentTfBubble = tfBubble;
    var action = tfBubble.dataset.action;
    var amt = tfBubble.dataset.amt || '0.00';
    var status = tfBubble.dataset.status || 'pending';

    if (action === 'recv') {
      if (!rm) return;
      rm.classList.add('active');
      if (amtTextRecv) amtTextRecv.innerHTML = '&yen;' + amt;
      if (status === 'received') {
        rbtn.style.display = 'none';
        retbtn.parentElement.style.display = 'none';
        iconNormalRecv.style.display = 'none';
        iconSuccessRecv.style.display = 'block';
        titleRecv.innerText = '已收款';
      } else if (status === 'returned') {
        rbtn.style.display = 'none';
        retbtn.parentElement.style.display = 'none';
        iconNormalRecv.style.display = 'none';
        iconSuccessRecv.style.display = 'none';
        titleRecv.innerText = '已退还';
      } else {
        rbtn.style.display = 'flex';
        retbtn.parentElement.style.display = 'block';
        iconNormalRecv.style.display = 'flex';
        iconSuccessRecv.style.display = 'none';
        titleRecv.innerText = '待收款';
      }
    } else if (action === 'send') {
      if (!dm) return;
      dm.classList.add('active');
      if (amtTextDetail) amtTextDetail.innerHTML = '&yen;' + amt;
      var targetName = tfBubble.dataset.target || '对方';
      if (status === 'received') titleDetail.innerText = targetName + ' 已收款';
      else if (status === 'returned') titleDetail.innerText = '转账已退还';
      else titleDetail.innerText = '待 ' + targetName + ' 收款';
    } else if (action === 'readonly') {
      var rom = wrapper.querySelector('#w-tf-readonly-modal');
      if (!rom) return;
      rom.classList.add('active');
      var roAmt = rom.querySelector('#w-tf-ro-amt');
      var roTitle = rom.querySelector('#w-tf-ro-title');
      var roDesc = rom.querySelector('#w-tf-ro-desc');
      var roIcon = rom.querySelector('#w-tf-ro-icon');
      var role = tfBubble.dataset.role;
      if (roAmt) roAmt.innerHTML = '&yen;' + amt;
      if (status === 'received') {
        roTitle.innerText = '已收款'; roTitle.style.color = '#07c160';
        roIcon.innerHTML = '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>';
        roIcon.setAttribute('stroke', '#07c160');
        roDesc.innerText = role === 'me' ? '你已收款，资金已存入零钱' : '对方已收款，资金已存入对方零钱';
      } else if (status === 'returned') {
        roTitle.innerText = '已退还'; roTitle.style.color = '#333';
        roIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 10h10M17 10l-3-3M17 14H7M7 14l3 3"/>';
        roIcon.setAttribute('stroke', '#333');
        roDesc.innerText = role === 'me' ? '你已退还' : '对方已退还';
      }
    }
  });
})();

// 模块：链接/文件/位置 详情弹窗
(function () {
  var wrappers = $$('.w-wrapper');
  var wrapper = wrappers[wrappers.length - 1];
  if (!wrapper || wrapper.dataset.detailInited === 'true') return;
  wrapper.dataset.detailInited = 'true';

  var modal = wrapper.querySelector('#detailModal');
  var body = wrapper.querySelector('#modalBody');
  var badge = wrapper.querySelector('#modalBadge');
  var closeBtn = wrapper.querySelector('#modalCloseBtn');
  var chat = wrapper.querySelector('#w-chat-bg');

  function esc(t) { var d = document.createElement('div'); d.textContent = t; return d.innerHTML; }
  function extractLink(b) {
    var t = b.querySelector('.w-link-title'), d = b.querySelector('.w-link-desc'), th = b.querySelector('.w-link-thumb');
    return { title: t ? t.textContent.trim() : '无标题', desc: d ? d.textContent.trim() : '暂无描述', thumbSrc: th ? th.getAttribute('src') : null };
  }
  function extractFile(b) {
    var n = b.querySelector('.w-file-name'), s = b.querySelector('.w-file-size'), i = b.querySelector('.w-file-icon');
    var full = n ? n.textContent.trim() : '未知文件';
    var ext = full.indexOf('.') > -1 ? full.split('.').pop().toUpperCase() : 'FILE';
    return { name: full, size: s ? s.textContent.trim() : '未知大小', ext: ext, iconHTML: i ? i.outerHTML : null };
  }
  function extractLoc(b) {
    var t = b.querySelector('.w-loc-title'), d = b.querySelector('.w-loc-sub');
    return { title: t ? t.textContent.trim() : '未知地点', desc: d ? d.textContent.trim() : '暂无详细地址' };
  }
  function openModal(type, data) {
    var map = { link: '链接', file: '文件', loc: '位置' };
    badge.textContent = map[type] || '消息';
    var html = '';
    if (type === 'link') html = (data.thumbSrc ? '<img src="' + esc(data.thumbSrc) + '" class="w-modal-link-thumb">' : '') + '<div class="w-modal-link-title">' + esc(data.title) + '</div><div class="w-modal-link-desc">' + esc(data.desc) + '</div><div class="w-modal-link-meta"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" stroke-width="1.5"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg><span>链接消息 · 点击查看完整内容</span></div>';
    else if (type === 'file') {
      var _ic = data.iconHTML || '<svg class="w-modal-file-icon" viewBox="0 0 24 24" fill="none"><path d="M4 4C4 2.89543 4.89543 2 6 2H13.1716C13.702 2 14.2107 2.21071 14.5858 2.58579L19.4142 7.41421C19.7893 7.78929 20 8.29799 20 8.82843V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V4Z" fill="#8E8E93"/><path d="M13 2.5V6C13 7.10457 13.8954 8 15 8H18.5" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/></svg>';
      html = '<div style="text-align:center;">' + _ic + '</div><div class="w-modal-file-name">' + esc(data.name) + '</div><div class="w-modal-file-size">' + esc(data.size) + '</div><div class="w-modal-file-type">' + esc(data.ext) + ' 文件</div><div class="w-modal-file-divider"></div><div class="w-modal-file-info-grid"><span class="label">文件名</span><span class="value">' + esc(data.name) + '</span><span class="label">大小</span><span class="value">' + esc(data.size) + '</span><span class="label">类型</span><span class="value">' + esc(data.ext) + '</span></div>';
    }
    else if (type === 'loc') html = '<div style="text-align:center;margin-bottom:16px;"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#e94f4f" stroke-width="1.5"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg></div><div class="w-modal-link-title" style="text-align:center;">' + esc(data.title) + '</div><div class="w-modal-link-desc" style="text-align:center;color:#666;">' + esc(data.desc) + '</div><div class="w-modal-link-meta" style="justify-content:center;"><span>位置信息</span></div>';
    body.innerHTML = html;
    modal.classList.add('active');
  }
  function closeModal() { modal.classList.remove('active'); }
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });

  chat.addEventListener('click', function (e) {
    var b = e.target.closest('.w-msg-clickable');
    if (!b) return;
    var type = b.getAttribute('data-msg-type') || '';
    if (type === 'link') openModal('link', extractLink(b));
    else if (type === 'file') openModal('file', extractFile(b));
    else if (type === 'loc') openModal('loc', extractLoc(b));
  });
})();

// 模块：主初始化
(function () {
  var wrapper = grabPhone('mainInited');
  if (!wrapper) return;

  var rawTpl = wrapper.querySelector('.seb-chat-data');
  var roleId = rawTpl ? (rawTpl.innerHTML.match(/<n>(.*?)<\/n>/)?.[1] || 'default') : 'default';

  var clock = wrapper.querySelector('#w-clock');
  if (clock) {
    var timeMatch = rawTpl ? rawTpl.innerHTML.match(/<time>(.*?)<\/time>/) : null;
    if (timeMatch && timeMatch[1]) clock.innerText = timeMatch[1].trim();
    else {
      (function upd() {
        var n = new Date();
        clock.innerText = n.getHours().toString().padStart(2, '0') + ':' + n.getMinutes().toString().padStart(2, '0');
      })();
      setInterval(function () {
        var n = new Date();
        clock.innerText = n.getHours().toString().padStart(2, '0') + ':' + n.getMinutes().toString().padStart(2, '0');
      }, 60000);
    }
  }

  var bg = wrapper.querySelector('#w-chat-bg');

  function loadImg(key, selector, isMe) {
    var s = localStorage.getItem(key);
    if (!s) return;
    $$(selector, wrapper).forEach(function (el) {
      el.style.backgroundImage = 'url(' + s + ')';
      if (isMe) { el.style.backgroundColor = 'transparent'; el.style.border = 'none'; }
    });
  }
  loadImg(makeOKey(wrapper, 'bg'), '#w-chat-bg');
  loadImg(makeOKey(wrapper, 'other_avatar'), '.w-avatar-other');
  loadImg(makeOKey(wrapper, 'me_avatar'), '.w-avatar-me', true);

  var panel = wrapper.querySelector('#w-settings-panel');
  var sBtn = wrapper.querySelector('#w-settings-btn');
  var sClose = wrapper.querySelector('#w-settings-close');
  if (sBtn) sBtn.addEventListener('click', function () { panel.style.display = 'flex'; setTimeout(function () { panel.classList.add('active'); }, 10); });
  if (sClose) sClose.addEventListener('click', function () { panel.classList.remove('active'); setTimeout(function () { panel.style.display = 'none'; }, 250); });

  function handleUpload(id, key, selector, isMe) {
    var inp = wrapper.querySelector(id);
    if (!inp) return;
    inp.addEventListener('change', function (e) {
      var f = e.target.files[0];
      if (!f) return;
      var r = new FileReader();
      r.onload = function (ev) {
        var img = new Image();
        img.onload = function () {
          var canvas = document.createElement('canvas');
          var ctx = canvas.getContext('2d');
          var maxW = 800, maxH = 800;
          var w = img.width, h = img.height;
          if (w > h) { if (w > maxW) { h = Math.round(h * maxW / w); w = maxW; } }
          else { if (h > maxH) { w = Math.round(w * maxH / h); h = maxH; } }
          canvas.width = w; canvas.height = h;
          ctx.drawImage(img, 0, 0, w, h);
          var b64 = canvas.toDataURL('image/jpeg', 0.7);
          try {
            localStorage.setItem(key, b64);
            $$(selector, wrapper).forEach(function (el) {
              el.style.backgroundImage = 'url(' + b64 + ')';
              if (isMe) { el.style.backgroundColor = 'transparent'; el.style.border = 'none'; }
            });
            showToast('成功', '图片已压缩并上传成功！', true);
          } catch (err) {
            var totalBytes = 0;
            for (var i = 0; i < localStorage.length; i++) totalBytes += localStorage.getItem(localStorage.key(i)).length;
            var usedMB = (totalBytes / 1024 / 1024).toFixed(2);
            var host = '此网站';
            try { host = window.top.location.hostname || window.location.hostname || document.domain; } catch (e) {}
            var msg = '<div style="text-align:left;line-height:1.7;font-size:13px;">当前网站（<strong style="color:#007aff;">' + host + '</strong>）域名缓存达临界值（已用 <strong style="color:#e64340;">' + usedMB + 'MB</strong>/约5MB），无法再保存新图片或文件。<br><br><span style="color:#999;font-size:12px;">注意：此存储空间由当前网站下的所有内容共享。</span><br><br><strong>建议操作：</strong><br>① <strong>点击【清空缓存并恢复默认】</strong>，释放本小手机先前占用的空间；<br>② 如果清理后仍不足，可尝试在浏览器地址栏点击“锁”或“i”图标 → <strong>网站设置 → 清除数据</strong>；<br>③ 更建议使用 <strong>“图片链接(URL)”</strong> 代替“从相册上传”。</div>';
            showToast('网站存储空间已满', msg, false);
          }
        };
        img.src = ev.target.result;
      };
      r.onerror = function () { showToast('解析中断', '文件损坏或格式不受支持。', false); };
      r.readAsDataURL(f);
      inp.value = '';
    });
  }
  handleUpload('#w-upload-bg', makeOKey(wrapper, 'bg'), '#w-chat-bg');
  handleUpload('#w-upload-other', makeOKey(wrapper, 'other_avatar'), '.w-avatar-other');
  handleUpload('#w-upload-me', makeOKey(wrapper, 'me_avatar'), '.w-avatar-me', true);

  // 双击头像 拍一拍（带拉黑/删除拦截）
  if (bg) {
    bg.addEventListener('dblclick', function (e) {
      var av = e.target.closest('.w-avatar-other');
      if (!av) return;
      var stat = localStorage.getItem(makeOKey(wrapper, 'relStatus')) || 'normal';
      if (stat === 'blocked') { showToast('无法操作', '你已拉黑对方，无法拍一拍', false); return; }
      if (stat === 'deleted') { showToast('无法操作', '你们目前不是好友，无法拍一拍', false); return; }
      wrapper.dataset.dblHit = '1';
      setTimeout(function () { wrapper.dataset.dblHit = ''; }, 600);
      var tName = wrapper.querySelector('#w-target-name');
      av.classList.add('w-shake-anim');
      setTimeout(function () { av.classList.remove('w-shake-anim'); }, 350);
      triggerParentInput('$拍一拍内容：我拍了拍"' + (tName ? tName.innerText : '对方') + '"的');
    });
  }

  // 底部按钮
  var vBtn = wrapper.querySelector('#w-voice-btn');
  if (vBtn) vBtn.addEventListener('click', function () { triggerParentInput('$User发送语音转文字消息：'); });
  var inpTrig = wrapper.querySelector('#w-input-trigger');
  if (inpTrig) inpTrig.addEventListener('click', function () { triggerParentInput('$User发送线上聊天：'); });

  var eBtn = wrapper.querySelector('#w-emoji-btn'), pBtn = wrapper.querySelector('#w-plus-btn');
  var ePanel = wrapper.querySelector('#w-emoji-panel'), pPanel = wrapper.querySelector('#w-plus-panel');

  function toggleExt(target, other) {
    if (target.style.display === 'block') { target.style.display = 'none'; }
    else { target.style.display = 'block'; other.style.display = 'none'; if (bg) bg.scrollTo({ top: bg.scrollHeight, behavior: 'smooth' }); }
  }
  if (eBtn && ePanel && pPanel) eBtn.addEventListener('click', function () { toggleExt(ePanel, pPanel); });
  if (pBtn && pPanel && ePanel) pBtn.addEventListener('click', function () { toggleExt(pPanel, ePanel); });
  if (bg) bg.addEventListener('click', function (e) { if (e.target === bg) { if (ePanel) ePanel.style.display = 'none'; if (pPanel) pPanel.style.display = 'none'; } });

  // 表情面板点击
  $$('.w-emoji-item', wrapper).forEach(function (item) {
    item.addEventListener('click', function () {
      var d = item.getAttribute('data-desc') || '表情';
      triggerParentInput('发送表情包：' + d);
    });
  });

  // 功能面板点击
  var sendModal = wrapper.querySelector('#w-send-modal');
  var sendTitle = wrapper.querySelector('#w-send-title');
  var sendAmt = wrapper.querySelector('#w-send-amt');
  var sendDesc = wrapper.querySelector('#w-send-desc');
  var currentSendType = '';
  $$('.w-plus-item', wrapper).forEach(function (item) {
    item.addEventListener('click', function () {
      var text = item.querySelector('.w-plus-text').innerText;
      var action = item.getAttribute('data-action') || '';
      if (text === '红包' || text === '转账') {
        currentSendType = text;
        sendTitle.innerText = '发送' + text;
        sendAmt.value = ''; sendDesc.value = '';
        sendDesc.placeholder = text === '红包' ? '恭喜发财，大吉大利' : '转账备注 (选填)';
        sendModal.classList.add('active');
        if (pPanel) pPanel.style.display = 'none';
      } else if (action) { triggerParentInput(action); }
    });
  });
  wrapper.querySelector('#w-send-cancel').addEventListener('click', function () { sendModal.classList.remove('active'); });
  wrapper.querySelector('#w-send-confirm').addEventListener('click', function () {
    var amt = sendAmt.value.trim() || '0.00';
    var desc = sendDesc.value.trim();
    if (!desc) desc = currentSendType === '红包' ? '恭喜发财，大吉大利' : '转账';
    triggerParentInput('$User发出' + currentSendType + '：（' + amt + '）元，并备注：' + desc);
    sendModal.classList.remove('active');
  });

  // 外壳颜色
  var shellSwitches = $$('.w-shell-switch', wrapper);
  var savedShell = localStorage.getItem(makeOKey(wrapper, 'shell_color')) || 'white';
  shellSwitches.forEach(function (btn) {
    btn.classList.remove('active');
    if (btn.getAttribute('data-color') === savedShell) btn.classList.add('active');
  });
  wrapper.classList.remove('w-wrapper-white', 'w-wrapper-gray', 'w-wrapper-blue', 'w-wrapper-custom');
  if (savedShell !== 'black') wrapper.classList.add('w-wrapper-' + savedShell);

  function applyCustomShellColor(hex) {
    var r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
    var brightness = (r * 299 + g * 587 + b * 114) / 1000;
    var darkHex = '#' + Math.floor(r * .75).toString(16).padStart(2, '0') + Math.floor(g * .75).toString(16).padStart(2, '0') + Math.floor(b * .75).toString(16).padStart(2, '0');
    var lightHex = '#' + Math.floor(r + (255 - r) * .4).toString(16).padStart(2, '0') + Math.floor(g + (255 - g) * .4).toString(16).padStart(2, '0') + Math.floor(b + (255 - b) * .4).toString(16).padStart(2, '0');
    wrapper.style.setProperty('--c-main', hex);
    wrapper.style.setProperty('--c-dark', darkHex);
    wrapper.style.setProperty('--c-light', lightHex);
    wrapper.style.setProperty('--c-line', brightness > 128 ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.7)');
  }
  function isDarkBubbleColor(hex) {
    if (!hex) return false;
    var r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
    return ((r * 299 + g * 587 + b * 114) / 1000) < 128;
  }
  function applyCustomBubbleColor(role, hex) {
    var isDark = isDarkBubbleColor(hex);
    wrapper.style.setProperty('--custom-' + role + '-bg', hex);
    wrapper.style.setProperty('--custom-' + role + '-text', isDark ? '#ffffff' : '#111111');
    wrapper.style.setProperty('--custom-' + role + '-line', isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)');
  }
  var customColorPicker = wrapper.querySelector('#w-custom-shell-color');
  if (customColorPicker) {
    var savedCustomColor = localStorage.getItem(makeOKey(wrapper, 'custom_shell_hex')) || '#ffb6c1';
    customColorPicker.value = savedCustomColor;
    applyCustomShellColor(savedCustomColor);
    customColorPicker.addEventListener('input', function (e) {
      var hex = e.target.value;
      applyCustomShellColor(hex);
      localStorage.setItem(makeOKey(wrapper, 'custom_shell_hex'), hex);
      var customBtn = wrapper.querySelector('.w-shell-switch[data-color="custom"]');
      if (customBtn && !customBtn.classList.contains('active')) customBtn.click();
    });
  }

  shellSwitches.forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (btn.classList.contains('active')) return;
      var c = btn.getAttribute('data-color');
      shellSwitches.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      wrapper.classList.remove('w-wrapper-white', 'w-wrapper-gray', 'w-wrapper-blue', 'w-wrapper-custom');
      if (c !== 'black') wrapper.classList.add('w-wrapper-' + c);
      localStorage.setItem(makeOKey(wrapper, 'shell_color'), c);
      showToast('成功', '外壳已切换，带来全新质感', true);
    });
  });

  // 气泡颜色
  var savedOtherCustom = localStorage.getItem(makeOKey(wrapper, 'custom_other_hex')) || '#ffffff';
  var savedMeCustom = localStorage.getItem(makeOKey(wrapper, 'custom_me_hex')) || '#95ec69';
  applyCustomBubbleColor('other', savedOtherCustom);
  applyCustomBubbleColor('me', savedMeCustom);

  ['other', 'me'].forEach(function (role) {
    var picker = wrapper.querySelector('#w-custom-' + role + '-color');
    if (!picker) return;
    picker.value = role === 'other' ? savedOtherCustom : savedMeCustom;
    var customBtn = wrapper.querySelector('.w-bubble-switch[data-color="custom_' + role + '"]');
    if (customBtn) customBtn.style.background = picker.value;
    picker.addEventListener('input', function (e) {
      var hex = e.target.value;
      applyCustomBubbleColor(role, hex);
      localStorage.setItem(makeOKey(wrapper, 'custom_' + role + '_hex'), hex);
      if (customBtn) {
        customBtn.style.background = hex;
        if (!customBtn.classList.contains('active')) customBtn.click();
      }
    });
  });

  var bubbleSwitches = $$('.w-bubble-switch', wrapper);
  var savedOtherBubble = localStorage.getItem(makeOKey(wrapper, 'other_bubble')) || 'white';
  var savedMeBubble = localStorage.getItem(makeOKey(wrapper, 'me_bubble')) || 'green';
  bubbleSwitches.forEach(function (btn) {
    btn.classList.remove('active');
    var role = btn.getAttribute('data-role');
    var color = btn.getAttribute('data-color');
    if ((role === 'other' && color === savedOtherBubble) || (role === 'me' && color === savedMeBubble)) btn.classList.add('active');
    btn.addEventListener('click', function () {
      if (btn.classList.contains('active')) return;
      var r = btn.getAttribute('data-role');
      var c = btn.getAttribute('data-color');
      bubbleSwitches.forEach(function (b) { if (b.getAttribute('data-role') === r) b.classList.remove('active'); });
      btn.classList.add('active');
      if (r === 'other') localStorage.setItem(makeOKey(wrapper, 'other_bubble'), c);
      else localStorage.setItem(makeOKey(wrapper, 'me_bubble'), c);
      showToast('成功', '气泡颜色已记录，刷新即可生效', true);
    });
  });

  // 头像和URL弹窗
  var currentSetTarget = '';
  var avatarActionModal = wrapper.querySelector('#w-avatar-action-modal');
  var urlInputModal = wrapper.querySelector('#w-url-input-modal');
  var urlInput = wrapper.querySelector('#w-url-input');

  var btnAvatarOther = wrapper.querySelector('#w-btn-avatar-other-menu');
  var btnAvatarMe = wrapper.querySelector('#w-btn-avatar-me-menu');
  if (btnAvatarOther) btnAvatarOther.addEventListener('click', function () { currentSetTarget = 'other'; wrapper.querySelector('#w-avatar-action-title').innerText = '更换对方头像'; avatarActionModal.classList.add('active'); });
  if (btnAvatarMe) btnAvatarMe.addEventListener('click', function () { currentSetTarget = 'me'; wrapper.querySelector('#w-avatar-action-title').innerText = '更换我的头像'; avatarActionModal.classList.add('active'); });
  wrapper.querySelector('#w-action-cancel').addEventListener('click', function () { avatarActionModal.classList.remove('active'); });
  wrapper.querySelector('#w-action-album').addEventListener('click', function () {
    avatarActionModal.classList.remove('active');
    if (currentSetTarget === 'other') wrapper.querySelector('#w-upload-other').click();
    if (currentSetTarget === 'me') wrapper.querySelector('#w-upload-me').click();
  });
  wrapper.querySelector('#w-action-url').addEventListener('click', function () {
    avatarActionModal.classList.remove('active');
    wrapper.querySelector('#w-url-title').innerText = '输入头像链接';
    urlInput.value = ''; urlInputModal.classList.add('active');
  });
  var btnBgUrl = wrapper.querySelector('#w-btn-bg-url');
  if (btnBgUrl) btnBgUrl.addEventListener('click', function () {
    currentSetTarget = 'bg';
    wrapper.querySelector('#w-url-title').innerText = '输入背景链接';
    urlInput.value = ''; urlInputModal.classList.add('active');
  });
  wrapper.querySelector('#w-url-cancel').addEventListener('click', function () { urlInputModal.classList.remove('active'); });
  wrapper.querySelector('#w-url-confirm').addEventListener('click', function () {
    var url = urlInput.value.trim();
    if (!url) { showToast('错误', '链接不能为空', false); return; }
    if (currentSetTarget === 'bg') {
      if (bg) bg.style.backgroundImage = 'url(' + url + ')';
      localStorage.setItem(makeOKey(wrapper, 'bg'), url);
      wrapper.querySelector('#w-bg-menu-panel').classList.remove('active');
    } else if (currentSetTarget === 'other') {
      $$('.w-avatar-other', wrapper).forEach(function (el) { el.style.backgroundImage = 'url(' + url + ')'; });
      localStorage.setItem(makeOKey(wrapper, 'other_avatar'), url);
    } else if (currentSetTarget === 'me') {
      $$('.w-avatar-me', wrapper).forEach(function (el) { el.style.backgroundImage = 'url(' + url + ')'; el.style.backgroundColor = 'transparent'; el.style.border = 'none'; });
      localStorage.setItem(makeOKey(wrapper, 'me_avatar'), url);
    }
    urlInputModal.classList.remove('active');
    showToast('成功', '设置成功！', true);
  });

  // 重置外壳 / 气泡记忆
  wrapper.querySelector('#w-reset-shell').addEventListener('click', function () {
    localStorage.removeItem(makeOKey(wrapper, 'shell_color'));
    localStorage.removeItem(makeOKey(wrapper, 'custom_shell_hex'));
    shellSwitches.forEach(function (b) { b.classList.remove('active'); });
    var d = wrapper.querySelector('.w-shell-switch[data-color="white"]');
    if (d) d.classList.add('active');
    wrapper.classList.remove('w-wrapper-white', 'w-wrapper-gray', 'w-wrapper-blue', 'w-wrapper-custom');
    wrapper.classList.add('w-wrapper-white');
    if (customColorPicker) { customColorPicker.value = '#ffb6c1'; applyCustomShellColor('#ffb6c1'); }
    showToast('已重置', '外壳颜色记忆已清空并恢复默认', true);
  });
  wrapper.querySelector('#w-reset-bubble').addEventListener('click', function () {
    localStorage.removeItem(makeOKey(wrapper, 'other_bubble'));
    localStorage.removeItem(makeOKey(wrapper, 'me_bubble'));
    localStorage.removeItem(makeOKey(wrapper, 'custom_other_hex'));
    localStorage.removeItem(makeOKey(wrapper, 'custom_me_hex'));
    bubbleSwitches.forEach(function (b) { b.classList.remove('active'); });
    var dO = wrapper.querySelector('.w-bubble-switch[data-role="other"][data-color="white"]');
    var dM = wrapper.querySelector('.w-bubble-switch[data-role="me"][data-color="green"]');
    if (dO) dO.classList.add('active');
    if (dM) dM.classList.add('active');
    var oP = wrapper.querySelector('#w-custom-other-color');
    var mP = wrapper.querySelector('#w-custom-me-color');
    if (oP) { oP.value = '#ffffff'; applyCustomBubbleColor('other', '#ffffff'); var cbO = wrapper.querySelector('.w-bubble-switch[data-color="custom_other"]'); if (cbO) cbO.style.background = '#ffffff'; }
    if (mP) { mP.value = '#95ec69'; applyCustomBubbleColor('me', '#95ec69'); var cbM = wrapper.querySelector('.w-bubble-switch[data-color="custom_me"]'); if (cbM) cbM.style.background = '#95ec69'; }
    showToast('已重置', '气泡颜色记忆已清空，刷新后生效', true);
  });

  // 恢复默认壁纸和头像
  wrapper.querySelector('#w-reset-btn').addEventListener('click', function () { wrapper.querySelector('#w-reset-modal').classList.add('active'); });
  wrapper.querySelector('#w-reset-cancel').addEventListener('click', function () { wrapper.querySelector('#w-reset-modal').classList.remove('active'); });
  wrapper.querySelector('#w-reset-confirm').addEventListener('click', function () {
    localStorage.removeItem(makeOKey(wrapper, 'bg'));
    localStorage.removeItem(makeOKey(wrapper, 'other_avatar'));
    localStorage.removeItem(makeOKey(wrapper, 'me_avatar'));
    bg.style.backgroundImage = "url('https://picx.zhimg.com/80/v2-eb4784a259dcf98a5738fe8ff949ccc4_720w.webp?source=d16d100b')";
    $$('.w-avatar-other', wrapper).forEach(function (av) { av.style.backgroundImage = "url('https://picx.zhimg.com/80/v2-805987a6e3a3336129583c5d060ef7c2_720w.webp?source=d16d100b')"; });
    $$('.w-avatar-me', wrapper).forEach(function (av) { av.style.backgroundImage = "url('https://picx.zhimg.com/80/v2-260de89b17e9a0eb3232118a10480302_720w.webp?source=d16d100b')"; av.style.backgroundColor = 'transparent'; av.style.border = 'none'; });
    wrapper.querySelector('#w-reset-modal').classList.remove('active');
    wrapper.querySelector('#w-settings-panel').classList.remove('active');
    showToast('已清理', '缓存图片及头像已恢复初始状态');
  });

  // 彻底清空
  wrapper.querySelector('#w-clear-all-btn').addEventListener('click', function () { wrapper.querySelector('#w-clear-all-modal').classList.add('active'); });
  wrapper.querySelector('#w-clear-all-cancel').addEventListener('click', function () { wrapper.querySelector('#w-clear-all-modal').classList.remove('active'); });
  wrapper.querySelector('#w-clear-all-confirm').addEventListener('click', function () {
    var prefix = 'w_os_' + wrapper.dataset.roleId + '_' + wrapper.dataset.pageId;
    var keys = [];
    for (var i = 0; i < localStorage.length; i++) if (localStorage.key(i).indexOf(prefix) === 0) keys.push(localStorage.key(i));
    keys.forEach(function (k) { localStorage.removeItem(k); });
    wrapper.querySelector('#w-clear-all-modal').classList.remove('active');
    showToast('格式化成功', '所有数据已彻底清除，页面即将刷新', true);
    setTimeout(function () { window.location.reload(); }, 1500);
  });

  // 聊天区点击：视频/语音通话 / 引用回复
  if (bg) {
    bg.addEventListener('click', function (e) {
      if (e.target.closest('.w-video-box')) { triggerParentInput('$User拨打视频通话：'); return; }
      if (e.target.closest('.w-voice-trigger')) { triggerParentInput('$User拨打语音通话：'); return; }
      var bubble = e.target.closest('.w-bubble');
      if (!bubble) return;
      if (bubble.matches('[class*="voice"], [class*="audio"]') || bubble.querySelector('[class*="voice"], [class*="audio"]')) return;
      var mc = bubble.parentElement;
      if (mc && (mc.matches('[class*="error"],[class*="fail"]') || mc.querySelector('[class*="error"],[class*="fail"]'))) return;
      if (bubble.closest('.w-hb-bubble') || bubble.closest('.w-hb-self-bubble') || bubble.closest('.w-tf-bubble') || bubble.classList.contains('w-bubble-card')) return;
      var quoteText = '';
      var qb = bubble.querySelector('.w-quote-box');
      if (qb) {
        var clone = bubble.cloneNode(true);
        var cq = clone.querySelector('.w-quote-box');
        if (cq) cq.remove();
        quoteText = clone.innerText.trim();
      } else {
        quoteText = bubble.innerText.trim();
      }
      if (quoteText) triggerParentInput('User引用消息"' + quoteText + '"，并回复：');
    });
  }
})();

// 模块：渲染聊天数据（把 <l_t>…</l_t> 这种标签画成气泡）
(function () {
  var wrappers = $$('.w-wrapper');
  var wrapper = wrappers[wrappers.length - 1];
  if (!wrapper || wrapper.dataset.renderInited === 'true') return;
  wrapper.dataset.renderInited = 'true';

  var chatArea = wrapper.querySelector('#w-chat-bg');
  var template = wrapper.querySelector('.seb-chat-data');
  if (!chatArea || !template) return;

  var rawXml = template.innerHTML.trim();
  if (!rawXml) return;

  while (chatArea.firstChild) chatArea.removeChild(chatArea.firstChild);

  var parsedName = rawXml.match(/<n>(.*?)<\/n>/)?.[1] || 'Seb';
  var roleId = parsedName || 'default';
  wrapper.dataset.roleId = roleId;

  var savedName = localStorage.getItem(makeOKey(wrapper, 'target_remark'));
  var nameEl = wrapper.querySelector('#w-target-name');
  var statusEl = wrapper.querySelector('#w-status-text');

  if (nameEl) {
    nameEl.textContent = savedName || parsedName;
    nameEl.style.cssText = 'cursor:pointer;position:relative;z-index:99;pointer-events:auto;';
    nameEl.onclick = function () {
      var currentName = this.textContent;
      var newName = window.parent.prompt('修改备注（留空则恢复默认）：', currentName);
      if (newName === null) return;
      var t = newName.trim();
      if (t !== '') { this.textContent = t; localStorage.setItem(makeOKey(wrapper, 'target_remark'), t); }
      else { this.textContent = parsedName; localStorage.removeItem(makeOKey(wrapper, 'target_remark')); }
    };
  }
  var status = rawXml.match(/<st>(.*?)<\/st>/)?.[1] || '在线';
  if (statusEl) statusEl.textContent = status;

  function escapeHtml(text) {
    if (!text) return '';
    var d = document.createElement('div');
    d.textContent = text;
    return d.innerHTML;
  }

  var savedOtherColor = localStorage.getItem(makeOKey(wrapper, 'other_bubble')) || 'white';
  var savedMeColor = localStorage.getItem(makeOKey(wrapper, 'me_bubble')) || 'green';

  var lines = rawXml.split('\n').map(function (l) { return l.trim(); }).filter(Boolean);

  lines.forEach(function (line) {
    if (line.indexOf('<sys>') === 0) {
      var sysText = line.replace(/<\/?sys>/g, '');
      var sysDiv = document.createElement('div');
      sysDiv.className = 'w-sys-msg';
      sysDiv.innerHTML = sysText;
      chatArea.appendChild(sysDiv);
      return;
    }

    var tagMatch = line.match(/<([lr])_([a-z]+)>(.*?)<\/\1_\2>/);
    if (!tagMatch) return;

    var side = tagMatch[1];
    var type = tagMatch[2];
    var parts = tagMatch[3].split('|');
    var time = parts[0] || '00:00';
    var isErrWrapper = false;

    if (type === 'err') {
      isErrWrapper = true;
      if (parts.length > 2) {
        type = parts[1];
        parts = [parts[0]].concat(parts.slice(2));
      }
    }

    // 检测「对方通过验证」标签：只有当前是删除状态才自动解锁，避免刷新乱变
    if (side === 'l' && type === 'vrypass') {
      var _stVry = localStorage.getItem(makeOKey(wrapper, 'relStatus')) || 'normal';
      if (_stVry === 'deleted') localStorage.setItem(makeOKey(wrapper, 'relStatus'), 'normal');
    }

    var row = document.createElement('div');
    row.className = 'w-row w-row-' + (side === 'l' ? 'left' : 'right');

    var avatar = document.createElement('div');
    avatar.className = 'w-avatar ' + (side === 'l' ? 'w-avatar-other' : 'w-avatar-me');
    row.appendChild(avatar);

    var msgBox = document.createElement('div');
    msgBox.className = 'w-msg-box';

    // 撤回消息
    if (type === 'rec') {
      var who = parts[1] || '对方';
      if (side === 'l') {
        var tname = wrapper.querySelector('#w-target-name');
        who = tname ? tname.textContent : who;
      } else who = '你';
      var original = parts.slice(2).join('|') || '';
      var sideClass = side === 'l' ? 'left' : 'right';

      var details = document.createElement('details');
      details.className = 'w-recall-details';
      var summary = document.createElement('summary');
      summary.innerHTML = '<div class="w-sys-msg">"' + escapeHtml(who) + '" 撤回了一条消息 <span class="w-link-text">查看</span></div>';
      details.appendChild(summary);

      var ghostRow = document.createElement('div');
      ghostRow.className = 'w-row w-row-' + sideClass + ' w-recall-ghost';
      var ghostAvatar = document.createElement('div');
      ghostAvatar.className = 'w-avatar ' + (side === 'l' ? 'w-avatar-other' : 'w-avatar-me');
      ghostRow.appendChild(ghostAvatar);
      var ghostMsgBox = document.createElement('div');
      ghostMsgBox.className = 'w-msg-box';
      var ghostBubble = document.createElement('div');
      ghostBubble.className = 'w-bubble-wrap';

      var innerMatch = original.match(/<([lr])_([a-z]+)>(.*?)<\/\1_\2>/);
      var displayHtml;
      if (innerMatch) {
        var iSide = innerMatch[1], iType = innerMatch[2];
        var innerRaw = innerMatch[3];
        if (!/^\d{1,2}:\d{2}(:\d{2})?\|/.test(innerRaw)) innerRaw = '00:00|' + innerRaw;
        var iParts = innerRaw.split('|');
        var iBubbleCls = iSide === 'l' ? ('w-bubble-' + savedOtherColor) : ('w-bubble-' + savedMeColor);
        if (iType === 'v') {
          displayHtml = '<div class="w-bubble ' + iBubbleCls + '"><div class="w-voice-box ' + (iSide === 'r' ? 'w-voice-right' : '') + '"><svg class="w-voice-icon" viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="2"><path d="M12 5v14M8 9v6M16 7v10M4 11v2M20 10v4"/></svg><span class="w-voice-sec">' + escapeHtml(iParts[1] || '0') + '"</span></div>' + (iParts[2] ? '<div class="w-voice-text" style="display:block;border-top:1px solid rgba(0,0,0,0.1);">' + escapeHtml(iParts[2]) + '</div>' : '') + '</div>';
        } else if (iType === 'imgt') {
          var fullTxt = iParts[2] || iParts[1] || '[图片]';
          displayHtml = '<div class="w-fake-img-container" style="height:auto;min-height:100px;padding:6px;"><div class="w-img-thumb" style="height:auto;position:relative;display:flex;flex-direction:column;padding:10px;"><svg class="w-img-thumb-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="position:static;margin-bottom:8px;"><rect x="3" y="8" width="18" height="12" rx="2"/><path d="M16 8v-2a2 2 0 0 0-2-2H10a2 2 0 0 0-2 2v2"/><circle cx="12" cy="14" r="3"/></svg><div class="w-img-thumb-text" style="position:static;white-space:pre-wrap;word-break:break-word;overflow:visible;max-height:none;display:block;-webkit-line-clamp:unset;text-align:left;line-height:1.4;padding:0;color:#555;width:100%;">' + escapeHtml(fullTxt) + '</div><div class="w-img-thumb-hint" style="position:static;margin-top:8px;">已撤回</div></div></div>';
        } else {
          displayHtml = buildBubbleHtml(iType, iParts, iSide, { savedOtherColor: savedOtherColor, savedMeColor: savedMeColor, wrapper: wrapper });
        }
      } else {
        var fallbackText = original.replace(/表情包(\d+)/g, function (m, num) {
          var imgUrl = bqbMap['表情包' + num];
          return imgUrl ? '<img src="' + imgUrl + '" class="w-bqb-img" style="max-width:90px;height:auto;border-radius:6px;display:block;border:1px solid rgba(0,0,0,0.05);">' : m;
        });
        displayHtml = '<div class="w-bubble w-bubble-' + (side === 'l' ? savedOtherColor : savedMeColor) + '">' + fallbackText + '</div>';
      }
      ghostBubble.innerHTML = displayHtml;
      ghostMsgBox.appendChild(ghostBubble);
      ghostRow.appendChild(ghostMsgBox);
      details.appendChild(ghostRow);
      chatArea.appendChild(details);
      return;
    }

    // 其他消息类型
    var contentHtml = buildBubbleHtml(type, parts, side, { savedOtherColor: savedOtherColor, savedMeColor: savedMeColor, wrapper: wrapper });

    if (isErrWrapper) {
      contentHtml = '<div class="w-err-wrapper">' + contentHtml + '<svg class="w-error-icon" viewBox="0 0 24 24" style="position:absolute;top:50%;transform:translateY(-50%);' + (side === 'l' ? 'right:-20px;' : 'left:-20px;') + 'width:16px;height:16px;flex-shrink:0;"><circle cx="12" cy="12" r="10" fill="#fa5151"/><path d="M12 7v6m0 4h.01" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/></svg></div>';
    }

    msgBox.innerHTML = contentHtml;
    var timeDiv = document.createElement('div');
    timeDiv.className = 'w-time';
    timeDiv.textContent = time;
    msgBox.appendChild(timeDiv);
    row.appendChild(msgBox);
    chatArea.appendChild(row);
  });

  chatArea.scrollTop = chatArea.scrollHeight;

  // 应用本地存储的背景和头像
  var bgStored = localStorage.getItem(makeOKey(wrapper, 'bg'));
  if (bgStored) chatArea.style.backgroundImage = 'url(' + bgStored + ')';
  var otherStored = localStorage.getItem(makeOKey(wrapper, 'other_avatar'));
  if (otherStored) $$('.w-avatar-other', wrapper).forEach(function (el) { el.style.backgroundImage = 'url(' + otherStored + ')'; });
  var meStored = localStorage.getItem(makeOKey(wrapper, 'me_avatar'));
  if (meStored) $$('.w-avatar-me', wrapper).forEach(function (el) { el.style.backgroundImage = 'url(' + meStored + ')'; el.style.backgroundColor = 'transparent'; el.style.border = 'none'; });

  // 语音气泡宽度自适应
  $$('.w-voice-box', wrapper).forEach(function (vb) {
    var secSpan = vb.querySelector('.w-voice-sec');
    if (!secSpan) return;
    var sec = parseInt(secSpan.innerText) || 0;
    vb.style.width = Math.min(200, 60 + sec * 3.5) + 'px';
  });

  // 背景二级菜单
  var bgMenuPanel = wrapper.querySelector('#w-bg-menu-panel');
  var bgPresetPanel = wrapper.querySelector('#w-bg-preset-panel');
  var mainSettingsPanel = wrapper.querySelector('#w-settings-panel');
  wrapper.querySelector('#w-btn-open-bg-menu').addEventListener('click', function () { bgMenuPanel.classList.add('active'); });
  wrapper.querySelector('#w-bg-menu-back').addEventListener('click', function () { bgMenuPanel.classList.remove('active'); });
  wrapper.querySelector('#w-btn-open-preset').addEventListener('click', function () { bgPresetPanel.classList.add('active'); });
  wrapper.querySelector('#w-bg-preset-back').addEventListener('click', function () { bgPresetPanel.classList.remove('active'); });
  $$('.w-preset-item', wrapper).forEach(function (item) {
    item.addEventListener('click', function () {
      var src = this.getAttribute('data-src');
      if (!src) return;
      chatArea.style.backgroundImage = 'url(' + src + ')';
      localStorage.setItem(makeOKey(wrapper, 'bg'), src);
      showToast('成功', '背景已更换完毕', true);
      bgPresetPanel.classList.remove('active');
      bgMenuPanel.classList.remove('active');
      if (mainSettingsPanel) mainSettingsPanel.classList.remove('active');
    });
  });
})();

// 模块：列表同步 + 聊天/列表切换
(function () {
  var wrapper = grabPhone('listSyncInited');
  if (!wrapper) return;

  function parseMessageType(chatArea) {
    if (!chatArea || chatArea.children.length === 0) return '暂无消息';
    var lastNode = chatArea.lastElementChild;
    if (!lastNode) return '暂无消息';

    if (lastNode.querySelector('.w-error-icon')) {
      return lastNode.closest('.w-row-left') ? '[暂无消息]' : '消息发送失败';
    }
    if (lastNode.classList.contains('w-sys-msg')) {
      var prev = lastNode.previousElementSibling;
      if (prev && prev.querySelector('.w-error-icon')) {
        return prev.closest('.w-row-left') ? '[暂无消息]' : '消息发送失败';
      }
      var sysText = lastNode.textContent.trim().replace(/查看/g, '').trim();
      return sysText;
    }
    if (lastNode.tagName === 'DETAILS' && lastNode.classList.contains('w-recall-details')) {
      var summary = lastNode.querySelector('summary');
      if (summary) {
        var txt = summary.textContent.trim().replace(/查看/g, '').trim();
        return lastNode.querySelector('.w-row-right') ? '你撤回了一条消息' : ((wrapper.querySelector('#w-target-name')?.textContent || '对方') + '撤回了一条消息');
      }
    }
    var hb = lastNode.querySelector('.w-hb-bubble, .w-hb-self-bubble');
    if (hb) {
      var d = hb.getAttribute('data-desc') || '红包';
      return lastNode.closest('.w-row-left') ? '[红包] [微信红包] ' + d : '[微信红包] ' + d;
    }
    var vryCard = lastNode.querySelector('.w-vry-card');
    if (vryCard) return '[好友验证]';
    var tf = lastNode.querySelector('.w-tf-bubble');
    if (tf) {
      var action = tf.getAttribute('data-action');
      var status = tf.getAttribute('data-status') || 'pending';
      var isL = !!lastNode.closest('.w-row-left');
      if (action === 'recv' || action === 'send') {
        if (isL) { if (status === 'received') return '[转账] 已被接收'; if (status === 'returned') return '[转账] 已被退还'; return '[转账] 请收款'; }
        if (status === 'received') return '[转账] 你发起了一笔转账（已收款）';
        if (status === 'returned') return '[转账] 你发起了一笔转账（已退还）';
        return '[转账] 你发起了一笔转账';
      }
      if (status === 'received') return '[转账] ' + (isL ? '已被接收' : '你已收款');
      if (status === 'returned') return '[转账] ' + (isL ? '已被退还' : '你已退还');
      return '[转账]';
    }
    if (lastNode.querySelector('.w-video-box .w-video-call-icon')) return '[视频通话]';
    if (lastNode.querySelector('.w-voice-trigger .w-voice-call-icon')) return '[语音通话]';
    var vb = lastNode.querySelector('.w-voice-box');
    if (vb) { var sec = vb.querySelector('.w-voice-sec'); return '[语音] ' + (sec ? sec.textContent.trim() : '0″'); }
    var img = lastNode.querySelector('img.w-msg-img, img.w-bqb-img');
    if (img) return img.classList.contains('w-bqb-img') ? '[动画表情]' : '[图片]';
    var fake = lastNode.querySelector('.w-fake-img-container');
    if (fake) {
      var ft = fake.querySelector('.w-img-thumb-text');
      if (ft) { var s = ft.textContent.trim(); if (s.length > 12) s = s.substring(0, 12) + '…'; return '[图片] ' + s; }
      return '[图片]';
    }
    var loc = lastNode.querySelector('.w-loc-title');
    if (loc) return '[位置] ' + loc.textContent.trim();
    var card = lastNode.querySelector('.w-card-name');
    if (card) return '[名片] ' + card.textContent.trim();
    var link = lastNode.querySelector('.w-link-title');
    if (link) { var lt = link.textContent.trim(); if (lt.length > 16) lt = lt.substring(0, 16) + '…'; return '[链接] ' + lt; }
    var file = lastNode.querySelector('.w-file-name');
    if (file) return '[文件] ' + file.textContent.trim();
    var quote = lastNode.querySelector('.w-quote-box');
    if (quote) {
      var timeEl2 = lastNode.querySelector('.w-time');
      var timeTxt = timeEl2 ? timeEl2.textContent : '';
      var rep = lastNode.textContent.replace(quote.textContent, '').replace(timeTxt, '').trim();
      if (rep.length > 14) rep = rep.substring(0, 14) + '…';
      return '[引用内容] ' + rep;
    }
    var bubble = lastNode.querySelector('.w-bubble');
    if (bubble) { var raw = bubble.textContent.trim(); if (raw) { if (raw.length > 18) raw = raw.substring(0, 18) + '…'; return raw; } }
    var all = lastNode.textContent.trim();
    if (all) { all = all.replace(/\d{1,2}:\d{2}(:\d{2})?/, '').trim(); if (all.length > 18) all = all.substring(0, 18) + '…'; return all; }
    return '暂无消息';
  }

  function syncListData() {
    var targetName = wrapper.querySelector('#w-target-name');
    var listName = wrapper.querySelector('#w-dynamic-list-name');
    if (targetName && listName) listName.innerText = targetName.innerText;
    var chatArea = wrapper.querySelector('#w-chat-bg');
    var listMsg = wrapper.querySelector('#w-dynamic-list-msg');
    var listTime = wrapper.querySelector('#w-dynamic-list-time');
    if (!listMsg || !chatArea) return;
    var lastNode = chatArea.lastElementChild;
    var msgText = parseMessageType(chatArea);
    var shouldRed = false;
    if (lastNode) {
      if (lastNode.querySelector('.w-error-icon') && lastNode.closest('.w-row-right')) shouldRed = true;
      if (lastNode.classList.contains('w-sys-msg')) {
        var p = lastNode.previousElementSibling;
        if (p && p.querySelector('.w-error-icon') && p.closest('.w-row-right')) shouldRed = true;
      }
    }
    if (shouldRed) listMsg.innerHTML = '<span style="color:red;">' + msgText + '</span>';
    else if (msgText.indexOf('[红包] ') === 0 && lastNode && lastNode.closest('.w-row-left')) listMsg.innerHTML = '<span style="color:red;">[红包]</span> ' + msgText.substring(5);
    else if (msgText === '[转账] 请收款' && lastNode && lastNode.closest('.w-row-left')) listMsg.innerHTML = '<span style="color:red;">[转账]</span> 请收款';
    else if (msgText.indexOf('[语音] ') === 0 && lastNode && lastNode.closest('.w-row-left')) listMsg.innerHTML = '<span style="color:red;">' + msgText + '</span>';
    else if (msgText === '[好友验证]' && lastNode && lastNode.closest('.w-row-left')) listMsg.innerHTML = '<span style="color:red;">[好友验证]</span>';
    else listMsg.textContent = msgText;
    if (listTime && lastNode) {
      var t = lastNode.querySelector('.w-time');
      listTime.textContent = t ? t.textContent.trim() : '';
    }
  }

  var backToListBtn = wrapper.querySelector('#w-back-to-list');
  var enterChatBtn = wrapper.querySelector('#w-enter-chat-btn');
  if (backToListBtn) backToListBtn.addEventListener('click', function () {
    syncListData();
    wrapper.classList.add('view-list');
    var eP = wrapper.querySelector('#w-emoji-panel');
    var pP = wrapper.querySelector('#w-plus-panel');
    if (eP) eP.style.display = 'none';
    if (pP) pP.style.display = 'none';
  });
  if (enterChatBtn) enterChatBtn.addEventListener('click', function () {
    wrapper.classList.remove('view-list');
    var chatArea = wrapper.querySelector('#w-chat-bg');
    if (chatArea) chatArea.scrollTop = chatArea.scrollHeight;
  });
})();

// 模块：底部 Tab 切换
(function () {
  var wrapper = grabPhone('tabInited');
  if (!wrapper) return;
  $$('.w-tab-item', wrapper).forEach(function (tab) {
    tab.addEventListener('click', function () {
      $$('.w-tab-item', wrapper).forEach(function (t) { t.classList.remove('w-tab-active'); });
      this.classList.add('w-tab-active');
      var text = this.querySelector('.w-tab-text');
      var name = text ? text.textContent.trim() : '';
      wrapper.classList.remove('view-list', 'view-contacts', 'view-discover');
      var topTitle = wrapper.querySelector('#w-top-title-list');
      if (name === '通讯录') {
        wrapper.classList.add('view-contacts');
        if (topTitle) topTitle.textContent = '通讯录';
      } else if (name === '发现') {
        wrapper.classList.add('view-discover');
        if (topTitle) topTitle.textContent = '发现';
      } else {
        wrapper.classList.add('view-list');
        if (topTitle) topTitle.textContent = '微信';
      }
    });
  });
})();

// 模块：右上角加号菜单
(function () {
  var wrapper = grabPhone('plusMenuInited');
  if (!wrapper) return;
  var plusBtn = wrapper.querySelector('#w-btn-plus-menu');
  var plusMenu = wrapper.querySelector('#w-plus-dropdown');
  if (!plusBtn || !plusMenu) return;
  plusBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    plusMenu.classList.toggle('active');
  });
  wrapper.addEventListener('click', function (e) {
    if (plusMenu.classList.contains('active') && !e.target.closest('#w-btn-plus-menu') && !e.target.closest('#w-plus-dropdown')) {
      plusMenu.classList.remove('active');
    }
  });
})();

// 模块：搜索
(function () {
  var wrapper = grabPhone('searchInited');
  if (!wrapper) return;

  var searchBtn = wrapper.querySelector('#w-btn-search');
  var searchPanel = wrapper.querySelector('#w-search-panel');
  var searchBackBtn = wrapper.querySelector('#w-search-back-btn');
  var searchInput = wrapper.querySelector('.w-search-input');
  var searchGrid = wrapper.querySelector('#w-search-grid');
  var chatResultsContainer = wrapper.querySelector('#w-search-chat-results');
  var titleFaq = wrapper.querySelector('#w-search-title-faq');
  var titleChat = wrapper.querySelector('#w-search-title-chat');
  var answerModal = wrapper.querySelector('#w-search-answer-modal');
  var answerClose = wrapper.querySelector('#w-search-answer-close');
  var answerText = wrapper.querySelector('#w-search-answer-text');
  var answerQTitle = wrapper.querySelector('#w-search-answer-q-title');
  var chatBg = wrapper.querySelector('#w-chat-bg');

  searchBtn.addEventListener('click', function () {
    searchPanel.classList.add('active');
    wrapper.classList.add('view-search');
    if (searchInput) {
      searchInput.value = '';
      var ev = document.createEvent('HTMLEvents');
      ev.initEvent('input', true, false);
      searchInput.dispatchEvent(ev);
    }
  });
  searchBackBtn.addEventListener('click', function () {
    searchPanel.classList.remove('active');
    wrapper.classList.remove('view-search');
  });

  searchInput.addEventListener('input', function (e) {
    var query = (e.target.value || '').trim().toLowerCase();
    var faqItems = $$('.w-search-item', searchGrid);
    var hasFaq = false, hasChat = false;
    faqItems.forEach(function (item) {
      var textEl = item.querySelector('.w-search-item-text');
      var qText = textEl ? textEl.textContent.toLowerCase() : '';
      var aText = (item.getAttribute('data-answer') || '').toLowerCase();
      if (!query || qText.indexOf(query) > -1 || aText.indexOf(query) > -1) { item.style.display = 'flex'; hasFaq = true; }
      else item.style.display = 'none';
    });
    if (titleFaq) titleFaq.style.display = hasFaq ? 'block' : 'none';
    if (chatResultsContainer) chatResultsContainer.innerHTML = '';

    if (query && chatBg) {
      $$('.w-row', chatBg).forEach(function (row, index) {
        var rowId = 'w-chat-row-' + index;
        if (!row.id) row.id = rowId;
        var bubble = row.querySelector('.w-bubble');
        if (!bubble) return;
        var msgText = (bubble.textContent || '').trim();
        var lowerMsg = msgText.toLowerCase();
        var idx = lowerMsg.indexOf(query);
        if (idx === -1 || !msgText.length) return;
        hasChat = true;
        var isMe = row.className.indexOf('w-row-right') !== -1;
        var avatarDiv = row.querySelector('.w-avatar');
        var bgImg = avatarDiv ? window.getComputedStyle(avatarDiv).backgroundImage : 'none';
        var targetNameEl = wrapper.querySelector('#w-target-name');
        var name = isMe ? '我' : (targetNameEl ? targetNameEl.textContent : '对方');
        var before = msgText.substring(0, idx);
        var matched = msgText.substring(idx, idx + query.length);
        var after = msgText.substring(idx + query.length);
        var hl = before + '<span class="w-search-highlight">' + matched + '</span>' + after;

        var resItem = document.createElement('div');
        resItem.className = 'w-search-chat-item';
        resItem.innerHTML = '<div class="w-search-chat-avatar" style="background-image:' + bgImg + ';' + (isMe ? 'background-color:transparent;border:none;' : '') + '"></div><div class="w-search-chat-info"><div class="w-search-chat-name">' + name + '</div><div class="w-search-chat-msg">' + hl + '</div></div>';
        resItem.addEventListener('click', function () {
          searchPanel.classList.remove('active');
          wrapper.classList.remove('view-search');
          wrapper.classList.remove('view-list');
          setTimeout(function () {
            var targetTop = row.offsetTop;
            var containerHalf = chatBg.clientHeight / 2;
            var rowHalf = row.clientHeight / 2;
            chatBg.scrollTo({ top: targetTop - containerHalf + rowHalf, behavior: 'smooth' });
            bubble.classList.remove('w-msg-target-hl');
            bubble.getBoundingClientRect();
            bubble.classList.add('w-msg-target-hl');
          }, 200);
        });
        chatResultsContainer.appendChild(resItem);
      });
    }
    if (titleChat) titleChat.style.display = hasChat ? 'block' : 'none';
    if (titleFaq) titleFaq.innerText = query ? '相关问题' : '大家都在搜';
  });

  searchGrid.addEventListener('click', function (e) {
    var item = e.target.closest('.w-search-item');
    if (!item) return;
    var answer = item.getAttribute('data-answer');
    var qTextEl = item.querySelector('.w-search-item-text');
    if (answerQTitle) answerQTitle.textContent = qTextEl ? qTextEl.textContent : '相关问题';
    if (answerText) {
      answerText.innerHTML = answer;
      if (answer.indexOf('图库新增') > -1) {
        var copyBtn = document.createElement('div');
        copyBtn.className = 'w-copy-gallery-btn';
        copyBtn.textContent = '点击复制你的表情库';
        copyBtn.onclick = function () {
          var emojis = [];
          try { emojis = JSON.parse(localStorage.getItem(makeOKey(wrapper, 'custom_emojis')) || '[]'); } catch (err) {}
          if (!emojis.length) { showToast('还没有表情', '请先到表情面板添加自定义表情，再回来复制', false); return; }
          var parts = emojis.map(function (em, i) { return '图片' + (i + 1) + '：' + em.url + '（' + em.desc + '）'; }).join('；\n');
          var injectText = '$图库新增：\n' + parts + '\n（以上作为图库使用备选，请AI演绎时让char随剧情发展自行在合适的地方选择使用与否，不强制在本轮使用，跟随剧情需要酌情使用即可）';
          function fallbackCopy(t) {
            var ta = document.createElement('textarea');
            ta.value = t;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            try { document.execCommand('copy'); showToast('已复制', '图库文本已复制，去输入框粘贴吧', true); }
            catch (e) { showToast('复制失败', '请手动长按文本框复制', false); }
            document.body.removeChild(ta);
          }
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(injectText).then(function () {
              showToast('已复制', '图库文本已复制，去输入框粘贴吧', true);
            }).catch(function () { fallbackCopy(injectText); });
          } else {
            fallbackCopy(injectText);
          }
        };
        answerText.appendChild(copyBtn);
      }
    }
    answerModal.classList.add('active');
    var mc = answerModal.querySelector('.w-modal-content');
    if (mc) mc.scrollTop = 0;
  });
  answerClose.addEventListener('click', function () { answerModal.classList.remove('active'); });
  answerModal.addEventListener('click', function (e) { if (e.target === answerModal) answerModal.classList.remove('active'); });
})();

// 模块：个人信息 / 朋友设置 / 拉黑 / 删除
(function () {
  var wrapper = grabPhone('profileInited');
  if (!wrapper) return;

  var roleDatabase = {
    "Char_Seb": { wxid: "Seb_official", region: "法国 巴黎", gender: "male" },
    "char": { wxid: "char_999", region: "英国", gender: "female" },
    "default": { wxid: "wxid_unknown", region: "未知区域", gender: "male" }
  };

  var chatArea = wrapper.querySelector('#w-chat-bg');
  var profilePanel = wrapper.querySelector('#w-profile-panel');
  var profileBack = wrapper.querySelector('#w-profile-back-btn');
  var sendMsgBtn = wrapper.querySelector('#w-profile-send-msg');
  var avatarImg = wrapper.querySelector('#w-profile-avatar-img');
  var remarkText = wrapper.querySelector('#w-profile-remark-text');
  var nicknameText = wrapper.querySelector('#w-profile-nickname');
  var wxidText = wrapper.querySelector('#w-profile-wxid');
  var regionText = wrapper.querySelector('#w-profile-region');
  var tagsBtn = wrapper.querySelector('#w-profile-tags-btn');
  var tagsText = wrapper.querySelector('#w-profile-tags-text');
  var genderPath = wrapper.querySelector('#w-profile-gender-path');

  var rawTpl = wrapper.querySelector('.seb-chat-data');
  var roleId = rawTpl ? (rawTpl.innerHTML.match(/<n>(.*?)<\/n>/)?.[1] || 'default') : 'default';

  function renderProfileData() {
    var savedTags = localStorage.getItem(makeOKey(wrapper, 'profile_tags'));
    tagsText.textContent = savedTags || '';
    var roleData = roleDatabase[roleId] || roleDatabase["default"];
    genderPath.setAttribute('fill', roleData.gender === 'female' ? '#f43f5e' : '#3b82f6');
    wxidText.textContent = roleData.wxid;
    regionText.textContent = roleData.region;
  }

  if (chatArea && profilePanel) {
    chatArea.addEventListener('click', function (e) {
      var avatar = e.target.closest('.w-avatar-other');
      if (!avatar) return;
      setTimeout(function () {
        if (wrapper.dataset.dblHit === '1') return;
        var targetNameEl = wrapper.querySelector('#w-target-name');
        var currentRemark = targetNameEl ? targetNameEl.textContent : roleId;
        var savedAvatar = localStorage.getItem(makeOKey(wrapper, 'other_avatar'));
        avatarImg.style.backgroundImage = savedAvatar ? 'url(' + savedAvatar + ')' : window.getComputedStyle(avatar).backgroundImage;
        remarkText.textContent = currentRemark;
        nicknameText.textContent = roleId;
        renderProfileData();
        profilePanel.classList.add('active');
        wrapper.classList.add('view-profile');
      }, 280);
    });
  }
  profileBack.addEventListener('click', function () { profilePanel.classList.remove('active'); wrapper.classList.remove('view-profile'); });
  sendMsgBtn.addEventListener('click', function () { profilePanel.classList.remove('active'); wrapper.classList.remove('view-profile'); });
  tagsBtn.addEventListener('click', function () {
    var b = wrapper.querySelector('#w-setting-remark-btn');
    if (b) b.click();
  });

  function checkBlockStatus() {
    var stat = localStorage.getItem(makeOKey(wrapper, 'relStatus')) || 'normal';
    if (stat === 'blocked') { showToast('无法操作', '你已拉黑对方，无法操作，请解除拉黑后再继续。', false); return false; }
    if (stat === 'deleted') { showToast('无法操作', '你们目前不是好友，无法操作，请通过“添加好友”恢复关系。', false); return false; }
    return true;
  }

  var interactEls = [
    wrapper.querySelector('#w-input-trigger'),
    wrapper.querySelector('#w-voice-btn'),
    wrapper.querySelector('#w-emoji-btn'),
    wrapper.querySelector('#w-plus-btn')
  ];
  $$('.w-profile-action-btn', wrapper).forEach(function (b) { interactEls.push(b); });
  $$('.w-profile-row.clickable', wrapper).forEach(function (row) {
    var label = row.querySelector('.w-profile-label');
    if (label && label.textContent.indexOf('朋友圈') > -1) interactEls.push(row);
  });
  interactEls.forEach(function (el) {
    if (!el) return;
    el.addEventListener('click', function (e) {
      if (!checkBlockStatus()) { e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation(); }
    }, true);
  });

  // 朋友设置页
  var friendSettingPanel = wrapper.querySelector('#w-friend-setting-panel');
  var profileMoreBtn = wrapper.querySelector('.w-profile-more');
  var friendSettingBack = wrapper.querySelector('#w-friend-setting-back');
  var blacklistBtn = wrapper.querySelector('#w-setting-blacklist-btn');
  var blacklistModal = wrapper.querySelector('#w-blacklist-modal');
  var unblockModal = wrapper.querySelector('#w-unblock-modal');
  var deleteBtn = wrapper.querySelector('#w-setting-delete-btn');
  var deleteModal = wrapper.querySelector('#w-delete-modal');
  var addFriendModal = wrapper.querySelector('#w-add-friend-modal');
  var remarkTagBtn = wrapper.querySelector('#w-setting-remark-btn');
  var settingRemarkText = wrapper.querySelector('#w-setting-remark-text');
  var remarkTagModal = wrapper.querySelector('#w-remark-tag-modal');
  var remarkInput = wrapper.querySelector('#w-remark-input');
  var tagInput = wrapper.querySelector('#w-tag-input');

  remarkTagBtn.addEventListener('click', function () {
    var currentRemark = localStorage.getItem(makeOKey(wrapper, 'target_remark')) || roleId;
    var currentTag = localStorage.getItem(makeOKey(wrapper, 'profile_tags')) || '';
    if (remarkInput) remarkInput.value = currentRemark;
    if (tagInput) tagInput.value = currentTag;
    if (remarkTagModal) remarkTagModal.classList.add('active');
  });
  wrapper.querySelector('#w-remark-tag-cancel').addEventListener('click', function () { remarkTagModal.classList.remove('active'); });
  wrapper.querySelector('#w-remark-tag-confirm').addEventListener('click', function () {
    var newRemark = remarkInput.value.trim();
    var newTag = tagInput.value.trim();
    if (newRemark) localStorage.setItem(makeOKey(wrapper, 'target_remark'), newRemark);
    else localStorage.removeItem(makeOKey(wrapper, 'target_remark'));
    if (newTag) localStorage.setItem(makeOKey(wrapper, 'profile_tags'), newTag);
    else localStorage.removeItem(makeOKey(wrapper, 'profile_tags'));
    renderProfileData();
    var targetNameEl = wrapper.querySelector('#w-target-name');
    if (targetNameEl) targetNameEl.textContent = newRemark || roleId;
    var profileRemarkEl = wrapper.querySelector('#w-profile-remark-text');
    if (profileRemarkEl) profileRemarkEl.textContent = newRemark || roleId;
    if (settingRemarkText) settingRemarkText.textContent = newTag;
    remarkTagModal.classList.remove('active');
    showToast('已保存', '备注和标签修改成功', true);
  });

  profileMoreBtn.addEventListener('click', function () {
    var stat = localStorage.getItem(makeOKey(wrapper, 'relStatus')) || 'normal';
    if (settingRemarkText) settingRemarkText.textContent = localStorage.getItem(makeOKey(wrapper, 'profile_tags')) || '';
    if (stat === 'blocked') { blacklistBtn.classList.add('active'); blacklistBtn.style.background = '#07c160'; }
    else { blacklistBtn.classList.remove('active'); blacklistBtn.style.background = '#e5e5ea'; }
    if (stat === 'deleted') { deleteBtn.innerText = '添加好友'; deleteBtn.style.color = '#576b95'; }
    else { deleteBtn.innerText = '删除'; deleteBtn.style.color = '#e64340'; }
    friendSettingPanel.classList.add('active');
    wrapper.classList.add('view-setting');
  });
  friendSettingBack.addEventListener('click', function () { friendSettingPanel.classList.remove('active'); wrapper.classList.remove('view-setting'); });

  blacklistBtn.addEventListener('click', function () {
    var stat = localStorage.getItem(makeOKey(wrapper, 'relStatus')) || 'normal';
    if (stat === 'deleted') { showToast('无法操作', '你们目前不是好友，不能同时拉黑，请先通过添加好友恢复关系。', false); return; }
    if (stat !== 'blocked') blacklistModal.classList.add('active');
    else unblockModal.classList.add('active');
  });
  wrapper.querySelector('#w-blacklist-cancel').addEventListener('click', function () { blacklistModal.classList.remove('active'); });
  wrapper.querySelector('#w-blacklist-confirm').addEventListener('click', function () {
    localStorage.setItem(makeOKey(wrapper, 'relStatus'), 'blocked');
    if (deleteBtn) { deleteBtn.innerText = '删除'; deleteBtn.style.color = '#e64340'; }
    blacklistBtn.classList.add('active');
    blacklistBtn.style.background = '#07c160';
    blacklistModal.classList.remove('active');
    triggerParentInput('$系统提示：user已在微信上将{{char}}加入黑名单。请在后续输出中，将{{char}}发送的左侧消息标签包裹一层错误后缀作为透传（如 <l_err>10:24|t|文字</l_err>、<l_err>10:24|imgt|图片描述</l_err>），并呈现发现消息被拒收后的反应。');
    updateInputUIState();
  });
  wrapper.querySelector('#w-unblock-cancel').addEventListener('click', function () { unblockModal.classList.remove('active'); });
  wrapper.querySelector('#w-unblock-confirm').addEventListener('click', function () {
    localStorage.setItem(makeOKey(wrapper, 'relStatus'), 'normal');
    if (deleteBtn) { deleteBtn.innerText = '删除'; deleteBtn.style.color = '#e64340'; }
    blacklistBtn.classList.remove('active');
    blacklistBtn.style.background = '#e5e5ea';
    unblockModal.classList.remove('active');
    triggerParentInput('$系统提示：user已取消对{{char}}的拉黑，恢复正常聊天。后续消息请正常发送。');
    updateInputUIState();
  });

  deleteBtn.addEventListener('click', function () {
    var stat = localStorage.getItem(makeOKey(wrapper, 'relStatus')) || 'normal';
    if (stat === 'blocked') { showToast('无法操作', '你已拉黑对方，无法删除，请解除拉黑后再操作。', false); return; }
    if (stat === 'deleted') addFriendModal.classList.add('active');
    else {
      var currentRemark = (wrapper.querySelector('#w-target-name')?.textContent) || roleId;
      var dn = wrapper.querySelector('#w-delete-modal-name');
      if (dn) dn.textContent = currentRemark;
      deleteModal.classList.add('active');
    }
  });
  wrapper.querySelector('#w-delete-cancel').addEventListener('click', function () { deleteModal.classList.remove('active'); });
  wrapper.querySelector('#w-delete-confirm').addEventListener('click', function () {
    localStorage.setItem(makeOKey(wrapper, 'relStatus'), 'deleted');
    deleteModal.classList.remove('active');
    deleteBtn.innerText = '添加好友';
    deleteBtn.style.color = '#576b95';
    triggerParentInput('$系统提示：user已在微信上将{{char}}单向删除。请在后续输出中，将{{char}}发送的左侧消息标签全部替换为 _vry 后缀（如 <l_vry>10:00|验证消息内容</l_vry>），对方只能发送好友验证请求卡片。保持发现被删后的反应。');
    updateInputUIState();
  });

  wrapper.querySelector('#w-add-friend-cancel').addEventListener('click', function () { addFriendModal.classList.remove('active'); });
  wrapper.querySelector('#w-add-friend-confirm').addEventListener('click', function () {
    var reqText = wrapper.querySelector('#w-add-friend-input').value.trim() || '你好，我是{{user}}，通过一下';
    triggerParentInput('$user发送好友验证申请：' + reqText);
    addFriendModal.classList.remove('active');
    showToast('已发送', '好友验证申请已发送', true);
  });
  wrapper.querySelector('#w-force-recover-btn').addEventListener('click', function () {
    localStorage.setItem(makeOKey(wrapper, 'relStatus'), 'normal');
    if (deleteBtn) { deleteBtn.innerText = '删除'; deleteBtn.style.color = '#e64340'; }
    addFriendModal.classList.remove('active');
    showToast('已强制恢复', '你已强制恢复正常聊天关系，可继续测试拉黑等操作。', true);
    triggerParentInput('$系统提示：user已强制恢复好友关系，现在可以正常对话了。');
    updateInputUIState();
  });

  function updateInputUIState() {
    var stat = localStorage.getItem(makeOKey(wrapper, 'relStatus')) || 'normal';
    var inpTrig = wrapper.querySelector('#w-input-trigger');
    if (!inpTrig) return;
    if (stat === 'blocked' || stat === 'deleted') {
      var lockIcon = '<svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2" fill="none" style="margin-right:4px;margin-bottom:1px;"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>';
      inpTrig.innerHTML = lockIcon + (stat === 'blocked' ? '已拉黑，不可操作' : '你们不是好友，不可操作');
      inpTrig.style.color = '#fa5151';
      inpTrig.style.background = '#f2f2f2';
      inpTrig.style.justifyContent = 'center';
      ['#w-voice-btn', '#w-emoji-btn', '#w-plus-btn'].forEach(function (s) { var e = wrapper.querySelector(s); if (e) e.style.opacity = '0.3'; });
    } else {
      inpTrig.innerHTML = '点击输入消息';
      inpTrig.style.color = '#aaa';
      inpTrig.style.background = '#fff';
      inpTrig.style.justifyContent = 'flex-start';
      ['#w-voice-btn', '#w-emoji-btn', '#w-plus-btn'].forEach(function (s) { var e = wrapper.querySelector(s); if (e) e.style.opacity = '1'; });
    }
  }
  updateInputUIState();

  window.acceptFriendVerify = function (btn) {
    var _st = localStorage.getItem(makeOKey(wrapper, 'relStatus')) || 'normal';
    if (_st === 'blocked') { showToast('无法操作', '你已拉黑对方，无法通过验证', false); return; }
    var card = btn.closest('.w-vry-card');
    if (card) { var g = card.querySelector('.w-vry-btn-group'); if (g) g.innerHTML = '<div style="font-size:11px;color:#07c160;text-align:center;width:100%;margin-top:4px;">已通过</div>'; }
    if (_st === 'deleted') {
      localStorage.setItem(makeOKey(wrapper, 'relStatus'), 'normal');
      triggerParentInput('$系统提示：user已通过{{char}}的好友验证请求，现在可以正常恢复对话了。');
      if (deleteBtn) { deleteBtn.innerText = '删除'; deleteBtn.style.color = '#e64340'; }
      updateInputUIState();
      showToast('已通过', '你们已恢复正常聊天', true);
    } else {
      triggerParentInput('$系统提示：user已通过{{char}}的好友验证请求。');
      showToast('已通过', '已通过对方的好友请求', true);
    }
  };
  window.rejectFriendVerify = function (btn) {
    var _st2 = localStorage.getItem(makeOKey(wrapper, 'relStatus')) || 'normal';
    if (_st2 === 'blocked') { showToast('无法操作', '你已拉黑对方，无法拒绝验证', false); return; }
    var card = btn.closest('.w-vry-card');
    if (card) { var g = card.querySelector('.w-vry-btn-group'); if (g) g.innerHTML = '<div style="font-size:11px;color:#999;text-align:center;width:100%;margin-top:4px;">已拒绝</div>'; }
    if (_st2 === 'deleted') {
      localStorage.setItem(makeOKey(wrapper, 'relStatus'), 'deleted');
      triggerParentInput('$系统提示：user已拒绝{{char}}的好友验证请求，{{char}}现在依然在被删除的状态。');
      showToast('已拒绝', '已拒绝对方的好友请求', true);
    } else {
      triggerParentInput('$系统提示：user已拒绝{{char}}的好友验证请求。');
      showToast('已拒绝', '已拒绝对方的好友请求', true);
    }
  };
})();

// 模块：自定义表情
(function () {
  var wrapper = grabPhone('emojiInited');
  if (!wrapper) return;

  var eGrid = wrapper.querySelector('.w-emoji-grid');
  var ePanel = wrapper.querySelector('#w-emoji-panel');
  var ceModal = wrapper.querySelector('#w-ce-modal');
  var ceUrlInput = wrapper.querySelector('#w-ce-url');
  var ceDescInput = wrapper.querySelector('#w-ce-desc');
  var cePreview = wrapper.querySelector('#w-ce-preview-box');
  var btnCeCancel = wrapper.querySelector('#w-ce-cancel');
  var btnCeConfirm = wrapper.querySelector('#w-ce-confirm');
  var isEditing = false;

  function renderEmojis() {
    if (!eGrid) return;
    $$('.w-emoji-custom, .w-emoji-btn-item', eGrid).forEach(function (el) { el.remove(); });
    var customEmojis = [];
    try {
      var parsed = JSON.parse(localStorage.getItem(makeOKey(wrapper, 'custom_emojis')) || '[]');
      if (Array.isArray(parsed)) customEmojis = parsed;
      else localStorage.removeItem(makeOKey(wrapper, 'custom_emojis'));
    } catch (e) { localStorage.removeItem(makeOKey(wrapper, 'custom_emojis')); }

    customEmojis.forEach(function (ce, index) {
      var el = document.createElement('div');
      el.className = 'w-emoji-item w-emoji-custom' + (isEditing ? ' editing' : '');
      el.style.backgroundImage = 'url(' + ce.url + ')';
      el.setAttribute('data-desc', ce.desc);
      el.setAttribute('data-url', ce.url);
      el.setAttribute('data-idx', index);
      var delBadge = document.createElement('div');
      delBadge.className = 'w-emoji-del-badge';
      delBadge.innerHTML = '×';
      el.appendChild(delBadge);
      eGrid.appendChild(el);
    });

    var addBtn = document.createElement('div');
    addBtn.className = 'w-emoji-item w-emoji-btn-item';
    addBtn.id = 'w-ce-add-btn';
    addBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>添加';
    eGrid.appendChild(addBtn);

    if (customEmojis.length > 0) {
      var manageBtn = document.createElement('div');
      manageBtn.className = 'w-emoji-item w-emoji-btn-item w-ce-manage-btn ' + (isEditing ? 'active' : '');
      manageBtn.id = 'w-ce-manage-btn';
      manageBtn.innerHTML = isEditing
        ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>完成'
        : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>管理';
      eGrid.appendChild(manageBtn);
      var clearBtn = document.createElement('div');
      clearBtn.className = 'w-emoji-item w-emoji-btn-item';
      clearBtn.id = 'w-ce-clear-btn';
      clearBtn.style.borderColor = '#ff3b30';
      clearBtn.style.color = '#ff3b30';
      clearBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>清空';
      eGrid.appendChild(clearBtn);
    } else isEditing = false;
  }
  renderEmojis();

  eGrid.addEventListener('click', function (e) {
    if (e.target.closest('#w-ce-add-btn')) {
      ceUrlInput.value = ''; ceDescInput.value = '';
      cePreview.style.backgroundImage = 'none'; cePreview.innerHTML = '无预览';
      ceModal.classList.add('active');
      return;
    }
    if (e.target.closest('#w-ce-manage-btn')) { isEditing = !isEditing; renderEmojis(); return; }
    if (e.target.closest('#w-ce-clear-btn')) {
      var doClear = false;
      try { doClear = window.parent.confirm('确认清空所有自定义表情吗？'); } catch (err) { doClear = true; }
      if (doClear) {
        localStorage.removeItem(makeOKey(wrapper, 'custom_emojis'));
        isEditing = false; renderEmojis();
        showToast('已清空', '自定义表情已全部清除', true);
      }
      return;
    }
    var item = e.target.closest('.w-emoji-custom');
    if (!item) return;
    if (isEditing) {
      e.preventDefault(); e.stopPropagation();
      var idx = parseInt(item.getAttribute('data-idx'), 10);
      if (!isNaN(idx)) {
        var customEmojis = JSON.parse(localStorage.getItem(makeOKey(wrapper, 'custom_emojis')) || '[]');
        customEmojis.splice(idx, 1);
        localStorage.setItem(makeOKey(wrapper, 'custom_emojis'), JSON.stringify(customEmojis));
        renderEmojis();
        showToast('已删除', '该表情已移除', true);
      }
    } else {
      var d = item.getAttribute('data-desc') || '表情';
      var url = item.getAttribute('data-url');
      triggerParentInput('发送网址图：' + d + '（' + url + '）');
    }
  });

  ceUrlInput.addEventListener('input', function () {
    var val = this.value.trim();
    if (val) { cePreview.style.backgroundImage = 'url(' + val + ')'; cePreview.innerHTML = ''; }
    else { cePreview.style.backgroundImage = 'none'; cePreview.innerHTML = '无预览'; }
  });
  btnCeCancel.addEventListener('click', function () { ceModal.classList.remove('active'); });
  btnCeConfirm.addEventListener('click', function () {
    var url = ceUrlInput.value.trim();
    var desc = ceDescInput.value.trim() || '自定义表情';
    if (!url) { showToast('错误', '请输入图片链接', false); return; }
    var customEmojis = [];
    try { customEmojis = JSON.parse(localStorage.getItem(makeOKey(wrapper, 'custom_emojis')) || '[]'); } catch (e) {}
    customEmojis.push({ url: url, desc: desc });
    localStorage.setItem(makeOKey(wrapper, 'custom_emojis'), JSON.stringify(customEmojis));
    ceModal.classList.remove('active');
    renderEmojis();
    showToast('添加成功', '自定义表情已存入面板', true);
  });
})();