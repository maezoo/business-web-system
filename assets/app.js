(()=> {
  const inPages = location.pathname.includes('/pages/');
  const p = inPages ? '' : 'pages/';
  const nav = document.querySelector('.nav');
  const header = document.querySelector('.site-header');
  const menuBtn = document.querySelector('.menu');

  if(nav){
    nav.innerHTML = `
      <div class="nav-item has-menu">
        <a class="nav-link" href="${p}services.html">서비스</a>
        <button class="submenu-toggle" type="button" aria-label="서비스 하위메뉴 열기">+</button>
        <div class="mega-menu">
          <div class="mega-head"><strong>서비스</strong><span>현재 상황에서 필요한 업무를 찾아보세요.</span></div>
          <div class="mega-grid">
            <a class="mega-link" href="${p}service-cosmetics.html"><b>화장품 · 의약품 · 의약외품</b><small>제조업 · 책임판매업 · 제조/수입업</small></a>
            <a class="mega-link" href="${p}service-organization.html"><b>법인 · 단체 설립</b><small>사단법인 · 재단법인 · 민간단체 · 사회적기업</small></a>
            <a class="mega-link" href="${p}service-license.html"><b>민간자격 등록</b><small>등록 준비 · 절차 · 사례 · 상담</small></a>
            <a class="mega-link" href="${p}service-appeal.html"><b>행정심판</b><small>음주운전 · 영업정지 · 학교폭력</small></a>
          </div>
        </div>
      </div>
      <div class="nav-item has-menu">
        <a class="nav-link" href="${p}cases.html">업무사례</a>
        <button class="submenu-toggle" type="button" aria-label="업무사례 하위메뉴 열기">+</button>
        <div class="mega-menu">
          <div class="mega-head"><strong>업무사례</strong><span>결과보다 먼저 분야와 맥락을 확인합니다.</span></div>
          <div class="mega-grid">
            <a class="mega-link" href="${p}cases.html"><b>전체 업무사례</b><small>분야별 사례 한눈에 보기</small></a>
            <a class="mega-link" href="${p}cases.html#license"><b>민간자격 사례</b><small>등록 완료 사례 중심</small></a>
            <a class="mega-link" href="${p}cases.html#organization"><b>법인 · 단체 사례</b><small>설립·허가 사례</small></a>
            <a class="mega-link" href="${p}cases.html#cosmetics"><b>화장품 · 의약외품 사례</b><small>등록·신고 사례</small></a>
          </div>
        </div>
      </div>
      <div class="nav-item has-menu">
        <a class="nav-link" href="${p}consult.html">상담</a>
        <button class="submenu-toggle" type="button" aria-label="상담 하위메뉴 열기">+</button>
        <div class="mega-menu">
          <div class="mega-head"><strong>상담</strong><span>바로 전화하거나 상황을 먼저 정리할 수 있습니다.</span></div>
          <div class="mega-grid">
            <a class="mega-link" href="tel:01040045802"><b>전화 상담</b><small>010-4004-5802</small></a>
            <a class="mega-link" href="${p}consult.html"><b>맞춤 상담</b><small>단계별 질문으로 문의내용 정리</small></a>
          </div>
        </div>
      </div>
      <div class="nav-item has-menu">
        <a class="nav-link" href="${p}about.html">동감 소개</a>
        <button class="submenu-toggle" type="button" aria-label="동감 소개 하위메뉴 열기">+</button>
        <div class="mega-menu">
          <div class="mega-head"><strong>동감 소개</strong><span>사무소와 업무 방식을 확인하세요.</span></div>
          <div class="mega-grid">
            <a class="mega-link" href="${p}about.html"><b>행정사 소개</b><small>사무소 소개와 전문 업무</small></a>
            <a class="mega-link" href="${p}about.html#process"><b>업무 방식</b><small>상담부터 결과 안내까지</small></a>
            <a class="mega-link" href="${p}about.html#location"><b>오시는 길</b><small>주소·연락처 안내</small></a>
          </div>
        </div>
      </div>`;
  }

  menuBtn?.addEventListener('click',()=>{
    header?.classList.toggle('open');
  });

  document.querySelectorAll('.submenu-toggle').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const item=btn.closest('.nav-item');
      const open=item.classList.toggle('submenu-open');
      btn.textContent=open?'−':'+';
    });
  });

  document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>{
    if(innerWidth<=860) header?.classList.remove('open');
  }));

  const filters=[...document.querySelectorAll('[data-filter]')];
  const cards=[...document.querySelectorAll('[data-category]')];
  filters.forEach(b=>b.addEventListener('click',()=>{
    filters.forEach(x=>x.classList.remove('active'));
    b.classList.add('active');
    cards.forEach(c=>c.classList.toggle('hidden',b.dataset.filter!=='all'&&c.dataset.category!==b.dataset.filter));
  }));

  const form=document.getElementById('consultForm');
  if(form){
    let step=1;
    const steps=[...form.querySelectorAll('.form-step')];
    const dots=[...document.querySelectorAll('.progress span')];
    const show=s=>{
      step=s;
      steps.forEach(x=>x.classList.toggle('on',x.dataset.step==s));
      dots.forEach((d,i)=>d.classList.toggle('on',typeof s==='number' && i<s || s==='result'));
    };
    const val=n=>form.querySelector('input[name="'+n+'"]:checked')?.value||'';
    const required={1:'service',2:'stage',3:'applicant'};
    form.querySelectorAll('.next').forEach(b=>b.addEventListener('click',()=>{
      const n=required[step];
      if(n&&!val(n)){alert('항목을 선택해 주세요.');return}
      show(step+1);
    }));
    form.querySelectorAll('.prev').forEach(b=>b.addEventListener('click',()=>show(Math.max(1,step-1))));
    form.addEventListener('submit',e=>{
      e.preventDefault();
      const data={service:val('service'),stage:val('stage'),applicant:val('applicant'),message:form.elements.message.value.trim()||'별도 입력 없음'};
      const s=document.getElementById('summary');
      s.innerHTML='<dl><dt>업무</dt><dd>'+esc(data.service)+'</dd><dt>현재 단계</dt><dd>'+esc(data.stage)+'</dd><dt>신청 주체</dt><dd>'+esc(data.applicant)+'</dd><dt>문의 내용</dt><dd>'+esc(data.message)+'</dd></dl>';
      show('result');
    });
    document.getElementById('restart')?.addEventListener('click',()=>{form.reset();show(1)});
    function esc(v){return v.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]))}
  }
})();