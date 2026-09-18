(() => {
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.global-nav');

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      const open = header.classList.toggle('menu-open');
      menuToggle.setAttribute('aria-expanded', String(open));
    });
  }

  nav?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      header.classList.remove('menu-open');
      menuToggle?.setAttribute('aria-expanded', 'false');
    });
  });

  document.querySelectorAll('.service-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.service-item');
      const isOpen = item.classList.toggle('open');
      trigger.setAttribute('aria-expanded', String(isOpen));
      const plus = trigger.querySelector('.service-plus');
      if (plus) plus.textContent = isOpen ? '−' : '+';
    });
  });

  const filterButtons = document.querySelectorAll('.filter-btn');
  const caseCards = document.querySelectorAll('.case-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      caseCards.forEach(card => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('hidden', !show);
      });
    });
  });

  const form = document.getElementById('consult-form');
  if (!form) return;

  const steps = [...form.querySelectorAll('.form-step')];
  const progress = [...document.querySelectorAll('.form-progress span')];
  let current = 1;

  const showStep = (step) => {
    steps.forEach(el => el.classList.toggle('active', el.dataset.step === String(step)));
    if (step !== 'result') {
      current = Number(step);
      progress.forEach((dot, index) => dot.classList.toggle('active', index < current));
    } else {
      progress.forEach(dot => dot.classList.add('active'));
    }
  };

  const selectedValue = (name) => form.querySelector(`input[name="${name}"]:checked`)?.value || '';

  const validateStep = (step) => {
    const fieldByStep = { 1: 'service', 2: 'stage', 3: 'applicant' };
    const field = fieldByStep[step];
    if (!field) return true;
    if (!selectedValue(field)) {
      alert('항목을 하나 선택해 주세요.');
      return false;
    }
    return true;
  };

  form.querySelectorAll('.next-step').forEach(button => {
    button.addEventListener('click', () => {
      if (!validateStep(current)) return;
      showStep(current + 1);
    });
  });

  form.querySelectorAll('.prev-step').forEach(button => {
    button.addEventListener('click', () => showStep(Math.max(1, current - 1)));
  });

  const buildSummary = () => {
    const service = selectedValue('service') || '-';
    const stage = selectedValue('stage') || '-';
    const applicant = selectedValue('applicant') || '-';
    const message = form.elements.message?.value.trim() || '별도 입력 없음';

    return {
      service,
      stage,
      applicant,
      message,
      text: `[동감 상담 준비 내용]\n업무: ${service}\n현재 단계: ${stage}\n신청 주체: ${applicant}\n문의 내용: ${message}`
    };
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = buildSummary();
    const summary = document.getElementById('consult-summary');
    summary.innerHTML = `
      <dl>
        <dt>상담 업무</dt><dd>${escapeHtml(data.service)}</dd>
        <dt>현재 단계</dt><dd>${escapeHtml(data.stage)}</dd>
        <dt>신청 주체</dt><dd>${escapeHtml(data.applicant)}</dd>
        <dt>궁금한 내용</dt><dd>${escapeHtml(data.message)}</dd>
      </dl>`;
    showStep('result');
  });

  document.getElementById('copy-summary')?.addEventListener('click', async () => {
    const data = buildSummary();
    try {
      await navigator.clipboard.writeText(data.text);
      alert('상담 내용이 복사되었습니다.');
    } catch {
      alert('복사 기능을 사용할 수 없습니다.');
    }
  });

  document.getElementById('restart-form')?.addEventListener('click', () => {
    form.reset();
    showStep(1);
  });

  function escapeHtml(value) {
    return value.replace(/[&<>"']/g, char => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[char]));
  }
})();