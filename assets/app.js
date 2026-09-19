(()=> {
  const inPages = location.pathname.includes('/pages/');
  const p = inPages ? '' : 'pages/';
  const nav = document.querySelector('.nav');
  const header = document.querySelector('.site-header');
  const menuBtn = document.querySelector('.menu');

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
      label:'상담', href:p+'consult.html',
      intro:'상담 안내', desc:'전화 또는 맞춤 상담으로 문의하실 수 있습니다.',
      links:[
        ['전화 상담','010-4004-5802','tel:01040045802'],
        ['맞춤 상담','몇 가지 항목을 선택해 문의 내용을 남겨주세요.',p+'consult.html']
      ]
    },
    {
      label:'동감 소개', href:p+'about.html',
      intro:'동감 안내', desc:'사무소 소개와 업무 진행 방식을 안내합니다.',
      links:[
        ['행정사 소개','동감행정사사무소 소개',p+'about.html'],
        ['업무 진행 안내','상담부터 결과 안내까지',p+'about.html#process'],
        ['오시는 길','주소 및 연락처 안내',p+'about.html#location']
      ]
    }
  ];

  if(nav){
    nav.innerHTML = groups.map(g=>`
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
      </div>`).join('');
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
    const steps=[...form.querySelectorAll('.form-step')],dots=[...document.querySelectorAll('.progress span')];
    const show=s=>{step=s;steps.forEach(x=>x.classList.toggle('on',x.dataset.step==s));dots.forEach((d,i)=>d.classList.toggle('on',s==='result'||(typeof s==='number'&&i<s)))};
    const val=n=>form.querySelector('input[name="'+n+'"]:checked')?.value||'';
    const req={1:'service',2:'stage',3:'applicant'};
    form.querySelectorAll('.next').forEach(b=>b.addEventListener('click',()=>{const n=req[step];if(n&&!val(n)){alert('항목을 선택해 주세요.');return}show(step+1)}));
    form.querySelectorAll('.prev').forEach(b=>b.addEventListener('click',()=>show(Math.max(1,step-1))));
    form.addEventListener('submit',e=>{e.preventDefault();const data={service:val('service'),stage:val('stage'),applicant:val('applicant'),message:form.elements.message.value.trim()||'별도 입력 없음'};document.getElementById('summary').innerHTML='<dl><dt>문의 분야</dt><dd>'+esc(data.service)+'</dd><dt>현재 단계</dt><dd>'+esc(data.stage)+'</dd><dt>신청 유형</dt><dd>'+esc(data.applicant)+'</dd><dt>문의 내용</dt><dd>'+esc(data.message)+'</dd></dl>';show('result')});
    document.getElementById('restart')?.addEventListener('click',()=>{form.reset();show(1)});
    function esc(v){return v.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]))}
  }
})();