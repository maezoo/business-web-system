(()=> {
  const inPages = location.pathname.includes('/pages/');
  const p = inPages ? '' : 'pages/';
  const home = inPages ? '../index.html' : 'index.html';
  const header = document.querySelector('.site-header');

  if(header){
    header.innerHTML = `
      <div class="container head">
        <a class="brand" href="${home}">
          <span class="mark">同</span>
          <span><b>동감행정사사무소</b><small>DONGGAM ADMINISTRATIVE OFFICE</small></span>
        </a>
        <button class="menu" type="button" aria-label="메뉴"><span></span><span></span><span></span></button>
        <nav class="nav"></nav>
        <a class="call-top" href="tel:03180490828">전화 상담</a>
      </div>`;
  }

  const nav = header?.querySelector('.nav');
  const menuBtn = header?.querySelector('.menu');

  const groups = [
    {
      label:'서비스', href:p+'services.html',
      intro:'업무 분야', desc:'필요한 서비스를 분야별로 확인해 보세요.',
      links:[
        ['화장품 · 의약품 · 의약외품','제조업 · 책임판매업 · 제조·수입업',p+'service-cosmetics.html'],
        ['법인 · 단체 설립','사단법인 · 재단법인 · 민간단체 · 사회적기업',p+'service-organization.html'],
        ['민간자격 등록','등록 절차 · 준비사항 · 등록사례',p+'service-license.html'],
        ['행정심판','음주운전 · 영업정지 · 학교폭력',p+'service-appeal.html']
      ]
    },
    {
      label:'업무사례', href:p+'cases.html',
      intro:'업무사례', desc:'동감이 진행한 분야별 업무사례를 확인해 보세요.',
      links:[
        ['전체 업무사례','전체 분야 보기',p+'cases.html'],
        ['민간자격 등록사례','민간자격 등록 사례',p+'cases.html#license'],
        ['법인 · 단체 사례','설립 · 허가 사례',p+'cases.html#organization'],
        ['화장품 · 의약외품 사례','등록 · 신고 사례',p+'cases.html#cosmetics']
      ]
    },
    {
      label:'상담', href:p+'consult.html', direct:true
    },
    {
      label:'동감 소개', href:p+'about.html',
      intro:'동감 안내', desc:'사무소와 행정사 정보를 확인해 보세요.',
      links:[
        ['행정사 소개','동감행정사사무소 소개',p+'about.html'],
        ['오시는 길','주소 및 연락처 안내',p+'about.html#location']
      ]
    }
  ];

  if(nav){
    nav.innerHTML = groups.map(g=>{
      if(g.direct){
        return `<div class="nav-item"><a class="nav-link" href="${g.href}">${g.label}</a></div>`;
      }
      return `
      <div class="nav-item has-menu">
        <a class="nav-link" href="${g.href}">${g.label}</a>
        <button class="submenu-toggle" type="button" aria-label="${g.label} 하위메뉴 열기">+</button>
        <div class="mega-menu">
          <div class="mega-inner container">
            <div class="mega-intro"><small>${g.intro}</small><strong>${g.label}</strong><p>${g.desc}</p></div>
            <div class="mega-grid">
              ${g.links.map(l=>`<a class="mega-link" href="${l[2]}"><span><b>${l[0]}</b><small>${l[1]}</small></span></a>`).join('')}
            </div>
          </div>
        </div>
      </div>`;
    }).join('');
  }

  const CONTACT = {
    tel:'03180490828',
    telText:'031-8049-0828',
    fax:'070-7500-2992',
    email:'creafit@naver.com',
    address:'경기도 김포시 태장로795번길 23, R동 4층 408호 (장기동, 김포마스터비즈파크)'
  };

  document.querySelectorAll('a[href^="tel:"]').forEach(a=>a.setAttribute('href','tel:'+CONTACT.tel));
  document.querySelectorAll('.call-top').forEach(a=>{a.textContent='전화 상담';a.setAttribute('href','tel:'+CONTACT.tel)});
  document.querySelectorAll('.mobile-quick a:first-child').forEach(a=>a.setAttribute('href','tel:'+CONTACT.tel));

  const footer=document.querySelector('.site-footer');
  if(footer){
    footer.innerHTML = `
      <div class="container footer-main">
        <div class="footer-brand">
          <a class="footer-logo" href="${home}" aria-label="동감행정사사무소 홈">
            <span class="mark">同</span>
            <span><b>동감행정사사무소</b><small>DONGGAM ADMINISTRATIVE OFFICE</small></span>
          </a>
          <nav class="footer-quick" aria-label="푸터 메뉴">
            <span class="footer-title">QUICK LINK</span>
            <div class="footer-quick-links">
              <a href="${p}services.html">서비스</a>
              <a href="${p}cases.html">업무사례</a>
              <a href="${p}consult.html">상담</a>
              <a href="${p}about.html">동감 소개</a>
              <a href="${p}about.html#location">오시는 길</a>
            </div>
          </nav>
        </div>
        <div class="footer-contact-block">
          <div class="footer-title">CONTACT</div>
          <div class="footer-contact">
            <a href="tel:${CONTACT.tel}">Tel. ${CONTACT.telText}</a>
            <a href="mailto:${CONTACT.email}">${CONTACT.email}</a>
            <span>${CONTACT.address}</span>
            <span>Fax. ${CONTACT.fax}</span>
          </div>
        </div>
      </div>
      <div class="footer-lower">
        <div class="container footer-lower-inner">
          <span class="footer-copy">© DONGGAM ADMINISTRATIVE OFFICE. All rights reserved.</span>
        </div>
      </div>`;
  }

  menuBtn?.addEventListener('click',()=>header?.classList.toggle('open'));
  document.querySelectorAll('.submenu-toggle').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const item=btn.closest('.nav-item');
      const open=item.classList.toggle('submenu-open');
      btn.textContent=open?'−':'+';
    });
  });

  const filters=[...document.querySelectorAll('[data-filter]')];
  const cards=[...document.querySelectorAll('[data-category]')];
  filters.forEach(b=>b.addEventListener('click',()=>{
    filters.forEach(x=>x.classList.remove('active')); b.classList.add('active');
    cards.forEach(c=>c.classList.toggle('hidden',b.dataset.filter!=='all'&&c.dataset.category!==b.dataset.filter));
  }));

  const form=document.getElementById('consultForm');
  if(form){
    let step=1;
    const steps=[...form.querySelectorAll('.form-step')],dots=[...form.querySelectorAll('.progress span')];
    const show=s=>{step=s;steps.forEach(x=>x.classList.toggle('on',x.dataset.step==s));dots.forEach((d,i)=>d.classList.toggle('on',s==='result'||(typeof s==='number'&&i<s)));window.scrollTo({top:form.closest('.form-shell').offsetTop-120,behavior:'smooth'})};
    const val=n=>form.querySelector('input[name="'+n+'"]:checked')?.value||'';
    const req={1:'service',2:'stage',3:'applicant'};

    form.querySelectorAll('.next').forEach(b=>b.addEventListener('click',()=>{
      const n=req[step];
      if(n&&!val(n)){alert('항목을 선택해 주세요.');return}
      show(step+1);
    }));
    form.querySelectorAll('.prev').forEach(b=>b.addEventListener('click',()=>show(Math.max(1,step-1))));

    const contactError=document.getElementById('contactError');
    form.querySelector('.review')?.addEventListener('click',()=>{
      const name=form.elements.customerName.value.trim();
      const phone=form.elements.customerPhone.value.trim();
      const email=form.elements.customerEmail.value.trim();
      const privacy=form.elements.privacy.checked;

      if(!name){contactError.textContent='이름을 입력해 주세요.';form.elements.customerName.focus();return}
      if(!phone){contactError.textContent='연락처를 입력해 주세요.';form.elements.customerPhone.focus();return}
      if(!privacy){contactError.textContent='개인정보 수집·이용 동의가 필요합니다.';form.elements.privacy.focus();return}
      contactError.textContent='';

      const data={
        service:val('service'),
        stage:val('stage'),
        applicant:val('applicant'),
        message:form.elements.message.value.trim()||'별도 입력 없음',
        name,
        phone,
        email:email||'입력하지 않음'
      };

      document.getElementById('summary').innerHTML=
        '<dl>'+
        '<dt>문의 분야</dt><dd>'+esc(data.service)+'</dd>'+
        '<dt>현재 단계</dt><dd>'+esc(data.stage)+'</dd>'+
        '<dt>신청 유형</dt><dd>'+esc(data.applicant)+'</dd>'+
        '<dt>문의 내용</dt><dd>'+esc(data.message)+'</dd>'+
        '<dt>이름</dt><dd>'+esc(data.name)+'</dd>'+
        '<dt>연락처</dt><dd>'+esc(data.phone)+'</dd>'+
        '<dt>이메일</dt><dd>'+esc(data.email)+'</dd>'+
        '</dl>';
      show('result');
    });

    document.getElementById('editConsult')?.addEventListener('click',()=>show(5));
    document.getElementById('restart')?.addEventListener('click',()=>{form.reset();if(contactError)contactError.textContent='';show(1)});

    const resultCall=form.querySelector('.consult-result-call');
    if(resultCall){
      resultCall.addEventListener('click',async e=>{
        if(window.matchMedia('(max-width: 860px)').matches) return;
        e.preventDefault();
        try{
          if(navigator.clipboard&&window.isSecureContext){
            await navigator.clipboard.writeText(CONTACT.telText);
          }else{
            const temp=document.createElement('textarea');
            temp.value=CONTACT.telText;
            temp.setAttribute('readonly','');
            temp.style.position='fixed';
            temp.style.opacity='0';
            document.body.appendChild(temp);
            temp.select();
            document.execCommand('copy');
            temp.remove();
          }
          resultCall.textContent='복사되었습니다 ✓';
          window.setTimeout(()=>{resultCall.textContent='전화 상담'},1600);
        }catch(err){
          resultCall.textContent=CONTACT.telText;
          window.setTimeout(()=>{resultCall.textContent='전화 상담'},2200);
        }
      });
    }

    function esc(v){return v.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]))}
  }
})();