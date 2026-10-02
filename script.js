window.triggerParentInput = function(text) {
  try {
    var pd = window.parent.document;
    var ta = pd.querySelector('textarea.flex.rounded-xl.border.border-input') || pd.querySelector('textarea');
    if (ta) {
      var setter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value").set;
      var cur = ta.value || '';
      setter.call(ta, cur + (cur && !cur.endsWith('\n') ? '\n' : '') + text);
      ta.dispatchEvent(new Event('input', { bubbles: true }));
      ta.focus();
    }
  } catch (e) { console.log("注入失败（可能不在iframe中）"); }
};
const DEFAULT_CD_AVATAR = 'https://q4.itc.cn/q_70/images03/20240613/1337649c5c614354af05b57731980a32.jpeg';
const DEFAULT_LNK_THUMB = 'https://img0.baidu.com/it/u=3997181045,3946027856&fm=253&fmt=auto&app=138&f=JPEG?w=300&h=300';
function isValidImageUrl(url) {
    if (!url) return false;
    url = url.trim();
    if (url === '' || url === '头像链接' || url === '封面图链接' || url === '图片链接' || url === '图片url链接') return false;
    return /^(https?:\/\/|data:image\/)/i.test(url);
}
    const bqbMap = {
      '表情包1': 'https://pic2.zhimg.com/80/v2-10edc0f0009489d86904fa96243d1197_720w.jpg',
      '表情包2': 'https://picx.zhimg.com/80/v2-42de2bf29fffd3da07cf691bbb4938b7_720w.jpg',
      '表情包3': 'https://pica.zhimg.com/80/v2-0856c3157fd5652e1a98d92e02cffc46_720w.webp',
      '表情包4': 'https://pic2.zhimg.com/80/v2-b66acaacb71ede1c1a37e45ab157c25b_720w.webp',
      '表情包5': 'https://pica.zhimg.com/80/v2-cc3cfb19a2f753b0c552698e5c0ad518_720w.webp',
      '表情包6': 'https://pic4.zhimg.com/80/v2-d6327303421453a73070d87a95d73bbd_720w.webp',
      '表情包7': 'https://pic2.zhimg.com/80/v2-01d878a50b977cb4b48a56449d867e01_720w.webp',
      '表情包8': 'https://pica.zhimg.com/80/v2-96a2fbc733ade7bac3870d06c4455f78_720w.webp',
      '表情包9': 'https://picx.zhimg.com/80/v2-07bf94e881ebb656f95b15238814f47b_720w.webp',
      '表情包10': 'https://pic1.zhimg.com/80/v2-f87c7de5cde8bbd501b2361bb224d4d2_720w.webp',
      '表情包11': 'https://pic3.zhimg.com/80/v2-6ef49ed49b2a6a05adf34569c6c0152c_720w.webp',
      '表情包12': 'https://pic4.zhimg.com/80/v2-da824dd48f8165c3602435907c51789b_720w.webp',
      '表情包13': 'https://pic1.zhimg.com/80/v2-d011c75b3addba890917a3c21d12ee00_720w.webp',
      '表情包14': 'https://pica.zhimg.com/80/v2-9e1977b900add602d366a89498afa864_720w.webp',
      '表情包15': 'https://pic2.zhimg.com/80/v2-aca5f4baeb9ed65ded422c6e88272a5d_720w.webp',
      '表情包16': 'https://pic2.zhimg.com/80/v2-69b2220e4d3f235a09971f8f38f690c1_720w.webp',
      '表情包17': 'https://pic3.zhimg.com/80/v2-d1021dd13228b996b0a6ce986c514e6a_720w.webp',
      '表情包18': 'https://picx.zhimg.com/80/v2-7cc09965f9d69cd42d41194e958679a9_720w.webp',
      '表情包19': 'https://picx.zhimg.com/80/v2-b21696a1e1c79a915ca4a8e02865bc13_720w.webp',
      '表情包20': 'https://picx.zhimg.com/80/v2-7046a8cf778be6b21466527d5ffca95b_720w.webp',
      '表情包21': 'https://pica.zhimg.com/80/v2-6f1dc88e049260d1089291edfb251df6_720w.webp',
      '表情包22': 'https://pic3.zhimg.com/80/v2-3c084aed1f84be2cba518d0169d7b740_720w.webp',
      '表情包23': 'https://picx.zhimg.com/80/v2-f99c263a52aaf474f2a40a7056f19e41_720w.webp',
      '表情包24': 'https://pic3.zhimg.com/80/v2-7bb65ee1e95b57737f627f328764967c_720w.webp',
      '表情包25': 'https://pica.zhimg.com/80/v2-47ae09a29be6f515898249b43d4801ca_720w.webp',
      '表情包26': 'https://pic2.zhimg.com/80/v2-1d46ce7a4c2f2422c5fc48e0ef714b51_720w.webp',
      '表情包27': 'https://pic3.zhimg.com/80/v2-223d8a5bc9b833480c284fdd87307790_720w.webp',
      '表情包28': 'https://pic2.zhimg.com/80/v2-94fa9183daa76e6c793cc68abe961657_720w.webp',
      '表情包29': 'https://pic4.zhimg.com/80/v2-e5ebbfebc1f99fd60a3e6386591f1eab_720w.webp',
      '表情包30': 'https://pica.zhimg.com/80/v2-b70bda0ad1da8e36a107607a9a926566_720w.webp',
      '表情包31': 'https://pic3.zhimg.com/80/v2-bc2851565d32054e719e336e68691e44_720w.webp',
      '表情包32': 'https://pic3.zhimg.com/80/v2-80856f9d2d96cfb6a47e97024d459de0_720w.webp',
      '表情包33': 'https://pic1.zhimg.com/80/v2-b89feb8bf545585649f06b3f2ae8a2d0_720w.webp',
      '表情包34': 'https://pica.zhimg.com/80/v2-68d9b920183747befc7ec18b72bc670c_720w.webp',
      '表情包35': 'https://pic4.zhimg.com/80/v2-2d52f523d712f98255ca8e909f97a9bb_720w.webp',
      '表情包36': 'https://picx.zhimg.com/80/v2-2dee74ae4856ac9e1b3682734d62bef5_720w.webp',
      '表情包37': 'https://pic2.zhimg.com/80/v2-41a7fef7a9ecdbb5fa94cab2e3914da3_720w.webp',
      '表情包38': 'https://pic4.zhimg.com/80/v2-a392064b1dea3b42ef0e30a06ac086c7_720w.webp',
      '表情包39': 'https://pica.zhimg.com/80/v2-c8b7fecf495648f1898c6a6d3ae4d614_720w.webp',
      '表情包40': 'https://pica.zhimg.com/80/v2-230de0bfea5cacb52aa31489df298062_720w.webp',
      '表情包41': 'https://pic3.zhimg.com/80/v2-79f8fcaabf99a166467b2d2b54f6f5ea_720w.webp'
    };
    var fakeOverlay = document.getElementById('w-fake-img-overlay');
    var fakeText = document.getElementById('w-fake-img-text');
    function showToast(title, message, isSuccess) {
      // 改为在当前最新被初始化的手机容器内寻找，避免串台到历史消息
      var activeWrappers = document.querySelectorAll('.w-wrapper');
      var activeWrapper = activeWrappers[activeWrappers.length - 1];
      if (!activeWrapper) return;
      
      var modal = activeWrapper.querySelector('#w-toast-modal');
      var titleEl = activeWrapper.querySelector('#w-toast-title');
      var msgEl = activeWrapper.querySelector('#w-toast-message');
      var confirmBtn = activeWrapper.querySelector('#w-toast-confirm');
      if (!modal) return;
      titleEl.textContent = title || (isSuccess ? '成功' : '提示');
      var msg = message || (isSuccess ? '操作已完成。' : '操作失败，请重试。');
      msgEl.innerHTML = msg.replace(/\n/g, '<br>');
      confirmBtn.style.color = isSuccess ? '#07c160' : '#e64340';
      modal.classList.add('active');
      confirmBtn.onclick = function () { modal.classList.remove('active'); };
      modal.onclick = function (e) { if (e.target === modal) modal.classList.remove('active'); };
    }
    window.showFakeImgFull = function (c, s) {
      var t = c.querySelector('.w-fake-full-text');
      if (!t) return;
      // 从被点击的图片容器向上层寻找到对应的全局遮罩，避免跨组件干扰
      var currentWrapper = c.closest('.w-wrapper');
      if (!currentWrapper) return;
      var curOverlay = currentWrapper.querySelector('#w-fake-img-overlay');
      var curText = currentWrapper.querySelector('#w-fake-img-text');
      if (!curOverlay || !curText) return;
      
      curText.textContent = t.textContent.trim();
      curOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    window.closeFakeImgFull = function () {
      // 批量关闭所有可能打开的图片遮罩
      document.querySelectorAll('#w-fake-img-overlay.active').forEach(function(el) {
        el.classList.remove('active');
      });
      document.body.style.overflow = '';
    };
    window.closeFakeImgFull = function () {
      fakeOverlay.classList.remove('active');
      document.body.style.overflow = '';
    };
    window.toggleVoiceText = function (el) {
      var tb = el.querySelector('.w-voice-text'),
        rd = el.querySelector('.w-voice-dot');
      if (tb) {
        if (tb.style.display === 'block') { tb.style.display = 'none'; } else { tb.style.display = 'block'; if (rd) rd.style.display = 'none'; }
      }
    };
    (function () {
      var hm = document.getElementById('w-hb-modal'),
        ho = document.getElementById('w-hb-open'),
        hc = document.getElementById('w-hb-close'),
        hAmt = document.getElementById('w-hb-amount'),
        hDesc = document.getElementById('w-hb-desc'),
        hLink = document.getElementById('w-hb-link'),
        chatArea = document.getElementById('w-chat-bg'),
        currentBubble = null;
      if (!chatArea || !hm) return;
      if (hc) hc.addEventListener('click', function () { hm.classList.remove('active'); });
      if (ho) {
        ho.addEventListener('click', function () {
          if (!currentBubble) return;
          // 添加旋转动画
          ho.classList.add('w-hb-spinning');
          
          // 延迟800毫秒后执行开启逻辑
          setTimeout(function () {
          ho.classList.remove('w-hb-spinning'); // 移除动画
          ho.style.display = 'none';
          hAmt.style.display = 'block';
          hDesc.innerText = '已存入零钱';
          hLink.style.display = 'block';
          currentBubble.classList.add('w-bubble-opened');
          currentBubble.dataset.opened = 'true';
          var subText = currentBubble.querySelector('.w-hb-sub-text');
          if (subText) subText.innerText = '已领取';
          triggerParentInput('$系统提示：我已领取对方的红包[' + currentBubble.dataset.desc + ']');
          }, 400);
        });
      }
      chatArea.addEventListener('click', function (e) {
        var hbLeft = e.target.closest('.w-hb-bubble');
        if (hbLeft) {
          currentBubble = hbLeft;
          hm.classList.add('active');
          var amt = hbLeft.dataset.amt || '0.00';
          var desc = hbLeft.dataset.desc || '恭喜发财';
          var hbTitle = document.querySelector('.w-hb-name');
          var hbAva = document.querySelector('.w-hb-avatar');
          var tName = document.getElementById('w-target-name') ? document.getElementById('w-target-name').innerText : '对方';
          if (hbTitle) hbTitle.innerText = tName + '的红包';
          if (hbAva) {
            var row = hbLeft.closest('.w-row');
            var avatarInRow = row ? row.querySelector('.w-avatar') : null;
            if (avatarInRow) {
              var bgImg = window.getComputedStyle(avatarInRow).backgroundImage;
              hbAva.style.backgroundImage = bgImg;
              hbAva.style.backgroundColor = 'transparent';
              hbAva.style.border = 'none';
            }
            hbAva.classList.remove('w-avatar-me');
            hbAva.classList.add('w-avatar-other');
          }
          hAmt.innerHTML = amt + '<span style="font-size:16px;">元</span>';
          if (hbLeft.dataset.opened === 'true') {
            ho.style.display = 'none';
            hAmt.style.display = 'block';
            hDesc.innerText = '已存入零钱';
            hLink.style.display = 'block';
          } else {
            ho.style.display = 'flex';
            hAmt.style.display = 'none';
            hDesc.innerText = desc;
            hLink.style.display = 'none';
          }
          return;
        }
        var hbRight = e.target.closest('.w-hb-self-bubble');
        if (hbRight) {
          currentBubble = hbRight;
          if (hm) hm.classList.add('active');
          var amt = hbRight.dataset.amt || '0.00';
          if (ho) ho.style.display = 'none';
          if (hAmt) {
            hAmt.style.display = 'block';
            hAmt.innerHTML = amt + '<span style="font-size:16px;">元</span>';
          }
          if (hDesc) {
            if (hbRight.dataset.opened === 'true') {
              hDesc.innerText = '对方已领取';
            } else {
              hDesc.innerText = '1个红包共' + amt + '元，等待对方领取';
            }
          }
          if (hLink) hLink.style.display = 'none';
          var hbTitle = document.querySelector('.w-hb-name');
          var hbAva = document.querySelector('.w-hb-avatar');
          if (hbTitle) hbTitle.innerText = '我的红包';
          if (hbAva) {
            var row = hbRight.closest('.w-row');
            var avatarInRow = row ? row.querySelector('.w-avatar') : null;
            if (avatarInRow) {
              var bgImg = window.getComputedStyle(avatarInRow).backgroundImage;
              hbAva.style.backgroundImage = bgImg;
              hbAva.style.backgroundColor = 'transparent';
              hbAva.style.border = 'none';
            }
            hbAva.classList.remove('w-avatar-other');
            hbAva.classList.add('w-avatar-me');
          }
          if (typeof triggerParentInput === 'function') {
            triggerParentInput('$系统提示：我查看了自己发出的红包状态，金额 ' + amt + ' 元');
          }
          return;
        }
      });
    })();
    (function () {
      var rm = document.getElementById('w-tf-receive-modal'),
        rbtn = document.getElementById('w-tf-btn-recv'),
        retbtn = document.getElementById('w-tf-btn-return'),
        titleRecv = document.getElementById('w-tf-title-recv'),
        iconNormalRecv = document.getElementById('w-tf-icon-normal-recv'),
        iconSuccessRecv = document.getElementById('w-tf-icon-success-recv'),
        amtTextRecv = rm ? rm.querySelector('.w-tf-amount') : null,
        dm = document.getElementById('w-tf-detail-modal'),
        titleDetail = dm ? dm.querySelector('.w-tf-title') : null,
        amtTextDetail = dm ? dm.querySelector('.w-tf-amount') : null,
        chatArea = document.getElementById('w-chat-bg'),
        currentTfBubble = null;
      if (!chatArea) return;
      if (rbtn) {
        rbtn.addEventListener('click', function () {
          if (!currentTfBubble) return;
          rbtn.style.display = 'none';
          if (retbtn) retbtn.parentElement.style.display = 'none';
          iconNormalRecv.style.display = 'none';
          iconSuccessRecv.style.display = 'block';
          titleRecv.innerText = '已收款';
          currentTfBubble.classList.add('w-bubble-opened');
          currentTfBubble.dataset.status = 'received';
          var stText = currentTfBubble.querySelector('.tf-status-text');
          if (stText) stText.innerText = '已被接收';
          var iconWrapper = currentTfBubble.querySelector('.w-orange-icon');
          if (iconWrapper) {
            iconWrapper.innerHTML = '<svg class="tf-icon-success" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>';
          }
          triggerParentInput('$系统提示：我已收款转账 ¥' + currentTfBubble.dataset.amt);
        });
      }
      if (retbtn) {
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
          var iconWrapper = currentTfBubble.querySelector('.w-orange-icon');
          if (iconWrapper) {
            iconWrapper.innerHTML = '<svg class="tf-icon-returned" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 14l-4-4 4-4"/><path stroke-linecap="round" stroke-linejoin="round" d="M5 10h11a4 4 0 1 1 0 8h-1"/></svg>';
          }
          triggerParentInput('$系统提示：我已退还转账 ¥' + currentTfBubble.dataset.amt);
        });
      }
      chatArea.addEventListener('click', function (e) {
        var tfBubble = e.target.closest('.w-tf-bubble');
        if (!tfBubble) return;
        currentTfBubble = tfBubble;
        var action = tfBubble.dataset.action;
        var amt = tfBubble.dataset.amt || '0.00';
        var status = tfBubble.dataset.status || 'pending';
        if (action === 'recv') {
          if (!rm) return;
          rm.classList.add('active');
          if (amtTextRecv) amtTextRecv.innerText = '¥' + amt;
          if (status === 'received') {
            rbtn.style.display = 'none';
            if (retbtn) retbtn.parentElement.style.display = 'none';
            iconNormalRecv.style.display = 'none';
            iconSuccessRecv.style.display = 'block';
            titleRecv.innerText = '已收款';
          } else if (status === 'returned') {
            roTitle.innerText = '已退还';
            roTitle.style.color = '#333';
            roIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M9 14l-4-4 4-4"/><path stroke-linecap="round" stroke-linejoin="round" d="M5 10h11a4 4 0 1 1 0 8h-1"/>';
            roIcon.setAttribute('stroke', '#333');
            roDesc.innerText = role === 'me' ? '你已退还' : '对方已退还';
          } else {
            rbtn.style.display = 'flex';
            if (retbtn) retbtn.parentElement.style.display = 'block';
            iconNormalRecv.style.display = 'flex';
            iconSuccessRecv.style.display = 'none';
            titleRecv.innerText = '待收款';
          }
        } else if (action === 'send') {
          if (!dm) return;
          dm.classList.add('active');
          if (amtTextDetail) amtTextDetail.innerText = '¥' + amt;
          var targetName = tfBubble.dataset.target || '对方';
          if (status === 'received') {
            titleDetail.innerText = targetName + ' 已收款';
          } else if (status === 'returned') {
            titleDetail.innerText = '转账已退还';
          } else {
            titleDetail.innerText = '待 ' + targetName + ' 收款';
          }
          triggerParentInput('$系统提示：我查看了转账(¥' + amt + ')状态，当前：' + (status === 'pending' ? '待收款' : status));
        } else if (action === 'readonly') {
          var rom = document.getElementById('w-tf-readonly-modal');
          if (!rom) return;
          rom.classList.add('active');
          var roAmt = rom.querySelector('#w-tf-ro-amt');
          var roTitle = rom.querySelector('#w-tf-ro-title');
          var roDesc = rom.querySelector('#w-tf-ro-desc');
          var roIcon = rom.querySelector('#w-tf-ro-icon');
          var role = tfBubble.dataset.role;
          if (roAmt) roAmt.innerText = '¥' + amt;
          if (status === 'received') {
            roTitle.innerText = '已收款';
            roTitle.style.color = '#07c160';
            roIcon.innerHTML = '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>';
            roIcon.setAttribute('stroke', '#07c160');
            roDesc.innerText = role === 'me' ? '你已收款，资金已存入零钱' : '对方已收款，资金已存入对方零钱';
          } else if (status === 'returned') {
            roTitle.innerText = '已退还';
            roTitle.style.color = '#333';
            roIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 10h10M17 10l-3-3M17 14H7M7 14l3 3"/>';
            roIcon.setAttribute('stroke', '#333');
            roDesc.innerText = role === 'me' ? '你已退还' : '对方已退还';
          }
        }
      });
    })();
    (function () {
      var modal = document.getElementById('detailModal'),
        body = document.getElementById('modalBody'),
        badge = document.getElementById('modalBadge'),
        closeBtn = document.getElementById('modalCloseBtn'),
        chat = document.getElementById('w-chat-bg');

      function esc(t) { var d = document.createElement('div');
        d.textContent = t; return d.innerHTML; }

      function extractLink(b) {
        var t = b.querySelector('.w-link-title'),
          d = b.querySelector('.w-link-desc'),
          th = b.querySelector('.w-link-thumb');
        return { title: t ? t.textContent.trim() : '无标题', desc: d ? d.textContent.trim() : '暂无描述', thumbSrc: th ? th.getAttribute('src') : null };
      }

      function extractFile(b) {
        var n = b.querySelector('.w-file-name'),
          s = b.querySelector('.w-file-size'),
          i = b.querySelector('.w-file-icon'),
          full = n ? n.textContent.trim() : '未知文件',
          ext = full.includes('.') ? full.split('.').pop().toUpperCase() : 'FILE';
        return { name: full, size: s ? s.textContent.trim() : '未知大小', ext: ext, iconHTML: i ? i.outerHTML : null };
      }

      function renderLink(d) {
        var th = d.thumbSrc ? '<img src="' + esc(d.thumbSrc) + '" class="w-modal-link-thumb" alt="缩略图">' : '<div class="w-modal-link-thumb" style="background:#f0f0f0;display:flex;align-items:center;justify-content:center;color:#bbb;font-size:14px;">无缩略图</div>';
        return th + '<div class="w-modal-link-title">' + esc(d.title) + '</div><div class="w-modal-link-desc">' + esc(d.desc) + '</div><div class="w-modal-link-meta"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" stroke-width="1.5"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg><span>链接消息 · 点击查看完整内容</span></div>';
      }

      function renderFile(d) {
        var ic = d.iconHTML || '<svg class="w-modal-file-icon" viewBox="0 0 24 24" fill="none"><path d="M4 4C4 2.89543 4.89543 2 6 2H13.1716C13.702 2 14.2107 2.21071 14.5858 2.58579L19.4142 7.41421C19.7893 7.78929 20 8.29799 20 8.82843V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V4Z" fill="#8E8E93"/><path d="M13 2.5V6C13 7.10457 13.8954 8 15 8H18.5" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/></svg>';
        return '<div style="text-align:center;">' + ic + '</div><div class="w-modal-file-name">' + esc(d.name) + '</div><div class="w-modal-file-size">' + esc(d.size) + '</div><div class="w-modal-file-type">' + esc(d.ext) + ' 文件</div><div class="w-modal-file-divider"></div><div class="w-modal-file-info-grid"><span class="label">文件名</span><span class="value">' + esc(d.name) + '</span><span class="label">大小</span><span class="value">' + esc(d.size) + '</span><span class="label">类型</span><span class="value">' + esc(d.ext) + '</span></div>';
      }

      function extractLoc(b) {
        var t = b.querySelector('.w-loc-title'),
          d = b.querySelector('.w-loc-sub');
        return { title: t ? t.textContent.trim() : '未知地点', desc: d ? d.textContent.trim() : '暂无详细地址' };
      }

      function renderLoc(d) {
        return '<div style="text-align:center;margin-bottom:16px;"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#e94f4f" stroke-width="1.5"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg></div><div class="w-modal-link-title" style="text-align:center;">' + esc(d.title) + '</div><div class="w-modal-link-desc" style="text-align:center;color:#666;">' + esc(d.desc) + '</div><div class="w-modal-link-meta" style="justify-content:center;"><span>位置信息</span></div>';
      }

      function openModal(type, data) {
        var map = { link: '链接', file: '文件', loc: '位置' };
        badge.textContent = map[type] || '消息';
        var html = '';
        if (type === 'link') html = renderLink(data);
        else if (type === 'file') html = renderFile(data);
        else if (type === 'loc') html = renderLoc(data);
        else html = '<div class="w-modal-empty">暂不支持查看此类型消息</div>';
        body.innerHTML = html;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }

      function closeModal() { modal.classList.remove('active');
        document.body.style.overflow = ''; }
      if (closeBtn) closeBtn.addEventListener('click', closeModal);
      if (modal) modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && modal && modal.classList.contains('active')) closeModal(); });
      if (chat) {
        chat.addEventListener('click', function (e) {
          var b = e.target.closest('.w-msg-clickable');
          if (!b) return;
          if (b.closest('.w-bubble-card:has(.w-card-top)')) return;
          var type = b.getAttribute('data-msg-type') || '',
            data = null;
          if (type === 'link') { data = extractLink(b);
            openModal('link', data); } else if (type === 'file') { data = extractFile(b);
            openModal('file', data); } else if (type === 'loc') { data = extractLoc(b);
            openModal('loc', data); } else {
            if (b.querySelector('.w-link-title')) { data = extractLink(b);
              openModal('link', data); } else if (b.querySelector('.w-file-name')) { data = extractFile(b);
              openModal('file', data); }
          }
        });
      }
    })();
    (function () {
      var wrappers = document.querySelectorAll('#w-dynamic-wrapper');
      var wrapper = wrappers[wrappers.length - 1];
      if (!wrapper || wrapper.dataset.initialized) return;
      wrapper.dataset.initialized = 'true';
      var rawTpl = document.querySelector('.seb-chat-data');
      var roleId = rawTpl ? (rawTpl.innerHTML.match(/<n>(.*?)<\/n>/)?.[1] || 'default') : 'default';
      var wPageId = 'idx';
      try { wPageId = window.parent.location.href.split('#')[0].replace(/[^a-zA-Z0-9]/g, '_'); } catch(e) {}
      var OKey = function (key) { return 'w_os_' + roleId + '_' + wPageId + '_' + key; };

      function triggerParentInput(text) {
        try {
          var pd = window.parent.document;
          var ta = pd.querySelector('textarea.flex.rounded-xl.border.border-input') || pd.querySelector('textarea');
          if (ta) {
            var setter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value").set;
            var cur = ta.value || '';
            setter.call(ta, cur + (cur && !cur.endsWith('\n') ? '\n' : '') + text);
            ta.dispatchEvent(new Event('input', { bubbles: true }));
            ta.focus();
          }
        } catch (e) { console.log("注入失败（可能不在iframe中）"); }
      }
      var clock = wrapper.querySelector('#w-clock');
      if (clock) {
        var timeMatch = rawTpl ? rawTpl.innerHTML.match(/<time>(.*?)<\/time>/) : null;
        if (timeMatch && timeMatch[1]) {
          clock.innerText = timeMatch[1].trim();
        } else {
          function upd() { var n = new Date();
          clock.innerText = n.getHours().toString().padStart(2, '0') + ':' + n.getMinutes().toString().padStart(2, '0'); }
          upd();
          setInterval(upd, 60000);
        }
      }
      var bg = wrapper.querySelector('#w-chat-bg');
      var oAv = wrapper.querySelectorAll('.w-avatar-other');
      var mAv = wrapper.querySelectorAll('.w-avatar-me');

      function loadImg(key, selector, isMe) {
        var s = localStorage.getItem(key);
        if (s) {
          var els = wrapper.querySelectorAll(selector);
          els.forEach(function (el) {
            el.style.backgroundImage = 'url(' + s + ')';
            if (isMe) {
              el.style.backgroundColor = 'transparent';
              el.style.border = 'none';
            }
          });
        }
      }
      loadImg(OKey('bg'), '#w-chat-bg');
      loadImg(OKey('other_avatar'), '.w-avatar-other');
      loadImg(OKey('me_avatar'), '.w-avatar-me', true);
      var panel = wrapper.querySelector('#w-settings-panel'),
        sBtn = wrapper.querySelector('#w-settings-btn'),
        sClose = wrapper.querySelector('#w-settings-close');
      if (sBtn && panel) sBtn.addEventListener('click', function () { panel.style.display = 'flex';
        setTimeout(function () { panel.classList.add('active'); }, 10); });
      if (sClose && panel) sClose.addEventListener('click', function () { panel.classList.remove('active');
        setTimeout(function () { panel.style.display = 'none'; }, 250); });

      function handleUpload(id, key, selector, isMe) {
        var inp = wrapper.querySelector(id);
        if (!inp) return;
        inp.addEventListener('change', function (e) {
          var f = e.target.files[0];
          if (!f) return;
          var r = new FileReader();
          r.onload = function (ev) {
          var img = new Image();
          img.onload = function() {
          var canvas = document.createElement('canvas');
          var ctx = canvas.getContext('2d');
          
          var maxWidth = 800; 
          var maxHeight = 800;
          var width = img.width;
          var height = img.height;
          
          if (width > height) {
          if (width > maxWidth) { height = Math.round(height * maxWidth / width); width = maxWidth; }
          } else {
          if (height > maxHeight) { width = Math.round(width * maxHeight / height); height = maxHeight; }
          }
          canvas.width = width; 
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
          
          var b64 = canvas.toDataURL('image/jpeg', 0.7);

          try {
          localStorage.setItem(key, b64);
          var els = wrapper.querySelectorAll(selector);
          els.forEach(function (el) {
          el.style.backgroundImage = 'url(' + b64 + ')';
          if (isMe) {
          el.style.backgroundColor = 'transparent';
          el.style.border = 'none';
          }
          });
          showToast('成功', '图片已压缩并上传成功！', true);
} catch (err) {
  var totalBytes = 0;
  for (var i = 0; i < localStorage.length; i++) {
    var k = localStorage.key(i);
    totalBytes += localStorage.getItem(k).length;
  }
  var usedMB = (totalBytes / 1024 / 1024).toFixed(2);

  var host = '此网站';
  try {
    if (window.top && window.top.location && window.top.location.hostname) {
      host = window.top.location.hostname;
    } else if (window.location.hostname) {
      host = window.location.hostname;
    } else if (document.domain) {
      host = document.domain;
    }
  } catch(e) {}

var msg =
  '<div style="text-align:left; line-height:1.7; font-size:13px;">' +
    '当前网站（<strong style="color:#007aff;">' + host + '</strong>）域名缓存达临界值（已用 <strong style="color:#e64340;">' + usedMB + 'MB</strong>/约5MB），无法再保存新图片或文件。' +
    '<br><br>' +
    '<span style="color:#999; font-size:12px;">注意：此存储空间由当前网站下的所有内容共享（包括其他AI角色的页面缓存、图片、音乐等），并非仅限本小手机。</span>' +
    '<br><br>' +
    '<strong>建议操作：</strong><br>' +
    '① <strong>点击【清空缓存并恢复默认】</strong>，释放本小手机先前占用的空间；<br>' +
    '② 如果清理后仍不足，可尝试在浏览器地址栏点击“锁”或“i”图标 → <strong>网站设置 → 清除数据</strong>（⚠️此操作会清除该网站下所有数据缓存，可能会包括您的账号登录状态、聊天记录等，请谨慎操作喔！）；<br>' +
    '③ 更建议使用 <strong>“图片链接(URL)”</strong> 代替“从相册上传”，可节省90%以上空间。' +
  '</div>';

  showToast('网站存储空间已满', msg, false);
}
          };
          img.src = ev.target.result;
          };
          r.onerror = function () {
          showToast('解析中断', '文件损坏或格式不受支持，底层数据流读取失败，请更换有效图片。', false);
          };
          r.readAsDataURL(f);
          inp.value = ''; 
        });
      }
      handleUpload('#w-upload-bg', OKey('bg'), '#w-chat-bg');
      handleUpload('#w-upload-other', OKey('other_avatar'), '.w-avatar-other');
      handleUpload('#w-upload-me', OKey('me_avatar'), '.w-avatar-me', true);
      var voices = wrapper.querySelectorAll('.w-voice-box');
      voices.forEach(function (vb) {
        var secSpan = vb.querySelector('.w-voice-sec');
        if (secSpan) {
          var sec = parseInt(secSpan.innerText) || 0;
          var w = Math.min(200, 60 + sec * 3.5);
          vb.style.width = w + 'px';
        }
      });
      if (bg) {
        bg.addEventListener('dblclick', function (e) {
          var av = e.target.closest('.w-avatar-other');
          if (av) {
            var tName = wrapper.querySelector('#w-target-name') ? wrapper.querySelector('#w-target-name').innerText : '对方';
            av.classList.add('w-shake-anim');
            setTimeout(function () { av.classList.remove('w-shake-anim'); }, 350);
            triggerParentInput('$拍一拍内容：我拍了拍"' + tName + '"的');
          }
        });
      }
      var vBtn = wrapper.querySelector('#w-voice-btn');
      if (vBtn) vBtn.addEventListener('click', function () { triggerParentInput('$User发送语音转文字消息：'); });
      var inpTrig = wrapper.querySelector('#w-input-trigger');
      if (inpTrig) inpTrig.addEventListener('click', function () { triggerParentInput('$User发送线上聊天：'); });
      var eBtn = wrapper.querySelector('#w-emoji-btn'),
        pBtn = wrapper.querySelector('#w-plus-btn'),
        ePanel = wrapper.querySelector('#w-emoji-panel'),
        pPanel = wrapper.querySelector('#w-plus-panel');

      function toggleExt(target, other) {
        if (target.style.display === 'block') { target.style.display = 'none'; } else { target.style.display = 'block';
          other.style.display = 'none'; if (bg) bg.scrollTo({ top: bg.scrollHeight, behavior: 'smooth' }); }
      }
      if (eBtn && ePanel && pPanel) eBtn.addEventListener('click', function () { toggleExt(ePanel, pPanel); });
      if (pBtn && pPanel && ePanel) pBtn.addEventListener('click', function () { toggleExt(pPanel, ePanel); });
      if (bg) bg.addEventListener('click', function (e) { if (e.target === bg) { if (ePanel) ePanel.style.display = 'none'; if (pPanel) pPanel.style.display = 'none'; } });
      var emojis = wrapper.querySelectorAll('.w-emoji-item');
      emojis.forEach(function (item) { item.addEventListener('click', function () { var d = item.getAttribute('data-desc') || '表情';
          triggerParentInput('发送表情包：' + d); }); });
      var plusItems = wrapper.querySelectorAll('.w-plus-item');
      var sendModal = wrapper.querySelector('#w-send-modal');
      var sendTitle = wrapper.querySelector('#w-send-title');
      var sendAmt = wrapper.querySelector('#w-send-amt');
      var sendDesc = wrapper.querySelector('#w-send-desc');
      var sendCancel = wrapper.querySelector('#w-send-cancel');
      var sendConfirm = wrapper.querySelector('#w-send-confirm');
      var currentSendType = '';
      plusItems.forEach(function (item) {
        item.addEventListener('click', function () {
          var text = item.querySelector('.w-plus-text').innerText;
          var action = item.getAttribute('data-action') || '';
          if (text === '红包' || text === '转账') {
            currentSendType = text;
            sendTitle.innerText = '发送' + text;
            sendAmt.value = '';
            sendDesc.value = '';
            sendDesc.placeholder = text === '红包' ? '恭喜发财，大吉大利' : '转账备注 (选填)';
            sendModal.classList.add('active');
            if (pPanel) pPanel.style.display = 'none';
          } else if (action) {
            triggerParentInput(action);
          }
        });
      });
      if (sendCancel) { sendCancel.addEventListener('click', function () { sendModal.classList.remove('active'); }); }
      if (sendConfirm) {
        sendConfirm.addEventListener('click', function () {
          var amt = sendAmt.value.trim() || '0.00';
          var desc = sendDesc.value.trim();
          if (!desc) desc = currentSendType === '红包' ? '恭喜发财，大吉大利' : '转账';
          var injectText = '$User发出' + currentSendType + '：（' + amt + '）元，并备注：' + desc;
          triggerParentInput(injectText);
          sendModal.classList.remove('active');
        });
      }
      var shellSwitches = wrapper.querySelectorAll('.w-shell-switch');
      var savedShell = localStorage.getItem(OKey('shell_color')) || 'white';
      shellSwitches.forEach(function (btn) {
        btn.classList.remove('active');
        if (btn.getAttribute('data-color') === savedShell) { btn.classList.add('active'); }
      });
      wrapper.classList.remove('w-wrapper-white', 'w-wrapper-gray', 'w-wrapper-blue', 'w-wrapper-custom');
      if (savedShell !== 'black') { wrapper.classList.add('w-wrapper-' + savedShell); }
      shellSwitches.forEach(function (btn) {
        btn.addEventListener('click', function () {
          if (btn.classList.contains('active')) return;
          var c = btn.getAttribute('data-color');
          shellSwitches.forEach(function (b) { b.classList.remove('active'); });
          btn.classList.add('active');
          wrapper.classList.remove('w-wrapper-white', 'w-wrapper-gray', 'w-wrapper-blue', 'w-wrapper-custom');
          if (c !== 'black') { wrapper.classList.add('w-wrapper-' + c); }
          localStorage.setItem(OKey('shell_color'), c);
          showToast('成功', '外壳已切换，带来全新质感', true);
        });
      });
      var customColorPicker = wrapper.querySelector('#w-custom-shell-color');
      if (customColorPicker) {
        var savedCustomColor = localStorage.getItem(OKey('custom_shell_hex')) || '#ffb6c1';
        customColorPicker.value = savedCustomColor;
        applyCustomShellColor(savedCustomColor);

        customColorPicker.addEventListener('input', function (e) {
          var hex = e.target.value;
          applyCustomShellColor(hex);
          localStorage.setItem(OKey('custom_shell_hex'), hex);
          var customBtn = wrapper.querySelector('.w-shell-switch[data-color="custom"]');
          if (customBtn && !customBtn.classList.contains('active')) {
          customBtn.click();
          }
        });
      }

      function isDarkBubbleColor(hex) {
        if(!hex) return false;
        var r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
        return ((r * 299 + g * 587 + b * 114) / 1000) < 128;
      }
      function applyCustomBubbleColor(role, hex) {
        var isDark = isDarkBubbleColor(hex);
        var textColor = isDark ? '#ffffff' : '#111111';
        var lineColor = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)';
        wrapper.style.setProperty('--custom-' + role + '-bg', hex);
        wrapper.style.setProperty('--custom-' + role + '-text', textColor);
        wrapper.style.setProperty('--custom-' + role + '-line', lineColor);
      }
      var savedOtherCustom = localStorage.getItem(OKey('custom_other_hex')) || '#ffffff';
      var savedMeCustom = localStorage.getItem(OKey('custom_me_hex')) || '#95ec69';
      applyCustomBubbleColor('other', savedOtherCustom);
      applyCustomBubbleColor('me', savedMeCustom);
      function applyCustomShellColor(hex) {
        var r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
        var brightness = (r * 299 + g * 587 + b * 114) / 1000;
        var darkHex = '#' + Math.floor(r * 0.75).toString(16).padStart(2, '0') + Math.floor(g * 0.75).toString(16).padStart(2, '0') + Math.floor(b * 0.75).toString(16).padStart(2, '0');
        var lightR = Math.floor(r + (255 - r) * 0.4); var lightG = Math.floor(g + (255 - g) * 0.4); var lightB = Math.floor(b + (255 - b) * 0.4); var lightHex = '#' + lightR.toString(16).padStart(2, '0') + lightG.toString(16).padStart(2, '0') + lightB.toString(16).padStart(2, '0');
        var lineRgba = brightness > 128 ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.7)';

        wrapper.style.setProperty('--c-main', hex);
        wrapper.style.setProperty('--c-dark', darkHex);
        wrapper.style.setProperty('--c-light', lightHex);
        wrapper.style.setProperty('--c-line', lineRgba);
      }
      ['other', 'me'].forEach(function(role) {
        var picker = wrapper.querySelector('#w-custom-' + role + '-color');
        if(picker) {
          picker.value = role === 'other' ? savedOtherCustom : savedMeCustom;
          var customBtn = wrapper.querySelector('.w-bubble-switch[data-color="custom_' + role + '"]');
          if (customBtn) customBtn.style.background = picker.value;
          picker.addEventListener('input', function(e) {
          var hex = e.target.value;
          applyCustomBubbleColor(role, hex);
          localStorage.setItem(OKey('custom_' + role + '_hex'), hex);
          if (customBtn) {
          customBtn.style.background = hex;
          if (!customBtn.classList.contains('active')) customBtn.click();
          }
          });
        }
      });
      var bubbleSwitches = wrapper.querySelectorAll('.w-bubble-switch');
      var savedOtherBubble = localStorage.getItem(OKey('other_bubble')) || 'white';
      var savedMeBubble = localStorage.getItem(OKey('me_bubble')) || 'green';
      bubbleSwitches.forEach(function (btn) {
        btn.classList.remove('active');
        var role = btn.getAttribute('data-role');
        var color = btn.getAttribute('data-color');
        if ((role === 'other' && color === savedOtherBubble) || (role === 'me' && color === savedMeBubble)) { btn.classList.add('active'); }
        btn.addEventListener('click', function () {
          if (btn.classList.contains('active')) return;
          var currentRole = btn.getAttribute('data-role');
          var currentColor = btn.getAttribute('data-color');
          bubbleSwitches.forEach(function (b) { if (b.getAttribute('data-role') === currentRole) { b.classList.remove('active'); } });
          btn.classList.add('active');
          if (currentRole === 'other') { localStorage.setItem(OKey('other_bubble'), currentColor); } else { localStorage.setItem(OKey('me_bubble'), currentColor); }
          showToast('成功', '气泡颜色已记录，刷新即可生效', true);
        });
      });
      // ========== URL与头像弹窗逻辑 开始 ==========
      var avatarActionModal = document.getElementById('w-avatar-action-modal');
      var urlInputModal = document.getElementById('w-url-input-modal');
      var urlInput = document.getElementById('w-url-input');
      var currentSetTarget = ''; // 用于识别当前是在改谁: 'bg', 'other', 'me'

      // 1. 监听头像菜单点击
      var btnAvatarOther = document.getElementById('w-btn-avatar-other-menu');
      var btnAvatarMe = document.getElementById('w-btn-avatar-me-menu');
      if(btnAvatarOther) {
          btnAvatarOther.addEventListener('click', function() {
          currentSetTarget = 'other';
          document.getElementById('w-avatar-action-title').innerText = '更换对方头像';
          avatarActionModal.classList.add('active');
          });
      }
      if(btnAvatarMe) {
          btnAvatarMe.addEventListener('click', function() {
          currentSetTarget = 'me';
          document.getElementById('w-avatar-action-title').innerText = '更换我的头像';
          avatarActionModal.classList.add('active');
          });
      }

      // 2. 头像选择弹窗内按钮控制
      var actionCancel = document.getElementById('w-action-cancel');
      var actionAlbum = document.getElementById('w-action-album');
      var actionUrl = document.getElementById('w-action-url');
      if(actionCancel) actionCancel.addEventListener('click', function() { avatarActionModal.classList.remove('active'); });
      if(actionAlbum) {
          actionAlbum.addEventListener('click', function() {
          avatarActionModal.classList.remove('active');
          // 触发原生上传按钮
          if (currentSetTarget === 'other') document.getElementById('w-upload-other').click();
          if (currentSetTarget === 'me') document.getElementById('w-upload-me').click();
          });
      }
      if(actionUrl) {
          actionUrl.addEventListener('click', function() {
          avatarActionModal.classList.remove('active');
          document.getElementById('w-url-title').innerText = '输入头像链接';
          urlInput.value = '';
          urlInputModal.classList.add('active');
          });
      }

      // 3. 背景链接菜单触发
      var btnBgUrl = document.getElementById('w-btn-bg-url');
      if(btnBgUrl) {
          btnBgUrl.addEventListener('click', function() {
          currentSetTarget = 'bg';
          document.getElementById('w-url-title').innerText = '输入背景链接';
          urlInput.value = '';
          urlInputModal.classList.add('active');
          });
      }

      // 4. URL处理核心逻辑
      var urlCancel = document.getElementById('w-url-cancel');
      var urlConfirm = document.getElementById('w-url-confirm');
      if(urlCancel) urlCancel.addEventListener('click', function() { urlInputModal.classList.remove('active'); });
      if(urlConfirm) {
          urlConfirm.addEventListener('click', function() {
          var url = urlInput.value.trim();
          if (!url) {
          if (typeof showToast === 'function') showToast('错误', '链接不能为空', false);
          return;
          }
          // 数据装载
          if (currentSetTarget === 'bg') {
          var chatBgArea = document.getElementById('w-chat-bg');
          if (chatBgArea) chatBgArea.style.backgroundImage = 'url(' + url + ')';
          localStorage.setItem(OKey('bg'), url);
          var bgMenuPanel = document.getElementById('w-bg-menu-panel');
          if(bgMenuPanel) bgMenuPanel.classList.remove('active');
          } else if (currentSetTarget === 'other') {
          document.querySelectorAll('.w-avatar-other').forEach(function(el) { el.style.backgroundImage = 'url(' + url + ')'; });
          localStorage.setItem(OKey('other_avatar'), url);
          } else if (currentSetTarget === 'me') {
          document.querySelectorAll('.w-avatar-me').forEach(function(el) {
          el.style.backgroundImage = 'url(' + url + ')';
          el.style.backgroundColor = 'transparent';
          el.style.border = 'none';
          });
          localStorage.setItem(OKey('me_avatar'), url);
          }
          urlInputModal.classList.remove('active');
          if (typeof showToast === 'function') showToast('成功', '设置成功！', true);
          });
      }
      // --- 重置外壳颜色记忆逻辑 ---
      var resetShellBtn = wrapper.querySelector('#w-reset-shell');
      if (resetShellBtn) {
        resetShellBtn.addEventListener('click', function() {
          localStorage.removeItem(OKey('shell_color'));
          localStorage.removeItem(OKey('custom_shell_hex'));
          // 恢复UI状态为默认(white)
          shellSwitches.forEach(function (b) { b.classList.remove('active'); });
          var defaultShellBtn = wrapper.querySelector('.w-shell-switch[data-color="white"]');
          if (defaultShellBtn) defaultShellBtn.classList.add('active');
          wrapper.classList.remove('w-wrapper-white', 'w-wrapper-gray', 'w-wrapper-blue', 'w-wrapper-custom');
          wrapper.classList.add('w-wrapper-white');
          // 恢复拾色器默认值
          if (customColorPicker) {
          customColorPicker.value = '#ffb6c1';
          applyCustomShellColor('#ffb6c1');
          }
          if (typeof showToast === 'function') showToast('已重置', '外壳颜色记忆已清空并恢复默认', true);
        });
      }
      // --- 重置气泡颜色记忆逻辑 ---
      var resetBubbleBtn = wrapper.querySelector('#w-reset-bubble');
      if (resetBubbleBtn) {
        resetBubbleBtn.addEventListener('click', function() {
          localStorage.removeItem(OKey('other_bubble'));
          localStorage.removeItem(OKey('me_bubble'));
          localStorage.removeItem(OKey('custom_other_hex'));
          localStorage.removeItem(OKey('custom_me_hex'));
          // 恢复按钮激活状态
          bubbleSwitches.forEach(function (b) { b.classList.remove('active'); });
          var defaultOtherBtn = wrapper.querySelector('.w-bubble-switch[data-role="other"][data-color="white"]');
          var defaultMeBtn = wrapper.querySelector('.w-bubble-switch[data-role="me"][data-color="green"]');
          if (defaultOtherBtn) defaultOtherBtn.classList.add('active');
          if (defaultMeBtn) defaultMeBtn.classList.add('active');
          // 恢复拾色器默认值和变量
          var otherPicker = wrapper.querySelector('#w-custom-other-color');
          var mePicker = wrapper.querySelector('#w-custom-me-color');
          if (otherPicker) {
          otherPicker.value = '#ffffff';
          applyCustomBubbleColor('other', '#ffffff');
          var customOtherBtn = wrapper.querySelector('.w-bubble-switch[data-color="custom_other"]');
          if(customOtherBtn) customOtherBtn.style.background = '#ffffff';
          }
          if (mePicker) {
          mePicker.value = '#95ec69';
          applyCustomBubbleColor('me', '#95ec69');
          var customMeBtn = wrapper.querySelector('.w-bubble-switch[data-color="custom_me"]');
          if(customMeBtn) customMeBtn.style.background = '#95ec69';
          }
          if (typeof showToast === 'function') showToast('已重置', '气泡颜色记忆已清空，刷新后生效', true);
        });
      }
      var resBtn = wrapper.querySelector('#w-reset-btn');
      var resMod = wrapper.querySelector('#w-reset-modal');
      var resCancel = wrapper.querySelector('#w-reset-cancel');
      var resConfirm = wrapper.querySelector('#w-reset-confirm');
      
      // 新增：提取彻底清空弹窗元素
      var clearBtn = wrapper.querySelector('#w-clear-all-btn');
      var clearMod = document.getElementById('w-clear-all-modal');
      var clearCancel = document.getElementById('w-clear-all-cancel');
      var clearConfirm = document.getElementById('w-clear-all-confirm');

      if (resBtn && resMod) {
        resBtn.addEventListener('click', function () { resMod.classList.add('active'); });
        resCancel.addEventListener('click', function () { resMod.classList.remove('active'); });
        resConfirm.addEventListener('click', function () {
          // 还原：只清理壁纸和头像记忆
          localStorage.removeItem(OKey('bg'));
          localStorage.removeItem(OKey('other_avatar'));
          localStorage.removeItem(OKey('me_avatar'));

          // 恢复初始UI状态
          bg.style.backgroundImage = "url('https://picx.zhimg.com/80/v2-eb4784a259dcf98a5738fe8ff949ccc4_720w.webp?source=d16d100b')";
          var allOther = wrapper.querySelectorAll('.w-avatar-other');
          allOther.forEach(function (av) {
          av.style.backgroundImage = "url('https://picx.zhimg.com/80/v2-805987a6e3a3336129583c5d060ef7c2_720w.webp?source=d16d100b')";
          });
          var allMe = wrapper.querySelectorAll('.w-avatar-me');
          allMe.forEach(function (av) {
          av.style.backgroundImage = "url('https://picx.zhimg.com/80/v2-260de89b17e9a0eb3232118a10480302_720w.webp?source=d16d100b')";
          av.style.backgroundColor = "transparent";
          av.style.border = "none";
          });
          resMod.classList.remove('active');
          wrapper.querySelector('#w-settings-panel').classList.remove('active');
          showToast('已清理', '缓存图片及头像已恢复初始状态');
        });
      }

      // 新增：彻底清空逻辑
      if (clearBtn && clearMod) {
        clearBtn.addEventListener('click', function () { clearMod.classList.add('active'); });
        clearCancel.addEventListener('click', function () { clearMod.classList.remove('active'); });
        clearConfirm.addEventListener('click', function () {
          var prefix = 'w_os_' + roleId + '_' + wPageId;
          var keysToRemove = [];
          for (var i = 0; i < localStorage.length; i++) {
          if (localStorage.key(i).startsWith(prefix)) {
          keysToRemove.push(localStorage.key(i));
          }
          }
          keysToRemove.forEach(function(k) { localStorage.removeItem(k); });
          clearMod.classList.remove('active');
          showToast('格式化成功', '所有数据已彻底清除，页面即将刷新', true);
          setTimeout(function() { window.location.reload(); }, 1500); // 暴力刷新，确保页面回归白纸状态
        });
      }
      if (bg) {
        bg.addEventListener('click', function (e) {
          if (e.target.closest('.w-video-box')) { triggerParentInput('$User拨打视频通话：'); return; }
          if (e.target.closest('.w-voice-trigger')) { triggerParentInput('$User拨打语音通话：'); return; }
          var bubble = e.target.closest('.w-bubble');
          if (bubble) {
            var isVoice = bubble.matches('[class*="voice"], [id*="voice"], [class*="audio"], [id*="audio"], [class*="sound"], [class*="record"]') ||
              bubble.querySelector('[class*="voice"], [id*="voice"], [class*="audio"], [id*="audio"], [class*="sound"], [class*="record"]');
            if (isVoice) { return; }
            var msgContainer = bubble.parentElement;
            if (msgContainer) {
              var hasExclamation = msgContainer.matches('[class*="error"], [class*="fail"], [class*="warn"], [class*="alert"]') ||
                msgContainer.querySelector('[class*="error"], [class*="fail"], [class*="warn"], [class*="alert"]');
              if (hasExclamation) { return; }
            }
            if (bubble.closest('.w-hb-bubble') || bubble.closest('.w-hb-self-bubble') ||
              bubble.closest('.w-tf-bubble') || bubble.closest('.w-tf-result-bubble') ||
              bubble.classList.contains('w-bubble-card')) { return; }
            var quoteText = "";
            var quoteBox = bubble.querySelector('.w-quote-box');
            if (quoteBox) {
              var cloneBubble = bubble.cloneNode(true);
              var cloneQuote = cloneBubble.querySelector('.w-quote-box');
              if (cloneQuote) { cloneQuote.remove(); }
              quoteText = cloneBubble.innerText.trim();
            } else {
              quoteText = bubble.innerText.trim();
            }
            if (quoteText) { triggerParentInput('User引用消息"' + quoteText + '"，并回复：'); }
          }
        });
      }
    })();
    (function () {
      const chatArea = document.getElementById('w-chat-bg');
      if (!chatArea) return;
      const template = document.querySelector('.seb-chat-data');
      if (!template) return;
      let rawXml = template.innerHTML.trim();
      if (!rawXml) return;
      const content = rawXml;
      while (chatArea.firstChild) chatArea.removeChild(chatArea.firstChild);
      const parsedName = content.match(/<n>(.*?)<\/n>/)?.[1] || 'Seb';
      const roleId = parsedName || 'default';
      let wPageId = 'idx';
      try { wPageId = window.parent.location.href.replace(/[^a-zA-Z0-9]/g, '_'); } catch(e) {}
      const OKey = function (k) { return 'w_os_' + roleId + '_' + wPageId + '_' + k; };
      const savedName = localStorage.getItem(OKey('target_remark'));
      const nameEl = document.getElementById('w-target-name');
      const statusEl = document.getElementById('w-status-text');
      if (nameEl) {
        nameEl.textContent = savedName ? savedName : parsedName;
        nameEl.style.cssText = "cursor: pointer; position: relative; z-index: 99; pointer-events: auto;";
        nameEl.onclick = function () {
          const currentName = this.textContent;
          const newName = window.parent.prompt('修改备注（留空则恢复默认）：', currentName);
          if (newName !== null) {
            const trimmedName = newName.trim();
            if (trimmedName !== '') {
              this.textContent = trimmedName;
              localStorage.setItem(OKey('target_remark'), trimmedName);
            } else {
              this.textContent = parsedName;
              localStorage.removeItem(OKey('target_remark'));
            }
          }
        };
      }
      const status = content.match(/<st>(.*?)<\/st>/)?.[1] || '在线';
      if (statusEl) statusEl.textContent = status;
      const lines = content.split('\n').map(l => l.trim()).filter(Boolean);

      function escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
      }
      lines.forEach(line => {
        if (line.startsWith('<sys>')) {
          const sysText = line.replace(/<\/?sys>/g, '');
          const div = document.createElement('div');
          div.className = 'w-sys-msg';
          div.innerHTML = sysText;
          chatArea.appendChild(div);
          return;
        }
        const tagMatch = line.match(/<([lr])_([a-z]+)>(.*?)<\/\1_\2>/);
        if (!tagMatch) return;
        const side = tagMatch[1];
        const type = tagMatch[2];
        const parts = tagMatch[3].split('|');
        const time = parts[0] || '00:00';
        const row = document.createElement('div');
        row.className = `w-row w-row-${side === 'l' ? 'left' : 'right'}`;
        const avatar = document.createElement('div');
        avatar.className = `w-avatar ${side === 'l' ? 'w-avatar-other' : 'w-avatar-me'}`;
        row.appendChild(avatar);
        const msgBox = document.createElement('div');
        msgBox.className = 'w-msg-box';
        let contentHtml = '';
        let extraAttrs = {};
        const savedOtherColor = localStorage.getItem(OKey('other_bubble')) || 'white';
        const savedMeColor = localStorage.getItem(OKey('me_bubble')) || 'green';
        const defaultBubbleCls = side === 'l' ? ('w-bubble-' + savedOtherColor) : ('w-bubble-' + savedMeColor);
        switch (type) {
          case 't': {
            const text = parts[1] || '';
            const bubbleCls = defaultBubbleCls;
            contentHtml = `<div class="w-bubble ${bubbleCls}">${escapeHtml(text)}</div>`;
            break;
          }
          case 'i': {
            const src = parts[1] || 'https://pic.imgdb.cn/item/default.jpg';
            contentHtml = `<img src="${src}" class="w-msg-img">`;
            break;
          }
          case 'imgt': {
            const fullText = parts[2] || parts[1] || '[图片]';
            const preview = fullText;
            contentHtml = `
            <div class="w-bubble-wrap">
              <div class="w-fake-img-container" onclick="showFakeImgFull(this, '${side}')">
                <div class="w-img-thumb">
                  <svg class="w-img-thumb-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="8" width="18" height="12" rx="2"/>
                    <path d="M16 8v-2a2 2 0 0 0-2-2H10a2 2 0 0 0-2 2v2"/>
                    <circle cx="12" cy="14" r="3"/>
                  </svg>
                  <div class="w-img-thumb-text">${escapeHtml(preview)}</div>
                  <div class="w-img-thumb-hint">点击查看大图</div>
                </div>
                <div style="display:none;" class="w-fake-full-text">${escapeHtml(fullText)}</div>
              </div>
            </div>
            `;
            break;
          }
          case 'bqb': {
            const key = parts[1] || '表情包1';
            const imgUrl = bqbMap[key] || bqbMap['表情包1'];
            contentHtml = `<img src="${imgUrl}" class="w-bqb-img">`;
            break;
          }
          case 'v': {
            const duration = parts[1] || '5';
            const transcript = parts[2] || '';
            const bubbleClass = defaultBubbleCls;
            const voiceTextHtml = transcript ? `<div class="w-voice-text">${escapeHtml(transcript)}</div>` : '';
            contentHtml = `
            <div class="w-bubble ${bubbleClass}" onclick="toggleVoiceText(this)">
              <div class="w-voice-box ${side === 'r' ? 'w-voice-right' : ''}">
                <svg class="w-voice-icon" viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="2">
                  <path d="M12 5v14M8 9v6M16 7v10M4 11v2M20 10v4"/>
                </svg>
                <span class="w-voice-sec">${duration}"</span>
                ${side === 'l' ? '<div class="w-voice-dot"></div>' : ''}
              </div>
              ${voiceTextHtml}
            </div>
            `;
            break;
          }
          case 'vd': {
            const statusText = parts[1] || '通话时长 00:00';
            const bubbleClass = defaultBubbleCls;
            const missed = statusText.includes('取消') || statusText.includes('未应答') ? 'w-voice-missed' : '';
            contentHtml = `
            <div class="w-bubble ${bubbleClass} ${missed}">
              <div class="w-video-box ${side === 'r' ? 'w-video-right' : ''}" style="cursor:pointer;">
                <svg class="w-video-call-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width: 16px; height: 16px; flex-shrink: 0;">
                  <polygon points="23 7 16 12 23 17 23 7"/>
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                </svg>
                <span>${escapeHtml(statusText)}</span>
              </div>
            </div>
            `;
            break;
          }
          case 'vc': {
            const statusText = parts[1] || '通话时长 00:00';
            const bubbleClass = defaultBubbleCls;
            const missed = statusText.includes('取消') || statusText.includes('未应答') ? 'w-voice-missed' : '';
            const rightAlign = side === 'r' ? 'w-voice-call-right' : '';
            contentHtml = `
            <div class="w-bubble-wrap">
              <div class="w-bubble ${bubbleClass} w-voice-trigger ${missed} ${rightAlign}">
                <svg class="w-voice-call-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width: 16px; height: 16px; transform: rotate(135deg); flex-shrink: 0;">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span>${escapeHtml(statusText)}</span>
              </div>
            </div>
            `;
            break;
          }
          case 'hb': {
            const amount = parts[1] || '0.00';
            const desc = parts[2] || '恭喜发财';
            const state = parts[3] || '未领取';
            const opened = state.includes('已') ? 'w-bubble-opened' : '';
            const sideCls = side === 'l' ? 'w-bubble-orange-left' : 'w-bubble-orange-right';
            const bubbleCls = side === 'l' ? 'w-hb-bubble' : 'w-hb-self-bubble';
            extraAttrs = { 'data-amt': amount, 'data-desc': desc, 'data-opened': state.includes('已') ? 'true' : 'false' };
            contentHtml = `
            <div class="w-bubble w-bubble-orange ${sideCls} ${opened} ${bubbleCls}" data-amt="${amount}" data-desc="${desc}" data-opened="${state.includes('已') ? 'true' : 'false'}">
              <div class="w-orange-top">
                <div class="w-orange-icon">
                  <svg width="28" height="34" viewBox="0 0 24 30" fill="#f4ca99">
                    <path d="M4 2h16a2 2 0 0 1 2 2v22a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/>
                    <path d="M2 10s4 4 10 4 10-4 10-4" stroke="#f28b22" stroke-width="2" fill="none"/>
                    <circle cx="12" cy="14" r="3" fill="#f28b22"/>
                  </svg>
                </div>
                <div class="w-orange-info">
                  <div class="w-orange-title w-hb-title-text">${escapeHtml(desc)}</div>
                  <div class="w-orange-sub w-hb-sub-text">${escapeHtml(state)}</div>
                </div>
              </div>
              <div class="w-orange-bot">微信红包</div>
            </div>
            `;
            break;
          }
          case 'tf': {
            const amount = parts[1] || '0.00';
            let statusText = parts[2];
            if (!statusText) { statusText = side === 'l' ? '转账给你' : '转账给 ' + (document.getElementById('w-target-name')?.textContent || '对方'); }
            const sideCls = side === 'l' ? 'w-bubble-orange-left' : 'w-bubble-orange-right';
            const isReceived = statusText.includes('已收款') || statusText.includes('已被接收');
            const isReturned = statusText.includes('已退还') || statusText.includes('已被退还');
            const isOpened = isReceived || isReturned ? 'w-bubble-opened' : '';
            const iconHtml = isReceived ? `<svg class="tf-icon-success" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>` : isReturned ? `<svg class="tf-icon-normal" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 10h10M17 10l-3-3M17 14H7M7 14l3 3"/><circle cx="12" cy="12" r="10" stroke-opacity="0.3"/></svg>` : `<svg class="tf-icon-normal" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 10h10M17 10l-3-3M17 14H7M7 14l3 3"/><circle cx="12" cy="12" r="10" stroke-opacity="0.3"/></svg>`;
            extraAttrs = { 'data-amt': amount, 'data-action': side === 'l' ? 'recv' : 'send', 'data-status': isReceived ? 'received' : (isReturned ? 'returned' : 'pending'), 'data-target': statusText.includes('转账给') ? statusText.replace('转账给', '').trim() : '' };
            contentHtml = `
            <div class="w-bubble w-bubble-orange ${sideCls} ${isOpened} w-tf-bubble" data-amt="${amount}" data-action="${extraAttrs['data-action']}" data-status="${extraAttrs['data-status']}" data-target="${extraAttrs['data-target'] || ''}">
              <div class="w-orange-top">
                <div class="w-orange-icon">${iconHtml}</div>
                <div class="w-orange-info">
                  <div class="w-orange-title">¥${escapeHtml(amount)}</div>
                  <div class="w-orange-sub tf-status-text">${escapeHtml(statusText)}</div>
                </div>
              </div>
              <div class="w-orange-bot">微信转账</div>
            </div>
            `;
            break;
          }
          case 'tfr': {
            const amount = parts[1] || '0.00';
            const status = parts[2] || '已收款';
            const isReceived = status === '已收款';
            const isReturned = status === '已退还';
            let desc = '';
            let dataStatus = '';
            let dataRole = '';
            if (isReceived) { dataStatus = 'received'; if (side === 'l') { dataRole = 'other';
                desc = '对方已收款，资金已存入对方零钱'; } else { dataRole = 'me';
                desc = '你已收款，资金已存入零钱'; } } else if (isReturned) { dataStatus = 'returned'; if (side === 'l') { dataRole = 'other';
                desc = '对方已退还'; } else { dataRole = 'me';
                desc = '你已退还'; } } else { dataStatus = 'received';
              dataRole = side === 'l' ? 'other' : 'me';
              desc = side === 'l' ? '对方已收款，资金已存入对方零钱' : '你已收款，资金已存入零钱'; }
            const iconHtml = isReceived ? `<svg class="tf-icon-success" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>` : (isReturned ? `<svg class="tf-icon-returned" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 14l-4-4 4-4"/><path stroke-linecap="round" stroke-linejoin="round" d="M5 10h11a4 4 0 1 1 0 8h-1"/></svg>` : `<svg class="tf-icon-normal" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 10h10M17 10l-3-3M17 14H7M7 14l3 3"/><circle cx="12" cy="12" r="10" stroke-opacity="0.3"/></svg>`);
            const sideCls = side === 'l' ? 'w-bubble-orange-left' : 'w-bubble-orange-right';
            contentHtml = `
            <div class="w-bubble w-bubble-orange ${sideCls} w-bubble-opened w-tf-bubble" data-amt="${amount}" data-action="readonly" data-status="${dataStatus}" data-role="${dataRole}" style="cursor:pointer;">
              <div class="w-orange-top">
                <div class="w-orange-icon">${iconHtml}</div>
                <div class="w-orange-info">
                  <div class="w-orange-title">¥${escapeHtml(amount)}</div>
                  <div class="w-orange-sub tf-status-text">${escapeHtml(status)}</div>
                </div>
              </div>
              <div class="w-orange-bot">${escapeHtml(desc)}</div>
            </div>
            `;
            break;
          }
          case 'loc': {
            const title = parts[1] || '未知地点';
            const address = parts[2] || '';
            contentHtml = `
            <div class="w-bubble w-bubble-white w-bubble-card w-card-width w-msg-clickable" data-msg-type="loc" style="padding:0;">
              <div class="w-loc-info">
                <div class="w-loc-title" style="font-size:12px; line-height:1.3;">${escapeHtml(title)}</div>
                <div class="w-loc-sub" style="font-size:10px; line-height:1.2; margin-top:2px;">${escapeHtml(address)}</div>
              </div>
              <div class="w-loc-map" style="height:55px;">
                <svg class="w-loc-pin" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/>
                </svg>
              </div>
            </div>`;
            break;
          }
case 'cd': {
    const nameCard = parts[1] || '联系人';
    const wechatId = parts[2] || '微信号';
    const avatarLink = isValidImageUrl(parts[3]) ? parts[3] : DEFAULT_CD_AVATAR;
    contentHtml = `
        <div class="w-bubble w-bubble-white w-bubble-card w-card-width" style="padding:0;">
            <div class="w-card-top">
                <img class="w-card-avatar" src="${escapeHtml(avatarLink)}"
                     onerror="this.onerror=null;this.src='${DEFAULT_CD_AVATAR}';"
                     style="width:32px;height:32px;border-radius:4px;object-fit:cover;flex-shrink:0;">
                <div class="w-card-info">
                    <div class="w-card-name">${escapeHtml(nameCard)}</div>
                    <div class="w-card-id">${escapeHtml(wechatId)}</div>
                </div>
            </div>
            <div class="w-card-bot">个人名片</div>
        </div>`;
    break;
}
case 'lnk': {
    const titleLink = parts[1] || '标题';
    const descLink = parts[2] || '描述';
    const thumbLink = isValidImageUrl(parts[3]) ? parts[3] : DEFAULT_LNK_THUMB;
    contentHtml = `
        <div class="w-bubble w-bubble-white w-bubble-card w-msg-clickable" data-msg-type="link" style="max-width:215px;width:100%;">
            <div class="w-link-title">${escapeHtml(titleLink)}</div>
            <div class="w-link-main">
                <div class="w-link-desc">${escapeHtml(descLink)}</div>
                <img src="${escapeHtml(thumbLink)}" class="w-link-thumb"
                     onerror="this.onerror=null;this.src='${DEFAULT_LNK_THUMB}';">
            </div>
        </div>`;
    break;
}
          case 'f': {
            const fileName = parts[1] || '未知文件';
            const fileSize = parts[2] || '0 KB';
            const ext = fileName.includes('.') ? fileName.split('.').pop().toLowerCase() : '';
            const getFileSvg = (bgColor, foldColor, text) => `<svg class="w-file-icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:42px;height:42px;flex-shrink:0;"><path d="M9 4C9 2.89543 9.89543 2 11 2H29L41 14V44C41 45.1046 40.1046 46 39 46H11C9.89543 46 9 45.1046 9 44V4Z" fill="${bgColor}"/><path d="M29 2L41 14H31C29.8954 14 29 13.1046 29 12V2Z" fill="${foldColor}"/><rect x="13" y="24" width="22" height="12" rx="2" fill="white" fill-opacity="0.2"/><text x="24" y="33" fill="white" font-size="9" font-family="Arial, Helvetica, sans-serif" font-weight="900" text-anchor="middle" letter-spacing="1">${text}</text><rect x="14" y="16" width="10" height="3" rx="1.5" fill="white" fill-opacity="0.5"/><rect x="14" y="20" width="6" height="3" rx="1.5" fill="white" fill-opacity="0.5"/></svg>`;
            const zipSvg = `<svg class="w-file-icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:42px;height:42px;flex-shrink:0;"><path d="M9 4C9 2.89543 9.89543 2 11 2H29L41 14V44C41 45.1046 40.1046 46 39 46H11C9.89543 46 9 45.1046 9 44V4Z" fill="#FFC107"/><path d="M29 2L41 14H31C29.8954 14 29 13.1046 29 12V2Z" fill="#FFE082"/><path d="M21 2V12M27 2V12M24 5V15M24 18V22H21V28H27V22H24" stroke="#D4A000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><text x="24" y="37" fill="white" font-size="10" font-family="Arial, Helvetica, sans-serif" font-weight="900" text-anchor="middle" letter-spacing="1" style="text-shadow: 0px 1px 2px rgba(0,0,0,0.2);">ZIP</text></svg>`;
            const getMediaSvg = (bgColor, iconPath, text) => `<svg class="w-file-icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:42px;height:42px;flex-shrink:0;"><rect x="4" y="4" width="40" height="40" rx="10" fill="${bgColor}"/><circle cx="24" cy="21" r="12" fill="white" fill-opacity="0.15"/><path d="${iconPath}" fill="white"/><text x="24" y="41" fill="white" font-size="8" font-family="Arial, Helvetica, sans-serif" font-weight="900" text-anchor="middle" letter-spacing="1">${text}</text></svg>`;
            const audioPath = "M25 12V23C24.2 22.4 23.2 22 22 22C19.8 22 18 23.8 18 26C18 28.2 19.8 30 22 30C24.5 30 26 28 26 25V15C28 17 30 19 31 22C31 19 29 14 25 12Z";
            const videoPath = "M19 13L32 21L19 29V13Z";
            let iconHtml = '';
            if (ext.includes('pdf')) { iconHtml = getFileSvg('#E53935', '#FFCDD2', 'PDF'); } else if (ext.includes('xls') || ext.includes('csv')) { iconHtml = getFileSvg('#43A047', '#C8E6C9', 'XLS'); } else if (ext.includes('ppt')) { iconHtml = getFileSvg('#FB8C00', '#FFE0B2', 'PPT'); } else if (ext.includes('zip') || ext.includes('rar') || ext.includes('7z')) { iconHtml = zipSvg; } else if (ext.includes('txt') || ext.includes('md') || ext.includes('json')) { iconHtml = getFileSvg('#757575', '#E0E0E0', 'TXT'); } else if (ext.includes('doc') || ext.includes('wps')) { iconHtml = getFileSvg('#1E88E5', '#BBDEFB', 'DOC'); } else if (ext.includes('mp3') || ext.includes('wav') || ext.includes('flac')) { iconHtml = getMediaSvg('#9C27B0', audioPath, 'AUDIO'); } else if (ext.includes('mp4') || ext.includes('avi') || ext.includes('mov') || ext.includes('mkv')) { iconHtml = getMediaSvg('#E91E63', videoPath, 'VIDEO'); } else { iconHtml = getFileSvg('#607D8B', '#CFD8DC', 'FILE'); }
            contentHtml = `
            <div class="w-bubble w-bubble-white w-bubble-card w-msg-clickable" data-msg-type="file" style="max-width:230px; width:100%;">
              <div class="w-file-main" style="align-items: center; gap: 12px;">
                <div class="w-file-info" style="flex: 1; overflow: hidden;">
                  <div class="w-file-name" style="font-weight: 500; color: #333; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${escapeHtml(fileName)}</div>
                  <div class="w-file-size" style="font-size: 11px; color: #888; margin-top: 2px;">${escapeHtml(fileSize)}</div>
                </div>
                ${iconHtml}
              </div>
            </div>
            `;
            break;
          }
          case 'q': {
            const replyText = parts[1] || '';
            const bubbleClass = defaultBubbleCls;
            const quotedText = parts[2] || '';
            contentHtml = `
            <div class="w-bubble-wrap">
              <div class="w-bubble ${bubbleClass}" style="cursor:pointer;">
                <div>${escapeHtml(replyText)}</div>
                <div class="w-quote-box">${escapeHtml(quotedText)}</div>
              </div>
            </div>
            `;
            break;
          }
          case 'rec': {
          let who = parts[1] || '对方';
          if (side === 'l') {
          const nameEl = document.getElementById('w-target-name');
          who = nameEl ? nameEl.textContent : who;
          } else {
          who = '你';
          }
          // 核心修复：使用 slice 和 join，防止 original 内部嵌套的 '|' 被错误切碎
          const original = parts.slice(2).join('|') || '';
          const sideClass = side === 'l' ? 'left' : 'right';
          const details = document.createElement('details');
          details.className = 'w-recall-details';
          const summary = document.createElement('summary');
          summary.innerHTML = `<div class="w-sys-msg">"${escapeHtml(who)}" 撤回了一条消息 <span class="w-link-text">查看</span></div>`;
          details.appendChild(summary);
          const ghostRow = document.createElement('div');
          ghostRow.className = `w-row w-row-${sideClass} w-recall-ghost`;
          const ghostAvatar = document.createElement('div');
          ghostAvatar.className = `w-avatar w-avatar-${side === 'l' ? 'other' : 'me'}`;
          ghostRow.appendChild(ghostAvatar);
          const ghostMsgBox = document.createElement('div');
          ghostMsgBox.className = 'w-msg-box';
          
          const ghostBubble = document.createElement('div');
          ghostBubble.className = 'w-bubble-wrap';
          
          let displayHtml = '';
          const innerMatch = original.match(/<([lr])_([a-z]+)>(.*?)<\/\1_\2>/);
          
          if (innerMatch) {
          const iSide = innerMatch[1];
          const iType = innerMatch[2];
        let innerRawContent = innerMatch[3];
        // 检测是否以时间格式（如 10:00| 或 10:24:33|）开头
        if (!/^\d{1,2}:\d{2}(:\d{2})?\|/.test(innerRawContent)) {
          // 如果没有带时间，在前面补一个虚拟时间，以对齐后续的数组索引
          innerRawContent = '00:00|' + innerRawContent;
        }
        const iParts = innerRawContent.split('|');
          const iBubbleCls = iSide === 'l' ? ('w-bubble-' + savedOtherColor) : ('w-bubble-' + savedMeColor);
          
          // 局部视觉重构器：专门负责渲染撤回状态下的幽灵卡片
          switch(iType) {
          case 't': displayHtml = `<div class="w-bubble ${iBubbleCls}">${escapeHtml(iParts[1] || '')}</div>`; break;
          case 'bqb': displayHtml = `<img src="${bqbMap[iParts[1] || '表情包1'] || bqbMap['表情包1']}" class="w-bqb-img">`; break;
          case 'i': displayHtml = `<img src="${escapeHtml(iParts[1] || '')}" class="w-msg-img">`; break;
          case 'imgt': 
          displayHtml = `<div class="w-fake-img-container" style="height:auto; min-height:100px; padding:6px;"><div class="w-img-thumb" style="height:auto; position:relative; display:flex; flex-direction:column; padding:10px;"><svg class="w-img-thumb-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="position:static; margin-bottom:8px;"><rect x="3" y="8" width="18" height="12" rx="2"/><path d="M16 8v-2a2 2 0 0 0-2-2H10a2 2 0 0 0-2 2v2"/><circle cx="12" cy="14" r="3"/></svg><div class="w-img-thumb-text" style="position:static; white-space:pre-wrap; word-break:break-word; overflow:visible; max-height:none; display:block; -webkit-line-clamp:unset; text-align:left; line-height:1.4; padding:0; color:#555; width:100%;">${escapeHtml(iParts[2] || iParts[1] || '[图片]')}</div><div class="w-img-thumb-hint" style="position:static; margin-top:8px;">已撤回</div></div></div>`; 
          break;
          case 'v': displayHtml = '<div class="w-bubble ' + iBubbleCls + '"><div class="w-voice-box ' + (iSide === 'r' ? 'w-voice-right' : '') + '"><svg class="w-voice-icon" viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="2"><path d="M12 5v14M8 9v6M16 7v10M4 11v2M20 10v4"/></svg><span class="w-voice-sec">' + escapeHtml(iParts[1] || '0') + '"</span></div>' + (iParts[2] ? '<div class="w-voice-text" style="display:block; border-top: 1px solid rgba(0,0,0,0.1);">' + escapeHtml(iParts[2]) + '</div>' : '') + '</div>'; break;
          case 'lnk': displayHtml = `<div class="w-bubble w-bubble-white w-bubble-card" style="max-width:215px; width:100%;"><div class="w-link-title">${escapeHtml(iParts[1] || '链接')}</div><div class="w-link-main" style="display:flex; justify-content:space-between; align-items:center; margin-top:4px;"><div class="w-link-desc" style="font-size:11px; color:#999; line-height:1.3; flex:1; padding-right:8px; overflow:hidden; text-overflow:ellipsis; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical;">${escapeHtml(iParts[2] || '描述')}</div><img class="w-link-icon" src="${escapeHtml(iParts[3] || 'https://img0.baidu.com/it/u=3997181045,3946027856&fm=253&fmt=auto&app=138&f=JPEG?w=300&h=300')}" style="width:40px; height:40px; object-fit:cover; flex-shrink:0;"></div></div>`; break;
          case 'q': displayHtml = `<div class="w-bubble ${iBubbleCls}"><div>${escapeHtml(iParts[1] || '')}</div><div class="w-quote-box">${escapeHtml(iParts[2] || '')}</div></div>`; break;
          case 'cd': displayHtml = `<div class="w-bubble w-bubble-white w-bubble-card w-card-width" style="padding:0;"><div class="w-card-top"><div class="w-card-avatar" style="background-image:url('${escapeHtml(iParts[3] || '')}');"></div><div class="w-card-info"><div class="w-card-name">${escapeHtml(iParts[1] || '联系人')}</div><div class="w-card-id">${escapeHtml(iParts[2] || '微信号')}</div></div></div><div class="w-card-bot">个人名片</div></div>`; break;
          case 'loc': displayHtml = `<div class="w-bubble w-bubble-white w-bubble-card w-card-width" style="padding:0;"><div class="w-loc-info"><div class="w-loc-title" style="font-size:12px; line-height:1.3;">${escapeHtml(iParts[1] || '未知地点')}</div><div class="w-loc-sub" style="font-size:10px; line-height:1.2; margin-top:2px;">${escapeHtml(iParts[2] || '')}</div></div><div class="w-loc-map" style="height:55px;"><svg class="w-loc-pin" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg></div></div>`; break;
          case 'f': 
          const fName = iParts[1] || '未知文件';
          const fExt = fName.includes('.') ? fName.split('.').pop().toUpperCase() : 'FILE';
          displayHtml = `<div class="w-bubble w-bubble-white w-bubble-card" style="max-width:230px; width:100%;"><div class="w-file-main" style="align-items: center; gap: 12px;"><div class="w-file-info" style="flex: 1; overflow: hidden;"><div class="w-file-name" style="font-weight: 500; color: #333; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${escapeHtml(fName)}</div><div class="w-file-size" style="font-size: 11px; color: #888; margin-top: 2px;">${escapeHtml(iParts[2] || '0 KB')}</div></div><svg class="w-file-icon" viewBox="0 0 48 48" fill="none" style="width:42px;height:42px;flex-shrink:0;"><path d="M9 4C9 2.89543 9.89543 2 11 2H29L41 14V44C41 45.1046 40.1046 46 39 46H11C9.89543 46 9 45.1046 9 44V4Z" fill="#607D8B"/><path d="M29 2L41 14H31C29.8954 14 29 13.1046 29 12V2Z" fill="#CFD8DC"/><text x="24" y="33" fill="white" font-size="9" font-weight="900" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" letter-spacing="1">${escapeHtml(fExt)}</text></svg></div></div>`; 
          break;
          default: displayHtml = `<div class="w-bubble ${iBubbleCls}">[解析折叠]</div>`;
          }
          } else {
          // 降级回退机制：处理纯文本或未被完整捕获的标签
          let fallbackText = original.replace(/表情包(\d+)/g, function (match, num) {
          const imgUrl = bqbMap['表情包' + num];
          if (imgUrl) { return `<img src="${imgUrl}" class="w-bqb-img" style="max-width:90px;height:auto;border-radius:6px;display:block;border:1px solid rgba(0,0,0,0.05);">`; }
          return match;
          });
          displayHtml = `<div class="w-bubble ${defaultBubbleCls}">${fallbackText}</div>`;
          }
          
          ghostBubble.innerHTML = displayHtml;
          ghostMsgBox.appendChild(ghostBubble);
          ghostRow.appendChild(ghostMsgBox);
          details.appendChild(ghostRow);
          chatArea.appendChild(details);
          return;
          }
          case 'err': {
          const errText = parts[1] || '消息未发送';
          const bubbleClass = defaultBubbleCls;
          contentHtml = `
          <div class="w-bubble ${bubbleClass}" style="position:relative; overflow:visible;">
          ${escapeHtml(errText)}
          <svg class="w-error-icon" viewBox="0 0 24 24" style="position:absolute; top:50%; transform:translateY(-50%); ${side === 'l' ? 'left:calc(100% + 8px);' : 'right:calc(100% + 8px);'}">
          <circle cx="12" cy="12" r="10" fill="#fa5151"/>
          <path d="M12 7v6m0 4h.01" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>
          </svg>
          </div>
          `;
          break;
          }
          default:
            contentHtml = `<div class="w-bubble w-bubble-white">[不支持的消息类型]</div>`;
        }
        msgBox.innerHTML = contentHtml;
        Object.keys(extraAttrs).forEach(key => {
          const el = msgBox.querySelector('[data-amt]');
          if (el) el.setAttribute(key, extraAttrs[key]);
        });
        const timeDiv = document.createElement('div');
        timeDiv.className = 'w-time';
        timeDiv.textContent = time;
        msgBox.appendChild(timeDiv);
        row.appendChild(msgBox);
        chatArea.appendChild(row);
      });
      chatArea.scrollTop = chatArea.scrollHeight;
      var bgStored = localStorage.getItem(OKey('bg'));
      if (bgStored) chatArea.style.backgroundImage = 'url(' + bgStored + ')';
      var otherStored = localStorage.getItem(OKey('other_avatar'));
      if (otherStored) { document.querySelectorAll('.w-avatar-other').forEach(function (el) { el.style.backgroundImage = 'url(' + otherStored + ')'; }); }
      var meStored = localStorage.getItem(OKey('me_avatar'));
      if (meStored) { document.querySelectorAll('.w-avatar-me').forEach(function (el) { el.style.backgroundImage = 'url(' + meStored + ')';
          el.style.backgroundColor = 'transparent';
          el.style.border = 'none'; }); }
      var bgMenuPanel = document.getElementById('w-bg-menu-panel');
      var bgPresetPanel = document.getElementById('w-bg-preset-panel');
      var btnOpenBgMenu = document.getElementById('w-btn-open-bg-menu');
      var bgMenuBack = document.getElementById('w-bg-menu-back');
      var btnOpenPreset = document.getElementById('w-btn-open-preset');
      var bgPresetBack = document.getElementById('w-bg-preset-back');
      var chatBgArea = document.getElementById('w-chat-bg');
      var mainSettingsPanel = document.getElementById('w-settings-panel');
      if (btnOpenBgMenu && bgMenuPanel) { btnOpenBgMenu.addEventListener('click', function () { bgMenuPanel.classList.add('active'); }); }
      if (bgMenuBack) { bgMenuBack.addEventListener('click', function () { bgMenuPanel.classList.remove('active'); }); }
      if (btnOpenPreset && bgPresetPanel) { btnOpenPreset.addEventListener('click', function () { bgPresetPanel.classList.add('active'); }); }
      if (bgPresetBack) { bgPresetBack.addEventListener('click', function () { bgPresetPanel.classList.remove('active'); }); }
      var presetItems = document.querySelectorAll('.w-preset-item');
      presetItems.forEach(function (item) {
        item.addEventListener('click', function () {
          var imgSrc = this.getAttribute('data-src');
          if (imgSrc && chatBgArea) {
            chatBgArea.style.backgroundImage = 'url(' + imgSrc + ')';
            localStorage.setItem(OKey('bg'), imgSrc);
            if (typeof showToast === 'function') { showToast('成功', '背景已更换完毕', true); }
            bgPresetPanel.classList.remove('active');
            bgMenuPanel.classList.remove('active');
            if (mainSettingsPanel) mainSettingsPanel.classList.remove('active');
          }
        });
      });
})();
// ========== 自定义表情独立安全模块 ==========
(function() {
    // 1. 获取所有手机容器（兼容 ID 和 Class 查询，防止单一查询失效）
    var allWrappers = document.querySelectorAll('#w-dynamic-wrapper, .w-wrapper');
    var wrapper = null;
    
    // 2. 倒序排查，精准锁定最新生成且“未被初始化”的那一个
    for(var i = allWrappers.length - 1; i >= 0; i--) {
        if(allWrappers[i].dataset.emojiInited !== 'true') {
          wrapper = allWrappers[i];
          wrapper.dataset.emojiInited = 'true'; // 打上专属防重标记
          break;
        }
    }
    
    // 如果没有找到需要初始化的新手机，直接终止，保护旧手机状态
    if(!wrapper) return; 
    
    // 3. 强制在“当前锁定的这个新手机内部”去提取名字数据，彻底切断与旧手机的联系
    var rawTpl = wrapper.querySelector('.seb-chat-data');
    if(!rawTpl) {
        // 兜底方案：如果内部没找到，再去抓取全局最新的那一个
        var rawTpls = document.querySelectorAll('.seb-chat-data');
        rawTpl = rawTpls.length > 0 ? rawTpls[rawTpls.length - 1] : null;
    }
    var roleId = rawTpl ? (rawTpl.innerHTML.match(/<n>(.*?)<\/n>/)?.[1] || 'default') : 'default';
    var wPageId = 'idx';
    try { wPageId = window.parent.location.href.replace(/[^a-zA-Z0-9]/g, '_'); } catch(e) {}
    var OKey = function (key) { return 'w_os_' + roleId + '_' + wPageId + '_' + key; };

    var eGrid = wrapper.querySelector('.w-emoji-grid');
    var ePanel = wrapper.querySelector('#w-emoji-panel');
    var ceModal = document.getElementById('w-ce-modal');
    var ceUrlInput = document.getElementById('w-ce-url');
    var ceDescInput = document.getElementById('w-ce-desc');
    var cePreview = document.getElementById('w-ce-preview-box');
    var btnCeCancel = document.getElementById('w-ce-cancel');
    var btnCeConfirm = document.getElementById('w-ce-confirm');
    
    var isEditing = false;

    function triggerInput(text) {
        try {
          var pd = window.parent.document;
          var ta = pd.querySelector('textarea.flex.rounded-xl.border.border-input') || pd.querySelector('textarea');
          if (ta) {
          var setter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value").set;
          var cur = ta.value || '';
          setter.call(ta, cur + (cur && !cur.endsWith('\n') ? '\n' : '') + text);
          ta.dispatchEvent(new Event('input', { bubbles: true }));
          ta.focus();
          }
        } catch (e) {}
    }

    function renderEmojis() {
        if (!eGrid) return;
        eGrid.querySelectorAll('.w-emoji-custom, .w-emoji-btn-item').forEach(function(el){ el.remove(); });  
        var customEmojis = [];
        try { 
          var parsed = JSON.parse(localStorage.getItem(OKey('custom_emojis')) || '[]'); 
          if (Array.isArray(parsed)) { customEmojis = parsed; } 
          else { localStorage.removeItem(OKey('custom_emojis')); } // 格式损坏则自动强删
        } catch(e) { localStorage.removeItem(OKey('custom_emojis')); }
        
        customEmojis.forEach(function(ce, index) {
          var el = document.createElement('div');
          el.className = 'w-emoji-item w-emoji-custom';
          if(isEditing) el.classList.add('editing');
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

        if(customEmojis.length > 0) {
          var manageBtn = document.createElement('div');
          manageBtn.className = 'w-emoji-item w-emoji-btn-item w-ce-manage-btn ' + (isEditing ? 'active' : '');
          manageBtn.id = 'w-ce-manage-btn';
          manageBtn.innerHTML = isEditing 
          ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>完成'
          : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>管理';
          eGrid.appendChild(manageBtn);

          var clearBtn = document.createElement('div');
          clearBtn.className = 'w-emoji-item w-emoji-btn-item';
          clearBtn.id = 'w-ce-clear-btn';
          clearBtn.style.borderColor = '#ff3b30';
          clearBtn.style.color = '#ff3b30';
          clearBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>清空';
          eGrid.appendChild(clearBtn);
        } else {
          isEditing = false;
        }
    }

    renderEmojis();

    if (eGrid) {
        eGrid.addEventListener('click', function(e) {
          if (e.target.closest('#w-ce-add-btn')) {
          ceUrlInput.value = '';
          ceDescInput.value = '';
          cePreview.style.backgroundImage = 'none';
          cePreview.innerHTML = '无预览';
          ceModal.classList.add('active');
          return;
          }
          if (e.target.closest('#w-ce-manage-btn')) {
          isEditing = !isEditing;
          renderEmojis();
          return;
          }
          if (e.target.closest('#w-ce-clear-btn')) {
          var doClear = false;
          try { doClear = window.parent.confirm('确认清空所有自定义表情吗？'); } 
          catch(err) { doClear = true; } // 如果沙箱严格拦截，则默认允许清空
          if (doClear) {
          localStorage.removeItem(OKey('custom_emojis'));
          isEditing = false;
          renderEmojis();
          if (typeof showToast === 'function') showToast('已清空', '自定义表情已全部清除', true);
          }
          return;
          }
          var item = e.target.closest('.w-emoji-custom');
          if (item) {
          if (isEditing) {
          e.preventDefault();
          e.stopPropagation();
          var idx = parseInt(item.getAttribute('data-idx'), 10);
          if (!isNaN(idx)) {
          // 已彻底移除导致卡死的弹窗拦截，点击红叉直接删除
          var customEmojis = JSON.parse(localStorage.getItem(OKey('custom_emojis')) || '[]');
          customEmojis.splice(idx, 1);
          localStorage.setItem(OKey('custom_emojis'), JSON.stringify(customEmojis));
          renderEmojis();
          if (typeof showToast === 'function') showToast('已删除', '该表情已移除', true);
          }
          } else {
          var d = item.getAttribute('data-desc') || '表情';
          var url = item.getAttribute('data-url');
          triggerInput('发送网址图：' + d + '（' + url + '）');
          }
          }
        });
    }

    if (ceUrlInput) {
        ceUrlInput.addEventListener('input', function() {
          var val = this.value.trim();
          if(val) {
          cePreview.style.backgroundImage = 'url(' + val + ')';
          cePreview.innerHTML = '';
          } else {
          cePreview.style.backgroundImage = 'none';
          cePreview.innerHTML = '无预览';
          }
        });
    }
    if (btnCeCancel) btnCeCancel.addEventListener('click', function(){ ceModal.classList.remove('active'); });
    if (btnCeConfirm) {
        btnCeConfirm.addEventListener('click', function() {
          var url = ceUrlInput.value.trim();
          var desc = ceDescInput.value.trim() || '自定义表情';
          if (!url) {
          if (typeof showToast === 'function') showToast('错误', '请输入图片链接', false);
          return;
          }
          var customEmojis = [];
          try { customEmojis = JSON.parse(localStorage.getItem(OKey('custom_emojis')) || '[]'); } catch(e) {}
          customEmojis.push({ url: url, desc: desc });
          localStorage.setItem(OKey('custom_emojis'), JSON.stringify(customEmojis));
          ceModal.classList.remove('active');
          renderEmojis();
          if (typeof showToast === 'function') showToast('添加成功', '自定义表情已存入记忆', true);
        });
    }
})();